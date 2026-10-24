import Navbar from "../../shared/Navbar";
import Footer from "../../shared/Footer";
import CompanyOverviewSection from "./components/CompanyOverviewSection";
import OurStorySection from "./components/OurStorySection";
import BeliefsSection from "./components/BeliefsSection";
import CompanyStatsSection from "./components/CompanyStatsSection";
import AboutContactSection from "./components/AboutContactSection";
import ScrollReveal from "../../shared/ScrollReveal";
import "../../shared/shared.css";
import "./about-us.css";

export default function AboutUs() {
  return (
    <div className="app-shell">
      <Navbar />
      <main className="about-content">
        <ScrollReveal>
          <CompanyOverviewSection />
        </ScrollReveal>
        <ScrollReveal>
          <div className="about-dual container">
            <article className="glass-card">
              <span className="eyebrow">IT Services</span>
              <h2>We build technology directly</h2>
              <p>
                Software, cloud, and data projects delivered by people who’ve
                actually built the systems they’re hired to build.
              </p>
            </article>
            <article className="glass-card">
              <span className="eyebrow orange">IT Staffing</span>
              <h2>We staff technical teams</h2>
              <p>
                Contract, full-time, and managed-team placements, screened
                technically before a candidate ever reaches your inbox.
              </p>
            </article>
          </div>
        </ScrollReveal>
        <ScrollReveal>
          <OurStorySection />
        </ScrollReveal>
        <ScrollReveal>
          <BeliefsSection />
        </ScrollReveal>
        <ScrollReveal>
          <CompanyStatsSection />
        </ScrollReveal>
        <ScrollReveal>
          <AboutContactSection />
        </ScrollReveal>
      </main>
      <Footer />
    </div>
  );
}
