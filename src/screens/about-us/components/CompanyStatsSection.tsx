import { useEffect, useRef, useState } from "react";
import {
  CalendarDays,
  HeartHandshake,
  Layers3,
  Rocket,
  UserCheck,
  type LucideIcon,
} from "lucide-react";

type Stat = {
  value: number;
  suffix: string;
  label: string;
  icon: LucideIcon;
};

const stats: Stat[] = [
  { value: 2, suffix: "+", label: "Years in Operation", icon: CalendarDays },
  { value: 100, suffix: "+", label: "Placements Made", icon: UserCheck },
  { value: 10, suffix: "+", label: "Projects Delivered", icon: Rocket },
  { value: 20, suffix: "+", label: "Technologies Covered", icon: Layers3 },
];

const DURATION = 2200; // each number counts for 2.2s
const STAGGER = 500; // each next one starts 0.5s later (about 4.2s in total)

export default function CompanyStatsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(() => stats.map(() => 0));

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !("IntersectionObserver" in window)
    ) {
      setProgress(stats.map(() => 1));
      return;
    }

    let frame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();

        const start = performance.now();
        const total = DURATION + (stats.length - 1) * STAGGER;

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
      },
      { threshold: 0.3 },
    );

    observer.observe(section);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section className="cs-section" aria-label="Company statistics" ref={sectionRef}>
      <div className="cs-heading">
        <span className="cs-eyebrow">
          <i aria-hidden="true" />
          Our Impact
        </span>
        <h2>
          Numbers That <span className="cs-gradient">Speak for Us</span>
        </h2>
        <p>
          A quick look at what we have delivered through our technology
          services and talent solutions.
        </p>
      </div>

      <div className="cs-grid">
        {stats.map(({ value, suffix, label, icon: Icon }, i) => {
          const p = progress[i];
          const eased = 1 - (1 - p) ** 3;
          return (
            <article
              className={`cs-card ${i % 2 === 0 ? "cs-teal" : "cs-gold"} ${
                p > 0 ? "is-active" : ""
              }`}
              key={label}
            >
              <span className="cs-icon">
                <Icon size={28} strokeWidth={1.9} />
              </span>
              <strong className="cs-number">
                {Math.floor(value * eased)}
                {suffix}
              </strong>
              <span className="cs-label">{label}</span>
              <span className="cs-bar" aria-hidden="true">
                <span style={{ transform: `scaleX(${eased})` }} />
              </span>
            </article>
          );
        })}
      </div>
    </section>
  );
}