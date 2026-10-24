import { Link } from "react-router-dom";

const jobs = [
  ["Senior AWS Architect", "Remote / Full-time"],
  ["Lead Salesforce Developer", "Hybrid / Full-time"],
  [".NET Full-Stack Engineer", "Remote / Contract"],
];
export default function CareersSection() {
  return (
    <section className="container section-space" id="careers">
      <div className="section-heading">
        <span className="eyebrow">Careers</span>
        <h2>Current Openings</h2>
      </div>
      <div className="job-grid">
        {jobs.map(([t, d]) => (
          <article className="glass-card job-card" key={t}>
            <h3>{t}</h3>
            <p>{d}</p>
            <a className="text-link" href="mailto:careers@horiginestaffing.com">
              View Details →
            </a>
          </article>
        ))}
      </div>
      <div style={{ textAlign: "center", marginTop: 24 }}>
        <Link className="outline-button compact-openings-link" to="/careers">
          See All Openings
        </Link>
      </div>
    </section>
  );
}
