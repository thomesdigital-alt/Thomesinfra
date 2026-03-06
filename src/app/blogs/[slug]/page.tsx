"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  Calendar, Clock, ArrowLeft, Tag,
  ChevronRight, BookOpen, ArrowRight, ArrowUpRight
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

const WP_API = "https://mediumpurple-sandpiper-111248.hostingersite.com/wp-json/wp/v2";
const DEFAULT_IMAGE = "https://thomestowers.com/wp-content/uploads/2026/02/Entrance-Gate-Area-Day-NEW-1.webp";

// ─── Helpers ──────────────────────────────────────────────────────────────────
function stripHtml(html: string) {
  return html.replace(/<[^>]+>/g, "").trim();
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-IN", {
    day: "numeric", month: "long", year: "numeric",
  });
}

function readingTime(text: string) {
  const words = stripHtml(text).split(/\s+/).length;
  return `${Math.max(2, Math.ceil(words / 200))} min read`;
}

function getImage(post: WPPost): string {
  return post?._embedded?.["wp:featuredmedia"]?.[0]?.source_url || DEFAULT_IMAGE;
}

function getCategory(post: WPPost): string {
  return post?._embedded?.["wp:term"]?.[0]?.[0]?.name || "Insights";
}

function getTags(post: WPPost): { id: number; name: string; slug: string }[] {
  return post?._embedded?.["wp:term"]?.[1] || [];
}

// ─── Date Badge Component ─────────────────────────────────────────────────────
function DateBadge({ date, large = false }: { date: string; large?: boolean }) {
  const d     = new Date(date);
  const day   = d.getDate();
  const month = d.toLocaleString("en-IN", { month: "short" }).toUpperCase();
  const year  = d.getFullYear();

  return (
    <div
      className="flex flex-col items-center justify-center rounded-xl text-center flex-shrink-0"
      style={{
        width:  large ? 64 : 52,
        height: large ? 72 : 60,
        background: "rgba(245,166,35,0.15)",
        backdropFilter: "blur(10px)",
        border: "1.5px solid rgba(245,166,35,0.4)",
      }}
    >
      <span
        className="font-bold leading-none"
        style={{ fontSize: large ? 26 : 20, color: "#F5A623" }}
      >
        {day}
      </span>
      <span
        className="font-bold tracking-wider mt-0.5"
        style={{ fontSize: large ? 10 : 9, color: "rgba(245,166,35,0.9)" }}
      >
        {month}
      </span>
      <span
        style={{ fontSize: 9, color: "rgba(255,255,255,0.5)", marginTop: 1 }}
      >
        {year}
      </span>
    </div>
  );
}

// ─── Related Post Card ────────────────────────────────────────────────────────
function RelatedCard({ post }: { post: WPPost }) {
  const [imgSrc, setImgSrc] = useState(getImage(post));

  return (
    <Link href={`/blogs/${post.slug}`} className="group flex gap-3 items-start">
      <div
        className="relative flex-shrink-0 overflow-hidden rounded-xl"
        style={{ width: 80, height: 64 }}
      >
        <Image
          src={imgSrc}
          alt={post.title.rendered}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-110"
          onError={() => setImgSrc(DEFAULT_IMAGE)}
          sizes="80px"
        />
      </div>
      <div className="flex-1 min-w-0">
        <p
          className="text-xs font-semibold leading-snug line-clamp-2 transition-colors group-hover:text-amber-500 mb-1"
          style={{ color: "#1A2D6B" }}
          dangerouslySetInnerHTML={{ __html: post.title.rendered }}
        />
        <span className="flex items-center gap-1 text-[10px]" style={{ color: "#A0AABF" }}>
          <Calendar className="h-2.5 w-2.5" />
          {formatDate(post.date)}
        </span>
      </div>
    </Link>
  );
}

// ─── Skeleton ────────────────────────────────────────────────────────────────
function Skeleton() {
  return (
    <main className="min-h-screen" style={{ background: "#F8F9FC" }}>
      <Navbar />
      <div className="animate-pulse">
        <div style={{ height: "60vh", background: "#E8EDF5" }} />
        <div className="max-w-7xl mx-auto px-6 py-12 grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-4">
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} style={{ height: 16, background: "#E8EDF5", borderRadius: 8, width: `${90 - i * 10}%` }} />
            ))}
          </div>
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} style={{ height: 72, background: "#E8EDF5", borderRadius: 12 }} />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}

// ─── Main Blog Post Page ──────────────────────────────────────────────────────
export default function BlogPostPage() {
  const params = useParams();
  const slug   = params?.slug as string;

  const [post,     setPost]     = useState<WPPost | null>(null);
  const [related,  setRelated]  = useState<WPPost[]>([]);
  const [loading,  setLoading]  = useState(true);
  const [imgSrc,   setImgSrc]   = useState(DEFAULT_IMAGE);

  useEffect(() => {
    if (!slug) return;

    async function load() {
      try {
        const res  = await fetch(`${WP_API}/posts?slug=${slug}&_embed`);
        const data = await res.json();

        if (data.length) {
          setPost(data[0]);
          setImgSrc(getImage(data[0]));

          const relRes  = await fetch(`${WP_API}/posts?_embed&per_page=6`);
          const relData = await relRes.json();
          setRelated(relData.filter((p: WPPost) => p.slug !== slug).slice(0, 4));
        }
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    }

    load();
  }, [slug]);

  if (loading) return <Skeleton />;

  if (!post)
    return (
      <main className="min-h-screen flex items-center justify-center" style={{ background: "#F8F9FC" }}>
        <Navbar />
        <div className="text-center mt-15">
          <p className="text-xl font-bold" style={{ color: "#1A2D6B" }}>Article not found</p>
          <Link href="/blogs" className="mt-4 inline-flex items-center gap-2 text-sm" style={{ color: "#F5A623" }}>
            <ArrowLeft className="h-4 w-4" /> Back to Blog
          </Link>
        </div>
        <Footer />
      </main>
    );

  const tags     = getTags(post);
  const category = getCategory(post);

  return (
    <main style={{ background: "#F8F9FC", fontFamily: "'Outfit', sans-serif", minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap');
        .line-clamp-2{display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;}
        .prose h2{font-size:1.4rem;font-weight:700;color:#1A2D6B;margin:2rem 0 1rem;}
        .prose h3{font-size:1.15rem;font-weight:700;color:#1A2D6B;margin:1.5rem 0 0.75rem;}
        .prose p{color:#4A5A7A;line-height:1.85;margin-bottom:1.25rem;font-size:0.95rem;}
        .prose ul,.prose ol{color:#4A5A7A;padding-left:1.5rem;margin-bottom:1.25rem;}
        .prose li{margin-bottom:0.5rem;line-height:1.75;font-size:0.95rem;}
        .prose a{color:#F5A623;text-decoration:underline;}
        .prose a:hover{color:#D4891A;}
        .prose img{border-radius:12px;margin:1.5rem 0;max-width:100%;}
        .prose blockquote{border-left:4px solid #F5A623;padding:1rem 1.5rem;background:#FFF9EE;border-radius:0 12px 12px 0;margin:1.5rem 0;color:#6B5A00;font-style:italic;}
        .prose strong{color:#1A2D6B;font-weight:700;}
      `}</style>

      <Navbar />

      {/* ════════════════════════════════════════
          HERO SECTION
          ════════════════════════════════════════ */}
      <div className="relative w-full h-auto mt-20" style={{ height: "clamp(480px, 60vh, 640px)" }}>

        {/* Background image */}
        <Image
          src={imgSrc}
          alt={post.title.rendered}
          fill
          priority
          className="object-cover"
          onError={() => setImgSrc(DEFAULT_IMAGE)}
          sizes="100vw"
        />

        {/* Dark gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to top, rgba(5,12,40,0.97) 0%, rgba(5,12,40,0.65) 50%, rgba(5,12,40,0.2) 100%)"
          }}
        />

        {/* ── TOP ROW: breadcrumb + badges ── */}
        <div className="absolute top-6 left-0 right-0">
          <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">

            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-xs" style={{ color: "rgba(255,255,255,0.6)" }}>
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <ChevronRight className="h-3 w-3" />
              <Link href="/blogs" className="hover:text-white transition-colors">Blog</Link>
              <ChevronRight className="h-3 w-3" />
              <span style={{ color: "#F5A623" }}>{category}</span>
            </div>

            {/* "Featured" pill */}
            <span
              className="px-3 py-1.5 text-[10px] font-bold uppercase rounded-full"
              style={{
                background: "rgba(255,255,255,0.12)",
                backdropFilter: "blur(8px)",
                color: "#fff",
                letterSpacing: "0.12em",
                border: "1px solid rgba(255,255,255,0.2)",
              }}
            >
              ✦ Featured Article
            </span>
          </div>
        </div>

        {/* ── BOTTOM CONTENT ── */}
        <div className="absolute bottom-0 left-0 right-0">
          <div className="max-w-7xl mx-auto px-6 pb-10">

            {/* Category pill */}
            <div className="mb-4">
              <span
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold uppercase"
                style={{ background: "#F5A623", color: "#fff", letterSpacing: "0.1em" }}
              >
                <BookOpen className="h-3 w-3" />
                {category}
              </span>
            </div>

            {/* Title */}
            <h1
              className="text-2xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-5"
              style={{ maxWidth: "800px" }}
              dangerouslySetInnerHTML={{ __html: post.title.rendered }}
            />

            {/* ── META ROW with Date Badge ── */}
            <div className="flex items-center gap-5 flex-wrap">

              {/* Large date badge */}
              <DateBadge date={post.date} large />

              {/* Vertical info stack */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-sm" style={{ color: "rgba(255,255,255,0.85)" }}>
                  <Calendar className="h-4 w-4" style={{ color: "#F5A623" }} />
                  <span className="font-medium">Published on {formatDate(post.date)}</span>
                </div>
                <div className="flex items-center gap-2 text-sm" style={{ color: "rgba(255,255,255,0.65)" }}>
                  <Clock className="h-4 w-4" style={{ color: "#F5A623" }} />
                  <span>{readingTime(post.content.rendered)}</span>
                </div>
              </div>

              {/* Separator */}
              <div className="hidden md:block h-10 w-px" style={{ background: "rgba(255,255,255,0.2)" }} />

              {/* Tags preview */}
              {tags.slice(0, 3).map((tag: any) => (
                <span
                  key={tag.slug}
                  className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-full"
                  style={{
                    background: "rgba(255,255,255,0.1)",
                    backdropFilter: "blur(6px)",
                    color: "rgba(255,255,255,0.75)",
                    border: "1px solid rgba(255,255,255,0.15)",
                  }}
                >
                  <Tag className="h-2.5 w-2.5" />
                  {tag.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════
          CONTENT + SIDEBAR
          ════════════════════════════════════════ */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid lg:grid-cols-3 gap-10">

        {/* ── ARTICLE ── */}
        <article className="lg:col-span-2">
          <div
            className="rounded-2xl p-8 md:p-10"
            style={{ background: "#fff", border: "1px solid #E8EDF5", boxShadow: "0 4px 24px rgba(26,45,107,0.06)" }}
          >
            {/* Excerpt highlight */}
            <p
              className="text-base font-medium leading-relaxed mb-8 pb-8"
              style={{
                color: "#1A2D6B",
                borderBottom: "2px solid #F0F3FA",
                background: "linear-gradient(135deg, #FFF9EE, #FAFBFF)",
                padding: "1.25rem 1.5rem",
                borderRadius: "12px",
                borderLeft: "4px solid #F5A623",
              }}
            >
              {stripHtml(post.excerpt.rendered).slice(0, 250)}
            </p>

            {/* Main content */}
            <div
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ __html: post.content.rendered }}
            />

            {/* Tags */}
            {tags.length > 0 && (
              <div
                className="mt-10 pt-8 flex gap-2 flex-wrap items-center"
                style={{ borderTop: "2px solid #F0F3FA" }}
              >
                <span className="text-xs font-bold uppercase mr-1" style={{ color: "#A0AABF", letterSpacing: "0.1em" }}>
                  Tags:
                </span>
                {tags.map((tag: any) => (
                  <span
                    key={tag.slug}
                    className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-full transition-colors"
                    style={{
                      background: "#F0F3FA",
                      color: "#6B7A9F",
                      border: "1px solid #E8EDF5",
                    }}
                  >
                    <Tag className="h-2.5 w-2.5" />
                    {tag.name}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Back button */}
          <div className="mt-6">
            <Link
              href="/blogs"
              className="inline-flex items-center gap-2 text-sm font-semibold transition-colors hover:gap-3"
              style={{ color: "#6B7A9F" }}
            >
              <ArrowLeft className="h-4 w-4" />
              Back to all articles
            </Link>
          </div>
        </article>

        {/* ── SIDEBAR ── */}
        <aside className="space-y-6">

          {/* Published date card */}
          <div
            className="rounded-2xl p-5 flex items-center gap-4"
            style={{ background: "#1A2D6B", border: "1px solid #1A2D6B" }}
          >
            <DateBadge date={post.date} large />
            <div>
              <p className="text-[10px] font-bold uppercase mb-1" style={{ color: "#F5A623", letterSpacing: "0.15em" }}>
                Published On
              </p>
              <p className="text-white font-semibold text-sm">{formatDate(post.date)}</p>
              <p className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.5)" }}>
                {readingTime(post.content.rendered)}
              </p>
            </div>
          </div>

          {/* Category card */}
          <div
            className="rounded-2xl p-5"
            style={{ background: "#fff", border: "1px solid #E8EDF5", boxShadow: "0 2px 12px rgba(26,45,107,0.05)" }}
          >
            <p className="text-[10px] font-bold uppercase mb-3" style={{ color: "#A0AABF", letterSpacing: "0.15em" }}>
              Category
            </p>
            <span
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold"
              style={{ background: "rgba(245,166,35,0.1)", color: "#F5A623", border: "1px solid rgba(245,166,35,0.3)" }}
            >
              <BookOpen className="h-3.5 w-3.5" />
              {category}
            </span>
          </div>

          {/* Related Articles */}
          {related.length > 0 && (
            <div
              className="rounded-2xl p-5"
              style={{ background: "#fff", border: "1px solid #E8EDF5", boxShadow: "0 2px 12px rgba(26,45,107,0.05)" }}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                  <div className="h-5 w-1 rounded-full" style={{ background: "#F5A623" }} />
                  <h3 className="text-sm font-bold" style={{ color: "#1A2D6B" }}>Related Articles</h3>
                </div>
                <Link
                  href="/blogs"
                  className="text-[10px] font-semibold uppercase flex items-center gap-1"
                  style={{ color: "#F5A623", letterSpacing: "0.08em" }}
                >
                  View all <ArrowUpRight className="h-3 w-3" />
                </Link>
              </div>

              <div className="space-y-4">
                {related.map((r, i) => (
                  <React.Fragment key={r.id}>
                    <RelatedCard post={r} />
                    {i < related.length - 1 && (
                      <div style={{ height: 1, background: "#F0F3FA" }} />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          )}

          {/* CTA Card */}
          <div
            className="rounded-2xl p-6 text-center"
            style={{ background: "linear-gradient(135deg, #1A2D6B, #0E1B4A)", border: "1px solid #1A2D6B" }}
          >
            <div
              className="h-12 w-12 rounded-full mx-auto mb-4 flex items-center justify-center"
              style={{ background: "rgba(245,166,35,0.2)", border: "1px solid rgba(245,166,35,0.3)" }}
            >
              <BookOpen className="h-5 w-5" style={{ color: "#F5A623" }} />
            </div>
            <h4 className="font-bold text-white mb-2 text-sm">Explore Our Projects</h4>
            <p className="text-xs mb-4" style={{ color: "rgba(255,255,255,0.55)" }}>
              Discover premium plots and properties across India and Dubai.
            </p>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold uppercase transition-all hover:gap-3"
              style={{ background: "#F5A623", color: "#1A2D6B", letterSpacing: "0.08em" }}
            >
              View Projects <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

        </aside>
      </div>

      <Footer />
    </main>
  );
}