import { ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const headingPrefix = "Your Strategic Partner in ";
const animatedHeading = "IT Services & Elite Staffing Solutions.";
const heading = `${headingPrefix}${animatedHeading}`;

export default function HeroSection() {
  const [visibleCharacters, setVisibleCharacters] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisibleCharacters(animatedHeading.length);
      return;
    }

    let index = 0;
    let timeout = 0;
    let isDeleting = false;
    const animateText = () => {
      index += isDeleting ? -1 : 1;
      setVisibleCharacters(index);

      if (index === animatedHeading.length) {
        isDeleting = true;
        timeout = window.setTimeout(animateText, 1100);
      } else if (index === 0) {
        isDeleting = false;
        timeout = window.setTimeout(animateText, 350);
      } else {
        timeout = window.setTimeout(animateText, isDeleting ? 35 : 65);
      }
    };

    timeout = window.setTimeout(animateText, 65);
    return () => window.clearTimeout(timeout);
  }, []);

  return (
    <section className="container home-hero">
      <div>
        <span className="eyebrow">Expert IT Solutions</span>
        <h1 className="hero-heading-copy" aria-label={heading}>
          <span aria-hidden="true">
            {headingPrefix}
            <span className="gradient-text">
              {animatedHeading.slice(0, visibleCharacters)}
            </span>
          </span>
        </h1>
        <p>
          Horigine Staffing offers a dual focus on high-impact IT services and
          expert staffing solutions. We partner with startups to Fortune 500
          companies, connecting them with pre-vetted, top-tier IT talent and
          delivering robust software solutions.
        </p>
        <div className="hero-actions">
          <Link className="gradient-button" to="/services">
            Services <ArrowUpRight size={14} />
          </Link>
          <Link className="outline-button" to="/careers">
            View Openings
          </Link>
        </div>
      </div>
      <div className="hero-visual">
        <img
          src="/images/home-hero.png"
          alt="Horigine team collaborating in a bright office"
        />
      </div>
    </section>
  );
}
