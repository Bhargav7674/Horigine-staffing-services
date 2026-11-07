import { Cloud, Code2, Database, Workflow } from "lucide-react";
const services = [
  {
    title: "Salesforce",
    description:
      "Customize and implement Salesforce solutions to strengthen customer relationships, streamline workflows, and turn business data into actionable insights.",
    image: "/images/salesforce.png",
  },
  {
    title: "Product Engineering & AI/ML",
    description:
      "Build and enhance digital products with full-cycle engineering, intelligent AI/ML capabilities, and scalable architecture tailored to your business needs.",
    image: "/images/product_engineering.png",
  },
  {
    title: "Oracle",
    description:
      "Design, modernize, and support Oracle applications and databases to improve performance, reliability, and the flow of critical business data.",
    image: "/images/oracle.png",
  },
  {
    title: "SAP",
    description:
      "Implement and optimize SAP solutions to connect core business processes, improve operational visibility, and support confident decision-making.",
    image: "/images/sap.png",
  },
];

export default function ITServicesSection() {
  return (
    <section className="container section-space" id="services">
      <div className="section-heading">
        <span className="eyebrow">What We Offer</span>
        <h2>IT Solutions</h2>
      </div>
      <div className="service-grid">
        {services.map(({ title, description, image }) => (
          <article className="glass-card service-card" key={title}>
            <div className="service-image-wrap">
              <img className="service-image" src={image} alt={title} />
            </div>
            <h3>{title}</h3>
            <p>{description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
