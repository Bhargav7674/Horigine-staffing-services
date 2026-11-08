import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { Reveal, RevealLines } from "./Reveal";

const quotes = [
  [
    "“Horigine delivered exactly what we needed — fast and reliable recruitment support. Their understanding of technical roles like AWS and .NET was truly impressive.”",
    "Priya M.",
  ],
  [
    "“We had a critical Salesforce role open for weeks. Horigine closed it within days with a perfect candidate. Highly recommend their focused approach.”",
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

const PER_PAGE = 3;

const initials = (name: string) =>
  name
    .replace(/\./g, "")
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

export default function TestimonialsSection() {
  const [activePage, setActivePage] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const pageCount = Math.ceil(quotes.length / PER_PAGE);

  const go = (step: number) =>
    setActivePage((page) => (page + step + pageCount) % pageCount);

  useEffect(() => {
    if (
      isPaused ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }
    const interval = window.setInterval(() => go(1), 5000);
    return () => window.clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPaused, pageCount]);

  return (
    <section className="container testi-section" id="testimonials">
      <div className="testi-heading">
        <Reveal as="span" className="testi-eyebrow">
          <i aria-hidden="true" />
          What Our Clients Say
        </Reveal>

        <RevealLines
          as="h2"
          lines={[
            "Trusted by Teams.",
            <>
              <span className="testi-gradient">Recommended by Leaders.</span>
            </>,
          ]}
        />
        <Reveal className="testi-swoosh" delay={400}>
          <span />
        </Reveal>
      </div>

      <Reveal delay={150}>
        <div
          className="testi-controls"
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
            className="testi-carousel"
            onTouchStart={(event) => {
              touchStartX.current = event.changedTouches[0].clientX;
            }}
            onTouchEnd={(event) => {
              if (touchStartX.current === null) return;
              const distance =
                touchStartX.current - event.changedTouches[0].clientX;
              if (Math.abs(distance) > 40) go(Math.sign(distance));
              touchStartX.current = null;
            }}
          >
            <div
              className="testi-track"
              style={{ transform: `translateX(-${activePage * 100}%)` }}
              aria-live="polite"
            >
              {Array.from({ length: pageCount }, (_, pageIndex) => (
                <div
                  className="testi-slide"
                  key={pageIndex}
                  aria-label={`Testimonials ${pageIndex * PER_PAGE + 1} to ${Math.min(
                    pageIndex * PER_PAGE + PER_PAGE,
                    quotes.length,
                  )}`}
                >
                  {quotes
                    .slice(pageIndex * PER_PAGE, pageIndex * PER_PAGE + PER_PAGE)
                    .map(([quote, name], i) => (
                      <article
                        className={`testi-card ${
                          (pageIndex * PER_PAGE + i) % 2 === 0
                            ? "testi-teal"
                            : "testi-gold"
                        }`}
                        key={name}
                      >
                        <span className="testi-quote-icon">
                          <Quote size={26} strokeWidth={2} />
                        </span>

                        <div className="testi-stars" aria-label="5 out of 5 stars">
                          {Array.from({ length: 5 }, (_, s) => (
                            <Star key={s} size={16} fill="currentColor" strokeWidth={0} />
                          ))}
                        </div>

                        <p>{quote}</p>

                        <footer className="testi-author">
                          <span className="testi-avatar">{initials(name)}</span>
                          <div>
                            <b>{name}</b>
                            <small>Verified Client</small>
                          </div>
                        </footer>
                      </article>
                    ))}
                </div>
              ))}
            </div>
          </div>

          <div className="testi-nav">
            <button
              type="button"
              className="testi-arrow"
              aria-label="Previous testimonials"
              onClick={() => go(-1)}
            >
              <ChevronLeft size={20} />
            </button>

            <div className="testi-dots" aria-label="Choose testimonial page">
              {Array.from({ length: pageCount }, (_, pageIndex) => (
                <button
                  aria-label={`Show testimonial page ${pageIndex + 1}`}
                  aria-current={activePage === pageIndex ? "true" : undefined}
                  className={
                    activePage === pageIndex ? "testi-dot testi-dot-active" : "testi-dot"
                  }
                  key={pageIndex}
                  onClick={() => setActivePage(pageIndex)}
                  type="button"
                />
              ))}
            </div>

            <button
              type="button"
              className="testi-arrow"
              aria-label="Next testimonials"
              onClick={() => go(1)}
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </Reveal>
    </section>
  );
}