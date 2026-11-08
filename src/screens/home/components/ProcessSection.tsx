import {
  BarChart3,
  ChevronsRight,
  ClipboardList,
  Handshake,
  ListChecks,
  Users,
  type LucideIcon,
} from "lucide-react";
import { Reveal, RevealLines, Stagger } from "./Reveal";

type Step = {
  title: string;
  description: string;
  accent: "teal" | "gold";
  icon: LucideIcon;
};

const steps: Step[] = [
  { title: "Brief", description: "Understand requirements.", accent: "teal", icon: ClipboardList },
  { title: "Source & Screen", description: "Identify top talent.", accent: "gold", icon: Users },
  { title: "Shortlist", description: "Present best matches.", accent: "teal", icon: ListChecks },
  { title: "Hire", description: "Seamless onboarding.", accent: "gold", icon: Handshake },
  { title: "Ongoing Support", description: "Ensure success.", accent: "teal", icon: BarChart3 },
];

export default function ProcessSection() {
  return (
    <section className="container proc-section" id="process">
      <div className="proc-heading">
        <Reveal as="span" className="proc-eyebrow">
          <i aria-hidden="true" />
          Process
        </Reveal>

        <RevealLines
          as="h2"
          lines={[
            <>
              How It <span className="proc-gradient">Works</span>
            </>,
          ]}
        />
        <Reveal className="proc-swoosh" delay={400}>
          <span />
        </Reveal>
      </div>

      <Stagger className="proc-grid">
        {steps.map(({ title, description, accent, icon: Icon }, i) => (
          <article className={`proc-card proc-${accent}`} key={title}>
            <span className="proc-badge">{String(i + 1).padStart(2, "0")}</span>
            <span className="proc-icon">
              <Icon size={54} strokeWidth={1.6} />
            </span>
            <h3>{title}</h3>
            <p>{description}</p>
            {i < steps.length - 1 && (
              <ChevronsRight className="proc-arrow" size={30} strokeWidth={2} aria-hidden="true" />
            )}
          </article>
        ))}
      </Stagger>
    </section>
  );
}