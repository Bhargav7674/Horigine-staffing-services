import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { clientProjects } from "../../../data/clientProjects";

export default function ClientProjectsSection() {
  return (
    <section
      className="container services-section client-projects-section"
      id="client-projects"
    >
      <div className="section-heading">
        <p className="project-eyebrow">Selected Implementations</p>
        <h2>Client Projects</h2>
        <p>
          Explore representative implementations and technical work across cloud
          infrastructure, healthcare technology, and digital commerce.
        </p>
      </div>
      <div className="client-project-grid">
        {clientProjects.map((project) => {
          const Icon = project.icon;

          return (
            <Link
              className="glass-card client-project-card"
              to={`/services/projects/${project.id}`}
              key={project.id}
            >
              <div className="client-project-top">
                <span className="client-project-icon">
                  <Icon size={21} />
                </span>
                <span className="client-project-number">{project.number}</span>
              </div>
              <span className="client-project-category">
                {project.category}
              </span>
              <h3>{project.title}</h3>
              <p>{project.summary}</p>
              <div className="client-project-tags">
                {project.tags.slice(0, 3).map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
              <span className="client-project-link">
                View project details <ArrowUpRight size={16} />
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
