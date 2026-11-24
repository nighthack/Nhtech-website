import nodemailer from 'nodemailer';

type ContactResponse = {
  statusCode: number;
  body: Record<string, unknown>;
};

const ipSubmissionMap = new Map<string, { count: number; firstTimestamp: number }>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000;
const MAX_SUBMISSIONS_PER_WINDOW = 10;

export async function submitContact(body: unknown, clientIp: string): Promise<ContactResponse> {
  try {
    if (!body || typeof body !== 'object') {
      return { statusCode: 400, body: { success: false, error: 'Full name is required.' } };
    }

    const submission = body as Record<string, unknown>;
    const { name, email, company, role, problemStatement, constraints, projectStage, schedulingDate, schedulingTime } = submission;

    const now = Date.now();
    const ipRecord = ipSubmissionMap.get(clientIp);
    if (ipRecord) {
      if (now - ipRecord.firstTimestamp < RATE_LIMIT_WINDOW_MS) {
        if (ipRecord.count >= MAX_SUBMISSIONS_PER_WINDOW) {
          return {
            statusCode: 429,
            body: { success: false, error: 'Too many submissions. Please wait a moment before trying again.' }
          };
        }
        ipRecord.count++;
      } else {
        ipSubmissionMap.set(clientIp, { count: 1, firstTimestamp: now });
      }
    } else {
      ipSubmissionMap.set(clientIp, { count: 1, firstTimestamp: now });
    }

    if (typeof name !== 'string' || name.trim().length === 0) {
      return { statusCode: 400, body: { success: false, error: 'Full name is required.' } };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (typeof email !== 'string' || !emailRegex.test(email.trim())) {
      return { statusCode: 400, body: { success: false, error: 'A valid email address is required.' } };
    }

    if (typeof problemStatement !== 'string' || problemStatement.trim().length < 10) {
      return {
        statusCode: 400,
        body: { success: false, error: 'Please provide a descriptive problem statement (minimum 10 characters).' }
      };
    }

    if (typeof schedulingDate !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(schedulingDate)) {
      return { statusCode: 400, body: { success: false, error: 'Please choose a valid scheduling date.' } };
    }

    if (typeof schedulingTime !== 'string' || !/^(09|1\d|20|21):(00|15|30|45)$/.test(schedulingTime)) {
      return { statusCode: 400, body: { success: false, error: 'Please choose a valid scheduling time.' } };
    }

    const optionalText = (value: unknown, fallback: string) =>
      typeof value === 'string' && value.trim() ? value.trim() : fallback;
    const recipientEmail = process.env.CONTACT_RECIPIENT_EMAIL || 'info@nighthack.in';
    const cleanName = name.trim();
    const cleanEmail = email.trim();
    const cleanCompany = optionalText(company, 'Not Specified');
    const cleanRole = optionalText(role, 'Not Specified');
    const cleanStage = optionalText(projectStage, 'Not Specified');
    const cleanConstraints = optionalText(constraints, 'None specified');
    const cleanProblem = problemStatement.trim();
    const cleanSchedulingDate = schedulingDate.trim();
    const cleanSchedulingTime = schedulingTime.trim();

    let agentProcessed = false;
    let agentResponse: unknown = null;
    let agentError: string | null = null;

    if (process.env.OTTOM8_API_KEY) {
      try {
        const agentController = new AbortController();
        const agentTimeout = setTimeout(() => agentController.abort(), 15000);
        const agentPayload = JSON.stringify({
          intake_type: 'technical_problem',
          name: cleanName,
          email: cleanEmail,
          company: cleanCompany,
          role: cleanRole,
          engineering_track: cleanStage,
          problem_statement: cleanProblem,
          constraints: cleanConstraints,
          schedulingDate: cleanSchedulingDate,
          schedulingTime: cleanSchedulingTime
        });

        try {
          const agentRes = await fetch(
            process.env.OTTOM8_AGENT_URL || 'https://ottom8.nhtech.link/api/v1/run/f12d310d-2c3d-436f-ae25-d1c3b959d9a2?stream=false',
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'x-api-key': process.env.OTTOM8_API_KEY
              },
              body: JSON.stringify({
                output_type: 'text',
                input_type: 'chat',
                input_value: agentPayload,
                session_id: crypto.randomUUID()
              }),
              signal: agentController.signal
            }
          );

          const responseText = await agentRes.text();
          try {
            agentResponse = responseText ? JSON.parse(responseText) : null;
          } catch {
            agentResponse = responseText;
          }

          if (!agentRes.ok) {
            throw new Error(`Ottom8 returned HTTP ${agentRes.status}`);
          }

          agentProcessed = true;
          console.log('[Contact API] Intake sent to Ottom8 agent successfully');
        } finally {
          clearTimeout(agentTimeout);
        }
      } catch (err: any) {
        agentError = err?.name === 'AbortError' ? 'Ottom8 request timed out' : 'Ottom8 request failed';
        console.error('[Contact API] Ottom8 agent error:', err);
      }
    } else {
      agentError = 'OTTOM8_API_KEY is not configured';
      console.warn('[Contact API] Ottom8 agent skipped: OTTOM8_API_KEY is not configured');
    }

    const emailSubject = `[NHTech Intake] New Technical Problem Dossier — ${cleanCompany} (${cleanName})`;
    const emailText = [
      `NEW TECHNICAL PROBLEM INTAKE DOSSIER`,
      `==================================================`,
      `Submitted on: ${new Date().toISOString()}`,
      `IP: ${clientIp}`,
      ``,
      `CONTACT DETAILS:`,
      `- Name: ${cleanName}`,
      `- Email: ${cleanEmail}`,
      `- Company: ${cleanCompany}`,
      `- Role: ${cleanRole}`,
      `- Project Stage / Inquiry Type: ${cleanStage}`,
      ``,
      `TECHNICAL PROBLEM STATEMENT:`,
      `--------------------------------------------------`,
      cleanProblem,
      ``,
      `TECHNICAL CONSTRAINTS & REQUIREMENTS:`,
      `--------------------------------------------------`,
      cleanConstraints,
      ``,
      `Scheduling preference: ${cleanSchedulingDate} at ${cleanSchedulingTime}`,
      ``,
      `==================================================`,
      `Delivered to: ${recipientEmail}`
    ].join('\n');

    const emailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; line-height: 1.6; color: #111; background-color: #f8fafc; margin: 0; padding: 24px; }
          .container { max-width: 650px; margin: 0 auto; background: #ffffff; border-radius: 12px; border: 1px solid #e2e8f0; overflow: hidden; }
          .header { background: #0b0c0e; color: #ffffff; padding: 24px; }
          .badge { display: inline-block; background: #e0fb2e; color: #000; font-size: 11px; font-weight: bold; padding: 3px 8px; border-radius: 4px; text-transform: uppercase; margin-bottom: 8px; }
          .title { margin: 0; font-size: 20px; font-weight: 700; color: #fff; }
          .content { padding: 24px; }
          .meta-table { width: 100%; border-collapse: collapse; margin-bottom: 24px; font-size: 14px; }
          .meta-table td { padding: 8px 12px; border-bottom: 1px solid #f1f5f9; }
          .meta-table td.label { font-weight: 600; color: #64748b; width: 35%; }
          .meta-table td.value { color: #0f172a; font-weight: 500; }
          .section-label { font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: #64748b; margin-top: 20px; margin-bottom: 8px; }
          .block { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; font-size: 14px; color: #1e293b; white-space: pre-wrap; word-break: break-word; }
          .footer { background: #f8fafc; padding: 16px 24px; font-size: 12px; color: #94a3b8; border-top: 1px solid #e2e8f0; text-align: center; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <span class="badge">NHTech Technical Intake</span>
            <h1 class="title">New Problem Dossier Received</h1>
          </div>
          <div class="content">
            <table class="meta-table">
              <tr><td class="label">Full Name</td><td class="value">${escapeHtml(cleanName)}</td></tr>
              <tr><td class="label">Work Email</td><td class="value"><a href="mailto:${escapeHtml(cleanEmail)}">${escapeHtml(cleanEmail)}</a></td></tr>
              <tr><td class="label">Company / Organization</td><td class="value">${escapeHtml(cleanCompany)}</td></tr>
              <tr><td class="label">Role</td><td class="value">${escapeHtml(cleanRole)}</td></tr>
              <tr><td class="label">Focus / Stage</td><td class="value">${escapeHtml(cleanStage)}</td></tr>
              <tr><td class="label">Scheduling Preference</td><td class="value">${escapeHtml(cleanSchedulingDate)} at ${escapeHtml(cleanSchedulingTime)}</td></tr>
            </table>
            <div class="section-label">Problem Statement</div>
            <div class="block">${escapeHtml(cleanProblem)}</div>
            <div class="section-label">Constraints &amp; Ingest Infrastructure</div>
            <div class="block">${escapeHtml(cleanConstraints)}</div>
          </div>
          <div class="footer">
            Dispatched to <strong>${escapeHtml(recipientEmail)}</strong> via NHTech Intake API &bull; ${new Date().toUTCString()}
          </div>
        </div>
      </body>
      </html>
    `;

    let emailDispatched = false;
    let dispatchMethod = 'local-log';

    if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
      try {
        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST,
          port: parseInt(process.env.SMTP_PORT || '587', 10),
          secure: process.env.SMTP_PORT === '465',
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
          }
        });

        await transporter.sendMail({
          from: process.env.SMTP_FROM || `NHTech Intake <noreply@nighthack.in>`,
          to: recipientEmail,
          replyTo: cleanEmail,
          subject: emailSubject,
          text: emailText,
          html: emailHtml
        });

        emailDispatched = true;
        dispatchMethod = 'smtp';
        console.log(`[Contact API] Email successfully delivered to ${recipientEmail} via SMTP`);
      } catch (smtpErr) {
        console.error('[Contact API] SMTP error, falling back to delivery queue:', smtpErr);
      }
    }

    if (!emailDispatched && process.env.RESEND_API_KEY) {
      try {
        const resendResponse = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            from: process.env.SMTP_FROM || 'NHTech Intake <intake@nighthack.in>',
            to: [recipientEmail],
            reply_to: cleanEmail,
            subject: emailSubject,
            text: emailText,
            html: emailHtml
          })
        });

        if (resendResponse.ok) {
          emailDispatched = true;
          dispatchMethod = 'resend';
          console.log(`[Contact API] Email successfully delivered to ${recipientEmail} via Resend`);
        } else {
          console.error('[Contact API] Resend API error status:', resendResponse.status);
        }
      } catch (resendErr) {
        console.error('[Contact API] Resend dispatch error:', resendErr);
      }
    }

    if (!emailDispatched) {
      console.log(`\n======================================================`);
      console.log(`[NHTech Intake API] INCOMING SUBMISSION FOR: ${recipientEmail}`);
      console.log(emailText);
      console.log(`======================================================\n`);
    }

    return {
      statusCode: 200,
      body: {
        success: true,
        message: 'Your technical intake has been successfully received and dispatched to our engineering leads at info@nighthack.in.',
        recipient: recipientEmail,
        dispatchMethod: emailDispatched ? dispatchMethod : 'queued-for-dispatch',
        agentProcessed,
        ...(agentResponse !== null ? { agentResponse } : {}),
        ...(agentError ? { agentError } : {})
      }
    };
  } catch (error) {
    console.error('[Contact API] Unexpected error processing submission:', error);
    return {
      statusCode: 500,
      body: {
        success: false,
        error: 'An internal error occurred while processing your submission. Please try again or email us directly at info@nighthack.in.'
      }
    };
  }
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
