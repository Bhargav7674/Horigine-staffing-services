const beliefs = [
  [
    "Technical Honesty",
    "If we don't understand a role or a project well enough to do it right, we say so before we start.",
  ],
  [
    "Fit Over Volume",
    "Three well-matched candidates beat thirty maybes; one well-scoped project beats a padded statement of work.",
  ],
  [
    "Accountability",
    "On delivery, we own the outcome. On staffing, we stay involved after placement.",
  ],
  [
    "People First",
    "Candidates and client engineers get the same transparency as the company paying the bill.",
  ],
];
export default function BeliefsSection() {
  return (
    <section>
      <div className="section-heading">
        <h2>What We Believe</h2>
        <div className="about-divider" style={{ margin: "16px auto 0" }} />
      </div>
      <div className="belief-grid">
        {beliefs.map(([t, d], i) => (
          <article className="glass-card belief-card" key={t}>
            <h3>
              {["◈", "☷", "◇", "♧"][i]}　{t}
            </h3>
            <p>“{d}”</p>
          </article>
        ))}
      </div>
    </section>
  );
}
