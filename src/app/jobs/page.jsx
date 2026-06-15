import JobCard from "@/components/Shared/jobs/JobCard";
import { getJobs } from "@/lib/api/jobs";
import React from "react";

const JobsPage = async () => {
  const jobs = await getJobs();

  return (
    <div className="p-8 bg-black min-h-screen flex justify-center items-center">
      <h2>Jobs: {jobs.length}</h2>
      <JobCard job={jobs[20]}></JobCard>
    </div>
  );
};

export default JobsPage;
