import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

const headingWords = [
  "Your",
  "Strategic",
  "Partner",
  "in",
  "IT",
  "Services",
  "&",
  "Elite",
  "Staffing",
  "Solutions.",
];

export default function HeroSection() {
  return (
    <section className="container home-hero">
      <div>
        <span className="eyebrow">Premium IT Solutions</span>
        <h1>
          {headingWords.map((word, index) => (
            <span
              className={`hero-heading-word${index >= 4 ? " gradient-text" : ""}`}
              key={word}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {word}{" "}
            </span>
          ))}
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
