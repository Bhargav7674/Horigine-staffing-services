import Navbar from "../../shared/Navbar";
import Footer from "../../shared/Footer";
import ServicesHeroSection from "./components/ServicesHeroSection";
import ProductServicesSection from "./components/ProductServicesSection";
import StaffingSection from "./components/StaffingSection";
import WorkProcessSection from "./components/WorkProcessSection";
import ClientProjectsSection from "./components/ClientProjectsSection";
import ServicesCTASection from "./components/ServicesCTASection";
import ScrollReveal from "../../shared/ScrollReveal";
import "../../shared/shared.css";
import "./services.css";

export default function Services() {
  return (
    <div className="app-shell services-page">
      <Navbar />
      <main>
        <ScrollReveal>
          <ServicesHeroSection />
        </ScrollReveal>
        <ScrollReveal>
          <ProductServicesSection />
        </ScrollReveal>
        <ScrollReveal>
          <StaffingSection />
        </ScrollReveal>
        <ScrollReveal>
          <WorkProcessSection />
        </ScrollReveal>
        <ScrollReveal>
          <ClientProjectsSection />
        </ScrollReveal>
        <ScrollReveal>
          <ServicesCTASection />
        </ScrollReveal>
      </main>
      <Footer />
    </div>
  );
}
