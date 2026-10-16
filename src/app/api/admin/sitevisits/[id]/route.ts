import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import connectDB from "@/lib/mongodb";
import SiteVisit from "@/lib/models/SiteVisit";

export const runtime = "nodejs";
const allowedStatuses = ["Requested", "Pending", "Confirmed", "Cab Assigned", "Completed", "Visit Completed", "Cancelled", "Rescheduled", "Customer No-Show"];
const allowedFields = ["status", "cabAssignment", "driverName", "driverPhone", "actualVisitDate", "completionNotes", "adminRemarks", "rescheduledDate", "rescheduledTime"] as const;
const limits: Record<string, number> = { cabAssignment: 80, driverName: 100, driverPhone: 20, completionNotes: 2000, adminRemarks: 2000, rescheduledTime: 5 };

export async function PATCH(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;
    if (!mongoose.isValidObjectId(id)) return NextResponse.json({ error: "Invalid booking ID." }, { status: 400 });
    const body = await request.json();
    const update: Record<string, unknown> = {};
    for (const key of allowedFields) {
      if (!(key in body)) continue;
      const value = body[key];
      if (key === "status") {
        if (typeof value !== "string" || !allowedStatuses.includes(value)) return NextResponse.json({ error: "Invalid status." }, { status: 400 });
        update.status = value;
      } else if (key === "actualVisitDate" || key === "rescheduledDate") {
        if (value === "" || value === null) update[key] = null;
        else if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value) || Number.isNaN(Date.parse(`${value}T00:00:00Z`))) return NextResponse.json({ error: `Invalid ${key}.` }, { status: 400 });
        else update[key] = new Date(`${value}T00:00:00.000Z`);
      } else {
        if (typeof value !== "string") return NextResponse.json({ error: `Invalid ${key}.` }, { status: 400 });
        if (key === "driverPhone" && value && !/^[+\d ()-]{7,20}$/.test(value)) return NextResponse.json({ error: "Invalid driver phone number." }, { status: 400 });
        if (key === "rescheduledTime" && value && !/^([01]\d|2[0-3]):[0-5]\d$/.test(value)) return NextResponse.json({ error: "Invalid rescheduled time." }, { status: 400 });
        if (value.length > (limits[key] || 2000)) return NextResponse.json({ error: `${key} is too long.` }, { status: 400 });
        update[key] = value.trim();
      }
    }
    if (!Object.keys(update).length) return NextResponse.json({ error: "No valid changes supplied." }, { status: 400 });
    await connectDB();
    const booking = await SiteVisit.findByIdAndUpdate(id, { $set: update }, { new: true, runValidators: true }).lean();
    if (!booking) return NextResponse.json({ error: "Booking not found." }, { status: 404 });
    return NextResponse.json({ success: true, booking: { ...(booking as any), id: String((booking as any)._id), _id: undefined } });
  } catch (error) {
    console.error("[Admin Site Visits] PATCH failed", error instanceof Error ? error.message : error);
    return NextResponse.json({ error: "Unable to update booking." }, { status: 500 });
  }
}
