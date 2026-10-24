import Navbar from "../../shared/Navbar";
import Footer from "../../shared/Footer";
import HeroSection from "./components/HeroSection";
import StatsSection from "./components/StatsSection";
import WhyChooseUsSection from "./components/WhyChooseUsSection";
import AboutSection from "./components/AboutSection";
import ITServicesSection from "./components/ITServicesSection";
import ITStaffingSection from "./components/ITStaffingSection";
import ProcessSection from "./components/ProcessSection";
import CareersSection from "./components/CareersSection";
import TestimonialsSection from "./components/TestimonialsSection";
import CallToActionSection from "./components/CallToActionSection";
import ScrollReveal from "../../shared/ScrollReveal";
import "../../shared/shared.css";
import "./home.css";

export default function Home() {
  return (
    <div className="app-shell home-page">
      <Navbar />
      <main>
        <ScrollReveal>
          <HeroSection />
        </ScrollReveal>
        <ScrollReveal>
          <StatsSection />
        </ScrollReveal>
        <ScrollReveal>
          <WhyChooseUsSection />
        </ScrollReveal>
        <ScrollReveal>
          <AboutSection />
        </ScrollReveal>
        <ScrollReveal>
          <ITServicesSection />
        </ScrollReveal>
        <ScrollReveal>
          <ITStaffingSection />
        </ScrollReveal>
        <ScrollReveal>
          <ProcessSection />
        </ScrollReveal>
        <ScrollReveal>
          <CareersSection />
        </ScrollReveal>
        <ScrollReveal>
          <TestimonialsSection />
        </ScrollReveal>
        <ScrollReveal>
          <CallToActionSection />
        </ScrollReveal>
      </main>
      <Footer />
    </div>
  );
}
