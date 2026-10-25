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
  responsibilities: string[];
  requirements: string[];
  badge?: "HOT" | "NEW";
};

export const roles: CareerRole[] = [
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
    responsibilities: [
      "Design and deliver scalable Salesforce features using Apex and Lightning Web Components.",
      "Integrate Salesforce with enterprise platforms through secure APIs.",
      "Review code, troubleshoot production issues, and support reliable releases.",
    ],
    requirements: [
      "5+ years of Salesforce development experience.",
      "Strong Apex, Lightning Web Components, SOQL, and REST API skills.",
      "Experience with Salesforce architecture, testing, and deployment practices.",
    ],
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
    responsibilities: [
      "Design secure, highly available AWS infrastructure for business workloads.",
      "Build infrastructure-as-code modules and automated deployment pipelines.",
      "Partner with engineering teams on cloud reliability, cost, and observability.",
    ],
    requirements: [
      "Strong hands-on AWS architecture and cloud networking experience.",
      "Production experience with Terraform and infrastructure automation.",
      "Knowledge of cloud security, monitoring, and high-availability patterns.",
    ],
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
    responsibilities: [
      "Build and maintain responsive user experiences with React and TypeScript.",
      "Develop backend services and integrations using Node.js.",
      "Collaborate across product, design, and engineering to ship tested features.",
    ],
    requirements: [
      "Professional experience with React and modern JavaScript or TypeScript.",
      "Experience building REST APIs and backend services with Node.js.",
      "Familiarity with automated testing, Git, and collaborative delivery.",
    ],
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
