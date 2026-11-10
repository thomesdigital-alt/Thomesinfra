"use client";

import React from "react";

interface SiteVisitFormProps {
  className?: string;
  projectNames: string[];
  onSubmit?: () => void;
}

export default function SiteVisitForm({
  className = "",
  projectNames,
  onSubmit,
}: SiteVisitFormProps) {
  const [formData, setFormData] = React.useState({
    name: "",
    phone: "",
    project: "",
    residence: "",
    occupation: "",
    message: "",
  });

  const [agreed, setAgreed] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);
  const [showThankYou, setShowThankYou] = React.useState(false);
  const [error, setError] = React.useState("");

  const updateField = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const inputClass = `
    h-[50px]
    w-full
    rounded-full
    border-[3px]
    border-[#f0eeee]
    bg-transparent
    px-6
    text-[18px]
    font-medium
    text-[#505050]
    placeholder:text-[#555555]
    placeholder:opacity-100
    outline-none
    transition
    focus:border-white
    focus:ring-0
  `;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!agreed) {
      setError("Please accept the terms and conditions.");
      return;
    }

    setSubmitting(true);
    setError("");

    const finalMessage = `
Occupation: ${formData.occupation}
Place of Residence: ${formData.residence}
Additional Message: ${formData.message || "Not provided"}
    `.trim();

    try {
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          project: formData.project,
          message: finalMessage,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result?.error || "Submission failed");
      }

      // Clear all form fields
      setFormData({
        name: "",
        phone: "",
        project: "",
        residence: "",
        occupation: "",
        message: "",
      });

      setAgreed(false);

      // Show Thank You popup
      setShowThankYou(true);

      onSubmit?.();
    } catch (err) {
      console.error(err);

      setError(
        err instanceof Error ? err.message : "Unable to submit your enquiry.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className={`
          ${className}
          grid
          grid-cols-1
          sm:grid-cols-2
          gap-x-[30px]
          gap-y-[16px]
          items-center
          rounded-[60px]
          bg-[#d3d2d2]
          px-8
          py-8
          lg:px-12
          lg:py-9
        `}
      >
        {/* NAME */}
        <input
          type="text"
          required
          placeholder="Name"
          aria-label="Name"
          value={formData.name}
          onChange={(e) => updateField("name", e.target.value)}
          className={inputClass}
        />

        {/* OCCUPATION - TEXT INPUT */}
        <input
          type="text"
          required
          placeholder="Occupation"
          aria-label="Occupation"
          value={formData.occupation}
          onChange={(e) => updateField("occupation", e.target.value)}
          className={inputClass}
        />

        {/* PHONE */}
        <input
          type="tel"
          required
          pattern="[6-9][0-9]{9}"
          maxLength={10}
          placeholder="Phone Number"
          aria-label="Phone Number"
          value={formData.phone}
          onChange={(e) =>
            updateField("phone", e.target.value.replace(/\D/g, "").slice(0, 10))
          }
          className={inputClass}
        />

        {/* RESIDENCE - TEXT INPUT */}
        <input
          type="text"
          required
          placeholder="Place of Residence"
          aria-label="Place of Residence"
          value={formData.residence}
          onChange={(e) => updateField("residence", e.target.value)}
          className={inputClass}
        />

        {/* PROJECT DROPDOWN */}
        <select
          required
          aria-label="Interested in Project"
          value={formData.project}
          onChange={(e) => updateField("project", e.target.value)}
          className={`${inputClass} cursor-pointer appearance-none`}
        >
          <option value="" disabled>
            Interested in Project
          </option>

          {projectNames.map((project) => (
            <option key={project} value={project}>
              {project}
            </option>
          ))}
        </select>

        {/* MESSAGE */}
        <input
          type="text"
          placeholder="Message"
          aria-label="Message"
          value={formData.message}
          onChange={(e) => updateField("message", e.target.value)}
          className={inputClass}
        />

        {/* TERMS AND CONDITIONS - KEEP SAME */}
        <div className="col-span-1 sm:col-span-2 flex items-start gap-2 pt-1">
          <input
            type="checkbox"
            id="site-visit-terms"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="mt-1 h-4 w-4 shrink-0 cursor-pointer accent-[#2d368f]"
          />

          <label
            htmlFor="site-visit-terms"
            className="text-[12px] leading-relaxed text-[#555555]"
          >
            I agree to receive communication via SMS, RCS and WhatsApp and
            accept the{" "}
            <a
              href="https://thomesinfra.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-[#2d368f]"
            >
              Privacy Policy
            </a>{" "}
            and{" "}
            <a
              href="https://thomesinfra.com/termsandcondition"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-[#2d368f]"
            >
              Terms & Conditions
            </a>
            .
          </label>
        </div>

        {/* ERROR */}
        {error && (
          <p className="col-span-1 sm:col-span-2 text-sm text-red-600">
            {error}
          </p>
        )}

        {/* SUBMIT BUTTON */}
        <div className="col-span-1 sm:col-span-2 flex justify-end">
          <button
            type="submit"
            disabled={submitting || !agreed}
            className="
              h-[66px]
              w-full
              max-w-[270px]
              rounded-full
              bg-[#ed1c24]
              text-[23px]
              font-semibold
              text-white
              shadow-md
              transition
              hover:bg-[#d71920]
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            {submitting ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>

      {/* THANK YOU POPUP */}
      {showThankYou && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="thank-you-title"
        >
          <div className="w-full max-w-lg rounded-3xl bg-white p-8 shadow-2xl">
            <div className="mb-5 text-center text-5xl text-green-600">✓</div>

            <h2
              id="thank-you-title"
              className="mb-5 text-center text-2xl font-bold text-[#2d368f]"
            >
              Thank You!
            </h2>

            <div className="space-y-3 text-sm leading-relaxed text-gray-600">
              <p className="font-semibold text-gray-800">
                Thank you for showing interest in T Homes Infra!
              </p>

              <p>
                We've received your enquiry and are glad to connect with you.
              </p>

              <p>
                Our team will get in touch with you immediately during working
                hours to understand your requirements and help you explore the
                right property options.
              </p>

              <p>
                If we've received your enquiry on a holiday, we'll connect with
                you on the next working day.
              </p>

              <p className="pt-2 font-semibold text-[#2d368f]">
                Regards,
                <br />
                Team T Homes Infra
              </p>
            </div>

            <button
              type="button"
              onClick={() => setShowThankYou(false)}
              className="mt-7 h-12 w-full rounded-full bg-[#2d368f] font-semibold text-white"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
