"use client";

import { useEffect, useMemo, useState } from "react";
import type { FormEvent, ReactNode } from "react";
import {
  Activity,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Copy,
  MapPin,
  RefreshCw,
  Search,
  ShieldCheck,
  XCircle,
} from "lucide-react";

type Booking = {
  id: string;
  visitDate: string;
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
  remarks?: string;
  status: string;
  createdAt?: string;
  updatedAt?: string;
  cabAssignment?: string;
  driverName?: string;
  driverPhone?: string;
  actualVisitDate?: string | null;
  completionNotes?: string;
  adminRemarks?: string;
  rescheduledDate?: string | null;
  rescheduledTime?: string;
};
type Analytics = {
  teamName: string;
  promisedVisits: number;
  completedVisits: number;
};
type Payload = {
  bookings: Booking[];
  summary: {
    total: number;
    upcoming: number;
    pending: number;
    completed: number;
    cancelled: number;
  };
  analytics: Analytics[];
  options: {
    teams: string[];
    leaders: string[];
    sites: string[];
    statuses: string[];
  };
};
const statuses = [
  "Requested",
  "Confirmed",
  "Cab Assigned",
  "Completed",
  "Cancelled",
  "Rescheduled",
  "Customer No-Show",
];
const dateText = (value?: string | null) =>
  value
    ? new Date(value).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        timeZone: "Asia/Kolkata",
      })
    : "—";
const dateInput = (value?: string | null) =>
  value ? new Date(value).toISOString().slice(0, 10) : "";
const fmt = (value?: string | null) => value?.trim() || "—";

export default function SiteVisitsAdminPage() {
  const [data, setData] = useState<Payload | null>(null);
  const [selectedId, setSelectedId] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [team, setTeam] = useState("");
  const [leader, setLeader] = useState("");
  const [site, setSite] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [chartMode, setChartMode] = useState<
    "promised" | "completed" | "compare"
  >("compare");
  const [edit, setEdit] = useState<Record<string, string>>({});
  const [targetDrafts, setTargetDrafts] = useState<Record<string, string>>({});
  const [targetSaving, setTargetSaving] = useState("");

  async function load() {
    setLoading(true);
    setError("");
    const params = new URLSearchParams();
    Object.entries({ search, status, team, leader, site, from, to }).forEach(
      ([k, v]) => {
        if (v) params.set(k, v);
      },
    );
    try {
      const response = await fetch(
        `/api/admin/sitevisits?${params.toString()}`,
        { cache: "no-store" },
      );
      const result = await response.json();
      if (!response.ok)
        throw new Error(result.error || "Could not load bookings.");
      setData(result);
      setTargetDrafts((current) => {
        const next = { ...current };
        for (const row of result.analytics as Analytics[])
          if (!(row.teamName in next))
            next[row.teamName] = String(row.promisedVisits);
        return next;
      });
      setSelectedId((current) =>
        result.bookings.some((b: Booking) => b.id === current)
          ? current
          : result.bookings[0]?.id || "",
      );
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    void load();
  }, [search, status, team, leader, site, from, to]);
  const selected = useMemo(
    () => data?.bookings.find((b) => b.id === selectedId) || null,
    [data, selectedId],
  );
  useEffect(() => {
    if (!selected) {
      setEdit({});
      return;
    }
    setEdit({
      status: selected.status || "Requested",
      cabAssignment: selected.cabAssignment || "",
      driverName: selected.driverName || "",
      driverPhone: selected.driverPhone || "",
      actualVisitDate: dateInput(selected.actualVisitDate),
      completionNotes: selected.completionNotes || "",
      adminRemarks: selected.adminRemarks || "",
      rescheduledDate: dateInput(selected.rescheduledDate),
      rescheduledTime: selected.rescheduledTime || "",
    });
  }, [selectedId, selected?.updatedAt]);
  async function updateBooking(event: FormEvent) {
    event.preventDefault();
    if (!selected) return;
    setSaving(true);
    setError("");
    setNotice("");
    try {
      const response = await fetch(`/api/admin/sitevisits/${selected.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(edit),
      });
      const result = await response.json();
      if (!response.ok)
        throw new Error(result.error || "Could not save changes.");
      setNotice("Booking updated successfully.");
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not save changes.");
    } finally {
      setSaving(false);
    }
  }
  async function saveTarget(teamName: string) {
    const promisedVisits = Number(targetDrafts[teamName] ?? "0");
    if (!Number.isInteger(promisedVisits) || promisedVisits < 0) {
      setError("Promised target must be a whole number of zero or more.");
      return;
    }
    setTargetSaving(teamName);
    setError("");
    setNotice("");
    try {
      const response = await fetch("/api/admin/sitevisits/targets", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ teamName, promisedVisits }),
      });
      const result = await response.json();
      if (!response.ok)
        throw new Error(result.error || "Could not save promised target.");
      setNotice(`${teamName} promised target saved.`);
      await load();
    } catch (e) {
      setError(
        e instanceof Error ? e.message : "Could not save promised target.",
      );
    } finally {
      setTargetSaving("");
    }
  }

  async function copyDetails() {
    if (!selected) return;

    const text = [
      "T-HOMES INFRA — SITE VISIT DETAILS",
      `Visit Date: ${dateText(selected.visitDate)}`,
      `Visit Time: ${selected.visitTime}`,

      `Partner: ${selected.partnerName}`,

      `Partner Mobile: ${selected.partnerMobile}`,

      `Leader: ${selected.leaderName}`,
      `Site: ${selected.siteName}`,
      `Location: ${selected.locationLink}`,
      `Cab Type: ${selected.cabType}`,
    ].join("\n");

    try {
      if (!navigator.clipboard?.writeText) {
        throw new Error("CLIPBOARD_UNAVAILABLE");
      }

      // Call directly from the user's button click.
      await navigator.clipboard.writeText(text);

      setNotice("Full booking details copied.");
    } catch (error) {
      console.error("Clipboard error:", error);

      if (error instanceof Error && error.message === "CLIPBOARD_UNAVAILABLE") {
        setError(
          "Clipboard is unavailable. Open this page using HTTPS or localhost.",
        );
      } else {
        setError(
          "Could not copy details. Check browser permissions and try again.",
        );
      }
    }
  }

  const chartMax = Math.max(
    1,
    ...(data?.analytics || []).map((x) =>
      Math.max(x.promisedVisits, x.completedVisits),
    ),
  );

  return (
    <main className="min-h-screen bg-[#F5F6FA] text-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-4 px-4 py-3.5 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#2D368F] text-white">
              <ShieldCheck size={20} />
            </div>
            <div className="leading-tight">
              <p className="text-[11px] font-bold uppercase tracking-[.18em] text-[#EB2427]">
                T-Homes Infra
              </p>
              <h1 className="text-lg font-bold tracking-tight">
                Site Visit Control Center
              </h1>
            </div>
          </div>
          <button
            onClick={() => void load()}
            className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
          >
            <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
            Refresh
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-[1600px] space-y-6 px-4 py-6 lg:px-8">
        {error && (
          <div
            role="alert"
            className="rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700"
          >
            {error}
          </div>
        )}
        {notice && (
          <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800">
            {notice}
          </div>
        )}

        {/* Metrics */}
        <section className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-5">
          <Metric
            label="Total bookings"
            value={data?.summary.total ?? "—"}
            icon={<CalendarDays size={18} />}
            tint="slate"
          />
          <Metric
            label="Upcoming visits"
            value={data?.summary.upcoming ?? "—"}
            icon={<Clock3 size={18} />}
            tint="blue"
          />
          <Metric
            label="Pending confirmation"
            value={data?.summary.pending ?? "—"}
            icon={<Activity size={18} />}
            tint="amber"
          />
          <Metric
            label="Completed visits"
            value={data?.summary.completed ?? "—"}
            icon={<CheckCircle2 size={18} />}
            tint="green"
          />
          <Metric
            label="Cancelled visits"
            value={data?.summary.cancelled ?? "—"}
            icon={<XCircle size={18} />}
            tint="rose"
          />
        </section>

        <section className="grid grid-cols-1 gap-6 2xl:grid-cols-[minmax(0,1.65fr)_minmax(400px,.85fr)]">
          {/* Table */}
          <div className="min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-3 px-5 pb-4 pt-5">
              <div>
                <h2 className="text-base font-bold">Registered site visits</h2>
                <p className="mt-0.5 text-sm text-slate-500">
                  Select a booking to review or manage its status.
                </p>
              </div>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                {data?.bookings.length ?? 0} shown
              </span>
            </div>

            <div className="grid grid-cols-1 gap-3 border-y border-slate-100 bg-slate-50/60 p-4 md:grid-cols-2 xl:grid-cols-3">
              <label className="relative md:col-span-2 xl:col-span-1">
                <Search
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search customer, partner, agent…"
                  className="w-full rounded-lg border border-slate-200 bg-white py-2.5 pl-9 pr-3 text-sm outline-none transition focus:border-[#2D368F] focus:ring-4 focus:ring-blue-100"
                />
              </label>
              <Filter
                value={status}
                onChange={setStatus}
                label="All statuses"
                options={statuses.map((v) => ({ label: v, value: v }))}
              />
              <Filter
                value={team}
                onChange={setTeam}
                label="All teams"
                options={(data?.options.teams || []).map((v) => ({
                  label: v,
                  value: v,
                }))}
              />
              <Filter
                value={leader}
                onChange={setLeader}
                label="All leaders"
                options={(data?.options.leaders || []).map((v) => ({
                  label: v,
                  value: v,
                }))}
              />
              <Filter
                value={site}
                onChange={setSite}
                label="All sites"
                options={(data?.options.sites || []).map((v) => ({
                  label: v,
                  value: v,
                }))}
              />
              <div className="flex gap-2">
                <input
                  aria-label="From date"
                  type="date"
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                  className="w-full min-w-0 rounded-lg border border-slate-200 bg-white px-2.5 py-2.5 text-sm outline-none focus:border-[#2D368F] focus:ring-4 focus:ring-blue-100"
                />
                <input
                  aria-label="To date"
                  type="date"
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                  className="w-full min-w-0 rounded-lg border border-slate-200 bg-white px-2.5 py-2.5 text-sm outline-none focus:border-[#2D368F] focus:ring-4 focus:ring-blue-100"
                />
              </div>
            </div>

            <div className="max-h-[680px] overflow-auto">
              <table className="w-full min-w-[820px] border-collapse text-left text-sm">
                <thead className="sticky top-0 z-10 bg-white text-[11px] uppercase tracking-wider text-slate-500 shadow-[0_1px_0_0_#e2e8f0]">
                  <tr>
                    {[
                      "Visit date / time",
                      "Customer / partner",
                      "Team / leader",
                      "Site",
                      "Status",
                    ].map((h) => (
                      <th key={h} className="px-5 py-3 font-semibold">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {loading && !data ? (
                    <tr>
                      <td
                        colSpan={5}
                        className="p-10 text-center text-slate-500"
                      >
                        Loading bookings…
                      </td>
                    </tr>
                  ) : (
                    data?.bookings.map((b) => (
                      <tr
                        key={b.id}
                        onClick={() => setSelectedId(b.id)}
                        className={`cursor-pointer transition hover:bg-slate-50 ${
                          selectedId === b.id
                            ? "bg-blue-50/70 shadow-[inset_3px_0_0_0_#2D368F]"
                            : ""
                        }`}
                      >
                        <td className="whitespace-nowrap px-5 py-4">
                          <div className="font-semibold">
                            {dateText(b.visitDate)}
                          </div>
                          <div className="mt-0.5 text-xs text-slate-500">
                            {b.visitTime}
                          </div>
                        </td>
                        <td className="px-5 py-4">
                          <div className="font-semibold">{b.customerName}</div>
                          <div className="mt-0.5 text-xs text-slate-500">
                            {b.partnerName} · {b.agentCode}
                          </div>
                        </td>
                        <td className="px-5 py-4">
                          <div className="font-medium">{b.teamName}</div>
                          <div className="mt-0.5 text-xs text-slate-500">
                            {b.leaderName}
                          </div>
                        </td>
                        <td className="px-5 py-4">
                          <div className="font-medium">{b.siteName}</div>
                          <a
                            href={b.locationLink}
                            target="_blank"
                            rel="noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="mt-0.5 inline-flex items-center gap-1 text-xs font-medium text-[#2D368F] hover:underline"
                          >
                            <MapPin size={12} /> Open map
                          </a>
                        </td>
                        <td className="px-5 py-4">
                          <StatusPill status={b.status} />
                        </td>
                      </tr>
                    ))
                  )}
                  {!loading && data?.bookings.length === 0 && (
                    <tr>
                      <td
                        colSpan={5}
                        className="p-10 text-center text-slate-500"
                      >
                        No bookings match these filters.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Details */}
          <aside className="min-w-0 self-start overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm 2xl:sticky 2xl:top-20">
            <div className="flex items-center justify-between gap-3 border-b border-slate-100 px-5 py-4">
              <div>
                <h2 className="text-base font-bold">Booking details</h2>
                <p className="mt-0.5 text-xs text-slate-500">
                  Review, copy or update the selected visit.
                </p>
              </div>
              <button
                disabled={!selected}
                onClick={() => void copyDetails()}
                className="flex shrink-0 items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:opacity-40"
              >
                <Copy size={14} /> Copy
              </button>
            </div>

            {!selected ? (
              <div className="p-10 text-center text-sm text-slate-500">
                Choose a booking from the table to see its details.
              </div>
            ) : (
              <>
                <div className="space-y-5 border-b border-slate-100 p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                        Customer
                      </p>
                      <h3 className="mt-1 text-xl font-bold leading-tight">
                        {selected.customerName}
                      </h3>
                      <p className="mt-1 break-all text-xs text-slate-500">
                        ID · {selected.id}
                      </p>
                    </div>
                    <StatusPill status={selected.status} />
                  </div>

                  <div className="grid grid-cols-2 gap-x-4 gap-y-4 rounded-xl bg-slate-50 p-4">
                    <Info
                      label="Visit date"
                      value={dateText(selected.visitDate)}
                    />
                    <Info label="Visit time" value={selected.visitTime} />
                    <Info label="Partner" value={selected.partnerName} />
                    <Info label="Agent code" value={selected.agentCode} />
                    <Info
                      label="Partner mobile"
                      value={selected.partnerMobile}
                    />
                    <Info label="Cab type" value={selected.cabType} />
                    <Info label="Team" value={selected.teamName} />
                    <Info label="Leader" value={selected.leaderName} />
                    <Info label="Site" value={selected.siteName} />
                    <Info label="Requested by" value={selected.requestedBy} />
                  </div>

                  <a
                    href={selected.locationLink}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 rounded-lg border border-blue-100 bg-blue-50 px-3.5 py-2.5 text-sm font-semibold text-[#2D368F] transition hover:bg-blue-100"
                  >
                    <MapPin size={16} /> Open site location
                    <span className="ml-auto">↗</span>
                  </a>
                  <Info label="Partner remarks" value={fmt(selected.remarks)} />
                </div>

                <form onSubmit={updateBooking} className="space-y-4 p-5">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500">
                    Manage booking
                  </h3>
                  <Field label="Booking status">
                    <select
                      value={edit.status || "Requested"}
                      onChange={(e) =>
                        setEdit({ ...edit, status: e.target.value })
                      }
                      className="field"
                    >
                      {Array.from(new Set([...statuses, selected.status])).map(
                        (s) => (
                          <option key={s}>{s}</option>
                        ),
                      )}
                    </select>
                  </Field>
                  <div className="grid grid-cols-2 gap-3">
                    <Field label="Cab / vehicle assignment">
                      <input
                        value={edit.cabAssignment || ""}
                        onChange={(e) =>
                          setEdit({ ...edit, cabAssignment: e.target.value })
                        }
                        placeholder="Vehicle / cab no."
                        className="field"
                      />
                    </Field>
                    <Field label="Driver name">
                      <input
                        value={edit.driverName || ""}
                        onChange={(e) =>
                          setEdit({ ...edit, driverName: e.target.value })
                        }
                        placeholder="Driver name"
                        className="field"
                      />
                    </Field>
                    <Field label="Driver phone">
                      <input
                        value={edit.driverPhone || ""}
                        onChange={(e) =>
                          setEdit({ ...edit, driverPhone: e.target.value })
                        }
                        placeholder="Phone number"
                        className="field"
                      />
                    </Field>
                    <Field label="Actual visit date">
                      <input
                        type="date"
                        value={edit.actualVisitDate || ""}
                        onChange={(e) =>
                          setEdit({ ...edit, actualVisitDate: e.target.value })
                        }
                        className="field"
                      />
                    </Field>
                    <Field label="Rescheduled date">
                      <input
                        type="date"
                        value={edit.rescheduledDate || ""}
                        onChange={(e) =>
                          setEdit({ ...edit, rescheduledDate: e.target.value })
                        }
                        className="field"
                      />
                    </Field>
                    <Field label="Rescheduled time">
                      <input
                        type="time"
                        value={edit.rescheduledTime || ""}
                        onChange={(e) =>
                          setEdit({ ...edit, rescheduledTime: e.target.value })
                        }
                        className="field"
                      />
                    </Field>
                  </div>
                  <Field label="Completion notes">
                    <textarea
                      rows={2}
                      value={edit.completionNotes || ""}
                      onChange={(e) =>
                        setEdit({ ...edit, completionNotes: e.target.value })
                      }
                      placeholder="Outcome of the site visit…"
                      className="field resize-y"
                    />
                  </Field>
                  <Field label="Internal admin remarks">
                    <textarea
                      rows={2}
                      value={edit.adminRemarks || ""}
                      onChange={(e) =>
                        setEdit({ ...edit, adminRemarks: e.target.value })
                      }
                      placeholder="Visible to admins only…"
                      className="field resize-y"
                    />
                  </Field>
                  <button
                    disabled={saving}
                    type="submit"
                    className="w-full rounded-lg bg-[#2D368F] px-4 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-[#242c75] focus:outline-none focus:ring-4 focus:ring-blue-200 disabled:opacity-60"
                  >
                    {saving ? "Saving changes…" : "Save booking updates"}
                  </button>
                </form>
              </>
            )}
          </aside>
        </section>

        {/* Analytics */}
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-base font-bold">Team visit analytics</h2>
              <p className="mt-0.5 text-sm text-slate-500">
                Completed visits count only bookings marked completed by an
                admin.
              </p>
            </div>
            <div className="inline-flex rounded-lg bg-slate-100 p-1">
              {(
                [
                  { v: "compare", l: "Promised vs completed" },
                  { v: "promised", l: "Promised" },
                  { v: "completed", l: "Completed" },
                ] as const
              ).map((x) => (
                <button
                  key={x.v}
                  onClick={() => setChartMode(x.v)}
                  className={`rounded-md px-3 py-1.5 text-xs font-semibold transition ${
                    chartMode === x.v
                      ? "bg-white text-[#2D368F] shadow-sm"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  {x.l}
                </button>
              ))}
            </div>
          </div>

          {!data?.analytics.length ? (
            <p className="py-10 text-center text-sm text-slate-500">
              Team analytics will appear when booking or promised-target data
              exists.
            </p>
          ) : (
            <div className="mt-6 divide-y divide-slate-100">
              {data.analytics.map((item) => (
                <div
                  key={item.teamName}
                  className="grid grid-cols-1 gap-3 py-4 first:pt-0 last:pb-0 md:grid-cols-[170px_minmax(0,1fr)_260px] md:items-center"
                >
                  <div className="text-sm font-bold">{item.teamName}</div>
                  <div className="space-y-2">
                    {(chartMode === "compare" || chartMode === "promised") && (
                      <Bar
                        label="Promised"
                        value={item.promisedVisits}
                        max={chartMax}
                        kind="blue"
                      />
                    )}
                    {(chartMode === "compare" || chartMode === "completed") && (
                      <Bar
                        label="Completed"
                        value={item.completedVisits}
                        max={chartMax}
                        kind="green"
                      />
                    )}
                  </div>
                  <div className="flex items-center justify-between gap-3 md:justify-end">
                    <div className="text-xs text-slate-500">
                      {item.completedVisits} / {item.promisedVisits} done
                    </div>
                    <div className="flex items-center gap-1.5">
                      <input
                        aria-label={`${item.teamName} promised visits`}
                        type="number"
                        min="0"
                        step="1"
                        value={
                          targetDrafts[item.teamName] ??
                          String(item.promisedVisits)
                        }
                        onChange={(e) =>
                          setTargetDrafts({
                            ...targetDrafts,
                            [item.teamName]: e.target.value,
                          })
                        }
                        className="w-16 rounded-lg border border-slate-200 px-2 py-1.5 text-sm outline-none focus:border-[#2D368F] focus:ring-4 focus:ring-blue-100"
                      />
                      <button
                        onClick={() => void saveTarget(item.teamName)}
                        disabled={targetSaving === item.teamName}
                        className="rounded-lg bg-[#2D368F] px-3 py-1.5 text-xs font-bold text-white transition hover:bg-[#242c75] disabled:opacity-50"
                      >
                        {targetSaving === item.teamName ? "…" : "Save"}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        <p className="pb-4 text-center text-xs text-slate-400">
          T-Homes Infra · Admin-only site visit operations
        </p>
      </div>

      <style jsx global>{`
        .field {
          width: 100%;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          padding: 9px 11px;
          font-size: 13px;
          outline: none;
          background: white;
          transition:
            border-color 0.15s,
            box-shadow 0.15s;
        }
        .field:hover {
          border-color: #cbd5e1;
        }
        .field:focus {
          border-color: #2d368f;
          box-shadow: 0 0 0 3px #dbe3ff;
        }
        .field::placeholder {
          color: #9ca3af;
        }
      `}</style>
    </main>
  );
}

function Metric({
  label,
  value,
  icon,
  tint,
}: {
  label: string;
  value: number | string;
  icon: ReactNode;
  tint: string;
}) {
  const colors: Record<string, string> = {
    slate: "bg-slate-100 text-slate-600",
    blue: "bg-blue-50 text-[#2D368F]",
    amber: "bg-amber-50 text-amber-600",
    green: "bg-emerald-50 text-emerald-600",
    rose: "bg-rose-50 text-rose-600",
  };
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-center gap-3">
        <span
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${colors[tint]}`}
        >
          {icon}
        </span>
        <div className="min-w-0">
          <p className="text-2xl font-bold leading-none tracking-tight">
            {value}
          </p>
          <p className="mt-1.5 truncate text-xs font-medium text-slate-500">
            {label}
          </p>
        </div>
      </div>
    </div>
  );
}
function Filter({
  value,
  onChange,
  label,
  options,
}: {
  value: string;
  onChange: (v: string) => void;
  label: string;
  options: { label: string; value: string }[];
}) {
  return (
    <select
      aria-label={label}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-[#2D368F] focus:ring-4 focus:ring-blue-100"
    >
      <option value="">{label}</option>
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  );
}
function StatusPill({ status }: { status: string }) {
  const kind = status.toLowerCase().includes("complete")
    ? "bg-emerald-50 text-emerald-700 ring-emerald-200"
    : status === "Cancelled" || status === "Customer No-Show"
      ? "bg-rose-50 text-rose-700 ring-rose-200"
      : status === "Confirmed" || status === "Cab Assigned"
        ? "bg-blue-50 text-blue-700 ring-blue-200"
        : status === "Rescheduled"
          ? "bg-violet-50 text-violet-700 ring-violet-200"
          : "bg-amber-50 text-amber-800 ring-amber-200";
  return (
    <span
      className={`inline-flex items-center whitespace-nowrap rounded-full px-2.5 py-1 text-[11px] font-semibold ring-1 ring-inset ${kind}`}
    >
      {status}
    </span>
  );
}
function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0">
      <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
        {label}
      </p>
      <p className="mt-0.5 break-words text-sm font-medium text-slate-800">
        {value}
      </p>
    </div>
  );
}
function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block min-w-0">
      <span className="mb-1.5 block text-xs font-semibold text-slate-600">
        {label}
      </span>
      {children}
    </label>
  );
}
function Bar({
  label,
  value,
  max,
  kind,
}: {
  label: string;
  value: number;
  max: number;
  kind: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="w-[96px] shrink-0 text-[11px] font-medium text-slate-500">
        {label} · {value}
      </span>
      <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-slate-100">
        <div
          className={`h-full rounded-full transition-all ${kind === "blue" ? "bg-[#2D368F]" : "bg-emerald-500"}`}
          style={{ width: `${Math.min(100, (value / max) * 100)}%` }}
        />
      </div>
    </div>
  );
}
