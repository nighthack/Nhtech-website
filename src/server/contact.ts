import { brand } from '../config/brand';

type ContactResponse = {
  statusCode: number;
  body: Record<string, unknown>;
};

const ipSubmissionMap = new Map<string, { count: number; firstTimestamp: number }>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000;
const MAX_SUBMISSIONS_PER_WINDOW = 10;
const DEFAULT_AGENT_URL = 'https://ottom8.nhtech.link/api/v1/run/f12d310d-2c3d-436f-ae25-d1c3b959d9a2?stream=false';

export async function submitContact(body: unknown, clientIp: string): Promise<ContactResponse> {
  try {
    if (!body || typeof body !== 'object' || Array.isArray(body)) {
      return { statusCode: 400, body: { success: false, error: 'Full name is required.' } };
    }

    const submission = body as Record<string, unknown>;
    const { name, email, company, role, problemStatement, constraints, projectStage } = submission;

    const now = Date.now();
    const ipRecord = ipSubmissionMap.get(clientIp);
    if (ipRecord && now - ipRecord.firstTimestamp < RATE_LIMIT_WINDOW_MS) {
      if (ipRecord.count >= MAX_SUBMISSIONS_PER_WINDOW) {
        return { statusCode: 429, body: { success: false, error: 'Too many submissions. Please wait a moment before trying again.' } };
      }
      ipRecord.count++;
    } else {
      ipSubmissionMap.set(clientIp, { count: 1, firstTimestamp: now });
    }

    if (typeof name !== 'string' || name.trim().length === 0) {
      return { statusCode: 400, body: { success: false, error: 'Full name is required.' } };
    }
    if (typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      return { statusCode: 400, body: { success: false, error: 'A valid email address is required.' } };
    }
    if (typeof problemStatement !== 'string' || problemStatement.trim().length < 10) {
      return { statusCode: 400, body: { success: false, error: 'Please provide a descriptive problem statement (minimum 10 characters).' } };
    }
    for (const [field, limit] of [['name', 150], ['email', 254], ['company', 200], ['role', 150], ['problemStatement', 10000], ['constraints', 5000], ['projectStage', 100]] as const) {
      const value = submission[field];
      if (value !== undefined && (typeof value !== 'string' || value.length > limit)) {
        return { statusCode: 400, body: { success: false, error: `Please check the ${field} field.` } };
      }
    }

    const optionalText = (value: unknown, fallback: string) => typeof value === 'string' && value.trim() ? value.trim() : fallback;
    const cleanName = name.trim();
    const cleanEmail = email.trim();
    const cleanCompany = optionalText(company, 'Not Specified');
    const cleanRole = optionalText(role, 'Not Specified');
    const cleanStage = optionalText(projectStage, 'Not Specified');
    const cleanConstraints = optionalText(constraints, 'None specified');
    const cleanProblem = problemStatement.trim();

    let agentProcessed = false;

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
          constraints: cleanConstraints
        });

        try {
          const agentRes = await fetch(process.env.OTTOM8_AGENT_URL || DEFAULT_AGENT_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'x-api-key': process.env.OTTOM8_API_KEY },
            body: JSON.stringify({
              output_type: 'text',
              input_type: 'chat',
              input_value: agentPayload,
              session_id: crypto.randomUUID()
            }),
            signal: agentController.signal
          });

          await agentRes.text();
          if (!agentRes.ok) throw new Error(`Ottom8 returned HTTP ${agentRes.status}`);
          agentProcessed = true;
          console.log('[Contact API] Intake sent to Ottom8 agent successfully');
        } finally {
          clearTimeout(agentTimeout);
        }
      } catch (err: any) {
        console.error('[Contact API] Ottom8 agent error:', err);
      }
    } else {
      console.warn('[Contact API] Ottom8 agent skipped: OTTOM8_API_KEY is not configured');
    }

    if (!agentProcessed) return {
      statusCode: 503,
      body: { success: false, error: `We could not deliver your enquiry. Please try again or email ${brand.contact.email}.` }
    };

    return {
      statusCode: 200,
      body: {
        success: true,
        message: 'Your technical intake has been successfully received by the NHTech intake agent.',
        agentProcessed
      }
    };
  } catch (error) {
    console.error('[Contact API] Unexpected error processing submission:', error);
    return { statusCode: 500, body: { success: false, error: 'An internal error occurred while processing your submission. Please try again.' } };
  }
}
