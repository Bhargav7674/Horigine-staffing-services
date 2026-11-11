import {
  AlertTriangle,
  Bot,
  CloudCog,
  Code2,
  Database,
  MonitorSmartphone,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useInView } from "../../home/components/Reveal";

const services = [
  {
    title: "CRM Solutions",
    description:
      "Deliver customer-focused lifecycle solutions across leading CRM platforms to improve sales visibility, service operations, and digital engagement.",
    detail: ["Salesforce", "Oracle", "SAP"],
    icon: Database,
  },
  {
    title: "Product Engineering & AI/ML",
    description:
      "Build and enhance digital products with full-cycle engineering, intelligent AI/ML capabilities, and scalable architecture tailored to your business needs.",
    icon: Code2,
  },
  {
    title: "Web & Mobile Development",
    description:
      "Design and deliver responsive web experiences and mobile-first applications that engage users and support modern business operations.",
    icon: MonitorSmartphone,
  },
  {
    title: "Cloud Implementation Services",
    description:
      "Modernize your infrastructure with secure, scalable cloud architectures, migrations, and managed delivery for business continuity and growth.",
    icon: CloudCog,
  },
];

export default function ProductServicesSection() {
  const { ref, inView } = useInView<HTMLDivElement>(0.15);
  return (
    <section className="container services-section divided" id="product-services">
      <div className="product-services-layout">
        <div ref={ref} className={`product-service-cards slide-cols ${inView ? "is-in" : ""}`}>
          {services.map(({ title, description, detail, icon: Icon }) => (
            <article className="product-card" key={title}>
              <div className="product-card-visual">
                <Icon size={42} strokeWidth={1.8} />
              </div>
              <h3>{title}</h3>
              <p>{description}</p>

              {detail && detail.length > 0 && (
                <div
                  className="product-card-tags"
                  aria-label={`${title} platforms`}
                >
                  {detail.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              )}
            </article>
          ))}
        </div>

        <aside className="product-services-content">
          <span className="product-section-line" aria-hidden="true" />
          <h3>IT Solutions</h3>

          <p>
            Horigine delivers tailored, scalable technology solutions that help
            organizations accelerate digital transformation, optimize operations,
            and grow with confidence. From strategy and implementation to
            continuous support, we build systems designed for real-world impact.
          </p>

          <div className="product-services-grid">
            <div className="service-badge">
              <span className="check">✓</span>
              <span>CRM &amp; Business Process Solutions</span>
            </div>
            <div className="service-badge">
              <span className="check">✓</span>
              <span>AI &amp; Intelligent Product Engineering</span>
            </div>
            <div className="service-badge">
              <span className="check">✓</span>
              <span>Cloud &amp; Infrastructure Modernization</span>
            </div>
            <div className="service-badge">
              <span className="check">✓</span>
              <span>Web, Mobile &amp; Digital Experience Delivery</span>
            </div>
          </div>

          <Link className="product-discover-btn" to="/contact-us">
            DISCOVER MORE
          </Link>
        </aside>
      </div>
    </section>
  );
}
