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
    if (!body || typeof body !== 'object') {
      return { statusCode: 400, body: { success: false, error: 'Full name is required.' } };
    }

    const submission = body as Record<string, unknown>;
    const { name, email, company, role, problemStatement, constraints, projectStage, schedulingDate, schedulingTime } = submission;

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
    if (typeof schedulingDate !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(schedulingDate)) {
      return { statusCode: 400, body: { success: false, error: 'Please choose a valid scheduling date.' } };
    }
    if (typeof schedulingTime !== 'string' || !/^(09|1\d|20|21):(00|15|30|45)$/.test(schedulingTime)) {
      return { statusCode: 400, body: { success: false, error: 'Please choose a valid scheduling time.' } };
    }

    const optionalText = (value: unknown, fallback: string) => typeof value === 'string' && value.trim() ? value.trim() : fallback;
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

          const responseText = await agentRes.text();
          try { agentResponse = responseText ? JSON.parse(responseText) : null; } catch { agentResponse = responseText; }
          if (!agentRes.ok) throw new Error(`Ottom8 returned HTTP ${agentRes.status}`);
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

    return {
      statusCode: 200,
      body: {
        success: true,
        message: 'Your technical intake has been successfully received by the NHTech intake agent.',
        agentProcessed,
        ...(agentResponse !== null ? { agentResponse } : {}),
        ...(agentError ? { agentError } : {})
      }
    };
  } catch (error) {
    console.error('[Contact API] Unexpected error processing submission:', error);
    return { statusCode: 500, body: { success: false, error: 'An internal error occurred while processing your submission. Please try again.' } };
  }
}
