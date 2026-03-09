import type { Metadata } from "next";
import "./globals.css";
import VisualEditsMessenger from "../visual-edits/VisualEditsMessenger";
import ErrorReporter from "@/components/ErrorReporter";
import Script from "next/script";
// import { WhatsAppButton } from "@/components/ui/whatsappbutton";

export const metadata: Metadata = {
  metadataBase: new URL("https://thomesinfra.com/"),

  title: {
    default: "T Homes Infra | HMDA Approved Plots",
    template: "%s | T Homes Infra",
  },

  description:
    "T Homes Infra offers HMDA, DTCP and YTDA-MUDA approved open plots in high growth corridors like Warangal Highway and Kondurg with clear titles and strong appreciation potential.",

  keywords: [
    "HMDA approved plots",
    "plots on Warangal Highway",
    "open plots Kondurg",
    "land investment Hyderabad",
    "clear title residential plots Telangana",
  ],

  openGraph: {
    title: "T Homes Infra",
    description:
      "Secure land investments with HMDA approved plots across Warangal Highway and Kondurg growth corridors.",
    url: "https://thomesinfra.com/",
    siteName: "T Homes Infra",
    locale: "en_IN",
    type: "website",
  },

  robots: {
    index: true,
    follow: true,
  },

  alternates: {
    canonical: "https://thomesinfra.com/",
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {/* <Script
          id="orchids-browser-logs"
          src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/scripts/orchids-browser-logs.js"
          strategy="afterInteractive"
          data-orchids-project-id="5c558719-90eb-4032-8493-5e5c070ff8d2"
        /> */}
        <ErrorReporter />
        <Script
          src="/route-messenger.js"
          strategy="afterInteractive"
          data-target-origin="*"
          data-message-type="ROUTE_CHANGE"
          data-include-search-params="true"
          data-only-in-iframe="true"
          data-debug="true"
          data-custom-data='{"appName": "YourApp", "version": "1.0.0", "greeting": "hi"}'
        />
        {children}
         {/* <WhatsAppButton /> */}

        <VisualEditsMessenger />
      </body>
    </html>
  );
}
