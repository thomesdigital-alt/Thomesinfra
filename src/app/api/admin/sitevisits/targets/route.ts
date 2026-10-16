import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import GroupVisitStats from "@/lib/models/GroupVisitsStats";

export const runtime = "nodejs";
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const teamName = typeof body?.teamName === "string" ? body.teamName.trim() : "";
    const promisedVisits = body?.promisedVisits;
    if (!teamName || teamName.length > 100) return NextResponse.json({ error: "A valid team name is required." }, { status: 400 });
    if (!Number.isInteger(promisedVisits) || promisedVisits < 0 || promisedVisits > 1000000) return NextResponse.json({ error: "Promised visits must be a whole number from 0 to 1,000,000." }, { status: 400 });
    await connectDB();
    const record = await GroupVisitStats.findOneAndUpdate({ teamName }, { $set: { promisedVisits } }, { upsert: true, new: true, runValidators: true, setDefaultsOnInsert: true }).lean();
    return NextResponse.json({ success: true, target: record });
  } catch (error) {
    console.error("[Admin Site Visit Targets] PATCH failed", error instanceof Error ? error.message : error);
    return NextResponse.json({ error: "Unable to save team target." }, { status: 500 });
  }
}
