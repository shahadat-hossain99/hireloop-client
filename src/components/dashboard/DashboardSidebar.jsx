"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "@/lib/auth-client";

import {
  LayoutSideContentLeft,
  PersonPlus,
  Envelope,
  Gear,
  House,
  Magnifier,
  Person,
  BriefcaseFill,
  CreditCard,
  Bookmark,
  PersonFill,
} from "@gravity-ui/icons";

// Standard components from HeroUI v3
import { Button, Drawer } from "@heroui/react";

const recruiterNav = [
  { icon: House, label: "Dashboard", href: "/dashboard/recruiter" },
  { icon: Magnifier, label: "Jobs", href: "/dashboard/recruiter/jobs" },
  {
    icon: PersonPlus,
    label: "Post Jobs",
    href: "/dashboard/recruiter/jobs/new",
  },
  {
    icon: BriefcaseFill,
    label: "Company Profile",
    href: "/dashboard/recruiter/company",
  },
  { icon: Envelope, label: "Messages", href: "/dashboard/messages" },
  { icon: Person, label: "Profile", href: "/dashboard/profile" },
  { icon: Gear, label: "Settings", href: "/dashboard/settings" },
];

const seekerNav = [
  { icon: House, label: "Dashboard", href: "/dashboard/seeker" },
  { icon: Magnifier, label: "Jobs", href: "/dashboard/seeker/jobs" },
  {
    icon: Bookmark,
    label: "Saved Jobs",
    href: "/dashboard/seeker/saved-jobs", // Fixed typo in URL
  },
  {
    icon: BriefcaseFill,
    label: "Applications",
    href: "/dashboard/seeker/applications",
  },
  { icon: CreditCard, label: "Billing", href: "/dashboard/seeker/billing" },
  { icon: Person, label: "Profile", href: "/dashboard/profile" },
  { icon: Gear, label: "Settings", href: "/dashboard/settings" },
];

const adminNav = [
  { icon: House, label: "Dashboard", href: "/dashboard/admin" },
  { icon: PersonFill, label: "Users", href: "/dashboard/admin/users" },

  {
    icon: BriefcaseFill,
    label: "Companies",
    href: "/dashboard/admin/companies",
  },
  { icon: Person, label: "Jobs", href: "/dashboard/admin/jobs" },
  { icon: CreditCard, label: "Payments", href: "/dashboard/admin/Payments" },
  { icon: Gear, label: "Settings", href: "/dashboard/admin/settings" },
];

const navLinksMapping = {
  seeker: seekerNav,
  recruiter: recruiterNav,
  admin: adminNav,
};

function SidebarNavigation({ navItems, pathname, onItemClick }) {
  return (
    <nav className="space-y-1.5">
      {navItems.map((item) => {
        const active = pathname === item.href;

        return (
          <Link
            key={item.label}
            href={item.href}
            onClick={onItemClick}
            className={`
              group flex items-center gap-3.5 rounded-xl px-4 py-3
              transition-all duration-300 relative overflow-hidden
              ${
                active
                  ? "bg-gradient-to-r from-violet-600/15 to-indigo-600/5 text-violet-400 border border-violet-500/10"
                  : "text-slate-400 hover:bg-white/[0.03] hover:text-white"
              }
            `}
          >
            {active && (
              <span className="absolute left-0 top-1/4 h-1/2 w-[3px] rounded-r-full bg-violet-500" />
            )}

            <item.icon
              className={`
                size-5 transition-transform duration-300
                ${active ? "text-violet-400 scale-110" : "text-slate-500 group-hover:text-slate-200 group-hover:scale-105"}
              `}
            />

            <span className="font-medium text-[14px] tracking-wide">
              {item.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}

export function DashboardSidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const { data: session, isPending } = useSession();

  // Derive nav items based on user role
  const navItems = useMemo(() => {
    const user = session?.user;
    const role = user?.role || "seeker"; // Default to seeker if no role

    return navLinksMapping[role] || navLinksMapping.seeker;
  }, [session?.user]);

  console.log(session?.user);
  console.log(session?.user?.role);

  // Explicit, fail-safe open and close controllers
  const closeDrawer = () => setIsOpen(false);

  // Show loading state while session is pending
  if (isPending) {
    return (
      <div className="hidden lg:flex w-72 shrink-0 flex-col rounded-[24px] border border-white/[0.06] bg-[#0d0d14] p-6 mt-7 items-center justify-center">
        <div className="animate-pulse text-slate-400">Loading...</div>
      </div>
    );
  }

  return (
    <>
      {/* 1. Mobile Floating Trigger Menu Button */}
      <Button
        onClick={() => {
          setIsOpen(!isOpen);
        }}
        className="
          fixed bottom-6 right-6 z-50
          lg:hidden
          rounded-full
          bg-gradient-to-r from-indigo-500 to-violet-600
          text-white font-semibold shadow-[0_8px_24px_rgba(124,58,237,0.3)]
          border border-violet-400/20
          flex items-center gap-2 px-4 h-12
          hover:scale-105 active:scale-95 transition-all duration-200
        "
      >
        <LayoutSideContentLeft size={16} />
        <span>Menu</span>
      </Button>

      {/* 2. Desktop Fixed Sidebar Container */}
      <aside
        className="
          hidden lg:flex
          w-72 shrink-0
          flex-col
          rounded-[24px]
          border border-white/[0.06]
          bg-[#0d0d14]
          p-6
          mt-7
          shadow-[0_24px_60px_rgba(0,0,0,0.6)]
          sticky top-6
          h-[calc(100vh-3rem)]
        "
      >
        <div className="mb-8 px-2">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-violet-500 animate-pulse" />
            <h2 className="text-xl font-bold bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent tracking-tight">
              HireLoop
            </h2>
          </div>
          <p className="mt-1 text-[11px] font-medium tracking-widest text-slate-500 uppercase">
            Job Portal Dashboard
          </p>
        </div>

        <SidebarNavigation navItems={navItems} pathname={pathname} />

        <div className="mt-auto pt-6">
          <div className="relative overflow-hidden rounded-2xl border border-white/[0.04] bg-gradient-to-b from-[#13131f] to-[#09090f] p-4 shadow-xl">
            <div className="absolute -right-8 -bottom-8 h-24 w-24 rounded-full bg-violet-600/10 blur-xl pointer-events-none" />
            <h3 className="text-xs font-semibold text-white tracking-wide uppercase">
              Upgrade Account
            </h3>
            <p className="mt-1.5 text-xs leading-relaxed text-slate-400">
              Unlock premium job posting features and get priority visibility
              matching.
            </p>
            <Button className="mt-4 w-full h-9 bg-gradient-to-r from-indigo-500 to-violet-600 text-white font-medium text-xs rounded-xl shadow-[0_4px_12px_rgba(124,58,237,0.2)] hover:shadow-[0_4px_20px_rgba(124,58,237,0.4)] transition-all duration-300">
              Upgrade
            </Button>
          </div>
        </div>
      </aside>

      {/* 3. Mobile Sidebar Drawer View */}
      <Drawer
        key={`drawer-${isOpen}`}
        isOpen={isOpen}
        onOpenChange={(newOpen) => {
          setIsOpen(newOpen);
        }}
      >
        <Drawer.Backdrop />
        <Drawer.Content placement="left" className="max-w-[280px]">
          <Drawer.Dialog className="bg-[#0d0d14] text-white border-r border-white/[0.06] p-5 h-full flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-8 px-2">
                <div>
                  <h2 className="text-lg font-bold text-white">HireLoop</h2>
                  <p className="text-[10px] text-slate-500 uppercase tracking-wider">
                    Portal Dashboard
                  </p>
                </div>
                <Drawer.CloseTrigger onClick={closeDrawer} />
              </div>

              <Drawer.Body className="p-0">
                <SidebarNavigation
                  navItems={navItems}
                  pathname={pathname}
                  onItemClick={closeDrawer}
                />
              </Drawer.Body>
            </div>

            <div className="rounded-xl border border-white/[0.04] bg-[#13131f] p-4 mt-auto">
              <h3 className="text-xs font-semibold text-white">
                Premium Features
              </h3>
              <p className="mt-1 text-[11px] text-slate-400 leading-normal">
                Get access to analytics metrics tools.
              </p>
              <Button
                size="sm"
                className="mt-3 w-full bg-gradient-to-r from-indigo-500 to-violet-600 text-white font-medium text-xs rounded-lg"
              >
                Upgrade Now
              </Button>
            </div>
          </Drawer.Dialog>
        </Drawer.Content>
      </Drawer>
    </>
  );
}
