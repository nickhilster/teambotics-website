import { NextResponse } from "next/server";
import { FALLBACK_SITE_VALUES, getLatestSiteValues } from "@/lib/values/synthesize";

export async function GET() {
  const stored = await getLatestSiteValues();
  return NextResponse.json(stored ?? FALLBACK_SITE_VALUES);
}
