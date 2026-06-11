"use client";

import { useState } from "react";
import Link from "next/link";
// import Image from "next/image";
import { authClient, signUp } from "@/lib/auth-client";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { Label, Radio, RadioGroup } from "@heroui/react";

export default function RegisterPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
    role: "seeker", // ← add this
  });
  const [errors, setErrors] = useState({});
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [apiError, setApiError] = useState("");

  /* ── Validation ── */
  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Full name is required.";
    else if (form.name.trim().length < 2)
      e.name = "Name must be at least 2 characters.";

    if (!form.email.trim()) e.email = "Email address is required.";
    else if (!/\S+@\S+\.\S+/.test(form.email))
      e.email = "Enter a valid email address.";

    if (!form.password) e.password = "Password is required.";
    else if (form.password.length < 8)
      e.password = "Password must be at least 8 characters.";

    if (!form.confirm) e.confirm = "Please confirm your password.";
    else if (form.confirm !== form.password)
      e.confirm = "Passwords do not match.";

    if (!form.role) e.role = "Please select a role.";
    return e;
  };

  console.log(form.role);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Clear field error on change
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
    if (apiError) setApiError("");
  };

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
  //       await signUp.email({
  //         name: form.name.trim(),
  //         email: form.email.trim(),
  //         password: form.password,
  //       });
  //       setSuccess(true);
  //     } catch (err) {
  //       setApiError(err?.message || "Something went wrong. Please try again.");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  /* ── Submit ── */
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

    const { data, error } = await signUp.email({
      name: form.name.trim(),
      email: form.email.trim(),
      password: form.password,
      role: form.role, // ← pass it here
    });

    if (error) {
      setApiError(error.message || "Something went wrong. Please try again.");
      setLoading(false);
      return;
    }

    setSuccess(true);
    setLoading(false);
  };

  /* ── Password strength ── */
  const getStrength = (pw) => {
    if (!pw) return { score: 0, label: "", color: "" };
    let score = 0;
    if (pw.length >= 8) score++;
    if (/[A-Z]/.test(pw)) score++;
    if (/[0-9]/.test(pw)) score++;
    if (/[^A-Za-z0-9]/.test(pw)) score++;
    const map = [
      { label: "", color: "" },
      { label: "Weak", color: "bg-red-500" },
      { label: "Fair", color: "bg-amber-500" },
      { label: "Good", color: "bg-blue-500" },
      { label: "Strong", color: "bg-emerald-500" },
    ];
    return { score, ...map[score] };
  };
  const strength = getStrength(form.password);

  if (success) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-4">
        <div className="w-full max-w-md text-center flex flex-col items-center gap-6 p-10 rounded-3xl border border-white/[0.08] bg-[#0d0d14]">
          <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
            <CheckCircle2 size={32} className="text-emerald-400" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">
              Account Created!
            </h2>
            <p className="text-slate-400 text-sm">
              Welcome to HireLoop. Check your email to verify your account.
            </p>
          </div>
          <Link
            href="/auth/signin"
            className="inline-flex items-center gap-2 h-11 px-6 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 text-white text-sm font-semibold transition-all duration-200 hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(139,92,246,0.4)]"
          >
            Go to Sign In <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Top violet glow */}
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

      {/* Header */}
      {/* <header className="relative z-10 flex justify-between items-center px-6 py-5 sm:px-10">
        <Link href="/">
          <Image
            src="/logo.png"
            alt="HireLoop"
            width={120}
            height={36}
            priority
          />
        </Link>
        <span className="text-sm text-slate-400">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-violet-400 hover:text-violet-300 font-medium transition-colors"
          >
            Sign in
          </Link>
        </span>
      </header> */}

      {/* Main */}
      <main className="relative z-10 flex flex-1 items-center justify-center px-4 py-10">
        <div className="w-full max-w-[460px]">
          {/* Card */}
          <div className="rounded-3xl border border-white/[0.08] bg-[#0d0d14] p-8 sm:p-10 shadow-[0_24px_80px_rgba(0,0,0,0.6)]">
            {/* Header */}
            <div className="mb-8 text-center">
              <h1 className="text-2xl font-bold text-white sm:text-3xl mb-2">
                Create your account
              </h1>
              <p className="text-sm text-slate-500">
                Join thousands finding their dream jobs on HireLoop.
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
              {/* Full Name */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="name"
                  className="text-xs font-medium text-slate-400 tracking-wide"
                >
                  Full Name <span className="text-red-400">*</span>
                </label>
                <div
                  className={`flex items-center gap-3 rounded-xl border px-4 py-3 transition-all duration-200 bg-[#111118]
                  ${
                    errors.name
                      ? "border-red-500/50 focus-within:border-red-500"
                      : "border-white/[0.08] focus-within:border-violet-500/60"
                  }`}
                >
                  <User size={15} className="shrink-0 text-slate-500" />
                  <input
                    id="name"
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    autoComplete="name"
                    className="w-full bg-transparent text-sm text-white placeholder:text-slate-600 outline-none"
                  />
                </div>
                {errors.name && (
                  <p className="flex items-center gap-1.5 text-xs text-red-400">
                    <AlertCircle size={12} /> {errors.name}
                  </p>
                )}
              </div>

              {/* Email */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-slate-400 tracking-wide">
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
                <label className="text-xs font-medium text-slate-400 tracking-wide">
                  Password <span className="text-red-400">*</span>
                </label>
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
                    type={showPass ? "text" : "password"}
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Min. 8 characters"
                    autoComplete="new-password"
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

                {/* Strength meter */}
                {form.password && (
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex gap-1 flex-1">
                      {[1, 2, 3, 4].map((i) => (
                        <div
                          key={i}
                          className={`h-1 flex-1 rounded-full transition-all duration-300
                            ${strength.score >= i ? strength.color : "bg-white/[0.08]"}`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-slate-500">
                      {strength.label}
                    </span>
                  </div>
                )}

                {errors.password && (
                  <p className="flex items-center gap-1.5 text-xs text-red-400">
                    <AlertCircle size={12} /> {errors.password}
                  </p>
                )}
              </div>

              {/* Confirm Password */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-slate-400 tracking-wide">
                  Confirm Password <span className="text-red-400">*</span>
                </label>
                <div
                  className={`flex items-center gap-3 rounded-xl border px-4 py-3 transition-all duration-200 bg-[#111118]
                  ${
                    errors.confirm
                      ? "border-red-500/50 focus-within:border-red-500"
                      : form.confirm && form.confirm === form.password
                        ? "border-emerald-500/40 focus-within:border-emerald-500/60"
                        : "border-white/[0.08] focus-within:border-violet-500/60"
                  }`}
                >
                  <Lock size={15} className="shrink-0 text-slate-500" />
                  <input
                    type={showConfirm ? "text" : "password"}
                    name="confirm"
                    value={form.confirm}
                    onChange={handleChange}
                    placeholder="Repeat your password"
                    autoComplete="new-password"
                    className="w-full bg-transparent text-sm text-white placeholder:text-slate-600 outline-none"
                  />
                  {form.confirm && form.confirm === form.password ? (
                    <CheckCircle2
                      size={15}
                      className="shrink-0 text-emerald-400"
                    />
                  ) : (
                    <button
                      type="button"
                      onClick={() => setShowConfirm(!showConfirm)}
                      className="shrink-0 text-slate-500 hover:text-slate-300 transition-colors"
                      aria-label="Toggle confirm password visibility"
                    >
                      {showConfirm ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  )}
                </div>
                {errors.confirm && (
                  <p className="flex items-center gap-1.5 text-xs text-red-400">
                    <AlertCircle size={12} /> {errors.confirm}
                  </p>
                )}
              </div>

              {/* Role selection */}

              <div className="flex flex-col gap-4">
                <Label>Role</Label>
                <RadioGroup
                  value={form.role}
                  onChange={(value) =>
                    setForm((prev) => ({ ...prev, role: value }))
                  }
                  name="role"
                  orientation="horizontal"
                >
                  <Radio value="seeker">
                    <Radio.Control>
                      <Radio.Indicator />
                    </Radio.Control>
                    <Radio.Content>
                      <Label>Job Seeker</Label>
                    </Radio.Content>
                  </Radio>
                  <Radio value="recruiter">
                    <Radio.Control>
                      <Radio.Indicator />
                    </Radio.Control>
                    <Radio.Content>
                      <Label>Recruiter</Label>
                    </Radio.Content>
                  </Radio>
                </RadioGroup>
              </div>

              {/* Terms */}
              <p className="text-xs text-slate-500 text-center leading-relaxed">
                By creating an account you agree to our{" "}
                <Link
                  href="/terms"
                  className="text-violet-400 hover:text-violet-300 transition-colors"
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  href="/privacy"
                  className="text-violet-400 hover:text-violet-300 transition-colors"
                >
                  Privacy Policy
                </Link>
                .
              </p>

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
                    <Loader2 size={16} className="animate-spin" /> Creating
                    account…
                  </>
                ) : (
                  <>
                    {" "}
                    Create Account <ArrowRight size={15} />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Bottom link */}
          <p className="mt-6 text-center text-xs text-slate-600">
            Already have an account?{" "}
            <Link
              href="/auth/signin"
              className="text-violet-400 hover:text-violet-300 transition-colors font-medium"
            >
              Sign in to HireLoop
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
