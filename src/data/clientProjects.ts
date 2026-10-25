import {
  Activity,
  Code2,
  ShoppingCart,
  type LucideIcon,
} from "lucide-react";

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
    id: "notification-opcode-development",
    number: "01",
    category: "Enterprise platform integration",
    title: "Notification & Opcode Development",
    summary:
      "Customized notification processing, opcode functionality, and REST API integrations built around specific business requirements.",
    overview:
      "Delivered a tailored platform implementation spanning PODL and Classes development, policy customization, Opcode NAP configuration, notification processing, and REST API integration. Customization and integration testing ensured each part worked together for the required business workflows.",
    icon: Code2,
    tags: ["PODL & Classes", "REST APIs", "Policy customization", "Opcode NAP"],
    sections: [
      {
        heading: "PODL, Classes, and policy customization",
        points: [
          "Develop and customize PODL and Classes to meet notification and opcode requirements.",
          "Align application policies with business-specific behavior and processing rules.",
          "Configure Opcode NAP files to support the required application workflows.",
        ],
      },
      {
        heading: "REST API integration and notification processing",
        points: [
          "Design REST APIs for system integration and reliable data communication.",
          "Implement and enhance requirement-specific notification processing and configuration.",
          "Test, troubleshoot, and validate integrated functionality against project requirements.",
        ],
      },
    ],
    outcomes: [
      "Delivered business-specific notification processing and opcode functionality.",
      "Enabled API-based communication between integrated systems.",
      "Validated customized policies, PODL, Classes, and Opcode NAP configuration.",
      "Provided an integrated solution tested against the requested requirements.",
    ],
  },
  {
    id: "healthcare-imaging-validation",
    number: "02",
    category: "Healthcare · Medical imaging · Diagnostics",
    title: "Diagnostic Management & Imaging Validation",
    summary:
      "End-to-end validation for a multi-facility diagnostic platform spanning medical devices, cloud APIs, mobile apps, and hospital systems.",
    overview:
      "An engineering and quality assurance program for an enterprise imaging and diagnostic management platform. Validation covered high-volume radiology workflows, patient-specialty tracking, multi-modality routing, and integrations across cloud services, mobile clients, desktop software, and connected clinical equipment.",
    icon: Activity,
    tags: ["Healthcare", "PACS / DICOM", "API testing", "Automation"],
    sections: [
      {
        heading: "Device, platform, and workflow validation",
        points: [
          "Validate interactions with PACS hardware, ultrasound, iris scanners, digital X-ray equipment, and connected clinical sensors.",
          "Test web, iOS, Android, tablet, Windows, and Mac experiences, including synchronization and English/Spanish localization.",
          "Verify clinical worksheets, patient-specialty mapping, billing details, procedure data, and clinical sign-off rules across EHR/HIS workflows.",
        ],
      },
      {
        heading: "Automation, data integrity, and compliance",
        points: [
          "Build automated regression coverage with Selenium, Appium, TestNG, JUnit, and Cucumber BDD; verify APIs with Postman and Rest Assured.",
          "Protect DICOM metadata and validate image rendering, storage integrity, and high-volume transfers across distributed archives.",
          "Map validation to FDA, HIPAA, and GDPR requirements; exercise access controls, safety behavior, and performance under load.",
        ],
      },
    ],
    outcomes: [
      "Validated reliable messaging and synchronization across care facilities, LIS, RIS, and PACS systems.",
      "Created a Cucumber BDD regression suite to shorten validation cycles for platform updates.",
      "Established requirement-to-test traceability in Jama Connect for audit readiness.",
      "Verified distinct permissions for diagnostic operations and medical residency training profiles.",
    ],
  },
  {
    id: "salesforce-commerce-cloud",
    number: "03",
    category: "Salesforce Commerce Cloud",
    title: "Global Commerce & Omnichannel Service",
    summary:
      "A global storefront and integration platform connecting localized commerce, enterprise systems, security, and customer service operations.",
    overview:
      "A Salesforce Commerce Cloud implementation built around a reusable global storefront architecture and market-specific experiences. The solution connected commerce with lead sources, ERPs, marketing platforms, and Service Cloud while strengthening security monitoring and service-agent context.",
    icon: ShoppingCart,
    tags: ["Commerce Cloud", "Service Cloud", "REST / GraphQL", "Shield"],
    sections: [
      {
        heading: "Global storefront and enterprise integrations",
        points: [
          "Create a reusable global storefront template to accelerate regional launches while preserving brand consistency.",
          "Configure regional currencies, tax rules, language translations, and country-specific checkout journeys.",
          "Connect lead sourcing platforms, legacy ERPs, and marketing endpoints through secure REST and GraphQL integrations.",
        ],
      },
      {
        heading: "Security and omnichannel service",
        points: [
          "Configure Salesforce Shield encryption, event monitoring, and field audit trails, and monitor security posture across environments.",
          "Use Data Cloud insights to monitor platform performance and customer journeys.",
          "Route high-value service requests to specialist agents and provide a unified view of customer and order history.",
        ],
      },
    ],
    outcomes: [
      "Established a repeatable storefront foundation for regional expansion.",
      "Enabled localized shopping and checkout experiences across markets.",
      "Improved visibility into security posture, platform activity, and customer journeys.",
      "Equipped service teams with context for faster, more informed customer support.",
    ],
  },
];
