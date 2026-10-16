import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import SiteVisit from "@/lib/models/SiteVisit";
import GroupVisitStats from "@/lib/models/GroupVisitsStats";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function indiaToday() {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Kolkata", year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date());
}

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const search = (searchParams.get("search") || "").trim().slice(0, 100);
    const status = (searchParams.get("status") || "").trim();
    const team = (searchParams.get("team") || "").trim();
    const leader = (searchParams.get("leader") || "").trim();
    const site = (searchParams.get("site") || "").trim();
    const from = (searchParams.get("from") || "").trim();
    const to = (searchParams.get("to") || "").trim();
    const filter: Record<string, unknown> = {};
    if (status) filter.status = status;
    if (team) filter.teamName = team;
    if (leader) filter.leaderName = leader;
    if (site) filter.siteName = site;
    if (search) {
      const escaped = search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      filter.$or = ["partnerName", "customerName", "agentCode", "partnerMobile", "requestedBy"].map((field) => ({ [field]: { $regex: escaped, $options: "i" } }));
    }
    if (from || to) {
      const dateFilter: Record<string, Date> = {};
      if (from && /^\d{4}-\d{2}-\d{2}$/.test(from)) dateFilter.$gte = new Date(`${from}T00:00:00.000Z`);
      if (to && /^\d{4}-\d{2}-\d{2}$/.test(to)) dateFilter.$lte = new Date(`${to}T23:59:59.999Z`);
      if (Object.keys(dateFilter).length) filter.visitDate = dateFilter;
    }
    const docs = await SiteVisit.find(filter).sort({ visitDate: 1, visitTime: 1 }).limit(1000).lean();
    const all = await SiteVisit.find({}).select("visitDate status teamName leaderName siteName").lean();
    const stats = await GroupVisitStats.find({}).lean();
    const today = indiaToday();
    const dayOf = (date: unknown) => date instanceof Date ? date.toISOString().slice(0, 10) : new Date(String(date)).toISOString().slice(0, 10);
    const isCancelled = (s: string) => s === "Cancelled";
    const isCompleted = (s: string) => s === "Completed" || s === "Visit Completed";
    const isUpcoming = (item: { visitDate: unknown; status: string }) => dayOf(item.visitDate) >= today && !isCancelled(item.status) && !isCompleted(item.status);
    const teams = new Set<string>();
    all.forEach((x: any) => teams.add(x.teamName));
    stats.forEach((x: any) => teams.add(x.teamName));
    const analytics = Array.from(teams).sort().map((teamName) => ({
      teamName,
      promisedVisits: Number((stats as any[]).find((s) => s.teamName === teamName)?.promisedVisits || 0),
      completedVisits: all.filter((x: any) => x.teamName === teamName && isCompleted(x.status)).length,
    }));
    const summary = {
      total: all.length,
      upcoming: all.filter((x: any) => isUpcoming(x)).length,
      pending: all.filter((x: any) => ["Requested", "Pending", "Pending Confirmation"].includes(x.status)).length,
      completed: all.filter((x: any) => isCompleted(x.status)).length,
      cancelled: all.filter((x: any) => isCancelled(x.status)).length,
    };
    return NextResponse.json({ bookings: docs.map((doc: any) => ({ ...doc, id: String(doc._id), _id: undefined })), summary, analytics, options: {
      teams: Array.from(new Set(all.map((x: any) => x.teamName))).sort(),
      leaders: Array.from(new Set(all.map((x: any) => x.leaderName).filter(Boolean))).sort(),
      sites: Array.from(new Set(all.map((x: any) => x.siteName).filter(Boolean))).sort(),
      statuses: Array.from(new Set(all.map((x: any) => x.status).filter(Boolean))).sort(),
    }});
  } catch (error) {
    console.error("[Admin Site Visits] GET failed", error instanceof Error ? error.message : error);
    return NextResponse.json({ error: "Unable to load site visits." }, { status: 500 });
  }
}
