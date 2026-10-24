import { BriefcaseBusiness, Cloud, Code2, UsersRound } from "lucide-react";

const cards = [
  [
    "Cloud & DevOps Talent",
    "We provide certified AWS and Azure professionals skilled in cloud architecture, DevOps, and infrastructure management.",
    Cloud,
  ],
  [
    ".NET / Salesforce Placement",
    "Our network of experienced .NET developers and Salesforce experts helps you build scalable applications and enhance CRM performance.",
    Code2,
  ],
  [
    "Dedicated Teams",
    "Deploy fully integrated, cross-functional offshore teams that work as a natural extension of your in-house engineering department.",
    UsersRound,
  ],
  [
    "HR Consulting",
    "Strategic HR advisory services to help you navigate tech talent markets, structure teams effectively, and retain top performers.",
    BriefcaseBusiness,
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
