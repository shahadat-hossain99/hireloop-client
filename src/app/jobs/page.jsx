// app/jobs/page.jsx
// import JobCard from "@/components/Shared/jobs/JobCard";
import JobFilterSection from "@/components/Shared/jobs/JobFilterSection";
import { getJobs } from "@/lib/api/jobs";

const JobsPage = async () => {
  const jobs = (await getJobs()) || [];

  return (
    <div className="min-h-screen bg-black text-[#ededed] p-4 sm:p-8 md:p-12 mt-10">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Header */}
        <div className="space-y-2 border-b border-white/10 pb-6">
          <h1 className="text-3xl sm:text-4xl font-bold text-white">
            Explore All Open Roles
          </h1>

          <p className="max-w-2xl text-sm sm:text-base text-zinc-400">
            Discover your next career step. Filter through active positions,
            connect with world-class engineering teams, and submit applications
            effortlessly.
          </p>
        </div>

        {/* Client Filter Component */}
        <JobFilterSection jobs={jobs} />
      </div>
    </div>
  );
};

export default JobsPage;
