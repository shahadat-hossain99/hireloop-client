"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { Briefcase, Factory, Magnifier, Star } from "@gravity-ui/icons";

const stats = [
  {
    id: 1,
    icon: <Briefcase className="h-5 w-5" />,
    value: 50,
    suffix: "K",
    label: "Active Jobs",
  },
  {
    id: 2,
    icon: <Factory className="h-5 w-5" />,
    value: 12,
    suffix: "K",
    label: "Companies",
  },
  {
    id: 3,
    icon: <Magnifier className="h-5 w-5" />,
    value: 2,
    suffix: "M",
    label: "Job Seekers",
  },
  {
    id: 4,
    icon: <Star className="h-5 w-5" />,
    value: 97,
    suffix: "%",
    label: "Satisfaction Rate",
  },
];

/* ── Count-up hook ── */
function useCountUp(target, duration = 1800, start = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // ease-out curve
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
      else setCount(target);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);

  return count;
}

/* ── Single stat card ── */
function StatCard({ stat, index, inView }) {
  const count = useCountUp(stat.value, 1800, inView);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.55,
        delay: index * 0.12, // stagger — each card 120ms after previous
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      whileHover={{
        y: -6,
        scale: 1.02,
        transition: { duration: 0.2, ease: "easeOut" },
      }}
      className="
        relative
        rounded-3xl
        border border-white/10
        bg-white/[0.03]
        backdrop-blur-xl
        p-6
        cursor-default
        transition-colors
        duration-300
        hover:border-violet-500/30
        hover:bg-white/[0.05]
        overflow-hidden
        group
      "
    >
      {/* Card glow — animates on hover */}
      <motion.div
        className="absolute bottom-0 right-0 h-32 w-32 rounded-full blur-3xl pointer-events-none"
        initial={{ opacity: 0.1, backgroundColor: "rgba(255,255,255,0.1)" }}
        whileHover={{ opacity: 0.4, backgroundColor: "rgba(109,40,217,0.25)" }}
        transition={{ duration: 0.3 }}
      />

      {/* Icon — subtle float animation */}
      <motion.div
        className="relative z-10 text-white/90"
        animate={inView ? { opacity: [0, 1], x: [-8, 0] } : {}}
        transition={{ duration: 0.4, delay: index * 0.12 + 0.2 }}
      >
        {stat.icon}
      </motion.div>

      {/* Count-up number */}
      <h3 className="relative z-10 mt-16 text-5xl font-bold tracking-tight tabular-nums">
        {count}
        {stat.suffix}
      </h3>

      {/* Label — fades in slightly after number */}
      <motion.p
        className="relative z-10 mt-4 text-base text-gray-300"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.4, delay: index * 0.12 + 0.5 }}
      >
        {stat.label}
      </motion.p>
    </motion.div>
  );
}

/* ── Stats section wrapper ── */
export default function StatsCards() {
  const ref = useRef(null);
  // triggers when 20% of the section is visible
  const inView = useInView(ref, { once: true, margin: "0px 0px -80px 0px" });

  return (
    <div ref={ref} className="relative z-10 mx-auto max-w-4/5 mb-10">
      <div className="grid gap-6 grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <StatCard key={stat.id} stat={stat} index={index} inView={inView} />
        ))}
      </div>
    </div>
  );
}
