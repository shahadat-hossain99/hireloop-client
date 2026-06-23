import { getApplicationByApplicant } from "@/lib/api/application";
import { getUserSession } from "@/lib/core/session";
import { HiOutlineBuildingOffice, HiOutlineCalendar } from "react-icons/hi2";
import Link from "next/link";
import { redirect } from "next/navigation";
import ApplicationActions from "./ApplicationActions";

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

// --- Helper: Status Badge Component ---
const StatusBadge = ({ status }) => {
  if (!status) return null;

  // Define dynamic styles based on status
  let colorClasses = "bg-zinc-500/10 text-zinc-400 border-zinc-500/20";

  if (status.toLowerCase() === "applied") {
    colorClasses = "bg-blue-500/10 text-blue-400 border-blue-500/20";
  } else if (status.toLowerCase() === "reviewing") {
    colorClasses = "bg-amber-500/10 text-amber-400 border-amber-500/20";
  } else if (status.toLowerCase() === "interviewing") {
    colorClasses = "bg-indigo-500/10 text-indigo-400 border-indigo-500/20";
  } else if (status.toLowerCase() === "offered") {
    colorClasses = "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
  } else if (status.toLowerCase() === "rejected") {
    colorClasses = "bg-rose-500/10 text-rose-400 border-rose-500/20";
  }

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${colorClasses}`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full mr-1.5 ${colorClasses.split(" ")[1]}`}
      ></span>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

const JobsApplications = async () => {
  const user = await getUserSession();

  if (!user) redirect("/login");

  const jobs = await getApplicationByApplicant(user?.id);

  // Empty State Layout
  if (!jobs || jobs.length === 0) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Applications
          </h1>
          <p className="text-zinc-400 text-sm mt-1">
            Track and manage your submitted applications.
          </p>
        </div>
        <div className="w-full py-20 text-center bg-[#0d0d14] border border-white/5 rounded-2xl shadow-xl">
          <div className="inline-flex p-4 bg-white/5 rounded-full mb-4 border border-white/10">
            <HiOutlineBuildingOffice className="w-8 h-8 text-zinc-400" />
          </div>
          <h3 className="text-white text-lg font-semibold mb-1">
            No applications yet
          </h3>
          <p className="text-zinc-500 text-sm max-w-sm mx-auto">
            Start applying to your dream jobs and they will automatically show
            up here.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 space-y-6">
      {/* Dashboard Context Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-white/5 pb-5">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Applications
          </h1>
          <p className="text-zinc-400 text-sm mt-0.5">
            You have submitted{" "}
            <span className="text-indigo-400 font-semibold">{jobs.length}</span>{" "}
            application{jobs.length !== 1 ? "s" : ""} total.
          </p>
        </div>
      </div>

      {/* Responsive Table Wrapper */}
      <div className="bg-[#0d0d14] border border-white/5 rounded-2xl overflow-hidden shadow-2xl">
        {/* Desktop Table View */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300 table-auto">
            <thead className="bg-white/[0.02] border-b border-white/5">
              <tr>
                <th className="px-6 py-4.5 font-semibold text-zinc-400 tracking-wider">
                  Company & Role
                </th>
                <th className="px-6 py-4.5 font-semibold text-zinc-400 tracking-wider">
                  Applicant
                </th>
                {/* NEW STATUS COLUMN */}
                <th className="px-6 py-4.5 font-semibold text-zinc-400 tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4.5 font-semibold text-zinc-400 tracking-wider">
                  Applied On
                </th>
                <th className="px-6 py-4.5 font-semibold text-zinc-400 tracking-wider text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {jobs.map((job) => (
                <tr
                  key={job._id}
                  className="hover:bg-white/[0.01] transition-colors duration-150"
                >
                  {/* Company & Job ID */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3.5">
                      <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white font-bold text-sm border border-white/10 select-none">
                        {job.companyName?.charAt(0) || "C"}
                      </div>
                      <div className="min-w-0">
                        <p className="text-white font-medium truncate max-w-[200px]">
                          {job.companyName || "Unknown Company"}
                        </p>
                        <p className="text-zinc-500 font-mono text-[11px] mt-0.5 truncate max-w-[150px]">
                          ID: {job.jobId}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Applicant Name & Email */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3.5">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white font-semibold text-xs select-none">
                        {job.applicantName?.charAt(0) || "U"}
                      </div>
                      <div className="min-w-0">
                        <p className="text-zinc-200 font-medium truncate max-w-[180px]">
                          {job.applicantName}
                        </p>
                        <p className="text-zinc-500 text-xs truncate max-w-[180px]">
                          {job.applicantEmail}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* NEW STATUS BADGE */}
                  <td className="px-6 py-4">
                    <StatusBadge status={job.status || "applied"} />
                  </td>

                  {/* Date */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2 text-zinc-400">
                      <HiOutlineCalendar className="w-4 h-4 text-zinc-500" />
                      <span>{formatDate(job.createdAt)}</span>
                    </div>
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4 text-right whitespace-nowrap">
                    <ApplicationActions
                      jobId={job.jobId}
                      applicationId={job._id}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden flex flex-col gap-3 p-4 bg-[#07070a]">
          {jobs.map((job) => (
            <div
              key={job._id}
              className="bg-white/[0.01] border border-white/5 rounded-xl p-4 hover:bg-white/[0.02] transition-colors"
            >
              {/* Header: Company & Date */}
              <div className="flex justify-between items-start mb-3.5 gap-2">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white font-bold text-sm border border-white/10 shrink-0">
                    {job.companyName?.charAt(0) || "C"}
                  </div>
                  <div className="min-w-0">
                    <p className="text-white font-medium truncate">
                      {job.companyName || "Unknown Company"}
                    </p>
                    <p className="text-zinc-500 font-mono text-[11px] truncate">
                      ID: {job.jobId}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] font-medium text-zinc-400 bg-white/5 px-2.5 py-1 rounded-md shrink-0 border border-white/5">
                  <HiOutlineCalendar className="w-3 h-3 text-zinc-500" />
                  {formatDate(job.createdAt)}
                </div>
              </div>

              {/* Applicant Info */}
              <div className="flex items-center justify-between gap-2.5 mb-3 bg-white/[0.01] p-2 rounded-lg border border-white/[0.02]">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white font-semibold text-[10px] shrink-0">
                    {job.applicantName?.charAt(0) || "U"}
                  </div>
                  <div className="min-w-0">
                    <p className="text-zinc-300 text-xs font-medium truncate">
                      {job.applicantName}
                    </p>
                    <p className="text-zinc-500 text-[11px] truncate">
                      {job.applicantEmail}
                    </p>
                  </div>
                </div>

                {/* NEW MOBILE STATUS BADGE */}
                <StatusBadge status={job.status || "applied"} />
              </div>

              {/* Mobile Actions */}
              <div className="pt-3 border-t border-white/5">
                <ApplicationActions jobId={job.jobId} applicationId={job._id} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default JobsApplications;
