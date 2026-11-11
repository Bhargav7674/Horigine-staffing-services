import { ArrowRight, BriefcaseBusiness, Layers3, UsersRound, type LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";

type Card = { title: string; description: string; image: string; icon: LucideIcon };

const cards: Card[] = [
  {
    title: "HR Consulting",
    description: "Get practical guidance on workforce planning, talent strategy, and retention.",
    image: "/images/hr_consultancy.png",
    icon: UsersRound,
  },
  {
    title: "Dedicated Teams",
    description: "Build a dedicated team of skilled technology professionals aligned with your goals.",
    image: "/images/dedicated_engineering.png",
    icon: Layers3,
  },
  {
    title: "IT Staffing Solutions",
    description: "Find qualified IT professionals for contract, contract-to-hire, and permanent roles.",
    image: "/images/IT_staffing.png",
    icon: BriefcaseBusiness,
  },
  {
    title: "Recruiter Support",
    description: "Extend your recruiting capacity with sourcing, screening, and placement support.",
    image: "/images/recruiter.png",
    icon: UsersRound,
  },
];

export default function ITStaffingSection() {
  return (
    <section className="container offer-section offer-staffing">
      <div className="offer-heading">
        <span className="offer-eyebrow">What We Do</span>
        <h2>IT Staffing</h2>
        <p>Flexible, reliable, and high-quality IT talent to power your business.</p>
      </div>

      <div className="offer-grid">
        {cards.map(({ title, description, image, icon: Icon }) => (
          <article className="offer-card" key={title}>
            <div className="offer-image-wrap">
              <img src={image} alt={title} />
            </div>
            <div className="offer-body">
              <span className="offer-icon"><Icon size={30} strokeWidth={1.8} /></span>
              <h3>{title}</h3>
              <p>{description}</p>
              <Link to="/services#staffing-services" className="offer-link">
                Explore Service <ArrowRight size={14} />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}