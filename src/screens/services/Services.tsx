import Navbar from "../../shared/Navbar";
import Footer from "../../shared/Footer";
import ServicesHeroSection from "./components/ServicesHeroSection";
import ProductServicesSection from "./components/ProductServicesSection";
import StaffingSection from "./components/StaffingSection";
import WorkProcessSection from "./components/WorkProcessSection";
import ClientProjectsSection from "./components/ClientProjectsSection";
import ServicesCTASection from "./components/ServicesCTASection";
import "../../shared/shared.css";
import "./services.css";

export default function Services() {
  return (
    <div className="app-shell">
      <Navbar />
      <main>
        <ServicesHeroSection />
        <ProductServicesSection />
        <StaffingSection />
        <WorkProcessSection />
        <ClientProjectsSection />
        <ServicesCTASection />
      </main>
      <Footer />
    </div>
  );
}
