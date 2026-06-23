import { getCompanies } from "@/lib/api/companies";
import React from "react";
import CompanyActions from "./CompanyActions";
import {
  HiOutlineCalendar,
  HiOutlineOfficeBuilding,
  HiOutlineMail,
} from "react-icons/hi";
import { HiOutlineGlobeAlt } from "react-icons/hi2";

// --- Helper: Format Date ---
const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
};

// --- Helper: Status Badge ---
const StatusBadge = ({ status }) => {
  let colorClasses = "bg-zinc-500/10 text-zinc-400 border-zinc-500/20";
  let dotColor = "bg-zinc-400";

  if (status === "Approved") {
    colorClasses = "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
    dotColor = "bg-emerald-400";
  } else if (status === "Pending") {
    colorClasses = "bg-amber-500/10 text-amber-400 border-amber-500/20";
    dotColor = "bg-amber-400";
  } else if (status === "Rejected") {
    colorClasses = "bg-rose-500/10 text-rose-400 border-rose-500/20";
    dotColor = "bg-rose-400";
  }

  return (
    <span
      className={`inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full text-xs font-medium border ${colorClasses}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${dotColor}`}></span>
      {status}
    </span>
  );
};

const AdminCompaniesPage = async () => {
  const companies = await getCompanies();

  return (
    /* 1. Outer wrapper: Centers content and prevents it from touching the edges */
    <div className="w-full min-w-0 flex justify-center px-4 sm:px-6 lg:px-8 py-6">
      {/* 2. Inner wrapper: The "Max-Width" box that stops the table from stretching too far */}
      <div className="w-full max-w-7xl space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              Company Management
            </h2>
            <p className="text-zinc-400 text-sm mt-1">
              Review and manage company verification requests.
            </p>
          </div>
        </div>

        {/* --- RESPONSIVE CONTAINER --- */}
        <div className="bg-[#0d0d14] border border-white/5 rounded-xl overflow-hidden shadow-lg w-full">
          {/* 1. DESKTOP TABLE VIEW */}
          <div className="hidden md:block w-full overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="bg-white/[0.03] border-b border-white/5">
                <tr>
                  <th className="px-6 py-4 font-medium text-zinc-400 tracking-wider text-xs uppercase w-[22%]">
                    Company Name
                  </th>
                  <th className="px-6 py-4 font-medium text-zinc-400 tracking-wider text-xs uppercase w-[20%]">
                    Recruiter Email
                  </th>
                  <th className="px-6 py-4 font-medium text-zinc-400 tracking-wider text-xs uppercase w-[15%]">
                    Industry
                  </th>
                  <th className="px-6 py-4 font-medium text-zinc-400 tracking-wider text-xs uppercase w-[13%]">
                    Status
                  </th>
                  <th className="px-6 py-4 font-medium text-zinc-400 tracking-wider text-xs uppercase w-[15%]">
                    Date Submitted
                  </th>
                  <th className="px-6 py-4 font-medium text-zinc-400 tracking-wider text-xs uppercase w-[15%] text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {companies.map((company) => (
                  <tr
                    key={company._id}
                    className="hover:bg-white/[0.02] transition-colors duration-200"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-9 h-9 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center overflow-hidden shrink-0">
                          {company.logo ? (
                            <img
                              src={company.logo}
                              alt={company.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <span className="text-white font-bold text-sm">
                              {company.name?.charAt(0) || "C"}
                            </span>
                          )}
                        </div>
                        <div className="min-w-0">
                          <p className="text-white font-medium truncate max-w-[140px]">
                            {company.name}
                          </p>
                          <p className="text-zinc-500 text-[11px] truncate max-w-[140px]">
                            {company.websiteUrl || "No website"}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-zinc-300 truncate max-w-[160px] font-mono text-[12px]">
                        {company.recruiterId || "N/A"}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-block px-2.5 py-1 rounded-md bg-white/5 text-zinc-400 text-xs font-medium border border-white/5 capitalize truncate max-w-[120px]">
                        {company.industry || "General"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={company.status || "Pending"} />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-zinc-400">
                        <HiOutlineCalendar className="w-4 h-4 text-zinc-500 shrink-0" />
                        <span className="truncate">
                          {formatDate(company.createdAt)}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <CompanyActions
                        companyId={company._id}
                        currentStatus={company.status || "Pending"}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 2. MOBILE CARD VIEW */}
          <div className="md:hidden flex flex-col gap-3 p-4 bg-[#0a0a0f]">
            {companies.map((company) => (
              <div
                key={company._id}
                className="bg-[#14141c] border border-white/5 rounded-xl p-4 hover:bg-white/[0.02] transition-colors"
              >
                {/* Header: Company + Status */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center overflow-hidden shrink-0">
                      {company.logo ? (
                        <img
                          src={company.logo}
                          alt={company.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-white font-bold text-sm">
                          {company.name?.charAt(0) || "C"}
                        </span>
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="text-white font-medium truncate text-base">
                        {company.name}
                      </p>
                      {company.websiteUrl && (
                        <a
                          href={company.websiteUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-zinc-500 text-xs truncate flex items-center gap-1 hover:text-indigo-400 transition-colors"
                        >
                          <HiOutlineGlobeAlt className="w-3 h-3" />{" "}
                          {company.websiteUrl.replace(/^https?:\/\//, "")}
                        </a>
                      )}
                    </div>
                  </div>
                  <StatusBadge status={company.status || "Pending"} />
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-1 gap-2 mb-4 text-xs">
                  <div className="flex items-center gap-2 text-zinc-400 bg-white/[0.02] p-2 rounded-lg">
                    <HiOutlineMail className="w-4 h-4 text-zinc-500 shrink-0" />
                    <span className="truncate font-mono">
                      {company.recruiterId || "No email provided"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-zinc-400 bg-white/[0.02] p-2 rounded-lg">
                    <HiOutlineOfficeBuilding className="w-4 h-4 text-zinc-500 shrink-0" />
                    <span className="capitalize truncate">
                      {company.industry || "General Industry"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-zinc-400 bg-white/[0.02] p-2 rounded-lg">
                    <HiOutlineCalendar className="w-4 h-4 text-zinc-500 shrink-0" />
                    <span>Submitted: {formatDate(company.createdAt)}</span>
                  </div>
                </div>

                {/* Mobile Actions (Full Width Buttons) */}
                <div className="pt-3 border-t border-white/5">
                  <CompanyActions
                    companyId={company._id}
                    currentStatus={company.status || "Pending"}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Footer */}
          <div className="px-6 py-4 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 bg-black/20">
            <p className="text-xs text-zinc-500">
              Showing{" "}
              <span className="text-zinc-300 font-medium">
                1-{companies.length}
              </span>{" "}
              of{" "}
              <span className="text-zinc-300 font-medium">
                {companies.length}
              </span>{" "}
              companies
            </p>
            <div className="flex items-center gap-1">
              <button className="w-8 h-8 rounded-md bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed border border-white/5">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <button className="w-8 h-8 rounded-md bg-white/10 text-white border border-white/10 flex items-center justify-center font-medium text-sm">
                1
              </button>
              <button className="w-8 h-8 rounded-md bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white transition-colors flex items-center justify-center border border-white/5">
                2
              </button>
              <button className="w-8 h-8 rounded-md bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white transition-colors flex items-center justify-center border border-white/5">
                3
              </button>
              <button className="w-8 h-8 rounded-md bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed border border-white/5">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminCompaniesPage;
