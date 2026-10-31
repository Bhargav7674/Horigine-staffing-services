import { useEffect, useRef, useState } from "react";

const stats = [
  { value: 1, suffix: "+", label: "YEARS IN OPERATION" },
  { value: 200, suffix: "+", label: "PLACEMENTS MADE" },
  { value: 100, suffix: "+", label: "PROJECTS DELIVERED" },
  { value: 25, suffix: "%", label: "CLIENT RETENTION" },
  { value: 50, suffix: "+", label: "TECHNOLOGIES COVERED" },
];

export default function CompanyStatsSection() {
  const statsRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const section = statsRef.current;
    if (!section) return;

    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !("IntersectionObserver" in window)
    ) {
      setProgress(1);
      return;
    }

    let animationFrame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        const startTime = performance.now();
        const duration = 1600;
        const updateProgress = (now: number) => {
          const elapsed = Math.min((now - startTime) / duration, 1);
          setProgress(1 - (1 - elapsed) ** 3);

          if (elapsed < 1) {
            animationFrame = requestAnimationFrame(updateProgress);
          }
        };

        animationFrame = requestAnimationFrame(updateProgress);
        observer.disconnect();
      },
      { threshold: 0.35 },
    );

    observer.observe(section);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <section
      className="glass-card about-stats"
      aria-label="Company statistics"
      ref={statsRef}
    >
      {stats.map(({ value, suffix, label }) => (
        <div className="about-stat" key={label}>
          <strong className="gradient-text">
            {Math.floor(value * progress)}
            {suffix}
          </strong>
          <span>{label}</span>
        </div>
      ))}
    </section>
  );
}
