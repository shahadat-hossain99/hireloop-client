"use client";

import { useRouter } from "next/navigation";
import { Button } from "@heroui/react";
import { motion } from "motion/react";
import { HiShieldExclamation } from "react-icons/hi2";
import { HiArrowLeft, HiHome } from "react-icons/hi";

export default function UnauthorizedPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen w-full bg-[#0a0a10] relative overflow-hidden flex items-center justify-center p-6">
      {/* --- SPACE BACKGROUND --- */}
      <div className="absolute inset-0 w-screen h-screen overflow-hidden bg-[#08080e]">
        {/* 1. Deep Space Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-[#0f0f1a] via-[#0a0a10] to-[#050508]" />

        {/* 2. Starfield - Tiny Stars (2px) */}
        <div className="absolute inset-0 bg-[radial-gradient(circle,_#ffffff_1px,_transparent_1px)] bg-[length:40px_40px] opacity-40" />

        {/* 3. Starfield - Medium Stars (3px) */}
        <div className="absolute inset-0 bg-[radial-gradient(circle,_#cbd5e1_2px,_transparent_2px)] bg-[length:80px_80px] opacity-60" />

        {/* 4. Starfield - Large Bright Stars with a tiny twinkle animation */}
        <div className="absolute inset-0 bg-[radial-gradient(circle,_#ffffff_3px,_transparent_3px)] bg-[length:150px_150px] opacity-80 animate-pulse" />

        {/* 5. Original Red Glow Orbs (Keep them! They look great over the space bg) */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-[128px] animate-pulse" />
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-[128px] animate-pulse"
          style={{ animationDelay: "1s" }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-400/5 rounded-full blur-[128px]" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-2xl mx-auto text-center">
        {/* Error Icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, type: "spring", bounce: 0.5 }}
          className="mb-8"
        >
          <div className="relative inline-block">
            <HiShieldExclamation className="w-24 h-24 text-red-500 mx-auto" />
            <div className="absolute inset-0 bg-red-500/20 blur-2xl rounded-full animate-pulse" />
          </div>
        </motion.div>

        {/* Status Code */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <h1 className="text-8xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-600 mb-4">
            401
          </h1>
        </motion.div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Access Denied
          </h2>
        </motion.div>

        {/* Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <p className="text-lg text-slate-400 max-w-md mx-auto mb-8">
            You don&apos;t have permission to access this page. Please contact
            your administrator if you believe this is a mistake.
          </p>
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="w-24 h-px bg-gradient-to-r from-transparent via-red-500/50 to-transparent mx-auto mb-8"
        />

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Button
            onClick={() => router.back()}
            className="
              group
              relative
              h-12
              px-8
              rounded-xl
              bg-white/5
              border border-white/10
              text-white
              font-semibold
              hover:bg-white/10
              hover:border-white/20
              transition-all duration-300
              overflow-hidden
            "
          >
            <span className="flex items-center gap-2">
              <HiArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Go Back
            </span>
          </Button>

          <Button
            onClick={() => router.push("/")}
            className="
              group
              relative
              h-12
              px-8
              rounded-xl
              bg-gradient-to-r from-indigo-500 to-violet-600
              text-white
              font-semibold
              hover:shadow-[0_0_30px_rgba(139,92,246,0.4)]
              transition-all duration-300
              overflow-hidden
            "
          >
            {/* Shimmer Effect */}
            <span className="absolute inset-0 translate-x-[-100%] bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:translate-x-[100%] transition-transform duration-700" />
            <span className="flex items-center gap-2">
              <HiHome className="w-4 h-4" />
              Back to Home
            </span>
          </Button>
        </motion.div>

        {/* Help Text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="mt-8 text-sm text-slate-500"
        >
          Need help?{" "}
          <a
            href="/contact"
            className="text-violet-400 hover:text-violet-300 underline underline-offset-4 transition-colors"
          >
            Contact Support
          </a>
        </motion.p>
      </div>

      {/* Corner Decorations */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-red-500/10 to-transparent rounded-br-full" />
      <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-red-500/10 to-transparent rounded-tl-full" />
    </div>
  );
}
