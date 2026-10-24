export default function OurStorySection() {
  return (
    <section className="about-panel about-story">
      <div className="about-story-layout">
        <div>
          <h2>Our Story</h2>
          <div className="about-divider" />
          <p>
            Horigine started because our founders — one a recruiter, one an
            engineer — kept hitting the same wall from opposite sides. One was
            tired of sending resumes that got rejected for reasons that had
            nothing to do with skill. The other was tired of being handed a
            project scope by a vendor who clearly didn't understand the
            technology involved. So we built both halves of the business the way
            we wished they worked: staffing with real technical screening before
            a candidate ever reaches you, and delivery work handled by people
            who've actually built the kind of systems they're being hired to
            build.
          </p>
        </div>
        <img
          src="/images/about-our-story.png"
          alt="Horigine team discussing technology and staffing in their office"
          loading="lazy"
        />
      </div>
    </section>
  );
}
