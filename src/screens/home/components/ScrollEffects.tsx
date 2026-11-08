import { useEffect, useState } from "react";
import "./scroll-effects.css";

type Item = { label: string };

const TARGETS = [
  "h1", "h2", "h3", "p", ".eyebrow", ".hero-actions", ".hero-visual",
  ".stats-row", ".stats-section", ".about-home-layout img", "article",
  ".cta-panel", ".testi-card", ".proc-card",
].join(",");

const SKIP_INSIDE = ".reveal, .stagger, .lines, .words"; // already animated by Reveal.tsx

export default function ScrollEffects({
  rootSelector = ".home-page main",
}: {
  rootSelector?: string;
}) {
  const [items, setItems] = useState<Item[]>([]);
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const main = document.querySelector<HTMLElement>(rootSelector);
    if (!main) return;

    const sections = Array.from(main.children).filter(
      (el): el is HTMLElement => el instanceof HTMLElement,
    );

    setItems(
      sections.map((s, i) => ({
        label:
          s.querySelector("h1, h2")?.textContent?.trim().slice(0, 28) ||
          `Section ${i + 1}`,
      })),
    );

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cleanups: Array<() => void> = [];

    /* 1. line-by-line reveal */
    if (!reduce && "IntersectionObserver" in window) {
      const revealObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.remove("rv-pending");
            entry.target.classList.add("rv-in");
            revealObserver.unobserve(entry.target);
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
      );

      sections.forEach((section) => {
        let index = 0;
        section.querySelectorAll<HTMLElement>(TARGETS).forEach((el) => {
          if (el.closest(SKIP_INSIDE)) return;
          if (el.parentElement?.closest(".rv")) return; // skip nested items
          el.classList.add("rv");
          el.style.setProperty("--rv-i", String(Math.min(index++, 14)));
        });
        section.classList.add("rv-pending");
        revealObserver.observe(section);
      });

      cleanups.push(() => revealObserver.disconnect());
    }

    /* 2. which section is active (pagination dots) */
    const activeObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(sections.indexOf(entry.target as HTMLElement));
          }
        });
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    sections.forEach((s) => activeObserver.observe(s));
    cleanups.push(() => activeObserver.disconnect());

    /* 3. progress bar */
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(window.scrollY / max, 1) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    cleanups.push(() => window.removeEventListener("scroll", onScroll));

    return () => cleanups.forEach((fn) => fn());
  }, [rootSelector]);

  const goTo = (i: number) => {
    const main = document.querySelector<HTMLElement>(rootSelector);
    main?.children[i]?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <div className="sx-progress" style={{ transform: `scaleX(${progress})` }} />

      <nav className="sx-dots" aria-label="Page sections">
        {items.map((item, i) => (
          <button
            key={i}
            type="button"
            className={`sx-dot ${active === i ? "is-active" : ""}`}
            aria-label={`Go to ${item.label}`}
            aria-current={active === i ? "true" : undefined}
            onClick={() => goTo(i)}
          >
            <span className="sx-label">{item.label}</span>
          </button>
        ))}
      </nav>
    </>
  );
}