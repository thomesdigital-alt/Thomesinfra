"use client";
import React, { useEffect, useState, useRef, useCallback } from "react";
type Slide = {
  id: string;
  bg?: string;
  title?: string;
  titleSize?: string;
  fontWeight?: number;
  cards?: Card[];
  cardGradLeft?: string;
  cardGradRight?: string;
  cardBorder?: string;
};
const SLIDES = [
  { id: "hero" },
  {
    id: "strategic",
    bg: "url('https://thomestowers.com/wp-content/uploads/2026/03/Path_-4-scaled.png') center/cover no-repeat",
    title: "STRATEGIC\nLOCATION",
    titleSize: "clamp(2.2rem,5.5vw,6rem)",
    fontWeight: 400,
    cards: [
      {
        name: " ",
        sub: "",
        col: 0,
        row: 0,
        img: "https://thomestowers.com/wp-content/uploads/2026/03/Path_-1.png",
      },
      {
        name: " ",
        sub: "",
        col: 1,
        row: 0,
        img: "https://thomestowers.com/wp-content/uploads/2026/03/Path_-2.png",
      },
      {
        name: " ",
        sub: "",
        col: 0,
        row: 1,
        img: "https://thomestowers.com/wp-content/uploads/2026/03/Path_.png",
      },
      {
        name: " ",
        sub: "",
        col: 1,
        row: 1,
        img: "https://thomestowers.com/wp-content/uploads/2026/03/Path_-3.png",
      },
    ],
    cardGradLeft: "transparent",
    cardGradRight: "transparent",
    cardBorder: "transparent",
  },
  {
    id: "openspaces",
    bg: "url('https://thomestowers.com/wp-content/uploads/2026/03/Path_-13-scaled.png') center/cover no-repeat",
    title: "68%\nOPEN\nSPACES",
    titleSize: "clamp(2.2rem,5.5vw,6.5rem)",
    fontWeight: 400,
    cards: [
      {
        name: " ",
        sub: "",
        col: 0,
        row: 0,
        img: "https://thomestowers.com/wp-content/uploads/2026/03/Path_-12.png",
      },
      {
        name: " ",
        sub: "",
        col: 1,
        row: 0,
        img: "https://thomestowers.com/wp-content/uploads/2026/03/Path_-11.png",
      },
      {
        name: " ",
        sub: "",
        col: 0,
        row: 1,
        img: "https://thomestowers.com/wp-content/uploads/2026/03/Path_-10.png",
      },
      {
        name: " ",
        sub: "",
        col: 1,
        row: 1,
        img: "https://thomestowers.com/wp-content/uploads/2026/03/Path_-9.png",
      },
    ],
    cardGradLeft:
      "linear-gradient(140deg, rgba(210,100,230,0.68) 0%, rgba(190,80,215,0.55) 100%)",
    cardGradRight:
      "linear-gradient(140deg, rgba(220,110,235,0.60) 0%, rgba(200,90,220,0.48) 100%)",
    cardBorder: "rgba(255,255,255,0.20)",
  },
  {
    id: "undivided",
    bg: "url('https://thomestowers.com/wp-content/uploads/2026/03/Path_-8-scaled.png') center/cover no-repeat",
    title: "HIGHER\nUNDIVIDED\nSHARE",
    titleSize: "clamp(2rem,5vw,5.8rem)",
    fontWeight: 400,
    cards: [
      {
        name: " ",
        sub: "",
        col: 0,
        row: 0,
        img: "https://thomestowers.com/wp-content/uploads/2026/03/Path_-6.png",
      },
      {
        name: " ",
        sub: "",
        col: 1,
        row: 0,
        img: "https://thomestowers.com/wp-content/uploads/2026/03/Path_-7.png",
      },
      {
        name: " ",
        sub: "",
        col: 0,
        row: 1,
        img: "https://thomestowers.com/wp-content/uploads/2026/03/Path_-5.png",
      },
    ],
    cardGradLeft:
      "linear-gradient(140deg, rgba(30,55,200,0.72) 0%, rgba(40,65,215,0.58) 100%)",
    cardGradRight:
      "linear-gradient(140deg, rgba(35,60,210,0.68) 0%, rgba(45,70,220,0.55) 100%)",
    cardBorder: "rgba(255,255,255,0.13)",
  },
];

let _clipUid = 0;
type Card = {
  name: string;
  sub: string;
  col: number;
  row: number;
  img?: string;
};

type WarpedCardProps = {
  name: string;
  sub: string;
  isLeft: boolean;
  gradient?: string;
  delay: number;
  img?: string;
};

function WarpedCard({
  name,
  sub,
  isLeft,
  gradient,
  delay,
  img,
}: WarpedCardProps) {
  const [uid] = useState(() => `wc${++_clipUid}`);
  const [hov, setHov] = useState(false);
  if (!name) return <div />;

  const LEFT_PATH =
    "M0,0.09 C0,0.04 0.04,0 0.09,0 L0.96,0.05 C0.98,0.05 1,0.07 1,0.09 L1,0.91 C1,0.96 0.96,1 0.91,1 L0.09,1 C0.04,1 0,0.96 0,0.91 Z";
  const RIGHT_PATH =
    "M0,0.05 C0,0.02 0.02,0 0.05,0 L0.91,0 C0.96,0 1,0.04 1,0.09 L1,0.91 C1,0.96 0.96,1 0.91,0.95 L0.04,0.91 C0.02,0.90 0,0.88 0,0.86 Z";

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
      {!img && (
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
      )}
      <div
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          ...(img
            ? {}
            : {
                background: gradient,
                clipPath: `url(#${uid})`,
                WebkitClipPath: `url(#${uid})`,
              }),
          transition:
            "filter 0.30s ease, transform 0.30s cubic-bezier(0.22,1,0.36,1)",
          filter: hov ? "brightness(1.20) saturate(1.12)" : "brightness(1)",
          transform: hov ? "scale(1.045)" : "scale(1)",
          cursor: "default",
        }}
      >
        {img && (
          <img
            src={img}
            alt=""
            style={{
              position: "absolute",
              inset: 0,
              width: "70%",
              height: "auto",
              objectFit: "contain",
              pointerEvents: "none",
              userSelect: "none",
            }}
          />
        )}
        {!img && (
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
        )}
        <div
          style={{
            position: "relative",
            zIndex: 1,
            padding: "0 14% 14%",
            boxSizing: "border-box",
          }}
        >
          <p
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 300,
              fontSize: "clamp(0.75rem,1.5vw,1.25rem)",
              color: "rgba(255,255,255,0.96)",
              margin: 0,
              lineHeight: 1.35,
              whiteSpace: "pre-line",
            }}
          >
            {name}
          </p>
          {sub ? (
            <p
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 300,
                fontSize: "clamp(0.70rem,1.2vw,1.08rem)",
                color: "rgba(255,255,255,0.72)",
                margin: "4px 0 0",
                lineHeight: 1.3,
              }}
            >
              {sub}
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
type CardGridProps = {
  slide: Slide;
  animKey: number;
};

function CardGrid({ slide, animKey }: CardGridProps) {
  const grid: (Card | null)[][] = [
    [null, null],
    [null, null],
  ];
  slide.cards?.forEach((c) => {
    grid[c.row][c.col] = c;
  });
  return (
    <div
      style={{
        display: "grid",
        // ── CHANGED: was "repeat(2, minmax(280px, 260px))" — fixed overflow on mobile ──
        gridTemplateColumns: "repeat(2, 1fr)",
        columnGap: 0,
        rowGap: "clamp(10px, 2vw, 24px)",
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
              img={card.img}
              delay={0.12 + (row * 2 + col) * 0.13}
            />
          );
        }),
      )}
    </div>
  );
}

// ── ADDED: onHeroChange prop ──
export default function HeroCarousel({
  onHeroChange,
}: {
  onHeroChange?: (isHero: boolean) => void;
}) {
  const [active, setActive] = useState(0);
  const [animKey, setAnimKey] = useState(0);
  const [dir, setDir] = useState(1);
  const [phase, setPhase] = useState("idle");
  const [paused, setPaused] = useState(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const touchRef = useRef<{ x: number; y: number } | null>(null);

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
      setActive((prev) => {
        const next =
          dir === 1
            ? (prev + 1) % SLIDES.length
            : (prev - 1 + SLIDES.length) % SLIDES.length;
        onHeroChange?.(SLIDES[next].id === "hero");
        return next;
      });
      setAnimKey((k) => k + 1);
      setPhase("entering");
      startTimer();
    }, 460);
    return () => clearTimeout(t);
  }, [phase, dir, startTimer, onHeroChange]);

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
    (next: number) => {
      if (phase !== "idle" || next === active) return;
      setDir(next > active ? 1 : -1);
      setPhase("leaving");
      onHeroChange?.(SLIDES[next].id === "hero");
    },
    [active, phase, onHeroChange],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown")
        goTo((active + 1) % SLIDES.length);
      else if (e.key === "ArrowLeft" || e.key === "ArrowUp")
        goTo((active - 1 + SLIDES.length) % SLIDES.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, goTo]);

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    touchRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  }, []);

  const onTouchEnd = useCallback(
    (e: React.TouchEvent) => {
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

        *, *::before, *::after { box-sizing: border-box; }

        @keyframes vs-out-up   { from{opacity:1;transform:translateY(0)}    to{opacity:0;transform:translateY(-64px)} }
        @keyframes vs-out-down { from{opacity:1;transform:translateY(0)}    to{opacity:0;transform:translateY(64px)}  }
        @keyframes vs-in-down  { from{opacity:0;transform:translateY(64px)} to{opacity:1;transform:translateY(0)}     }
        @keyframes vs-in-up    { from{opacity:0;transform:translateY(-64px)}to{opacity:1;transform:translateY(0)}     }

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
          0%   { opacity:0; transform:scale(0.95); }
          100% { opacity:1; transform:scale(1); }
        }
        @keyframes hero-xxl-slide {
          0%   { opacity:0; transform:translateX(-50px); }
          100% { opacity:1; transform:translateX(0); }
        }
        @keyframes hero-text-slide {
          0%   { opacity:0; transform:translateX(50px); }
          100% { opacity:1; transform:translateX(0); }
        }
        @keyframes orb-pulse {
          0%,100%{opacity:0.05;transform:scale(1)} 50%{opacity:0.12;transform:scale(1.08)}
        }
        @keyframes hc-progress { from{transform:scaleX(0)} to{transform:scaleX(1)} }

        .hc-wrap {
          position: absolute; inset: 0;
          width: 100%; height: 100%;
          will-change: transform, opacity;
        }

        .hc-section {
          height: 100svh;
          min-height: 500px;
          overflow: hidden;
          position: relative;
          z-index: 1;
        }

        .hc-inner {
          width: 100%; height: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: clamp(60px,7vh,100px) clamp(24px,8vw,120px) clamp(50px,6vh,80px);
          gap: clamp(20px,4vw,60px);
        }

        .hc-title-col {
          flex: 0 0 42%;
          min-width: 0;
          display: flex;
          flex-direction: column;
        }

        .hc-card-col {
          flex: 0 0 50%;
          max-width: 520px;
          min-width: 0;
        }

        .hc-underline {
          height: 2px;
          width: clamp(45px,6vw,80px);
          background: rgba(255,255,255,0.38);
          margin-top: clamp(12px,2vh,22px);
          transform-origin: left;
          opacity: 0;
          animation: line-grow 0.62s cubic-bezier(0.22,1,0.36,1) 0.60s forwards;
        }

        .hc-dot {
          width: clamp(7px,1vw,9px);
          height: clamp(7px,1vw,9px);
          border-radius: 50%;
          border: 2px solid rgba(255,255,255,0.55);
          background: transparent;
          cursor: pointer;
          padding: 0;
          transition: background .25s, transform .25s, border-color .25s;
        }
        .hc-dot.active { background:#fff; border-color:#fff; transform:scale(1.35); }

        .hc-arrow {
          position: absolute; top: 50%; transform: translateY(-50%);
          width: clamp(36px,3.5vw,50px);
          height: clamp(36px,3.5vw,50px);
          border-radius: 50%;
          border: 1.5px solid rgba(255,255,255,0.28);
          background: rgba(255,255,255,0.10);
          color: #fff;
          font-size: clamp(1.2rem,1.8vw,1.6rem);
          line-height: 1;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; z-index: 30;
          transition: background .2s, transform .22s;
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
        }
        .hc-arrow:hover { background:rgba(255,255,255,0.22); transform:translateY(-50%) scale(1.1); }
        .hc-arrow.prev { left: clamp(10px,2vw,28px); }
        .hc-arrow.next { right: clamp(10px,2vw,28px); }

        .hc-progress {
          position: absolute; bottom: 0; left: 0; right: 0;
          height: 3px; z-index: 30;
          background: rgba(255,255,255,0.10);
        }
        .hc-progress-bar {
          height: 100%;
          background: rgba(255,255,255,0.62);
          transform-origin: left;
          animation: hc-progress 10s linear forwards;
        }

        .hero-root {
          position: relative;
          width: 100%; height: 100%;
          overflow: hidden;
        }

        .hero-building {
          position: absolute;
          opacity: 0;
          animation: hero-building-fade 0.8s ease-out 0.2s forwards;
        }

        .hero-logo {
          position: absolute;
          opacity: 0;
          animation: hero-xxl-slide 0.9s cubic-bezier(0.22,1,0.36,1) 0.3s forwards;
          z-index: 100;
        }
        .hero-logo img { width: 100%; height: auto; display: block; }

        .hero-words {
          position: absolute;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          z-index: 4;
          opacity: 0;
          animation: hero-text-slide 0.9s cubic-bezier(0.22,1,0.36,1) 0.5s forwards;
        }
        .hero-word {
          font-family: 'Montserrat', sans-serif;
          font-weight: 400;
          letter-spacing: 0.08em;
          line-height: 1;
          color: #A3A3A3;
          text-transform: uppercase;
          margin: 0;
        }

        /* ── DESKTOP (768px+) — unchanged ── */
        @media (min-width: 768px) {
          .hero-building {
            left: 39%;
            bottom: 10%;
            top: 10%;
            display: flex;
            align-items: flex-end;
            justify-content: center;
            z-index: 50;
          }
          .hero-building img {
            height: 70%;
            width: auto;
            object-fit: contain;
            display: block;
          }
          .hero-logo {
            left: 19%;
            bottom: 3%;
            width: 38%;
          }
          .hero-words {
            right: 14%;
            top: 40%;
            transform: translateY(-50%);
            gap: 0;
          }
          .hero-word {
            font-size: clamp(20px, 3vw, 38px);
            line-height: 1;
          }
        }

        /* ── MOBILE (max 767px) — FIXED ── */
        @media (max-width: 767px) {

          /* colour slides: stack title on top, cards below */
          .hc-inner {
            flex-direction: column;
            justify-content: flex-end;
            align-items: flex-start;
            padding: 80px 20px 56px;
            gap: 14px;
          }
          .hc-title-col {
            flex: 0 0 auto;
            width: 100%;
          }
          .hc-card-col {
            flex: 0 0 auto;
            width: 100%;
            max-width: 100%;
          }

          /* hide arrows on mobile — use swipe instead */
          .hc-arrow { display: none; }
      @media (max-width: 767px) {
          .hero-building {
            right: clamp(10px, 5vw, 42px);
            top: -6px;
            width: 58%;
            height: 58%;
            z-index: 2;
            marginRight: "10px"
          }
          .hero-building img {
            width: 100%; height: 100%;
            object-fit: contain;
            object-position: center bottom;
            
          }

          .hero-logo {
            left: clamp(12px, 4vw, 20px);
            bottom: clamp(32%, 36%, 40%);
            width: clamp(60%, 75%, 82%);
            marginLeft: 30
          }

          .hero-words {
            bottom: clamp(15%, 10%, 14%);
            left: clamp(25%, 25%, 30%);
            gap: clamp(6px, 2vw, 12px);
          }
          .hero-word {
            font-size: clamp(18px, 5vw, 28px);
          }
        }

          /* hero slide elements */
        

        /* ── TABLET (768–1023px) — unchanged ── */
        @media (min-width: 768px) and (max-width: 1023px) {
          .hc-inner {
            flex-direction: column;
            justify-content: center;
            align-items: flex-start;
            padding: clamp(70px,9vh,110px) clamp(20px,6vw,60px) clamp(60px,7vh,80px);
            gap: clamp(24px,3vh,40px);
          }
          .hc-title-col { flex: 0 0 auto; }
          .hc-card-col  { flex: 1 1 auto; width: 100%; max-width: 100%; }
          .hc-arrow { display: none; }
          .hero-building {
            left: auto;
            right: 0;
            bottom: 0;
            top: 0;
            width: 52%;
            height: 100%;
            align-items: center;
          }
          .hero-building img { height: 70%; }
          .hero-logo { left: 4%; bottom: 20%; width: 44%; }
          .hero-words { right: 2%; top: 42%; gap: 2px; }
          .hero-word { font-size: clamp(18px, 2.5vw, 28px); }
        }

        @media (max-height: 500px) {
          .hc-section { height: auto; min-height: 100vh; }
          .hc-inner {
            flex-direction: row;
            padding: 30px 4vw 40px;
            height: auto;
            min-height: 100vh;
          }
        }

        @media (hover: none) and (pointer: coarse) {
          .hc-dot  { width: 12px; height: 12px; padding: 5px; }
          .hc-arrow { width: 48px; height: 48px; }
        }

        @media (prefers-reduced-motion: reduce) {
          .hc-wrap, .hc-underline, .hc-dot,
          .hc-arrow, .hc-progress-bar,
          .hero-building, .hero-logo, .hero-words,
          [style*="animation"] {
            animation: none !important;
            opacity: 1 !important;
            transform: none !important;
            transition: none !important;
          }
        }

        @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
          .hc-underline { height: 1px; }
          .hc-progress  { height: 2px; }
        }

        @media print { .hc-section { display: none; } }
      `}</style>

      <section
        className="hc-section"
        onMouseEnter={() => setPaused(false)}
        onMouseLeave={() => setPaused(true)}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {/* ── HERO SLIDE ── */}
        {isHero && (
          <div
            key={`hero-${animKey}`}
            className="hc-wrap"
            style={{ animation: wrapAnim }}
          >
            <div className="hero-root">
              {/* Building */}
              <div className="hero-building">
                <img
                  src="https://thomestowers.com/wp-content/uploads/2026/03/Image_-1.png"
                  alt="J  Tower Building"
                />
              </div>

              {/* Logo */}
              <div className="hero-logo">
                <img
                  src="https://thomestowers.com/wp-content/uploads/2026/03/Path_-_Path_-_Compound-Path_-_Path_-_Compound-Path_-_Path_-_Path_-_Path_-_Path_-_Path_-_Path_-_Path_-_Path_-_Path_-_Path_-_Path_-2.png"
                  alt="XXL Logo"
                />
              </div>

              {/* Words */}
              <div className="hero-words">
                {["CONNECTIVITY", "SPACE", "LUXURY", "BENEFITS"].map((word) => (
                  <span
                    key={word}
                    className="hero-word"
                    style={{ fontWeight: 400 }}
                  >
                    {word}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── COLOUR SLIDES ── */}
        {!isHero && (
          <div
            key={`slide-${animKey}`}
            className="hc-wrap"
            style={{ background: slide.bg, animation: wrapAnim }}
          >
            {slide.id !== "strategic" && (
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
            )}

            <div className="hc-inner">
              {/* Title column */}
              <div className="hc-title-col">
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

              {/* Cards column */}
              <div className="hc-card-col">
                <CardGrid slide={slide} animKey={animKey} />
              </div>
            </div>
          </div>
        )}

        {/* Arrows */}
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
            gap: "clamp(6px,1vw,10px)",
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
