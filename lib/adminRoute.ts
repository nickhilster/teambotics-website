import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { getAdminSessionCookieName, isAdminAuthenticated } from "@/lib/adminAuth";

export async function requireAdmin() {
  const cookieStore = await cookies();
  const cookieValue = cookieStore.get(getAdminSessionCookieName())?.value ?? null;

  if (!isAdminAuthenticated(cookieValue)) {
    return NextResponse.json({ ok: false, error: "Authentication required." }, { status: 401 });
  }

  return null;
}

