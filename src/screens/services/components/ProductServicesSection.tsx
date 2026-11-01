import { Code2, Database, MonitorSmartphone } from "lucide-react";

const services = [
  {
    title: "Salesforce Solutions",
    description:
      "End-to-end Salesforce implementation, customization, and integration to supercharge your CRM capabilities.",
    icon: Database,
    image: "/images/salesforce.png",
  },
  {
    title: "Custom Software",
    description:
      "Bespoke applications tailored to your unique business workflows, built with modern tech stacks for maximum efficiency.",
    icon: Code2,
    image: "/images/custome_software.png",
  },
  {
    title: "Mobile App & Website Development",
    description:
      "High-performing mobile apps and responsive websites designed to engage users and drive business growth.",
    icon: MonitorSmartphone,
    image: "/images/mobile app.png",
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
        {services.map(({ title, description, icon: Icon, image }) => (
          <article className="glass-card product-card" key={title}>
            <span className="product-icon">
              <Icon size={18} />
            </span>
            <h3>{title}</h3>
            <p>{description}</p>
            <img src={image} alt={title} loading="lazy" />
          </article>
        ))}
      </div>
    </section>
  );
}
