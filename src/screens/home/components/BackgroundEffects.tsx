
import { useEffect, useRef } from "react";
import "./background-effects.css";

const nodes = [
  { x: 8, y: 18 },
  { x: 22, y: 35 },
  { x: 15, y: 72 },
  { x: 35, y: 16 },
  { x: 42, y: 55 },
  { x: 30, y: 85 },
  { x: 58, y: 25 },
  { x: 70, y: 48 },
  { x: 62, y: 82 },
  { x: 85, y: 18 },
  { x: 92, y: 65 },
  { x: 78, y: 88 },
];

const connections = [
  [0, 1], [0, 3], [1, 2], [1, 4], [2, 5],
  [3, 4], [3, 6], [4, 5], [4, 6], [4, 7],
  [5, 8], [6, 7], [6, 9], [7, 8], [7, 9],
  [7, 10], [8, 11], [9, 10], [10, 11],
];

export default function BackgroundEffects() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = glowRef.current;

    if (!el) return;

    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      window.matchMedia("(pointer: coarse)").matches
    ) {
      return;
    }

    let frame = 0;
    let x = 0;
    let y = 0;

    const onMove = (event: MouseEvent) => {
      x = event.clientX;
      y = event.clientY;

      if (frame) return;

      frame = requestAnimationFrame(() => {
        frame = 0;
        el.style.transform =
          `translate3d(${x - 250}px, ${y - 250}px, 0)`;
        el.style.opacity = "1";
      });
    };

    const onLeave = () => {
      el.style.opacity = "0";
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <>
      <div className="fx-layer" aria-hidden="true">
        <div className="fx-grid" />

        <div className="fx-orb fx-orb-1" />
        <div className="fx-orb fx-orb-2" />
        <div className="fx-orb fx-orb-3" />

        <div className="fx-network">
          <svg viewBox="0 0 100 100" preserveAspectRatio="none">
            {connections.map(([start, end], index) => (
              <line
                key={index}
                x1={nodes[start].x}
                y1={nodes[start].y}
                x2={nodes[end].x}
                y2={nodes[end].y}
                className="fx-network-line"
              />
            ))}

            {nodes.map((node, index) => (
              <circle
                key={index}
                cx={node.x}
                cy={node.y}
                r=".32"
                className={`fx-network-node ${
                  index % 4 === 1 ? "gold-node" : ""
                }`}
              />
            ))}
          </svg>
        </div>

        <div className="fx-light-streak fx-streak-1" />
        <div className="fx-light-streak fx-streak-2" />
      </div>

      <div
        className="fx-cursor"
        ref={glowRef}
        aria-hidden="true"
      />
    </>
  );
}
