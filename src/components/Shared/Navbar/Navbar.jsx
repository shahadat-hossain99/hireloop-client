/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@heroui/react";
import { Menu, X } from "lucide-react";
import { signOut, useSession } from "@/lib/auth-client";

const navItems = [
  { label: "Browse Jobs", href: "/jobs" },
  { label: "Companies", href: "/companies" },
  { label: "Pricing", href: "/pricing" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { data: session, isPending } = useSession();
  console.log("data", session, "is Pending:", isPending);
  const route = useRouter();

  const user = session?.user;

  const handleSignOut = async () => {
    await signOut();
    route.push("/");
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 px-6 pt-6 transition-all duration-300">
      <nav
        className={`
          mx-auto
          max-w-11/12
          rounded-[20px]
          border
          p-3
          border-white/[0.08]
          backdrop-blur-2xl
          transition-all duration-500
          ${
            scrolled
              ? "bg-slate-950/80 shadow-[0_8px_40px_rgba(0,0,0,0.45)]"
              : "bg-slate-900/50 shadow-[0_4px_24px_rgba(0,0,0,0.3)]"
          }
        `}
      >
        {/* Top bar */}
        <div
          className={`
            flex flex-row items-center px-6 lg:px-8
            transition-all duration-300
            ${scrolled ? "h-[60px]" : "h-[70px]"}
          `}
        >
          {/* Logo */}
          <Link href="/" className="shrink-0 group">
            <Image
              src="/logo.png"
              alt="HireLoop"
              width={130}
              height={40}
              priority
              className="transition-opacity duration-200 group-hover:opacity-80"
            />
          </Link>

          {/* ── Desktop Navigation ── */}
          <div className="ml-auto hidden lg:flex lg:flex-row lg:items-center lg:gap-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                    relative
                    inline-flex items-center
                    px-4 py-2
                    text-lg font-medium
                    rounded-xl
                    whitespace-nowrap
                    transition-all duration-200
                    ${
                      isActive
                        ? "text-white font-medium"
                        : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
                    }
                  `}
                >
                  {item.label}
                  {/* Underline indicator — desktop only */}
                  {isActive && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full bg-violet-400" />
                  )}
                </Link>
              );
            })}

            {/* Separator */}
            <div className="mx-4 h-5 w-px shrink-0 bg-white/15" />

            {/* Sign In */}
            {user ? (
              <div className="flex items-center gap-4">
                <span className="text-sm text-slate-300">Hi, {user.name}!</span>
                <Button
                  onClick={handleSignOut}
                  className="
                  relative
                  h-9
                  rounded-lg
                  px-5
                  text-sm font-semibold
                  text-white
                  bg-gradient-to-r from-pink-500 to-red-500
                  transition-all duration-300
                  hover:scale-[1.03]
                  hover:shadow-[0_0_20px_rgba(344,78,246,0.45)]
                  active:scale-[0.98]
                  overflow-hidden
                  group
                "
                >
                  {/* Shimmer */}
                  <span
                    className="
                    absolute inset-0
                    translate-x-[-100%]
                    bg-gradient-to-r from-transparent via-white/20 to-transparent
                    group-hover:translate-x-[100%]
                    transition-transform duration-700
                    pointer-events-none
                  "
                  />
                  LogOut
                </Button>
              </div>
            ) : (
              <Link
                href="/auth/signin"
                className="
                inline-flex items-center
                px-4 py-2
                text-sm font-medium
                text-violet-400
                rounded-xl
                whitespace-nowrap
                transition-all duration-200
                hover:text-white hover:bg-white/[0.05]
              "
              >
                Sign In
              </Link>
            )}

            {/* CTA */}
            <Link href="/auth/signup" className="ml-2 shrink-0">
              <Button
                className="
                  relative
                  h-9
                  rounded-lg
                  px-5
                  text-sm font-semibold
                  text-white
                  bg-gradient-to-r from-indigo-500 to-violet-600
                  transition-all duration-300
                  hover:scale-[1.03]
                  hover:shadow-[0_0_20px_rgba(139,92,246,0.45)]
                  active:scale-[0.98]
                  overflow-hidden
                  group
                "
              >
                {/* Shimmer */}
                <span
                  className="
                    absolute inset-0
                    translate-x-[-100%]
                    bg-gradient-to-r from-transparent via-white/20 to-transparent
                    group-hover:translate-x-[100%]
                    transition-transform duration-700
                    pointer-events-none
                  "
                />
                Get Started
              </Button>
            </Link>
          </div>

          {/* ── Mobile Menu Button ── */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="
              ml-auto
              relative
              flex items-center justify-center
              w-10 h-10
              rounded-xl
              text-slate-300
              hover:text-white
              hover:bg-white/[0.08]
              transition-all duration-200
              lg:hidden
            "
            aria-label="Toggle menu"
          >
            <span
              className={`
                absolute transition-all duration-300
                ${menuOpen ? "opacity-100 rotate-0" : "opacity-0 rotate-90"}
              `}
            >
              <X size={20} />
            </span>
            <span
              className={`
                absolute transition-all duration-300
                ${menuOpen ? "opacity-0 -rotate-90" : "opacity-100 rotate-0"}
              `}
            >
              <Menu size={20} />
            </span>
          </button>
        </div>

        {/* ── Mobile Menu ── */}
        <div
          className={`
            overflow-hidden
            transition-all duration-300 ease-in-out
            lg:hidden
            ${menuOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"}
          `}
        >
          <div className="border-t border-white/[0.07] px-4 pb-5 pt-3">
            <div className="flex flex-col gap-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`
                      flex items-center gap-3
                      rounded-xl px-4 py-3
                      text-sm font-medium
                      transition-all duration-200
                      ${
                        isActive
                          ? "bg-violet-500/10 text-violet-300 border border-violet-500/20"
                          : "text-slate-400 hover:text-white hover:bg-white/[0.05]"
                      }
                    `}
                  >
                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-violet-400 shrink-0" />
                    )}
                    {item.label}
                  </Link>
                );
              })}
            </div>

            <div className="my-4 h-px bg-white/[0.07]" />

            <div className="flex flex-col gap-2">
              <Link
                href="/auth/signin"
                className="
                  px-4 py-3
                  text-sm font-medium
                  text-slate-300
                  rounded-xl
                  hover:bg-white/[0.05]
                  hover:text-white
                  transition-all duration-200
                "
              >
                Sign In
              </Link>

              <Link href="/auth/signup">
                <Button
                  className="
                    w-full h-11
                    rounded-xl
                    bg-gradient-to-r from-indigo-500 to-violet-600
                    text-white text-sm font-semibold
                    hover:shadow-[0_0_20px_rgba(139,92,246,0.35)]
                    transition-all duration-300
                  "
                >
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
