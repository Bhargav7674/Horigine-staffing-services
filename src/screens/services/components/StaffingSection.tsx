const items = [
  ["Contract Staffing", "Flexible talent for project-based needs.", "/images/about-team.png"],
  [
    "Full-Time / Direct-Hire Placement",
    "Screened candidates for permanent roles.",
    "/images/direct-hire-placement.png",
  ],
  [
    "Managed Project Teams",
    "Dedicated teams aligned to delivery goals.",
    "/images/managed-project-teams.png",
  ],
];
export default function StaffingSection() {
  return (
    <section className="services-section divided">
      <div className="container">
        <div className="section-heading">
          <h2>IT Staffing</h2>
          <p>
            Staffing services for contract, full-time, and managed technical
            teams, with candidates screened for the work they will do.
          </p>
        </div>
        <div className="staffing-grid">
          {items.map(([t, d, image], i) => (
            <article
              key={t}
              className="staffing-card"
              style={{
                backgroundImage: `linear-gradient(0deg,rgba(13,24,38,.9),rgba(24,40,58,.62)),url(${image})`,
              }}
            >
              <span className="staffing-dot">{i + 1}</span>
              <h3>{t}</h3>
              <p>{d}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
