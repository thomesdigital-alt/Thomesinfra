"use client";
import type { MouseEvent } from 'react'
import React, { useEffect, useState } from "react";
import ContactSection from "./contactsession";
import { Download } from 'lucide-react';
import HeroCarousel from './herocarousel';
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
  
  
const amenities = [
  ["15,000 Sq. ft. Clubhouse", "Swimming Pool and Deck", "Indoor Gym Sauna.", "Cricketing Net"],
  ["Squash Court", "Basket Ball Court", "Children's Play Zone", "Relaxation Park for Elders"],
  ["Meeting Rooms", "Banquet Hall", "Yoga Studio", "Reading Room"],
];


// ── Replace with your actual image URLs ──
const slideshowImages = [
  { src: "https://thomestowers.com/wp-content/uploads/2026/03/10-pool-scaled.png", alt: "Swimming Pool" },
  { src: "https://thomestowers.com/wp-content/uploads/2026/03/Swimming-Pool-scaled.jpg", alt: "Clubhouse" },
  { src: "https://thomestowers.com/wp-content/uploads/2026/03/14-children-scaled.jpg", alt: "Garden View" },
  { src: "https://thomestowers.com/wp-content/uploads/2026/03/11-bq-h.jpg", alt: "Lobby" },
];

const smallPhotos = [
  { src: "https://thomestowers.com/wp-content/uploads/2026/03/Swimming-Pool-scaled.jpg", alt: "Pool Deck" },
  { src: "https://thomestowers.com/wp-content/uploads/2026/03/JT-6.png", alt: "Gym" },
  { src: "https://thomestowers.com/wp-content/uploads/2026/03/14-children-scaled.jpg", alt: "Lounge" },
  { src: "https://thomestowers.com/wp-content/uploads/2026/03/11-bq-h.jpg", alt: "Banquet Hall" },
  { src: "https://thomestowers.com/wp-content/uploads/2026/03/4-totlot.png", alt: "Garden" },
  { src: "https://thomestowers.com/wp-content/uploads/2026/03/6-oat.png", alt: "Exterior" },
];

 

  const triggerSlide = (getNext: (prev: number) => number) => {
    setAnimating(true);
    setTimeout(() => {
      setCurrent((prev) => getNext(prev));
      setAnimating(false);
    }, 350);
  };

  const goTo = (index: number) => {
    if (index === current) return;
    triggerSlide(() => index);
  };

 const [scrolled, setScrolled] = React.useState(false);
 const [menuOpen, setMenuOpen] = React.useState(false);
 const [toast,    setToast]    = React.useState(false);
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
 const LOGO  = "https://thomestowers.com/wp-content/uploads/2026/03/T-Homes-Logo-1.png";
     const [index, setIndex] = useState(0);

  useEffect(() => {
  const i = setInterval(() => {
    setIndex((prev) => (prev === 2 ? 0 : prev + 1));
  }, 3000);
  return () => clearInterval(i);
}, []);

const NAVY  = "#1a2e5a";

 React.useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 350);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  
  useEffect(() => {
    const timer = setInterval(() => {
      triggerSlide((prev) => (prev + 1) % slideshowImages.length);
    }, 3500);
    return () => clearInterval(timer);
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
    backdropFilter: scrolled ? "blur(10px)" : "none",
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
      padding: "10px 12px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    }}
  >
    {/* LOGO */}
    <img
      src={LOGO}
      alt="T Homes Infra"
      style={{ height:scrolled?70 :100, objectFit: "contain" }}
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
 <HeroCarousel />
<section id='contact'>
  <ContactSection  />
</section>

 <section className="w-full bg-[#0B3A75] text-white overflow-hidden">
  <div className="w-full flex flex-col lg:flex-row items-stretch py-10">

    {/* LEFT - SVG */}
    <div className="w-full lg:w-1/2 flex items-end">
      <img
        src="/mokilabuilding.svg"
        alt="Building"
        className="w-auto h-100 max-w-none object-contain"
      />
    </div>

    {/* RIGHT - CONTENT */}
    <div className="w-full lg:w-1/2.5 flex flex-col justify-start py-10 lg:py-16 ">

      {/* TITLE */}
      <h2 className="text-3xl md:text-4xl lg:text-[42px] font-medium leading-tight">
        XXL in Scale
      </h2>

      {/* DESCRIPTION */}
      <p className="text-white/100 text-sm md:text-base leading-relaxed ">
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
                        
                      }}
                    >
                      {/* Heading */}
                      <h2
                        style={{
                          fontSize: "clamp(2.6rem, 3vw, 3.2rem)",
                          fontWeight: 400,
                          color: "#a09a91",
                          marginBottom: "16px",
                          letterSpacing: "0.02em",
                          fontFamily: "'Georgia', 'Times New Roman', serif"
                        }}
                      >
                        XXL Connectivity
                      </h2>
                
                      {/* Subtext */}
                      <p
                        style={{
                          fontSize: "25px",
                          color: "#000000",
                          fontWeight: 500,
                          lineHeight: "2",
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
                    gap: "3px 2px",
                    maxWidth: "98%",
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
          
         
          overflow: "hidden",
        }}
       >
          <div >
            <h2
                       style={{
                          fontSize: "clamp(2.6rem, 3vw, 3.2rem)",
                          fontWeight: 400,
                          color: "#a09a91",
                          
                          letterSpacing: "0.02em",
                          fontFamily: "'Georgia', 'Times New Roman', serif",
                          padding: "1px 48px ",
                        }}
                      >
              Assured XXL Living 
            </h2>
          </div>
    
          {/* Hero Image */}
         <div style={{ width: "100%", overflow: "hidden", position: "relative" }}>

  {/* Slides */}
  <div
    style={{
      display: "flex",
      transform: `translateX(-${index * 100}%)`,
      transition: "transform 0.5s ease",
      height: "100%"
    }}
  >
    <img
      src="https://thomestowers.com/wp-content/uploads/2026/03/B1-scaled.png"
      style={{
        width: "100%",
        height: "420px",
        objectFit: "cover",
        flexShrink: 0
      }}
    />
    <img
      src="https://thomestowers.com/wp-content/uploads/2026/03/Dining-to-Entrance-1-scaled.png"
      style={{
        width: "100%",
        height: "420px",
        objectFit: "cover",
        flexShrink: 0
      }}
    />
    <img
      src="https://thomestowers.com/wp-content/uploads/2026/03/Drawing-scaled.png"
      style={{
        width: "100%",
        height: "420px",
        objectFit: "cover",
        flexShrink: 0
      }}
    />
  </div>

  {/* Dots */}
  <div
    style={{
      position: "absolute",
      bottom: 10,
      left: "50%",
      transform: "translateX(-50%)",
      display: "flex",
      gap: 8,
    }}
  >
    {[0,1,2].map((i) => (
      <div
        key={i}
        onClick={() => setIndex(i)}
        style={{
          width: 10,
          height: 10,
          borderRadius: "50%",
          background: index === i ? "#fff" : "rgba(255,255,255,0.5)",
          cursor: "pointer",
        }}
      />
    ))}
  </div>

</div>
          {/* Description */}
          <div style={{justifyContent:"center", marginLeft:"10%",marginRight:"12%", padding:"20px 20px" }}>
            <p
              style={{
                fontSize: "20px",
                color: "#000000",
                fontWeight: 400,
                lineHeight: "2",
                
               
                
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
              marginLeft:"12%",marginRight:"12%",
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
                "https://thomestowers.com/wp-content/uploads/2026/03/Reception-scaled.png",
                 "https://thomestowers.com/wp-content/uploads/2026/03/Luxury-master-Bedroom-scaled.png",
                  "https://thomestowers.com/wp-content/uploads/2026/03/Beautiful-balcony.jpeg", 
                  "https://thomestowers.com/wp-content/uploads/2026/03/1-E-scaled.png"
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
                    src={`${label}`}
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
                marginRight:"13%",
                display: "flex",
                flexDirection: "column",
                marginTop:"3px"
              }}
            >
              {[
                "1837 to 2713 sft",
                "10 ft.\nwide corridors",
               
                "East, West, & North\n Orientations",
              ].map((spec, i) => (
                <div
                  key={i}
                  style={{
                    padding: "15px 0",
                    borderBottom: i < 3 ? "1px solid #ccc8c0" : "none",
                    backgroundColor:"#8f8f8f",
                    textAlign: "center",
                    marginBottom:"4px",
                 
                    
                  }}
                >
                  <p
                    style={{
                      margin: 0,
                      fontSize: "25px",
                      color: "#000000",
                      lineHeight: "2",
                      fontWeight:500,
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
              gap: "8px",
              marginLeft:"7%",
              marginRight:"10%",

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
                  backgroundColor: "#5aba2e",
                  color: "#000000",
                  textAlign: "center",
                  padding: "14px 20px",
                  fontSize: "25px",
                  fontWeight: 600,
                  lineHeight: "1.4",
                  whiteSpace: "pre-line",
                  borderRight: i < 2 ? "1px solid #5aba2e" : "none",
      
                  marginRight:"8px"
                }}
              >
                {label}
              </div>
            ))}
          </div>
    </section>

  <section id="amenities" className="amenities-section" style={{marginTop:"10px"}}>
      {/* ── Green card ── */}
      <div className="amenities-card">
        <h2 className="amenities-title">XXL Amenities</h2>
        <p className="amenities-desc">
          Community forms differently when space supports it. J Cosmopolis comes with a host of
          amenities intended for celebrations and social interactions.
        </p>

        <div className="amenities-grid">
          {amenities.map((col, ci) => (
            <ul key={ci} className="amenities-list">
              {col.map((item, ii) => (
                <li key={ii} className="amenities-item">
                  <span className="amenities-dot" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>

      {/* ── Photo grid ── */}
      <div className="photo-grid" style={{marginTop:"10px"}}>

        {/* LEFT — Slideshow */}
        <div className="photo-large">
          <img
            src={slideshowImages[current].src}
            alt={slideshowImages[current].alt}
            className={`slide-img ${animating ? "slide-out" : "slide-in"}`}
          />

          {/* Prev / Next arrows */}
          <button
            className="slide-arrow left"
            onClick={() => goTo((current - 1 + slideshowImages.length) % slideshowImages.length)}
            aria-label="Previous"
          >
            ‹
          </button>
          <button
            className="slide-arrow right"
            onClick={() => goTo((current + 1) % slideshowImages.length)}
            aria-label="Next"
          >
            ›
          </button>

          {/* Dot indicators */}
          <div className="slide-dots">
            {slideshowImages.map((_, i) => (
              <button
                key={i}
                className={`slide-dot ${i === current ? "active" : ""}`}
                onClick={() => goTo(i)}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* RIGHT — Static 2×3 small grid */}
        <div className="photo-small-grid">
          {smallPhotos.map((p, i) => (
            <div key={i} className="photo-small">
              <img src={p.src} alt={p.alt} />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .amenities-section {
          
          width: 100%;
          overflow: hidden;
          background-color:#5aba2e
        }

        /* ── Green card ── */
        .amenities-card {
          background-color: #5aba2e;
          padding: 48px 56px 52px;
        }

        .amenities-title {
          color: #ffffff;
          font-size: clamp(2rem, 4vw, 2.75rem);
          font-weight: 700;
          margin: 0 0 14px;
          letter-spacing: -0.5px;
        }

        .amenities-desc {
          color: #ffffff;
          font-size:20px;
          line-height: 1.65;
          margin: 0 0 36px;
         
        }

        .amenities-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 8px 24px;
          marginleft: 35%
        }

        .amenities-list {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .amenities-item {
          display: flex;
          align-items: center;
          gap: 10px;
          color: #ffffff;
          font-size: clamp(0.88rem, 1.4vw, 1rem);
          font-weight: 500;
        }

        .amenities-dot {
          flex-shrink: 0;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: #ffffff;
        }

        /* ── Photo grid layout ── */
        .photo-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          height: 380px;
          background-color:#5aba2e
        }

        /* ── Slideshow (left panel) ── */
        .photo-large {
          position: relative;
          height: 100%;
          overflow: hidden;
          background: #1a1a1a;
        }

        .slide-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          position: absolute;
          inset: 0;
          transition: opacity 0.35s ease, transform 0.35s ease;
        }

        .slide-img.slide-in {
          opacity: 1;
          transform: scale(1);
        }

        .slide-img.slide-out {
          opacity: 0;
          transform: scale(1.04);
        }

        /* Arrows */
        .slide-arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(0, 0, 0, 0.38);
          color: #fff;
          border: none;
          font-size: 2.2rem;
          line-height: 1;
          width: 38px;
          height: 56px;
          cursor: pointer;
          z-index: 3;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 4px;
          transition: background 0.2s;
        }
        .slide-arrow:hover { background: rgba(0, 0, 0, 0.65); }
        .slide-arrow.left  { left: 10px; }
        .slide-arrow.right { right: 10px; }

        /* Dots */
        .slide-dots {
          position: absolute;
          bottom: 13px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 8px;
          z-index: 3;
        }

        .slide-dot {
          width: 9px;
          height: 9px;
          border-radius: 50%;
          border: 2px solid rgba(255,255,255,0.85);
          background: transparent;
          cursor: pointer;
          padding: 0;
          transition: background 0.25s, border-color 0.25s;
        }

        .slide-dot.active {
          background: #5aba2e;
          border-color: #5aba2e;
        }

        /* ── Small grid (right panel) ── */
        .photo-small-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          grid-template-rows: repeat(2, 1fr);
          gap: 3px;
        }

        .photo-small {
          overflow: hidden;
        }

        .photo-small img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.4s ease;
        }

        .photo-small:hover img {
          transform: scale(1.07);
        }

        /* ── Responsive ── */
        @media (max-width: 1000px) {
          .amenities-card { padding: 36px 32px 40px; }
          .amenities-grid { grid-template-columns: repeat(2, 1fr); }
          .photo-grid { grid-template-columns: 1fr; height: auto; }
          .photo-large { height: 280px; }
          .photo-small-grid {
            grid-template-columns: repeat(3, 1fr);
            grid-template-rows: repeat(2, 140px);
          }
        }

        @media (max-width: 600px) {
          .amenities-card { padding: 28px 20px 32px; }
          .amenities-grid { grid-template-columns: 1fr; gap: 6px; }
          .photo-large { height: 230px; }
          .photo-small-grid {
            grid-template-columns: repeat(2, 1fr);
            grid-template-rows: repeat(3, 120px);
          }
        }
      `}</style>
    </section>
     <section
                      style={{
                        
                        padding: "60px 48px",
                        
                      }}
                    >
                      {/* Heading */}
                      <h2
                        style={{
                          fontSize: "clamp(2.6rem, 3vw, 3.2rem)",
                          fontWeight: 400,
                          color: "#a09a91",
                          marginBottom: "16px",
                          letterSpacing: "0.02em",
                          fontFamily: "'Georgia', 'Times New Roman', serif"
                        }}
                      >
                        XXL Assurance
                      </h2>
                
                      {/* Subtext */}
                      <p
                        style={{
                          fontSize: "25px",
                          color: "#000000",
                          fontWeight: 500,
                          lineHeight: "2",
                          marginBottom: "48px",
                        }}
                      >
                       Built with intent and promoted with discipline, 
                       T Homes Infra brings a considered understanding of land value and delivery integrity. 
                       J Cosmopolis too, comes with the promise where execution sustains design.    </p>
                
                   <div
  style={{
    display: "flex",
    
    width: "100%",
    flexWrap: "wrap",
  }}
>
 <div
  style={{
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
   
    width: "100%",
    minHeight: "420px",
    overflow: "hidden",
    position: "relative",
  }}
>
  {/* LEFT — Logo */}
  <div
    style={{
      flex: "0 0 35%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "40px",
      zIndex: 2,
    }}
  >
    <img
      src="https://thomestowers.com/wp-content/uploads/2026/03/T-Homes-Logo-1.png"
      alt="T Homes Infra Logo"
      style={{
        width: "100%",
        
        height: "auto",
        display: "block",
        objectFit: "contain",
      }}
    />
  </div>

  {/* RIGHT — Building image, larger, bottom-anchored */}
  <div
    style={{
      flex: "0 0 65%",
      display: "flex",
      alignItems: "flex-end",
      justifyContent: "center",
      height: "420px",
      overflow: "hidden",
      position: "relative",
    }}
  >
    <img
      src="https://thomestowers.com/wp-content/uploads/2026/03/Bitmap.png"
      alt="T Homes Tower"
      style={{
        width: "110%",
        height: "110%",
        objectFit: "cover",
        objectPosition: "center bottom",
        display: "block",
      }}
    />
  </div>
</div>
</div>
           </section>
          <section
  id="location"
  style={{
    padding: "60px 48px",
  }}
>
  <h2
    style={{
      fontSize: "clamp(2.6rem, 3vw, 3.2rem)",
      fontWeight: 400,
      color: "#a09a91",
      marginBottom: "40px",
      letterSpacing: "0.02em",
      fontFamily: "'Georgia', 'Times New Roman', serif",
    }}
  >
    Location
  </h2>

  <div
    style={{
      display: "flex",
      width: "100%",
      flexWrap: "wrap",
      gap: "40px",
      alignItems: "flex-start",
    }}
  >
    {/* Map Embed */}
    <div
      style={{
        flex: "1 1 560px",
        borderRadius: "4px",
        overflow: "hidden",
        boxShadow: "0 4px 24px rgba(0,0,0,0.10)",
      }}
    >
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d574.0909822486276!2d78.18441366052954!3d17.42987066422412!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcbef3cc0bb0f23%3A0x6dbce314c78d81b!2sT%20HOMES%20-%20Jumeirah%20Towers%20by%20DNB%20Constructions!5e0!3m2!1sen!2sin!4v1774256026970!5m2!1sen!2sin"
        width="100%"
        height="450"
        style={{ border: 0, display: "block" }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>

    {/* Location Info */}
    <div
      style={{
        flex: "1 1 260px",
        display: "flex",
        flexDirection: "column",
        gap: "24px",
        paddingTop: "8px",
      }}
    >
      <div>
        <p
          style={{
            fontSize: "11px",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "#a09a91",
            margin: "0 0 8px 0",
            fontFamily: "'Calibri', 'Arial', sans-serif",
          }}
        >
          Project
        </p>
        <p
          style={{
            fontSize: "18px",
            fontWeight: 600,
            color: "#2c2c2c",
            margin: 0,
            fontFamily: "'Georgia', 'Times New Roman', serif",
            lineHeight: 1.4,
          }}
        >
          T HOMES – Jumeirah Towers
        </p>
        <p
          style={{
            fontSize: "13px",
            color: "#777",
            margin: "4px 0 0 0",
            fontFamily: "'Calibri', 'Arial', sans-serif",
          }}
        >
          by DNB Constructions
        </p>
      </div>

      <div
        style={{
          width: "40px",
          height: "1px",
          background: "#a09a91",
          opacity: 0.5,
        }}
      />

      <div>
        <p
          style={{
            fontSize: "11px",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "#a09a91",
            margin: "0 0 8px 0",
            fontFamily: "'Calibri', 'Arial', sans-serif",
          }}
        >
          Address
        </p>
        <p
          style={{
            fontSize: "14px",
            color: "#444",
            margin: 0,
            fontFamily: "'Calibri', 'Arial', sans-serif",
            lineHeight: 1.7,
          }}
        >
          Jumeirah Towers,<br />
          Hyderabad, Telangana,<br />
          India
        </p>
      </div>

      <div
        style={{
          width: "40px",
          height: "1px",
          background: "#a09a91",
          opacity: 0.5,
        }}
      />

      <a
        href="https://maps.google.com/?q=T+HOMES+Jumeirah+Towers+DNB+Constructions"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: "inline-block",
          padding: "12px 24px",
          border: "1px solid #a09a91",
          color: "#a09a91",
          fontSize: "12px",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          textDecoration: "none",
          fontFamily: "'Calibri', 'Arial', sans-serif",
          transition: "all 0.2s ease",
          width: "fit-content",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "#a09a91";
          e.currentTarget.style.color = "#fff";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "transparent";
          e.currentTarget.style.color = "#a09a91";
        }}
      >
        Get Directions →
      </a>
    </div>
  </div>
</section>
  
    <footer
      style={{
          borderTop: "4px solid #6d6d6d",
          paddingLeft: "40px",
          paddingRight:"50px",
          paddingBottom: "20px",
          

      }}
    >
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "24px",
        }}
      >
        {/* HMDA Logo + Registration */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start",}}>
          <img
            src="https://thomestowers.com/wp-content/uploads/2026/03/HMDA_logo1-removebg-preview.png"
            alt="HMDA Logo"
            style={{ height: "85px", objectFit: "contain" }}
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                "https://thomestowers.com/wp-content/uploads/2026/03/HMDA_logo1.jpg"
            }}
          />
          <p
            style={{
              fontSize: "13px",
              color: "#333",
              letterSpacing: "0.01em",
            }}
          >
            055194/SKP/R1/U6/HMDA/14062022 and
          </p>
        </div>

        {/* TG RERA Logo + Number */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop:"-40px"}}>
          <img
            src="https://thomestowers.com/wp-content/uploads/2026/03/1923609-10-removebg-preview.png"
            alt="TG RERA Logo"
            style={{ height: "180px", objectFit: "contain" }}
          />
          <p
            style={{
              fontSize: "13px",
              color: "#333",
              letterSpacing: "0.01em",
              marginTop:"-50px"
            }}
          >
            P02400005975
          </p>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", }} >
         
          <p
            style={{
              fontSize: "13px",
              color: "#555",
              textAlign: "center",
              
            }}
          >
            Consultant Architect
          </p>
        </div>

        {/* Landscaping Partner */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
         
          <p
            style={{
              fontSize: "13px",
              color: "#555",
              textAlign: "center",
            }}
          >
            Landscapping Partner
          </p>
        </div>

        {/* Playarea Design by Pool */}
        <div style={{ display: "flex", flexDirection: "column" }}>
         
          <p
            style={{
              fontSize: "13px",
              color: "#555",
              textAlign: "center",
            }}
          >
            Playarea Design by Pool
          </p>
        </div>
      </div>
    </footer>
 <a
        href="/brochure.pdf" // 👉 replace with your file link
        download
        className={`group fixed bottom-6 right-6 z-50 transition-all duration-500 
          ${scrolled ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"}`}
      >
        <div className="flex items-center gap-2 px-4 py-3 rounded-full  text-black font-semibold shadow-lg transition-all duration-300
                        animate-bounce hover:animate-none hover:shadow-[0_0_20px_rgba(255,215,0,0.9)]"
                        style={{
                                      backgroundColor: "#C08552",
                        }}>
          
          {/* Icon */}
          <Download
            className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-2"
          />

          {/* Text (hidden → visible on hover) */}
          <span className="max-w-0 overflow-hidden whitespace-nowrap transition-all duration-300 group-hover:max-w-xs">
            Download Brochure
          </span>
        </div>
      </a>


 
</div>
   );
}