const steps = [
  ["Brief", "Understand requirements."],
  ["Source & Screen", "Identify top talent."],
  ["Shortlist", "Present best matches."],
  ["Hire", "Seamless onboarding."],
  ["Ongoing Support", "Ensure success."],
];
export default function ProcessSection() {
  return (
    <section className="container section-space">
      <div className="section-heading">
        <span className="eyebrow">Process</span>
        <h2>How It Works</h2>
      </div>
      <div className="process-grid">
        {steps.map(([t, d], i) => (
          <article className="glass-card process-step" key={t}>
            <b>{i + 1}</b>
            <h3>{t}</h3>
            <p>{d}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
