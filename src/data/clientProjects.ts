import { Cloud, Database, ShoppingCart, type LucideIcon } from "lucide-react";

type ProjectSection = {
  heading: string;
  points: string[];
};

type ClientProject = {
  id: string;
  number: string;
  category: string;
  title: string;
  summary: string;
  overview: string;
  icon: LucideIcon;
  tags: string[];
  sections: ProjectSection[];
  outcomes: string[];
};

export const clientProjects: ClientProject[] = [
  {
    id: "cloud-platform-modernization",
    number: "01",
    category: "Cloud infrastructure",
    title: "Cloud Platform Modernization",
    summary:
      "A representative cloud modernization project covering infrastructure migration, deployment automation, and operational visibility.",
    overview:
      "This illustrative implementation brings application workloads and supporting infrastructure into a maintainable cloud environment. The work focuses on a clear migration plan, repeatable deployment practices, and operational readiness.",
    icon: Cloud,
    tags: ["Cloud", "AWS", "Azure", "DevOps"],
    sections: [
      {
        heading: "Cloud architecture and migration",
        points: [
          "Review application dependencies and define a phased migration approach.",
          "Design cloud environments around security, availability, and operational needs.",
          "Coordinate workload migration and validate services after each transition.",
        ],
      },
      {
        heading: "Deployment and operations",
        points: [
          "Automate build and deployment steps for more repeatable releases.",
          "Add monitoring and logging practices to improve service visibility.",
          "Document operational handover and ongoing maintenance procedures.",
        ],
      },
    ],
    outcomes: [
      "A documented cloud architecture and migration plan.",
      "Repeatable deployment workflows for application releases.",
      "Improved visibility into application and infrastructure health.",
      "Operational guidance for ongoing support and maintenance.",
    ],
  },
  {
    id: "healthcare-data-integration",
    number: "02",
    category: "Healthcare technology",
    title: "Healthcare Data Integration",
    summary:
      "A representative data integration project connecting healthcare systems through reliable, secure information workflows.",
    overview:
      "This illustrative project focuses on connecting separate healthcare applications and organizing the movement of operational data. Integration requirements, access controls, and validation are addressed throughout delivery.",
    icon: Database,
    tags: ["Data integration", "APIs", "Healthcare", "Security"],
    sections: [
      {
        heading: "Integration planning",
        points: [
          "Map source systems, data ownership, and integration requirements.",
          "Define consistent interfaces and validation rules for exchanged information.",
          "Plan access controls and error handling for connected services.",
        ],
      },
      {
        heading: "Implementation and validation",
        points: [
          "Build and configure service integrations between selected applications.",
          "Validate data flows with representative scenarios and exception cases.",
          "Provide documentation for support, monitoring, and future changes.",
        ],
      },
    ],
    outcomes: [
      "A documented view of system integration requirements.",
      "Connected application workflows with defined validation.",
      "Clearer handling of integration errors and exceptions.",
      "Support documentation for continued operation.",
    ],
  },
  {
    id: "digital-commerce-platform",
    number: "03",
    category: "Digital commerce",
    title: "Digital Commerce Platform",
    summary:
      "A representative commerce implementation coordinating storefront experiences, product data, and supporting services.",
    overview:
      "This illustrative commerce project brings core digital sales workflows together, with attention to maintainable integrations and a consistent customer experience across platform services.",
    icon: ShoppingCart,
    tags: ["E-commerce", "Integration", "APIs", "Product engineering"],
    sections: [
      {
        heading: "Commerce workflow engineering",
        points: [
          "Review customer, catalog, and order workflows across connected systems.",
          "Implement service integrations for product and transaction information.",
          "Structure platform components to support maintainable future updates.",
        ],
      },
      {
        heading: "Testing and delivery",
        points: [
          "Validate key storefront and order scenarios across integrations.",
          "Address error states and service handoffs in the commerce workflow.",
          "Prepare release and operational documentation for the platform.",
        ],
      },
    ],
    outcomes: [
      "Connected commerce workflows across supporting services.",
      "Consistent handling of product and order information.",
      "Validated customer and transaction scenarios.",
      "A maintainable foundation for ongoing platform development.",
    ],
  },
];
