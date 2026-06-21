import { getJobById } from "@/lib/api/jobs";
import { getUserSession } from "@/lib/core/session";
import { redirect } from "next/navigation";
import React from "react";
import JobApply from "./JobApply";
import { getApplicationByApplicant } from "@/lib/api/application";
import Link from "next/link";

const ApplyPage = async ({ params }) => {
  const { id } = await params;
  const user = await getUserSession();

  if (!user) {
    redirect(`/auth/signin?redirect=/jobs/${id}/apply`);
  }

  // Elegant Unauthenticated/Wrong Role State
  if (user.role !== "seeker") {
    return (
      <div className="w-full min-h-[80vh] flex flex-col justify-center items-center px-6 text-center">
        <div className="max-w-md p-8 bg-zinc-900 border border-zinc-800 rounded-2xl shadow-xl">
          <div className="w-12 h-12 bg-red-500/10 text-red-400 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-zinc-100 mb-2">
            Access Denied
          </h3>
          <p className="text-zinc-400 mb-6 text-sm leading-relaxed">
            Only Job Seekers can apply for this position. Please sign up or
            switch to a Job Seeker account to proceed.
          </p>
          <Link
            href="/auth/signup"
            className="inline-flex w-full justify-center items-center px-4 py-2.5 bg-white text-zinc-950 font-medium rounded-xl hover:bg-zinc-200 transition-colors"
          >
            Create Seeker Account
          </Link>
        </div>
      </div>
    );
  }

  const applications = await getApplicationByApplicant(user.id);

  const plan = {
    name: "Free",
    maxApplicationsPerMonth: 3,
  };

  const job = await getJobById(id);
  const hasReachedLimit = applications.length >= plan.maxApplicationsPerMonth;

  return (
    <div className="max-w-[88%] mx-auto px-4 py-8 sm:px-6 lg:px-8 min-h-screen">
      {/* Header & Application Counter Card */}
      <div className="bg-zinc-900/50 border border-zinc-800/80 rounded-2xl p-6 mb-8 backdrop-blur-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-wider text-zinc-500 font-semibold">
            Your Usage
          </span>
          <h2 className="text-lg text-zinc-300 mt-0.5">
            Monthly Application Progress
          </h2>
        </div>
        <div className="flex items-baseline gap-1 bg-zinc-900 px-4 py-2 rounded-xl border border-zinc-800 self-start sm:self-auto">
          <span
            className={`text-2xl font-bold ${hasReachedLimit ? "text-red-400" : "text-orange-500"}`}
          >
            {applications.length}
          </span>
          <span className="text-zinc-500 text-sm">/</span>
          <span className="text-zinc-400 font-medium text-sm">
            {plan.maxApplicationsPerMonth} used
          </span>
        </div>
      </div>

      {/* Main Content Conditional Flow */}
      {hasReachedLimit ? (
        <div className="bg-orange-500/10 border border-orange-500/20 rounded-2xl p-6 text-center sm:text-left flex flex-col sm:flex-row items-center gap-4  ">
          <div className="p-3 bg-orange-500/10 text-orange-400 rounded-xl hidden sm:block">
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>
          <div className="flex-1">
            <h4 className="text-orange-400 font-medium mb-1">
              Application Limit Reached
            </h4>
            <p className="text-zinc-400 text-sm">
              You are currently on the{" "}
              <span className="font-semibold text-zinc-300">{plan.name}</span>{" "}
              plan. Upgrade to Premium to unlock unlimited job applications.
            </p>
          </div>
          <Link
            href="/plans"
            className="whitespace-nowrap px-5 py-2.5 bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium rounded-xl transition-colors shadow-lg shadow-orange-500/10"
          >
            Upgrade Now
          </Link>
        </div>
      ) : (
        <div className=" p-6 sm:p-8 shadow-xl">
          <JobApply applicant={user} job={job} />
        </div>
      )}
    </div>
  );
};

export default ApplyPage;
