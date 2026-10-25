import { ArrowUpRight } from "lucide-react";
export default function ServicesHeroSection() {
  return (
    <section className="container services-hero">
      <div>
        <span className="eyebrow">IT Solutions &amp; Staffing</span>
        <h1>
          Comprehensive IT Solutions That Deliver{" "}
          <span className="gradient-text">Results</span>
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
