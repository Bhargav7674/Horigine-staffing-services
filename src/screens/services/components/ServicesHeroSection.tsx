import { ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";

const rotatingResultLines = [
  "Deliver Results",
  "Drive Growth",
  "Build Momentum",
];

export default function ServicesHeroSection() {
  const [resultIndex, setResultIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setResultIndex((current) => (current + 1) % rotatingResultLines.length);
    }, 2400);

    return () => window.clearInterval(timer);
  }, []);

  const currentResult = rotatingResultLines[resultIndex];

  return (
    <section className="container services-hero">
      <div>
        <span className="eyebrow">IT Solutions</span>
        <h1>
          Comprehensive IT
          <br />
          Solutions That
          <span className="services-highlight" aria-live="polite">
            <span className="services-highlight-line">{currentResult}</span>
          </span>
        </h1>
        <p>
          Empowering enterprises with cutting-edge technology services and elite
          IT talent. We bridge the gap between vision and execution.
        </p>
        <div className="hero-actions">
          <a className="gradient-button" href="#product-services">
            Explore Services <ArrowUpRight size={14} />
          </a>
          <a className="outline-button" href="#services-contact">
            Schedule Consultation
          </a>
        </div>
      </div>
      <div className="services-hero-art">
        <img
          src="/images/services-dashboard.png"
          alt="Horigine services dashboard illustrating technology and staffing solutions"
        />
      </div>
    </section>
  );
}
