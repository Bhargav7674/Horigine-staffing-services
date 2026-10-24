import { Link } from "react-router-dom";

export default function CallToActionSection() {
  return (
    <section className="container section-space" id="get-started">
      <div className="cta-panel">
        <h2>
          Ready to Build Your <span>Dream Team?</span>
        </h2>
        <p>
          Empower your growth with top-tier AWS, .NET, and Salesforce
          professionals. Contact us today to discover how Horigine Staffing can
          help you hire smarter, faster, and more effectively.
        </p>
        <Link
          className="outline-button"
          style={{
            background: "#fff",
            color: "#10131a",
            border: 0,
            borderRadius: 999,
          }}
          to="/contact-us"
        >
          Contact Us Today
        </Link>
      </div>
    </section>
  );
}
