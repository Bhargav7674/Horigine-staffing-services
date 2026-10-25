import { useEffect, useRef, useState } from "react";

const stats = [
  { value: 1, suffix: "+", label: "Years Experience" },
  { value: 100, suffix: "+", label: "Placements" },
  { value: 20, suffix: "+", label: "Core Technologies" },
  { value: 15, suffix: "+", label: "Clients" },
];

export default function StatsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [counts, setCounts] = useState(() => stats.map(() => 0));

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const animateCount = () => {
      const startTime = performance.now();
      const duration = 1600;
      let frame = 0;

      const updateCount = (now: number) => {
        const progress = Math.min((now - startTime) / duration, 1);
        const easedProgress = 1 - (1 - progress) ** 3;
        setCounts(stats.map(({ value }) => Math.floor(value * easedProgress)));

        if (progress < 1) {
          frame = requestAnimationFrame(updateCount);
        } else {
          setCounts(stats.map(({ value }) => value));
        }
      };

      frame = requestAnimationFrame(updateCount);
      return () => cancelAnimationFrame(frame);
    };

    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !("IntersectionObserver" in window)
    ) {
      setCounts(stats.map(({ value }) => value));
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
    <section
      className="container stats-row glass-card"
      ref={sectionRef}
      aria-label="Horigine company statistics"
    >
      {stats.map(({ suffix, label }, index) => (
        <div className="stat-item" key={label}>
          <strong className="gradient-text">
            {counts[index]}{suffix}
          </strong>
          <span>{label}</span>
        </div>
      ))}
    </section>
  );
}
