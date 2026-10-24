const items = [
  ["Contract Staffing", "Flexible talent for project-based needs."],
  [
    "Full-Time / Direct-Hire Placement",
    "Screened candidates for permanent roles.",
  ],
  ["Managed Project Teams", "Dedicated teams aligned to delivery goals."],
];
export default function StaffingSection() {
  return (
    <section className="services-section divided">
      <div className="container">
        <div className="section-heading">
          <h2>IT Staffing &amp; Recruitment</h2>
          <p>
            Connecting you with top-tier technical talent to drive your projects
            forward.
          </p>
        </div>
        <div className="staffing-grid">
          {items.map(([t, d], i) => (
            <article
              key={t}
              className="staffing-card"
              style={{
                backgroundImage: `linear-gradient(0deg,rgba(13,24,38,.9),rgba(24,40,58,.62)),url(/images/about-our-story.png)`,
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
