import { useEffect, useRef, useState } from "react";
import "./stats-section.css";

const stats = [
  { value: 2, suffix: "+", label: "Years Experience", icon: "calendar" },
  { value: 100, suffix: "+", label: "Placements", icon: "users" },
  { value: 20, suffix: "+", label: "Core Technologies", icon: "layers" },
  { value: 15, suffix: "+", label: "Clients", icon: "handshake" },
] as const;

const DURATION = 2500; // each number counts for 2.5s
const STAGGER = 800; // each next number starts 0.8s later (total about 4.9s)

function StatIcon({ type }: { type: (typeof stats)[number]["icon"] }) {
  const commonProps = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  switch (type) {
    case "calendar":
      return (
        <svg {...commonProps}>
          <rect x="3" y="5" width="18" height="16" rx="2" />
          <path d="M8 3v4M16 3v4M3 9h18" />
        </svg>
      );
    case "users":
      return (
        <svg {...commonProps}>
          <path d="M16 19v-1a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v1" />
          <circle cx="10" cy="7" r="3" />
          <path d="M20 19v-1a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      );
    case "layers":
      return (
        <svg {...commonProps}>
          <path d="m12 3 9 5-9 5-9-5 9-5Z" />
          <path d="m3 12 9 5 9-5" />
          <path d="m3 16 9 5 9-5" />
        </svg>
      );
    case "handshake":
      return (
        <svg {...commonProps}>
          <path d="M7 11 4 8.5V5.5l3-2 3 3v2.5L7 11Z" />
          <path d="M17 11l-3-2.5V6l3-2 3 3v2.5L17 11Z" />
          <path d="M12 10l-2 2-1 4h6l-1-4-2-2Z" />
          <path d="M6 15.5 12 19l6-3.5" />
        </svg>
      );
    default:
      return null;
  }
}

export default function StatsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(() => stats.map(() => 0));

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const animateCount = () => {
      const start = performance.now();
      const total = DURATION + (stats.length - 1) * STAGGER;
      let frame = 0;

      const tick = (now: number) => {
        const elapsed = now - start;
        setProgress(
          stats.map((_, i) =>
            Math.min(Math.max((elapsed - i * STAGGER) / DURATION, 0), 1),
          ),
        );
        if (elapsed < total) frame = requestAnimationFrame(tick);
      };

      frame = requestAnimationFrame(tick);
      return () => cancelAnimationFrame(frame);
    };

    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !("IntersectionObserver" in window)
    ) {
      setProgress(stats.map(() => 1));
      return;
    }

    let cancelAnimation: (() => void) | undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          cancelAnimation = animateCount();
          observer.disconnect();
        }
      },
      { threshold: 0.35 },
    );

    observer.observe(section);
    return () => {
      observer.disconnect();
      cancelAnimation?.();
    };
  }, []);

  return (
    <section className="stats-section" ref={sectionRef} aria-label="Horigine company statistics">
      <div className="stats-feature">
        <div className="stats-feature-inner">
          <div className="stats-feature-topline">Our Impact</div>
          <h3>
            Delivering
            <br />
            Real Results
          </h3>
          <p>
            A quick look at the impact we&apos;ve created through our technology
            services and talent solutions.
          </p>
        </div>
      </div>

      <div className="stats-values">
        {stats.map(({ value, suffix, label, icon }, index) => {
          const p = progress[index];
          const eased = 1 - (1 - p) ** 3;
          return (
            <div className={`stats-value ${p > 0 ? "is-active" : ""}`} key={label}>
              <div className="stats-icon">
                <StatIcon type={icon} />
              </div>
              <strong>
                {Math.floor(value * eased)}
                {suffix}
              </strong>
              <span>{label}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}