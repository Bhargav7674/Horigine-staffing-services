const items = [
  [
    "Industry Expertise",
    "Our deep knowledge of modern IT landscapes ensures we deliver talent and solutions that align with your technical and business needs.",
  ],
  [
    "Personalized Approach",
    "We dive deep into your company’s goals and culture to ensure every candidate or solution is a perfect fit—both technically and culturally.",
  ],
  [
    "Quality-Driven Vetting",
    "Through rigorous screening and technical assessments, we present only highly qualified professionals who can contribute from day one.",
  ],
  [
    "Long-Term Partnership",
    "We go beyond filling gaps. You gain a service provider who helps you build a better partner focused on long-term success.",
  ],
];
export default function WhyChooseUsSection() {
  return (
    <section className="container section-space">
      <div className="section-heading">
        <span className="eyebrow">Why Choose Us</span>
        <h2>
          Your Trusted Partner in Precision Hiring and Managed IT Solutions
        </h2>
      </div>
      <div className="feature-grid">
        {items.map(([t, d], i) => (
          <article className="glass-card feature-card" key={t}>
            <h3>{t}</h3>
            <p>{d}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
