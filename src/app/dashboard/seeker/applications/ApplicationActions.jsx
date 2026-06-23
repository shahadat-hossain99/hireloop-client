"use client";

import { HiOutlineEye, HiOutlineTrash } from "react-icons/hi";
import Link from "next/link";

export default function ApplicationActions({ jobId, applicationId }) {
  const handleDelete = () => {
    // Add your delete logic here (e.g., calling a server action or API)
    console.log("Delete application:", applicationId);

    // Example using a confirmation:
    // if (confirm("Are you sure you want to delete this application?")) {
    //   deleteApplicationAction(applicationId);
    // }
  };

  return (
    <div className="flex items-center justify-end gap-2">
      <Link
        href={`/jobs/${jobId}`}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-200"
      >
        <HiOutlineEye className="w-4 h-4" />
        <span className="hidden sm:inline">View</span>
      </Link>
      <button
        onClick={handleDelete}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-red-400 border border-red-500/20 hover:bg-red-500/10 hover:border-red-500/30 transition-all duration-200"
      >
        <HiOutlineTrash className="w-4 h-4" />
        <span className="hidden sm:inline">Delete</span>
      </button>
    </div>
  );
}
