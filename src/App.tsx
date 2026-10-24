import { useLayoutEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Home from "./screens/home/Home";
import AboutUs from "./screens/about-us/AboutUs";
import Services from "./screens/services/Services";
import Careers from "./screens/careers/Careers";
import ContactUs from "./screens/contact-us/ContactUs";
import ProjectDetail from "./screens/services/project-detail/ProjectDetail";

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useLayoutEffect(() => {
    if (hash) {
      document
        .getElementById(decodeURIComponent(hash.slice(1)))
        ?.scrollIntoView();
      return;
    }

    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/services" element={<Services />} />
        <Route
          path="/services/projects/:projectId"
          element={<ProjectDetail />}
        />
        <Route path="/careers" element={<Careers />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}
