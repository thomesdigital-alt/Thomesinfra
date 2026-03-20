"use client";
import React from "react";

interface FormState {
  name: string;
  email: string;
  occupation: string;
  code: string;
  phone: string;
  checks: { mokila: boolean; hyderabad: boolean; months: boolean };
}

export default function ContactSection() {
  const [form, setForm] = React.useState<FormState>({
    name: "", email: "", occupation: "", code: "+91", phone: "",
    checks: { mokila: false, hyderabad: false, months: false },
  });
  const [submitted, setSubmitted] = React.useState(false);

  const set = (field: keyof Omit<FormState, "checks">, val: string) =>
    setForm((f) => ({ ...f, [field]: val }));

  const toggle = (key: keyof FormState["checks"]) =>
    setForm((f) => ({ ...f, checks: { ...f.checks, [key]: !f.checks[key] } }));

  const handleSubmit = () => {
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const inputStyle: React.CSSProperties = {
    background: "#fff",
    border: "1px solid #ccc",
    borderRadius: 2,
    height: 32,
    padding: "0 10px",
    fontSize: 13,
    color: "#333",
    outline: "none",
    width: "100%",
    fontFamily: "Montserrat, sans-serif",
  };

  const labelStyle: React.CSSProperties = {
    fontSize: 13,
    color: "#444",
    fontFamily: "Montserrat, sans-serif",
    whiteSpace: "nowrap",
    fontWeight: 500,
  };

  return (
    <>
      <style>{`
        .contact-section-wrapper {
          width: 100%;
          background-image: url('https://thomestowers.com/wp-content/uploads/2026/03/background-1-scaled.png');
          background-size: cover;
          background-position: center;
          padding: 60px 0 80px;
          font-family: Montserrat, sans-serif;
        }

        .contact-section-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 24px;
        }

        .gift-banner {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          margin-bottom: 0;
          position: relative;
          z-index: 2;
        }
        .gift-icon-wrap {
          width: 52px;
          height: 52px;
          flex-shrink: 0;
          
        }
        .gift-label {
          background: #555;
          color: #fff;
          font-size: clamp(13px, 2vw, 16px);
          font-weight: 700;
          padding: 8px 20px;
          border-radius: 4px;
          letter-spacing: 0.02em;
          font-family: Montserrat, sans-serif;
        }

        .form-card {
          background: rgba(180,178,174,0.75);
          padding: clamp(20px, 3vw, 32px) clamp(16px, 3vw, 36px);
          display: grid;
          grid-template-columns: 1fr 1fr auto auto;
          gap: 16px 24px;
          align-items: start;
        }

        .col-fields-left {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .field-row {
          display: grid;
          grid-template-columns: 90px 1fr;
          align-items: center;
          gap: 10px;
        }

        .col-fields-right {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .field-row-email {
          display: grid;
          grid-template-columns: 110px 1fr;
          align-items: center;
          gap: 10px;
        }
        .field-row-phone {
          display: grid;
          grid-template-columns: 110px 60px 1fr;
          align-items: center;
          gap: 10px;
        }

        .col-checks {
          display: flex;
          flex-direction: column;
          gap: 10px;
          min-width: 220px;
        }
        .checks-title {
          font-size: 13px;
          font-weight: 600;
          color: #333;
          margin-bottom: 2px;
        }
        .check-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
        }
        .check-row span {
          font-size: 12px;
          color: #333;
          flex: 1;
          line-height: 1.4;
        }
        .custom-checkbox {
          width: 18px;
          height: 18px;
          border: 1.5px solid #888;
          background: #fff;
          flex-shrink: 0;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 2px;
        }
        .custom-checkbox.checked::after {
          content: '';
          display: block;
          width: 10px;
          height: 10px;
          background: #555;
          border-radius: 1px;
        }

        .col-submit {
          display: flex;
          align-items: center;
          justify-content: center;
          align-self: center;
        }
        .submit-btn {
          background: #666;
          color: #fff;
          border: none;
          padding: 10px 28px;
          font-size: 14px;
          font-weight: 600;
          font-family: Montserrat, sans-serif;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          cursor: pointer;
          border-radius: 2px;
          transition: background .2s;
          white-space: nowrap;
        }
        .submit-btn:hover { background: #444; }
        .submit-btn.ok    { background: #4a7c59; }

        @media (max-width: 960px) {
          .form-card { grid-template-columns: 1fr 1fr; }
          .col-checks { grid-column: 1; }
          .col-submit  { grid-column: 2; justify-content: flex-end; align-self: end; }
        }

        @media (max-width: 640px) {
          .form-card { grid-template-columns: 1fr; }
          .field-row,
          .field-row-email { grid-template-columns: 100px 1fr; }
          .field-row-phone  { grid-template-columns: 100px 56px 1fr; }
          .col-checks { min-width: unset; }
          .col-submit { grid-column: 1; justify-content: stretch; }
          .submit-btn { width: 100%; }
        }
      `}</style>

      <section className="contact-section-wrapper" id="contact">
        <div className="contact-section-inner">

          {/* Gift banner */}
          <div className="gift-banner">
            <div className="gift-icon-wrap">
             <svg 
               viewBox="0 0 52 52" 
                xmlns="http://www.w3.org/2000/svg"
                style={{ width: "100%", height: "100%" }}
                  >
                  {/* Rounded white background */}
                <rect x="2" y="2" width="48" height="48" rx="10" fill="white" />

                  {/* Icon */}
                <g 
                  stroke="#9CA3AF" 
                  strokeWidth="3" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  fill="none"
                >
                <rect x="6" y="20" width="40" height="6" rx="1"/>
                <rect x="9" y="26" width="34" height="20" rx="1"/>
                <line x1="26" y1="20" x2="26" y2="46"/>

    <path d="M26 20 C26 20 18 14 16 10 C14 6 20 4 24 8 C26 10 26 14 26 20Z"/>
    <path d="M26 20 C26 20 34 14 36 10 C38 6 32 4 28 8 C26 10 26 14 26 20Z"/>
  </g>
</svg>
            </div>
            <span className="gift-label">First 50 site visits get assured gift</span>
          </div>

          {/* Form card */}
          <div className="form-card">

            <div className="col-fields-left">
              <div className="field-row">
                <label style={labelStyle}>Name</label>
                <input style={inputStyle} value={form.name} onChange={e => set("name", e.target.value)} />
              </div>
              <div className="field-row">
                <label style={labelStyle}>Occupation</label>
                <input style={inputStyle} value={form.occupation} onChange={e => set("occupation", e.target.value)} />
              </div>
            </div>

            <div className="col-fields-right">
              <div className="field-row-email">
                <label style={labelStyle}>E-mail address:</label>
                <input style={inputStyle} type="email" value={form.email} onChange={e => set("email", e.target.value)} />
              </div>
              <div className="field-row-phone">
                <label style={labelStyle}>Code & Phone number:</label>
                <input style={{ ...inputStyle, textAlign: "center" }} value={form.code} onChange={e => set("code", e.target.value)} />
                <input style={inputStyle} type="tel" value={form.phone} onChange={e => set("phone", e.target.value)} />
              </div>
            </div>

            <div className="col-checks">
              <div className="checks-title">Tick what's applicable</div>
              {([
                ["mokila",    "Yes I am actively looking for 3bhk in Mokila"],
                ["hyderabad", "I am looking for a 3bhk in Hyderabad"],
                ["months",    "Not immediately but in 3–6 months."],
              ] as [keyof FormState["checks"], string][]).map(([key, label]) => (
                <div key={key} className="check-row">
                  <span>{label}</span>
                  <div
                    className={`custom-checkbox${form.checks[key] ? " checked" : ""}`}
                    onClick={() => toggle(key)}
                    role="checkbox"
                    aria-checked={form.checks[key]}
                    tabIndex={0}
                    onKeyDown={e => e.key === " " && toggle(key)}
                  />
                </div>
              ))}
            </div>

            <div className="col-submit">
              <button
                className={`submit-btn${submitted ? " ok" : ""}`}
                onClick={handleSubmit}
              >
                {submitted ? "Submitted ✓" : "Submit"}
              </button>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}