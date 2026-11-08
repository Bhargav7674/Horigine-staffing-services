import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ElementType,
  type ReactNode,
} from "react";
import "./reveal.css";

export function useInView<T extends HTMLElement>(threshold = 0.2) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !("IntersectionObserver" in window)
    ) {
      setInView(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin: "0px 0px -8% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}

export function Reveal({
  as: Tag = "div",
  delay = 0,
  className = "",
  children,
}: {
  as?: ElementType;
  delay?: number;
  className?: string;
  children: ReactNode;
}) {
  const { ref, inView } = useInView<HTMLElement>();
  return (
    <Tag
      ref={ref}
      className={`reveal ${inView ? "is-in" : ""} ${className}`}
      style={{ "--delay": `${delay}ms` } as CSSProperties}
    >
      {children}
    </Tag>
  );
}

export function Stagger({
  as: Tag = "div",
  className = "",
  children,
}: {
  as?: ElementType;
  className?: string;
  children: ReactNode;
}) {
  const { ref, inView } = useInView<HTMLElement>(0.15);
  return (
    <Tag ref={ref} className={`stagger ${inView ? "is-in" : ""} ${className}`}>
      {children}
    </Tag>
  );
}

export function RevealLines({
  as: Tag = "div",
  lines,
  className = "",
}: {
  as?: ElementType;
  lines: ReactNode[];
  className?: string;
}) {
  const { ref, inView } = useInView<HTMLElement>();
  return (
    <Tag ref={ref} className={`lines ${inView ? "is-in" : ""} ${className}`}>
      {lines.map((line, i) => (
        <span className="line" key={i}>
          <span className="line-inner" style={{ "--i": i } as CSSProperties}>
            {line}
          </span>
        </span>
      ))}
    </Tag>
  );
}

export function RevealWords({
  as: Tag = "p",
  text,
  className = "",
}: {
  as?: ElementType;
  text: string;
  className?: string;
}) {
  const { ref, inView } = useInView<HTMLElement>();
  return (
    <Tag ref={ref} className={`words ${inView ? "is-in" : ""} ${className}`}>
      {text.split(" ").map((word, i) => (
        <span
          className="word"
          key={i}
          style={{ "--i": Math.min(i, 40) } as CSSProperties}
        >
          {word}&nbsp;
        </span>
      ))}
    </Tag>
  );
}