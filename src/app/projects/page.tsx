"use client";

import React, { useEffect, useState } from "react";
import NextImage from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  MapPin, Building2, ChevronRight, Search,
  ShieldCheck, CheckCircle,
} from "lucide-react";

// ── Local image overrides (slug → image URL) ──────────────────────────────────
const projectImages: Record<string, string> = {
  "spark-vision":     "https://thomesinfra.com/wp-content/uploads/2023/11/Spark-Vision-Gallery.jpg?auto=format&fit=crop&q=80&w=800",
  "spark-city":       "https://thomesinfra.com/wp-content/uploads/2024/04/WhatsApp-Image-2024-04-07-at-20.42.51.jpeg?auto=format&fit=crop&q=80&w=800",
  "valley-view":      "https://thomesinfra.com/wp-content/uploads/2024/01/DJI_0896-min-scaled-1.jpg?auto=format&fit=crop&q=80&w=800",
  "yadadri-icon":     "https://thomesinfra.com/wp-content/uploads/2024/04/DJI_0249-1.jpg?auto=format&fit=crop&q=80&w=800",
  "star-city-phase-4":"https://thomesinfra.com/wp-content/uploads/2024/04/DJI_0261-1.jpg?auto=format&fit=crop&q=80&w=800",
};
const defaultImage = "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=800";

// ── Project shape returned by MongoDB API ─────────────────────────────────────
interface Project {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  location: string;
  status: "ongoing" | "completed";
  approval_type: string;
  is_featured?: boolean;
  hero_image?: string;
  gallery_images?: string[];
  total_plots?: number;
  available_plots?: number;
  Totalacres?: number | string;
  price_per_sqyd?: number;
}

// ── Helpers ───────────────────────────────────────────────────────────────────
function getImage(project: Project): string {
  if (project.hero_image) return project.hero_image;
  return defaultImage;
}

function formatAcres(val: number | string | undefined): string {
  if (val === undefined || val === null || val === "") return "—";
  const n = Number(val);
  return isNaN(n) ? String(val) : `${n}`;
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading]   = useState(true);
  const [filter, setFilter]     = useState<"all" | "ongoing" | "completed">("all");
  const [search, setSearch]     = useState("");

  // Read ?filter= from URL on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlFilter = params.get("filter");
    if (urlFilter === "ongoing" || urlFilter === "completed") setFilter(urlFilter);
  }, []);

  // Fetch from MongoDB API
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch("/api/projects");
        if (!res.ok) throw new Error("Failed to fetch projects");
        const data = await res.json();
        setProjects(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("[ProjectsPage] fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const filtered = projects.filter((p) => {
    const matchStatus = filter === "all" || p.status === filter;
    const matchSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.location.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  const ongoingCount   = projects.filter((p) => p.status === "ongoing").length;
  const completedCount = projects.filter((p) => p.status === "completed").length;

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative pt-20 pb-24 bg-[#0a1628] overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <NextImage
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=2000"
            alt="Projects"
            fill
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a1628]/80 to-[#0a1628]" />

        <div className="container relative z-10 mx-auto px-4 pt-16">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
            <span className="inline-block px-4 py-2 rounded-full bg-amber-500/20 text-amber-400 text-sm font-semibold mb-6">
              Our Portfolio
            </span>
            <h1 className="text-5xl md:text-7xl font-black text-white mb-6">
              Premium <span className="text-amber-400">Projects</span>
            </h1>
            <p className="text-xl text-white/60">
              Explore our collection of {projects.length} government-approved projects across
              Hyderabad's prime locations. Each project is designed for maximum appreciation and lifestyle.
            </p>
          </motion.div>

          {/* Stats */}
          <div className="flex flex-wrap gap-8 mt-12">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                <Building2 className="h-6 w-6 text-emerald-400" />
              </div>
              <div>
                <div className="text-2xl font-black text-white">{ongoingCount}</div>
                <div className="text-sm text-white/50">Ongoing Projects</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-xl bg-blue-500/20 flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-blue-400" />
              </div>
              <div>
                <div className="text-2xl font-black text-white">{completedCount}</div>
                <div className="text-sm text-white/50">Completed Projects</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Filters ───────────────────────────────────────────────────────── */}
      <section className="sticky top-20 z-30 bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-between gap-4 py-4">
            <div className="flex gap-2">
              {(["all", "ongoing", "completed"] as const).map((key) => (
                <button
                  key={key}
                  onClick={() => setFilter(key)}
                  className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all capitalize ${
                    filter === key
                      ? "bg-amber-500 text-black"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {key === "all" ? "All Projects" : key}
                </button>
              ))}
            </div>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search projects..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 h-11 w-64 rounded-full bg-gray-100 border-0"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Projects Grid ─────────────────────────────────────────────────── */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-3xl overflow-hidden shadow-sm animate-pulse">
                  <div className="aspect-[4/3] bg-gray-200" />
                  <div className="p-6 space-y-4">
                    <div className="h-6 bg-gray-200 rounded w-3/4" />
                    <div className="h-4 bg-gray-200 rounded w-1/2" />
                    <div className="h-4 bg-gray-200 rounded w-1/3" />
                  </div>
                </div>
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🏗️</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">No Projects Found</h3>
              <p className="text-gray-500">Try adjusting your filters or search query.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((project, index) => (
                <motion.div
                  key={project._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link href={`/projects/${project.slug}`}>
                    <div className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100">

                      {/* Image */}
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <NextImage
                          src={getImage(project)}
                          alt={project.name}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                        {/* Status badge */}
                        <div className="absolute top-4 left-4">
                          <span className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase ${
                            project.status === "ongoing"
                              ? "bg-emerald-500 text-white"
                              : "bg-blue-500 text-white"
                          }`}>
                            {project.status}
                          </span>
                        </div>

                        {/* Featured badge */}
                        {project.is_featured && (
                          <div className="absolute top-4 right-4">
                            <span className="px-3 py-1.5 rounded-full text-xs font-bold uppercase bg-amber-500 text-black">
                              Featured
                            </span>
                          </div>
                        )}

                        {/* Approval badge */}
                        <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full">
                          <ShieldCheck className="h-4 w-4 text-emerald-600" />
                          <span className="text-xs font-bold text-gray-900">{project.approval_type}</span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-amber-600 transition-colors line-clamp-1">
                          {project.name}
                        </h3>
                        <div className="flex items-center gap-1 text-gray-500 text-sm mb-4">
                          <MapPin className="h-4 w-4 flex-shrink-0" />
                          <span className="line-clamp-1">{project.location}</span>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-4 mb-6">
                          <div>
                            <div className="text-lg font-bold text-gray-900">
                              {project.total_plots ?? "—"}
                            </div>
                            <div className="text-xs text-gray-500">Total Plots</div>
                          </div>
                          <div>
                            <div className="text-lg font-bold text-emerald-600">
                              {project.available_plots ?? "—"}
                            </div>
                            <div className="text-xs text-gray-500">Available</div>
                          </div>
                          <div>
                            <div className="text-lg font-bold text-gray-900">
                              {formatAcres(project.Totalacres)}
                            </div>
                            <div className="text-xs text-gray-500">Acres</div>
                          </div>
                        </div>

                        {/* Price + CTA */}
                        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                          {/* <div>
                            <span className="text-xs text-gray-500">Starting from</span>
                            <div className="text-lg font-black text-gray-900">
                              {project.price_per_sqyd
                                ? <>₹{project.price_per_sqyd.toLocaleString()}<span className="text-sm font-normal text-gray-500">/sq.yd</span></>
                                : <span className="text-sm font-normal text-gray-400">Price on request</span>
                              }
                            </div>
                          </div> */}
                          <Button size="sm" className="rounded-full bg-amber-500 hover:bg-amber-600 text-black font-bold">
                            View Details
                            <ChevronRight className="ml-1 h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────────── */}
      <section className="py-20 bg-[#0a1628]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
            Can't Find What You're Looking For?
          </h2>
          <p className="text-xl text-white/60 mb-10 max-w-2xl mx-auto">
            Our team can help you find the perfect plot that matches your requirements and budget.
          </p>
          <Link href="/contact">
            <Button size="lg" className="h-16 rounded-full bg-amber-500 hover:bg-amber-600 text-black px-10 text-lg font-bold">
              Talk to Our Team
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}