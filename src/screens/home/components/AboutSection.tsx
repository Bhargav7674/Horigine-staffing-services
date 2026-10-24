export default function AboutSection() {
  return (
    <section
      className="container section-space about-home-layout"
      id="about-us"
    >
      <div>
        <span className="eyebrow">About Us</span>
        <h2>Shaping Teams with Precision and Purpose</h2>
        <p>
          Horigine Staffing is a fast-growing talent solutions company committed
          to connecting top IT professionals with leading global clients. We
          specialize in niche technology hiring and workforce solutions, driven
          by quality, speed, and integrity to help professionals grow and
          businesses succeed.
        </p>
        <a className="outline-button" href="/about-us">
          Explore More →
        </a>
      </div>
      <img
        src="/images/about-team.png"
        alt="Horigine technology team collaborating around computer screens"
        loading="lazy"
      />
    </section>
  );
}
