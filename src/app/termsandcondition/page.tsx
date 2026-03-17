"use client";
import { useState } from "react";
import {
  Globe,
  Building2,
  UserCheck,
  ShieldCheck,
  Link2,
  AlertTriangle,
  Scale,
  FilePen,
  Info,
  MapPin,
  BadgeAlert,
  Handshake,
  ChevronRight,
  FileText,
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

// ─── Data ─────────────────────────────────────────────────────────────
const sections = [
  {
    id: 1,
    Icon: Globe,
    title: "Use of Website",
    items: [
      "You agree to use this website for lawful purposes only.",
      "Any misuse, fraudulent activity, or unauthorized use of our services or information provided is strictly prohibited.",
    ],
  },
  {
    id: 2,
    Icon: Building2,
    title: "Property Information",
    items: [
      "All listings, prices, specifications, and availability of plots, apartments, gated communities, and commercial properties are subject to change without notice.",
      "We strive to provide accurate information, but we do not guarantee that all listings are current, complete, or error-free.",
    ],
  },
  {
    id: 3,
    Icon: UserCheck,
    title: "User Responsibilities",
    items: [
      "You must provide accurate personal information during inquiries or transactions.",
      "You agree not to post or transmit any material that is unlawful, threatening, defamatory, or harmful.",
    ],
  },
  {
    id: 4,
    Icon: ShieldCheck,
    title: "Intellectual Property",
    items: [
      "All website content including logos, text, graphics, images, and software is the property of T Homes Infra Pvt Ltd and protected under applicable copyright and trademark laws.",
      "You may not reproduce or distribute any content without prior written permission.",
    ],
  },
  {
    id: 5,
    Icon: Link2,
    title: "Third-Party Links",
    prose:
      "This website may contain links to external websites. We are not responsible for third party content or practices. You may use/refer to them at your own discretion.",
  },
  {
    id: 6,
    Icon: AlertTriangle,
    title: "Limitation of Liability",
    prose:
      "T Homes Infra Pvt Ltd shall not be held liable for any direct, indirect, or incidental damages arising out of the use of our website or services, whatsoever.",
  },
  {
    id: 7,
    Icon: Scale,
    title: "Governing Law",
    prose:
      "These Terms shall be governed by and interpreted under the laws of India. Any disputes will be resolved in the jurisdiction of Hyderabad.",
  },
  {
    id: 8,
    Icon: FilePen,
    title: "Modifications",
    prose:
      "We reserve the right to modify these Terms & Conditions at any time. Changes will be posted on this page.",
  },
];

const disclaimers = [
  {
    Icon: Info,
    title: "Disclaimer",
    body: "All information on this website is published in good faith and for general informational purposes only. T Homes Infra Pvt Ltd does not make any warranties about the completeness, reliability, or accuracy of this information.",
  },
  {
    Icon: MapPin,
    title: "Property Listings",
    body: "While we strive to keep property details updated, some listings may change, be sold, or withdrawn without notice. We advise all users to independently verify details before making a decision.",
  },
  {
    Icon: BadgeAlert,
    title: "No Legal or Financial Advice",
    body: "This website is not intended to provide legal, tax, or financial advice. Users should consult appropriate professionals for guidance based on their specific circumstances.",
  },
  {
    Icon: Handshake,
    title: "Third-Party Involvement",
    body: "We are not responsible for any losses or disputes arising from third-party services or external agents referenced or contacted through our platform.",
  },
];

// ─── Section Label ─────────────────────────────────────────────────────
function SectionLabel({ eyebrow, heading }: { eyebrow: string; heading: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 40 }}>
      <div style={{
        width: 4, height: 36, flexShrink: 0, borderRadius: 2,
        background: "linear-gradient(180deg, #C8202A 0%, #1B2A6B 100%)",
      }} />
      <div>
        <p style={{
          fontSize: 11, fontWeight: 600, letterSpacing: "0.16em",
          textTransform: "uppercase" as const, color: "#6B7280", marginBottom: 3,
        }}>
          {eyebrow}
        </p>
        <h2 style={{ fontSize: 24, fontWeight: 700, color: "#0B1120", letterSpacing: "-0.02em" }}>
          {heading}
        </h2>
      </div>
    </div>
  );
}

// ─── Main ──────────────────────────────────────────────────────────────
export default function TermsAndConditions() {
  const [activeCard, setActiveCard] = useState<number | null>(null);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; background: #F9FAFB; color: #374151; }
        a { text-decoration: none; color: inherit; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .fu   { animation: fadeUp 0.5s ease both; }
        .fu-1 { animation-delay: 0.04s; }
        .fu-2 { animation-delay: 0.10s; }
        .fu-3 { animation-delay: 0.17s; }
        .fu-4 { animation-delay: 0.24s; }

        .btn-primary {
          display: inline-flex; align-items: center; gap: 6px;
          background: #C8202A; color: #fff; font-weight: 600; font-size: 14px;
          padding: 10px 22px; border-radius: 6px; border: none; cursor: pointer;
          transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
          white-space: nowrap;
        }
        .btn-primary:hover {
          background: #A8181F; transform: translateY(-1px);
          box-shadow: 0 4px 18px rgba(200,32,42,0.32);
        }

        /* Term card */
        .term-card {
          background: #fff; border: 1px solid #E5E7EB; border-radius: 10px;
          padding: 28px 24px; position: relative; overflow: hidden; cursor: default;
          transition: box-shadow 0.22s, transform 0.18s, border-color 0.22s;
        }
        .term-card:hover {
          box-shadow: 0 10px 36px rgba(11,17,32,0.11);
          transform: translateY(-3px);
          border-color: #C8202A;
        }
        .term-card:hover .card-bar   { background: linear-gradient(90deg, #C8202A, #1B2A6B) !important; }
        .term-card:hover .card-icon-wrap { background: rgba(200,32,42,0.07) !important; border-color: rgba(200,32,42,0.18) !important; }
        .term-card:hover .card-icon  { color: #C8202A !important; }
        .term-card:hover .card-title { color: #C8202A !important; }
        .term-card:hover .card-num   { background: #C8202A !important; }

        /* Disclaimer card */
        .disc-card {
          background: #fff; border: 1px solid #E5E7EB; border-radius: 10px;
          border-top: 3px solid #E5E7EB; padding: 26px 22px;
          transition: box-shadow 0.22s, transform 0.18s, border-top-color 0.22s;
        }
        .disc-card:hover {
          box-shadow: 0 8px 28px rgba(11,17,32,0.10);
          transform: translateY(-2px);
          border-top-color: #C8202A;
        }
      `}</style>

      <div style={{ minHeight: "100vh", background: "#F9FAFB", fontFamily: "'Inter', sans-serif" }}>
    
        {/* ══ HERO BANNER ══ */}
        <section style={{
          background: "linear-gradient(135deg, #0B1120 0%, #1B2A6B 60%, #0F1E5A 100%)",
          position: "relative", overflow: "hidden", padding: "80px 24px 72px",
        }}>
          {/* Grid overlay */}
          <div style={{
            position: "absolute", inset: 0, pointerEvents: "none",
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px)," +
              "linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
          }} />
          {/* Red glow orb */}
          <div style={{
            position: "absolute", top: -100, right: -60, width: 420, height: 420,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(200,32,42,0.18) 0%, transparent 68%)",
            pointerEvents: "none",
          }} />

          <div style={{ maxWidth: 1180, margin: "0 auto", position: "relative", zIndex: 2 }}>
            {/* Badge */}
            <div className="fu fu-1" style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: "rgba(200,32,42,0.14)", border: "1px solid rgba(200,32,42,0.28)",
              color: "#FCA5A5", fontSize: 11, fontWeight: 600,
              letterSpacing: "0.14em", textTransform: "uppercase",
              padding: "5px 14px", borderRadius: 4, marginBottom: 22,
            }}>
              <FileText size={12} />
              Legal Document
            </div>

            {/* Heading */}
            <h1 className="fu fu-2" style={{
              fontSize: "clamp(38px, 5.5vw, 64px)", fontWeight: 800,
              color: "#fff", lineHeight: 1.08, letterSpacing: "-0.03em", marginBottom: 28,
            }}>
              Terms &amp;{" "}
              <span style={{ color: "#C8202A" }}>Conditions</span>
            </h1>

            {/* Meta chips */}
            <div className="fu fu-3" style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 32 }}>
              {[
                { label: "Effective Date", val: "10 March 2026" },
                { label: "Company",        val: "T Homes Infra Pvt Ltd" },
                { label: "Website",   val: "thomesinfra.com" },
              ].map((m) => (
                <div key={m.label} style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.11)",
                  borderRadius: 7, padding: "9px 18px",
                }}>
                  <div style={{
                    fontSize: 10, fontWeight: 600, letterSpacing: "0.14em",
                    textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: 4,
                  }}>
                    {m.label}
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 500, color: "#fff" }}>{m.val}</div>
                </div>
              ))}
            </div>

            {/* Intro paragraph */}
            <p className="fu fu-4" style={{
              fontSize: 16, lineHeight: 1.85,
              color: "rgba(255,255,255,0.52)", maxWidth: 660,
            }}>
              Welcome to the official website of{" "}
              <strong style={{ color: "rgba(255,255,255,0.88)", fontWeight: 600 }}>
                T Homes Infra Pvt Ltd
              </strong>
              . By accessing or using our website and services, you agree to comply with
              the following Terms &amp; Conditions. If you do not agree, please do not use
              our services or browse further.
            </p>
          </div>
        </section>

        {/* ══ MAIN CONTENT ══ */}
        <main style={{ maxWidth: 1180, margin: "0 auto", padding: "68px 24px 88px" }}>

          {/* ── Terms of Use ── */}
          <SectionLabel eyebrow="Legal Agreement" heading="Terms of Use" />

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(268px, 1fr))",
            gap: 20,
            marginBottom: 76,
          }}>
            {sections.map((sec) => (
              <div
                key={sec.id}
                className="term-card"
                onMouseEnter={() => setActiveCard(sec.id)}
                onMouseLeave={() => setActiveCard(null)}
              >
                {/* Top bar */}
                <div className="card-bar" style={{
                  position: "absolute", top: 0, left: 0, right: 0, height: 3,
                  background: "#E5E7EB", transition: "background 0.25s",
                }} />

                {/* Icon + Number row */}
                <div style={{
                  display: "flex", alignItems: "flex-start",
                  justifyContent: "space-between", marginBottom: 18,
                }}>
                  <div className="card-icon-wrap" style={{
                    width: 44, height: 44, borderRadius: 9,
                    background: "#F3F4F6", border: "1px solid #E5E7EB",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    transition: "background 0.25s, border-color 0.25s",
                  }}>
                    <sec.Icon
                      className="card-icon"
                      size={20}
                      strokeWidth={1.75}
                      style={{ color: "#1B2A6B", transition: "color 0.25s" }}
                    />
                  </div>
                  <div className="card-num" style={{
                    width: 28, height: 28, borderRadius: 6,
                    background: "#0B1120", color: "#fff",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 11, fontWeight: 700, letterSpacing: "0.04em",
                    transition: "background 0.25s", flexShrink: 0,
                  }}>
                    {String(sec.id).padStart(2, "0")}
                  </div>
                </div>

                {/* Title */}
                <h3 className="card-title" style={{
                  fontSize: 15, fontWeight: 700, color: "#111827",
                  marginBottom: 14, transition: "color 0.25s",
                }}>
                  {sec.title}
                </h3>

                {/* Divider */}
                <div style={{ height: 1, background: "#F3F4F6", marginBottom: 14 }} />

                {/* Body */}
                {sec.prose ? (
                  <p style={{ fontSize: 14, lineHeight: 1.82, color: "#6B7280" }}>
                    {sec.prose}
                  </p>
                ) : (
                  <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
                    {sec.items?.map((item, i) => (
                      <li key={i} style={{
                        display: "flex", gap: 8, alignItems: "flex-start",
                        fontSize: 14, lineHeight: 1.75, color: "#6B7280",
                      }}>
                        <ChevronRight
                          size={13} strokeWidth={2.5}
                          style={{ color: "#C8202A", marginTop: 3, flexShrink: 0 }}
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>

          {/* ── Important Notices ── */}
          <SectionLabel eyebrow="Please Note" heading="Important Notices" />

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
            gap: 18,
            marginBottom: 72,
          }}>
            {disclaimers.map((d, i) => (
              <div key={i} className="disc-card">
                <div style={{
                  width: 46, height: 46, borderRadius: 9,
                  background: "rgba(27,42,107,0.06)",
                  border: "1px solid rgba(27,42,107,0.12)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  marginBottom: 16,
                }}>
                  <d.Icon size={21} strokeWidth={1.7} style={{ color: "#1B2A6B" }} />
                </div>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: "#0B1120", marginBottom: 10 }}>
                  {d.title}
                </h3>
                <p style={{ fontSize: 13, lineHeight: 1.84, color: "#6B7280" }}>{d.body}</p>
              </div>
            ))}
          </div>

          {/* ── CTA Strip ── */}
          <div style={{
            background: "linear-gradient(135deg, #0B1120 0%, #1B2A6B 100%)",
            borderRadius: 12, padding: "44px 40px",
            display: "flex", alignItems: "center",
            justifyContent: "space-between", flexWrap: "wrap", gap: 24,
          }}>
            <div>
              <h3 style={{ fontSize: 22, fontWeight: 700, color: "#fff", marginBottom: 8 }}>
                Have Questions About These Terms?
              </h3>
              <p style={{ fontSize: 14, color: "rgba(255,255,255,0.52)", maxWidth: 440 }}>
                Our team is happy to clarify anything. Reach out to us at our Banjara Hills
                office or drop an inquiry online.
              </p>
            </div>
            <a href="https://thomesinfra.com/contact" className="btn-primary">
              Contact Us <ChevronRight size={15} />
            </a>
          </div>

        </main>
        
      </div>
    </>
  );
}