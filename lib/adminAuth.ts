import { createHmac, randomUUID, timingSafeEqual } from 'crypto';

const COOKIE_NAME = 'teambotics-admin-session';

export function getAdminPassword() {
  return process.env.ADMIN_PASSWORD ?? null;
}

function getAdminSessionSecret() {
  return process.env.ADMIN_SESSION_SECRET ?? null;
}

function getRequiredAdminSessionSecret() {
  const secret = getAdminSessionSecret();
  if (!secret) {
    throw new Error('ADMIN_SESSION_SECRET must be set in environment variables.');
  }
  return secret;
}

function signPayload(payload: string) {
  return createHmac('sha256', getRequiredAdminSessionSecret()).update(payload).digest('hex');
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

  if (!getAdminSessionSecret()) {
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
