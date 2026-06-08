import Image from "next/image";
import Link from "next/link";
import { FaFacebookF, FaPinterestP, FaLinkedinIn } from "react-icons/fa";

const footerLinks = [
  {
    heading: "Product",
    links: [
      { label: "Job discovery", href: "/jobs" },
      { label: "Worker AI", href: "/worker-ai" },
      { label: "Companies", href: "/companies" },
      { label: "Salary data", href: "/salary" },
    ],
  },
  {
    heading: "Navigations",
    links: [
      { label: "Help center", href: "/help" },
      { label: "Career library", href: "/library" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { label: "Brand Guideline", href: "/brand" },
      { label: "Newsroom", href: "/newsroom" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="w-full bg-[#000000] text-white">
      <div className="mx-auto max-w-11/12 px-6 lg:px-10">
        {/* ── Main Row ── */}
        <div className="flex flex-col gap-12 py-14 lg:flex-row lg:justify-between">
          {/* Brand */}
          <div className="flex flex-col gap-5 lg:max-w-65">
            <Link href="/">
              <Image
                src="/logo.png"
                alt="HireLoop"
                width={130}
                height={40}
                priority
              />
            </Link>
            <p className="text-sm leading-relaxed text-slate-400">
              The AI-native career platform. Built for people who take their
              work seriously.
            </p>
          </div>

          {/* Link columns — pushed right */}
          <div className="grid grid-cols-2 gap-x-16 gap-y-10 sm:grid-cols-3">
            {footerLinks.map((col) => (
              <div key={col.heading} className="flex flex-col gap-5">
                <span className="text-sm font-semibold text-violet-500">
                  {col.heading}
                </span>
                <ul className="flex flex-col gap-3">
                  {col.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-slate-400 transition-colors duration-200 hover:text-white"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* ── Divider ── */}
        <div className="h-px w-full bg-white/[0.06]" />

        {/* ── Bottom Bar ── */}
        <div className="flex flex-col items-center gap-5 py-6 sm:flex-row sm:justify-between">
          {/* Socials */}
          <div className="flex items-center gap-2">
            {/* Facebook — plain dark */}
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="
                flex items-center justify-center
                w-9 h-9 rounded-lg
                bg-white/[0.06]
                text-slate-400
                transition-all duration-200
                hover:text-white hover:bg-white/[0.12]
              "
            >
              <FaFacebookF size={14} />
            </a>

            {/* Pinterest — purple filled */}
            <a
              href="https://pinterest.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Pinterest"
              className="
                flex items-center justify-center
                w-9 h-9 rounded-lg
                bg-violet-600
                text-white
                transition-all duration-200
                hover:bg-violet-500
              "
            >
              <FaPinterestP size={14} />
            </a>

            {/* LinkedIn — plain dark */}
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="
                flex items-center justify-center
                w-9 h-9 rounded-lg
                bg-white/[0.06]
                text-slate-400
                transition-all duration-200
                hover:text-white hover:bg-white/[0.12]
              "
            >
              <FaLinkedinIn size={14} />
            </a>
          </div>

          {/* Copyright */}
          <span className="text-xs text-slate-500">
            Copyright 2026 — HireLoop Authority
          </span>

          {/* Legal links */}
          <div className="flex items-center gap-1 text-xs text-slate-500">
            <Link
              href="/terms"
              className="transition-colors duration-200 hover:text-slate-300"
            >
              Terms & Policy
            </Link>
            <span className="mx-1">-</span>
            <Link
              href="/privacy"
              className="transition-colors duration-200 hover:text-slate-300"
            >
              Privacy Guideline
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
