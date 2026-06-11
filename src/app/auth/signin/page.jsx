"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "@/lib/auth-client";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  ArrowRight,
  AlertCircle,
  Loader2,
  CheckCircle2,
} from "lucide-react";

export default function SignInPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [success, setSuccess] = useState(false);

  /* ── Validation ── */
  const validate = () => {
    const e = {};
    if (!form.email.trim()) e.email = "Email address is required.";
    else if (!/\S+@\S+\.\S+/.test(form.email))
      e.email = "Enter a valid email address.";
    if (!form.password) e.password = "Password is required.";
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
    if (apiError) setApiError("");
  };

  /* ── Submit ── */
  //   const handleSubmit = async (e) => {
  //     e.preventDefault();
  //     const errs = validate();
  //     if (Object.keys(errs).length) {
  //       setErrors(errs);
  //       return;
  //     }

  //     setLoading(true);
  //     setApiError("");

  //     try {
  //       await signIn.email({
  //         email: form.email.trim(),
  //         password: form.password,
  //       });
  //       setSuccess(true);
  //       setTimeout(() => router.push("/"), 1000);
  //     } catch (err) {
  //       setApiError(
  //         err?.message || "Invalid email or password. Please try again.",
  //       );
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  // ! fix
  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }

    setLoading(true);
    setApiError("");

    const { data, error } = await signIn.email({
      email: form.email.trim(),
      password: form.password,
    });

    if (error) {
      setApiError(
        error.message || "Invalid email or password. Please try again.",
      );
      setLoading(false);
      return;
    }

    setSuccess(true);
    setLoading(false);
    setTimeout(() => router.push("/"), 1000);
  };

  /* ── Success state ── */
  if (success) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-4">
        <div className="w-full max-w-md text-center flex flex-col items-center gap-6 p-10 rounded-3xl border border-white/[0.08] bg-[#0d0d14]">
          <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
            <CheckCircle2 size={32} className="text-emerald-400" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">
              Welcome back!
            </h2>
            <p className="text-slate-400 text-sm">
              Signing you in to HireLoop…
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <Loader2 size={14} className="animate-spin" /> Redirecting…
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Top violet glow — identical to signup */}
      <div
        className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
        aria-hidden="true"
      >
        <div
          className="absolute left-1/2 top-0 -translate-x-1/2 h-[600px] w-[900px] rounded-full opacity-35 blur-[130px]"
          style={{
            background:
              "radial-gradient(ellipse, #5b21b6 0%, #4338ca 50%, transparent 75%)",
          }}
        />
      </div>

      {/* Main */}
      <main className="relative z-10 flex flex-1 items-center justify-center px-4 py-10">
        <div className="w-full max-w-[460px]">
          {/* Card */}
          <div className="rounded-3xl border border-white/[0.08] bg-[#0d0d14] p-8 sm:p-10 shadow-[0_24px_80px_rgba(0,0,0,0.6)]">
            {/* Header */}
            <div className="mb-8 text-center">
              <h1 className="text-2xl font-bold text-white sm:text-3xl mb-2">
                Welcome back
              </h1>
              <p className="text-sm text-slate-500">
                Sign in to continue finding your dream job.
              </p>
            </div>

            {/* API error banner */}
            {apiError && (
              <div className="mb-6 flex items-start gap-3 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3">
                <AlertCircle
                  size={16}
                  className="text-red-400 mt-0.5 shrink-0"
                />
                <p className="text-sm text-red-300">{apiError}</p>
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              noValidate
              className="flex flex-col gap-5"
            >
              {/* Email */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="email"
                  className="text-xs font-medium text-slate-400 tracking-wide"
                >
                  Email Address <span className="text-red-400">*</span>
                </label>
                <div
                  className={`flex items-center gap-3 rounded-xl border px-4 py-3 transition-all duration-200 bg-[#111118]
                  ${
                    errors.email
                      ? "border-red-500/50 focus-within:border-red-500"
                      : "border-white/[0.08] focus-within:border-violet-500/60"
                  }`}
                >
                  <Mail size={15} className="shrink-0 text-slate-500" />
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    autoComplete="email"
                    className="w-full bg-transparent text-sm text-white placeholder:text-slate-600 outline-none"
                  />
                </div>
                {errors.email && (
                  <p className="flex items-center gap-1.5 text-xs text-red-400">
                    <AlertCircle size={12} /> {errors.email}
                  </p>
                )}
              </div>

              {/* Password */}
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="text-xs font-medium text-slate-400 tracking-wide"
                  >
                    Password <span className="text-red-400">*</span>
                  </label>
                  <Link
                    href="/auth/forgot-password"
                    className="text-xs text-violet-400 hover:text-violet-300 transition-colors"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div
                  className={`flex items-center gap-3 rounded-xl border px-4 py-3 transition-all duration-200 bg-[#111118]
                  ${
                    errors.password
                      ? "border-red-500/50 focus-within:border-red-500"
                      : "border-white/[0.08] focus-within:border-violet-500/60"
                  }`}
                >
                  <Lock size={15} className="shrink-0 text-slate-500" />
                  <input
                    id="password"
                    type={showPass ? "text" : "password"}
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Your password"
                    autoComplete="current-password"
                    className="w-full bg-transparent text-sm text-white placeholder:text-slate-600 outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    className="shrink-0 text-slate-500 hover:text-slate-300 transition-colors"
                    aria-label="Toggle password visibility"
                  >
                    {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
                {errors.password && (
                  <p className="flex items-center gap-1.5 text-xs text-red-400">
                    <AlertCircle size={12} /> {errors.password}
                  </p>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="
                  relative mt-1 h-12 w-full
                  flex items-center justify-center gap-2
                  rounded-xl
                  bg-gradient-to-r from-indigo-500 to-violet-600
                  text-white text-sm font-semibold
                  transition-all duration-300
                  hover:scale-[1.01]
                  hover:shadow-[0_0_24px_rgba(139,92,246,0.45)]
                  active:scale-[0.99]
                  disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100
                  overflow-hidden group
                "
              >
                {/* Shimmer */}
                <span className="absolute inset-0 translate-x-[-100%] bg-gradient-to-r from-transparent via-white/15 to-transparent group-hover:translate-x-[100%] transition-transform duration-700 pointer-events-none" />
                {loading ? (
                  <>
                    <Loader2 size={16} className="animate-spin" /> Signing in…
                  </>
                ) : (
                  <>
                    Sign In <ArrowRight size={15} />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Bottom link */}
          <p className="mt-6 text-center text-xs text-slate-600">
            Don&apos;t have an account?{" "}
            <Link
              href="/auth/signup"
              className="text-violet-400 hover:text-violet-300 transition-colors font-medium"
            >
              Create one on HireLoop
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
