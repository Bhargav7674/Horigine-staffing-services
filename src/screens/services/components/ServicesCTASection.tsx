import { Link } from "react-router-dom";

export default function ServicesCTASection() {
  return (
    <section className="container services-cta" id="services-contact">
      <h2>Not Sure Which Path Fits?</h2>
      <p>
        Connect with our talent acquisition experts today to discuss your
        specific engineering needs and scale your team rapidly.
      </p>
      <Link className="light-button" to="/contact-us">
        Contact Us
      </Link>
    </section>
  );
}
