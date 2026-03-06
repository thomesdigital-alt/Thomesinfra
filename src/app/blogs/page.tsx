"use client"

import React, { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Calendar, Clock, ArrowRight, ArrowUpRight, ChevronRight } from "lucide-react"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"

// ─── Types ────────────────────────────────────────────────────────────────────
type Blog = {
  id: number
  slug: string
  date: string
  title: { rendered: string }
  excerpt: { rendered: string }
  content: { rendered: string }
  _embedded?: any
}

// ─── Config ───────────────────────────────────────────────────────────────────
const WP_API      = "https://mediumpurple-sandpiper-111248.hostingersite.com/wp-json/wp/v2"
const FALLBACK    = "https://thomestowers.com/wp-content/uploads/2026/03/DJI_0238-scaled.jpg"
const HERO_BG     = "https://thomestowers.com/wp-content/uploads/2026/03/DJI_0459-scaled.jpg"

// ─── Helpers ──────────────────────────────────────────────────────────────────
const stripHtml = (h: string) => h.replace(/<[^>]+>/g, "").trim()

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })
}

function formatDateLong(d: string) {
  return new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })
}

function readingTime(t: string) {
  return `${Math.max(2, Math.ceil(stripHtml(t).split(/\s+/).length / 200))} min read`
}

function getImg(post: Blog): string {
  return post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || FALLBACK
}

function getCat(post: Blog): string {
  return post._embedded?.["wp:term"]?.[0]?.[0]?.name || "Insights"
}

// ─── Date Chip (pill showing date below card image) ───────────────────────────
function DateChip({ date }: { date: string }) {
  return (
    <div className="flex items-center gap-1.5 text-xs" style={{ color: "#6B7A9F" }}>
      <span
        className="flex items-center justify-center rounded-full"
        style={{ background: "rgba(245,166,35,0.12)", padding: "3px 8px", color: "#F5A623", fontWeight: 700, fontSize: 10, letterSpacing: "0.04em" }}
      >
        <Calendar className="inline mr-1" style={{ width: 10, height: 10 }} />
        {formatDate(date)}
      </span>
    </div>
  )
}

// ─── Featured (Hero) Card — Image 1 layout: text LEFT, image RIGHT ───────────
function HeroCard({ post }: { post: Blog }) {
  const [src, setSrc] = useState(getImg(post))

  return (
    <Link href={`/blogs/${post.slug}`} className="group block rounded-2xl overflow-hidden"
      style={{ background: "#fff", border: "1px solid #E8EDF5", boxShadow: "0 4px 32px rgba(26,45,107,0.10)" }}>

      <div className="flex flex-col md:flex-row items-stretch min-h-[340px]">

        {/* ── LEFT: Text content ── */}
        <div className="flex flex-col justify-between p-8 md:p-10 flex-1 min-w-0">

          {/* Top: category pill */}
          <div className="flex items-center gap-2 mb-5">
            <span className="text-xs px-3 py-1.5 rounded-full font-medium"
              style={{ background: "#F0F3FA", color: "#6B7A9F", border: "1px solid #E8EDF5" }}>
              {getCat(post)}
            </span>
            <span className="text-xs px-3 py-1.5 rounded-full font-bold"
              style={{ background: "#F5A623", color: "#fff", letterSpacing: "0.08em" }}>
              ✦ Featured
            </span>
          </div>

          {/* Title — large, bold, dark navy */}
          <h2
            className="font-bold leading-tight mb-4 transition-colors group-hover:text-amber-500"
            style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)", color: "#1A2D6B", fontFamily: "'Outfit',sans-serif" }}
            dangerouslySetInnerHTML={{ __html: post.title.rendered }}
          />

          {/* Excerpt */}
          <p className="text-sm leading-relaxed mb-6 flex-1"
            style={{ color: "#6B7A9F",
              display: "-webkit-box", WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical", overflow: "hidden" }}>
            {stripHtml(post.excerpt.rendered).slice(0, 200)}
          </p>

          {/* Bottom: date + read time + CTA */}
          <div className="flex items-center gap-4 flex-wrap">
            <span className="text-xs" style={{ color: "#A0AABF" }}>
              Published on {formatDateLong(post.date)}
            </span>
            <span style={{ color: "#E0E6F0" }}>•</span>
            <span className="flex items-center gap-1 text-xs" style={{ color: "#A0AABF" }}>
              <Clock style={{ width: 11, height: 11 }} />
              {readingTime(post.content.rendered)}
            </span>
            <div className="ml-auto flex-shrink-0">
              <span
                className="inline-flex items-center gap-2 text-sm font-bold px-5 py-2.5 rounded-full transition-all group-hover:gap-3"
                style={{ background: "#F5A623", color: "#1A2D6B" }}>
                Read Article <ArrowRight style={{ width: 14, height: 14 }} />
              </span>
            </div>
          </div>
        </div>

        {/* ── RIGHT: Image ── */}
        <div className="relative flex-shrink-0 overflow-hidden rounded-none md:rounded-r-2xl"
          style={{ width: "100%", minHeight: 220, flex: "0 0 45%" }}>
          <Image
            src={src}
            alt={post.title.rendered}
            fill
            priority
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            onError={() => setSrc(FALLBACK)}
            sizes="(max-width:768px) 100vw, 45vw"
          />
        </div>

      </div>
    </Link>
  )
}

// ─── Standard Blog Card — reference: 3-col grid cards ────────────────────────
function BlogCard({ post }: { post: Blog }) {
  const [src, setSrc] = useState(getImg(post))

  return (
    <Link href={`/blogs/${post.slug}`} className="group flex flex-col h-full">
      <div className="h-full rounded-2xl overflow-hidden flex flex-col transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-xl"
        style={{ background: "#fff", border: "1px solid #E8EDF5", boxShadow: "0 2px 16px rgba(26,45,107,0.06)" }}>

        {/* Image */}
        <div className="relative overflow-hidden flex-shrink-0" style={{ height: 200 }}>
          <Image src={src} alt={post.title.rendered} fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            onError={() => setSrc(FALLBACK)} sizes="(max-width:768px) 100vw, 33vw" />

          {/* dim overlay */}
          <div className="absolute inset-0"
            style={{ background: "linear-gradient(to top,rgba(10,20,60,0.35) 0%,transparent 60%)" }} />

          {/* Category pill */}
          <div className="absolute top-3 left-3">
            <span className="text-[9px] font-bold uppercase px-2.5 py-1 rounded-full"
              style={{ background: "#F5A623", color: "#fff", letterSpacing: "0.1em" }}>
              {getCat(post)}
            </span>
          </div>

          {/* External arrow icon — top right (matches reference) */}
          <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="flex items-center justify-center rounded-full"
              style={{ width: 28, height: 28, background: "rgba(255,255,255,0.18)", backdropFilter: "blur(6px)", border: "1px solid rgba(255,255,255,0.3)" }}>
              <ArrowUpRight className="text-white" style={{ width: 14, height: 14 }} />
            </span>
          </div>
        </div>

        {/* Card body */}
        <div className="p-5 flex flex-col flex-1">

          {/* Title */}
          <h3 className="font-bold text-sm leading-snug mb-2 transition-colors group-hover:text-amber-500"
            style={{ color: "#1A2D6B", fontFamily: "'Outfit',sans-serif",
              display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}
            dangerouslySetInnerHTML={{ __html: post.title.rendered }} />

          {/* Excerpt */}
          <p className="text-xs leading-relaxed flex-1 mb-4"
            style={{ color: "#6B7A9F",
              display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
            {stripHtml(post.excerpt.rendered).slice(0, 130)}
          </p>

          {/* ── Date + reading time footer — matches reference ── */}
          <div className="flex items-center justify-between pt-3"
            style={{ borderTop: "1px solid #F0F3FA" }}>
            <div className="flex items-center gap-2">
              {/* Amber date chip */}
              <span className="flex items-center gap-1 text-[10px] font-semibold px-2.5 py-1 rounded-full"
                style={{ background: "rgba(245,166,35,0.1)", color: "#F5A623", border: "1px solid rgba(245,166,35,0.2)" }}>
                <Calendar style={{ width: 9, height: 9 }} />
                {formatDate(post.date)}
              </span>
            </div>
            <span className="flex items-center gap-1 text-[10px]" style={{ color: "#A0AABF" }}>
              <Clock style={{ width: 9, height: 9 }} />
              {readingTime(post.content.rendered)}
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}

// ─── Skeleton ─────────────────────────────────────────────────────────────────
function GridSkeleton() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
      {[1, 2, 3, 4, 5, 6].map(i => (
        <div key={i} className="animate-pulse rounded-2xl overflow-hidden"
          style={{ background: "#fff", border: "1px solid #E8EDF5", height: 320 }}>
          <div style={{ height: 180, background: "#E8EDF5" }} />
          <div className="p-5 space-y-2">
            <div style={{ height: 14, background: "#E8EDF5", borderRadius: 8, width: "80%" }} />
            <div style={{ height: 11, background: "#F0F3FA", borderRadius: 8 }} />
            <div style={{ height: 11, background: "#F0F3FA", borderRadius: 8, width: "65%" }} />
          </div>
        </div>
      ))}
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function BlogsPage() {
  const [blogs,   setBlogs]   = useState<Blog[]>([])
  const [loading, setLoading] = useState(true)
  const [page,    setPage]    = useState(1)
  const PER_PAGE = 9

  useEffect(() => {
    fetch(`${WP_API}/posts?_embed&per_page=20`)
      .then(r => r.json())
      .then((d: Blog[]) => { setBlogs(d); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  const featured   = blogs[0]
  const gridBlogs  = blogs.slice(1)
  const paginated  = gridBlogs.slice(0, page * PER_PAGE)
  const hasMore    = paginated.length < gridBlogs.length

  return (
    <main style={{ background: "#F8F9FC", fontFamily: "'Outfit',sans-serif", minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap');
      `}</style>

      <Navbar />


      {/* ── Main content ── */}
      <div className="max-w-7xl mx-auto px-6 py-12 space-y-14 mt-10">

        {/* ── Featured hero post ── */}
        {!loading && featured && (
          <div>
            <HeroCard post={featured} />
          </div>
        )}

        {loading && (
          <div className="animate-pulse rounded-2xl"
            style={{ height: 460, background: "#E8EDF5" }} />
        )}

        {/* ── Recent Blog Posts section ── */}
        <div>
          {/* Section header — matches reference */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="h-6 w-1 rounded-full" style={{ background: "#F5A623" }} />
              <h2 className="text-xl md:text-2xl font-bold" style={{ color: "#1A2D6B" }}>
                Recent blog posts
              </h2>
            </div>
            <Link href="/blogs"
              className="flex items-center gap-1.5 text-xs font-semibold uppercase transition-colors hover:text-amber-500"
              style={{ color: "#F5A623", letterSpacing: "0.1em" }}>
              View all posts <ArrowRight style={{ width: 14, height: 14 }} />
            </Link>
          </div>

          {/* Grid */}
          {loading
            ? <GridSkeleton />
            : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
                {paginated.map(post => (
                  <BlogCard key={post.id} post={post} />
                ))}
              </div>
            )
          }

          {/* Load more — matches reference "Loading more…" */}
          {!loading && hasMore && (
            <div className="text-center mt-12">
              <button
                onClick={() => setPage(p => p + 1)}
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-bold uppercase transition-all hover:-translate-y-0.5 hover:shadow-lg"
                style={{ background: "#1A2D6B", color: "#fff", letterSpacing: "0.1em" }}
              >
                Load more posts <ArrowRight style={{ width: 15, height: 15 }} />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ── Newsletter CTA ── */}
      {/* <div style={{ background: "#1A2D6B" }}>
        <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <p className="text-[10px] font-bold uppercase mb-2"
              style={{ color: "#F5A623", letterSpacing: "0.2em" }}>Stay Informed</p>
            <h3 className="text-2xl font-bold text-white mb-1">Never Miss a Market Update</h3>
            <p className="text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
              Get the latest property insights delivered to your inbox every week.
            </p>
          </div>
          <div className="flex w-full md:w-auto md:min-w-[360px]">
            <input type="email" placeholder="Enter your email address"
              className="flex-1 px-5 h-12 text-sm"
              style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)",
                borderRight: "none", color: "#fff", outline: "none", minWidth: 0, borderRadius: "8px 0 0 8px" }} />
            <button className="h-12 px-7 text-sm font-bold uppercase flex-shrink-0"
              style={{ background: "#F5A623", color: "#fff", letterSpacing: "0.1em", border: "none", borderRadius: "0 8px 8px 0", cursor: "pointer" }}>
              Subscribe
            </button>
          </div>
        </div>
      </div> */}

      <Footer />
    </main>
  )
}