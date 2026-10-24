import { Cloud, Code2, Database, Workflow } from "lucide-react";
const services = [
  [
    "Product Engineering & DevOps",
    "Accelerate your software delivery lifecycle with custom product development, automated CI/CD pipelines, and continuous monitoring.",
    Code2,
  ],
  [
    "Cloud Consulting (AWS/Azure)",
    "Expert guidance on cloud strategy, migration, and optimization to ensure your infrastructure is scalable, secure, and cost-effective.",
    Cloud,
  ],
  [
    "Salesforce Implementation",
    "End-to-end Salesforce integration and customization to maximize your CRM investment and streamline customer interactions.",
    Database,
  ],
  [
    "System Integration & Maintenance",
    "Seamlessly connect disparate systems and provide ongoing support to ensure robust, secure, and competitive digital products.",
    Workflow,
  ],
];
export default function ITServicesSection() {
  return (
    <section className="container section-space" id="services">
      <div className="section-heading">
        <span className="eyebrow">What We Offer</span>
        <h2>IT Services</h2>
      </div>
      <div className="service-grid">
        {services.map(([title, desc, Icon]) => {
          const I = Icon as typeof Code2;
          return (
            <article className="glass-card service-card" key={title as string}>
              <span className="service-icon">
                <I size={18} />
              </span>
              <h3>{title as string}</h3>
              <p>{desc as string}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
