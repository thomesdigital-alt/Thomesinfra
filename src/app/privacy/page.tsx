import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import React from "react";

export default function PrivacyPolicy() {
  return (
    <main >
        <Navbar />
        <div className="container mx-auto px-6 py-16 max-w-4xl text-gray-800">
      <h1 className="text-3xl font-bold mb-6 text-center">Privacy Policy</h1>

      <p className="mb-4">
        This Privacy Policy describes how THomes Infra Pvt. Ltd. (“we”, “us”, or “our”) collects, uses, shares,
        and protects your personal information when you visit our website, use our services, or interact with us
        online. Your privacy is important to us, and we are committed to safeguarding your information.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-3">1. Information We Collect</h2>
      <p className="mb-4">
        We may collect personal information that you voluntarily provide when you:
      </p>
      <ul className="list-disc pl-6 mb-4">
        <li>Submit contact or inquiry forms</li>
        <li>Subscribe to newsletters or updates</li>
        <li>Contact us by phone, email, or message</li>
        <li>Interact with customer support</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-3">2. How We Use Your Information</h2>
      <p className="mb-4">
        We use your personal information for purposes including but not limited to:
      </p>
      <ul className="list-disc pl-6 mb-4">
        <li>Responding to your inquiries and requests</li>
        <li>Providing and improving our services</li>
        <li>Sending marketing and promotional communications</li>
        <li>Complying with legal or regulatory requirements</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-3">3. Information Sharing</h2>
      <p className="mb-4">
        We may share your information with:
      </p>
      <ul className="list-disc pl-6 mb-4">
        <li>Third-party service providers to support business operations</li>
        <li>Legal authorities when required by law</li>
        <li>Authorized partners assisting with promotions and services</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-3">4. Cookies and Tracking</h2>
      <p className="mb-4">
        Our website may use cookies and similar tracking technologies to enhance your experience,
        personalize content, and analyze how the site is used. You can control cookie preferences
        through your browser settings.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-3">5. Data Security</h2>
      <p className="mb-4">
        We implement technical and organizational measures to protect your personal information
        against unauthorized access, disclosure, alteration, or destruction.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-3">6. Third-Party Links</h2>
      <p className="mb-4">
        Our site may contain links to third-party websites. We are not responsible for
        the privacy practices of those sites. We encourage you to read their privacy policies.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-3">7. Your Rights</h2>
      <p className="mb-4">
        You may access, correct, or delete your personal information by contacting us at
        <strong> info@thomesinfra.com </strong> or through any account features provided.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-3">8. Changes to Policy</h2>
      <p className="mb-4">
        We may update this Privacy Policy from time to time. The effective date will be updated
        when changes are made. Your continued use of our website constitutes acceptance of those changes.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-3">9. Contact Us</h2>
      <p className="mb-4">
        If you have any questions about this Privacy Policy, you may contact us at:
      </p>

      <p className="mb-8 font-semibold">
        THomes Infra Pvt. Ltd.<br />
        Email: <a href="mailto:info@thomesinfra.com" className="text-accent">info@thomesinfra.com</a><br />
        Website: <a href="https://thomesinfra.com" className="text-accent">www.thomesinfra.com</a>
      </p>

      <p className="text-sm text-gray-500 text-center">
        This Privacy Policy is effective as of the date published on the website and
        may be updated periodically.
      </p>
      </div>
            <Footer />
    </main>
  );
}