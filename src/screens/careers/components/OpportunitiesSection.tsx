import {
  ArrowUpRight,
  Clock3,
  MapPin,
  Search,
  TrendingUp,
  WalletCards,
} from "lucide-react";
import { Link } from "react-router-dom";
import type { CareerRole } from "../Careers";

type Props = {
  roles: CareerRole[];
  search: string;
  onSearchChange: (value: string) => void;
  department: string;
  onDepartmentChange: (value: string) => void;
  location: string;
  onLocationChange: (value: string) => void;
};

export default function OpportunitiesSection({
  roles,
  search,
  onSearchChange,
  department,
  onDepartmentChange,
  location,
  onLocationChange,
}: Props) {
  return (
    <section
      className="opportunities-section section-container"
      id="open-roles"
      aria-labelledby="opportunities-title"
    >
      <div className="opportunities-heading">
        <div>
          <h2 id="opportunities-title">Featured Opportunities</h2>
          <p>Discover roles where your expertise can shine.</p>
        </div>
        <a
          href="mailto:careers@horiginestaffing.com?subject=Career%20opportunities"
          className="view-all-link"
        >
          View All <span aria-hidden="true">→</span>
        </a>
      </div>

      <div className="career-filters">
        <label className="career-search">
          <Search size={17} aria-hidden="true" />
          <span className="visually-hidden">
            Search roles, skills, or location
          </span>
          <input
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search roles, skills, or location..."
          />
        </label>
        <label className="visually-hidden" htmlFor="department-filter">
          Filter by department
        </label>
        <select
          id="department-filter"
          value={department}
          onChange={(event) => onDepartmentChange(event.target.value)}
        >
          <option>All Departments</option>
          <option>Engineering</option>
          <option>Architecture</option>
        </select>
        <label className="visually-hidden" htmlFor="location-filter">
          Filter by location
        </label>
        <select
          id="location-filter"
          value={location}
          onChange={(event) => onLocationChange(event.target.value)}
        >
          <option>All Locations</option>
          <option>Remote</option>
          <option>Hybrid</option>
          <option>On-site</option>
        </select>
      </div>

      {roles.length ? (
        <div className="role-grid">
          {roles.map((role) => (
            <Link
              className="role-card"
              key={role.id}
              to={`/careers/${role.id}`}
              aria-label={`View ${role.title} job details`}
            >
              <div className="role-card-topline">
                <span
                  className={`role-department ${role.department === "Architecture" ? "orange-text" : ""}`}
                >
                  {role.department}
                </span>
                {role.badge && (
                  <span className={`role-badge ${role.badge.toLowerCase()}`}>
                    {role.badge}
                  </span>
                )}
              </div>
              <h3>{role.title}</h3>
              <div className="role-meta">
                <span>
                  <MapPin size={13} />
                  {role.location}
                </span>
                <span>
                  <Clock3 size={13} />
                  {role.type}
                </span>
                <span>
                  <WalletCards size={13} />
                  {role.salary}
                </span>
                <span>
                  <TrendingUp size={13} />
                  {role.level}
                </span>
              </div>
              <p className="role-description">{role.description}</p>
              <div className="role-tags">
                {role.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
              <span className="apply-button">
                View Job Details <ArrowUpRight size={14} />
              </span>
            </Link>
          ))}
        </div>
      ) : (
        <div className="no-roles">
          <Search size={24} />
          <h3>No matching roles found</h3>
          <p>
            Try a different keyword or reset the department and location
            filters.
          </p>
          <button
            type="button"
            onClick={() => {
              onSearchChange("");
              onDepartmentChange("All Departments");
              onLocationChange("All Locations");
            }}
          >
            Clear filters
          </button>
        </div>
      )}
      <p className="careers-note">
        Don&apos;t see the right fit?{" "}
        <a href="mailto:careers@horiginestaffing.com">Send us your resume</a>{" "}
        and we&apos;ll keep you in mind for future opportunities.
      </p>
    </section>
  );
}
