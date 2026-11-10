"use client";

import { useState } from "react";
import { Check, ChevronDown, Handshake, Menu, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { STARTING_PRICE_PER_SQUARE_YARD } from "@/lib/thomes-content";
import SiteVisitForm from "@/app/home/sitevisitform";
import landImage from "@/assets/thomes/land-development.jpg";
import projectAkshita from "@/assets/thomes/project-1.jpg";
import projectTrioGold from "@/assets/thomes/project-2.jpg";
import projectTriDisha from "@/assets/thomes/project-3.jpg";
import projectNatureCounty from "@/assets/thomes/project-4.jpg";
import projectAlaVaikuntapuram from "@/assets/thomes/project-5.jpg";
import approvalHmda from "@/assets/thomes/approval-1.jpg";
import approvalDtcp from "@/assets/thomes/approval-2.jpg";
import approvalTelangana from "@/assets/thomes/approval-3.jpg";
import highwayImage from "@/assets/thomes/connectivity-highway.jpg";

/* ═══════════════════════ IMAGE LINKS ═══════════════════════ */
// HERO IMAGE → paste your hero image URL between the quotes (or keep the local one for now)
const HERO_IMAGE_URL: string = highwayImage.src; // e.g. "https://thomestowers.com/wp-content/uploads/2026/11/hero.jpg"

const homesLogoAsset = {
  url: "https://thomestowers.com/wp-content/uploads/2026/11/T-Homes-Logo.png",
}; // header + footer logo
const connectivityMarkAsset = {
  url: "https://thomestowers.com/wp-content/uploads/2026/11/1.png",
}; // red "T" in "Connectivity"
const familyAsset = {
  url: "https://thomestowers.com/wp-content/uploads/2026/11/Cheerful-South-Asian-Family-Portrait-removebg-preview.png",
}; // family image
const TG_RERA_IMAGE =
  "https://thomestowers.com/wp-content/uploads/2026/03/1923609-10-removebg-preview.png";

/* ═══════════════════════ COLOUR THEME (sampled from the PDF) ═══════════════════════
   Light grey bg   #e9e8e8   (hero, invest, price, visit, input borders)
   Dark grey bg    #d3d2d2   (strip, advantage, projects, footer, tiles, form box)
   Navy            #2f3692   (headings, active nav, pins)
   Red             #eb2027   (buttons, outlines, diagonal)
   Body grey text  #4f4c4d   (nav, paragraphs, icons)
   Strong text     #231f20   (bold lines in the connectivity strip)
*/
const NAVY = "text-[#2f3692]";
const GREY = "text-[#4f4c4d]";
const RED_BTN = "bg-[#eb2027] text-white hover:bg-[#cf1a21]";
const Blue_BTN = "bg-[#2f3692] text-white hover:bg-[#1f2a7a]";
const RED_OUTLINE =
  "border-2 border-[#eb2027] text-[#4f4c4d] hover:bg-[#eb2027] hover:text-white";
const PAD = "px-5 sm:px-8 lg:px-[7.5%]";
const FIELD =
  "h-[33px] w-full rounded-full border-[3px] border-[#e9e8e8] bg-[#d3d2d2] px-4 text-[15px] font-semibold text-[#4f4c4d] shadow-none outline-none placeholder:font-semibold placeholder:text-[#4f4c4d] focus-visible:ring-1 focus-visible:ring-[#2f3692] lg:text-[18px]";

// export const Route = createFileRoute("/")({
//   head: () => ({
//     meta: [
//       { title: "T Homes Infra | Villa Plots in Hyderabad" },
//       {
//         name: "description",
//         content:
//           "Discover thoughtfully planned gated community villa plots at Yadadri, Peddakandukur, Shadnagar and Kondurg with T Homes Infra.",
//       },
//       {
//         property: "og:title",
//         content: "T Homes Infra | Villa Plots in Hyderabad",
//       },
//       {
//         property: "og:description",
//         content:
//           "Discover thoughtfully planned gated community villa plots at Yadadri, Peddakandukur, Shadnagar and Kondurg with T Homes Infra.",
//       },
//       { property: "og:type", content: "website" },
//       { name: "twitter:card", content: "summary_large_image" },
//     ],
//     links: [
//       { rel: "preconnect", href: "https://fonts.googleapis.com" },
//       {
//         rel: "preconnect",
//         href: "https://fonts.gstatic.com",
//         crossOrigin: "anonymous",
//       },
//       {
//         rel: "stylesheet",
//         href: "https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap",
//       },
//     ],
//   }),
//   component: Index,
// });

/* ═══════════════════════ ICONS (solid, like the design) ═══════════════════════ */
const GAP = "#d3d2d2";

function PinIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="currentColor"
      viewBox="0 0 48 56"
    >
      <path
        fillRule="evenodd"
        d="M24 2C14 2 7 9.5 7 19c0 12 17 35 17 35s17-23 17-35C41 9.5 34 2 24 2zm0 25a8 8 0 1 1 0-16 8 8 0 0 1 0 16z"
      />
    </svg>
  );
}

function RoadIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="currentColor"
      viewBox="0 0 64 44"
    >
      <path d="M20 0h24l20 44H0z" />
      <g fill={GAP}>
        <path d="M30.5 2h3v8h-3zM30 15h4v10h-4zM29.5 30h5v12h-5z" />
      </g>
      <path
        d="M21.5 2 6 42M42.5 2 58 42"
        fill="none"
        stroke={GAP}
        strokeWidth="1.6"
      />
    </svg>
  );
}

function BuildingIcon({ className }: { className?: string }) {
  const rows = [5, 13, 21, 29, 37];
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="currentColor"
      viewBox="0 0 64 52"
    >
      <rect height="46" width="22" x="22" y="0" />
      <rect height="32" width="16" x="6" y="14" />
      <rect height="24" width="14" x="44" y="22" />
      <rect height="4" width="64" x="0" y="47" />
      <g fill={GAP}>
        {rows.map((y) => (
          <g key={y}>
            <rect height="4" width="4" x="26" y={y} />
            <rect height="4" width="4" x="32" y={y} />
            <rect height="4" width="4" x="38" y={y} />
          </g>
        ))}
        {[19, 27, 35].map((y) => (
          <g key={`l${y}`}>
            <rect height="4" width="3.5" x="9" y={y} />
            <rect height="4" width="3.5" x="15" y={y} />
          </g>
        ))}
        {[27, 35].map((y) => (
          <g key={`r${y}`}>
            <rect height="4" width="3.5" x="47" y={y} />
            <rect height="4" width="3.5" x="52" y={y} />
          </g>
        ))}
      </g>
    </svg>
  );
}

function InterchangeIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="4"
      viewBox="0 0 64 48"
    >
      <path d="M4 6v36M60 6v36M4 24h18M60 24H42" />
      <path d="M32 2c0 12-4 22-10 22 6 0 10 10 10 22 0-12 4-22 10-22-6 0-10-10-10-22z" />
    </svg>
  );
}

function GrowthIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="currentColor"
      viewBox="0 0 48 40"
    >
      <rect height="14" width="10" x="3" y="26" />
      <rect height="20" width="10" x="17" y="20" />
      <rect height="28" width="10" x="31" y="12" />
      <path
        d="M5 16 17 9l8 6L41 3M32 3h10v10"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="3"
      />
    </svg>
  );
}

function GearIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 48 48"
    >
      <circle cx="24" cy="24" r="12" strokeWidth="9" />
      <circle
        cx="24"
        cy="24"
        r="18.5"
        strokeDasharray="7.3 7.2"
        strokeWidth="7"
      />
    </svg>
  );
}

function HouseIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="currentColor"
      viewBox="0 0 48 44"
    >
      <path d="M24 2 1 22h6v20h13V28h8v14h13V22h6z" />
    </svg>
  );
}

// function SiteVisitForm({
//   className,
//   projectNames,
//   submitted,
//   onSubmit,
// }: {
//   className: string;
//   projectNames: string[];
//   submitted: boolean;
//   onSubmit: () => void;
// }) {
//   return (
//     <form
//       className={className}
//       onSubmit={(event) => {
//         event.preventDefault();
//         onSubmit();
//       }}
//     >
//       <Input
//         aria-label="Name"
//         autoComplete="name"
//         className={FIELD}
//         name="name"
//         placeholder="Name"
//         required
//       />
//       <Input
//         aria-label="Occupation"
//         autoComplete="organization-title"
//         className={FIELD}
//         name="occupation"
//         placeholder="Occupation"
//       />
//       <Input
//         aria-label="Phone number"
//         autoComplete="tel"
//         className={FIELD}
//         inputMode="tel"
//         name="phone"
//         pattern="[+0-9 ()-]{8,18}"
//         placeholder="Phone Number"
//         required
//       />
//       <Input
//         aria-label="Place of residence"
//         autoComplete="address-level2"
//         className={FIELD}
//         name="residence"
//         placeholder="Place of Residence"
//       />

//       <div className="relative">
//         <select
//           aria-label="Interested in project"
//           className={`${FIELD} appearance-none pr-9`}
//           defaultValue=""
//           name="project"
//         >
//           <option value="" disabled>
//             Interested in Project
//           </option>
//           {projectNames.map((name) => (
//             <option key={name} value={name}>
//               {name}
//             </option>
//           ))}
//         </select>
//         <ChevronDown
//           aria-hidden="true"
//           className="pointer-events-none absolute right-3 top-2 size-4 text-[#4f4c4d]"
//         />
//       </div>
//       <Input
//         aria-label="Message"
//         className={FIELD}
//         name="message"
//         placeholder="Message"
//       />

//       <div className="flex items-center justify-center sm:col-span-2 sm:justify-end">
//         <Button
//           className={`h-[44px] w-[180px] rounded-full text-[22px] font-medium ${RED_BTN}`}
//           type="submit"
//         >
//           Submit
//         </Button>
//       </div>

//       {submitted && (
//         <p aria-live="polite" className="text-sm font-medium sm:col-span-2">
//           Thank you for your interest. Please call{" "}
//           <a className={`font-bold ${NAVY}`} href="tel:+918602860256">
//             8602 8602 56
//           </a>{" "}
//           to confirm your visit.
//         </p>
//       )}
//     </form>
//   );
// }

const navLinks = [
  ["Home", "#home"],
  ["Projects", "#projects"],
  ["Why T homes", "#advantage"],
  ["About Us", "#projects"],
  ["Contact", "#contact"],
];

// const heroPins = [
//   { name: "Yadadri", left: 13.9, end: 49 },
//   { name: "Peddakandukur", left: 33.8, end: 47 },
//   { name: "Shadnagar", left: 65.8, end: 45.5 },
//   { name: "Kondurg", left: 88.5, end: 66 },
// ];

function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  const projects = [
    {
      name: "Akshita",
      detail: "42 Acres | 562 Units",
      location: "Yadadri to Keesara Highway",
      image: projectAkshita.src,
      href: "https://thomesinfra.com/projects/akshitha%20mallapur",
    },
    {
      name: "Trio Gold",
      detail: "10.05 Acres | 135 Plots",
      location: "Kondurg",
      image: projectTrioGold.src,
      href: "https://thomesinfra.com/projects/trio-gold-",
    },
    {
      name: "Tri Disha",
      detail: "11.20 Acres | 155 Plots",
      location: "Kondurg",
      image: projectTriDisha.src,
      href: "https://thomesinfra.com/projects/tri-disha",
    },
    {
      name: "Nature County",
      detail: "50 Acres | 599 Plots",
      location: "Peddakandukur",
      image: projectNatureCounty.src,
      href: "https://thomesinfra.com/projects/-nature-county",
    },
    {
      name: "Ala Vaikuntapuram",
      detail: "22.5 Acres | 203 Plots",
      location: "Bahupeta Yadadri",
      image: projectAlaVaikuntapuram.src,
      href: "https://thomesinfra.com/projects/th-10-avp-bahupeta-dtcp",
    },
  ];
  const projectNames = projects.map(({ name }) => name);

  const stripItems = [
    {
      icon: <RoadIcon className="h-[66px] w-[96px]" />,
      lines: [
        ["Commute", true],
        ["anywhere in minutes", true],
        ["via RRR", false],
      ],
    },
    {
      icon: <BuildingIcon className="h-[62px] w-[78px]" />,
      lines: [
        ["HMDA", false],
        ["limit expansion", true],
      ],
    },
    {
      icon: <InterchangeIcon className="h-[66px] w-[90px]" />,
      lines: [
        ["ORR - Radial Road", false],
        ["confluence", true],
      ],
    },
  ] as const;

  const investTiles = [
    {
      icon: <GrowthIcon className="h-10 w-11" />,
      lines: ["New Growth", "Centre"],
    },
    {
      icon: <RoadIcon className="h-9 w-12" />,
      lines: ["Better", "Connectivity"],
    },
    {
      icon: <GearIcon className="h-10 w-10" />,
      lines: ["Infrastructure-", "Led Growth"],
    },
    { icon: <HouseIcon className="h-10 w-11" />, lines: ["A Market", "Reset"] },
    {
      icon: (
        <Handshake aria-hidden="true" className="h-10 w-11" strokeWidth={2.4} />
      ),
      lines: ["Think Long", "Term"],
    },
    { icon: <PinIcon className="h-10 w-8" />, lines: ["Prime", "Location"] },
  ];

  return (
    <Dialog>
      <main className="min-h-screen overflow-hidden bg-[#e9e8e8] font-['Montserrat',sans-serif] text-[#4f4c4d]">
        {/* ═════════ HEADER ═════════ */}
        <header
          className={`relative z-20 mx-auto flex min-h-[96px] max-w-[1600px] items-center justify-between gap-4 py-3 lg:min-h-[165px] ${PAD}`}
        >
          <nav
            aria-label="Main navigation"
            className="hidden items-center gap-[17px] md:flex"
          >
            {navLinks.map(([label, href], i) => (
              <a
                key={label}
                href={href}
                className={
                  i === 0
                    ? `border-b-4 border-[#2f3692] pb-0.5 text-base font-semibold lg:text-[21px] ${NAVY}`
                    : `text-base font-semibold transition-colors hover:text-[#2f3692] lg:text-[21px] ${GREY}`
                }
              >
                {label}
              </a>
            ))}
          </nav>

          <a
            aria-label="T Homes Infra home"
            className="ml-auto flex items-center"
            href="#home"
          >
            <img
              alt="T Homes Infra"
              className="w-28 object-contain sm:w-36 lg:w-[220px]"
              src={homesLogoAsset.url}
            />
          </a>

          <Button
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="md:hidden"
            onClick={() => setMenuOpen((open) => !open)}
            size="icon"
            type="button"
            variant="outline"
          >
            {menuOpen ? <X /> : <Menu />}
          </Button>

          {menuOpen && (
            <nav
              aria-label="Mobile navigation"
              className="absolute inset-x-4 top-full flex flex-col rounded-lg border border-[#bdbcbc] bg-[#e9e8e8] p-3 shadow-lg md:hidden"
            >
              {navLinks.map(([label, href]) => (
                <a
                  key={label}
                  className={`px-3 py-3 text-sm font-semibold ${GREY}`}
                  href={href}
                  onClick={closeMenu}
                >
                  {label}
                </a>
              ))}
            </nav>
          )}
        </header>

        {/* ═════════ HERO ═════════ */}
        <section
          id="home"
          className="relative mx-auto max-w-[1600px] lg:min-h-[380px]"
        >
          <div
            className={`relative z-10 pb-8 pt-2 lg:w-[46%] lg:pb-10 lg:pt-12 ${PAD}`}
          >
            <h1
              className={`font-semibold leading-none text-[2.6rem] sm:text-5xl lg:text-[67px] ${NAVY}`}
            >
              <span className="connectivity-wordmark" aria-label="Connectivity">
                Connec
                <span aria-hidden="true" className="connectivity-mark-wrap">
                  <img
                    alt=""
                    className="connectivity-mark"
                    src={connectivityMarkAsset.url}
                  />
                </span>
                ivity
              </span>
              <span className="mt-3 block text-xl font-light leading-snug sm:text-2xl lg:text-[35px]">
                like no other with T Homes
              </span>
            </h1>
            <p
              className={`mb-3 mt-8 text-lg font-bold sm:text-xl lg:text-[27px] ${GREY}`}
            >
              Gated Community Villa Plots @
            </p>
            <ul
              className="flex flex-wrap gap-x-3 gap-y-2"
              aria-label="Project locations"
            >
              {["Shadnagar", "Kondurg", "Yadadri", "Peddakandukur"].map(
                (place) => (
                  <li
                    className={`inline-flex items-center gap-1 text-xs font-semibold sm:text-sm lg:text-[15px] ${GREY}`}
                    key={place}
                  >
                    <PinIcon className="h-4 w-3 text-[#2f3692]" />
                    {place}
                  </li>
                ),
              )}
            </ul>
            <Button
              asChild
              className={`mt-8 h-11 rounded-full px-8 text-lg font-medium lg:text-[22px] ${RED_BTN}`}
            >
              <a href="#visit">Book Site Visit</a>
            </Button>
          </div>

          {/* Hero image — fades into the page on its left, top and bottom edges */}
          <div className="relative mt-2 lg:absolute lg:inset-y-0 lg:right-0 lg:mt-0 lg:w-[54.5%]">
            <img
              alt="Aerial view of landscaped Hyderabad highways connecting growing communities"
              className="aspect-[2.07] w-full object-cover [mask-composite:intersect] [mask-image:linear-gradient(to_right,transparent,#000_16%),linear-gradient(to_top,transparent,#000_12%),linear-gradient(to_bottom,transparent,#000_6%)] [-webkit-mask-composite:source-in] lg:aspect-auto lg:h-full"
              src={HERO_IMAGE_URL}
            />
            {/* {heroPins.map((pin) => (
            <div
              className="absolute flex -translate-x-1/2 flex-col items-center"
              key={pin.name}
              style={{ left: `${pin.left}%`, top: "10.5%", height: `${pin.end - 10.5}%` }}
            >
              <span className="text-[9px] font-bold leading-none text-black sm:text-xs lg:text-[15px]">{pin.name}</span>
              <PinIcon className="mt-1 h-4 w-3 shrink-0 text-[#2f3692] lg:h-[22px] lg:w-[17px]" />
              <span aria-hidden="true" className="mt-0.5 w-0 flex-1 border-l border-dashed border-[#2f3692]" />
            </div>
          ))} */}
          </div>
        </section>

        {/* ═════════ CONNECTIVITY STRIP ═════════ */}
        <section
          id="connectivity"
          aria-label="Location advantages"
          className="bg-[#d3d2d2]"
        >
          <div
            className={`mx-auto grid max-w-[1600px] grid-cols-2 items-center gap-y-7 py-7 md:grid-cols-4 lg:min-h-[208px] lg:grid-cols-[1fr_1fr_1fr_1.9fr] ${PAD}`}
          >
            {stripItems.map(({ icon, lines }) => (
              <div
                className="flex flex-col items-center justify-center text-center"
                key={lines[0][0]}
              >
                <span className="mb-3 text-[#4f4c4d]">{icon}</span>
                <p className="max-w-[12rem] text-[14px] font-semibold leading-snug lg:text-[19px]">
                  {lines.map(([text, strong]) => (
                    <span
                      className={`block ${strong ? "text-[#231f20]" : "text-[#4f4c4d]"}`}
                      key={text}
                    >
                      {text}
                    </span>
                  ))}
                </p>
              </div>
            ))}

            <div
              className="col-span-2 flex flex-col items-center justify-center gap-3 md:col-span-1"
              aria-label="Approved by TG RERA, HMDA and authorities"
            >
              <div className="flex flex-nowrap items-center justify-center gap-2 lg:gap-3">
                <img
                  alt="TG RERA"
                  className="h-25 w-auto shrink-0 object-contain mix-blend-multiply"
                  src={TG_RERA_IMAGE}
                />

                <img
                  alt="HMDA"
                  className="h-14 w-auto shrink-0 object-contain mix-blend-multiply lg:h-[72px]"
                  src={approvalHmda.src}
                />

                <img
                  alt="DTCP approved"
                  className="size-14 shrink-0 object-contain lg:size-[72px]"
                  src={approvalDtcp.src}
                />

                <img
                  alt="Telangana government"
                  className="size-14 shrink-0 object-contain lg:size-[72px]"
                  src={approvalTelangana.src}
                />
              </div>

              <span className="text-[14px] font-semibold text-[#231f20] lg:text-[19px]">
                Approved
              </span>
            </div>
          </div>
        </section>

        {/* ═════════ IS THE TIME RIGHT ═════════ */}
        <section className="bg-[#e9e8e8]">
          <div
            className={`mx-auto grid max-w-[1600px] items-center gap-8 py-10 md:grid-cols-[0.78fr_1.22fr] lg:min-h-[283px] lg:pl-[7.5%] lg:pr-[3.4%] ${"px-5 sm:px-8"}`}
          >
            <div>
              <h2
                className={`text-3xl font-semibold leading-[1.25] lg:text-[39px] ${NAVY}`}
              >
                Is the time right for <br className="hidden lg:block" />
                realty investment?
              </h2>
              <p className={`mt-1 text-xl font-light lg:text-[34px] ${GREY}`}>
                To look East &amp; South?
              </p>
            </div>
            <div className="grid grid-cols-2 gap-x-3 gap-y-3 sm:grid-cols-3 lg:gap-x-7 lg:gap-y-5">
              {investTiles.map(({ icon, lines }) => (
                <div
                  className="flex min-h-[104px] flex-col items-center justify-center gap-1 rounded-[18px] bg-[#d3d2d2] px-3 py-3 text-center text-[#4f4c4d]"
                  key={lines.join(" ")}
                >
                  {icon}
                  <span className="text-[13px] font-normal leading-tight lg:text-[17px]">
                    {lines[0]}
                    <br />
                    {lines[1]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═════════ ADVANTAGE ═════════ */}
        <section
          id="advantage"
          className="relative isolate overflow-hidden bg-[#d3d2d2] lg:min-h-[330px]"
        >
          {/* red diagonal edge + image */}
          <div
            aria-hidden="true"
            className="absolute inset-y-0 right-0 -z-20 hidden w-[67.5%] bg-[#eb2027] sm:block sm:[clip-path:polygon(19%_0,100%_0,100%_100%,0_100%)]"
          />
          <div
            aria-hidden="true"
            className="absolute inset-y-0 right-0 -z-10 hidden w-[67.5%] sm:block sm:[clip-path:polygon(calc(19%+9px)_0,100%_0,100%_100%,9px_100%)]"
          >
            <img
              alt="New plotted development taking shape in the Hyderabad region"
              className="size-full object-cover object-center"
              src={landImage.src}
            />
          </div>
          <img
            alt=""
            aria-hidden="true"
            className="absolute inset-0 -z-10 size-full object-cover opacity-20 sm:hidden"
            src={landImage.src}
          />

          <div
            className={`mx-auto flex max-w-[1600px] items-center py-10 lg:min-h-[330px] lg:py-6 ${PAD}`}
          >
            <div className="max-w-[28rem]">
              <h2 className={`font-semibold leading-tight ${NAVY}`}>
                <span className="block text-3xl lg:text-[40px]">Advantage</span>
                <span className="block text-xl lg:text-[28px]">
                  like no other with T Homes
                </span>
              </h2>
              <ul className="mt-4 space-y-1">
                {[
                  "Over 12 Years of trusted presence",
                  "Strategic Location",
                  "Premium Plotted Development",
                  "Transparent Dealings",
                ].map((reason) => (
                  <li
                    className="flex items-center gap-2 text-[15px] font-normal text-[#4f4c4d] lg:text-[21px]"
                    key={reason}
                  >
                    <Check
                      aria-hidden="true"
                      className="size-5 shrink-0 text-[#231f20]"
                      strokeWidth={3}
                    />
                    {reason}
                  </li>
                ))}
              </ul>
              <a
                className={`mt-7 inline-flex h-[34px] items-center rounded-full px-6 text-[13px] font-semibold transition-colors lg:text-[16px] ${RED_OUTLINE}`}
                href="https://thomesinfra.com/about"
              >
                Know More
              </a>
            </div>
          </div>
        </section>

        {/* ═════════ PRICE ═════════ */}

        <section aria-label="Starting price" className="bg-[#e9e8e8]">
          <div
            className={`mx-auto flex max-w-[1600px] flex-col items-start justify-between gap-5 py-5 sm:flex-row sm:items-center sm:gap-4 lg:min-h-[100px] lg:gap-5 ${PAD}`}
          >
            {/* Heading */}
            <h2
              className={`shrink-0 text-xl font-semibold leading-snug lg:text-[25px] lg:leading-[34px] ${GREY}`}
            >
              Enter at a Price Point
              <span className="block">like no other</span>
            </h2>

            {/* Starting Price */}
            <div className={`shrink-0 ${GREY}`}>
              <p className="text-[11px] font-semibold leading-tight">
                Starting From
              </p>

              <div className="flex items-baseline gap-2 whitespace-nowrap">
                <span className="text-4xl font-semibold leading-none tracking-tight lg:text-[48px]">
                  {STARTING_PRICE_PER_SQUARE_YARD.toLocaleString("en-IN")}/-
                </span>

                <span className="text-xs font-semibold lg:text-[14px]">
                  sq. yd.
                </span>
              </div>
            </div>

            {/* Bank Loan Button */}
            <Button
              asChild
              className={`h-[42px] shrink-0 whitespace-nowrap rounded-full px-6 text-base font-medium lg:px-7 lg:text-[18px] ${Blue_BTN}`}
            >
              <a href="#visit">Bank Loan Facility Available</a>
            </Button>

            {/* Book Site Visit Button */}
            <Button
              asChild
              className={`h-[42px] shrink-0 whitespace-nowrap rounded-full px-7 text-base font-medium lg:px-6 lg:text-[21px] ${RED_BTN}`}
            >
              <a href="#visit">Book Site Visit</a>
            </Button>
          </div>
        </section>

        {/* ═════════ PROJECTS ═════════ */}
        <section id="projects" className="bg-[#d3d2d2]">
          <div className="mx-auto max-w-[1600px] px-5 pb-10 pt-8 sm:px-8 lg:min-h-[548px]">
            <h2
              className={`mb-6 text-center text-3xl font-semibold lg:text-[40px] ${NAVY}`}
            >
              Projects at a Glance
            </h2>
            <div className="mx-auto flex max-w-[1140px] flex-wrap justify-center gap-x-6 gap-y-7 lg:gap-x-12 xl:gap-x-[170px]">
              {projects.map((project) => (
                <article
                  className="flex w-[266px] max-w-full flex-col items-center"
                  key={project.name}
                >
                  <div className="w-full overflow-hidden rounded-[26px] bg-[#e9e8e8]">
                    <img
                      alt={`A view of the ${project.name} development`}
                      className="h-[66px] w-full object-cover"
                      loading="lazy"
                      src={project.image}
                    />
                    <div className="px-3 pb-3 pt-1 text-center">
                      <h3
                        className={`text-[1.6rem] font-semibold leading-tight ${GREY}`}
                      >
                        {project.name}
                      </h3>
                      <p
                        className={`text-[14.5px] font-light leading-[21px] ${GREY}`}
                      >
                        {project.detail}
                      </p>
                      <p
                        className={`text-[14.5px] font-light leading-[21px] ${GREY}`}
                      >
                        {project.location}
                      </p>
                    </div>
                  </div>
                  <a
                    aria-label={`Know more about ${project.name}`}
                    className={`mt-2.5 inline-flex h-[34px] items-center rounded-full px-6 text-[16px] font-semibold transition-colors ${RED_OUTLINE}`}
                    href={project.href}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    Know More
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ═════════ BOOK YOUR SITE VISIT ═════════ */}
        <section id="visit" className="bg-[#e9e8e8]">
          <div className="mx-auto grid max-w-[1600px] items-end gap-4 lg:grid-cols-[23%_26%_51%] lg:gap-0">
            <div className="flex justify-center pt-6 lg:justify-start lg:pl-[2.7%] lg:pt-0">
              <img
                alt="A South Asian family imagining their future home together"
                className="h-[220px] w-auto max-w-full object-contain object-bottom lg:h-[236px]"
                loading="lazy"
                src={familyAsset.url}
              />
            </div>

            <div className="self-center px-5 text-center lg:pl-[4%] lg:pr-0 lg:text-left">
              <h2
                className={`text-3xl font-medium leading-[1.4] lg:text-[40px] ${NAVY}`}
              >
                Book Your
                <span className="block">Site Visit Today</span>
              </h2>

              <p
                className={`mt-3 text-[13px] font-light leading-snug lg:text-[17px] ${GREY}`}
              >
                Invest in a better tomorrow
                <br />
                with T Homes
              </p>
            </div>

            <SiteVisitForm
              className="m-3 lg:my-3 lg:ml-[1%] lg:mr-[2.2%]"
              projectNames={projectNames}
            />
          </div>
        </section>

        {/* ═════════ FOOTER ═════════ */}
        <footer id="contact" className="bg-[#d3d2d2]">
          <div className="mx-auto grid max-w-[1600px] items-center gap-5 px-5 py-6 sm:px-8 md:grid-cols-[1fr_auto_1fr] lg:min-h-[145px] lg:px-[4%]">
            <a
              aria-label="T Homes Infra"
              className="flex w-fit items-center lg:pl-[3%]"
              href="#home"
            >
              <img
                alt="T Homes Infra"
                className="w-28 object-contain lg:w-[135px]"
                src={homesLogoAsset.url}
              />
            </a>

            <div className="flex flex-col items-center gap-1.5 text-center">
              <nav
                aria-label="Footer navigation"
                className="flex flex-wrap justify-center gap-x-[17px] gap-y-1"
              >
                {navLinks.map(([label, href]) => (
                  <a
                    className={`text-[15px] font-semibold transition-colors hover:text-[#2f3692] lg:text-[21px] ${GREY}`}
                    href={href}
                    key={label}
                  >
                    {label}
                  </a>
                ))}
              </nav>
              <p className={`text-[10px] font-semibold lg:text-[11px] ${GREY}`}>
                © 2026 T Homes Infra, All Rights Reserved.
              </p>
              <a
                className={`text-[15px] font-semibold lg:text-[19px] ${GREY}`}
                href="tel:+918602860256"
              >
                Call: 8602 8602 56
              </a>
            </div>

            <div
              className="flex items-center gap-4 md:justify-end"
              aria-label="Social media"
            >
              {[
                {
                  label: "Facebook",
                  href: "https://www.facebook.com/THomesInfra.official/",
                  path: "M13.5 21v-7.5H16l.5-3h-3V8.6c0-.9.3-1.5 1.6-1.5h1.5V4.4c-.3 0-1.2-.1-2.2-.1-2.3 0-3.9 1.4-3.9 4v2.2H8v3h2.5V21h3z",
                },
                {
                  label: "Instagram",
                  href: "https://www.instagram.com/thomes_infra/",
                  path: "M8 4h8a4 4 0 0 1 4 4v8a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4V8a4 4 0 0 1 4-4zm4 4.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7zm4.3-1.3a.9.9 0 1 0 0 1.8.9.9 0 0 0 0-1.8z",
                },
                {
                  label: "YouTube",
                  href: "https://www.youtube.com/@THOMESINFRAPRIVATELIMITED",
                  path: "M10 9l5 3-5 3V9zM4 12c0-2.6.2-4 .6-4.6.4-.6 1-.9 2-1C8 6.2 10 6 12 6s4 .2 5.4.4c1 .1 1.6.4 2 1 .4.6.6 2 .6 4.6s-.2 4-.6 4.6c-.4.6-1 .9-2 1-1.4.2-3.4.4-5.4.4s-4-.2-5.4-.4c-1-.1-1.6-.4-2-1C4.2 16 4 14.6 4 12z",
                },
              ].map(({ label, href, path }) => (
                <a
                  aria-label={label}
                  className="flex size-5 items-center justify-center rounded-full bg-[#4f4c4d] text-[#d3d2d2] transition-colors hover:bg-[#2f3692]"
                  href={href}
                  key={label}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <svg
                    aria-hidden="true"
                    className="size-3.5"
                    fill="currentColor"
                    fillRule="evenodd"
                    viewBox="0 0 24 24"
                  >
                    <path d={path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </footer>
      </main>
      <DialogTrigger asChild>
        {
          <Button
            className={`fixed bottom-5 right-5 z-40 h-12 rounded-full px-6 text-base font-semibold shadow-lg ${RED_BTN}`}
            type="button"
          >
            Book a Site Visit
          </Button>
        }
      </DialogTrigger>
      <DialogContent className="max-h-[90dvh] w-[calc(100%-2rem)] max-w-2xl overflow-y-auto border-0 bg-[#e9e8e8] p-6 sm:rounded-[32px] sm:p-8">
        <DialogHeader>
          <DialogTitle className={`text-2xl font-semibold ${NAVY}`}>
            Book Your Site Visit
          </DialogTitle>
        </DialogHeader>
        <SiteVisitForm
          className="grid grid-cols-1 gap-x-[30px] gap-y-3 rounded-[28px] bg-[#d3d2d2] p-5 sm:grid-cols-2 sm:p-6"
          onSubmit={() => setSubmitted(true)}
          projectNames={projectNames}
        />
      </DialogContent>
    </Dialog>
  );
}

export default Index;
