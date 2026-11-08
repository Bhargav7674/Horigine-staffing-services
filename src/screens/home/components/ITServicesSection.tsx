import { ArrowRight, Cloud, Code2, Layers3, MonitorSmartphone, type LucideIcon } from "lucide-react";
import { useState } from "react";

const crmSolutions = [
  { title: "Salesforce", description: "CRM and automation for sales, service, and customer journeys.", image: "/images/Salesforce-Journey.jpg" },
  { title: "Oracle", description: "Enterprise platforms, applications, and data reliability.", image: "/images/oracle database.webp" },
  { title: "SAP", description: "Business process optimization and operational visibility.", image: "/images/sap.jpg" },
];

type Service = {
  title: string;
  description: string;
  image: string;
  icon: LucideIcon;
  miniCards?: typeof crmSolutions;
};

const services: Service[] = [
  {
    title: "CRM Solutions",
    description: "Deliver customer-focused lifecycle solutions across leading CRM platforms.",
    image: "/images/crm.jpg",
    icon: Layers3,
    miniCards: crmSolutions,
  },
  {
    title: "Product Engineering & AI/ML",
    description: "Build and enhance digital products with full-cycle engineering and AI/ML capabilities.",
    image: "/images/product-engineering.webp",
    icon: Code2,
  },
  {
    title: "Web & Mobile Development",
    description: "Design and deliver responsive web and mobile applications for modern businesses.",
    image: "/images/Web-Mobile-Development.jpg",
    icon: MonitorSmartphone,
  },
  {
    title: "Cloud Implementation Services",
    description: "Modernize your infrastructure with secure, scalable, and managed cloud solutions.",
    image: "/images/cloud-implementation-services.jpg",
    icon: Cloud,
  },
];

const crmPopupText =
  "We design, implement, and optimize customer engagement platforms that help teams sell smarter, serve faster, and grow with confidence.";

export default function ITServicesSection() {
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const toggle = (t: string) => setExpandedCard((c) => (c === t ? null : t));

  return (
    <section className="container offer-section" id="services">
      <div className="offer-heading">
        <span className="offer-eyebrow">What We Offer</span>
        <h2>IT Solutions</h2>
        <p>End-to-end technology solutions to build, modernize, and scale your business.</p>
      </div>

      <div className="offer-grid">
        {services.map(({ title, description, image, icon: Icon, miniCards }) => {
          const isExpanded = miniCards ? expandedCard === title : false;
          return (
            <article
              className="offer-card"
              key={title}
              tabIndex={0}
              onClick={() => miniCards && toggle(title)}
              onMouseEnter={() => miniCards && setExpandedCard(title)}
              onMouseLeave={() => miniCards && setExpandedCard((c) => (c === title ? null : c))}
              onFocus={() => miniCards && setExpandedCard(title)}
              onBlur={() => miniCards && setExpandedCard((c) => (c === title ? null : c))}
              onKeyDown={(e) => {
                if ((e.key === "Enter" || e.key === " ") && miniCards) {
                  e.preventDefault();
                  toggle(title);
                }
              }}
              role={miniCards ? "button" : undefined}
              aria-expanded={miniCards ? isExpanded : undefined}
            >
              <div className="offer-image-wrap">
                <img src={image} alt={title} />
              </div>
              <div className="offer-body">
                <span className="offer-icon"><Icon size={30} strokeWidth={1.8} /></span>
                <h3>{title}</h3>
                <p>{description}</p>
                <span className="offer-link">
                  Explore Service <ArrowRight size={14} />
                </span>
              </div>
            </article>
          );
        })}

        {services
          .filter(({ miniCards }) => miniCards)
          .map(({ title, miniCards }) => {
            if (!miniCards || expandedCard !== title) return null;
            return (
              <div
                className="crm-modal-overlay"
                key={`${title}-overlay`}
                onClick={() => setExpandedCard(null)}
                onMouseEnter={() => setExpandedCard(title)}
                onMouseLeave={() => setExpandedCard(null)}
                role="presentation"
              >
                <div
                  className="crm-modal-panel"
                  onClick={(e) => e.stopPropagation()}
                  role="dialog"
                  aria-modal="true"
                  aria-label="CRM platform options"
                >
                  <button type="button" className="crm-modal-close" aria-label="Close CRM solutions" onClick={() => setExpandedCard(null)}>
                    ×
                  </button>
                  <div className="crm-modal-header">
                    <span className="eyebrow">CRM Solutions</span>
                    <p>{crmPopupText}</p>
                  </div>
                  <div className="crm-modal-grid">
                    {miniCards.map(({ title: t, description: d, image: img }) => (
                      <div className="crm-subcard" key={t}>
                        <img src={img} alt={t} />
                        <div>
                          <strong>{t}</strong>
                          <span>{d}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </section>
  );
}