"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  Calendar, Clock, ArrowLeft, Tag, ArrowRight,
  ChevronRight, BookOpen, ArrowUpRight, MapPin, Share2
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

// ─── Types ────────────────────────────────────────────────────────────────────
type WPPost = {
  id: number;
  slug: string;
  date: string;
  title: { rendered: string };
  content: { rendered: string };
  excerpt: { rendered: string };
  _embedded?: any;
};

type TocItem = { id: string; text: string; level: number };

// ─── Config ───────────────────────────────────────────────────────────────────
const WP_API       = "https://mediumpurple-sandpiper-111248.hostingersite.com/wp-json/wp/v2";
const DEFAULT_IMG  = "https://thomestowers.com/wp-content/uploads/2026/02/Entrance-Gate-Area-Day-NEW-1.webp";

// ─── Domain fix config ────────────────────────────────────────────────────────
// WordPress is hosted on hostinger — strip its domain from all content links
const WP_HOST   = "https://mediumpurple-sandpiper-111248.hostingersite.com";
const SITE_HOST = "https://www.thomestowers.com"; // ← your real domain (Vercel/Vessel)

// ─── Helpers ──────────────────────────────────────────────────────────────────
const stripHtml = (h: string) => h.replace(/<[^>]+>/g, "").trim();

// Rewrite all hostinger URLs inside rendered WordPress HTML:
//   /blogs/[slug]  for post links  (Next.js internal routing)
//   real domain    for media/assets (images stay working)
function fixLinks(html: string): string {
  if (!html) return html;
  return (
    html
      // Internal post links → /blogs/[slug]
      .replace(
        /href="https?:\/\/mediumpurple-sandpiper-111248\.hostingersite\.com\/([^"/?#]+)\/?"/gi,
        (match, path) => {
          // Skip wp-content / wp-admin / wp-json — those are asset/API paths
          if (/^wp-/.test(path)) return match;
          return `href="/blogs/${path}"`;
        }
      )
      // All remaining hostinger URLs (images, CSS, etc.) → real domain
      .replace(/https?:\/\/mediumpurple-sandpiper-111248\.hostingersite\.com/gi, SITE_HOST)
  );
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
}

function readingTime(t: string) {
  return `${Math.max(2, Math.ceil(stripHtml(t).split(/\s+/).length / 200))} min read`;
}

function getImg(post: WPPost): string {
  return post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || DEFAULT_IMG;
}

function getCat(post: WPPost): string {
  return post._embedded?.["wp:term"]?.[0]?.[0]?.name || "Insights";
}

function getTags(post: WPPost): { id: number; name: string; slug: string }[] {
  return post._embedded?.["wp:term"]?.[1] || [];
}

// Extract H2/H3 headings from HTML for Table of Contents
function extractToc(html: string): TocItem[] {
  const matches = [...html.matchAll(/<h([23])[^>]*(?:id="([^"]*)")?[^>]*>(.*?)<\/h[23]>/gi)];
  return matches.map((m, i) => ({
    id:    m[2] || `heading-${i}`,
    text:  stripHtml(m[3]),
    level: parseInt(m[1]),
  })).filter(t => t.text.length > 0).slice(0, 8);
}

// Inject IDs into headings so TOC links work
function injectHeadingIds(html: string): string {
  let i = 0;
  return html.replace(/<h([23])([^>]*)>/gi, (match, level, attrs) => {
    if (attrs.includes("id=")) return match;
    return `<h${level}${attrs} id="heading-${i++}">`;
  });
}

// ─── Table of Contents ────────────────────────────────────────────────────────
function TableOfContents({ items, activeId }: { items: TocItem[]; activeId: string }) {
  if (!items.length) return null;
  return (
    <nav>
      <div className="flex items-center gap-2 mb-4">
        <div className="h-5 w-1 rounded-full" style={{ background: "#F5A623" }} />
        <p className="text-xs font-bold uppercase" style={{ color: "#1A2D6B", letterSpacing: "0.18em" }}>
          Contents
        </p>
      </div>
      <ul className="space-y-1">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className="flex items-center gap-2 py-1.5 text-sm transition-all rounded-lg px-2 group"
              style={{
                paddingLeft: item.level === 3 ? "1.5rem" : "0.5rem",
                color: activeId === item.id ? "#F5A623" : "#6B7A9F",
                background: activeId === item.id ? "rgba(245,166,35,0.08)" : "transparent",
                fontWeight: activeId === item.id ? 600 : 400,
              }}
            >
              <ChevronRight
                className="flex-shrink-0 transition-transform group-hover:translate-x-0.5"
                style={{ width: 12, height: 12, color: activeId === item.id ? "#F5A623" : "#C0CAE0" }}
              />
              <span className="leading-snug">{item.text}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

// ─── Related Post Card ────────────────────────────────────────────────────────
function RelatedCard({ post }: { post: WPPost }) {
  const [imgSrc, setImgSrc] = useState(getImg(post));
  return (
    <Link href={`/blogs/${post.slug}`} className="group flex gap-3 items-start">
      <div className="relative flex-shrink-0 overflow-hidden rounded-xl" style={{ width: 76, height: 60 }}>
        <Image src={imgSrc} alt={post.title.rendered} fill
          className="object-cover transition-transform duration-300 group-hover:scale-110"
          onError={() => setImgSrc(DEFAULT_IMG)} sizes="76px" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-semibold leading-snug line-clamp-2 transition-colors group-hover:text-amber-500 mb-1"
          style={{ color: "#1A2D6B", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}
          dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
        <span className="flex items-center gap-1 text-[10px]" style={{ color: "#A0AABF" }}>
          <Calendar style={{ width: 9, height: 9 }} />
          {formatDate(post.date)}
        </span>
      </div>
    </Link>
  );
}

// ─── Skeleton ────────────────────────────────────────────────────────────────
function Skeleton() {
  return (
    <main style={{ background: "#F8F9FC", minHeight: "100vh" }}>
      <Navbar />
      <div className="animate-pulse">
        <div style={{ height: 480, background: "#E8EDF5" }} />
        <div className="max-w-7xl mx-auto px-6 py-12 grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-4">
            {[90, 100, 80, 95, 70].map((w, i) => (
              <div key={i} style={{ height: 14, background: "#E8EDF5", borderRadius: 8, width: `${w}%` }} />
            ))}
          </div>
          <div className="space-y-3">
            {[1, 2, 3, 4].map(i => (
              <div key={i} style={{ height: 60, background: "#E8EDF5", borderRadius: 12 }} />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function BlogPostPage() {
  const params   = useParams();
  const slug     = params?.slug as string;

  const [post,     setPost]     = useState<WPPost | null>(null);
  const [related,  setRelated]  = useState<WPPost[]>([]);
  const [loading,  setLoading]  = useState(true);
  const [imgSrc,   setImgSrc]   = useState(DEFAULT_IMG);
  const [toc,      setToc]      = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState("");
  const [copied,   setCopied]   = useState(false);
  const articleRef = useRef<HTMLDivElement>(null);

  // ── Fetch post ──────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!slug) return;
    (async () => {
      try {
        const res  = await fetch(`${WP_API}/posts?slug=${slug}&_embed`);
        const data = await res.json();
        if (data.length) {
          const p = data[0];
          setPost(p);
          setImgSrc(getImg(p));
          setToc(extractToc(p.content.rendered));

          const relRes  = await fetch(`${WP_API}/posts?_embed&per_page=6`);
          const relData = await relRes.json();
          setRelated(relData.filter((r: WPPost) => r.slug !== slug).slice(0, 4));
        }
      } catch (e) { console.error(e); }
      setLoading(false);
    })();
  }, [slug]);

  // ── Active heading tracking via IntersectionObserver ───────────────────────
  useEffect(() => {
    if (!toc.length) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: "-20% 0% -70% 0%" }
    );
    toc.forEach(t => {
      const el = document.getElementById(t.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [toc]);

  // ── Copy URL ────────────────────────────────────────────────────────────────
  function copyUrl() {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  if (loading) return <Skeleton />;

  if (!post)
    return (
      <main style={{ background: "#F8F9FC", minHeight: "100vh" }}>
        <Navbar />
        <div className="text-center py-32">
          <p className="text-xl font-bold mb-4" style={{ color: "#1A2D6B" }}>Article not found</p>
          <Link href="/blogs" className="inline-flex items-center gap-2 text-sm font-semibold"
            style={{ color: "#F5A623" }}>
            <ArrowLeft style={{ width: 16, height: 16 }} /> Back to Blog
          </Link>
        </div>
        <Footer />
      </main>
    );

  const tags     = getTags(post);
  const category = getCat(post);
  const content  = fixLinks(injectHeadingIds(post.content.rendered));

  return (
    <main style={{ background: "#F8F9FC", fontFamily: "'Outfit',sans-serif", minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap');
        .line-clamp-2{display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;}

        /* ── Article prose styles ── */
        .article-body h2{font-size:1.45rem;font-weight:700;color:#1A2D6B;margin:2.5rem 0 1rem;padding-bottom:0.5rem;border-bottom:2px solid #F0F3FA;font-family:'Outfit',sans-serif;}
        .article-body h3{font-size:1.15rem;font-weight:700;color:#1A2D6B;margin:2rem 0 0.75rem;font-family:'Outfit',sans-serif;}
        .article-body h4{font-size:1rem;font-weight:600;color:#1A2D6B;margin:1.5rem 0 0.5rem;}
        .article-body p{color:#3D4D6A;line-height:1.9;margin-bottom:1.4rem;font-size:0.97rem;}
        .article-body ul,.article-body ol{color:#3D4D6A;padding-left:1.5rem;margin-bottom:1.4rem;}
        .article-body li{margin-bottom:0.6rem;line-height:1.8;font-size:0.95rem;}
        .article-body a{color:#F5A623;text-decoration:underline;text-underline-offset:3px;}
        .article-body a:hover{color:#D4891A;}
        .article-body img{border-radius:14px;margin:2rem 0;max-width:100%;box-shadow:0 4px 24px rgba(26,45,107,0.1);}
        .article-body blockquote{border-left:4px solid #F5A623;padding:1.25rem 1.5rem;background:linear-gradient(135deg,#FFF9EE,#FAFBFF);border-radius:0 14px 14px 0;margin:2rem 0;color:#5A4500;font-style:italic;font-size:1.05rem;line-height:1.7;}
        .article-body strong{color:#1A2D6B;font-weight:700;}
        .article-body table{width:100%;border-collapse:collapse;margin:1.5rem 0;border-radius:12px;overflow:hidden;}
        .article-body th{background:#1A2D6B;color:#fff;padding:0.75rem 1rem;text-align:left;font-size:0.85rem;}
        .article-body td{padding:0.65rem 1rem;border-bottom:1px solid #F0F3FA;font-size:0.9rem;color:#3D4D6A;}
        .article-body tr:last-child td{border-bottom:none;}
        .article-body tr:nth-child(even) td{background:#FAFBFF;}
      `}</style>

      <Navbar />

      {/* ════════════════════════════════════════
          HERO IMAGE — full bleed, fixed height
      ════════════════════════════════════════ */}
      <div className="relative w-full" style={{ height: 480 }}>
        <Image src={imgSrc} alt={post.title.rendered} fill priority
          className="object-cover"
          onError={() => setImgSrc(DEFAULT_IMG)}
          sizes="100vw" />
        {/* Gradient overlay */}
        <div className="absolute inset-0"
          style={{ background: "linear-gradient(to top, rgba(5,12,40,0.96) 0%, rgba(5,12,40,0.45) 50%, transparent 80%)" }} />

        {/* Breadcrumb top-left */}
        <div className="absolute top-6 left-6">
          <div className="flex items-center gap-1.5 text-xs"
            style={{ color: "rgba(255,255,255,0.6)" }}>
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight style={{ width: 12, height: 12 }} />
            <Link href="/blogs" className="hover:text-white transition-colors">Blog</Link>
            <ChevronRight style={{ width: 12, height: 12 }} />
            <span style={{ color: "#F5A623" }}>{category}</span>
          </div>
        </div>

        {/* Bottom content */}
        <div className="absolute bottom-0 left-0 right-0">
          <div className="max-w-7xl mx-auto px-6 pb-8">

            {/* Category pill */}
            <div className="mb-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase"
                style={{ background: "#F5A623", color: "#fff", letterSpacing: "0.1em" }}>
                <BookOpen style={{ width: 10, height: 10 }} />
                {category}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-2xl md:text-4xl font-bold text-white leading-tight mb-4"
              style={{ maxWidth: 800, fontFamily: "'Outfit',sans-serif" }}
              dangerouslySetInnerHTML={{ __html: post.title.rendered }} />

            {/* Meta row — date, reading time, share */}
            <div className="flex items-center gap-4 flex-wrap">
              {/* Date chip */}
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl"
                style={{ background: "rgba(245,166,35,0.15)", border: "1px solid rgba(245,166,35,0.35)" }}>
                <Calendar style={{ width: 14, height: 14, color: "#F5A623" }} />
                <span className="text-xs font-semibold" style={{ color: "#F5A623" }}>
                  {formatDate(post.date)}
                </span>
              </div>

              <span style={{ color: "rgba(255,255,255,0.2)" }}>•</span>

              <div className="flex items-center gap-1.5 text-xs" style={{ color: "rgba(255,255,255,0.6)" }}>
                <Clock style={{ width: 13, height: 13 }} />
                {readingTime(post.content.rendered)}
              </div>

              <span style={{ color: "rgba(255,255,255,0.2)" }}>•</span>

              {/* Share button */}
              <button onClick={copyUrl}
                className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full transition-all"
                style={{ background: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.7)", border: "1px solid rgba(255,255,255,0.15)" }}>
                <Share2 style={{ width: 12, height: 12 }} />
                {copied ? "Copied!" : "Share"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════
          CONTENT AREA
      ════════════════════════════════════════ */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-3 gap-10">

          {/* ── ARTICLE — 2 cols ── */}
          <article className="lg:col-span-2" ref={articleRef}>

            {/* Article body */}
            <div
              className="article-body rounded-2xl p-8 md:p-10"
              style={{ background: "#fff", border: "1px solid #E8EDF5", boxShadow: "0 4px 24px rgba(26,45,107,0.05)" }}
              dangerouslySetInnerHTML={{ __html: content }}
            />

            {/* Tags */}
            {tags.length > 0 && (
              <div className="mt-6 flex items-center gap-2 flex-wrap">
                <span className="text-[10px] font-bold uppercase mr-1"
                  style={{ color: "#A0AABF", letterSpacing: "0.12em" }}>Tags:</span>
                {tags.map((tag: any) => (
                  <span key={tag.slug}
                    className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-full"
                    style={{ background: "#F0F3FA", color: "#6B7A9F", border: "1px solid #E8EDF5" }}>
                    <Tag style={{ width: 9, height: 9 }} />
                    {tag.name}
                  </span>
                ))}
              </div>
            )}

            {/* Back link */}
            <div className="mt-8">
              <Link href="/blogs"
                className="inline-flex items-center gap-2 text-sm font-semibold transition-colors hover:gap-3"
                style={{ color: "#6B7A9F" }}>
                <ArrowLeft style={{ width: 16, height: 16 }} />
                Back to all articles
              </Link>
            </div>
          </article>

          {/* ── SIDEBAR ── */}
          <aside className="space-y-6">

            {/* Published date card */}
            <div className="rounded-2xl p-5"
              style={{ background: "#1A2D6B" }}>
              <p className="text-[10px] font-bold uppercase mb-3"
                style={{ color: "#F5A623", letterSpacing: "0.18em" }}>Published On</p>
              <div className="flex items-center gap-3">
                {/* Date block */}
                <div className="flex flex-col items-center justify-center rounded-xl text-center flex-shrink-0"
                  style={{ width: 52, height: 58, background: "rgba(245,166,35,0.18)", border: "1.5px solid rgba(245,166,35,0.4)" }}>
                  <span className="font-bold" style={{ fontSize: 22, color: "#F5A623", lineHeight: 1 }}>
                    {new Date(post.date).getDate()}
                  </span>
                  <span className="font-bold tracking-wider" style={{ fontSize: 9, color: "rgba(245,166,35,0.85)" }}>
                    {new Date(post.date).toLocaleString("en-IN", { month: "short" }).toUpperCase()}
                  </span>
                  <span style={{ fontSize: 9, color: "rgba(255,255,255,0.45)" }}>
                    {new Date(post.date).getFullYear()}
                  </span>
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">{formatDate(post.date)}</p>
                  <p className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.45)" }}>
                    {readingTime(post.content.rendered)}
                  </p>
                </div>
              </div>
            </div>

            {/* Related articles */}
            {related.length > 0 && (
              <div className="rounded-2xl p-5"
                style={{ background: "#fff", border: "1px solid #E8EDF5", boxShadow: "0 2px 12px rgba(26,45,107,0.05)" }}>
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-2">
                    <div className="h-5 w-1 rounded-full" style={{ background: "#F5A623" }} />
                    <h3 className="text-sm font-bold" style={{ color: "#1A2D6B" }}>Related Articles</h3>
                  </div>
                  <Link href="/blogs"
                    className="flex items-center gap-1 text-[10px] font-semibold uppercase"
                    style={{ color: "#F5A623", letterSpacing: "0.08em" }}>
                    All <ArrowUpRight style={{ width: 11, height: 11 }} />
                  </Link>
                </div>
                <div className="space-y-4">
                  {related.map((r, i) => (
                    <React.Fragment key={r.id}>
                      <RelatedCard post={r} />
                      {i < related.length - 1 && <div style={{ height: 1, background: "#F0F3FA" }} />}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            )}

            {/* ── Explore Projects CTA ── */}
            <div className="rounded-2xl overflow-hidden"
              style={{ border: "1px solid #E8EDF5", boxShadow: "0 2px 12px rgba(26,45,107,0.05)" }}>

              {/* Image strip */}
              <div className="relative h-32">
                <Image
                  src="https://thomestowers.com/wp-content/uploads/2026/02/Entrance-Gate-Area-Day-NEW-1.webp"
                  alt="THomes Projects"
                  fill className="object-cover"
                  sizes="400px"
                />
                <div className="absolute inset-0"
                  style={{ background: "linear-gradient(to top, rgba(5,12,40,0.85) 0%, transparent 60%)" }} />
                <div className="absolute bottom-3 left-4">
                  <span className="text-[9px] font-bold uppercase px-2 py-1 rounded-full"
                    style={{ background: "#F5A623", color: "#fff", letterSpacing: "0.1em" }}>
                    Live Projects
                  </span>
                </div>
              </div>

              <div className="p-5" style={{ background: "#fff" }}>
                <h4 className="font-bold text-sm mb-1" style={{ color: "#1A2D6B" }}>
                  Explore Our Projects
                </h4>
                <p className="text-xs leading-relaxed mb-4" style={{ color: "#6B7A9F" }}>
                  Premium plots &amp; properties across Hyderabad, Telangana, Gujarat and Dubai.
                </p>

                {/* Locations */}
                <div className="space-y-1.5 mb-4">
                  {["Hyderabad, Telangana", "Dholera, Gujarat", "Dubai, UAE"].map(loc => (
                    <div key={loc} className="flex items-center gap-2 text-xs" style={{ color: "#6B7A9F" }}>
                      <MapPin style={{ width: 10, height: 10, color: "#F5A623", flexShrink: 0 }} />
                      {loc}
                    </div>
                  ))}
                </div>

                <Link href="/projects"
                  className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-bold uppercase transition-all hover:gap-3"
                  style={{ background: "#1A2D6B", color: "#fff", letterSpacing: "0.08em" }}>
                  View All Projects
                  <ArrowRight style={{ width: 14, height: 14 }} />
                </Link>

                <Link href="/contact"
                  className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-semibold mt-2 transition-all"
                  style={{ background: "rgba(245,166,35,0.1)", color: "#F5A623", border: "1px solid rgba(245,166,35,0.3)" }}>
                  Contact Us
                </Link>
              </div>
            </div>

          </aside>
        </div>
      </div>

      <Footer />
    </main>
  );
}