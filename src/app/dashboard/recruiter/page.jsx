"use client";
import { useSession } from "@/lib/auth-client";

const RecruiterDashboardPage = () => {
  const { data: session, isPending } = useSession();

  const user = session?.user;
  return (
    <div>
      <h2>I am a RecruiterPage</h2>
    </div>
  );
};

export default RecruiterDashboardPage;
