"use client";
import type { MouseEvent } from "react";
import React, { useEffect, useState } from "react";
import ContactSection from "./contactsession";
import { Download } from "lucide-react";
import HeroCarousel from "./herocarousel";

export default function xxlpage() {
  const locations = [
    {
      name: "Exit 1A",
      time: "12 mins",
      img: "https://thomestowers.com/wp-content/uploads/2026/03/Kokapet-Exit.webp",
    },
    {
      name: "RGIA",
      time: "35 mins",
      img: "https://curlytales.com/wp-content/uploads/2025/03/direct-international-flights-from-hyderabad-image-2.jpg",
    },
    {
      name: "Gachibowli",
      time: "20 mins",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/GachibowliSkyLine.jpg/1280px-GachibowliSkyLine.jpg",
    },
    {
      name: "Neopolis",
      time: "10 mins",
      img: "data:image/jpeg;base64,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",
    },
    {
      name: "Gaudium School",
      time: "15 mins",
      img: "https://www.thegaudium.com/wp-content/uploads/2023/05/The_Gaudium_International_School_Hyderabad_Gallery_2023_05-69.jpg",
    },
    {
      name: "Indus International School",
      time: "5 mins",
      img: "https://indushyd.wordpress.com/wp-content/uploads/2010/10/12.jpg",
    },
    {
      name: "Continental Hospital",
      time: "20 mins",
      img: "https://continentalhospitals.com/assets/international_patient/images/hospitals.jpg",
    },
    {
      name: "ICFAI",
      time: "5 mins",
      img: "https://images.jdmagicbox.com/v2/comp/hyderabad/19/040pg002719/catalogue/icfai-university-hyderabad-vidya-nagar-hyderabad-mba-college-correspondence-oxghl-250.jpg",
    },
  ];

  const navLinks: [string, string][] = [
    ["#amenities", "Amenities"],
    ["#layout", "Layout plan"],
    ["#location", "Location"],
    ["#contact", "Call for site visit"],
  ];

  const amenities = [
    [
      "15,000 Sq. ft. Clubhouse",
      "Swimming Pool and Deck",
      "Indoor Gym Sauna",
      "Cricketing Net",
    ],
    [
      "Wellness",
      "Basket Ball Court",
      "Children's Play Zone",
      "Relaxation Park for Elders",
    ],
    ["Meeting Rooms", "Banquet Hall", "Yoga Studio", "Reading Room"],
  ];

  const slideshowImages = [
    {
      src: "https://thomestowers.com/wp-content/uploads/2026/03/10-pool-scaled-e1774351296238.png",
      alt: "Swimming Pool",
    },
    {
      src: "https://thomestowers.com/wp-content/uploads/2026/03/Swimming-Pool-scaled-e1774351375342.jpg",
      alt: "Clubhouse",
    },
    {
      src: "https://thomestowers.com/wp-content/uploads/2026/03/14-children-scaled.jpg",
      alt: "Garden View",
    },
    {
      src: "https://thomestowers.com/wp-content/uploads/2026/03/11-bq-h.jpg",
      alt: "Lobby",
    },
  ];

  const smallPhotos = [
    {
      src: "https://thomestowers.com/wp-content/uploads/2026/03/Swimming-Pool-scaled-e1774351375342.jpg",
      alt: "Pool Deck",
    },
    {
      src: "https://thomestowers.com/wp-content/uploads/2026/03/JT-6.png",
      alt: "Gym",
    },
    {
      src: "https://thomestowers.com/wp-content/uploads/2026/03/14-children-scaled.jpg",
      alt: "Lounge",
    },
    {
      src: "https://thomestowers.com/wp-content/uploads/2026/03/11-bq-h.jpg",
      alt: "Banquet Hall",
    },
    {
      src: "https://thomestowers.com/wp-content/uploads/2026/03/4-totlot.png",
      alt: "Garden",
    },
    {
      src: "https://thomestowers.com/wp-content/uploads/2026/03/6-oat.png",
      alt: "Exterior",
    },
  ];

  const triggerSlide = (getNext: (prev: number) => number) => {
    setAnimating(true);
    setTimeout(() => {
      setCurrent((prev) => getNext(prev));
      setAnimating(false);
    }, 550);
  };

  const goTo = (index: number) => {
    if (index === current) return;
    triggerSlide(() => index);
  };

  const [scrolled, setScrolled] = React.useState(false);
  // ── ADDED: track whether hero slide is active ──
  const [heroActive, setHeroActive] = React.useState(true);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [toast, setToast] = React.useState(false);
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const LOGO =
    "https://thomestowers.com/wp-content/uploads/2026/03/T-Homes-Logo-1.png";
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const i = setInterval(() => {
      setIndex((prev) => (prev === 2 ? 0 : prev + 1));
    }, 10000);
    return () => clearInterval(i);
  }, []);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const NAVY = "#1a2e5a";

  React.useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 350);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      triggerSlide((prev) => (prev + 1) % slideshowImages.length);
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div style={{ position: "relative", minHeight: "100vh" }}>
      {/* FIXED BACKGROUND LAYER */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          backgroundImage: `url('https://thomestowers.com/wp-content/uploads/2026/04/Clip-Group_-3-scaled.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          zIndex: -1,
        }}
      />

      {/* YOUR CONTENT */}
      <div>{/* all your existing content */}</div>

      <header
        style={{
          position: "relative",
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
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "10px 12px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            position: "relative",
          }}
        >
          {/* ── LOGO with dynamic filter ── */}
          <img
            src={LOGO}
            alt="T Homes Infra"
            style={{
              height: scrolled ? 70 : 100,
              objectFit: "contain",
              // White logo on hero (light bg), normal on colored slides, normal when scrolled
              filter: scrolled
                ? "none"
                : heroActive
                  ? "none"
                  : "brightness(0) invert(1)",
              transition: "filter 0.3s ease, height 0.3s ease",
            }}
          />

          {/* RIGHT SIDE */}
          <div style={{ display: "flex", alignItems: "center" }}>
            {/* NAV */}
            <nav
              style={{
                display: isMobile ? (menuOpen ? "flex" : "none") : "flex",
                flexDirection: isMobile ? "column" : "row",
                position: isMobile ? "absolute" : "static",
                top: isMobile ? "100%" : "auto",
                right: isMobile ? 0 : "auto",
                background: isMobile ? "white" : "transparent",
                padding: isMobile ? "16px" : 0,
                gap: "20px",
                boxShadow: isMobile ? "0 8px 20px rgba(0,0,0,0.1)" : "none",
                borderRadius: isMobile ? "10px" : 0,
                zIndex: 300,
              }}
            >
              {navLinks.map(([h, l]) => (
                <a
                  key={h}
                  href={h}
                  onClick={() => setMenuOpen(false)}
                  style={{
                    fontSize: 14,
                    color: "#444",
                    fontWeight: 500,
                    textDecoration: "none",
                  }}
                >
                  {l}
                </a>
              ))}
            </nav>

            {/* HAMBURGER */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              style={{
                display: isMobile ? "block" : "none",
                fontSize: "26px",
                background: "none",
                border: "none",
                cursor: "pointer",
                marginLeft: "12px",
              }}
            >
              ☰
            </button>
          </div>
        </div>
      </header>

      {/* ── HERO CAROUSEL — passes onHeroChange callback ── */}
      <div style={{ marginTop: -120, zIndex: -1 }}>
        <HeroCarousel onHeroChange={setHeroActive} />
      </div>

      <section id="contact">
        <ContactSection />
      </section>

      <section className="w-full bg-[#21346a] text-white overflow-hidden">
        <div className="w-full flex flex-col lg:flex-row items-stretch ">
          {/* LEFT - SVG */}
          <div className="w-full lg:w-1/2 flex items-end justify-center lg:justify-start pt-5 ">
            <img
              src="/mokilabuilding.svg"
              alt="Building"
              className="w-full h-auto lg:w-auto lg:h-90 lg:w-100 object-contain"
            />
          </div>

          {/* RIGHT - CONTENT */}
          <div className="w-full lg:w-1/2.5 flex flex-col justify-start pt-12 lg:pr-30 lg:pl-2">
            <h2 className="text-3xl md:text-4xl lg:text-[40px] font-normal leading-tight">
              XXL in Scale
            </h2>
            <p className="text-white text-base md:text-sm lg:text-lg leading-relaxed tracking-wide">
              From the very first sight, J Tower stands tall with composure,
              drawing admiration to its unmissable neo-modern curved edges.
              Register openness as you walk through a pergola-framed entry. The
              reception lobby's double height ceiling establishes grandness
              without announcing it. With scale and space defining its presence,
              the singular tower spells exclusivity in an extra-large format.
            </p>
            <div className="flex flex-wrap items-center gap-6 md:gap-10 pt-5">
              {[
                { value: "1.93", label: "Acres" },
                { value: "68%", label: "Open Space" },
                { value: "3 BHK", label: "Community" },
                { value: "17", label: "Levels" },
                { value: "159", label: "Units" },
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-6">
                  <div>
                    <p className="text-[#E6E600] text-xl md:text-2xl ">
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

      <section style={{ padding: "60px 8%" }}>
        <h2
          style={{
            fontSize: "clamp(3rem, 1vw , 4rem)",
            fontWeight: 500,
            color: "#a09a91",
            marginBottom: "16px",
            letterSpacing: "-0.04em",
          }}
        >
          XXL Connectivity
        </h2>
        <p
          style={{
            fontSize: "20px",
            color: "#000000",
            fontWeight: 350,
            lineHeight: "2",
            marginBottom: "48px",
            paddingRight: "20%",
          }}
        >
          From J Tower, everything remains with-in direct reach. Commercial
          corridors, schools, entertainment &amp; lifestyle spaces etc., connect
          here with efficiency.
        </p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(4, 1fr)",
            gap: "18px 10px",
            maxWidth: "98%",
            margin: "0 auto",
            paddingRight: "15%",
            paddingLeft: "10%",
          }}
        >
          {locations.map((loc) => (
            <div
              key={loc.name}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "20px",
              }}
            >
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
              <div style={{ textAlign: "center" }}>
                <p
                  style={{
                    fontSize: "1.5rem",
                    color: "#000000",
                    fontWeight: 400,
                    margin: 0,
                    lineHeight: "1.4",
                  }}
                >
                  {loc.name}
                </p>
                <p
                  style={{
                    fontSize: "1.5rem",
                    color: "#000000",
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
        <style>{`
          @media (max-width: 600px) {
            section { padding: 40px 10px !important; }
          }
        `}</style>
      </section>

      <section style={{ overflow: "hidden" }}>
        <div>
          <h2
            style={{
              fontSize: "clamp(3rem, 1vw , 4rem)",
              fontWeight: 500,
              color: "#a09a91",
              letterSpacing: "-0.04em",
              padding: isMobile ? "2px 0 0 0" : "2px 10px 2% 8%",
            }}
          >
            XXL Luxury
          </h2>
        </div>
        <div
          style={{ width: "100%", overflow: "hidden", position: "relative" }}
        >
          <div
            style={{
              display: "flex",
              transform: `translateX(-${index * 100}%)`,
              transition: "transform 0.5s ease",
              height: "100%",
            }}
          >
            <img
              src="https://thomestowers.com/wp-content/uploads/2026/03/B1-scaled.png"
              style={{
                width: "100%",
                height: "420px",
                objectFit: "cover",
                flexShrink: 0,
              }}
            />
            <img
              src="https://thomestowers.com/wp-content/uploads/2026/03/Dining-to-Entrance-1-scaled.png"
              style={{
                width: "100%",
                height: "420px",
                objectFit: "cover",
                flexShrink: 0,
              }}
            />
            <img
              src="https://thomestowers.com/wp-content/uploads/2026/03/Drawing-scaled.png"
              style={{
                width: "100%",
                height: "420px",
                objectFit: "cover",
                flexShrink: 0,
              }}
            />
          </div>
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
            {[0, 1, 2].map((i) => (
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
        <div style={{ marginLeft: "8%", marginRight: "17%", padding: "20px" }}>
          <p
            style={{
              fontSize: "20px",
              color: "#000000",
              fontWeight: 450,
              lineHeight: "1.8",
              letterSpacing: "-0.02rem",
            }}
          >
            Experience seamless continuity and movement in your 3-bedroom
            configuration. At the entry, you get a clear visual axis of your
            home. Movement across feels intuitive and uninterrupted. The living
            space extends toward a broad balcony with multiple seating
            arrangements. Every space and dimension, from the living room to the
            kitchen or bedrooms, contribute to a quiet grandeur and assured XXL
            luxury.
          </p>
        </div>
        <div
          style={{
            marginLeft: "15%",
            marginRight: isMobile ? 0 : "5%",
            display: "flex",
            gap: "20px",
            alignItems: "flex-start",
            flexWrap: "wrap",
            height: "70%",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: "4px",
              flex: "0 0 auto",
              width: isMobile
                ? "clamp(90%, 80%, 450px)"
                : "clamp(50%, 52%, 350px)",
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "2fr 1fr",
                gap: "4px",
                height: "200px",
              }}
            >
              {[
                "https://thomestowers.com/wp-content/uploads/2026/03/Reception-scaled.png",
                "https://thomestowers.com/wp-content/uploads/2026/03/Luxury-master-Bedroom-scaled.png",
              ].map((src, i) => (
                <div key={i} style={{ overflow: "hidden", height: "100%" }}>
                  <img
                    src={src}
                    alt={`Interior ${i + 1}`}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                </div>
              ))}
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 2fr",
                gap: "4px",
                height: "200px",
              }}
            >
              {[
                "https://thomestowers.com/wp-content/uploads/2026/03/Beautiful-balcony.jpeg",
                "https://thomestowers.com/wp-content/uploads/2026/03/1-E-scaled.png",
              ].map((src, i) => (
                <div key={i} style={{ overflow: "hidden", height: "100%" }}>
                  <img
                    src={src}
                    alt={`Interior ${i + 3}`}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
          <div
            style={{
              flex: 1,
              marginRight: "18%",
              marginTop: "10px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {[
              "1837 to 2713 SFT",
              "10 ft.\n  ⁠Wide Corridors",
              "Spacious \n Balconies",
              "East, West, & North\n Facing",
            ].map((spec, i) => (
              <div
                key={i}
                style={{
                  backgroundColor: "#e4e3e1",
                  textAlign: "center",
                  marginBottom: "2%",
                }}
              >
                <p
                  style={{
                    margin: 0,
                    fontSize: "25px",
                    color: "#000000",
                    lineHeight: "2",
                    fontWeight: 500,
                    whiteSpace: "pre-line",
                  }}
                >
                  {spec}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "8px",
            marginLeft: "7%",
            marginRight: "10%",
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
                backgroundColor: "#5CDF46",
                color: "#FFFFFF",
                textAlign: "center",
                padding: "25px 20px",
                fontSize: "25px",
                fontWeight: 600,
                lineHeight: "1.4",
                whiteSpace: "pre-line",
                borderRight: i < 2 ? "1px solid #5CDF46" : "none",
                marginRight: "8px",
                marginTop: "3%",
                marginBottom: "1%",
              }}
            >
              {label}
            </div>
          ))}
        </div>
      </section>

      <section
        id="amenities"
        className="amenities-section"
        style={{ marginTop: "10px" }}
      >
        <div className="amenities-card" style={{ paddingLeft: "8%" }}>
          <h2 className="amenities-title">XXL Amenities</h2>
          <p className="amenities-desc">
            Community forms differently when space supports it. J Tower comes
            with a host of amenities intended for celebrations and social
            interactions.
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
        <div className="photo-grid" style={{ marginTop: "10px" }}>
          <div className="photo-large">
            <img
              src={slideshowImages[current].src}
              alt={slideshowImages[current].alt}
              className={`slide-img ${animating ? "slide-out" : "slide-in"}`}
            />
            <button
              className="slide-arrow left"
              onClick={() =>
                goTo(
                  (current - 1 + slideshowImages.length) %
                    slideshowImages.length,
                )
              }
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
          <div className="photo-small-grid">
            {smallPhotos.map((p, i) => (
              <div key={i} className="photo-small">
                <img src={p.src} alt={p.alt} />
              </div>
            ))}
          </div>
        </div>
        <style>{`
          .amenities-section { width: 100%; overflow: hidden; background-color:#5CDF46 }
          .amenities-card { background-color: #5CDF46; padding: 48px 56px 52px; }
          .amenities-title { color: #ffffff; font-size: clamp(3rem, 2.8vw, 2rem); font-weight: 400; margin: 0 0 14px; letter-spacing: -1px; }
          .amenities-desc { color: #ffffff; font-size:22px; line-height: 1.65; margin: 0 0 36px; }
          .amenities-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px 24px; }
          .amenities-list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 14px; }
          .amenities-item { display: flex; align-items: center; gap: 10px; color: #ffffff; font-size: clamp(1.2rem, 1.5vw, 1rem); font-weight: 500; }
          .amenities-dot { flex-shrink: 0; width: 8px; height: 8px; border-radius: 50%; background-color: #ffffff; }
          .photo-grid { display: grid; grid-template-columns: 1fr 1fr; height: 380px; background-color:#5CDF46 }
          .photo-large { position: relative; height: 100%; overflow: hidden; background: #1a1a1a; }
          .slide-img { width: 100%; height: 100%; object-fit: cover; display: block; position: absolute; inset: 0; transition: opacity 0.35s ease, transform 0.35s ease; }
          .slide-img.slide-in { opacity: 1; transform: scale(1); }
          .slide-img.slide-out { opacity: 0; transform: scale(1.04); }
          .slide-arrow { position: absolute; top: 50%; transform: translateY(-50%); background: rgba(0,0,0,0.38); color: #fff; border: none; font-size: 2.2rem; line-height: 1; width: 38px; height: 56px; cursor: pointer; z-index: 3; display: flex; align-items: center; justify-content: center; border-radius: 4px; transition: background 0.2s; }
          .slide-arrow:hover { background: rgba(0,0,0,0.65); }
          .slide-arrow.left { left: 10px; }
          .slide-arrow.right { right: 10px; }
          .slide-dots { position: absolute; bottom: 13px; left: 50%; transform: translateX(-50%); display: flex; gap: 8px; z-index: 3; }
          .slide-dot { width: 9px; height: 9px; border-radius: 50%; border: 2px solid rgba(255,255,255,0.85); background: transparent; cursor: pointer; padding: 0; transition: background 0.25s, border-color 0.25s; }
          .slide-dot.active { background: #5CDF46; border-color: #5CDF46; }
          .photo-small-grid { display: grid; grid-template-columns: repeat(3, 1fr); grid-template-rows: repeat(2, 1fr); gap: 3px; }
          .photo-small { overflow: hidden; }
          .photo-small img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform 0.4s ease; }
          .photo-small:hover img { transform: scale(1.07); }
          @media (max-width: 1000px) {
            .amenities-card { padding: 36px 32px 40px; }
            .amenities-grid { grid-template-columns: repeat(2, 1fr); }
            .photo-grid { grid-template-columns: 1fr; height: auto; }
            .photo-large { height: 280px; }
            .photo-small-grid { grid-template-columns: repeat(3, 1fr); grid-template-rows: repeat(2, 140px); }
          }
          @media (max-width: 600px) {
            .amenities-card { padding: 28px 20px 32px; }
            .amenities-grid { grid-template-columns: 1fr; gap: 6px; }
            .photo-large { height: 230px; }
            .photo-small-grid { grid-template-columns: repeat(2, 1fr); grid-template-rows: repeat(3, 120px); }
          }
        `}</style>
      </section>

      <section style={{ padding: "30px 30px", paddingLeft: "8%" }}>
        <h2
          style={{
            fontSize: "clamp(2.6rem, 3vw, 3.2rem)",
            fontWeight: 500,
            color: "#939291",
            marginBottom: "16px",
            letterSpacing: "-0.02em",
          }}
        >
          XXL Assurance
        </h2>
        <p
          style={{
            fontSize: "22px",
            color: "#000000",
            fontWeight: 450,
            lineHeight: "1.6",
            marginBottom: "48px",
            paddingRight: "15%",
            letterSpacing: "-0.08px",
          }}
        >
          Built with intent and promoted with discipline, T Homes Infra brings a
          considered understanding of land value and delivery integrity. J Tower
          too, comes with the promise where execution sustains design.
        </p>
        <div style={{ display: "flex", width: "100%", flexWrap: "wrap" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexDirection: isMobile ? "column" : "row",
              width: "100%",
              minHeight: isMobile ? "auto" : "420px",
              overflow: "hidden",
              position: "relative",
            }}
          >
            <div
              style={{
                flex: isMobile ? "unset" : "0 0 35%",
                width: isMobile ? "60%" : "auto",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: isMobile ? "30px 20px 10px" : "40px",
                zIndex: 2,
              }}
            >
              <img
                src="https://thomestowers.com/wp-content/uploads/2026/03/T-Homes-Logo-1.png"
                alt="T Homes Infra Logo"
                style={{
                  width: "auto",
                  height: "120%",
                  display: "block",
                  objectFit: "contain",
                }}
              />
            </div>
            <div
              style={{
                flex: isMobile ? "unset" : "0 0 65%",
                width: isMobile ? "100%" : "auto",
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "center",
                height: isMobile ? "280px" : "420px",
                overflow: "hidden",
                position: "relative",
              }}
            >
              <img
                src="https://thomestowers.com/wp-content/uploads/2026/03/Bitmap.png"
                alt="T Homes Tower"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "center bottom",
                  display: "block",
                }}
              />
            </div>
          </div>
        </div>
      </section>

      <section id="location" style={{ padding: "60px 48px" }}>
        <h2
          style={{
            fontSize: "clamp(2.6rem, 3vw, 3.2rem)",
            fontWeight: 400,
            color: "#a09a91",
            marginBottom: "40px",
            letterSpacing: "0.02em",
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
                  lineHeight: 1.4,
                }}
              >
                T HOMES – J Towers
              </p>
              <p
                style={{ fontSize: "13px", color: "#777", margin: "4px 0 0 0" }}
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
                }}
              >
                Address
              </p>
              <p
                style={{
                  fontSize: "14px",
                  color: "#444",
                  margin: 0,
                  lineHeight: 1.7,
                }}
              >
                J Towers,
                <br />
                Hyderabad, Telangana,
                <br />
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
          paddingRight: "50px",
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
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <img
              src="https://thomestowers.com/wp-content/uploads/2026/03/HMDA_logo1-removebg-preview.png"
              alt="HMDA Logo"
              style={{ height: "85px", objectFit: "contain" }}
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  "https://thomestowers.com/wp-content/uploads/2026/03/HMDA_logo1.jpg";
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
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginTop: "-40px",
            }}
          >
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
                marginTop: "-50px",
              }}
            >
              P02400005975
            </p>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <p
              style={{ fontSize: "13px", color: "#555", textAlign: "center" }}
            ></p>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <p
              style={{ fontSize: "13px", color: "#555", textAlign: "center" }}
            ></p>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <p
              style={{ fontSize: "13px", color: "#555", textAlign: "center" }}
            ></p>
          </div>
        </div>
      </footer>

      <a
        href="https://mediumpurple-sandpiper-111248.hostingersite.com/wp-content/uploads/2026/05/T-Homes_Mokila-Brochure.pdf"
        download
        className={`group fixed bottom-6 right-6 z-50 transition-all duration-500 
          ${scrolled ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"}`}
      >
        <div
          className="flex items-center gap-2 px-4 py-3 rounded-full text-black font-semibold shadow-lg transition-all duration-300"
          style={{
            backgroundColor: "#5CDF46",
            border: "1px solid #ffffff",
            cursor: "pointer",
          }}
        >
          <Download className="w-5 h-5" />
          <span className="whitespace-nowrap">Download Brochure</span>
        </div>
      </a>
    </div>
  );
}
