import {
  BarChart3,
  Rocket,
  Search,
  SlidersHorizontal,
} from "lucide-react";

const steps = [
  {
    title: "Discovery",
    description:
      "We understand your unique requirements and goals. Through discovery, we assess your current challenges, desired outcomes, and business context to define the right path forward.",
    icon: Search,
  },
  {
    title: "Strategy",
    description:
      "We formulate a tailored plan of action. This includes scope definition, milestones, resource planning, and clear success metrics to ensure the solution aligns with your goals.",
    icon: SlidersHorizontal,
  },
  {
    title: "Execution",
    description:
      "Our experts implement the solution flawlessly. We build, integrate, and deliver with precision while maintaining quality, transparency, and strong collaboration throughout the project lifecycle.",
    icon: Rocket,
  },
  {
    title: "Delivery",
    description:
      "Continuous support and successful project handover. We ensure a smooth launch, monitor performance, and provide ongoing optimization to help your business achieve long-term results.",
    icon: BarChart3,
  },
];

export default function WorkProcessSection() {
  return (
    <section className="container services-section work-process-section">
      <div className="work-process-heading">
        <h2>How We Work</h2>
        <p>Our streamlined process ensures transparency and rapid results.</p>
      </div>

      <div className="work-process">
        {steps.map(({ title, description, icon: Icon }, index) => (
          <article className="work-step" key={title}>
            <div className="work-step-number">{index + 1}</div>
            <div className="work-step-icon-wrap">
              <Icon size={30} strokeWidth={1.8} />
            </div>

            <div className="work-step-content">
              <h3>{title}</h3>
              <p>{description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
