import { NextResponse } from "next/server";
import { getSiteValues } from "@/lib/values/values";

export async function GET() {
  return NextResponse.json(getSiteValues());
}
