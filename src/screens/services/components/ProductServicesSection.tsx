import { Cloud, Code2, Database } from "lucide-react";

const services = [
  {
    title: "Custom Software",
    description:
      "Bespoke applications tailored to your unique business workflows, built with modern tech stacks for maximum efficiency.",
    icon: Code2,
  },
  {
    title: "Cloud Consulting",
    description:
      "Strategic migration, optimization, and management of cloud infrastructure across AWS, Azure, and Google Cloud.",
    icon: Cloud,
  },
  {
    title: "Salesforce Solutions",
    description:
      "End-to-end Salesforce implementation, customization, and integration to supercharge your CRM capabilities.",
    icon: Database,
  },
];

export default function ProductServicesSection() {
  return (
    <section
      className="container services-section divided"
      id="product-services"
    >
      <div className="section-heading">
        <h2>IT Solutions</h2>
        <p>
          End-to-end technology solutions engineered for scalability, security,
          and performance.
        </p>
      </div>
      <div className="product-grid">
        {services.map(({ title, description, icon: Icon }) => (
          <article className="glass-card product-card" key={title}>
            <span className="product-icon">
              <Icon size={18} />
            </span>
            <h3>{title}</h3>
            <p>{description}</p>
            <img src="/images/about-team.png" alt="" loading="lazy" />
          </article>
        ))}
      </div>
    </section>
  );
}
