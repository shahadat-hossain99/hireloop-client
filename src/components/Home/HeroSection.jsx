"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, MapPin } from "lucide-react";
import { Briefcase, Factory, Magnifier, Star } from "@gravity-ui/icons";

const trendingTags = ["Product Designer", "AI Engineering", "Dev-ops Engineer"];

const stats = [
  {
    id: 1,
    icon: <Briefcase className="h-5 w-5" />,
    value: "50K",
    label: "Active Jobs",
  },
  {
    id: 2,
    icon: <Factory className="h-5 w-5" />,
    value: "12K",
    label: "Companies",
  },
  {
    id: 3,
    icon: <Magnifier className="h-5 w-5" />,
    value: "2M",
    label: "Job Seekers",
  },
  {
    id: 4,
    icon: <Star className="h-5 w-5" />,
    value: "97%",
    label: "Satisfaction Rate",
  },
];

export default function HeroSection() {
  const router = useRouter();
  const [jobQuery, setJobQuery] = useState("");
  const [location, setLocation] = useState("");

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (jobQuery) params.set("q", jobQuery);
    if (location) params.set("location", location);
    router.push(`/jobs?${params.toString()}`);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <section
      className="relative w-full text-white"
      style={{
        backgroundImage: "url('/globe.png')",
        backgroundSize: "cover",
        backgroundPosition: "center 40%",
        backgroundRepeat: "no-repeat",
        backgroundColor: "#000000",
      }}
    >
      {/* ── Overlay: dark top + dark bottom, let globe glow show in middle ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.90) 0%, rgba(0,0,0,0.50) 35%, rgba(0,0,0,0.15) 55%, rgba(0,0,0,0.60) 80%, rgba(0,0,0,0.92) 100%)",
        }}
        aria-hidden="true"
      />

      {/* Dot particles */}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden="true"
      >
        {[
          { top: "5%", left: "4%" },
          { top: "14%", left: "12%" },
          { top: "28%", left: "3%" },
          { top: "55%", left: "7%" },
          { top: "8%", right: "5%" },
          { top: "22%", right: "3%" },
          { top: "50%", right: "6%" },
          { top: "3%", left: "45%" },
          { top: "18%", left: "35%" },
          { top: "18%", right: "35%" },
          { top: "70%", left: "5%" },
          { top: "75%", right: "4%" },
        ].map((pos, i) => (
          <span
            key={i}
            className="absolute h-[2px] w-[2px] rounded-full bg-slate-400/40"
            style={pos}
          />
        ))}
      </div>

      {/* ══════════════════════════
          HERO TEXT
      ══════════════════════════ */}
      <div className="relative z-10 mx-auto flex max-w-[680px] flex-col items-center gap-5 px-4 pt-16 sm:pt-24 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-white/[0.15] bg-black/50 backdrop-blur-sm px-4 py-1.5 text-xs tracking-widest">
          <span>🔥</span>
          <span className="font-bold text-amber-400">50,000+</span>
          <span className="text-slate-400">NEW JOBS THIS MONTH</span>
        </div>

        {/* H1 */}
        <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-6xl">
          Find Your Dream Job Today
        </h1>

        {/* Subtitle */}
        <p className="max-w-115 text-sm leading-relaxed text-slate-300 sm:text-base">
          HireLoop connects top talent with world-class companies. Browse
          thousands of curated opportunities and land your next role — faster.
        </p>

        {/* Search bar */}
        <div className="mt-2 w-full max-w-145">
          <div className="flex flex-col sm:flex-row items-stretch rounded-2xl border border-white/[0.12] bg-black/55 backdrop-blur-lg shadow-[0_4px_40px_rgba(0,0,0,0.5)] overflow-hidden">
            {/* Job input */}
            <div className="flex flex-1 items-center gap-3 px-5 py-4">
              <Search size={15} className="shrink-0 text-slate-500" />
              <input
                type="text"
                value={jobQuery}
                onChange={(e) => setJobQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Job title, skill or company"
                className="w-full bg-transparent text-sm text-white placeholder:text-slate-500 outline-none"
              />
            </div>

            {/* Divider */}
            <div className="h-px w-full sm:h-auto sm:w-px bg-white/[0.1]" />

            {/* Location input */}
            <div className="flex flex-1 items-center gap-3 px-5 py-4">
              <MapPin size={15} className="shrink-0 text-slate-500" />
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Location or Remote"
                className="w-full bg-transparent text-sm text-white placeholder:text-slate-500 outline-none"
              />
            </div>

            {/* Search button */}
            <div className="p-2">
              <button
                onClick={handleSearch}
                aria-label="Search"
                className="
                  w-full sm:w-10 h-10
                  flex items-center justify-center gap-2
                  rounded-xl
                  bg-linear-to-br from-indigo-500 to-violet-600
                  text-white text-sm font-semibold
                  transition-all duration-200
                  hover:shadow-[0_0_20px_rgba(139,92,246,0.5)]
                  hover:scale-[1.03] active:scale-95
                "
              >
                <Search size={15} />
                <span className="sm:hidden">Search Jobs</span>
              </button>
            </div>
          </div>
        </div>

        {/* Trending tags */}
        <div className="flex flex-wrap items-center justify-center gap-2 text-xs">
          <span className="text-slate-500">Trending Position</span>
          {trendingTags.map((tag) => (
            <button
              key={tag}
              onClick={() => {
                setJobQuery(tag);
                router.push(`/jobs?q=${encodeURIComponent(tag)}`);
              }}
              className="
                rounded-full border border-white/12
                bg-black/40 backdrop-blur-sm
                px-3 py-1 text-slate-300
                transition-all duration-200
                hover:border-violet-500/40
                hover:bg-violet-500/10
                hover:text-violet-300
              "
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* ══════════════════════════
          "Assisting" text over globe
      ══════════════════════════ */}
      <div className="relative z-10 mt-20 sm:mt-32 md:mt-44 lg:mt-52 text-center px-4 pb-12 sm:pb-16">
        <p className="text-sm sm:text-base md:text-2xl text-white/70">
          Assisting over{" "}
          <span className="font-semibold text-white">15,000 job seekers</span>
          <br />
          find their dream positions.
        </p>
      </div>

      {/* ══════════════════════════
          STATS CARDS
      ══════════════════════════ */}
      <div className="relative z-10  mx-auto max-w-11/12 mb-10">
        <div className=" grid gap-6 grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.id}
              className="
                  rounded-3xl
                  border border-white/10
                  bg-white/[0.03]
                  backdrop-blur-xl
                  p-6
                  transition-all
                  duration-300
                  hover:border-violet-500/30
                  hover:bg-white/[0.05]
                  hover:-translate-y-1
                "
            >
              {/* Card Glow */}
              <div className="absolute bottom-0 right-0 h-32 w-32 rounded-full bg-white/10 blur-3xl transition duration-300 group-hover:bg-violet-500/20" />

              {/* Icon */}
              <div className="relative z-10 text-white/90 ">{stat.icon}</div>

              {/* Number */}
              <h3 className="relative z-10 mt-16 text-5xl font-bold tracking-tight">
                {stat.value}
              </h3>

              {/* Label */}
              <p className="relative z-10 mt-4 text-base text-gray-300">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
