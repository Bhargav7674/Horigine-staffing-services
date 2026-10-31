import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchJobs, normalizeJobForCareerCard } from "../../../services/jobService";

type HomeJobCard = ReturnType<typeof normalizeJobForCareerCard>;

export default function CareersSection() {
  const [jobs, setJobs] = useState<HomeJobCard[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    const loadJobs = async () => {
      setIsLoading(true);
      setError("");

      try {
        const items = await fetchJobs({ limit: 3, skip: 0 });
        const mapped = items.map(normalizeJobForCareerCard);

        if (isMounted) {
          setJobs(mapped);
        }
      } catch (loadError) {
        if (isMounted) {
          setError(
            loadError instanceof Error
              ? loadError.message
              : "Unable to load current openings.",
          );
          setJobs([]);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadJobs();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="container section-space" id="careers">
      <div className="section-heading">
        <span className="eyebrow">Careers</span>
        <h2>Current Openings</h2>
      </div>

      {isLoading ? (
        <div className="job-grid">
          {[1, 2, 3].map((item) => (
            <article className="glass-card job-card" key={item}>
              <h3>Loading opportunity...</h3>
              <p>Fetching the latest roles from our team.</p>
            </article>
          ))}
        </div>
      ) : error ? (
        <div className="no-roles" style={{ marginBottom: 12 }}>
          <h3>We couldn&apos;t load current openings</h3>
          <p>{error}</p>
        </div>
      ) : jobs.length ? (
        <div className="job-grid">
          {jobs.map((job) => (
            <article className="glass-card job-card" key={job.id}>
              <div className="role-card-topline">
                <span className="role-department">{job.department}</span>
                {job.badge && (
                  <span className={`role-badge ${job.badge.toLowerCase()}`}>
                    {job.badge}
                  </span>
                )}
              </div>
              <h3>{job.title}</h3>
              <p>
                {job.location} / {job.type}
              </p>
              <Link className="text-link" to={`/careers/${job.id}`}>
                View Details →
              </Link>
            </article>
          ))}
        </div>
      ) : (
        <div className="no-roles">
          <h3>No open roles right now</h3>
          <p>Check back soon for new opportunities.</p>
        </div>
      )}

      <div style={{ textAlign: "center", marginTop: 24 }}>
        <Link className="outline-button compact-openings-link" to="/careers">
          See All Openings
        </Link>
      </div>
    </section>
  );
}
