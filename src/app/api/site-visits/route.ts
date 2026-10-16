import { NextResponse } from "next/server";
import { google } from "googleapis";

import connectDB from "@/lib/mongodb";
import SiteVisit from "@/lib/models/SiteVisit";

import {
  TEAMS,
  SITE_NAMES,
  CAB_TYPES,
} from "@/lib/config/siteVisitConfig";

export const runtime = "nodejs";

function isValidGoogleMapsLink(value: string): boolean {
  try {
    const url = new URL(value);

    if (url.protocol !== "https:" && url.protocol !== "http:") {
      return false;
    }

    const hostname = url.hostname.toLowerCase();

    return (
      hostname === "maps.app.goo.gl" ||
      hostname === "goo.gl" ||
      hostname === "maps.google.com" ||
      hostname === "google.com" ||
      hostname === "www.google.com"
    );
  } catch {
    return false;
  }
}

function getGoogleSheetsClient() {
  const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");

  if (!clientEmail || !privateKey) {
    return null;
  }

  const auth = new google.auth.JWT({
    email: clientEmail,
    key: privateKey,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  return google.sheets({
    version: "v4",
    auth,
  });
}

async function appendToGoogleSheet(booking: {
  id: string;
  visitDate: Date;
  partnerName: string;
  agentCode: string;
  teamName: string;
  leaderName: string;
  partnerMobile: string;
  customerName: string;
  visitTime: string;
  siteName: string;
  locationLink: string;
  cabType: string;
  requestedBy: string;
  remarks: string;
  status: string;
  createdAt: Date;
}) {
  const spreadsheetId = process.env.GOOGLE_SHEET_ID;
  const sheetName = process.env.GOOGLE_SHEET_TAB || "Sheet1";

  const sheets = getGoogleSheetsClient();

  if (!sheets || !spreadsheetId) {
    throw new Error("Google Sheets credentials are not configured.");
  }

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: `${sheetName}!A:Q`,
    valueInputOption: "USER_ENTERED",
    insertDataOption: "INSERT_ROWS",
    requestBody: {
      values: [
        [
          booking.id,
          booking.visitDate.toISOString().slice(0, 10),
          booking.partnerName,
          booking.agentCode,
          booking.teamName,
          booking.leaderName,
          booking.partnerMobile,
          booking.customerName,
          booking.visitTime,
          booking.siteName,
          booking.locationLink,
          booking.cabType,
          booking.requestedBy,
          booking.remarks,
          booking.status,
          booking.createdAt.toISOString(),
          "Synced",
        ],
      ],
    },
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      visitDate,
      partnerName,
      agentCode,
      teamName,
      partnerMobile,
      customerName,
      visitTime,
      siteName,
      locationLink,
      cabType,
      requestedBy,
      remarks,
    } = body;

    // Required-field validation.
    const requiredFields = [
      visitDate,
      partnerName,
      agentCode,
      teamName,
      partnerMobile,
      customerName,
      visitTime,
      siteName,
      locationLink,
      cabType,
      requestedBy,
    ];

    if (
      requiredFields.some(
        (value) => typeof value !== "string" || !value.trim()
      )
    ) {
      return NextResponse.json(
        { error: "Please complete all required fields." },
        { status: 400 }
      );
    }

    // Validate names and input lengths.
    if (
      partnerName.trim().length > 100 ||
      customerName.trim().length > 100 ||
      (typeof remarks === "string" && remarks.length > 1000)
    ) {
      return NextResponse.json(
        { error: "One or more fields exceed the allowed length." },
        { status: 400 }
      );
    }

    // Agent code must contain exactly six digits.
    if (!/^\d{6}$/.test(agentCode)) {
      return NextResponse.json(
        { error: "Agent Code must contain exactly 6 digits." },
        { status: 400 }
      );
    }

    // Partner mobile must contain exactly ten digits.
    if (!/^\d{10}$/.test(partnerMobile)) {
      return NextResponse.json(
        { error: "Partner mobile number must contain exactly 10 digits." },
        { status: 400 }
      );
    }

    // Validate the visit date and prevent past-date bookings.

if (
  typeof visitDate !== "string" ||
  !/^\d{4}-\d{2}-\d{2}$/.test(visitDate)
) {
  return NextResponse.json(
    { error: "Please select a valid visit date." },
    { status: 400 }
  );
}

// Parse the calendar date without relying on the server's local timezone.
const [year, month, day] = visitDate.split("-").map(Number);

const parsedDate = new Date(Date.UTC(year, month - 1, day));

if (
  parsedDate.getUTCFullYear() !== year ||
  parsedDate.getUTCMonth() !== month - 1 ||
  parsedDate.getUTCDate() !== day
) {
  return NextResponse.json(
    { error: "Please select a valid visit date." },
    { status: 400 }
  );
}

// Compare calendar dates in the Indian timezone.
const todayInIndia = new Intl.DateTimeFormat("en-CA", {
  timeZone: "Asia/Kolkata",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
}).format(new Date());

if (visitDate < todayInIndia) {
  return NextResponse.json(
    { error: "Visit date cannot be in the past." },
    { status: 400 }
  );
}

    const today = new Date();
    const todayString = [
      today.getFullYear(),
      String(today.getMonth() + 1).padStart(2, "0"),
      String(today.getDate()).padStart(2, "0"),
    ].join("-");

    if (visitDate < todayString) {
      return NextResponse.json(
        { error: "Visit date cannot be in the past." },
        { status: 400 }
      );
    }

    // Validate time.
    if (!/^([01]\d|2[0-3]):[0-5]\d$/.test(visitTime)) {
      return NextResponse.json(
        { error: "Please select a valid visit time." },
        { status: 400 }
      );
    }

    // Verify that the selected team exists.
    const team = TEAMS.find((item) => item.teamName === teamName);

    if (!team) {
      return NextResponse.json(
        { error: "Please select a valid team." },
        { status: 400 }
      );
    }

    // Verify the site and cab type against trusted server configuration.
    if (!(SITE_NAMES as readonly string[]).includes(siteName)) {
      return NextResponse.json(
        { error: "Please select a valid site." },
        { status: 400 }
      );
    }

    if (!(CAB_TYPES as readonly string[]).includes(cabType)) {
      return NextResponse.json(
        { error: "Please select a valid cab type." },
        { status: 400 }
      );
    }

    // Booking requester must be a configured leader.
    const validLeader = TEAMS.some(
      (item) => item.leaderName === requestedBy
    );

    if (!validLeader) {
      return NextResponse.json(
        { error: "Please select a valid booking requester." },
        { status: 400 }
      );
    }

    // Validate Google Maps link.
    if (!isValidGoogleMapsLink(locationLink)) {
      return NextResponse.json(
        { error: "Please enter a valid Google Maps link." },
        { status: 400 }
      );
    }

    await connectDB();

    // The leader is derived from the trusted server configuration.
    const booking = await SiteVisit.create({
      visitDate: parsedDate,
      partnerName: partnerName.trim(),
      agentCode,
      teamName: team.teamName,
      leaderName: team.leaderName,
      partnerMobile,
      customerName: customerName.trim(),
      visitTime,
      siteName,
      locationLink: locationLink.trim(),
      cabType,
      requestedBy,
      remarks: typeof remarks === "string" ? remarks.trim() : "",
      status: "Requested",
    });

    const result = {
      id: String(booking._id),
      visitDate: booking.visitDate,
      partnerName: booking.partnerName,
      agentCode: booking.agentCode,
      teamName: booking.teamName,
      leaderName: booking.leaderName,
      partnerMobile: booking.partnerMobile,
      customerName: booking.customerName,
      visitTime: booking.visitTime,
      siteName: booking.siteName,
      locationLink: booking.locationLink,
      cabType: booking.cabType,
      requestedBy: booking.requestedBy,
      remarks: booking.remarks || "",
      status: booking.status,
      createdAt: booking.createdAt || new Date(),
    };

    // MongoDB has succeeded. Google Sheets is a secondary destination.
    try {
      await appendToGoogleSheet(result);

      return NextResponse.json(
        {
          success: true,
          message: "Cab booking submitted and synchronised with Google Sheets.",
          bookingId: result.id,
          sheetsSynced: true,
        },
        { status: 201 }
      );
    } catch (sheetError) {
      console.error(
        "[Site Visits] Google Sheets sync failed:",
        sheetError instanceof Error ? sheetError.message : sheetError
      );

      return NextResponse.json(
        {
          success: true,
          message:
            "Booking saved successfully, but Google Sheets synchronisation failed. Please contact the administrator.",
          bookingId: result.id,
          sheetsSynced: false,
        },
        { status: 201 }
      );
    }
  } catch (error) {
    console.error(
      "[Site Visits API] Error:",
      error instanceof Error ? error.message : error
    );

    return NextResponse.json(
      { error: "Unable to submit booking. Please try again." },
      { status: 500 }
    );
  }
}