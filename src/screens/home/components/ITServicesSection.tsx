import { Cloud, Code2, Database, Workflow } from "lucide-react";
const services = [
  [
    "Salesforce",
    "Customize and implement Salesforce solutions to strengthen customer relationships, streamline workflows, and turn business data into actionable insights.",
    Database,
  ],
  [
    "Product Engineering & AI/ML",
    "Build and enhance digital products with full-cycle engineering, intelligent AI/ML capabilities, and scalable architecture tailored to your business needs.",
    Code2,
  ],
  [
    "Oracle",
    "Design, modernize, and support Oracle applications and databases to improve performance, reliability, and the flow of critical business data.",
    Cloud,
  ],
  [
    "SAP",
    "Implement and optimize SAP solutions to connect core business processes, improve operational visibility, and support confident decision-making.",
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
