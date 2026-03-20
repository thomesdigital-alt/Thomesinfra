"use client";

import React from "react";
import ContactSection from "./contactsession";

export default function xxlpage(){
  interface FormState {
  name: string; email: string; occupation: string; code: string; phone: string;
  checks: { mokila: boolean; hyderabad: boolean; months: boolean };
}
const locations = [
  { name: "Exit 1A", time: "12 min", img: "https://placehold.co/120x120/c8b89a/ffffff?text=Exit+1A" },
  { name: "RGIA", time: "35 min", img: "https://placehold.co/120x120/c8b89a/ffffff?text=RGIA" },
  { name: "Gachibowli", time: "20 min", img: "https://placehold.co/120x120/c8b89a/ffffff?text=Gachibowli" },
  { name: "Neopolis", time: "10 min", img: "https://placehold.co/120x120/c8b89a/ffffff?text=Neopolis" },
  { name: "Gaudium School", time: "15 min", img: "https://placehold.co/120x120/c8b89a/ffffff?text=Gaudium" },
  { name: "Indus International School", time: "5 min", img: "https://placehold.co/120x120/c8b89a/ffffff?text=Indus" },
  { name: "Continental Hospital", time: "20 min", img: "https://placehold.co/120x120/c8b89a/ffffff?text=Continental" },
  { name: "ICFAI", time: "5 min", img: "https://placehold.co/120x120/c8b89a/ffffff?text=ICFAI" },
];
const navLinks: [string, string][] = [
    ["#amenities", "Amenities"],
    ["#layout",    "Layout plan"],
    ["#location",  "Location"],
    ["#contact",   "Call for site visit"],
  ];
 const [scrolled, setScrolled] = React.useState(false);
 const [menuOpen, setMenuOpen] = React.useState(false);
 const [toast,    setToast]    = React.useState(false);
 const LOGO  = "https://thomestowers.com/wp-content/uploads/2026/03/T-Homes-Logo-1.png";
   const [form, setForm] = React.useState<FormState>({
      name: "", email: "", occupation: "", code: "", phone: "",
      checks: { mokila: false, hyderabad: false, months: false },
    });
const NAVY  = "#1a2e5a";
 React.useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
   return (
   <div
  style={{
    minHeight: "100vh",
    backgroundImage: `
      url('https://thomestowers.com/wp-content/uploads/2026/03/background-1-scaled.png')
    `,
    backgroundSize: "cover",
    backgroundPosition: "center",
    zIndex:0
  }}
>
      <header
  className="navbar"
  style={{
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 200,
    backdropFilter: scrolled ? "blur(30px)" : "none",
    boxShadow: scrolled ? "0 2px 14px rgba(0,0,0,.08)" : "none",
    transition: "all .3s",
    background: scrolled ? "rgba(232,229,223,0.85)" : "transparent",
  }}
>
  {/* INNER CONTAINER (IMPORTANT) */}
  <div
    style={{
      maxWidth: "1200px",
      margin: "0 auto",
      padding: "12px 24px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    }}
  >
    {/* LOGO */}
    <img
      src={LOGO}
      alt="T Homes Infra"
      style={{ height: 100, objectFit: "contain" }}
    />
  <div style={{ display: "flex", alignItems: "center", marginLeft: "auto" }}>
    {/* NAV */}
    <nav style={{ display: "flex", gap: "28px" }}>
      {navLinks.map(([h, l]) => (
        <a
          key={h}
          href={h}
          style={{
            fontSize: 14,
            color: "#444",
            fontWeight: 500,
            letterSpacing: ".02em",
            transition: "color .2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = NAVY)}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#444")}
        >
          {l}
        </a>
      ))}
    </nav>

    {/* HAMBURGER */}
   
    </div>
  </div>
</header>
<section className="hero" style={{
  height: '100vh',
  overflow: 'hidden',
  zIndex:1
}}>
 <div
  className="Imagebuilding"
  style={{
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflow:'hidden',
    height: "100vh",
    zIndex:2
  }}
 >
  <img
    src="https://thomestowers.com/wp-content/uploads/2026/03/Image_-1.png"
    alt="building"
    style={{
       height:"50vh",
    width:"auto",
    objectFit:"fill",
    }}
  />
  
</div>
{/* <div className="XXLimage" 
 style={{
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflow:'hidden',
    marginTop:"-65vh",
    marginLeft:"-38vh",
    height: "70vh",
    zIndex:5
  }}>
  <img 
  src="https://thomestowers.com/wp-content/uploads/2026/03/Path_-_Path_-_Compound-Path_-_Path_-_Compound-Path_-_Path_-_Path_-_Path_-_Path_-_Path_-_Path_-_Path_-_Path_-_Path_-_Path_-_Path_-2.png"
  alt="xxl Living"
  style={{
    height:"30vh",
    width:"auto"
  }}
  >

  </img>
  <div className="right-text">
    
  </div>
 </div> */}
<div
  style={{
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    height: "100vh",
    padding: "0 5vw",
    marginTop:"-83vh",
    marginLeft:"47vh",
  }}
>
  {/* LEFT SIDE - IMAGE */}
  <div
    style={{
      flex: 1,
      display: "flex",
      justifyContent: "center",
    }}
  >
    <img
      src="https://thomestowers.com/wp-content/uploads/2026/03/Path_-_Path_-_Compound-Path_-_Path_-_Compound-Path_-_Path_-_Path_-_Path_-_Path_-_Path_-_Path_-_Path_-_Path_-_Path_-_Path_-_Path_-2.png"
      alt="XXL Living"
      style={{
        width: "auto",
        height:"26vh"
      }}
    />
  </div>

  {/* RIGHT SIDE - TEXT */}
  <div
    style={{
      flex: 1,
      textAlign: "right",
      paddingLeft: "20px",
      marginRight:"5vh",
      marginTop:"20vh"
    }}
  >
  <h1
  style={{
    margin: 0,
    fontFamily: "Montserrat, sans-serif",
    fontWeight: 500, // slightly lighter = premium feel
    fontSize: "clamp(1.8rem, 3.8vw, 3.4rem)", // smoother scaling
    lineHeight: 1.1,
    color: "#8f8f8f", // softer than #aaa (more elegant)
    textTransform: "uppercase",
    // letterSpacing: "0.09em",
    marginBottom:'1px'
  }}
>
  WELCOME TO
</h1>
    <h1  style={{
    margin: 0,
    fontFamily: "Montserrat, sans-serif",
    fontWeight: 500, // slightly lighter = premium feel
    fontSize: "clamp(2rem, 4vw, 3.6rem)", // smoother scaling
    lineHeight: 1.5,
    color: "#8f8f8f", // softer than #aaa (more elegant)
    textTransform: "uppercase",
    letterSpacing: "0.02em",
    marginLeft:"-5vh"
  }}>
      J COSMOPOLIS.
    </h1>
    <p style={{
    margin: 0,
    fontFamily: "Montserrat, sans-serif",
    fontWeight: 500,// slightly lighter = premium feel
  fontSize: "clamp(1.5rem, 3.5vw, 3.0rem)", // smoother scaling
    lineHeight: 1.5,
    color: "#8f8f8f", // softer than #aaa (more elegant)
    textTransform: "uppercase",
    letterSpacing: "0.041em",
    marginLeft:"-70vh"
  }}>
      SIGN UP TO YOUR XXL LIFE.
    </p>
  </div>
</div>

</section>
<ContactSection />
 <section className="w-full bg-[#0B3A75] text-white overflow-hidden">
  <div className="w-full flex flex-col lg:flex-row items-stretch">

    {/* LEFT - SVG */}
    <div className="w-full lg:w-1/2 flex items-end">
      <img
        src="/mokilabuilding.svg"
        alt="Building"
        className="w-full h-full max-w-none object-contain"
      />
    </div>

    {/* RIGHT - CONTENT */}
    <div className="w-full lg:w-1/2 flex flex-col justify-center px-6 lg:px-10 py-10 lg:py-16">

      {/* TITLE */}
      <h2 className="text-3xl md:text-4xl lg:text-[42px] font-medium leading-tight mb-4">
        XXL in Scale
      </h2>

      {/* DESCRIPTION */}
      <p className="text-white/80 text-sm md:text-base leading-relaxed max-w-xl mb-8">
        From the very first sight, J Cosmopolis stands tall with composure,
        drawing admiration to its unmissable neo-modern curved edges.
        Register openness as you walk through a pergola-framed entry.
        The reception lobby’s double height ceiling establishes grandness
        without announcing it. With scale and space defining its presence,
        the singular tower spells exclusivity in an extra-large format.
      </p>

      {/* STATS */}
      <div className="flex flex-wrap items-center gap-6 md:gap-10">

        {[
          { value: "1.93", label: "Acres" },
          { value: "68%", label: "Open Space" },
          { value: "3 BHK", label: "Community" },
          { value: "17", label: "Levels" },
          { value: "159", label: "Units" },
        ].map((item, index) => (
          <div key={index} className="flex items-center gap-6">

            <div>
              <p className="text-[#E6E600] text-xl md:text-2xl font-semibold">
                {item.value}
              </p>
              <p className="text-[#E6E600] text-xs md:text-sm tracking-wide">
                {item.label}
              </p>
            </div>

            {index !== 4 && (
              <div className="hidden md:block w-px h-10 bg-white/30" />
            )}
          </div>
        ))}

      </div>
    </div>
  </div>
</section>
            <section
                      style={{
                        
                        padding: "60px 48px",
                        fontFamily: "'Georgia', 'Times New Roman', serif",
                      }}
                    >
                      {/* Heading */}
                      <h2
                        style={{
                          fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
                          fontWeight: 400,
                          color: "#a09a91",
                          marginBottom: "16px",
                          letterSpacing: "0.01em",
                        }}
                      >
                        XXL Connectivity
                      </h2>
                
                      {/* Subtext */}
                      <p
                        style={{
                          fontSize: "clamp(5 rem, 2 vw, 3.98rem)",
                          color: "#6b6b6b",
                          fontWeight: 300,
                          
                          marginRight: "30%",
                          lineHeight: "1.8",
                          marginBottom: "48px",
                        }}
                      >
                        From J Cosmopolis, everything remains with-in direct reach. Commercial corridors,
                        schools, entertainment &amp; lifestyle spaces etc., connect here with efficiency.
                      </p>
                
                      {/* Grid */}
                    <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))",
                    gap: "32px 20px",
                    maxWidth: "700px",
                    margin: "0 auto"
                  }}
                >
                  {locations.map((loc) => (
                    <div
                      key={loc.name}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "12px",
                      }}
                    >
                      {/* Circle image */}
                      <div
                        style={{
                          width: "110px",
                          height: "110px",
                          borderRadius: "50%",
                          overflow: "hidden",
                          flexShrink: 0,
                        }}
                      >
                        <img
                          src={loc.img}
                          alt={loc.name}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            display: "block",
                          }}
                        />
                      </div>
          
                      {/* Label */}
                      <div style={{ textAlign: "center" }}>
                        <p
                          style={{
                            fontSize: "0.88rem",
                            color: "#4a4a4a",
                            fontWeight: 400,
                            margin: 0,
                            lineHeight: "1.4",
                          }}
                        >
                          {loc.name}
                        </p>
                        <p
                          style={{
                            fontSize: "0.88rem",
                            color: "#4a4a4a",
                            fontWeight: 400,
                            margin: 0,
                            lineHeight: "1.4",
                          }}
                        >
                          {loc.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
          
                {/* Responsive styles via a style tag */}
                <style>{`
                  @media (max-width: 600px) {
                    section {
                      padding: 40px 24px !important;
                    }
                  }
                `}</style>
              </section>
      <section
         style={{
          padding: "60px 48px",
          fontFamily: "'Georgia', 'Times New Roman', serif",
          overflow: "hidden",
        }}
       >
          {/* Heading */}
          <div style={{ padding: "28px 24px 16px" }}>
            <h2
                        style={{
                          fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
                          fontWeight: 400,
                          color: "#a09a91",
                          marginBottom: "16px",
                          letterSpacing: "0.01em",
                        }}
                      >
              XXL Luxury
            </h2>
          </div>
    
          {/* Hero Image */}
          <div style={{ width: "100%", height: "clamp(200px, 45vw, 320px)", overflow: "hidden" }}>
            <img
              src="https://placehold.co/800x320/8a9ba8/ffffff?text=Interior+Hero"
              alt="Luxury Interior"
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
          </div>
    
          {/* Description */}
          <div style={{ padding: "28px 24px 20px" }}>
            <p
              style={{
                fontSize: "clamp(0.82rem, 1.4vw, 0.93rem)",
                color: "#5a5a5a",
                lineHeight: "1.75",
                margin: 0,
                maxWidth: "560px",
              }}
            >
              Experience seamless continuity and movement in your 3-bedroom configuration.
              At the entry, you get a clear visual axis of your home. Movement across feels
              intuitive and uninterrupted. The living space extends toward a broad balcony with
              multiple seating arrangements. Every space and dimension, from the living room
              to the kitchen or bedrooms, contribute to a quiet grandeur and assured XXL luxury.
            </p>
          </div>
    
          {/* Photo Grid + Specs */}
          <div
            style={{
              padding: "0 24px 32px",
              display: "flex",
              gap: "20px",
              alignItems: "flex-start",
              flexWrap: "wrap",
            }}
          >
            {/* 2x2 Photo Grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "4px",
                flex: "0 0 auto",
                width: "clamp(200px, 52%, 350px)",
              }}
            >
              {[
                "Room+1", "Room+2", "Room+3", "Room+4"
              ].map((label, i) => (
                <div
                  key={i}
                  style={{
                    width: "100%",
                    aspectRatio: "1 / 1",
                    overflow: "hidden",
                  }}
                >
                  <img
                    src={`https://placehold.co/160x160/8a9ba8/ffffff?text=${label}`}
                    alt={`Interior ${i + 1}`}
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                  />
                </div>
              ))}
            </div>
    
            {/* Specs List */}
            <div
              style={{
                flex: 1,
                minWidth: "160px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {[
                "1837 to 2713 sft",
                "10 ft.\nwide corridors",
                "Spacious\nbalconies",
                "East, West, & North\nfacing",
              ].map((spec, i) => (
                <div
                  key={i}
                  style={{
                    padding: "14px 0",
                    borderBottom: i < 3 ? "1px solid #ccc8c0" : "none",
                    textAlign: "center",
                  }}
                >
                  <p
                    style={{
                      margin: 0,
                      fontSize: "clamp(0.82rem, 1.5vw, 0.95rem)",
                      color: "#4a4a4a",
                      lineHeight: "1.5",
                      whiteSpace: "pre-line",
                    }}
                  >
                    {spec}
                  </p>
                </div>
              ))}
            </div>
          </div>
    
          {/* Bottom CTA Badges */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "0",
            }}
          >
            {[
              "Completion in 2027",
              "HMDA & RERA\nApproved",
              "UDS Share\n42 & 62 Sq yards",
            ].map((label, i) => (
              <div
                key={i}
                style={{
                  flex: "1 1 100px",
                  backgroundColor: "#7ab648",
                  color: "#ffffff",
                  textAlign: "center",
                  padding: "16px 10px",
                  fontSize: "clamp(0.78rem, 1.4vw, 0.9rem)",
                  fontWeight: 600,
                  lineHeight: "1.4",
                  whiteSpace: "pre-line",
                  borderRight: i < 2 ? "1px solid #6aa03a" : "none",
                  fontFamily: "'Georgia', serif",
                }}
              >
                {label}
              </div>
            ))}
          </div>
    </section>

</div>
   );
}