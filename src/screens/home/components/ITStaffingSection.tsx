import { BriefcaseBusiness, Cloud, Code2, UsersRound } from "lucide-react";

const cards = [
  [
    "HR Consulting",
    "Get practical guidance on workforce planning, talent strategy, and retention to build stronger, more effective teams.",
    BriefcaseBusiness,
  ],
  [
    "Dedicated Teams",
    "Build a dedicated team of skilled technology professionals who integrate with your in-house staff and support your goals.",
    UsersRound,
  ],
  [
    "IT Staffing Solutions",
    "Find qualified IT professionals for contract, contract-to-hire, and permanent roles across cloud, software, data, and infrastructure.",
    Cloud,
  ],
  [
    "Recruiter Support",
    "Extend your recruiting capacity with sourcing, candidate screening, and placement support tailored to your hiring needs.",
    Code2,
  ],
];
export default function ITStaffingSection() {
  return (
    <section className="container section-space">
      <div className="section-heading">
        <span className="eyebrow">What We Do</span>
        <h2>IT Staffing</h2>
      </div>
      <div className="service-grid">
        {cards.map(([t, d, Icon]) => {
          const I = Icon as typeof Cloud;
          return (
            <article className="staffing-card" key={t as string}>
              <span className="staffing-dot">
                <I size={15} />
              </span>
              <h3>{t as string}</h3>
              <p>{d as string}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
