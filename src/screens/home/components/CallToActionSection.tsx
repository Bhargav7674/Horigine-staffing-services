import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function CallToActionSection() {
  return (
    <section className="container section-space" id="get-started">
      <div className="cta-panel">
        <h2>
          Powering Your Business With <span>Technology and Talent</span>
        </h2>
        <p>
          From custom IT solutions to pre-vetted tech professionals, Horigine
          helps you build, scale, and grow with confidence. Tell us what you
          need, and our team will get started.
        </p>
        <Link className="cta-btn" to="/contact-us">
          Contact Us Today <ArrowRight size={18} />
        </Link>
      </div>
    </section>
  );
}