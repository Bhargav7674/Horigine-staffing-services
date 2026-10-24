import { useEffect, useRef, useState } from "react";

const quotes = [
  [
    "“Horigine Staffing delivered exactly what we needed — fast and reliable recruitment support. Their understanding of technical roles like AWS and .NET was truly impressive.”",
    "Priya M.",
  ],
  [
    "“We had a critical Salesforce role open for weeks. Horigine Staffing closed it within days with a perfect candidate. Highly recommend their focused approach.”",
    "Arjun Deshmukh",
  ],
  [
    "“The quality of the .NET developers provided was top-notch. They integrated seamlessly into our team.”",
    "Sarah Jenkins",
  ],
  [
    "“Great partner for scaling our cloud infrastructure team quickly and efficiently.”",
    "Michael Chen",
  ],
  [
    "“The team understood our hiring needs and introduced strong candidates without slowing down our project.”",
    "Nisha R.",
  ],
  [
    "“Clear communication and a thoughtful screening process made the entire hiring experience straightforward.”",
    "David L.",
  ],
];
export default function TestimonialsSection() {
  const [activePage, setActivePage] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const pageCount = Math.ceil(quotes.length / 3);

  useEffect(() => {
    if (
      isPaused ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const interval = window.setInterval(() => {
      setActivePage((page) => (page + 1) % pageCount);
    }, 5000);

    return () => window.clearInterval(interval);
  }, [isPaused, pageCount]);

  return (
    <section className="container section-space">
      <div className="section-heading">
        <span className="eyebrow">What Our Clients Say</span>
        <h2>Trusted by Teams. Recommended by Leaders.</h2>
      </div>
      <div
        className="testimonial-carousel-controls"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onFocusCapture={() => setIsPaused(true)}
        onBlurCapture={(event) => {
          if (
            !event.currentTarget.contains(event.relatedTarget as Node | null)
          ) {
            setIsPaused(false);
          }
        }}
      >
        <div
          className="testimonial-carousel"
          onTouchStart={(event) => {
            touchStartX.current = event.changedTouches[0].clientX;
          }}
          onTouchEnd={(event) => {
            if (touchStartX.current === null) return;
            const touchDistance =
              touchStartX.current - event.changedTouches[0].clientX;

            if (Math.abs(touchDistance) > 40) {
              setActivePage(
                (page) =>
                  (page + Math.sign(touchDistance) + pageCount) % pageCount,
              );
            }

            touchStartX.current = null;
          }}
        >
          <div
            className="testimonial-track"
            style={{ transform: `translateX(-${activePage * 100}%)` }}
            aria-live="polite"
          >
            {Array.from({ length: pageCount }, (_, pageIndex) => (
              <div
                className="testimonial-slide"
                key={pageIndex}
                aria-label={`Testimonials ${pageIndex * 3 + 1} to ${Math.min(
                  pageIndex * 3 + 3,
                  quotes.length,
                )}`}
              >
                {quotes
                  .slice(pageIndex * 3, pageIndex * 3 + 3)
                  .map(([q, n]) => (
                    <article className="glass-card testimonial-card" key={n}>
                      <p>{q}</p>
                      <b>— {n}</b>
                    </article>
                  ))}
              </div>
            ))}
          </div>
        </div>
        <div
          className="testimonial-pagination"
          aria-label="Choose testimonial page"
        >
          {Array.from({ length: pageCount }, (_, pageIndex) => (
            <button
              aria-label={`Show testimonial page ${pageIndex + 1}`}
              aria-current={activePage === pageIndex ? "true" : undefined}
              className={
                activePage === pageIndex
                  ? "testimonial-dot testimonial-dot-active"
                  : "testimonial-dot"
              }
              key={pageIndex}
              onClick={() => setActivePage(pageIndex)}
              type="button"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
