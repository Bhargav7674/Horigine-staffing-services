import { BriefcaseBusiness, Cloud, Code2, UsersRound } from "lucide-react";

const cards = [
  {
    title: "HR Consulting",
    description:
      "Get practical guidance on workforce planning, talent strategy, and retention to build stronger, more effective teams.",
    image: "/images/hr_consultancy.png",
  },
  {
    title: "Dedicated Teams",
    description:
      "Build a dedicated team of skilled technology professionals who integrate with your in-house staff and support your goals.",
    image: "/images/dedicated_engineering.png",
  },
  {
    title: "IT Staffing Solutions",
    description:
      "Find qualified IT professionals for contract, contract-to-hire, and permanent roles across cloud, software, data, and infrastructure.",
    image: "/images/IT_staffing.png",
  },
  {
    title: "Recruiter Support",
    description:
      "Extend your recruiting capacity with sourcing, candidate screening, and placement support tailored to your hiring needs.",
    image: "/images/recruiter.png",
  },
];

export default function ITStaffingSection() {
  return (
    <section className="container section-space">
      <div className="section-heading">
        <span className="eyebrow">What We Do</span>
        <h2>IT Staffing</h2>
      </div>
      <div className="service-grid">
        {cards.map(({ title, description, image }) => (
          <article className="staffing-card" key={title}>
            <div className="staffing-image-wrap">
              <img className="staffing-image" src={image} alt={title} />
            </div>
            <div className="staffing-card-content">
              <h3>{title}</h3>
              <p>{description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
