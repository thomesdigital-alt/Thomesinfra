"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import {
  AlertCircle,
  CalendarDays,
  Car,
  CheckCircle2,
  Clock3,
  Info,
  MapPin,
  Send,
  User,
  Users,
} from "lucide-react";

type Team = {
  teamName: string;
  leaderName: string;
  promisedVisits: number;
  completedVisits: number;
};

type Options = {
  teams: Team[];
  sites: string[];
  cabTypes: string[];
  leaders: string[];
};

const initialForm = {
  visitDate: "",
  partnerName: "",
  agentCode: "",
  teamName: "",
  partnerMobile: "",
  customerName: "",
  visitTime: "",
  siteName: "",
  locationLink: "",
  cabType: "",
  requestedBy: "",
  remarks: "",
};

export default function SiteVisitsPage() {
  const [options, setOptions] = useState<Options>({
    teams: [],
    sites: [],
    cabTypes: ["5-Seater", "7-Seater"],
    leaders: [],
  });

  const [form, setForm] = useState(initialForm);
  const [loadingOptions, setLoadingOptions] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [bookingId, setBookingId] = useState("");
  const [sheetsSynced, setSheetsSynced] = useState<boolean | null>(null);

  useEffect(() => {
    async function loadOptions() {
      try {
        const response = await fetch("/api/site-visits/options", {
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("Unable to load form options.");
        }

        const data = await response.json();
        setOptions(data);
      } catch {
        setError("Unable to load team and site details. Refresh the page.");
      } finally {
        setLoadingOptions(false);
      }
    }

    loadOptions();
  }, []);

  const selectedTeam = useMemo(
    () => options.teams.find((team) => team.teamName === form.teamName),
    [options.teams, form.teamName],
  );

  function updateField(field: keyof typeof initialForm, value: string) {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  }

  function handleTeamChange(teamName: string) {
    setForm((previous) => ({
      ...previous,
      teamName,
    }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setSuccess("");
    setBookingId("");
    setSheetsSynced(null);

    if (!selectedTeam) {
      setError("Please select a valid team.");
      return;
    }

    if (!/^\d{6}$/.test(form.agentCode)) {
      setError("Agent Code must contain exactly 6 digits.");
      return;
    }

    if (!/^\d{10}$/.test(form.partnerMobile)) {
      setError("Partner Mobile Number must contain exactly 10 digits.");
      return;
    }

    if (!form.visitDate || !form.visitTime) {
      setError("Please select the visit date and time.");
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch("/api/site-visits", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Unable to submit booking.");
      }

      setSuccess(data.message);
      setBookingId(data.bookingId);
      setSheetsSynced(data.sheetsSynced);

      setForm(initialForm);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  const today = new Date();
  const minimumDate = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, "0"),
    String(today.getDate()).padStart(2, "0"),
  ].join("-");

  const completion = selectedTeam
    ? selectedTeam.promisedVisits > 0
      ? Math.min(
          100,
          Math.round(
            (selectedTeam.completedVisits / selectedTeam.promisedVisits) * 100,
          ),
        )
      : 0
    : 0;

  return (
    <main className="min-h-screen bg-[#F5F6FA] text-slate-900">
      {/* Top bar */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#2D368F] text-sm font-black text-white">
              TH
            </div>
            <div className="leading-tight">
              <p className="text-sm font-bold text-slate-900">
                T-Homes Infra Pvt. Ltd.
              </p>
              <p className="text-xs text-slate-500">Partner Portal</p>
            </div>
          </div>
          <span className="hidden rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-[#EB2427] sm:inline-block">
            Site Visit Cab Booking
          </span>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Page title */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Book a site visit cab
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
            Fill in the visit, partner and customer details below. Our team will
            review your request and confirm the cab.
          </p>
        </div>

        {/* Success */}
        {success && (
          <div
            role="status"
            className="mb-6 flex gap-4 rounded-xl border border-emerald-200 bg-emerald-50 p-5"
          >
            <CheckCircle2 className="mt-0.5 h-6 w-6 shrink-0 text-emerald-600" />
            <div className="min-w-0">
              <h2 className="font-semibold text-emerald-900">
                Booking request submitted
              </h2>
              <p className="mt-1 text-sm text-emerald-800">{success}</p>

              {bookingId && (
                <p className="mt-3 inline-block break-all rounded-md bg-white px-3 py-1.5 text-xs text-emerald-900 ring-1 ring-emerald-200">
                  <span className="font-semibold">Booking ID:</span> {bookingId}
                </p>
              )}

              {sheetsSynced === false && (
                <p className="mt-3 text-sm font-medium text-emerald-900">
                  Your booking is saved in MongoDB. The administrator needs to
                  resolve the Google Sheets sync issue.
                </p>
              )}
            </div>
          </div>
        )}

        {/* Error */}
        {error && (
          <div
            role="alert"
            className="mb-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-700"
          >
            <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-3">
          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="space-y-6 lg:col-span-2"
            noValidate={false}
          >
            {/* Visit */}
            <Card
              step="1"
              title="Visit information"
              subtitle="When and where the customer will visit"
              icon={<CalendarDays className="h-4 w-4" />}
            >
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <Field label="Visit date" required>
                  <input
                    type="date"
                    required
                    min={minimumDate}
                    value={form.visitDate}
                    onChange={(e) => updateField("visitDate", e.target.value)}
                    className={inputClass}
                  />
                </Field>

                <Field label="Site visit time" required>
                  <input
                    type="time"
                    required
                    value={form.visitTime}
                    onChange={(e) => updateField("visitTime", e.target.value)}
                    className={inputClass}
                  />
                </Field>

                <Field label="Site name" required>
                  <select
                    required
                    value={form.siteName}
                    onChange={(e) => updateField("siteName", e.target.value)}
                    className={inputClass}
                    disabled={loadingOptions}
                  >
                    <option value="">Select venture</option>
                    {options.sites.map((site) => (
                      <option key={site} value={site}>
                        {site}
                      </option>
                    ))}
                  </select>
                </Field>

                <Field label="Cab requirement" required>
                  <select
                    required
                    value={form.cabType}
                    onChange={(e) => updateField("cabType", e.target.value)}
                    className={inputClass}
                  >
                    <option value="">Select cab type</option>
                    {options.cabTypes.map((cab) => (
                      <option key={cab} value={cab}>
                        {cab}
                      </option>
                    ))}
                  </select>
                </Field>

                <div className="sm:col-span-2">
                  <Field
                    label="Pickup location (Google Maps link)"
                    required
                    hint="Paste the Google Maps link for the customer pickup location or meeting point."
                  >
                    <div className="relative">
                      <MapPin className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                      <input
                        type="url"
                        required
                        value={form.locationLink}
                        onChange={(e) =>
                          updateField("locationLink", e.target.value)
                        }
                        placeholder="https://maps.google.com/..."
                        className={`${inputClass} pl-10`}
                      />
                    </div>
                  </Field>
                </div>
              </div>
            </Card>

            {/* Partner */}
            <Card
              step="2"
              title="Partner information"
              subtitle="Who is requesting the booking"
              icon={<Users className="h-4 w-4" />}
            >
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <Field label="Partner name" required>
                  <input
                    type="text"
                    required
                    maxLength={100}
                    value={form.partnerName}
                    onChange={(e) => updateField("partnerName", e.target.value)}
                    placeholder="Enter partner name"
                    className={inputClass}
                  />
                </Field>

                <Field
                  label="Agent code"
                  required
                  hint="Enter exactly six digits."
                >
                  <input
                    type="text"
                    required
                    inputMode="numeric"
                    pattern="[0-9]{6}"
                    minLength={6}
                    maxLength={6}
                    value={form.agentCode}
                    onChange={(e) =>
                      updateField(
                        "agentCode",
                        e.target.value.replace(/\D/g, "").slice(0, 6),
                      )
                    }
                    placeholder="6-digit agent code"
                    className={inputClass}
                  />
                </Field>

                <Field label="Team name" required>
                  <select
                    required
                    value={form.teamName}
                    onChange={(e) => handleTeamChange(e.target.value)}
                    className={inputClass}
                    disabled={loadingOptions}
                  >
                    <option value="">Select team</option>
                    {options.teams.map((team) => (
                      <option key={team.teamName} value={team.teamName}>
                        {team.teamName}
                      </option>
                    ))}
                  </select>
                </Field>

                <Field label="Leader name">
                  <input
                    type="text"
                    readOnly
                    value={selectedTeam?.leaderName || ""}
                    placeholder="Auto-filled from team"
                    className={`${inputClass} cursor-not-allowed bg-slate-50 text-slate-600`}
                  />
                </Field>

                <Field label="Partner mobile number" required>
                  <input
                    type="tel"
                    required
                    inputMode="numeric"
                    pattern="[0-9]{10}"
                    minLength={10}
                    maxLength={10}
                    value={form.partnerMobile}
                    onChange={(e) =>
                      updateField(
                        "partnerMobile",
                        e.target.value.replace(/\D/g, "").slice(0, 10),
                      )
                    }
                    placeholder="10-digit mobile number"
                    className={inputClass}
                  />
                </Field>

                <Field label="Booking requested by" required>
                  <select
                    required
                    value={form.requestedBy}
                    onChange={(e) => updateField("requestedBy", e.target.value)}
                    className={inputClass}
                  >
                    <option value="">Select leader</option>
                    {options.leaders.map((leader) => (
                      <option key={leader} value={leader}>
                        {leader}
                      </option>
                    ))}
                  </select>
                </Field>
              </div>
            </Card>

            {/* Customer */}
            <Card
              step="3"
              title="Customer information"
              subtitle="Who will be visiting the site"
              icon={<User className="h-4 w-4" />}
            >
              <div className="grid grid-cols-1 gap-5">
                <Field label="Customer name" required>
                  <input
                    type="text"
                    required
                    maxLength={100}
                    value={form.customerName}
                    onChange={(e) =>
                      updateField("customerName", e.target.value)
                    }
                    placeholder="Enter customer name"
                    className={inputClass}
                  />
                </Field>

                <Field label="Remarks (optional)">
                  <textarea
                    value={form.remarks}
                    onChange={(e) => updateField("remarks", e.target.value)}
                    maxLength={1000}
                    rows={3}
                    placeholder="Additional instructions..."
                    className={`${inputClass} resize-y`}
                  />
                </Field>
              </div>
            </Card>

            <div className="flex items-start gap-3 rounded-xl border border-blue-100 bg-blue-50/60 p-4 text-sm leading-6 text-slate-600">
              <Info className="mt-0.5 h-5 w-5 shrink-0 text-[#2D368F]" />
              <span>
                Please verify the customer details, date, time, and pickup
                location before submitting your cab booking request.
              </span>
            </div>

            <button
              type="submit"
              disabled={submitting || loadingOptions}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#EB2427] px-6 py-4 text-sm font-bold text-white shadow-sm transition hover:bg-[#d11d20] focus:outline-none focus:ring-4 focus:ring-red-200 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Send className="h-4 w-4" />
              {submitting ? "Submitting booking..." : "Submit cab booking"}
            </button>
          </form>

          {/* Sidebar */}
          <aside className="space-y-5 lg:sticky lg:top-6">
            <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="flex items-center gap-3 border-b border-slate-100 px-5 py-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-[#2D368F]">
                  <Users className="h-4 w-4" />
                </div>
                <div>
                  <h2 className="text-sm font-bold text-slate-900">
                    Team performance
                  </h2>
                  <p className="text-xs text-slate-500">
                    Promised vs completed visits
                  </p>
                </div>
              </div>

              <div className="p-5">
                {!selectedTeam ? (
                  <div className="py-6 text-center">
                    <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                      <Users className="h-5 w-5" />
                    </div>
                    <p className="text-sm font-semibold text-slate-800">
                      Select your team
                    </p>
                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      Choose a team to view its promised and completed site
                      visits.
                    </p>
                  </div>
                ) : (
                  <>
                    <p className="font-bold text-slate-900">
                      {selectedTeam.teamName}
                    </p>
                    <p className="mt-0.5 text-xs text-slate-500">
                      Leader: {selectedTeam.leaderName}
                    </p>

                    <div className="mt-4 grid grid-cols-2 gap-3">
                      <div className="rounded-xl bg-slate-50 p-4">
                        <p className="text-xs font-medium text-slate-500">
                          Promised
                        </p>
                        <p className="mt-1 text-3xl font-bold text-[#2D368F]">
                          {selectedTeam.promisedVisits}
                        </p>
                      </div>

                      <div className="rounded-xl bg-slate-50 p-4">
                        <p className="text-xs font-medium text-slate-500">
                          Completed
                        </p>
                        <p className="mt-1 text-3xl font-bold text-emerald-600">
                          {selectedTeam.completedVisits}
                        </p>
                      </div>
                    </div>

                    <div className="mt-5">
                      <div className="mb-2 flex justify-between text-xs">
                        <span className="font-medium text-slate-500">
                          Completion
                        </span>
                        <span className="font-bold text-slate-900">
                          {completion}%
                        </span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                        <div
                          className="h-full rounded-full bg-[#2D368F] transition-all"
                          style={{ width: `${completion}%` }}
                        />
                      </div>
                    </div>
                  </>
                )}
              </div>
            </section>

            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center gap-2">
                <Car className="h-4 w-4 text-[#EB2427]" />
                <h3 className="text-sm font-bold text-slate-900">
                  Booking guidelines
                </h3>
              </div>

              <ul className="mt-4 space-y-3 text-sm leading-5 text-slate-600">
                {[
                  "Submit accurate partner and customer details.",
                  "Select the correct team and cab type.",
                  "Provide a valid Google Maps location link.",
                  "A submitted request is not automatically a confirmed cab.",
                ].map((item, i) => (
                  <li key={item} className="flex gap-3">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-50 text-[10px] font-bold text-[#EB2427]">
                      {i + 1}
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          </aside>
        </div>

        <footer className="mt-10 flex items-center justify-center gap-2 text-xs text-slate-400">
          <Clock3 className="h-3.5 w-3.5" />© {new Date().getFullYear()} T-Homes
          Infra Pvt. Ltd. All rights reserved.
        </footer>
      </div>
    </main>
  );
}

const inputClass =
  "block w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-400 focus:border-[#2D368F] focus:ring-4 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-slate-100";

function Card({
  step,
  title,
  subtitle,
  icon,
  children,
}: {
  step: string;
  title: string;
  subtitle: string;
  icon: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="flex items-center gap-3 border-b border-slate-100 px-5 py-4 sm:px-6">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#2D368F] text-white">
          {icon}
        </div>
        <div className="min-w-0">
          <h2 className="text-base font-bold text-slate-900">{title}</h2>
          <p className="text-xs text-slate-500">{subtitle}</p>
        </div>
        <span className="ml-auto text-xs font-semibold text-slate-300">
          Step {step} of 3
        </span>
      </div>
      <div className="p-5 sm:p-6">{children}</div>
    </section>
  );
}

function Field({
  label,
  required,
  hint,
  children,
}: {
  label: string;
  required?: boolean;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-slate-700">
        {label}
        {required && <span className="ml-0.5 text-[#EB2427]">*</span>}
      </span>
      {children}
      {hint && (
        <span className="mt-1.5 block text-xs text-slate-500">{hint}</span>
      )}
    </label>
  );
}
