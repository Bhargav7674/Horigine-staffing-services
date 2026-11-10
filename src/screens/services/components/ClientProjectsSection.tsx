import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { clientProjects } from "../../../data/clientProjects";

export default function ClientProjectsSection() {
  return (
    <section
      className="container services-section client-projects-section"
      id="client-projects"
    >
      <div className="cp-heading">
        <span className="cp-eyebrow">
          <i aria-hidden="true" />
          Selected Implementations
        </span>
        <h2>
          Client <span className="cp-gradient">Projects</span>
        </h2>
        <p>
          Explore representative implementations and technical work across cloud
          infrastructure, healthcare technology, and digital commerce.
        </p>
      </div>

      <div className="cp-grid">
        {clientProjects.map((project, i) => (
          <Link
            className={`cp-card ${i % 2 === 0 ? "cp-teal" : "cp-gold"}`}
            to={`/services/projects/${project.id}`}
            key={project.id}
          >
            <div className="cp-thumb">
              <img src={project.image} alt={project.title} loading="lazy" />
            </div>

            <div className="cp-body">
              <span className="cp-category">{project.category}</span>
              <h3>{project.title}</h3>
              <p>{project.summary}</p>

              <div className="cp-tags">
                {project.tags.slice(0, 3).map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>

              <span className="cp-link">
                Know more <ArrowRight size={16} />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}