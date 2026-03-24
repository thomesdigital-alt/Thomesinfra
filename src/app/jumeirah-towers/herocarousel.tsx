"use client";
import React, { useEffect, useState, useRef, useCallback } from "react";

// ── Types ─────────────────────────────────────────────────────────────────────
interface CardData {
  name: string;
  time: string;
}

interface SlideData {
  id: string;
  bg?: string;
  title?: string;
  titleSize?: string;
  fontWeight?: number;
  cards?: CardData[];
  cardBg?: string;
  cardBorder?: string;
}

interface SlideItem {
  index: number;
  state: string;
  key: number;
}

interface Particle {
  x: number;
  y: number;
  r: number;
  vx: number;
  vy: number;
  alpha: number;
  life: number;
}

interface GlassCardProps {
  name: string;
  time: string;
  bg: string;
  border: string;
  delay: number;
  col: "left" | "right";
  row: "top" | "bottom";
}

// ── Data ─────────────────────────────────────────────────────────────────────
const SLIDES: SlideData[] = [
  { id: "hero" },
  {
    id: "strategic",
    bg: "linear-gradient(135deg,#9B1FCC 0%,#B52FD4 30%,#C83FDB 55%,#D94FE0 75%,#E060DD 100%)",
    title: "STRATEGIC\nLOCATION",
    titleSize: "clamp(3rem,7vw,6rem)",
    fontWeight: 300,
    cards: [
      { name: "NEOPOLIS",       time: "10 min" },
      { name: "ORR Exit 1A",    time: "12 min" },
      { name: "RGIA",           time: "35 min" },
      { name: "Gaudium School", time: "15 min" },
    ],
    cardBg:     "rgba(90,10,120,0.52)",
    cardBorder: "rgba(200,100,230,0.25)",
  },
  {
    id: "openspaces",
    bg: "linear-gradient(135deg,#6A0FFF 0%,#7B20FF 40%,#8B35FF 70%,#9B50FF 100%)",
    title: "68%\nOPEN\nSPACES",
    titleSize: "clamp(3rem,7.5vw,6.5rem)",
    fontWeight: 300,
    cards: [
      { name: "1.93 acre",            time: "" },
      { name: "3 BHK",               time: "" },
      { name: "1837–2713 sft",       time: "" },
      { name: "10ft. wide\ncorridor", time: "" },
    ],
    cardBg:     "rgba(160,80,255,0.38)",
    cardBorder: "rgba(220,160,255,0.22)",
  },
  {
    id: "undivided",
    bg: "linear-gradient(135deg,#1C3FFF 0%,#2550FF 40%,#3060FF 70%,#3A6FFF 100%)",
    title: "HIGHER\nUNDIVIDED\nSHARE",
    titleSize: "clamp(2.6rem,6.5vw,5.8rem)",
    fontWeight: 300,
    cards: [
      { name: "40–62 sq yard\nper flat", time: "" },
      { name: "Greater\nasset value",    time: "" },
      { name: "",                         time: "" },
      { name: "Long term\nappreciation", time: "" },
    ],
    cardBg:     "rgba(20,50,200,0.48)",
    cardBorder: "rgba(100,150,255,0.22)",
  },
];

const N = SLIDES.length;
const ANIM_MS = 880;

// ── Asymmetric Glass Card ────────────────────────────────────────────────────
function GlassCard({ name, time, bg, border, delay, col, row }: GlassCardProps) {
  if (!name && !time) return <div />;
  const radius = col === "left" ? "8px 22px 28px 28px" : "22px 8px 28px 28px";
  const minH   = col === "left" ? 155 : 130;
  const mt     = col === "left" && row === "top" ? "-10px"
               : col === "left" && row === "bottom" ? "10px" : "0px";
  return (
    <div
      style={{
        background: bg,
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        border: `1px solid ${border}`,
        borderRadius: radius,
        padding: "28px 24px 24px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        minHeight: minH,
        marginTop: mt,
        opacity: 0,
        animation: `hc-card-in 0.65s cubic-bezier(0.22,1,0.36,1) ${delay}s forwards`,
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        cursor: "default",
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = "translateY(-5px) scale(1.02)";
        e.currentTarget.style.boxShadow = "0 20px 48px rgba(0,0,0,0.35)";
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = "";
        e.currentTarget.style.boxShadow = "";
      }}
    >
      <p style={{
        fontFamily: "'Montserrat',sans-serif", fontWeight: 300,
        fontSize: "clamp(1rem,2.2vw,1.35rem)", color: "rgba(255,255,255,0.95)",
        margin: 0, lineHeight: 1.35, whiteSpace: "pre-line",
      }}>{name}</p>
      {time && (
        <p style={{
          fontFamily: "'Montserrat',sans-serif", fontWeight: 300,
          fontSize: "clamp(0.95rem,2vw,1.2rem)", color: "rgba(255,255,255,0.82)",
          margin: "4px 0 0", lineHeight: 1.3,
        }}>{time}</p>
      )}
    </div>
  );
}

// ── Particles ────────────────────────────────────────────────────────────────
function Particles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let raf: number;
    const particles: Particle[] = [];
    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);
    for (let i = 0; i < 55; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.4 + 0.3,
        vx: (Math.random() - 0.5) * 0.18,
        vy: -Math.random() * 0.22 - 0.05,
        alpha: Math.random() * 0.35 + 0.05,
        life: Math.random(),
      });
    }
    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy; p.life += 0.003;
        if (p.y < -5 || p.life > 1) {
          p.x = Math.random() * canvas.width;
          p.y = canvas.height + 5;
          p.life = 0;
        }
        const fade = Math.sin(p.life * Math.PI);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${p.alpha * fade})`;
        ctx.fill();
      });
      raf = requestAnimationFrame(tick);
    };
    tick();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);
  return (
    <canvas
      ref={canvasRef}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 0 }}
    />
  );
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function HeroCarousel() {
  // Slide state
  const [slideItems, setSlideItems] = useState<SlideItem[]>([{ index: 0, state: "center", key: 0 }]);
  const [active, setActive]     = useState(0);
  const [animKey, setAnimKey]   = useState(0);
  const isAnimating = useRef(false);
  const activeRef   = useRef(0);
  const autoRef     = useRef<ReturnType<typeof setInterval> | null>(null);

  // Progress bar
  const [progKey, setProgKey] = useState(0);

  // Drag state
  const dragStartX  = useRef<number | null>(null);
  const dragCurrX   = useRef<number | null>(null);
  const isDragging  = useRef(false);

  // 3D drag-track: for hero & color slides
  const [dragOffset, setDragOffset] = useState(0);

  const resetAuto = useCallback(() => {
    if (autoRef.current !== null) clearInterval(autoRef.current);
    setProgKey(k => k + 1);
    autoRef.current = setInterval(() => {
      goToAuto((activeRef.current + 1) % N);
    }, 10000);
  }, []);

  const goToAuto = useCallback((next: number) => {
    if (isAnimating.current) return;
    const curr = activeRef.current;
    if (next === curr) return;
    isAnimating.current = true;
    const dir = next > curr ? 1 : -1;
    const newKey = Date.now();
    setSlideItems([
      { index: curr, state: dir > 0 ? "exit-left"  : "exit-right",  key: curr * 10000 },
      { index: next, state: dir > 0 ? "enter-right" : "enter-left", key: newKey },
    ]);
    setAnimKey(k => k + 1);
    setTimeout(() => {
      setActive(next);
      activeRef.current = next;
      setSlideItems([{ index: next, state: "center", key: newKey }]);
      isAnimating.current = false;
    }, ANIM_MS);
  }, []);

  const goTo = useCallback((next: number) => {
    if (isAnimating.current || next === activeRef.current) return;
    goToAuto(next);
    resetAuto();
  }, [goToAuto, resetAuto]);

  useEffect(() => {
    resetAuto();
    return () => { if (autoRef.current !== null) clearInterval(autoRef.current); };
  }, [resetAuto]);

  // Drag handlers
  const onDragStart = (x: number) => {
    dragStartX.current = x;
    dragCurrX.current  = x;
    isDragging.current = true;
    if (autoRef.current !== null) clearInterval(autoRef.current);
  };
  const onDragMove = (x: number) => {
    if (!isDragging.current || dragStartX.current === null) return;
    dragCurrX.current = x;
    setDragOffset((x - dragStartX.current) * 0.45);
  };
  const onDragEnd = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    const delta =
      dragCurrX.current !== null && dragStartX.current !== null
        ? dragCurrX.current - dragStartX.current
        : 0;
    setDragOffset(0);
    if (Math.abs(delta) > 70) {
      const next = ((activeRef.current + (delta < 0 ? 1 : -1)) + N) % N;
      goTo(next);
    } else {
      resetAuto();
    }
    dragStartX.current = null;
    dragCurrX.current  = null;
  };

  const isHero = SLIDES[active]?.id === "hero";

  // suppress unused warning for animKey
  void animKey;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600&display=swap');

        /* ── card pop-in ── */
        @keyframes hc-card-in {
          from { opacity:0; transform:translateY(28px) scale(0.93); }
          to   { opacity:1; transform:translateY(0) scale(1); }
        }

        /* ── title ── */
        @keyframes hc-title-in {
          from { opacity:0; transform:translateX(-52px); }
          to   { opacity:1; transform:translateX(0); }
        }
        @keyframes hc-line-grow {
          from { transform:scaleX(0); opacity:0; }
          to   { transform:scaleX(1); opacity:1; }
        }

        /* ── hero text ── */
        @keyframes hc-hero-line {
          from { opacity:0; transform:translateX(52px); }
          to   { opacity:1; transform:translateX(0); }
        }
        @keyframes hc-underline-grow {
          from { transform:scaleX(0); opacity:0; }
          to   { transform:scaleX(1); opacity:1; }
        }
        @keyframes hc-float {
          0%,100% { transform:translateY(0px); }
          50%      { transform:translateY(-12px); }
        }

        /* ═══════════════════════════════════════
           3D CINEMATIC PAGE-TURN TRANSITIONS
        ═══════════════════════════════════════ */
        @keyframes slide3d-enter-right {
          0%   { opacity:0; transform:perspective(1400px) rotateY(32deg) translateX(65%) scale(0.78); filter:blur(8px) brightness(0.65); }
          45%  { opacity:1; filter:blur(0px) brightness(1); }
          100% { opacity:1; transform:perspective(1400px) rotateY(0deg) translateX(0%) scale(1); filter:blur(0px) brightness(1); }
        }
        @keyframes slide3d-enter-left {
          0%   { opacity:0; transform:perspective(1400px) rotateY(-32deg) translateX(-65%) scale(0.78); filter:blur(8px) brightness(0.65); }
          45%  { opacity:1; filter:blur(0px) brightness(1); }
          100% { opacity:1; transform:perspective(1400px) rotateY(0deg) translateX(0%) scale(1); filter:blur(0px) brightness(1); }
        }
        @keyframes slide3d-exit-left {
          0%   { opacity:1; transform:perspective(1400px) rotateY(0deg) translateX(0%) scale(1); filter:blur(0px) brightness(1); }
          55%  { opacity:0.3; filter:blur(4px) brightness(0.6); }
          100% { opacity:0; transform:perspective(1400px) rotateY(-32deg) translateX(-65%) scale(0.78); filter:blur(10px) brightness(0.4); }
        }
        @keyframes slide3d-exit-right {
          0%   { opacity:1; transform:perspective(1400px) rotateY(0deg) translateX(0%) scale(1); filter:blur(0px) brightness(1); }
          55%  { opacity:0.3; filter:blur(4px) brightness(0.6); }
          100% { opacity:0; transform:perspective(1400px) rotateY(32deg) translateX(65%) scale(0.78); filter:blur(10px) brightness(0.4); }
        }

        .hc-slide {
          position:absolute; inset:0; width:100%; height:100%;
          will-change:transform,opacity,filter;
          transform-style:preserve-3d;
          backface-visibility:hidden;
        }
        .hc-slide[data-state="center"] {
          opacity:1;
          transform:perspective(1400px) rotateY(0deg) translateX(0%) scale(1);
        }
        .hc-slide[data-state="enter-right"] {
          animation:slide3d-enter-right ${ANIM_MS}ms cubic-bezier(0.25,0.46,0.45,0.94) forwards;
          z-index:3;
        }
        .hc-slide[data-state="enter-left"] {
          animation:slide3d-enter-left ${ANIM_MS}ms cubic-bezier(0.25,0.46,0.45,0.94) forwards;
          z-index:3;
        }
        .hc-slide[data-state="exit-left"] {
          animation:slide3d-exit-left ${ANIM_MS}ms cubic-bezier(0.25,0.46,0.45,0.94) forwards;
          z-index:2;
        }
        .hc-slide[data-state="exit-right"] {
          animation:slide3d-exit-right ${ANIM_MS}ms cubic-bezier(0.25,0.46,0.45,0.94) forwards;
          z-index:2;
        }

        /* ── Text animations ── */
        .hc-title {
          font-family:'Montserrat',sans-serif;
          white-space:pre-line; color:rgba(255,255,255,0.93);
          text-transform:uppercase; letter-spacing:0.01em;
          line-height:1.08; margin:0; opacity:0;
          animation:hc-title-in 0.85s cubic-bezier(0.22,1,0.36,1) 0.3s forwards;
        }
        .hc-underline {
          height:2px; width:80px; background:rgba(255,255,255,0.38);
          margin-top:22px; transform-origin:left; opacity:0;
          animation:hc-line-grow 0.65s cubic-bezier(0.22,1,0.36,1) 0.95s forwards;
        }
        .jc-line1 { opacity:0; animation:hc-hero-line 0.85s cubic-bezier(0.22,1,0.36,1) 0.15s forwards; }
        .jc-line2 { opacity:0; animation:hc-hero-line 0.85s cubic-bezier(0.22,1,0.36,1) 0.35s forwards; }
        .jc-line3 { opacity:0; animation:hc-hero-line 0.85s cubic-bezier(0.22,1,0.36,1) 0.55s forwards; }
        .jc-uline  { transform-origin:left; opacity:0; animation:hc-underline-grow 0.65s cubic-bezier(0.22,1,0.36,1) 0.9s forwards; }
        .jc-building { animation:hc-float 6s ease-in-out 1s infinite; }

        /* ── Nav ── */
        .hc-dot {
          width:10px; height:10px; border-radius:50%;
          border:2px solid rgba(255,255,255,0.65);
          background:transparent; cursor:pointer; padding:0;
          transition:background 0.25s,transform 0.25s,border-color 0.25s,width 0.25s;
        }
        .hc-dot.active { background:#fff; border-color:#fff; transform:scale(1.3); }
        .hc-arrow {
          position:absolute; top:50%; transform:translateY(-50%);
          width:50px; height:50px; border-radius:50%;
          border:1.5px solid rgba(255,255,255,0.35);
          background:rgba(255,255,255,0.1);
          color:#fff; font-size:1.8rem; line-height:1;
          display:flex; align-items:center; justify-content:center;
          cursor:pointer; z-index:30;
          transition:background 0.2s,transform 0.2s;
          backdrop-filter:blur(8px); -webkit-backdrop-filter:blur(8px);
        }
        .hc-arrow:hover { background:rgba(255,255,255,0.22); transform:translateY(-50%) scale(1.08); }
        .hc-arrow.prev { left:22px; }
        .hc-arrow.next { right:22px; }

        /* ── Progress ── */
        @keyframes hc-progress { from{transform:scaleX(0)} to{transform:scaleX(1)} }
        .hc-progress { position:absolute; bottom:0; left:0; right:0; height:3px; z-index:20; background:rgba(255,255,255,0.15); }
        .hc-progress-bar { height:100%; background:rgba(255,255,255,0.7); transform-origin:left; animation:hc-progress 10s linear forwards; }

        /* ── Layout ── */
        .hc-inner {
          width:100%; height:100%;
          display:flex; align-items:center; justify-content:space-between;
          padding:80px 8vw 60px 8vw; gap:6vw;
        }
        .hc-cards {
          display:grid; grid-template-columns:1.1fr 1fr; gap:10px 12px; align-items:start;
        }

        /* ── Drag cursor ── */
        .hc-section { cursor:grab; }
        .hc-section:active { cursor:grabbing; }

        @media (max-width:768px) {
          .hc-inner { flex-direction:column!important; padding:80px 24px 48px!important; gap:28px!important; }
          .hc-cards { grid-template-columns:1fr 1fr!important; }
        }
      `}</style>

      <section
        className="hc-section"
        style={{ height:"100vh", overflow:"hidden", position:"relative", zIndex:1, perspective:"1400px", perspectiveOrigin:"50% 50%" }}
        onMouseDown={e => { e.preventDefault(); onDragStart(e.clientX); }}
        onMouseMove={e => { if (isDragging.current) { e.preventDefault(); onDragMove(e.clientX); } }}
        onMouseUp={onDragEnd}
        onMouseLeave={onDragEnd}
        onTouchStart={e => onDragStart(e.touches[0].clientX)}
        onTouchMove={e => onDragMove(e.touches[0].clientX)}
        onTouchEnd={onDragEnd}
      >
        {/* ── Slide stack ─────────────────────────────────────────── */}
        {slideItems.map(({ index, state, key }) => {
          const slide = SLIDES[index];
          const isH   = slide.id === "hero";
          const dragStyle: React.CSSProperties = state === "center" && isDragging.current
            ? { transform: `perspective(1400px) translateX(${dragOffset}px) rotateY(${dragOffset * 0.015}deg)`, transition: "none" }
            : {};

          return (
            <div
              key={key}
              className="hc-slide"
              data-state={state}
              style={{ background: isH ? "" : (slide.bg || "#000"),...dragStyle }}
            >
              {/* Particles on non-hero slides */}
              {!isH && <Particles />}

              {isH ? (
                /* ══ HERO SLIDE ══════════════════════════════════════ */
                <div style={{ width:"100%", height:"100%", position:"relative" }}>
                  <div style={{ display:"flex", justifyContent:"center", alignItems:"center", overflow:"hidden", height:"100vh", zIndex:2 }}>
                    <img
                      src="https://thomestowers.com/wp-content/uploads/2026/03/Image_-1.png"
                      alt="building"
                      className="jc-building"
                      style={{ height:"50vh", width:"auto", objectFit:"fill" }}
                    />
                  </div>
                  <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", height:"100vh", padding:"0 5vw", marginTop:"-83vh", marginLeft:"47vh", position:"relative", zIndex:3 }}>
                    <div style={{ flex:1, display:"flex", justifyContent:"center" }}>
                      <img
                        src="https://thomestowers.com/wp-content/uploads/2026/03/Path_-_Path_-_Compound-Path_-_Path_-_Compound-Path_-_Path_-_Path_-_Path_-_Path_-_Path_-_Path_-_Path_-_Path_-_Path_-_Path_-_Path_-2.png"
                        alt="XXL Living"
                        style={{ width:"auto", height:"26vh" }}
                      />
                    </div>
                    <div style={{ flex:1, textAlign:"right", paddingLeft:"20px", marginRight:"5vh", marginTop:"20vh" }}>
                      <h1 className="jc-line1" style={{ margin:0, fontFamily:"Montserrat,sans-serif", fontWeight:500, fontSize:"clamp(1.8rem,3.8vw,3.4rem)", lineHeight:1.1, color:"#8f8f8f", textTransform:"uppercase", marginBottom:"1px" }}>
                        WELCOME TO
                      </h1>
                          <h1 className="jc-line2" style={{ margin:0, fontFamily:"Montserrat,sans-serif", fontWeight:500, fontSize:"clamp(2rem,4vw,3.6rem)", lineHeight:1.5, color:"#8f8f8f", textTransform:"uppercase", letterSpacing:"0.02em", marginLeft:"-5vh" }}>
                        J COSMOPOLIS.
                      </h1>
                      <p className="jc-line3" style={{ margin:0, fontFamily:"Montserrat,sans-serif", fontWeight:500, fontSize:"clamp(1.5rem,3.5vw,3.0rem)", lineHeight:1.5, color:"#8f8f8f", textTransform:"uppercase", letterSpacing:"0.041em", marginLeft:"-70vh" }}>
                        SIGN UP TO YOUR XXL LIFE.
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                /* ══ COLOR SLIDES ════════════════════════════════════ */
                <div className="hc-inner" style={{ position:"relative", zIndex:2 }}>
                  {/* Left: Title */}
                  <div style={{ flex:"0 0 45%", display:"flex", flexDirection:"column" }}>
                    <h2
                      className="hc-title"
                      style={{ fontSize: slide.titleSize, fontWeight: slide.fontWeight }}
                    >
                      {slide.title}
                    </h2>
                    <div className="hc-underline" />
                  </div>

                  {/* Right: Cards */}
                  <div style={{ flex:"0 0 46%", maxWidth:520 }}>
                    <div className="hc-cards">
                      {slide.cards?.map((card, i) => {
                        const col = i % 2 === 0 ? "left" : "right" as "left" | "right";
                        const row = i < 2 ? "top" : "bottom" as "top" | "bottom";
                        return (
                          <GlassCard
                            key={`${key}-${i}`}
                            name={card.name}
                            time={card.time}
                            bg={slide.cardBg ?? ""}
                            border={slide.cardBorder ?? ""}
                            delay={0.35 + i * 0.12}
                            col={col}
                            row={row}
                          />
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {/* ── Arrows ──────────────────────────────────────────────── */}
        <button className="hc-arrow prev" onClick={() => goTo((active - 1 + N) % N)} aria-label="Previous" style={{ zIndex:40 }}>‹</button>
        <button className="hc-arrow next" onClick={() => goTo((active + 1) % N)}     aria-label="Next"     style={{ zIndex:40 }}>›</button>

        {/* ── Dots ────────────────────────────────────────────────── */}
        <div style={{ position:"absolute", bottom:20, left:"50%", transform:"translateX(-50%)", display:"flex", gap:10, zIndex:40 }}>
          {SLIDES.map((_, i) => (
            <button key={i} className={`hc-dot ${i === active ? "active" : ""}`} onClick={() => goTo(i)} aria-label={`Slide ${i + 1}`} />
          ))}
        </div>

        {/* ── Progress bar ────────────────────────────────────────── */}
        <div className="hc-progress">
          <div key={`pb-${progKey}`} className="hc-progress-bar" />
        </div>

        {/* ── Counter ─────────────────────────────────────────────── */}
        <div style={{ position:"absolute", top:92, right:28, fontFamily:"'Montserrat',sans-serif", fontWeight:500, fontSize:11, letterSpacing:"0.18em", color: isHero ? "rgba(0,0,0,0.25)" : "rgba(255,255,255,0.4)", zIndex:40 }}>
          {String(active + 1).padStart(2,"0")} / {String(N).padStart(2,"0")}
        </div>
      </section>
    </>
  );
}
