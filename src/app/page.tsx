import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { TrustBadges } from "@/components/sections/TrustBadges";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { Highlights } from "@/components/sections/Highlights";
import { Testimonials, Gallery } from "@/components/sections/Gallery";
import { VideoGallery } from "@/components/sections/VideoGallery";
import { FAQ } from "@/components/sections/FAQ";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/layout/Footer";
import { Toaster } from "@/components/ui/sonner";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "HMDA Approved Plots on Warangal Highway | T Homes Infra",
  description:
    "T Homes Infra offers HMDA, DTCP, and YTDA-MUDA approved open plots with clear titles across Warangal Highway and Kondurg. Invest in secure land with high appreciation potential.",
  keywords: [
    "clear title residential plots Warangal Highway",
    "HMDA approved plots Warangal Highway",
    "open plots Kondurg",
    "high appreciation plots Warangal Highway",
    "strategic land investment Telangana",
  ],
   openGraph: {
    title: "T Homes Infra",
    description:
      "Secure land investments with HMDA approved plots on Warangal Highway and Kondurg.",
    url: "https://thomesinfra.com/",
    siteName: "T Homes Infra",
    type: "website",
  },
};
export default function Home() {
  return (
    <main className="min-h-screen bg-white selection:bg-amber-500 selection:text-black">
      <Navbar />
      <Hero />
      <About />
      <TrustBadges />
      <FeaturedProjects />
      <Highlights />
      {/* <VideoGallery /> */}
      <Testimonials />
      <FAQ />
      <Contact />
      {/* <Gallery /> */}
      <Footer />
      <Toaster position="top-center" />
    </main>
  );
}
