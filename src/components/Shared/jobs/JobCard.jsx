import React from "react";
import { Card, Link } from "@heroui/react";
import { MapPin, Briefcase, CircleDollar, ArrowRight } from "@gravity-ui/icons";

export default function JobCard({ job }) {
  if (!job) return null;

  // Safe salary formatter
  const formatSalary = (amount) => {
    if (!amount) return "0";
    const numericAmount = parseInt(amount, 10);
    return numericAmount >= 1000 ? `${numericAmount / 1000}k` : amount;
  };

  // Correct fields: salaryMin / salaryMax + currency support
  const salaryRange =
    job.salaryMin && job.salaryMax
      ? `${job.currency || "$"} ${formatSalary(job.salaryMin)}–${formatSalary(
          job.salaryMax,
        )} / year`
      : "Salary Negotiable";

  // Safe job id handling
  const jobId = job._id?.$oid || job._id;

  return (
    <Card className="w-full max-w-[440px] h-full flex flex-col p-6 border-none bg-zinc-900 text-zinc-100 rounded-[32px] shadow-2xl">
      {/* HEADER */}
      <Card.Header className="flex flex-col gap-4 p-0 pb-3">
        {/* Company */}
        <div className="flex items-center gap-3">
          {job.companyLogo && (
            <img
              src={job.companyLogo}
              alt="logo"
              className="w-8 h-8 object-contain rounded-md"
            />
          )}
          <span className="text-lg font-medium text-zinc-300">
            {job.companyName || "Company"}
          </span>
        </div>

        {/* Title */}
        <Card.Title className="text-3xl font-semibold text-white leading-tight line-clamp-2">
          {job.title}
        </Card.Title>

        {/* Description (fixed height behavior) */}
        <Card.Description className="text-base text-zinc-400 line-clamp-2 min-h-[40px]">
          {job.responsibilities}
        </Card.Description>
      </Card.Header>

      {/* CONTENT */}
      <Card.Content className="flex flex-col gap-5 py-4 flex-grow">
        {/* BADGES (IMPORTANT FIX) */}
        <div className="flex flex-wrap gap-2 min-h-[42px]">
          {/* Location */}
          <div className="flex items-center gap-2 bg-zinc-800/60 px-4 py-2 rounded-full border border-zinc-800">
            <MapPin className="text-purple-400 w-4 h-4" />
            <span className="text-sm text-zinc-200">
              {job.location || "Remote"} {job.isRemote && "(Remote)"}
            </span>
          </div>

          {/* Job Type */}
          <div className="flex items-center gap-2 bg-zinc-800/60 px-4 py-2 rounded-full border border-zinc-800">
            <Briefcase className="text-purple-400 w-4 h-4" />
            <span className="text-sm text-zinc-200 capitalize">
              {job.jobType || "Full-time"}
            </span>
          </div>

          {/* Salary */}
          <div className="flex items-center gap-2 bg-zinc-800/60 px-4 py-2 rounded-full border border-zinc-800">
            <CircleDollar className="text-purple-400 w-4 h-4" />
            <span className="text-sm text-zinc-200">
              {job.currency} {formatSalary(job.salaryMin)}–
              {formatSalary(job.salaryMax)}
            </span>
          </div>
        </div>

        {/* REQUIREMENTS BLOCK (fixed height consistency) */}
        <div className="text-xs text-zinc-500 space-y-1 border-t border-zinc-800/60 pt-3 min-h-[60px]">
          <p>
            <strong className="text-zinc-400">Requirements:</strong>{" "}
            {job.requirements || "Not specified"}
          </p>
          <p>
            <strong className="text-zinc-400">Benefits:</strong>{" "}
            {job.benefits || "Standard benefits"}
          </p>
        </div>
      </Card.Content>

      {/* FOOTER (FIXED POSITION) */}
      <Card.Footer className="mt-auto pt-4 p-0">
        <Link
          href={`/jobs/${job._id}`}
          className="group flex items-center gap-2 text-white hover:bg-zinc-800/40 transition-all"
        >
          Apply Now
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </Card.Footer>
    </Card>
  );
}
