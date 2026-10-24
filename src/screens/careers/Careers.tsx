import { useMemo, useState } from "react";
import Navbar from "../../shared/Navbar";
import Footer from "../../shared/Footer";
import CareersHeroSection from "./components/CareersHeroSection";
import WhyWorkWithUsSection from "./components/WhyWorkWithUsSection";
import OpportunitiesSection from "./components/OpportunitiesSection";
import "./careers.css";

export type CareerRole = {
  id: number;
  department: string;
  title: string;
  location: "Remote" | "Hybrid" | "On-site";
  type: "Full-time" | "Contract";
  salary: string;
  level: string;
  description: string;
  tags: string[];
  badge?: "HOT" | "NEW";
};

const roles: CareerRole[] = [
  {
    id: 1,
    department: "Engineering",
    title: "Senior Salesforce Developer",
    location: "Remote",
    type: "Full-time",
    salary: "$140k – $180k",
    level: "Senior",
    description:
      "Lead complex Apex integrations and design scalable Salesforce architectures for enterprise teams.",
    tags: ["Apex", "LWC"],
    badge: "HOT",
  },
  {
    id: 2,
    department: "Architecture",
    title: "AWS Cloud Architect",
    location: "Hybrid",
    type: "Full-time",
    salary: "$160k – $210k",
    level: "Lead",
    description:
      "Design and implement secure, robust, highly available cloud infrastructure solutions.",
    tags: ["AWS", "Terraform"],
    badge: "NEW",
  },
  {
    id: 3,
    department: "Engineering",
    title: "Full Stack Engineer",
    location: "Remote",
    type: "Contract",
    salary: "$90 – $120/hr",
    level: "Mid-Senior",
    description:
      "Build scalable web applications using React and Node.js for high-traffic enterprise platforms.",
    tags: ["React", "Node.js"],
  },
];

export default function Careers() {
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("All Departments");
  const [location, setLocation] = useState("All Locations");

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
  }, [search, department, location]);

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
        />
      </main>
      <Footer />
    </div>
  );
}
