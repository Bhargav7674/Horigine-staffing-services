import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import Navbar from "../../../shared/Navbar";
import Footer from "../../../shared/Footer";
import { clientProjects } from "../../../data/clientProjects";
import "../../../shared/shared.css";
import "./project-detail.css";

export default function ProjectDetail() {
  const { projectId } = useParams();
  const project = clientProjects.find((item) => item.id === projectId);

  if (!project) return <Navigate to="/services" replace />;

  const Icon = project.icon;
  const nextProject =
    clientProjects[
      (clientProjects.findIndex((item) => item.id === project.id) + 1) %
        clientProjects.length
    ];

  return (
    <div className="app-shell project-detail-page">
      <Navbar />
      <main>
        <div className="container project-detail-container">
          <Link to="/services#client-projects" className="project-back-link">
            <ArrowLeft size={16} /> Back to Services &amp; Projects
          </Link>

          <section className="project-detail-hero">
            <div className="project-detail-hero-copy">
              <p className="project-eyebrow">
                CLIENT IMPLEMENTATION · PROJECT {project.number}
              </p>
              <h1>{project.title}</h1>
              <p className="project-detail-category">{project.category}</p>
              <p className="project-detail-summary">{project.summary}</p>
              <Link className="project-detail-cta" to="/contact-us">
                Discuss a similar project <ArrowRight size={16} />
              </Link>
            </div>
            <div className="project-detail-visual" aria-hidden="true">
              <div className="project-visual-orbit orbit-one" />
              <div className="project-visual-orbit orbit-two" />
              <div className="project-visual-icon">
                <Icon size={56} strokeWidth={1.35} />
              </div>
              <span className="project-visual-number">{project.number}</span>
            </div>
          </section>

          <section className="project-detail-overview detail-panel">
            <p className="project-eyebrow">OVERVIEW</p>
            <h2>Project brief</h2>
            <p>{project.overview}</p>
            <div className="project-detail-tags">
              {project.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </section>

          {project.sections.map((section) => (
            <section
              className="project-detail-work detail-panel"
              key={section.heading}
            >
              <p className="project-eyebrow">SCOPE &amp; DELIVERY</p>
              <h2>{section.heading}</h2>
              <ul className="project-detail-list">
                {section.points.map((point) => (
                  <li key={point}>
                    <CheckCircle2 size={18} />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </section>
          ))}

          <section className="project-detail-outcomes detail-panel">
            <p className="project-eyebrow">RESULTS</p>
            <h2>Project outcomes</h2>
            <div className="project-outcome-grid">
              {project.outcomes.map((outcome) => (
                <div className="project-outcome" key={outcome}>
                  <CheckCircle2 size={18} />
                  <span>{outcome}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="project-next-card">
            <div>
              <p className="project-eyebrow">EXPLORE ANOTHER PROJECT</p>
              <h2>{nextProject.title}</h2>
              <p>{nextProject.summary}</p>
            </div>
            <Link
              to={`/services/projects/${nextProject.id}`}
              aria-label={`View ${nextProject.title}`}
            >
              <ArrowRight size={20} />
            </Link>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
