import { Globe2, GraduationCap, Lightbulb } from "lucide-react";

const benefits = [
  {
    title: "Global Impact",
    description:
      "Work on mission-critical projects for Fortune 500 companies, shaping technologies used by millions worldwide.",
    icon: Globe2,
    tone: "cyan",
  },
  {
    title: "Continuous Learning",
    description:
      "Dedicated budgets for certifications, tech conferences, and internal masterclasses to keep your skills razor-sharp.",
    icon: GraduationCap,
    tone: "orange",
  },
  {
    title: "Innovative Culture",
    description:
      "A flat hierarchy that champions new ideas, agile methodologies, and a fail-fast approach to solving complex problems.",
    icon: Lightbulb,
    tone: "blue",
  },
];

export default function WhyWorkWithUsSection() {
  return (
    <section
      className="careers-benefits section-container"
      id="why-work-with-us"
      aria-labelledby="benefits-title"
    >
      <div className="section-heading centered-heading">
        <h2 id="benefits-title">Why Work With Us</h2>
        <span className="heading-underline" />
      </div>
      <div className="benefit-grid">
        {benefits.map(({ title, description, icon: Icon, tone }) => (
          <article className="benefit-card" key={title}>
            <div className={`benefit-icon ${tone}`}>
              <Icon size={21} strokeWidth={2.4} />
            </div>
            <h3>{title}</h3>
            <p>{description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
