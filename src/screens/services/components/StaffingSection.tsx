import {
  BriefcaseBusiness,
  Handshake,
  Users,
  UserSearch,
} from "lucide-react";
import { Link } from "react-router-dom";

const items = [
  {
    title: "HR Consulting",
    description:
      "Get practical guidance on workforce planning, talent strategy, and retention to build stronger, more effective teams.",
    icon: Users,
  },
  {
    title: "Dedicated Teams",
    description:
      "Build a dedicated team of skilled technology professionals who integrate with your in-house staff and support your goals.",
    icon: Handshake,
  },
  {
    title: "IT Staffing Solutions",
    description:
      "Find qualified IT professionals for contract, contract-to-hire, and permanent roles across cloud, software, data, and infrastructure.",
    icon: BriefcaseBusiness,
  },
  {
    title: "Recruiter Support",
    description:
      "Extend your recruiting capacity with sourcing, candidate screening, and placement support tailored to your hiring needs.",
    icon: UserSearch,
  },
];

export default function StaffingSection() {
  return (
    <section className="services-section divided">
      <div className="container">
        <div className="staffing-layout">
          <aside className="staffing-content">
            <span className="product-section-line" aria-hidden="true" />
            <h3>IT Staffing</h3>
            <p>
              We help businesses scale with the right people, the right skills, and
              the right hiring model. From strategic talent planning to rapid
              recruitment support, our staffing approach is built for speed,
              flexibility, and long-term business impact.
            </p>

            <div className="staffing-content-list">
              <div className="service-badge">
                <span className="check">✓</span>
                <span>Flexible staffing solutions</span>
              </div>
              <div className="service-badge">
                <span className="check">✓</span>
                <span>Specialized tech hiring support</span>
              </div>
              <div className="service-badge">
                <span className="check">✓</span>
                <span>Recruitment and workforce planning</span>
              </div>
            </div>

            <Link className="product-discover-btn" to="/contact-us">
              DISCOVER MORE
            </Link>
          </aside>

          <div className="staffing-grid">
            {items.map(({ title, description, icon: Icon }) => (
              <article key={title} className="staffing-card">
                <div className="staffing-card-visual">
                  <Icon size={40} strokeWidth={1.8} />
                </div>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
