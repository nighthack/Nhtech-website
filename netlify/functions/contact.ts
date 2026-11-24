import { submitContact } from '../../src/server/contact';

type NetlifyEvent = {
  httpMethod: string;
  body: string | null;
  isBase64Encoded?: boolean;
  headers: Record<string, string | undefined>;
};

export async function handler(event: NetlifyEvent) {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: { 'Content-Type': 'application/json', Allow: 'POST' },
      body: JSON.stringify({ success: false, error: 'Method not allowed.' })
    };
  }

  let body: unknown;
  try {
    const requestBody = event.body
      ? event.isBase64Encoded
        ? Buffer.from(event.body, 'base64').toString('utf8')
        : event.body
      : '';
    body = JSON.parse(requestBody);
  } catch {
    return {
      statusCode: 400,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ success: false, error: 'Invalid JSON request body.' })
    };
  }

  const clientIp =
    event.headers['x-nf-client-connection-ip'] ||
    event.headers['x-forwarded-for']?.split(',')[0].trim() ||
    'unknown';
  const result = await submitContact(body, clientIp);

  return {
    statusCode: result.statusCode,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(result.body)
  };
}
