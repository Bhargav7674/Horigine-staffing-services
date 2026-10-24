const steps = [
  ["Discovery", "We understand your unique requirements and goals."],
  ["Strategy", "We formulate a tailored plan of action."],
  ["Execution", "Our experts implement the solution flawlessly."],
  ["Delivery", "Continuous support and successful project handover."],
];
export default function WorkProcessSection() {
  return (
    <section className="container services-section">
      <div className="section-heading">
        <h2>How We Work</h2>
        <p>Our streamlined process ensures transparency and rapid results.</p>
      </div>
      <div className="work-process">
        {steps.map(([t, d], i) => (
          <article className="work-step" key={t}>
            <b>{i + 1}</b>
            <h3>{t}</h3>
            <p>{d}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
