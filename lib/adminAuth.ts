import { createHmac, randomUUID, timingSafeEqual } from 'crypto';

const COOKIE_NAME = 'teambotics-admin-session';
const SECRET = process.env.ADMIN_SESSION_SECRET;
const PASSWORD = process.env.ADMIN_PASSWORD;

if (!SECRET) {
  throw new Error('ADMIN_SESSION_SECRET must be set in environment variables.');
}

const SECRET_KEY = SECRET;

export function getAdminPassword() {
  return PASSWORD ?? null;
}

function signPayload(payload: string) {
  return createHmac('sha256', SECRET_KEY).update(payload).digest('hex');
}

export function createAdminSessionToken() {
  const payload = `${Date.now()}|${randomUUID()}`;
  const signature = signPayload(payload);
  return `${payload}.${signature}`;
}

export function getAdminSessionCookieName() {
  return COOKIE_NAME;
}

export function isAdminAuthenticated(cookieValue: string | undefined | null) {
  if (!cookieValue) {
    return false;
  }

  const parts = cookieValue.split('.');
  if (parts.length !== 2) {
    return false;
  }

  const [payload, signature] = parts;
  const expected = signPayload(payload);

  try {
    return timingSafeEqual(Buffer.from(signature), Buffer.from(expected));
  } catch {
    return false;
  }
}
