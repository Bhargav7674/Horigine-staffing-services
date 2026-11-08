import {
  BriefcaseBusiness,
  Handshake,
  Layers3,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";

type FeatureItem = {
  title: string;
  description: string;
  accent: "teal" | "gold";
  icon: LucideIcon;
};

const items: FeatureItem[] = [
  {
    title: "Industry Expertise",
    description:
      "Our deep knowledge of modern IT landscapes ensures we deliver talent and solutions that align with your technical and business needs.",
    accent: "teal",
    icon: Layers3,
  },
  {
    title: "Personalized Approach",
    description:
      "We dive deep into your company’s goals and culture to ensure every candidate or solution is a perfect fit—both technically and culturally.",
    accent: "gold",
    icon: Handshake,
  },
  {
    title: "Quality-Driven Vetting",
    description:
      "Through rigorous screening and technical assessments, we present only highly qualified professionals who can contribute from day one.",
     accent: "gold",
    icon: ShieldCheck,
  },
  {
    title: "Long-Term Partnership",
    description:
      "We go beyond filling gaps. You gain a service provider who helps you build a better partner focused on long-term success.",
    accent: "teal",
    icon: BriefcaseBusiness,
  },
];

export default function WhyChooseUsSection() {
  return (
    <section className="why-choose-section">
      <div className="why-choose-copy">
        <span className="why-eyebrow">
  <i aria-hidden="true" />
  Why Choose Us
</span>
        <h2>
  Your Trusted Partner in
  <br />
  Managed IT <span className="gradient-text">Solutions</span>
  <br />
  and <span className="gradient-text">Precision Hiring.</span>
</h2>
      </div>

      <div className="why-choose-grid">
        {items.map(({ title, description, accent, icon: Icon }) => (
          <article className={`why-choose-card accent-${accent}`} key={title}>
            <div className="why-choose-icon">
              <Icon size={28} strokeWidth={2.2} />
            </div>
            <h3>{title}</h3>
            <p>{description}</p>
            <span className="why-choose-divider" aria-hidden="true" />
          </article>
        ))}
      </div>
    </section>
  );
}
