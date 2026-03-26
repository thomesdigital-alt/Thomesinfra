// "use client";
// import React, { useEffect, useState, useRef, useCallback } from "react";

// // ── Types ─────────────────────────────────────────────────────────────────────
// interface CardData {
//   name: string;
//   time: string;
// }

// interface SlideData {
//   id: string;
//   bg?: string;
//   title?: string;
//   titleSize?: string;
//   fontWeight?: number;
//   cards?: CardData[];
//   cardBg?: string;
//   cardBorder?: string;
// }

// interface SlideItem {
//   index: number;
//   state: string;
//   key: number;
// }

// interface Particle {
//   x: number;
//   y: number;
//   r: number;
//   vx: number;
//   vy: number;
//   alpha: number;
//   life: number;
// }

// interface GlassCardProps {
//   name: string;
//   time: string;
//   bg: string;
//   border: string;
//   delay: number;
//   col: "left" | "right";
//   row: "top" | "bottom";
// }

// // ── Data ─────────────────────────────────────────────────────────────────────
// const SLIDES: SlideData[] = [
//   { id: "hero" },
//   {
//     id: "strategic",
//     bg: "linear-gradient(135deg,#9B1FCC 0%,#B52FD4 30%,#C83FDB 55%,#D94FE0 75%,#E060DD 100%)",
//     title: "STRATEGIC\nLOCATION",
//     titleSize: "clamp(3rem,7vw,6rem)",
//     fontWeight: 300,
//     cards: [
//       { name: "NEOPOLIS",       time: "10 min" },
//       { name: "ORR Exit 1A",    time: "12 min" },
//       { name: "RGIA",           time: "35 min" },
//       { name: "Gaudium School", time: "15 min" },
//     ],
//     cardBg:     "rgba(90,10,120,0.52)",
//     cardBorder: "rgba(200,100,230,0.25)",
//   },
//   {
//     id: "openspaces",
//     bg: "linear-gradient(135deg,#6A0FFF 0%,#7B20FF 40%,#8B35FF 70%,#9B50FF 100%)",
//     title: "68%\nOPEN\nSPACES",
//     titleSize: "clamp(3rem,7.5vw,6.5rem)",
//     fontWeight: 300,
//     cards: [
//       { name: "1.93 acre",            time: "" },
//       { name: "3 BHK",               time: "" },
//       { name: "1837–2713 sft",       time: "" },
//       { name: "10ft. wide\ncorridor", time: "" },
//     ],
//     cardBg:     "rgba(160,80,255,0.38)",
//     cardBorder: "rgba(220,160,255,0.22)",
//   },
//   {
//     id: "undivided",
//     bg: "linear-gradient(135deg,#1C3FFF 0%,#2550FF 40%,#3060FF 70%,#3A6FFF 100%)",
//     title: "HIGHER\nUNDIVIDED\nSHARE",
//     titleSize: "clamp(2.6rem,6.5vw,5.8rem)",
//     fontWeight: 300,
//     cards: [
//       { name: "40–62 sq yard\nper flat", time: "" },
//       { name: "Greater\nasset value",    time: "" },
//       { name: "",                         time: "" },
//       { name: "Long term\nappreciation", time: "" },
//     ],
//     cardBg:     "rgba(20,50,200,0.48)",
//     cardBorder: "rgba(100,150,255,0.22)",
//   },
// ];

// const N = SLIDES.length;
// const ANIM_MS = 880;

// // ── Asymmetric Glass Card ────────────────────────────────────────────────────
// function GlassCard({ name, time, bg, border, delay, col, row }: GlassCardProps) {
//   if (!name && !time) return <div />;
//   const radius = col === "left" ? "8px 22px 28px 28px" : "22px 8px 28px 28px";
//   const minH   = col === "left" ? 155 : 130;
//   const mt     = col === "left" && row === "top" ? "-10px"
//                : col === "left" && row === "bottom" ? "10px" : "0px";
//   return (
//     <div
//       style={{
//         background: bg,
//         backdropFilter: "blur(16px)",
//         WebkitBackdropFilter: "blur(16px)",
//         border: `1px solid ${border}`,
//         borderRadius: radius,
//         padding: "28px 24px 24px",
//         display: "flex",
//         flexDirection: "column",
//         justifyContent: "flex-end",
//         minHeight: minH,
//         marginTop: mt,
//         opacity: 0,
//         animation: `hc-card-in 0.65s cubic-bezier(0.22,1,0.36,1) ${delay}s forwards`,
//         transition: "transform 0.3s ease, box-shadow 0.3s ease",
//         cursor: "default",
//       }}
//       onMouseEnter={e => {
//         e.currentTarget.style.transform = "translateY(-5px) scale(1.02)";
//         e.currentTarget.style.boxShadow = "0 20px 48px rgba(0,0,0,0.35)";
//       }}
//       onMouseLeave={e => {
//         e.currentTarget.style.transform = "";
//         e.currentTarget.style.boxShadow = "";
//       }}
//     >
//       <p style={{
//           fontWeight: 300,
//         fontSize: "clamp(1rem,2.2vw,1.35rem)", color: "rgba(255,255,255,0.95)",
//         margin: 0, lineHeight: 1.35, whiteSpace: "pre-line",
//       }}>{name}</p>
//       {time && (
//         <p style={{
//             fontWeight: 300,
//           fontSize: "clamp(0.95rem,2vw,1.2rem)", color: "rgba(255,255,255,0.82)",
//           margin: "4px 0 0", lineHeight: 1.3,
//         }}>{time}</p>
//       )}
//     </div>
//   );
// }
// // ── Particles ────────────────────────────────────────────────────────────────
// function Particles() {
//   const canvasRef = useRef<HTMLCanvasElement>(null);
//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;
//     const ctx = canvas.getContext("2d");
//     if (!ctx) return;
//     let raf: number;
//     const particles: Particle[] = [];
//     const resize = () => {
//       canvas.width  = canvas.offsetWidth;
//       canvas.height = canvas.offsetHeight;
//     };
//     resize();
//     window.addEventListener("resize", resize);
//     for (let i = 0; i < 55; i++) {
//       particles.push({
//         x: Math.random() * canvas.width,
//         y: Math.random() * canvas.height,
//         r: Math.random() * 1.4 + 0.3,
//         vx: (Math.random() - 0.5) * 0.18,
//         vy: -Math.random() * 0.22 - 0.05,
//         alpha: Math.random() * 0.35 + 0.05,
//         life: Math.random(),
//       });
//     }
//     const tick = () => {
//       ctx.clearRect(0, 0, canvas.width, canvas.height);
//       particles.forEach(p => {
//         p.x += p.vx; p.y += p.vy; p.life += 0.003;
//         if (p.y < -5 || p.life > 1) {
//           p.x = Math.random() * canvas.width;
//           p.y = canvas.height + 5;
//           p.life = 0;
//         }
//         const fade = Math.sin(p.life * Math.PI);
//         ctx.beginPath();
//         ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
//         ctx.fillStyle = `rgba(255,255,255,${p.alpha * fade})`;
//         ctx.fill();
//       });
//       raf = requestAnimationFrame(tick);
//     };
//     tick();
//     return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
//   }, []);
//   return (
//     <canvas
//       ref={canvasRef}
//       style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 0 }}
//     />
//   );
// }

// // ── Main Component ────────────────────────────────────────────────────────────
// export default function HeroCarousel() {
//   // Slide state
//   const [slideItems, setSlideItems] = useState<SlideItem[]>([{ index: 0, state: "center", key: 0 }]);
//   const [active, setActive]     = useState(0);
//   const [animKey, setAnimKey]   = useState(0);
//   const isAnimating = useRef(false);
//   const activeRef   = useRef(0);
//   const autoRef     = useRef<ReturnType<typeof setInterval> | null>(null);

//   // Progress bar
//   const [progKey, setProgKey] = useState(0);

//   // Drag state
//   const dragStartX  = useRef<number | null>(null);
//   const dragCurrX   = useRef<number | null>(null);
//   const isDragging  = useRef(false);

//   // 3D drag-track: for hero & color slides
//   const [dragOffset, setDragOffset] = useState(0);

//   const resetAuto = useCallback(() => {
//     if (autoRef.current !== null) clearInterval(autoRef.current);
//     setProgKey(k => k + 1);
//     autoRef.current = setInterval(() => {
//       goToAuto((activeRef.current + 1) % N);
//     }, 10000);
//   }, []);

//   const goToAuto = useCallback((next: number) => {
//     if (isAnimating.current) return;
//     const curr = activeRef.current;
//     if (next === curr) return;
//     isAnimating.current = true;
//     const dir = next > curr ? 1 : -1;
//     const newKey = Date.now();
//     setSlideItems([
//       { index: curr, state: dir > 0 ? "exit-left"  : "exit-right",  key: curr * 10000 },
//       { index: next, state: dir > 0 ? "enter-right" : "enter-left", key: newKey },
//     ]);
//     setAnimKey(k => k + 1);
//     setTimeout(() => {
//       setActive(next);
//       activeRef.current = next;
//       setSlideItems([{ index: next, state: "center", key: newKey }]);
//       isAnimating.current = false;
//     }, ANIM_MS);
//   }, []);

//   const goTo = useCallback((next: number) => {
//     if (isAnimating.current || next === activeRef.current) return;
//     goToAuto(next);
//     resetAuto();
//   }, [goToAuto, resetAuto]);

//   useEffect(() => {
//     resetAuto();
//     return () => { if (autoRef.current !== null) clearInterval(autoRef.current); };
//   }, [resetAuto]);

//   // Drag handlers
//   const onDragStart = (x: number) => {
//     dragStartX.current = x;
//     dragCurrX.current  = x;
//     isDragging.current = true;
//     if (autoRef.current !== null) clearInterval(autoRef.current);
//   };
//   const onDragMove = (x: number) => {
//     if (!isDragging.current || dragStartX.current === null) return;
//     dragCurrX.current = x;
//     setDragOffset((x - dragStartX.current) * 0.45);
//   };
//   const onDragEnd = () => {
//     if (!isDragging.current) return;
//     isDragging.current = false;
//     const delta =
//       dragCurrX.current !== null && dragStartX.current !== null
//         ? dragCurrX.current - dragStartX.current
//         : 0;
//     setDragOffset(0);
//     if (Math.abs(delta) > 70) {
//       const next = ((activeRef.current + (delta < 0 ? 1 : -1)) + N) % N;
//       goTo(next);
//     } else {
//       resetAuto();
//     }
//     dragStartX.current = null;
//     dragCurrX.current  = null;
//   };

//   const isHero = SLIDES[active]?.id === "hero";

//   // suppress unused warning for animKey
//   void animKey;

//   return (
//     <>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600&display=swap');

//         /* ── card pop-in ── */
//         @keyframes hc-card-in {
//           from { opacity:0; transform:translateY(28px) scale(0.93); }
//           to   { opacity:1; transform:translateY(0) scale(1); }
//         }

//         /* ── title ── */
//         @keyframes hc-title-in {
//           from { opacity:0; transform:translateX(-52px); }
//           to   { opacity:1; transform:translateX(0); }
//         }
//         @keyframes hc-line-grow {
//           from { transform:scaleX(0); opacity:0; }
//           to   { transform:scaleX(1); opacity:1; }
//         }

//         /* ── hero text ── */
//         @keyframes hc-hero-line {
//           from { opacity:0; transform:translateX(52px); }
//           to   { opacity:1; transform:translateX(0); }
//         }
//         @keyframes hc-underline-grow {
//           from { transform:scaleX(0); opacity:0; }
//           to   { transform:scaleX(1); opacity:1; }
//         }
//         @keyframes hc-float {
//           0%,100% { transform:translateY(0px); }
//           50%      { transform:translateY(-12px); }
//         }

//         /* ═══════════════════════════════════════
//            3D CINEMATIC PAGE-TURN TRANSITIONS
//         ═══════════════════════════════════════ */
//         @keyframes slide3d-enter-right {
//           0%   { opacity:0; transform:perspective(1400px) rotateY(32deg) translateX(65%) scale(0.78); filter:blur(8px) brightness(0.65); }
//           45%  { opacity:1; filter:blur(0px) brightness(1); }
//           100% { opacity:1; transform:perspective(1400px) rotateY(0deg) translateX(0%) scale(1); filter:blur(0px) brightness(1); }
//         }
//         @keyframes slide3d-enter-left {
//           0%   { opacity:0; transform:perspective(1400px) rotateY(-32deg) translateX(-65%) scale(0.78); filter:blur(8px) brightness(0.65); }
//           45%  { opacity:1; filter:blur(0px) brightness(1); }
//           100% { opacity:1; transform:perspective(1400px) rotateY(0deg) translateX(0%) scale(1); filter:blur(0px) brightness(1); }
//         }
//         @keyframes slide3d-exit-left {
//           0%   { opacity:1; transform:perspective(1400px) rotateY(0deg) translateX(0%) scale(1); filter:blur(0px) brightness(1); }
//           55%  { opacity:0.3; filter:blur(4px) brightness(0.6); }
//           100% { opacity:0; transform:perspective(1400px) rotateY(-32deg) translateX(-65%) scale(0.78); filter:blur(10px) brightness(0.4); }
//         }
//         @keyframes slide3d-exit-right {
//           0%   { opacity:1; transform:perspective(1400px) rotateY(0deg) translateX(0%) scale(1); filter:blur(0px) brightness(1); }
//           55%  { opacity:0.3; filter:blur(4px) brightness(0.6); }
//           100% { opacity:0; transform:perspective(1400px) rotateY(32deg) translateX(65%) scale(0.78); filter:blur(10px) brightness(0.4); }
//         }

//         .hc-slide {
//           position:absolute; inset:0; width:100%; height:100%;
//           will-change:transform,opacity,filter;
//           transform-style:preserve-3d;
//           backface-visibility:hidden;
//         }
//         .hc-slide[data-state="center"] {
//           opacity:1;
//           transform:perspective(1400px) rotateY(0deg) translateX(0%) scale(1);
//         }
//         .hc-slide[data-state="enter-right"] {
//           animation:slide3d-enter-right ${ANIM_MS}ms cubic-bezier(0.25,0.46,0.45,0.94) forwards;
//           z-index:3;
//         }
//         .hc-slide[data-state="enter-left"] {
//           animation:slide3d-enter-left ${ANIM_MS}ms cubic-bezier(0.25,0.46,0.45,0.94) forwards;
//           z-index:3;
//         }
//         .hc-slide[data-state="exit-left"] {
//           animation:slide3d-exit-left ${ANIM_MS}ms cubic-bezier(0.25,0.46,0.45,0.94) forwards;
//           z-index:2;
//         }
//         .hc-slide[data-state="exit-right"] {
//           animation:slide3d-exit-right ${ANIM_MS}ms cubic-bezier(0.25,0.46,0.45,0.94) forwards;
//           z-index:2;
//         }

//         /* ── Text animations ── */
//         .hc-title {
//           font-family:'Montserrat',sans-serif;
//           white-space:pre-line; color:rgba(255,255,255,0.93);
//           text-transform:uppercase; letter-spacing:0.01em;
//           line-height:1.08; margin:0; opacity:0;
//           animation:hc-title-in 0.85s cubic-bezier(0.22,1,0.36,1) 0.3s forwards;
//         }
//         .hc-underline {
//           height:2px; width:80px; background:rgba(255,255,255,0.38);
//           margin-top:22px; transform-origin:left; opacity:0;
//           animation:hc-line-grow 0.65s cubic-bezier(0.22,1,0.36,1) 0.95s forwards;
//         }
//         .jc-line1 { opacity:0; animation:hc-hero-line 0.85s cubic-bezier(0.22,1,0.36,1) 0.15s forwards; }
//         .jc-line2 { opacity:0; animation:hc-hero-line 0.85s cubic-bezier(0.22,1,0.36,1) 0.35s forwards; }
//         .jc-line3 { opacity:0; animation:hc-hero-line 0.85s cubic-bezier(0.22,1,0.36,1) 0.55s forwards; }
//         .jc-uline  { transform-origin:left; opacity:0; animation:hc-underline-grow 0.65s cubic-bezier(0.22,1,0.36,1) 0.9s forwards; }
//         .jc-building { animation:hc-float 6s ease-in-out 1s infinite; }

//         /* ── Nav ── */
//         .hc-dot {
//           width:10px; height:10px; border-radius:50%;
//           border:2px solid rgba(255,255,255,0.65);
//           background:transparent; cursor:pointer; padding:0;
//           transition:background 0.25s,transform 0.25s,border-color 0.25s,width 0.25s;
//         }
//         .hc-dot.active { background:#fff; border-color:#fff; transform:scale(1.3); }
//         .hc-arrow {
//           position:absolute; top:50%; transform:translateY(-50%);
//           width:50px; height:50px; border-radius:50%;
//           border:1.5px solid rgba(255,255,255,0.35);
//           background:rgba(255,255,255,0.1);
//           color:#fff; font-size:1.8rem; line-height:1;
//           display:flex; align-items:center; justify-content:center;
//           cursor:pointer; z-index:30;
//           transition:background 0.2s,transform 0.2s;
//           backdrop-filter:blur(8px); -webkit-backdrop-filter:blur(8px);
//         }
//         .hc-arrow:hover { background:rgba(255,255,255,0.22); transform:translateY(-50%) scale(1.08); }
//         .hc-arrow.prev { left:22px; }
//         .hc-arrow.next { right:22px; }

//         /* ── Progress ── */
//         @keyframes hc-progress { from{transform:scaleX(0)} to{transform:scaleX(1)} }
//         .hc-progress { position:absolute; bottom:0; left:0; right:0; height:3px; z-index:20; background:rgba(255,255,255,0.15); }
//         .hc-progress-bar { height:100%; background:rgba(255,255,255,0.7); transform-origin:left; animation:hc-progress 10s linear forwards; }

//         /* ── Layout ── */
//         .hc-inner {
//           width:100%; height:100%;
//           display:flex; align-items:center; justify-content:space-between;
//           padding:80px 8vw 60px 8vw; gap:6vw;
//         }
//         .hc-cards {
//           display:grid; grid-template-columns:1.1fr 1fr; gap:10px 12px; align-items:start;
//         }

//         /* ── Drag cursor ── */
//         .hc-section { cursor:grab; }
//         .hc-section:active { cursor:grabbing; }

//         @media (max-width:768px) {
//           .hc-inner { flex-direction:column!important; padding:80px 24px 48px!important; gap:28px!important; }
//           .hc-cards { grid-template-columns:1fr 1fr!important; }
//         }
//       `}</style>

//       <section
//         className="hc-section"
//         style={{ height:"100vh", overflow:"hidden", position:"relative", zIndex:1, perspective:"1400px", perspectiveOrigin:"50% 50%" }}
//         onMouseDown={e => { e.preventDefault(); onDragStart(e.clientX); }}
//         onMouseMove={e => { if (isDragging.current) { e.preventDefault(); onDragMove(e.clientX); } }}
//         onMouseUp={onDragEnd}
//         onMouseLeave={onDragEnd}
//         onTouchStart={e => onDragStart(e.touches[0].clientX)}
//         onTouchMove={e => onDragMove(e.touches[0].clientX)}
//         onTouchEnd={onDragEnd}
//       >
//         {/* ── Slide stack ─────────────────────────────────────────── */}
//         {slideItems.map(({ index, state, key }) => {
//           const slide = SLIDES[index];
//           const isH   = slide.id === "hero";
//           const dragStyle: React.CSSProperties = state === "center" && isDragging.current
//             ? { transform: `perspective(1400px) translateX(${dragOffset}px) rotateY(${dragOffset * 0.015}deg)`, transition: "none" }
//             : {};

//           return (
//             <div
//               key={key}
//               className="hc-slide"
//               data-state={state}
//               style={{ background: isH ? "" : (slide.bg || "#000"),...dragStyle }}
//             >
//               {/* Particles on non-hero slides */}
//               {!isH && <Particles />}

//               {isH ? (
//                 /* ══ HERO SLIDE ══════════════════════════════════════ */
//                 <div style={{ width:"100%", height:"100%", position:"relative" }}>
//                   <div style={{ display:"flex", justifyContent:"center", alignItems:"center", overflow:"hidden", height:"100vh", zIndex:2 }}>
//                     <img
//                       src="https://thomestowers.com/wp-content/uploads/2026/03/Image_-1.png"
//                       alt="building"
//                       className="jc-building"
//                       style={{ height:"50vh", width:"auto", objectFit:"fill" }}
//                     />
//                   </div>
//                   <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", height:"100vh", padding:"0 5vw", marginTop:"-83vh", marginLeft:"47vh", position:"relative", zIndex:3 }}>
//                     <div style={{ flex:1, display:"flex", justifyContent:"center" }}>
//                       <img
//                         src="https://thomestowers.com/wp-content/uploads/2026/03/Path_-_Path_-_Compound-Path_-_Path_-_Compound-Path_-_Path_-_Path_-_Path_-_Path_-_Path_-_Path_-_Path_-_Path_-_Path_-_Path_-_Path_-2.png"
//                         alt="XXL Living"
//                         style={{ width:"auto", height:"26vh" }}
//                       />
//                     </div>
//                     <div style={{ flex:1, textAlign:"right", paddingLeft:"20px", marginRight:"5vh", marginTop:"20vh" }}>
//                       <h1 className="jc-line1" style={{ margin:0, fontFamily:"Montserrat,sans-serif", fontWeight:500, fontSize:"clamp(1.8rem,3.8vw,3.4rem)", lineHeight:1.1, color:"#8f8f8f", textTransform:"uppercase", marginBottom:"1px" }}>
//                         WELCOME TO
//                       </h1>
//                           <h1 className="jc-line2" style={{ margin:0, fontFamily:"Montserrat,sans-serif", fontWeight:500, fontSize:"clamp(2rem,4vw,3.6rem)", lineHeight:1.5, color:"#8f8f8f", textTransform:"uppercase", letterSpacing:"0.02em", marginLeft:"-5vh" }}>
//                         J COSMOPOLIS.
//                       </h1>
//                       <p className="jc-line3" style={{ margin:0, fontFamily:"Montserrat,sans-serif", fontWeight:500, fontSize:"clamp(1.5rem,3.5vw,3.0rem)", lineHeight:1.5, color:"#8f8f8f", textTransform:"uppercase", letterSpacing:"0.041em", marginLeft:"-70vh" }}>
//                         SIGN UP TO YOUR XXL LIFE.
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               ) : (
//                 /* ══ COLOR SLIDES ════════════════════════════════════ */
//                 <div className="hc-inner" style={{ position:"relative", zIndex:2 }}>
//                   {/* Left: Title */}
//                   <div style={{ flex:"0 0 45%", display:"flex", flexDirection:"column" }}>
//                     <h2
//                       className="hc-title"
//                       style={{ fontSize: slide.titleSize, fontWeight: slide.fontWeight }}
//                     >
//                       {slide.title}
//                     </h2>
//                     <div className="hc-underline" />
//                   </div>

//                   {/* Right: Cards */}
//                   <div style={{ flex:"0 0 46%", maxWidth:520 }}>
//                     <div className="hc-cards">
//                       {slide.cards?.map((card, i) => {
//                         const col = i % 2 === 0 ? "left" : "right" as "left" | "right";
//                         const row = i < 2 ? "top" : "bottom" as "top" | "bottom";
//                         return (
//                           <GlassCard
//                             key={`${key}-${i}`}
//                             name={card.name}
//                             time={card.time}
//                             bg={slide.cardBg ?? ""}
//                             border={slide.cardBorder ?? ""}
//                             delay={0.35 + i * 0.12}
//                             col={col}
//                             row={row}
//                           />
//                         );
//                       })}
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </div>
//           );
//         })}

//         {/* ── Arrows ──────────────────────────────────────────────── */}
//         <button className="hc-arrow prev" onClick={() => goTo((active - 1 + N) % N)} aria-label="Previous" style={{ zIndex:40 }}>‹</button>
//         <button className="hc-arrow next" onClick={() => goTo((active + 1) % N)}     aria-label="Next"     style={{ zIndex:40 }}>›</button>

//         {/* ── Dots ────────────────────────────────────────────────── */}
//         <div style={{ position:"absolute", bottom:20, left:"50%", transform:"translateX(-50%)", display:"flex", gap:10, zIndex:40 }}>
//           {SLIDES.map((_, i) => (
//             <button key={i} className={`hc-dot ${i === active ? "active" : ""}`} onClick={() => goTo(i)} aria-label={`Slide ${i + 1}`} />
//           ))}
//         </div>

//         {/* ── Progress bar ────────────────────────────────────────── */}
//         <div className="hc-progress">
//           <div key={`pb-${progKey}`} className="hc-progress-bar" />
//         </div>

//         {/* ── Counter ─────────────────────────────────────────────── */}
//         <div style={{ position:"absolute", top:92, right:28, fontFamily:"'Montserrat',sans-serif", fontWeight:500, fontSize:11, letterSpacing:"0.18em", color: isHero ? "rgba(0,0,0,0.25)" : "rgba(255,255,255,0.4)", zIndex:40 }}>
//           {String(active + 1).padStart(2,"0")} / {String(N).padStart(2,"0")}
//         </div>
//       </section>
//     </>
//   );
// }
"use client";
import React, { useEffect, useState, useRef, useCallback } from "react";

const SLIDES = [
  { id: "hero" },
  {
    id: "strategic",
    bg: "linear-gradient(150deg, #8B1A8B 0%, #B020B8 30%, #CC28CC 55%, #E850E8 75%, #F060D8 100%)",
    title: "STRATEGIC\nLOCATION",
    titleSize: "clamp(3rem,7vw,6rem)",
    fontWeight: 300,
    cards: [
      { name: "NEOPOLIS", sub: "10min", col: 0, row: 0 },
      { name: "ORR Exit\n1A", sub: "12min", col: 1, row: 0 },
      { name: "RGIA", sub: "35 min", col: 0, row: 1 },
      { name: "Gaudium\nSchool", sub: "15 min", col: 1, row: 1 },
    ],
    cardGradLeft:
      "linear-gradient(140deg, rgba(100, 15, 120, 0.75) 0%, rgba(140, 30, 160, 0.60) 100%)",
    cardGradRight:
      "linear-gradient(140deg, rgba(140, 30, 160, 0.65) 0%, rgba(110, 20, 140, 0.50) 100%)",
    cardBorder: "rgba(255, 255, 255, 0.18)",
  },
  {
    id: "openspaces",
    bg: "linear-gradient(150deg, #6B18E8 0%, #7B2BF5 35%, #8830F0 65%, #9940F8 100%)",
    title: "68%\nOPEN\nSPACES",
    titleSize: "clamp(3rem,7.5vw,6.5rem)",
    fontWeight: 300,
    cards: [
      { name: "1.93 acre", sub: "", col: 0, row: 0 },
      { name: "3 BHK", sub: "", col: 1, row: 0 },
      { name: "1837–2713 sft", sub: "", col: 0, row: 1 },
      { name: "10ft. wide\ncorridor", sub: "", col: 1, row: 1 },
    ],
    cardGradLeft:
      "linear-gradient(140deg, rgba(210, 100, 230, 0.68) 0%, rgba(190, 80, 215, 0.55) 100%)",
    cardGradRight:
      "linear-gradient(140deg, rgba(220, 110, 235, 0.60) 0%, rgba(200, 90, 220, 0.48) 100%)",
    cardBorder: "rgba(255, 255, 255, 0.20)",
  },
  {
    id: "undivided",
    bg: "linear-gradient(150deg, #1E30E8 0%, #2B3EF0 40%, #3348F5 70%, #4055F8 100%)",
    title: "HIGHER\nUNDIVIDED\nSHARE",
    titleSize: "clamp(2.6rem,6.5vw,5.8rem)",
    fontWeight: 300,
    cards: [
      { name: "40–62 sq\nyard per flat", sub: "", col: 0, row: 1 },
      { name: "Greater\nasset value", sub: "", col: 1, row: 0 },
      { name: "Long term\nappreciation", sub: "", col: 1, row: 1 },
    ],
    cardGradLeft:
      "linear-gradient(140deg, rgba(30, 55, 200, 0.72) 0%, rgba(40, 65, 215, 0.58) 100%)",
    cardGradRight:
      "linear-gradient(140deg, rgba(35, 60, 210, 0.68) 0%, rgba(45, 70, 220, 0.55) 100%)",
    cardBorder: "rgba(255, 255, 255, 0.13)",
  },
];

const LEFT_PATH =
  "M0,0.09 C0,0.04 0.04,0 0.09,0 L0.96,0.05 C0.98,0.05 1,0.07 1,0.09 L1,0.91 C1,0.96 0.96,1 0.91,1 L0.09,1 C0.04,1 0,0.96 0,0.91 Z";
const RIGHT_PATH =
  "M0,0.05 C0,0.02 0.02,0 0.05,0 L0.91,0 C0.96,0 1,0.04 1,0.09 L1,0.91 C1,0.96 0.96,1 0.91,0.95 L0.04,0.91 C0.02,0.90 0,0.88 0,0.86 Z";

let _clipUid = 0;

function WarpedCard({ name, sub, isLeft, gradient, delay }) {
  const [uid] = useState(() => `wc${++_clipUid}`);
  const [hov, setHov] = useState(false);
  if (!name) return <div />;

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        paddingBottom: "70%",
        opacity: 0,
        animation: `vscroll-in 0.72s cubic-bezier(0.22,1,0.36,1) ${delay}s forwards`,
      }}
    >
      <svg
        width="0"
        height="0"
        style={{ position: "absolute", pointerEvents: "none" }}
      >
        <defs>
          <clipPath id={uid} clipPathUnits="objectBoundingBox">
            <path d={isLeft ? LEFT_PATH : RIGHT_PATH} />
          </clipPath>
        </defs>
      </svg>
      <div
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        style={{
          position: "absolute",
          inset: 0,
          background: gradient,
          clipPath: `url(#${uid})`,
          WebkitClipPath: `url(#${uid})`,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "0 14% 14%",
          boxSizing: "border-box",
          transition:
            "filter 0.30s ease, transform 0.30s cubic-bezier(0.22,1,0.36,1)",
          filter: hov ? "brightness(1.20) saturate(1.12)" : "brightness(1)",
          transform: hov ? "scale(1.045)" : "scale(1)",
          cursor: "default",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "48%",
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.12) 0%, transparent 100%)",
            pointerEvents: "none",
          }}
        />
        <p
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 300,
            fontSize: "clamp(0.88rem,1.75vw,1.25rem)",
            color: "rgba(255,255,255,0.96)",
            margin: 0,
            lineHeight: 1.35,
            whiteSpace: "pre-line",
            position: "relative",
            zIndex: 1,
          }}
        >
          {name}
        </p>
        {sub ? (
          <p
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 300,
              fontSize: "clamp(0.80rem,1.45vw,1.08rem)",
              color: "rgba(255,255,255,0.72)",
              margin: "4px 0 0",
              lineHeight: 1.3,
              position: "relative",
              zIndex: 1,
            }}
          >
            {sub}
          </p>
        ) : null}
      </div>
    </div>
  );
}

function CardGrid({ slide, animKey }) {
  const grid = [
    [null, null],
    [null, null],
  ];
  slide.cards.forEach((c) => {
    grid[c.row][c.col] = c;
  });
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "clamp(10px,1.5vw,22px)",
        width: "100%",
      }}
    >
      {[0, 1].flatMap((row) =>
        [0, 1].map((col) => {
          const card = grid[row][col];
          const key = `${row}-${col}`;
          if (!card) return <div key={key} />;
          return (
            <WarpedCard
              key={`${animKey}-${key}`}
              name={card.name}
              sub={card.sub}
              isLeft={col === 0}
              gradient={col === 0 ? slide.cardGradLeft : slide.cardGradRight}
              delay={0.12 + (row * 2 + col) * 0.13}
            />
          );
        }),
      )}
    </div>
  );
}

export default function HeroCarousel() {
  const [active, setActive] = useState(0);
  const [animKey, setAnimKey] = useState(0);
  const [dir, setDir] = useState(1);
  const [phase, setPhase] = useState("idle");
  const [paused, setPaused] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const timerRef = useRef(null);
  const touchRef = useRef(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setPaused((p) => {
        if (!p) {
          setDir(1);
          setPhase("leaving");
        }
        return p;
      });
    }, 10000);
  }, []);

  useEffect(() => {
    if (phase !== "leaving") return;
    const t = setTimeout(() => {
      setActive((prev) =>
        dir === 1
          ? (prev + 1) % SLIDES.length
          : (prev - 1 + SLIDES.length) % SLIDES.length,
      );
      setAnimKey((k) => k + 1);
      setPhase("entering");
      startTimer();
    }, 460);
    return () => clearTimeout(t);
  }, [phase, dir, startTimer]);

  useEffect(() => {
    if (phase === "entering") {
      const t = setTimeout(() => setPhase("idle"), 850);
      return () => clearTimeout(t);
    }
  }, [phase]);

  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [startTimer]);

  const goTo = useCallback(
    (next) => {
      if (phase !== "idle" || next === active) return;
      setDir(next > active ? 1 : -1);
      setPhase("leaving");
    },
    [active, phase],
  );

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown")
        goTo((active + 1) % SLIDES.length);
      else if (e.key === "ArrowLeft" || e.key === "ArrowUp")
        goTo((active - 1 + SLIDES.length) % SLIDES.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, goTo]);

  const onTouchStart = useCallback((e) => {
    touchRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  }, []);

  const onTouchEnd = useCallback(
    (e) => {
      if (!touchRef.current) return;
      const dx = e.changedTouches[0].clientX - touchRef.current.x;
      const dy = e.changedTouches[0].clientY - touchRef.current.y;
      touchRef.current = null;
      if (Math.abs(dx) < 30 && Math.abs(dy) < 30) return;
      if (Math.abs(dx) >= Math.abs(dy))
        dx < 0
          ? goTo((active + 1) % SLIDES.length)
          : goTo((active - 1 + SLIDES.length) % SLIDES.length);
      else
        dy < 0
          ? goTo((active + 1) % SLIDES.length)
          : goTo((active - 1 + SLIDES.length) % SLIDES.length);
    },
    [active, goTo],
  );

  const slide = SLIDES[active];
  const isHero = slide.id === "hero";

  const leavingAnim =
    dir === 1
      ? "vs-out-up 0.46s cubic-bezier(0.77,0,0.175,1) forwards"
      : "vs-out-down 0.46s cubic-bezier(0.77,0,0.175,1) forwards";
  const enteringAnim =
    dir === 1
      ? "vs-in-down 0.72s cubic-bezier(0.22,1,0.36,1) forwards"
      : "vs-in-up 0.72s cubic-bezier(0.22,1,0.36,1) forwards";
  const wrapAnim =
    phase === "leaving"
      ? leavingAnim
      : phase === "entering"
        ? enteringAnim
        : "none";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@200;300;400;500;600;700&display=swap');

        @keyframes vs-out-up   { from{opacity:1;transform:translateY(0)}     to{opacity:0;transform:translateY(-64px)} }
        @keyframes vs-out-down { from{opacity:1;transform:translateY(0)}     to{opacity:0;transform:translateY(64px)}  }
        @keyframes vs-in-down  { from{opacity:0;transform:translateY(64px)}  to{opacity:1;transform:translateY(0)}     }
        @keyframes vs-in-up    { from{opacity:0;transform:translateY(-64px)} to{opacity:1;transform:translateY(0)}     }

        @keyframes vscroll-in {
          0%   { opacity:0; transform:translateY(56px) perspective(600px) rotateX(16deg) scale(0.90); }
          60%  { opacity:1; }
          100% { opacity:1; transform:translateY(0) perspective(600px) rotateX(0deg) scale(1); }
        }

        @keyframes line-scroll-up {
          from { opacity:0; transform:translateY(100%); }
          to   { opacity:1; transform:translateY(0%); }
        }

        @keyframes title-float {
          0%,100% { transform:translateY(0px); }
          50%     { transform:translateY(-10px); }
        }

        @keyframes line-grow {
          from { transform:scaleX(0); opacity:0; }
          to   { transform:scaleX(1); opacity:1; }
        }

        @keyframes hero-building-fade {
          0% { opacity: 0; transform: scale(0.95); }
          100% { opacity: 1; transform: scale(1); }
        }

        @keyframes hero-xxl-slide {
          0% { opacity: 0; transform: translateX(-50px); }
          100% { opacity: 1; transform: translateX(0); }
        }

        @keyframes hero-text-slide {
          0% { opacity: 0; transform: translateX(50px); }
          100% { opacity: 1; transform: translateX(0); }
        }

        @keyframes orb-pulse {
          0%,100%{opacity:0.05;transform:scale(1)} 50%{opacity:0.12;transform:scale(1.08)}
        }

        .hc-wrap{position:absolute;inset:0;width:100%;height:100%;will-change:transform,opacity;}
        .hc-underline{
          height:2px;width:80px;background:rgba(255,255,255,0.38);
          margin-top:22px;transform-origin:left;opacity:0;
          animation:line-grow 0.62s cubic-bezier(0.22,1,0.36,1) 0.60s forwards;
        }

        .hc-dot{
          width:9px;height:9px;border-radius:50%;
          border:2px solid rgba(255,255,255,0.55);
          background:transparent;cursor:pointer;padding:0;
          transition:background .25s,transform .25s,border-color .25s;
        }
        .hc-dot.active{background:#fff;border-color:#fff;transform:scale(1.35)}

        .hc-arrow{
          position:absolute;top:50%;transform:translateY(-50%);
          width:46px;height:46px;border-radius:50%;
          border:1.5px solid rgba(255,255,255,0.28);
          background:rgba(255,255,255,0.10);
          color:#fff;font-size:1.55rem;line-height:1;
          display:flex;align-items:center;justify-content:center;
          cursor:pointer;z-index:30;
          transition:background .2s,transform .22s;
          backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);
        }
        .hc-arrow:hover{background:rgba(255,255,255,0.22);transform:translateY(-50%) scale(1.1)}
        .hc-arrow.prev{left:20px} .hc-arrow.next{right:20px}

        .hc-progress{position:absolute;bottom:0;left:0;right:0;height:3px;z-index:30;background:rgba(255,255,255,0.10)}
        .hc-progress-bar{height:100%;background:rgba(255,255,255,0.62);transform-origin:left;animation:hc-progress 10s linear forwards}

        @keyframes hc-progress { from{transform:scaleX(0)} to{transform:scaleX(1)} }

        .hc-inner{
          width:100%;height:100%;
          display:flex;align-items:center;justify-content:space-between;
          padding:80px 8vw 60px 8vw;gap:4vw;box-sizing:border-box;
        }

        @media(max-width:1024px){
          .hc-inner{
            padding:60px 6vw 50px 6vw;
            gap:3vw;
          }
          .hc-arrow{
            width:40px;height:40px;font-size:1.3rem;
          }
          .hc-arrow.prev{left:12px}
          .hc-arrow.next{right:12px}
        }

        @media(max-width:768px){
          .hc-inner{
            flex-direction:column;
            padding:60px 20px 80px 20px;
            gap:40px;
            justify-content:flex-start;
            align-items:stretch;
            overflow-y:auto;
            max-height:100vh;
          }
          .hc-arrow{display:none}
          .hc-underline{margin-top:16px;width:60px;}

          .hc-dot{width:7px;height:7px;border-width:1.5px;}
          .hc-dot.active{transform:scale(1.25);}
        }

        @media(max-width:480px){
          .hc-inner{
            padding:50px 14px 70px 14px;
            gap:32px;
          }
        }
      `}</style>

      <section
        style={{
          height: "100vh",
          overflow: "hidden",
          position: "relative",
          zIndex: 1,
        }}
        onMouseEnter={() => setPaused(false)}
        onMouseLeave={() => setPaused(true)}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {/* HERO SLIDE */}
        {isHero && (
          <div
            key={`hero-${animKey}`}
            className="hc-wrap"
            style={{ animation: wrapAnim }}
          >
            <div style={{ position: "absolute", inset: 0 }} />

            {isMobile ? (
              /* ===== MOBILE HERO ===== */
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  height: "100vh",
                  overflow: "hidden",
                  backgroundColor: "#E8E8E8",
                }}
              >
                {/* EXPERIENCE LIVING */}

                {/* Building — top right */}
                <div
                  style={{
                    position: "absolute",
                    right: "70px",
                    top: 0,
                    width: "55%",
                    height: "62%",
                    zIndex: 2,
                    opacity: 0,
                    animation: "hero-building-fade 0.8s ease-out 0.2s forwards",
                  }}
                >
                  <img
                    src="https://thomestowers.com/wp-content/uploads/2026/03/Image_-1.png"
                    alt="J Cosmopolis Building"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                      objectPosition: "bottom right",
                    }}
                  />
                </div>

                {/* XXL Logo — left, overlapping building */}
                <div
                  style={{
                    position: "absolute",
                    left: 30,
                    bottom: "36%",
                    width: "60%",
                    zIndex: 100,
                    opacity: 100,
                    animation:
                      "hero-xxl-slide 0.9s cubic-bezier(0.22,1,0.36,1) 0.3s forwards",
                  }}
                >
                  <img
                    src="https://thomestowers.com/wp-content/uploads/2026/03/Path_-_Path_-_Compound-Path_-_Path_-_Compound-Path_-_Path_-_Path_-_Path_-_Path_-_Path_-_Path_-_Path_-_Path_-_Path_-_Path_-_Path_-2.png"
                    alt="XXL Logo"
                    style={{ width: "100%", height: "auto", display: "block" }}
                  />
                </div>

                {/* Thin divider line */}
                <div
                  style={{
                    position: "absolute",
                    bottom: "27%",
                    left: "10%",
                    right: "10%",
                    height: "1px",
                    background: "rgba(0,0,0,0.12)",
                    zIndex: 4,
                  }}
                />

                {/* CONNECTIVITY / SPACE / LUXURY / BENEFITS */}
                <div
                  style={{
                    position: "absolute",
                    bottom: "4%",
                    left: 0,
                    right: 0,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "6px",
                    zIndex: 4,
                  }}
                >
                  {["CONNECTIVITY", "SPACE", "LUXURY", "BENEFITS"].map(
                    (word) => (
                      <span
                        key={word}
                        style={{
                          fontFamily: "'Montserrat', sans-serif",
                          fontSize: "13px",
                          fontWeight: 400,
                          letterSpacing: "0.16em",
                          color: "#888",
                          textTransform: "uppercase",
                        }}
                      >
                        {word}
                      </span>
                    ),
                  )}
                </div>
              </div>
            ) : (
              /* ===== DESKTOP HERO ===== */
              <>
                <div
                  style={{
                    position: "absolute",
                    left: "19%",
                    bottom: "4%",
                    width: "38%",
                    zIndex: 100,
                    opacity: 100,
                    animation:
                      "hero-xxl-slide 0.9s cubic-bezier(0.22,1,0.36,1) 0.3s forwards",
                  }}
                >
                  <img
                    src="https://thomestowers.com/wp-content/uploads/2026/03/Path_-_Path_-_Compound-Path_-_Path_-_Compound-Path_-_Path_-_Path_-_Path_-_Path_-_Path_-_Path_-_Path_-_Path_-_Path_-_Path_-_Path_-2.png"
                    alt="XXL Logo"
                    style={{ width: "100%", height: "auto", display: "block" }}
                  />
                </div>

                <div
                  style={{
                    position: "absolute",
                    left: "39%",
                    bottom: "10%",
                    top: 0,
                    zIndex: 50,
                    display: "flex",
                    alignItems: "flex-end",
                    justifyContent: "center",
                    opacity: 0,
                    animation: "hero-building-fade 0.8s ease-out 0.2s forwards",
                  }}
                >
                  <img
                    src="https://thomestowers.com/wp-content/uploads/2026/03/Image_-1.png"
                    alt="J Cosmopolis Building"
                    style={{
                      height: "60%",
                      width: "auto",
                      objectFit: "contain",
                      display: "block",
                    }}
                  />
                </div>

                <div
                  style={{
                    position: "absolute",
                    right: "21%",
                    top: "45%",
                    transform: "translateY(-50%)",
                    zIndex: 3,
                    opacity: 0,
                    animation:
                      "hero-text-slide 0.9s cubic-bezier(0.22,1,0.36,1) 0.5s forwards",
                  }}
                >
                  {["CONNECTIVITY", "SPACE", "LUXURY", "BENEFITS"].map(
                    (word) => (
                      <h2
                        key={word}
                        style={{
                          fontFamily: "'Montserrat', sans-serif",
                          fontWeight: 450,
                          fontSize: "clamp(30px, 3.2vw, 35px)",
                          lineHeight: 1.35,
                          letterSpacing: "0.10em",
                          color: "#AAAAAA",
                          margin: 0,
                          textTransform: "uppercase",
                        }}
                      >
                        {word}
                      </h2>
                    ),
                  )}
                </div>
              </>
            )}
          </div>
        )}

        {/* COLOR SLIDES */}
        {!isHero && (
          <div
            key={`slide-${animKey}`}
            className="hc-wrap"
            style={{ background: slide.bg, animation: wrapAnim }}
          >
            {/* Ambient orbs */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                pointerEvents: "none",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: "-20%",
                  right: "6%",
                  width: "54vw",
                  height: "54vw",
                  borderRadius: "50%",
                  background:
                    "radial-gradient(circle, rgba(255,255,255,0.10) 0%, transparent 65%)",
                  animation: "orb-pulse 6s ease-in-out infinite",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: "-16%",
                  left: "0",
                  width: "40vw",
                  height: "40vw",
                  borderRadius: "50%",
                  background:
                    "radial-gradient(circle, rgba(0,0,0,0.22) 0%, transparent 65%)",
                }}
              />
            </div>

            <div className="hc-inner">
              {/* Title */}
              <div
                style={{
                  flex: "0 0 42%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div
                  key={`title-${animKey}`}
                  style={{
                    animation: "title-float 4s ease-in-out 0.90s infinite",
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.08em",
                  }}
                >
                  {slide.title?.split("\n").map((line, i) => (
                    <div
                      key={i}
                      style={{ overflow: "hidden", lineHeight: 1.08 }}
                    >
                      <span
                        style={{
                          display: "block",
                          fontFamily: "'Montserrat', sans-serif",
                          color: "rgba(255,255,255,0.97)",
                          textTransform: "uppercase",
                          letterSpacing: "0.01em",
                          lineHeight: 1.06,
                          fontSize: slide.titleSize,
                          fontWeight: slide.fontWeight,
                          textShadow: "0 4px 40px rgba(0,0,0,0.20)",
                          opacity: 0,
                          animation: `line-scroll-up 0.72s cubic-bezier(0.22,1,0.36,1) ${0.05 + i * 0.14}s forwards`,
                        }}
                      >
                        {line}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="hc-underline" />
              </div>

              {/* Cards */}
              <div style={{ flex: "0 0 50%", maxWidth: 520 }}>
                <CardGrid slide={slide} animKey={animKey} />
              </div>
            </div>
          </div>
        )}

        {/* Navigation Arrows */}
        <button
          className="hc-arrow prev"
          onClick={() => goTo((active - 1 + SLIDES.length) % SLIDES.length)}
          aria-label="Previous"
        >
          ‹
        </button>
        <button
          className="hc-arrow next"
          onClick={() => goTo((active + 1) % SLIDES.length)}
          aria-label="Next"
        >
          ›
        </button>

        {/* Dots */}
        <div
          style={{
            position: "absolute",
            bottom: 20,
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            gap: 10,
            zIndex: 30,
          }}
        >
          {SLIDES.map((_, i) => (
            <button
              key={i}
              className={`hc-dot ${i === active ? "active" : ""}`}
              onClick={() => goTo(i)}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>

        {/* Progress bar */}
        <div className="hc-progress">
          <div
            key={`pb-${animKey}-${active}`}
            className="hc-progress-bar"
            style={{ animationPlayState: paused ? "paused" : "running" }}
          />
        </div>

        {/* Slide counter */}
        <div
          style={{
            position: "absolute",
            top: 30,
            right: 40,
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 500,
            fontSize: 12,
            letterSpacing: "0.18em",
            color: isHero ? "rgba(0,0,0,0.25)" : "rgba(255,255,255,0.38)",
            zIndex: 30,
          }}
        >
          {String(active + 1).padStart(2, "0")} /{" "}
          {String(SLIDES.length).padStart(2, "0")}
        </div>

        {/* Pause badge */}
        {paused && (
          <div
            style={{
              position: "absolute",
              top: 20,
              right: 28,
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 300,
              fontSize: 11,
              letterSpacing: "0.14em",
              color: isHero ? "rgba(0,0,0,0.20)" : "rgba(255,255,255,0.28)",
              zIndex: 30,
            }}
          >
            PAUSED
          </div>
        )}
      </section>
    </>
  );
}
