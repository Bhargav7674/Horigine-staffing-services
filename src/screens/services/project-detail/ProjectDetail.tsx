import { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Download,
  ExternalLink,
  Eye,
  FileText,
  X,
} from "lucide-react";
import Navbar from "../../../shared/Navbar";
import Footer from "../../../shared/Footer";
import { clientProjects } from "../../../data/clientProjects";
import "../../../shared/shared.css";
import "./project-detail.css";

export default function ProjectDetail() {
  const { projectId } = useParams();
  const project = clientProjects.find((item) => item.id === projectId);
  const [previewOpen, setPreviewOpen] = useState(false);
  const SECTION_LABELS = ["SOLUTION SCOPE", "KEY DELIVERABLES", "TECHNICAL DETAILS"];

  /* close the viewer when the project changes */
  useEffect(() => {
    setPreviewOpen(false);
  }, [projectId]);

  /* Esc closes the viewer, and the page behind it does not scroll */
  useEffect(() => {
    if (!previewOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setPreviewOpen(false);
    };
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [previewOpen]);

  if (!project) return <Navigate to="/services" replace />;

  const nextProject =
    clientProjects[
      (clientProjects.findIndex((item) => item.id === project.id) + 1) %
        clientProjects.length
    ];

  const { file, fileName } = project.caseStudy;

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

              <div className="project-detail-actions">
                <Link className="project-detail-cta" to="/contact-us">
                  Discuss a similar project <ArrowRight size={16} />
                </Link>
                <button
                  type="button"
                  className="project-detail-ghost"
                  onClick={() => setPreviewOpen(true)}
                >
                  <Eye size={16} /> Preview case study
                </button>
              </div>
            </div>
            <div className="project-detail-visual" aria-hidden="true">
              <img
                src={project.image}
                alt={project.title}
                className="project-detail-image"
              />
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

          {/* ---------- CASE STUDY (preview + download) ----------
          <section className="cs-doc detail-panel" id="case-study">
            <div className="cs-doc-icon">
              <FileText size={34} strokeWidth={1.7} />
            </div>
            <div className="cs-doc-text">
              <p className="project-eyebrow">CASE STUDY</p>
              <h2>Read the full case study</h2>
              <p>
                A detailed write-up of the challenge, our solution scope, the
                technology stack and the business impact for this project.
              </p>
              <span className="cs-doc-meta">PDF document</span>
            </div>
            <div className="cs-doc-actions">
              <button
                type="button"
                className="cs-btn cs-btn-primary"
                onClick={() => setPreviewOpen(true)}
              >
                <Eye size={18} /> Preview
              </button>
              <a className="cs-btn cs-btn-ghost" href={file} download={fileName}>
                <Download size={18} /> Download PDF
              </a>
            </div>
          </section> */}

         {project.sections.map((section, index) => (
  <section
    className="project-detail-work detail-panel"
    key={section.heading}
  >
    <p className="project-eyebrow">
      {SECTION_LABELS[index] ?? "SCOPE & DELIVERY"}
    </p>
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

      {/* ---------- PDF VIEWER (popup, stays on your site) ---------- */}
      {previewOpen && (
        <div
          className="pdf-overlay"
          role="presentation"
          onClick={() => setPreviewOpen(false)}
        >
          <div
            className="pdf-modal"
            role="dialog"
            aria-modal="true"
            aria-label={`${project.title} case study`}
            onClick={(e) => e.stopPropagation()}
          >
            <header className="pdf-modal-head">
              <div className="pdf-modal-title">
                <FileText size={20} />
                <span>{project.title} — Case Study</span>
              </div>
              <div className="pdf-modal-tools">
                <a className="cs-btn cs-btn-primary cs-btn-sm" href={file} download={fileName}>
                  <Download size={16} /> Download
                </a>
                <a
                  className="cs-btn cs-btn-ghost cs-btn-sm cs-hide-sm"
                  href={file}
                  target="_blank"
                  rel="noreferrer"
                >
                  <ExternalLink size={16} /> New tab
                </a>
                <button
                  type="button"
                  className="pdf-close"
                  aria-label="Close preview"
                  onClick={() => setPreviewOpen(false)}
                >
                  <X size={20} />
                </button>
              </div>
            </header>

            <div className="pdf-modal-body">
              <iframe
                className="pdf-frame"
                title={`${project.title} case study`}
                src={`${file}#toolbar=0&navpanes=0&view=FitH`}
              />

              {/* phones and tablets often cannot render a PDF inside a page */}
              <div className="pdf-fallback">
                <FileText size={44} strokeWidth={1.5} />
                <p>Your device may not show PDFs inside the page.</p>
                <a className="cs-btn cs-btn-primary" href={file} target="_blank" rel="noreferrer">
                  <ExternalLink size={18} /> Open case study
                </a>
                <a className="cs-btn cs-btn-ghost" href={file} download={fileName}>
                  <Download size={18} /> Download PDF
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}