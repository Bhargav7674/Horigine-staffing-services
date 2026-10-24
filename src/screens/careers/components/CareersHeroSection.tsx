import { Link } from "react-router-dom";

export default function CareersHeroSection() {
  return (
    <section
      className="careers-hero section-container"
      aria-labelledby="careers-title"
    >
      <div className="careers-hero-glow" aria-hidden="true" />
      <div className="careers-hero-content">
        <p className="eyebrow careers-eyebrow">
          <span /> Build what comes next
        </p>
        <h1 id="careers-title">
          Join a Team of <span>Tech Innovators</span>
        </h1>
        <p className="careers-hero-copy">
          Shape the future of enterprise technology. We are looking for
          visionary thinkers and dedicated professionals to build
          tomorrow&apos;s digital landscape.
        </p>
        <div className="careers-hero-actions">
          <a
            className="careers-button careers-button-primary"
            href="#open-roles"
          >
            View Open Roles
          </a>
          <a
            className="careers-button careers-button-secondary"
            href="#why-work-with-us"
          >
            Learn About Our Culture
          </a>
        </div>
      </div>
    </section>
  );
}
