import {
  Search,
  TrendingUp,
  Building2,
  Bookmark,
  Zap,
  FileText,
  Target,
  Rocket,
} from "lucide-react";

const features = [
  {
    icon: <Search size={20} />,
    title: "Smart Search",
    description: "Find your ideal job with advanced filters.",
  },
  {
    icon: <TrendingUp size={20} />,
    title: "Salary Insights",
    description: "Get real salary data to negotiate confidently.",
  },
  {
    icon: <Building2 size={20} />,
    title: "Top Companies",
    description: "Apply to vetted companies that are hiring.",
  },
  {
    icon: <Bookmark size={20} />,
    title: "Saved Jobs",
    description: "Manage apps & favorites on your dashboard.",
  },
  {
    icon: <Zap size={20} />,
    title: "One-Click Apply",
    description: "Simplify your job applications for an easier process!",
  },
  {
    icon: <FileText size={20} />,
    title: "Resume Builder",
    description: "Create professional resumes with modern templates.",
  },
  {
    icon: <Target size={20} />,
    title: "Skill-Based Matching",
    description: "Discover jobs that match your skills and experience.",
  },
  {
    icon: <Rocket size={20} />,
    title: "Career Growth Resources",
    description: "Boost your career with quick interview tips.",
  },
];

export default function FeaturesSection() {
  return (
    <section className="w-full bg-[#0d0d12] py-20 px-4 sm:px-6 lg:px-10 text-white">
      <div className="mx-auto max-w-11/12">
        {/* ── Section label ── */}
        <div className="flex items-center justify-center gap-3 mb-5">
          <span className="h-[6px] w-[6px] rounded-sm bg-violet-500" />
          <span className="text-xs font-semibold tracking-[0.2em] text-slate-400 uppercase">
            Features Job
          </span>
          <span className="h-[6px] w-[6px] rounded-sm bg-violet-500" />
        </div>

        {/* ── Heading ── */}
        <h2 className="text-center text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl mb-14">
          Everything you need
          <br />
          to succeed
        </h2>

        {/* ── Features grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10">
          {features.map((feature) => (
            <div key={feature.title} className="flex items-start gap-4 group">
              {/* Icon box */}
              <div
                className="
                  shrink-0
                  flex items-center justify-center
                  w-11 h-11
                  rounded-xl
                  bg-[#1a1a2a]
                  text-slate-300
                  transition-all duration-300
                  group-hover:bg-violet-600/20
                  group-hover:text-violet-400
                "
              >
                {feature.icon}
              </div>

              {/* Text */}
              <div className="flex flex-col gap-1.5 pt-0.5">
                <span className="text-sm font-semibold text-white leading-snug">
                  {feature.title}
                </span>
                <span className="text-xs leading-relaxed text-slate-500">
                  {feature.description}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
