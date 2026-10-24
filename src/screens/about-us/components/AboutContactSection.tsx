import { Link } from "react-router-dom";
export default function AboutContactSection() {
  return (
    <section className="about-panel about-contact">
      <h2>
        Want to know more about how we work — on either side of the business?
      </h2>
      <Link className="gradient-button" to="/contact-us">
        Contact Us
      </Link>
    </section>
  );
}
