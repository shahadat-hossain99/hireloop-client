import Link from "next/link";

export default function CTASection() {
  return (
    <section
      className="relative w-full overflow-hidden bg-black text-white "
      style={{
        backgroundImage: "url('/cta-bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center top",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Violet radial glow — top center, matching the dome's bright apex */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 flex justify-center"
        aria-hidden="true"
      >
        <div
          className="h-[320px] w-[600px] sm:h-[420px] sm:w-[900px] rounded-full opacity-60 blur-[90px]"
          style={{
            background:
              "radial-gradient(ellipse at center top, #5b21b6 0%, #4338ca 40%, transparent 70%)",
          }}
        />
      </div>

      {/* Dark fade at very bottom so section blends into next section */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-24"
        style={{
          background:
            "linear-gradient(to bottom, transparent, rgba(0,0,0,0.8))",
        }}
        aria-hidden="true"
      />

      {/* Content — centered over the dome */}
      <div className="relative z-10 mx-auto flex max-w-[640px] flex-col items-center gap-5 px-4 py-24 sm:py-32 text-center">
        {/* Heading */}
        <h2 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
          Your next role is
          <br />
          already looking for you
        </h2>

        {/* Subtitle */}
        <p className="text-sm text-slate-400 sm:text-base max-w-[420px]">
          Build a profile in three minutes. The matches start arriving tomorrow
          morning.
        </p>

        {/* Buttons */}
        <div className="mt-2 flex flex-col sm:flex-row items-center gap-3">
          {/* Primary — white solid */}
          <Link
            href="/register"
            className="
              inline-flex items-center justify-center
              h-11 px-6
              rounded-xl
              bg-white
              text-sm font-semibold text-gray-900
              transition-all duration-200
              hover:bg-slate-100
              hover:scale-[1.02]
              active:scale-95
              whitespace-nowrap
            "
          >
            Create a free account
          </Link>

          {/* Secondary — ghost with border */}
          <Link
            href="/pricing"
            className="
              inline-flex items-center justify-center
              h-11 px-6
              rounded-xl
              border border-white/20
              bg-white/[0.06]
              backdrop-blur-sm
              text-sm font-medium text-white
              transition-all duration-200
              hover:bg-white/[0.12]
              hover:border-white/30
              hover:scale-[1.02]
              active:scale-95
              whitespace-nowrap
            "
          >
            View pricing
          </Link>
        </div>
      </div>
    </section>
  );
}
