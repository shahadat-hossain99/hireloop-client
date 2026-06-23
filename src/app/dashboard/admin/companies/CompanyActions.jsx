"use client";

import { useState } from "react";
import { toast } from "@heroui/react";

import { updateCompany } from "@/lib/actions/companies";
import { useRouter } from "next/navigation";

// Replace this with your actual Server Action import
// import { updateCompanyStatus } from "@/lib/actions/companies";

export default function CompanyActions({ companyId, currentStatus }) {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter(); // 2. For refreshing the page

  const handleStatusUpdate = async (newStatus) => {
    setIsLoading(true);
    try {
      // Example API call. Replace with your actual mutation logic.
      // await updateCompanyStatus(companyId, newStatus);

      // 3. Call the Server Action with the ID and the new status
      const result = await updateCompany(companyId, { status: newStatus });

      // Optional: Check if your serverMutation returns an error
      if (result.error) throw new Error(result.error);

      console.log(`Updating ${companyId} to ${newStatus}`);
      toast.success(`Company status updated to ${newStatus}`);

      // Refresh the page to show the new status immediately
      //   window.location.reload();

      // 4. Use router.refresh() instead of window.location.reload()
      // This updates the UI from the server without a full page flash.
      router.refresh();
    } catch (error) {
      toast.error("Failed to update status");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-end gap-2">
      {/* Only show Approve if NOT already Approved */}
      {currentStatus !== "Approved" && (
        <button
          onClick={() => handleStatusUpdate("Approved")}
          disabled={isLoading}
          className="px-3 py-1.5 rounded-md text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20 hover:border-emerald-500/40 transition-all duration-200 disabled:opacity-50"
        >
          {isLoading ? "..." : "Approve"}
        </button>
      )}

      {/* Only show Reject if NOT already Rejected */}
      {currentStatus !== "Rejected" && (
        <button
          onClick={() => handleStatusUpdate("Rejected")}
          disabled={isLoading}
          className="px-3 py-1.5 rounded-md text-xs font-semibold bg-rose-500/10 text-rose-400 border border-rose-500/20 hover:bg-rose-500/20 hover:border-rose-500/40 transition-all duration-200 disabled:opacity-50"
        >
          {isLoading ? "..." : "Reject"}
        </button>
      )}
    </div>
  );
}
