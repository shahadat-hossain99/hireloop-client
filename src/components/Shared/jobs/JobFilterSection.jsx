"use client";

import { useMemo, useState } from "react";
import JobCard from "./JobCard";

export default function JobFilterSection({ jobs }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [jobType, setJobType] = useState("all");
  const [remote, setRemote] = useState("all");
  const [company, setCompany] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [minSalary, setMinSalary] = useState("");

  const categories = ["all", ...new Set(jobs.map((job) => job.category))];

  const companies = ["all", ...new Set(jobs.map((job) => job.companyName))];

  const filteredJobs = useMemo(() => {
    let result = [...jobs];

    // Search
    if (search.trim()) {
      const q = search.toLowerCase();

      result = result.filter(
        (job) =>
          job.title?.toLowerCase().includes(q) ||
          job.companyName?.toLowerCase().includes(q),
      );
    }

    // Category
    if (category !== "all") {
      result = result.filter((job) => job.category === category);
    }

    // Job Type
    if (jobType !== "all") {
      result = result.filter((job) => job.jobType === jobType);
    }

    // Remote
    if (remote !== "all") {
      result = result.filter((job) =>
        remote === "remote" ? job.isRemote : !job.isRemote,
      );
    }

    // Company
    if (company !== "all") {
      result = result.filter((job) => job.companyName === company);
    }

    // Salary
    if (minSalary) {
      result = result.filter(
        (job) => Number(job.salaryMax) >= Number(minSalary),
      );
    }

    return result;
  }, [jobs, search, category, jobType, remote, company, minSalary]);

  const sortedJobs = useMemo(() => {
    const data = [...filteredJobs];

    switch (sortBy) {
      case "salary-high":
        return data.sort((a, b) => Number(b.salaryMax) - Number(a.salaryMax));

      case "salary-low":
        return data.sort((a, b) => Number(a.salaryMin) - Number(b.salaryMin));

      case "deadline":
        return data.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));

      default:
        return data;
    }
  }, [filteredJobs, sortBy]);

  return (
    <>
      {/* Filter Section */}
      <div className="rounded-3xl border border-white/10 bg-zinc-950 p-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {/* Search */}
          <input
            type="text"
            placeholder="Search jobs or company..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-12 rounded-xl border border-white/10 bg-black px-4 text-white outline-none focus:border-violet-500"
          />

          {/* Category */}
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="h-12 rounded-xl border border-white/10 bg-black px-4 text-white"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat === "all" ? "All Categories" : cat}
              </option>
            ))}
          </select>

          {/* Job Type */}
          <select
            value={jobType}
            onChange={(e) => setJobType(e.target.value)}
            className="h-12 rounded-xl border border-white/10 bg-black px-4 text-white"
          >
            <option value="all">All Types</option>
            <option value="full-time">Full Time</option>
            <option value="part-time">Part Time</option>
            <option value="contract">Contract</option>
            <option value="internship">Internship</option>
          </select>

          {/* Remote */}
          <select
            value={remote}
            onChange={(e) => setRemote(e.target.value)}
            className="h-12 rounded-xl border border-white/10 bg-black px-4 text-white"
          >
            <option value="all">All Modes</option>
            <option value="remote">Remote</option>
            <option value="onsite">On-site</option>
          </select>

          {/* Company */}
          <select
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className="h-12 rounded-xl border border-white/10 bg-black px-4 text-white"
          >
            {companies.map((company) => (
              <option key={company} value={company}>
                {company === "all" ? "All Companies" : company}
              </option>
            ))}
          </select>

          {/* Salary */}
          <input
            type="number"
            placeholder="Minimum Salary"
            value={minSalary}
            onChange={(e) => setMinSalary(e.target.value)}
            className="h-12 rounded-xl border border-white/10 bg-black px-4 text-white outline-none focus:border-violet-500"
          />

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="h-12 rounded-xl border border-white/10 bg-black px-4 text-white"
          >
            <option value="newest">Newest</option>
            <option value="salary-high">Salary High → Low</option>
            <option value="salary-low">Salary Low → High</option>
            <option value="deadline">Deadline</option>
          </select>
        </div>

        <div className="mt-5 text-sm text-zinc-400">
          Showing{" "}
          <span className="font-semibold text-white">{sortedJobs.length}</span>{" "}
          jobs
        </div>
      </div>

      {/* Jobs Grid */}
      {sortedJobs.length === 0 ? (
        <div className="rounded-2xl border border-white/10 bg-zinc-950 py-16 text-center text-zinc-400">
          No matching jobs found.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {sortedJobs.map((job) => (
            <div key={job._id} className="h-full">
              <JobCard job={job} />
            </div>
          ))}
        </div>
      )}
    </>
  );
}
