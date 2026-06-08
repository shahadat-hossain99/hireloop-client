"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, MapPin } from "lucide-react";

const trendingTags = ["Product Designer", "AI Engineering", "Dev-ops Engineer"];

export default function HeroBanner() {
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
    <section className="relative w-full overflow-hidden bg-[#000000] py-24 text-white">
      {/* Background glow */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 flex justify-center"
        aria-hidden="true"
      >
        <div
          className="h-[400px] w-[800px] rounded-full opacity-20 blur-[120px]"
          style={{
            background:
              "radial-gradient(ellipse, #6d28d9 0%, #4f46e5 40%, transparent 70%)",
          }}
        />
      </div>

      {/* Dot particles — decorative */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        {[
          { top: "15%", left: "8%" },
          { top: "25%", left: "18%" },
          { top: "60%", left: "5%" },
          { top: "70%", left: "14%" },
          { top: "20%", right: "10%" },
          { top: "35%", right: "6%" },
          { top: "65%", right: "12%" },
          { top: "75%", right: "20%" },
          { top: "10%", left: "45%" },
          { top: "80%", left: "50%" },
        ].map((pos, i) => (
          <span
            key={i}
            className="absolute h-[3px] w-[3px] rounded-full bg-slate-500/60"
            style={pos}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto flex max-w-[720px] flex-col items-center gap-6 px-4 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-white/[0.1] bg-white/[0.05] px-4 py-1.5 text-xs tracking-widest">
          <span>🔥</span>
          <span className="font-bold text-amber-400">50,000+</span>
          <span className="text-slate-400">NEW JOBS THIS MONTH</span>
        </div>

        {/* Heading */}
        <h1 className="text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl">
          Find Your Dream Job Today
        </h1>

        {/* Subtitle */}
        <p className="max-w-[480px] text-sm leading-relaxed text-slate-400 sm:text-base">
          HireLoop connects top talent with world-class companies. Browse
          thousands of curated opportunities and land your next role — faster.
        </p>

        {/* Search bar */}
        <div className="mt-2 w-full max-w-[620px]">
          <div className="flex items-center rounded-2xl border border-white/[0.1] bg-[#111118] shadow-[0_4px_32px_rgba(0,0,0,0.4)]">
            {/* Job input */}
            <div className="flex flex-1 items-center gap-3 px-5 py-3.5">
              <Search size={16} className="shrink-0 text-slate-500" />
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
            <div className="h-6 w-px shrink-0 bg-white/[0.1]" />

            {/* Location input */}
            <div className="flex flex-1 items-center gap-3 px-5 py-3.5">
              <MapPin size={16} className="shrink-0 text-slate-500" />
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
            <div className="p-2 pr-2">
              <button
                onClick={handleSearch}
                className="
                  flex h-10 w-10 shrink-0 items-center justify-center
                  rounded-xl
                  bg-gradient-to-br from-indigo-500 to-violet-600
                  text-white
                  transition-all duration-200
                  hover:scale-[1.05]
                  hover:shadow-[0_0_16px_rgba(139,92,246,0.5)]
                  active:scale-95
                "
                aria-label="Search jobs"
              >
                <Search size={16} />
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
                rounded-full
                border border-white/[0.1]
                bg-white/[0.05]
                px-3 py-1
                text-slate-300
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
    </section>
  );
}
