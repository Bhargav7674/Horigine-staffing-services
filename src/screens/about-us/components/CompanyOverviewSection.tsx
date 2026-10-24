import { Link } from "react-router-dom";
export default function CompanyOverviewSection() {
  return (
    <section className="about-panel about-overview">
      <div className="breadcrumb">
        <Link to="/">Home</Link>
        <span> › </span>
        <span>About Us</span>
      </div>
      <h1>
        Built by people who've sat on{" "}
        <span className="gradient-text">both sides of the table.</span>
      </h1>
      <p>
        We've hired engineers, and we've been the engineers getting hired.
        That's why Horigine runs technology delivery and technical staffing
        under one roof, held to the same standard.
      </p>
    </section>
  );
}
