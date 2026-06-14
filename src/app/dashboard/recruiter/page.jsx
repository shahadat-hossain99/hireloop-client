"use client";
import { DashboardStats } from "@/components/dashboard/DashboardStats";
import { useSession } from "@/lib/auth-client";

import {
  Briefcase,
  Persons,
  Thunderbolt,
  CircleCheck,
} from "@gravity-ui/icons";

const RecruiterDashboardPage = () => {
  const { data: session, isPending } = useSession();

  // if (isPending) {
  //   return (
  //     <div className="w-full max-w-6xl mx-auto space-y-4 p-4 mt-7 animate-pulse">
  //       {/* Title Section Skeleton */}
  //       <div className="space-y-2 border-b border-[#2d2d2d] pb-5">
  //         <div className="h-7 w-48 bg-[#1c1c1c] rounded-md border border-[#2d2d2d]" />
  //         <div className="h-4 w-80 bg-[#1c1c1c] rounded-md border border-[#2d2d2d]" />
  //       </div>

  //       {/* Rows/Cards Skeleton */}
  //       {[1, 2, 3].map((index) => (
  //         <div
  //           key={index}
  //           className="bg-[#1c1c1c] border border-[#2d2d2d] rounded-xl p-5 space-y-4"
  //         >
  //           <div className="flex justify-between items-start">
  //             <div className="space-y-2 w-1/3">
  //               <div className="h-5 bg-[#242424] rounded-md" />
  //               <div className="h-3 bg-[#242424]/60 rounded-md w-2/3" />
  //             </div>
  //             <div className="h-6 w-16 bg-[#242424] rounded-full" />
  //           </div>
  //           <div className="h-px bg-[#2d2d2d]/60 w-full" />
  //           <div className="flex justify-between items-center pt-1">
  //             <div className="h-3 bg-[#242424]/60 rounded-md w-24" />
  //             <div className="flex gap-2">
  //               <div className="h-8 w-8 bg-[#242424] rounded-lg" />
  //               <div className="h-8 w-8 bg-[#242424] rounded-lg" />
  //             </div>
  //           </div>
  //         </div>
  //       ))}
  //     </div>
  //   );
  // }

  if (isPending) {
    return (
      <div className="min-h-[400px] w-full flex flex-col items-center justify-center gap-4 bg-[#000000]">
        <div className="relative w-12 h-12">
          {/* Outer Blue Ring */}
          <div className="absolute inset-0 border-2 border-t-[#3b82f6] border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin [animation-duration:0.8s]" />

          {/* Inner Orange Ring (Slower/Reverse) */}
          <div className="absolute inset-1 border-2 border-b-[#f97316] border-t-transparent border-r-transparent border-l-transparent rounded-full animate-spin [animation-duration:1.2s] reverse" />

          {/* Decorative center glow */}
          <div className="absolute inset-3 bg-white/10 rounded-full blur-sm" />
        </div>

        {/* Subtle Text */}
        <p className="text-xs font-medium tracking-widest text-[#a1a1a1] uppercase animate-pulse">
          Fetching Records
        </p>
      </div>
    );
  }

  const user = session?.user;

  const recruiterStats = [
    { title: "Total Job Posts", value: "48", icon: Briefcase },
    { title: "Total Applicants", value: "1,284", icon: Persons },
    { title: "Active Jobs", value: "18", icon: Thunderbolt },
    { title: "Jobs Closed", value: "32", icon: CircleCheck },
  ];
  return (
    <div className="space-y-7 mt-8">
      <h2 className="text-3xl md:text-4xl mx-auto max-w-[88%]">
        Welcome back, {user?.name}
      </h2>
      <DashboardStats statsData={recruiterStats} />
    </div>
  );
};

export default RecruiterDashboardPage;
