"use client";

import React from "react";
import { motion } from "framer-motion";

// ─── Image URLs ───────────────────────────────────────────────────────────────
const LOGO             = "https://thomestowers.com/wp-content/uploads/2026/03/T-Homes-Logo-1.png";
const BUILDING         = "https://thomestowers.com/wp-content/uploads/2026/03/South-East-View-1-scaled-removebg-preview.png";
const SCALE_IMG        = "https://thomestowers.com/wp-content/uploads/2026/02/Night-Areal-Vie-scaled-1.webp";
const HMDA_LOGO        = "https://thomestowers.com/wp-content/uploads/2026/03/HMDA_logo1.jpg";
const RERA_LOGO        = "https://thomestowers.com/wp-content/uploads/2026/03/1923609-10.jpg";
const ASSURANCE_BUILDING = "https://thomestowers.com/wp-content/uploads/2025/12/srenj4-scaled.jpg";

const LUXURY_IMAGES = [
  { src: "https://thomestowers.com/wp-content/uploads/2026/02/happy-family-portrait-roof-with-kids-real-estate-moving-new-home-together-excited-mother-father-children-with-smile-shelter-property-apartment-house-insurance-start_590464-422994.webp", alt: "Family" },
  { src: "https://thomestowers.com/wp-content/uploads/2026/02/Vanity-scaled-2.webp",   alt: "Vanity"   },
  { src: "https://thomestowers.com/wp-content/uploads/2026/02/Toilet-scaled-1.webp",   alt: "Toilet"   },
  { src: "https://thomestowers.com/wp-content/uploads/2026/02/8-1.webp",               alt: "Room 1"   },
  { src: "https://thomestowers.com/wp-content/uploads/2026/02/7-1.webp",               alt: "Room 2"   },
];

const AMENITY_IMAGES = [
  { src: "https://thomestowers.com/wp-content/uploads/2025/12/unnamed-13.jpg",                                                              alt: "Swimming Pool", featured: true  },
  { src: "https://thomestowers.com/wp-content/uploads/2025/12/5-3.png",                                                                     alt: "Amenity 2",     featured: false },
  { src: "https://thomestowers.com/wp-content/uploads/2025/12/3-2.png",                                                                     alt: "Amenity 3",     featured: false },
  { src: "https://thomestowers.com/wp-content/uploads/2025/12/T-Homes-_-Jumeirah-Towers-Floor-Plan-2_page-0001-scaled.jpg",                 alt: "Floor Plan",    featured: false },
];

const CONNECTIVITY = [
  { name: "Exist IA",                   time: "12 min", image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=200&q=80" },
  { name: "RGIA",                       time: "35 min", image: "https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=200&q=80" },
  { name: "ICFAI",                      time: "5 min",  image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=200&q=80" },
  { name: "Neopolis",                   time: "10 min", image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=200&q=80" },
  { name: "Gaudium School",             time: "15 min", image: "https://images.unsplash.com/photo-1564399579883-451a5d44e5f0?w=200&q=80" },
  { name: "Indus International School", time: "5 min",  image: "https://images.unsplash.com/photo-1588072432836-e10032774350?w=200&q=80" },
  { name: "Continental Hospital",       time: "20 min", image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=200&q=80" },
];

const AMENITIES = [
  "15,000 Sq. ft. Clubhouse", "Squash Court",               "Meeting Rooms",
  "Swimming Pool and Deck",   "Basket Ball Court",           "Banquet Hall",
  "Indoor Gym Sauna",         "Children's Play Zone",        "Yoga Studio",
  "Cricketing Net",           "Relaxation Park for Elders",  "Reading Room",
];

const STATS = [
  { value: "1.93",  label: "Acres"     },
  { value: "68%",   label: "Open Space"},
  { value: "3 BHK", label: "Community" },
  { value: "17",    label: "Levels"    },
  { value: "159",   label: "Units"     },
];

interface FormState {
  name: string; email: string; occupation: string; code: string; phone: string;
  checks: { mokila: boolean; hyderabad: boolean; months: boolean };
}

const BG    = "#e8e5df";
const NAVY  = "#1a2e5a";
const GREEN = "#4caf3a";
const WHITE = "#ffffff";

// ═══════════════════════════════════════════════════════════════════════════════
export default function XXLPage() {
  const [form, setForm] = React.useState<FormState>({
    name: "", email: "", occupation: "", code: "", phone: "",
    checks: { mokila: false, hyderabad: false, months: false },
  });
  const [scrolled,    setScrolled]    = React.useState(false);
  const [menuOpen,    setMenuOpen]    = React.useState(false);
  const [toast,       setToast]       = React.useState(false);

  React.useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setForm(p => ({ ...p, checks: { ...p.checks, [name]: checked } }));
    } else {
      setForm(p => ({ ...p, [name]: value }));
    }
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setToast(true);
    setMenuOpen(false);
    setForm({ name: "", email: "", occupation: "", code: "", phone: "", checks: { mokila: false, hyderabad: false, months: false } });
    setTimeout(() => setToast(false), 4000);
  };

  const navLinks: [string, string][] = [
    ["#amenities", "Amenities"],
    ["#layout",    "Layout plan"],
    ["#location",  "Location"],
    ["#contact",   "Call for site visit"],
  ];

  return (
    <div style={{ fontFamily: "'Montserrat',sans-serif", background: BG, overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800;900&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        a { text-decoration: none; color: inherit; cursor: pointer; }
        input, button { font-family: 'Montserrat', sans-serif; }
        input:focus { outline: none !important; border-color: ${NAVY} !important; }

        /* ── noise texture ── */
        .tex {
          background-color: ${BG};
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='.045'/%3E%3C/svg%3E");
        }

        /* ── hamburger button ── */
        .hamburger {
          display: none;
          flex-direction: column;
          justify-content: center;
          gap: 5px;
          width: 36px;
          height: 36px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 4px;
          z-index: 300;
        }
        .hamburger span {
          display: block;
          width: 100%;
          height: 2px;
          background: #444;
          border-radius: 2px;
          transition: all .3s;
        }

        /* ── mobile nav overlay ── */
        .mobile-nav {
          display: none;
          position: fixed;
          inset: 0;
          background: rgba(26,46,90,.97);
          z-index: 250;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 32px;
        }
        .mobile-nav.open { display: flex; }
        .mobile-nav a {
          font-size: 20px;
          font-weight: 600;
          color: rgba(255,255,255,.85);
          letter-spacing: .08em;
          text-transform: uppercase;
          transition: color .2s;
        }
        .mobile-nav a:hover { color: #FCD34D; }
        .mobile-nav-close {
          position: absolute;
          top: 24px;
          right: 24px;
          background: none;
          border: none;
          color: #fff;
          font-size: 32px;
          cursor: pointer;
          line-height: 1;
        }

        /* ── NAVBAR ── */
        .navbar { padding: 14px 60px; }
        .desktop-nav { display: flex; gap: 40px; }

        /* ── HERO ── */
        .hero-section { min-height: 100vh; padding-top: 88px; }
        .hero-building {
          position: absolute;
          top: 70px;
          left: 50%;
          transform: translateX(-58%);
          max-height: 620px;
          object-fit: contain;
          object-position: bottom center;
        }
        .hero-xxl {
          font-size: clamp(80px, 14vw, 140px);
          position: absolute;
          bottom: 18%;
          left: 35%;
          transform: translateX(-56%);
        }
        .hero-right {
          position: absolute;
          right: 5%;
          left: 65%;
          bottom: 16%;
          top: 70%;
        }

        /* ── FORM ── */
        .form-wrap { width: 90%; max-width: 1100px; margin: 0 auto; padding: 18px 48px; background: #d9d5ce; }
        .form-grid {
          display: grid;
          grid-template-columns: auto auto 1fr auto;
          gap: 12px 28px;
          align-items: center;
        }

        /* ── SCALE section ── */
        .scale-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 48px;
          align-items: center;
        }
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 24px;
          padding-top: 24px;
        }

        /* ── CONNECTIVITY ── */
        .conn-grid {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 32px;
          justify-items: center;
        }

        /* ── LUXURY ── */
        .lux-grid {
          display: grid;
          grid-template-columns: 1.4fr 1fr;
          gap: 24px;
          align-items: start;
          margin-bottom: 20px;
        }
        .lux-photos {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 5px;
          height: 320px;
        }

        /* ── APPROVALS ── */
        .approvals-grid {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
        }

        /* ── AMENITIES LIST ── */
        .amenities-list {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 4px 36px;
        }

        /* ── AMENITY PHOTOS ── */
        .amenity-photos {
          display: grid;
          grid-template-columns: repeat(2, 1fr) repeat(2, 1fr);
          grid-template-rows: 1fr 1fr;
          height: 360px;
          gap: 4px;
        }

        /* ── FOOTER ── */
        .footer-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 20px;
          margin-bottom: 16px;
        }
        .footer-credits {
          display: flex;
          gap: 40px;
          flex-wrap: wrap;
        }
        .footer-bottom {
          border-top: 1px solid #eee;
          padding-top: 14px;
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 10px;
        }

        /* ═══════════════════════════
           TABLET  ≤ 1024px
        ═══════════════════════════ */
        @media (max-width: 1024px) {
          .navbar { padding: 14px 32px; }
          .desktop-nav { gap: 24px; }
          .desktop-nav a { font-size: 13px; }

          .hero-building { max-height: 480px; }
          .hero-right { display: none; }

          .form-wrap { padding: 18px 28px; }
          .form-grid {
            grid-template-columns: 1fr 1fr;
            grid-template-rows: auto auto;
          }
          .form-grid > *:nth-child(3) { grid-column: 1 / 3; }
          .form-grid > *:nth-child(4) { grid-column: 1 / 3; text-align: center; }
          .form-grid > *:nth-child(4) button { width: 100%; }

          .scale-grid { grid-template-columns: 1fr; gap: 32px; }
          .stats-grid { grid-template-columns: repeat(5, 1fr); gap: 16px; }

          .conn-grid { grid-template-columns: repeat(4, 1fr); gap: 24px; }

          .lux-grid { grid-template-columns: 1fr; }
          .lux-photos { height: 260px; }

          .amenity-photos { height: 280px; }

          section { padding-left: 32px !important; padding-right: 32px !important; }
          .section-inner { padding: 0 32px !important; }
        }

        /* ═══════════════════════════
           MOBILE  ≤ 640px
        ═══════════════════════════ */
        @media (max-width: 640px) {
          .navbar { padding: 12px 20px; }
          .desktop-nav { display: none; }
          .hamburger { display: flex; }

          /* Hero */
          .hero-section { min-height: 100svh; padding-top: 72px; }
          .hero-building {
            top: 60px;
            left: 50%;
            transform: translateX(-50%);
            max-height: 55vw;
            min-height: 220px;
            width: 90%;
          }
          .hero-xxl {
            font-size: clamp(56px, 18vw, 90px);
            bottom: 14%;
            left: 50%;
            transform: translateX(-50%);
            text-align: center;
            white-space: nowrap;
          }
          .hero-tagline { text-align: center; left: 50% !important; transform: translateX(-50%); right: auto !important; }

          /* Form */
          .form-wrap { width: 100%; padding: 16px 16px; }
          .form-grid {
            grid-template-columns: 1fr;
            grid-template-rows: none;
          }
          .form-grid > * { grid-column: 1 !important; }
          .form-grid > *:nth-child(4) button { width: 100%; }
          .contact-input-name,
          .contact-input-email,
          .contact-input-occupation { width: 100% !important; }
          .contact-row { flex-direction: column !important; align-items: flex-start !important; gap: 4px !important; }
          .contact-label { min-width: unset !important; }

          /* Scale */
          .scale-grid { grid-template-columns: 1fr; gap: 24px; }
          .stats-grid { grid-template-columns: repeat(3, 1fr); gap: 14px; }

          /* Connectivity */
          .conn-grid { grid-template-columns: repeat(2, 1fr); gap: 20px; }

          /* Luxury */
          .lux-grid { grid-template-columns: 1fr; gap: 16px; }
          .lux-photos { height: 200px; }

          /* Approvals */
          .approvals-grid { grid-template-columns: 1fr; }
          .approvals-grid > * { border-right: none !important; border-bottom: 1px solid rgba(255,255,255,.25); }
          .approvals-grid > *:last-child { border-bottom: none; }

          /* Amenities */
          .amenities-list { grid-template-columns: 1fr 1fr; gap: 4px 20px; }

          /* Amenity photos */
          .amenity-photos {
            grid-template-columns: 1fr 1fr;
            grid-template-rows: auto auto auto;
            height: auto;
          }
          .amenity-featured { grid-column: 1 / 3; height: 220px; }
          .amenity-small { height: 140px; }

          /* Sections inner padding */
          .section-inner { padding: 0 20px !important; }
          section { padding-left: 0 !important; padding-right: 0 !important; }

          /* Footer */
          .footer-wrap { padding: 20px !important; }
          .footer-top { flex-direction: column; align-items: flex-start; }
          .footer-credits { gap: 20px; }
          .footer-bottom { flex-direction: column; }
        }

        /* ═══════════════════════════
           VERY SMALL  ≤ 380px
        ═══════════════════════════ */
        @media (max-width: 380px) {
          .amenities-list { grid-template-columns: 1fr; }
          .stats-grid { grid-template-columns: repeat(2, 1fr); }
          .conn-grid { grid-template-columns: repeat(2, 1fr); gap: 14px; }
        }
      `}</style>

      {/* ─── Mobile Nav Overlay ─── */}
      <div className={`mobile-nav ${menuOpen ? "open" : ""}`}>
        <button className="mobile-nav-close" onClick={() => setMenuOpen(false)} aria-label="Close menu">✕</button>
        {navLinks.map(([h, l]) => (
          <a key={h} href={h} onClick={() => setMenuOpen(false)}>{l}</a>
        ))}
      </div>

      {/* ══════════════════════════════ NAVBAR ══════════════════════════════ */}
      <header className="navbar" style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 200,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        backdropFilter: scrolled ? "blur(30px)" : "none",
        boxShadow: scrolled ? "0 2px 14px rgba(0,0,0,.08)" : "none",
        transition: "all .3s",
        background: scrolled ? "rgba(232,229,223,0.85)" : "transparent",
      }}>
        <img src={LOGO} alt="T Homes Infra" style={{ height: 60, objectFit: "contain" }} />

        <nav className="desktop-nav">
          {navLinks.map(([h, l]) => (
            <a key={h} href={h} style={{ fontSize: 14, color: "#444", fontWeight: 400, letterSpacing: ".01em", transition: "color .2s" }}
              onMouseEnter={e => (e.currentTarget.style.color = NAVY)}
              onMouseLeave={e => (e.currentTarget.style.color = "#444")}>
              {l}
            </a>
          ))}
        </nav>

        <button className="hamburger" onClick={() => setMenuOpen(true)} aria-label="Open menu">
          <span /><span /><span />
        </button>
      </header>

      {/* ══════════════════════════════ HERO ══════════════════════════════ */}
      <section className="tex hero-section" style={{
        position: "relative", overflow: "hidden",
        display: "flex", alignItems: "stretch",
      }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 45% 35%, rgba(255,255,255,0.55) 0%, transparent 70%)", pointerEvents: "none" }} />

        <img src={BUILDING} alt="J Cosmopolis Building" className="hero-building" style={{
          position: "absolute", zIndex: 1, pointerEvents: "none",
          filter: "drop-shadow(0 8px 24px rgba(0,0,0,0.08))",
        }} />

        {/* XXL + tagline */}
        <div className="hero-xxl" style={{
          zIndex: 3, display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 0,
        }}>
          <span style={{ fontSize: "clamp(9px, 1.5vw, 12px)", fontWeight: 600, letterSpacing: ".25em", textTransform: "uppercase", color: "#888", marginBottom: 0, marginLeft: 2 }}>
            EXPERIENCE LIVING
          </span>
          <div style={{
            fontWeight: 900, lineHeight: 0.88, letterSpacing: "-4px",
            background: "linear-gradient(105deg,#c084fc 0%,#a78bfa 15%,#60a5fa 30%,#34d399 45%,#fbbf24 60%,#f87171 75%,#c084fc 90%)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
          }}>
            XXL
          </div>
          <span style={{ fontSize: "clamp(8px, 1.4vw, 11px)", fontWeight: 700, letterSpacing: ".32em", textTransform: "uppercase", color: "#888", marginTop: 6, marginLeft: 4 }}>
            COSMOPOLIS | MOKILA
          </span>
        </div>

        {/* Right headline — hidden on mobile via CSS */}
        <div className="hero-right" style={{ zIndex: 4, textAlign: "left" }}>
          <h2 style={{
            fontWeight: 500, fontSize: "clamp(1.5rem,3.5vw,3rem)", lineHeight: 1.0,
            color: "#aaa", textTransform: "uppercase", letterSpacing: ".01em", margin: 0,
          }}>
            WELCOME TO<br />J COSMOPOLIS.<br />SIGN UP TO YOUR XXL LIFE.
          </h2>
        </div>
      </section>

      {/* ══════════════════════════════ GIFT BANNER + FORM ══════════════════════════════ */}
      <section className="tex" id="contact" style={{ paddingBottom: 40 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, padding: "12px 0", fontSize: 14, fontWeight: 600, color: "#555" }}>
          <span style={{ fontSize: 20 }}>🎁</span>
          First 50 site visits get assured gift
        </div>

        <form onSubmit={onSubmit} className="form-wrap">
          <div className="form-grid">

            {/* Col 1: Name + Occupation */}
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <div className="contact-row" style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <label htmlFor="c-name" className="contact-label" style={{ fontSize: 10, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: "#666", minWidth: 80 }}>Name</label>
                <input id="c-name" name="name" value={form.name} onChange={onChange} required placeholder="Your name"
                  style={{ padding: "8px 10px", border: "1px solid #bbb", background: WHITE, fontSize: 12, width: "100%", outline: "none" }} />
              </div>
              <div className="contact-row" style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span className="contact-label" style={{ fontSize: 10, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: "#666", minWidth: 80 }}>Occupation</span>
                <input name="occupation" value={form.occupation} onChange={onChange} placeholder="Your occupation"
                  style={{ padding: "8px 10px", border: "1px solid #bbb", background: WHITE, fontSize: 12, width: "100%", outline: "none" }} />
              </div>
            </div>

            {/* Col 2: Email + Phone */}
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <div className="contact-row" style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span className="contact-label" style={{ fontSize: 10, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: "#666", minWidth: 100, flexShrink: 0 }}>E-mail address:</span>
                <input name="email" type="email" value={form.email} onChange={onChange} required placeholder="Email address"
                  style={{ padding: "8px 10px", border: "1px solid #bbb", background: WHITE, fontSize: 12, width: "100%", outline: "none" }} />
              </div>
              <div className="contact-row" style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span className="contact-label" style={{ fontSize: 10, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: "#666", minWidth: 100, flexShrink: 0 }}>Code &amp; Phone:</span>
                <input name="code" value={form.code} onChange={onChange} placeholder="+91"
                  style={{ padding: "8px 10px", border: "1px solid #bbb", background: WHITE, fontSize: 12, width: 52, outline: "none", flexShrink: 0 }} />
                <input name="phone" type="tel" value={form.phone} onChange={onChange} required placeholder="Phone number"
                  style={{ padding: "8px 10px", border: "1px solid #bbb", background: WHITE, fontSize: 12, width: "100%", outline: "none" }} />
              </div>
            </div>

            {/* Col 3: Checkboxes */}
            <div style={{ display: "flex", flexDirection: "column", gap: 6, paddingLeft: 12 }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: "#666", letterSpacing: ".06em", textTransform: "uppercase", marginBottom: 2 }}>
                Tick what's applicable
              </div>
              {([
                ["mokila",    "Yes I am actively looking for Site in Mokila"],
                ["hyderabad", "I am looking for Site in Hyderabad"],
                ["months",    "Not immediately but in 3–6 months"],
              ] as const).map(([n, l]) => (
                <label key={n} style={{ display: "flex", alignItems: "flex-start", gap: 7, cursor: "pointer", fontSize: 11, color: "#555", lineHeight: 1.4 }}>
                  <input type="checkbox" name={n} checked={form.checks[n]} onChange={onChange} style={{ marginTop: 2, accentColor: NAVY }} />
                  {l}
                </label>
              ))}
            </div>

            {/* Col 4: Submit */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
              <button type="submit" style={{
                background: "#777", color: WHITE, border: "none",
                padding: "12px 28px", fontSize: 12, fontWeight: 600,
                letterSpacing: ".08em", textTransform: "uppercase",
                cursor: "pointer", transition: "background .2s", whiteSpace: "nowrap", width: "100%",
              }}
                onMouseEnter={e => (e.currentTarget.style.background = NAVY)}
                onMouseLeave={e => (e.currentTarget.style.background = "#777")}>
                Submit
              </button>
            </div>
          </div>
        </form>
      </section>

      {/* ══════════════════════════════ XXL IN SCALE ══════════════════════════════ */}
      <section id="scale" style={{ background: "linear-gradient(to right,#001f3f,#003d7a,#001f3f)", padding: "80px 0", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 4, background: "linear-gradient(to right,#001f3f,#FCD34D,#001f3f)" }} />
        <div className="section-inner" style={{ maxWidth: 1280, margin: "0 auto", padding: "0 60px" }}>
          <div className="scale-grid">
            <motion.div initial={{ opacity: 0, x: -60 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
              <img src={SCALE_IMG} alt="J Cosmopolis Scale" style={{ width: "100%", height: "auto", objectFit: "contain", filter: "drop-shadow(0 20px 30px rgba(0,0,0,0.3))" }} />
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}
              style={{ color: WHITE, display: "flex", flexDirection: "column", gap: 28 }}>
              <h2 style={{ fontSize: "clamp(2rem,4vw,3.5rem)", fontWeight: 700, lineHeight: 1.2 }}>XXL in Scale</h2>
              <p style={{ fontSize: 15, lineHeight: 1.75, color: "rgba(255,255,255,.75)", fontWeight: 300 }}>
                From the very first sight, J Cosmopolis stands tall with composure, drawing admiration to its unmissable neo-modern curved edges. Register openness as you walk through a pergola-framed entry. The reception lobby's double height ceiling establishes grandness without announcing it. With scale and space defining its presence, the singular tower spells exclusivity in an extra-large format.
              </p>
              <div className="stats-grid">
                {STATS.map(s => (
                  <div key={s.label} style={{ borderBottom: "2px solid rgba(252,211,77,.3)", paddingBottom: 12 }}>
                    <div style={{ fontSize: "clamp(18px,3vw,28px)", fontWeight: 800, color: "#FCD34D", letterSpacing: "-.02em" }}>{s.value}</div>
                    <div style={{ fontSize: 10, fontWeight: 500, letterSpacing: ".08em", textTransform: "uppercase", color: "#9ca3af", marginTop: 4 }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════ XXL CONNECTIVITY ══════════════════════════════ */}
      <section id="location" style={{ background: "#e8e8e8", padding: "80px 0" }}>
        <div className="section-inner" style={{ maxWidth: 1280, margin: "0 auto", padding: "0 60px" }}>
          <motion.div initial={{ opacity: 0, y: -30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
            <h2 style={{ fontSize: "clamp(1.6rem,4vw,3rem)", fontWeight: 300, color: "#666", letterSpacing: 1, marginBottom: 16 }}>XXL Connectivity</h2>
            <p style={{ fontSize: 15, lineHeight: 1.8, color: "#555", fontWeight: 300, maxWidth: "min(70%,600px)", marginBottom: 48 }}>
              From J Cosmopolis, everything remains within direct reach. Commercial corridors, schools, entertainment &amp; lifestyle spaces etc., connect here with efficiency.
            </p>
          </motion.div>
          <div className="conn-grid">
            {CONNECTIVITY.map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, scale: .8, y: 20 }} whileInView={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * .07 }} viewport={{ once: true }}
                style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
                <div style={{ width: 80, height: 80, borderRadius: "50%", overflow: "hidden", border: "3px solid #f0f0f0", boxShadow: "0 4px 14px rgba(0,0,0,.1)", flexShrink: 0 }}>
                  <img src={item.image} alt={item.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
                <div style={{ fontSize: 12, fontWeight: 600, color: "#333", textAlign: "center", lineHeight: 1.3 }}>{item.name}</div>
                <div style={{ fontSize: 11, color: "#888", fontWeight: 300 }}>{item.time}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════ ASSURED XXL LUXURY ══════════════════════════════ */}
      <section id="layout" style={{ background: "#f5f5f5", padding: "80px 0" }}>
        <div className="section-inner" style={{ maxWidth: 1280, margin: "0 auto", padding: "0 60px" }}>
          <motion.h2 initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}
            style={{ fontSize: "clamp(1.4rem,3vw,2.4rem)", fontWeight: 300, color: "#999", letterSpacing: 1, marginBottom: 40, fontStyle: "italic" }}>
            Assured XXL Luxury
          </motion.h2>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} style={{ marginBottom: 28 }}>
            <img src={LUXURY_IMAGES[0].src} alt="Luxury Interior" style={{ width: "100%", height: "min(380px, 50vw)", objectFit: "cover", display: "block" }} />
          </motion.div>

          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.7, delay: .1 }} viewport={{ once: true }}
            style={{ fontSize: 15, lineHeight: 1.85, color: "#555", fontWeight: 300, maxWidth: 860, marginBottom: 36 }}>
            Experience seamless continuity and movement in your 3-bedroom configuration. At the entry, you got a clear visual axis of your home. Movement across feels intuitive and uninterrupted. The living space extends beyond a curved balcony with multiple seating arrangements. Every space and dimension, from the living room to the kitchen or bedrooms, contribute to a quiet grandeur and assured XXL luxury.
          </motion.p>

          <div className="lux-grid">
            <div className="lux-photos">
              {LUXURY_IMAGES.slice(1, 5).map((img, i) => (
                <motion.div key={i} initial={{ opacity: 0, scale: .95 }} whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: i * .08 }} viewport={{ once: true }} style={{ overflow: "hidden" }}>
                  <img src={img.src} alt={img.alt} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform .6s" }}
                    onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.05)")}
                    onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")} />
                </motion.div>
              ))}
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {[
                { val: "1837 to 2713 SFT",          lbl: "Area Range" },
                { val: "10 ft.\nwide corridors",     lbl: "" },
                { val: "East, West, & North\norientations", lbl: "" },
              ].map((s, i) => (
                <div key={i} style={{ padding: "20px 22px", background: "#e8e4dc", borderLeft: "4px solid transparent", transition: "border-color .2s, background .2s", cursor: "default" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderLeftColor = NAVY; (e.currentTarget as HTMLDivElement).style.background = "#dedad4"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderLeftColor = "transparent"; (e.currentTarget as HTMLDivElement).style.background = "#e8e4dc"; }}>
                  {s.val.split("\n").map((line, j) => (
                    <div key={j} style={{ fontSize: j === 0 ? 18 : 15, fontWeight: 700, color: NAVY, lineHeight: 1.3 }}>{line}</div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div className="approvals-grid">
            {["Completion in 2027", "HMDA & RERA\nApproved", "UDS Share\n42 & 62 Sq yards"].map((txt, i) => (
              <div key={i} style={{ background: GREEN, padding: "16px 20px", textAlign: "center", borderRight: i < 2 ? "1px solid rgba(255,255,255,.25)" : "none" }}>
                {txt.split("\n").map((line, j) => (
                  <span key={j} style={{ display: "block", fontSize: 13, fontWeight: 700, color: WHITE, lineHeight: 1.45 }}>{line}</span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════ XXL AMENITIES ══════════════════════════════ */}
      <section id="amenities">
        <div style={{ background: "linear-gradient(to bottom,#66cc33,#5ab832)", padding: "56px 60px 48px" }}>
          <div style={{ maxWidth: 1280, margin: "0 auto" }}>
            <h2 style={{ fontSize: "clamp(1.6rem,4vw,3rem)", fontWeight: 300, color: WHITE, letterSpacing: 1, marginBottom: 14 }}>XXL Amenities</h2>
            <p style={{ fontSize: 15, lineHeight: 1.8, color: "rgba(255,255,255,.9)", fontWeight: 300, maxWidth: "min(70%,600px)", marginBottom: 32 }}>
              Community forms differently when space supports it. J Cosmopolis comes with a host of amenities intended for celebrations and social interactions.
            </p>
            <div className="amenities-list">
              {AMENITIES.map(a => (
                <div key={a} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13, fontWeight: 300, color: WHITE, padding: "6px 0", borderBottom: "1px solid rgba(255,255,255,.2)" }}>
                  <span style={{ fontSize: 18, flexShrink: 0 }}>•</span>
                  {a}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Photo grid */}
        <div className="amenity-photos" style={{ background: BG }}>
          <div className="amenity-featured" style={{ gridColumn: "1/3", gridRow: "1/3", overflow: "hidden", position: "relative" }}>
            <img src={AMENITY_IMAGES[0].src} alt={AMENITY_IMAGES[0].alt} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform .6s" }}
              onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.04)")}
              onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")} />
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "rgba(0,0,0,.5)", color: WHITE, padding: "8px 12px", fontSize: 11, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase" }}>
              SWIMMING POOL
            </div>
          </div>
          {AMENITY_IMAGES.slice(1).map((img, i) => (
            <div key={i} className="amenity-small" style={{ overflow: "hidden" }}>
              <img src={img.src} alt={img.alt} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform .6s" }}
                onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.05)")}
                onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")} />
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════ XXL ASSURANCE ══════════════════════════════ */}
      <section style={{ background: "#f5f5f5", padding: "80px 0" }}>
        <div className="section-inner" style={{ maxWidth: 1280, margin: "0 auto", padding: "0 60px" }}>
          <motion.h2 initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}
            style={{ fontSize: "clamp(1.6rem,4vw,3rem)", fontWeight: 300, color: "#999", letterSpacing: 1, marginBottom: 24 }}>
            XXL Assurance
          </motion.h2>
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.7, delay: .1 }} viewport={{ once: true }}
            style={{ fontSize: 15, lineHeight: 1.85, color: "#555", fontWeight: 300, maxWidth: "85%", marginBottom: 56 }}>
            Built with intent and promoted with discipline, T Homes Infra brings a considered understanding of land value and delivery integrity. J Cosmopolis too, comes with the promise where execution sustains design.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} style={{ position: "relative" }}>
            <img src={ASSURANCE_BUILDING} alt="J Cosmopolis Elevation" style={{ width: "100%", maxHeight: 440, objectFit: "cover", display: "block" }} />
            <div style={{ position: "absolute", bottom: 28, left: 36 }}>
              <img src={LOGO} alt="T Homes Infra" style={{ height: 56, objectFit: "contain", filter: "drop-shadow(0 2px 8px rgba(0,0,0,.3))" }} />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════ FOOTER ══════════════════════════════ */}
      <footer className="footer-wrap" style={{ background: WHITE, padding: "24px 60px", borderTop: "1px solid #ddd" }}>
        <div className="footer-top">
          <div style={{ display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap" }}>
            <img src={HMDA_LOGO} alt="HMDA" style={{ height: 40, objectFit: "contain" }} />
            <img src={RERA_LOGO} alt="TG RERA" style={{ height: 40, objectFit: "contain" }} />
          </div>
          <div className="footer-credits">
            {[["Consultant Architect","Add Name"],["Landscaping Partner","Add Name"],["Playarea Design by","Pool"]].map(([s,v]) => (
              <div key={s}>
                <div style={{ fontSize: 9, fontWeight: 600, letterSpacing: ".12em", textTransform: "uppercase", color: "#aaa" }}>{s}</div>
                <div style={{ fontSize: 11, fontWeight: 600, color: NAVY }}>{v}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="footer-bottom">
          <div style={{ fontSize: 9, color: "#aaa", lineHeight: 1.65, maxWidth: 620 }}>
            0651194/5K9/91/U6/HMDA/1408/2022 and P02400005375 | {"{Add remaining RERA details}"}<br />
            <strong>Disclaimer:</strong> All images, dimensions and details are indicative only and subject to change without notice.
          </div>
          <div style={{ fontSize: 10, color: "#ccc", fontWeight: 500 }}>© 2025 T Homes Infra Pvt. Ltd.</div>
        </div>
      </footer>

      {/* ─── Toast ─── */}
      <div style={{
        position: "fixed", bottom: 28, right: 28, zIndex: 999,
        background: NAVY, color: WHITE, padding: "14px 22px",
        fontSize: 12, fontWeight: 600, letterSpacing: ".06em",
        boxShadow: "0 8px 28px rgba(0,0,0,.2)",
        transform: toast ? "translateY(0)" : "translateY(100px)",
        opacity: toast ? 1 : 0,
        transition: "all .4s ease", pointerEvents: "none",
        maxWidth: "calc(100vw - 40px)",
      }}>
        ✓ Thank you! We'll contact you within 24 hours.
      </div>
    </div>
  );
}