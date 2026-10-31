import { useEffect, useMemo, useState } from "react";
import Navbar from "../../shared/Navbar";
import Footer from "../../shared/Footer";
import CareersHeroSection from "./components/CareersHeroSection";
import WhyWorkWithUsSection from "./components/WhyWorkWithUsSection";
import OpportunitiesSection from "./components/OpportunitiesSection";
import { fetchJobs, normalizeJobForCareerCard } from "../../services/jobService";
import "./careers.css";

export type CareerRole = {
  id: number | string;
  department: string;
  title: string;
  location: string;
  type: string;
  salary: string;
  level: string;
  description: string;
  tags: string[];
  responsibilities: string[];
  requirements: string[];
  badge?: "HOT" | "NEW";
};

export default function Careers() {
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("All Departments");
  const [location, setLocation] = useState("All Locations");
  const [roles, setRoles] = useState<CareerRole[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    const loadRoles = async () => {
      setIsLoading(true);
      setError("");

      try {
        const jobs = await fetchJobs({ limit: 20, skip: 0 });
        const mapped = jobs.map(normalizeJobForCareerCard);

        if (isMounted) {
          setRoles(mapped);
        }
      } catch (loadError) {
        if (isMounted) {
          setRoles([]);
          setError(
            loadError instanceof Error
              ? loadError.message
              : "Unable to load open roles right now.",
          );
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadRoles();
    return () => {
      isMounted = false;
    };
  }, []);

  const filteredRoles = useMemo(() => {
    const query = search.trim().toLowerCase();
    return roles.filter((role) => {
      const matchesSearch =
        !query ||
        [
          role.title,
          role.department,
          role.location,
          role.type,
          role.description,
          ...role.tags,
        ]
          .join(" ")
          .toLowerCase()
          .includes(query);
      const matchesDepartment =
        department === "All Departments" || role.department === department;
      const matchesLocation =
        location === "All Locations" || role.location === location;
      return matchesSearch && matchesDepartment && matchesLocation;
    });
  }, [search, department, location, roles]);

  return (
    <div className="careers-page">
      <Navbar />
      <main className="careers-main">
        <CareersHeroSection />
        <WhyWorkWithUsSection />
        <OpportunitiesSection
          roles={filteredRoles}
          search={search}
          onSearchChange={setSearch}
          department={department}
          onDepartmentChange={setDepartment}
          location={location}
          onLocationChange={setLocation}
          isLoading={isLoading}
          error={error}
        />
      </main>
      <Footer />
    </div>
  );
}
