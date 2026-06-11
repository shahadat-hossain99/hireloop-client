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

  if (isPending) {
    return <div>Loading ......</div>;
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
