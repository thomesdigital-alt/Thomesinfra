import type { Metadata } from "next";
import "./globals.css";
import VisualEditsMessenger from "../visual-edits/VisualEditsMessenger";
import ErrorReporter from "@/components/ErrorReporter";
import Script from "next/script";
import { Montserrat } from "next/font/google"; // ✅ added

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

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
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${montserrat.className} antialiased`}>
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

        <VisualEditsMessenger />
      </body>
    </html>
  );
}
