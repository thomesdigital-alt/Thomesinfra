import { NextResponse } from "next/server";

import {
  TEAMS,
  SITE_NAMES,
  CAB_TYPES,
  getAllLeaders,
} from "@/lib/config/siteVisitConfig";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({
    teams: TEAMS,
    sites: SITE_NAMES,
    cabTypes: CAB_TYPES,
    leaders: getAllLeaders(),
  });
}