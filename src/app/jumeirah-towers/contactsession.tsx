"use client";
import React from "react";
import { toast } from "sonner";
import { email } from "zod/v4";

interface FormState {
  name: string;
  email: string;
  occupation: string;
  countryCode: string;
  phone: string;
  checks: { mokila: boolean; hyderabad: boolean; months: boolean };
}

interface Errors {
  name?: string;
  email?: string;
  occupation?: string;
  phone?: string;
  checks?: string;
}

interface Country {
  code: string;
  flag: string;
  abbr: string;
}

const FALLBACK_COUNTRIES: Country[] = [
  { code: "+91", flag: "🇮🇳", abbr: "IN" },
  { code: "+1", flag: "🇺🇸", abbr: "US" },
  { code: "+44", flag: "🇬🇧", abbr: "GB" },
  { code: "+61", flag: "🇦🇺", abbr: "AU" },
  { code: "+971", flag: "🇦🇪", abbr: "AE" },
];

export default function ContactSection() {
  const [form, setForm] = React.useState<FormState>({
    name: "",
    email: "",
    occupation: "",
    countryCode: "+91",
    phone: "",
    checks: { mokila: false, hyderabad: false, months: false },
  });

  const [errors, setErrors] = React.useState<Errors>({});
  const [submitted, setSubmitted] = React.useState(false);
  const [countries, setCountries] =
    React.useState<Country[]>(FALLBACK_COUNTRIES);
  const [loadingCountries, setLoadingCountries] = React.useState(true);

  React.useEffect(() => {
    fetch("https://restcountries.com/v3.1/all?fields=idd,cca2,flag")
      .then((r) => r.json())
      .then((data: any[]) => {
        const parsed: Country[] = data
          .filter((c) => c.idd?.root && c.idd?.suffixes?.length === 1)
          .map((c) => ({
            code: c.idd.root + c.idd.suffixes[0],
            flag: c.flag,
            abbr: c.cca2,
          }))
          .filter((c) => /^\+\d+$/.test(c.code));

        const seen = new Set<string>();
        const unique = parsed
          .sort((a, b) => a.abbr.localeCompare(b.abbr))
          .filter((c) => {
            if (seen.has(c.code)) return false;
            seen.add(c.code);
            return true;
          });

        setCountries(unique);
      })
      .catch(() => setCountries(FALLBACK_COUNTRIES))
      .finally(() => setLoadingCountries(false));
  }, []);

  const set = (field: keyof Omit<FormState, "checks">, val: string) =>
    setForm((f) => ({ ...f, [field]: val }));

  const toggle = (key: keyof FormState["checks"]) =>
    setForm((f) => ({ ...f, checks: { ...f.checks, [key]: !f.checks[key] } }));

  const validate = () => {
    const e: Errors = {};
    if (!form.name.trim()) e.name = "Required";
    else if (form.name.length < 3) e.name = "Min 3 characters";
    if (!form.email.trim()) e.email = "Required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Invalid email";
    if (!form.occupation.trim()) e.occupation = "Required";
    if (!form.phone.trim()) e.phone = "Required";
    else if (!/^\d{7,15}$/.test(form.phone)) e.phone = "7-15 digits only";
    if (!Object.values(form.checks).some(Boolean))
      e.checks = "Select at least one option";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!validate()) return;
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);

    const data = {
      name: form.name,
      phone: `${form.countryCode}${form.phone}`,
      project: `${form.checks.mokila ? "Yes I am actively looking for 3BHK in Mokila" : ""} also  ${form.checks.hyderabad ? "I am looking for a 3BHK in Hyderabad" : ""} but ${form.checks.months ? "Not immediately but in 3-6 months" : ""}`,
      message: `Occupation: ${form.occupation}`,
      email: form.email,
      status: "jumeriah-towers",
    };
    try {
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result?.error || "Failed");
      }

      toast.success("Inquiry sent successfully!");

      // Use stored reference

      setForm({
        name: "",
        email: "",
        occupation: "",
        countryCode: "+91",
        phone: "",
        checks: { mokila: false, hyderabad: false, months: false },
      });
    } catch (err) {
      console.error(err);
      toast.error("Failed to send inquiry");
    } finally {
      setSubmitted(false);
    }
  };

  const selectedFlag =
    countries.find((c) => c.code === form.countryCode)?.flag ?? "🌐";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lato:wght@400;600;700&display=swap');

        * { box-sizing: border-box; }

        .cs-wrap {
          font-family: 'Lato', sans-serif;
          background: #d0d2d3;
          margin: 20px;
          padding: 20px;
          border-radius: 4px;
        }

        .cs-grid {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr auto;
          gap: 20px 24px;
          align-items: start;
        }

        .cs-col   { display: flex; flex-direction: column; gap: 14px; }
        .cs-field { display: flex; flex-direction: column; gap: 3px; }

        .cs-row {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .cs-label {
          font-size: 13px;
          font-weight: 600;
          color: #111;
          white-space: nowrap;
          width: 110px;
          flex-shrink: 0;
        }

        .cs-input {
          flex: 1;
          min-width: 0;
          height: 34px;
          padding: 0 10px;
          border: 1px solid #999;
          border-radius: 3px;
          background: #fff;
          font-size: 13px;
          font-family: 'Lato', sans-serif;
          color: #111;
          outline: none;
          transition: border-color 0.15s;
        }
        .cs-input:focus { border-color: #444; }

        .cs-phone-wrap {
          display: flex;
          align-items: center;
          gap: 5px;
          flex: 1;
          min-width: 0;
        }

        .cs-flag {
          font-size: 20px;
          line-height: 1;
          flex-shrink: 0;
          user-select: none;
        }

        .cs-select {
          height: 34px;
          padding: 0 4px;
          border: 1px solid #999;
          border-radius: 3px;
          background: #fff;
          font-size: 12px;
          font-family: 'Lato', sans-serif;
          color: #111;
          outline: none;
          cursor: pointer;
          width: 80px;
          flex-shrink: 0;
        }

        .cs-error {
          font-size: 11px;
          color: #b71c1c;
          padding-left: 118px;
        }

        .cs-checks { display: flex; flex-direction: column; gap: 10px; }

        .cs-checks-title {
          font-size: 11.5px;
          font-weight: 700;
          color: #111;
          text-transform: uppercase;
          letter-spacing: 0.07em;
        }

        .cs-check-row {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 10px;
          cursor: pointer;
          user-select: none;
        }

        .cs-check-text {
          font-size: 12.5px;
          color: #111;
          line-height: 1.35;
          flex: 1;
        }

        .cs-box {
          width: 18px;
          height: 18px;
          border: 1.5px solid #777;
          background: #fff;
          border-radius: 2px;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: 1px;
          transition: background 0.12s, border-color 0.12s;
        }
        .cs-box.on { background: #4a4a4a; border-color: #4a4a4a; }
        .cs-box.on::after { content: "✓"; color: #fff; font-size: 11px; font-weight: 700; }

        .cs-checks-err { font-size: 11px; color: #b71c1c; }

        .cs-btns {
          display: flex;
          flex-direction: column;
          gap: 10px;
          min-width: 128px;
        }

        .cs-btn {
          height: 38px;
          width: 100%;
          border: none;
          border-radius: 3px;
          font-family: 'Lato', sans-serif;
          font-size: 12.5px;
          font-weight: 700;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.15s, transform 0.1s;
        }
        .cs-btn:active { transform: scale(0.97); }

        .cs-btn-submit       { background: #5a5a5a; color: #fff; }
        .cs-btn-submit:hover { background: #3a3a3a; }
        .cs-btn-submit.done  { background: #2e7d32; }

        .cs-btn-brochure       { background: #7a7a7a; color: #fff; }
        .cs-btn-brochure:hover { background: #505050; }

        @media (max-width: 860px) {
          .cs-grid { grid-template-columns: 1fr 1fr; }
        }

        @media (max-width: 560px) {
          .cs-wrap { margin: 20px; padding: 14px 12px; }

          .cs-grid { grid-template-columns: 1fr; gap: 16px; }

          .cs-row {
            flex-direction: column;
            align-items: flex-start;
            gap: 4px;
          }

          .cs-label { width: auto; font-size: 12px; }

          .cs-input { width: 100%; height: 42px; font-size: 15px; }

          .cs-select { height: 42px; font-size: 13px; }

          .cs-phone-wrap { width: 100%; }

          .cs-error { padding-left: 0; }

          .cs-btns { flex-direction: row; min-width: unset; }
          .cs-btns .cs-btn { flex: 1; }
        }
      `}</style>

      <div className="cs-wrap">
        <div className="cs-grid">
          <div className="cs-col">
            <div className="cs-field">
              <div className="cs-row">
                <span className="cs-label">Name</span>
                <input
                  className="cs-input"
                  value={form.name}
                  onChange={(e) => set("name", e.target.value)}
                  placeholder="Full name"
                />
              </div>
              {errors.name && <div className="cs-error">{errors.name}</div>}
            </div>

            <div className="cs-field">
              <div className="cs-row">
                <span className="cs-label">Occupation</span>
                <input
                  className="cs-input"
                  value={form.occupation}
                  onChange={(e) => set("occupation", e.target.value)}
                  placeholder="Your occupation"
                />
              </div>
              {errors.occupation && (
                <div className="cs-error">{errors.occupation}</div>
              )}
            </div>
          </div>

          <div className="cs-col">
            <div className="cs-field">
              <div className="cs-row">
                <span className="cs-label">E-mail address:</span>
                <input
                  className="cs-input"
                  type="email"
                  value={form.email}
                  onChange={(e) => set("email", e.target.value)}
                  placeholder="you@example.com"
                />
              </div>
              {errors.email && <div className="cs-error">{errors.email}</div>}
            </div>

            <div className="cs-field">
              <div className="cs-row">
                <span className="cs-label">Code &amp; Phone:</span>
                <div className="cs-phone-wrap">
                  <span className="cs-flag">{selectedFlag}</span>
                  <select
                    className="cs-select"
                    value={form.countryCode}
                    onChange={(e) => set("countryCode", e.target.value)}
                    disabled={loadingCountries}
                  >
                    {loadingCountries ? (
                      <option>Loading...</option>
                    ) : (
                      countries.map((c) => (
                        <option key={c.abbr} value={c.code}>
                          {c.abbr} {c.code}
                        </option>
                      ))
                    )}
                  </select>
                  <input
                    className="cs-input"
                    value={form.phone}
                    onChange={(e) =>
                      set("phone", e.target.value.replace(/\D/g, ""))
                    }
                    placeholder="Phone number"
                    maxLength={15}
                    inputMode="numeric"
                  />
                </div>
              </div>
              {errors.phone && <div className="cs-error">{errors.phone}</div>}
            </div>
          </div>

          <div className="cs-checks">
            <div className="cs-checks-title">Tick what's applicable</div>
            {(
              [
                ["mokila", "Yes I am actively looking for 3BHK in Mokila"],
                ["hyderabad", "I am looking for a 3BHK in Hyderabad"],
                ["months", "Not immediately but in 3-6 months"],
              ] as const
            ).map(([key, label]) => (
              <div
                key={key}
                className="cs-check-row"
                onClick={() => toggle(key)}
              >
                <span className="cs-check-text">{label}</span>
                <div className={`cs-box ${form.checks[key] ? "on" : ""}`} />
              </div>
            ))}
            {errors.checks && (
              <div className="cs-checks-err">{errors.checks}</div>
            )}
          </div>

          <div className="cs-btns">
            <button
              className={`cs-btn cs-btn-submit ${submitted ? "done" : ""}`}
              onClick={handleSubmit}
            >
              {submitted ? "Submitted ✓" : "Submit"}
            </button>

            <a href="/brochure.pdf" download style={{ textDecoration: "none" }}>
              <button className="cs-btn cs-btn-brochure">
                Download Brochure
              </button>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
