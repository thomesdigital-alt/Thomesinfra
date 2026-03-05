import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";

export default function TermsAndConditions() {
  return (
    <main className="bg-white px-6 py-20">
       <Navbar /> 
      <div className="max-w-4xl mx-auto text-primary">
        
        {/* Header */}
        <h1 className="text-3xl md:text-5xl font-bold mb-6 text-center">
          Terms &amp; Conditions
        </h1>

        <p className="text-center text-primary/60 mb-12">
          Effective Date: <strong>10/01/2023</strong><br />
          Website: <strong>www.thomesinfra.co</strong><br />
          Company Name: <strong>T Homes Infra Pvt Ltd</strong>
        </p>

        {/* Intro */}
        <p className="text-lg text-primary/70 leading-relaxed mb-10">
          Welcome to the official website of <strong>T Homes Infra Pvt Ltd</strong>. 
          By accessing or using our website and services, you agree to comply with the following 
          Terms &amp; Conditions. If you do not agree, please do not use our services.
        </p>

        {/* Sections */}
        <Section title="1. Use of Website">
          <ul className="list-disc pl-6 space-y-2">
            <li>You agree to use this website for lawful purposes only.</li>
            <li>Any misuse, fraudulent activity, or unauthorized use of our services is strictly prohibited.</li>
          </ul>
        </Section>

        <Section title="2. Property Information">
          <ul className="list-disc pl-6 space-y-2">
            <li>
              All listings, prices, specifications, and availability of plots, apartments,
              gated communities, and commercial properties are subject to change without notice.
            </li>
            <li>
              We strive to provide accurate information, but we do not guarantee that all listings
              are current, complete, or error-free.
            </li>
          </ul>
        </Section>

        <Section title="3. User Responsibilities">
          <ul className="list-disc pl-6 space-y-2">
            <li>You must provide accurate personal information during inquiries or transactions.</li>
            <li>
              You agree not to post or transmit any material that is unlawful, threatening,
              defamatory, or harmful.
            </li>
          </ul>
        </Section>

        <Section title="4. Intellectual Property">
          <ul className="list-disc pl-6 space-y-2">
            <li>
              All website content including logos, text, graphics, images, and software is the
              property of T Homes Infra Pvt Ltd and protected under applicable copyright and
              trademark laws.
            </li>
            <li>
              You may not reproduce or distribute any content without prior written permission.
            </li>
          </ul>
        </Section>

        <Section title="5. Third-Party Links">
          <p>
            This website may contain links to external websites. We are not responsible for
            their content or practices. Use them at your own risk.
          </p>
        </Section>

        <Section title="6. Limitation of Liability">
          <p>
            T Homes Infra Pvt Ltd shall not be held liable for any direct, indirect, or incidental
            damages arising out of the use of our website or services.
          </p>
        </Section>

        <Section title="7. Governing Law">
          <p>
            These Terms shall be governed by and interpreted under the laws of India.
            Any disputes will be resolved in the jurisdiction of <strong>Hyderabad</strong>.
          </p>
        </Section>

        <Section title="8. Modifications">
          <p>
            We reserve the right to modify these Terms &amp; Conditions at any time.
            Changes will be posted on this page.
          </p>
        </Section>

        {/* Disclaimer */}
        <h2 className="text-2xl font-semibold mt-16 mb-4">Disclaimer</h2>
        <p className="text-primary/70 leading-relaxed mb-6">
          All information on this website is published in good faith and for general informational
          purposes only. T Homes Infra Pvt Ltd does not make any warranties about the completeness,
          reliability, or accuracy of this information.
        </p>

        <h3 className="text-xl font-semibold mb-3">Property Listings</h3>
        <p className="text-primary/70 leading-relaxed mb-6">
          While we strive to keep property details updated, some listings may change, be sold,
          or withdrawn without notice. We advise all users to independently verify details before
          making a decision.
        </p>

        <h3 className="text-xl font-semibold mb-3">No Legal or Financial Advice</h3>
        <p className="text-primary/70 leading-relaxed mb-6">
          This website is not intended to provide legal, tax, or financial advice. Users should
          consult appropriate professionals for guidance based on their specific circumstances.
        </p>

        <h3 className="text-xl font-semibold mb-3">Third-Party Involvement</h3>
        <p className="text-primary/70 leading-relaxed">
          We are not responsible for any losses or disputes arising from third-party services
          or external agents referenced or contacted through our platform.
        </p>

      </div>
       <Footer />
    </main>
  );
}

/* Reusable section component */
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-10">
      <h2 className="text-2xl font-semibold mb-4">{title}</h2>
      <div className="text-primary/70 leading-relaxed">{children}</div>
    </section>
  
  );
}