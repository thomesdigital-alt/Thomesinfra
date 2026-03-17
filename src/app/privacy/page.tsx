"use client"
import { useState, useEffect } from "react";
const logoBase64 = "https://thomestowers.com/wp-content/uploads/2026/03/T-Homes-Logo-1.png";

const sections = [
  {
    id: 1,
    title: "Information We Collect",
    intro: "We may collect personal information that you voluntarily provide when you:",
    items: [
      "Submit contact or inquiry forms",
      "Subscribe to newsletters or updates",
      "Contact us by phone, email, or message",
      "Interact with customer support",
    ],
  },
  {
    id: 2,
    title: "How We Use Your Information",
    intro: "We use your personal information for purposes including, but not limited to:",
    items: [
      "Responding to your inquiries and requests",
      "Providing and improving our services",
      "Sending marketing and promotional communications",
      "Complying with legal or regulatory requirements",
    ],
  },
  {
    id: 3,
    title: "Information Sharing",
    intro: "We may share your information with:",
    items: [
      "Third-party service providers to support business operations",
      "Legal authorities when required by law",
      "Authorized partners assisting with promotions and services",
    ],
  },
  {
    id: 4,
    title: "Cookies and Tracking",
    intro: null,
    body: "Our website may use cookies and similar tracking technologies to enhance your experience, personalize content, and analyze how the site is used. You can control cookie preferences through your browser settings.",
    items: [],
  },
  {
    id: 5,
    title: "Data Security",
    intro: null,
    body: "We implement technical and organizational measures to protect your personal information against unauthorized access, disclosure, alteration, or destruction.",
    items: [],
  },
  {
    id: 6,
    title: "Third-Party Links",
    intro: null,
    body: "Our site may contain links to third-party websites. We are not responsible for the privacy practices of those sites. We encourage you to read their privacy policies.",
    items: [],
  },
  {
    id: 7,
    title: "Your Rights",
    intro: null,
    body: "You may access, correct, or delete your personal information by contacting us at info@thomesinfra.com or through any account features provided.",
    items: [],
  },
  {
    id: 8,
    title: "Changes to Policy",
    intro: null,
    body: "We may update this Privacy Policy from time to time. The effective date will be updated when changes are made. Your continued use of our website constitutes acceptance of those changes.",
    items: [],
  },
  {
    id: 9,
    title: "Contact Us",
    intro: "If you have any questions about this Privacy Policy, you may contact us at:",
    body: null,
    contact: true,
    items: [],
  },
];

export default function PrivacyPolicy() {
  const [activeSection, setActiveSection] = useState<number | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div style={styles.page}>
      {/* Decorative background */}
      <div style={styles.bgPattern} />

      {/* Hero Section */}
      <div style={styles.hero}>
        <div style={styles.heroInner}>
          <img
            src={logoBase64}
            alt="T Homes Infra Logo"
            style={styles.logo}
          />
          <div style={styles.heroDivider} />
          <h1 style={styles.heroTitle}>Privacy Policy</h1>
          <p style={styles.heroSubtitle}>
            T Homes Infra Pvt. Ltd. is committed to safeguarding your personal information.
          </p>
        </div>
        <div style={styles.heroWave}>
          <svg viewBox="0 0 1440 80" fill="none" xmlns="https://thomestowers.com/wp-content/uploads/2026/03/T-Homes-Logo-1.png" style={{ display: "block" }}>
            <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="#f5f6fa" />
          </svg>
        </div>
      </div>

      {/* Intro */}
      <div style={styles.container}>
        <div style={styles.introCard}>
          <div style={styles.introAccent} />
          <p style={styles.introText}>
            This Privacy Policy describes how{" "}
            <strong style={{ color: "#1a237e" }}>T Homes Infra Pvt. Ltd.</strong>{" "}
            ("we", "us", or "our") collects, uses, shares, and protects your personal information
            when you visit our website, use our services, or interact with us online. Your privacy
            is important to us, and we are committed to safeguarding your information.
          </p>
        </div>

        {/* Sections */}
        <div style={styles.sectionsGrid}>
          {sections.map((section, index) => (
            <div
              key={section.id}
              style={{
                ...styles.sectionCard,
                ...(activeSection === section.id ? styles.sectionCardActive : {}),
                animationDelay: `${index * 0.07}s`,
              }}
              onMouseEnter={() => setActiveSection(section.id)}
              onMouseLeave={() => setActiveSection(null)}
            >
              <div style={styles.sectionHeader}>
                <div style={styles.sectionNumber}>{String(section.id).padStart(2, "0")}</div>
                <h2 style={styles.sectionTitle}>{section.title}</h2>
              </div>

              {section.intro && (
                <p style={styles.sectionIntro}>{section.intro}</p>
              )}

              {section.items && section.items.length > 0 && (
                <ul style={styles.list}>
                  {section.items.map((item, i) => (
                    <li key={i} style={styles.listItem}>
                      <span style={styles.listDot} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}

              {"body" in section && section.body && (
                <p style={styles.bodyText}>{section.body}</p>
              )}

              {section.contact && (
                <div style={styles.contactBlock}>
                  <div style={styles.contactRow}>
                    <span style={styles.contactIcon}>🏢</span>
                    <span style={styles.contactLabel}>T Homes Infra Pvt. Ltd.</span>
                  </div>
                  <div style={styles.contactRow}>
                    <span style={styles.contactIcon}>✉️</span>
                    <a href="mailto:info@thomesinfra.com" style={styles.contactLink}>
                      info@thomesinfra.com
                    </a>
                  </div>
                  <div style={styles.contactRow}>
                    <span style={styles.contactIcon}>🌐</span>
                    <a href="https://www.thomesinfra.com" style={styles.contactLink} target="_blank" rel="noreferrer">
                      www.thomesinfra.com
                    </a>
                  </div>
                </div>
              )}

              <div
                style={{
                  ...styles.sectionAccentBar,
                  opacity: activeSection === section.id ? 1 : 0,
                }}
              />
            </div>
          ))}
        </div>

        {/* Footer Note */}
        <div style={styles.footerNote}>
          <div style={styles.footerNoteLine} />
          <p style={styles.footerNoteText}>
            This Privacy Policy is effective as of the date published on the website and may be updated periodically.
          </p>
          <div style={styles.footerNoteLine} />
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=DM+Sans:wght@300;400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #f5f6fa; }
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .section-card-animated {
          animation: fadeSlideUp 0.5s ease both;
        }
      `}</style>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    fontFamily: "'DM Sans', sans-serif",
    background: "#f5f6fa",
    minHeight: "100vh",
    position: "relative",
    overflowX: "hidden",
  },
  bgPattern: {
    position: "fixed",
    inset: 0,
    backgroundImage: `
      radial-gradient(circle at 10% 20%, rgba(26,35,126,0.04) 0%, transparent 50%),
      radial-gradient(circle at 90% 80%, rgba(198,40,40,0.04) 0%, transparent 50%)
    `,
    pointerEvents: "none",
    zIndex: 0,
  },
  hero: {
    background: "linear-gradient(135deg, #0d1547 0%, #1a237e 55%, #1e1060 100%)",
    position: "relative",
    paddingTop: 56,
    paddingBottom: 0,
  },
  heroInner: {
    maxWidth: 800,
    margin: "0 auto",
    padding: "40px 24px 48px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 20,
  },
  logo: {
    height: 80,
    objectFit: "contain",
    filter: "brightness(0) invert(1)",
    opacity: 0.95,
  },
  heroDivider: {
    width: 60,
    height: 2,
    background: "linear-gradient(90deg, transparent, #c62828, transparent)",
    borderRadius: 2,
  },
  heroTitle: {
    fontFamily: "'Playfair Display', serif",
    fontSize: "clamp(2rem, 5vw, 3.2rem)",
    fontWeight: 700,
    color: "#ffffff",
    textAlign: "center",
    letterSpacing: "0.02em",
  },
  heroSubtitle: {
    fontSize: "1rem",
    color: "rgba(255,255,255,0.72)",
    textAlign: "center",
    maxWidth: 520,
    lineHeight: 1.65,
    fontWeight: 300,
  },
  heroWave: {
    lineHeight: 0,
    marginBottom: -1,
  },
  container: {
    maxWidth: 1100,
    margin: "0 auto",
    padding: "48px 24px 72px",
    position: "relative",
    zIndex: 1,
  },
  introCard: {
    background: "#ffffff",
    borderRadius: 16,
    padding: "32px 36px",
    marginBottom: 40,
    boxShadow: "0 4px 32px rgba(26,35,126,0.08)",
    display: "flex",
    alignItems: "flex-start",
    gap: 24,
    position: "relative",
    overflow: "hidden",
  },
  introAccent: {
    width: 4,
    minHeight: "100%",
    background: "linear-gradient(180deg, #c62828, #1a237e)",
    borderRadius: 4,
    flexShrink: 0,
    alignSelf: "stretch",
  },
  introText: {
    fontSize: "1.05rem",
    color: "#374151",
    lineHeight: 1.8,
    fontWeight: 400,
  },
  sectionsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(480px, 1fr))",
    gap: 24,
  },
  sectionCard: {
    background: "#ffffff",
    borderRadius: 14,
    padding: "28px 32px",
    boxShadow: "0 2px 16px rgba(26,35,126,0.06)",
    position: "relative",
    overflow: "hidden",
    transition: "transform 0.25s ease, box-shadow 0.25s ease",
    cursor: "default",
    animation: "fadeSlideUp 0.5s ease both",
  },
  sectionCardActive: {
    transform: "translateY(-4px)",
    boxShadow: "0 12px 40px rgba(26,35,126,0.13)",
  },
  sectionHeader: {
    display: "flex",
    alignItems: "center",
    gap: 16,
    marginBottom: 16,
  },
  sectionNumber: {
    fontFamily: "'Playfair Display', serif",
    fontSize: "1.4rem",
    fontWeight: 700,
    color: "#c62828",
    opacity: 0.85,
    lineHeight: 1,
    minWidth: 32,
  },
  sectionTitle: {
    fontFamily: "'Playfair Display', serif",
    fontSize: "1.2rem",
    fontWeight: 600,
    color: "#1a237e",
    lineHeight: 1.3,
  },
  sectionIntro: {
    fontSize: "0.95rem",
    color: "#4b5563",
    marginBottom: 14,
    lineHeight: 1.7,
  },
  list: {
    listStyle: "none",
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  listItem: {
    display: "flex",
    alignItems: "flex-start",
    gap: 12,
    fontSize: "0.95rem",
    color: "#374151",
    lineHeight: 1.6,
  },
  listDot: {
    width: 7,
    height: 7,
    borderRadius: "50%",
    background: "linear-gradient(135deg, #c62828, #1a237e)",
    flexShrink: 0,
    marginTop: 7,
  },
  bodyText: {
    fontSize: "0.95rem",
    color: "#374151",
    lineHeight: 1.8,
  },
  contactBlock: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
    marginTop: 4,
    background: "#f8f9ff",
    borderRadius: 10,
    padding: "16px 20px",
    border: "1px solid #e8eaf6",
  },
  contactRow: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    fontSize: "0.95rem",
  },
  contactIcon: {
    fontSize: "1rem",
    flexShrink: 0,
  },
  contactLabel: {
    color: "#1a237e",
    fontWeight: 500,
  },
  contactLink: {
    color: "#c62828",
    textDecoration: "none",
    fontWeight: 500,
    borderBottom: "1px solid rgba(198,40,40,0.3)",
    paddingBottom: 1,
    transition: "color 0.2s",
  },
  sectionAccentBar: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: 3,
    background: "linear-gradient(180deg, #c62828, #1a237e)",
    borderRadius: "3px 0 0 3px",
    transition: "opacity 0.25s ease",
  },
  footerNote: {
    display: "flex",
    alignItems: "center",
    gap: 20,
    marginTop: 48,
    padding: "0 8px",
  },
  footerNoteLine: {
    flex: 1,
    height: 1,
    background: "linear-gradient(90deg, transparent, #c8cad8)",
  },
  footerNoteText: {
    fontSize: "0.85rem",
    color: "#9ca3af",
    textAlign: "center",
    maxWidth: 480,
    lineHeight: 1.7,
    flexShrink: 0,
    fontStyle: "italic",
  },
};