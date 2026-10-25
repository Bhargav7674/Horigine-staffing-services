import { useRef, useState, type FormEvent } from "react";
import { ArrowLeft, ArrowRight, CheckCircle2, Upload } from "lucide-react";
import { Link, Navigate, useParams } from "react-router-dom";
import Navbar from "../../shared/Navbar";
import Footer from "../../shared/Footer";
import { roles } from "./Careers";

type CandidateDetails = {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  message: string;
};

const emptyCandidate: CandidateDetails = {
  fullName: "",
  email: "",
  phone: "",
  location: "",
  linkedin: "",
  message: "",
};

export default function CareerDetail() {
  const { roleId } = useParams();
  const role = roles.find((item) => item.id === Number(roleId));
  const applicationRef = useRef<HTMLElement>(null);
  const [isApplicationOpen, setIsApplicationOpen] = useState(false);
  const [candidate, setCandidate] = useState(emptyCandidate);
  const [resume, setResume] = useState<File | null>(null);
  const [resumeError, setResumeError] = useState("");
  const [applicationLink, setApplicationLink] = useState("");

  if (!role) return <Navigate to="/careers" replace />;

  const updateCandidate = (field: keyof CandidateDetails, value: string) => {
    setCandidate((current) => ({ ...current, [field]: value }));
    setApplicationLink("");
  };

  const handleResumeChange = (file: File | undefined) => {
    setApplicationLink("");
    setResumeError("");
    if (!file) {
      setResume(null);
      return;
    }

    if (!/\.(pdf|doc|docx)$/i.test(file.name)) {
      setResume(null);
      setResumeError("Choose a PDF, DOC, or DOCX file.");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setResume(null);
      setResumeError("Your resume must be 10 MB or smaller.");
      return;
    }

    setResume(file);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!resume) {
      setResumeError("Please select your resume to continue.");
      return;
    }

    const subject = `Application: ${role.title}`;
    const body = [
      `Position: ${role.title}`,
      `Name: ${candidate.fullName}`,
      `Email: ${candidate.email}`,
      `Phone: ${candidate.phone}`,
      `Location: ${candidate.location}`,
      `LinkedIn or portfolio: ${candidate.linkedin || "Not provided"}`,
      `Resume file: ${resume.name}`,
      "",
      "Additional information:",
      candidate.message || "Not provided",
      "",
      "I will attach my resume before sending this application.",
    ].join("\n");

    setApplicationLink(
      `mailto:careers@horiginestaffing.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`,
    );
  };

  const openApplication = () => {
    setIsApplicationOpen(true);
    window.setTimeout(
      () => applicationRef.current?.scrollIntoView({ behavior: "smooth" }),
      0,
    );
  };

  return (
    <div className="careers-page">
      <Navbar />
      <main className="careers-main career-detail-main">
        <div className="section-container career-detail-container">
          <Link to="/careers#open-roles" className="career-back-link">
            <ArrowLeft size={16} /> All open roles
          </Link>

          <section className="career-detail-hero">
            <div className="role-card-topline">
              <span className="role-department">{role.department}</span>
              {role.badge && (
                <span className={`role-badge ${role.badge.toLowerCase()}`}>
                  {role.badge}
                </span>
              )}
            </div>
            <h1>{role.title}</h1>
            <p>{role.description}</p>
            <div className="role-meta career-detail-meta">
              <span>{role.location}</span>
              <span>{role.type}</span>
              <span>{role.salary}</span>
              <span>{role.level}</span>
            </div>
            <button
              className="careers-button careers-button-primary"
              type="button"
              onClick={openApplication}
            >
              Apply Now <ArrowRight size={16} />
            </button>
          </section>

          <div className="career-detail-grid">
            <section className="career-detail-panel">
              <h2>What you&apos;ll do</h2>
              <ul>
                {role.responsibilities.map((item) => (
                  <li key={item}>
                    <CheckCircle2 size={17} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>
            <section className="career-detail-panel">
              <h2>What you&apos;ll bring</h2>
              <ul>
                {role.requirements.map((item) => (
                  <li key={item}>
                    <CheckCircle2 size={17} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {isApplicationOpen && (
            <section
              className="career-application-panel"
              id="application-form"
              ref={applicationRef}
              aria-labelledby="application-title"
            >
              <div className="application-heading">
                <div>
                  <span className="eyebrow">Application</span>
                  <h2 id="application-title">Apply for {role.title}</h2>
                </div>
                <p>Fields marked * are required.</p>
              </div>
              <form className="career-application-form" onSubmit={handleSubmit}>
                <label>
                  <span>Full name *</span>
                  <input
                    autoComplete="name"
                    name="fullName"
                    value={candidate.fullName}
                    onChange={(event) =>
                      updateCandidate("fullName", event.target.value)
                    }
                    required
                  />
                </label>
                <label>
                  <span>Email address *</span>
                  <input
                    autoComplete="email"
                    name="email"
                    type="email"
                    value={candidate.email}
                    onChange={(event) =>
                      updateCandidate("email", event.target.value)
                    }
                    required
                  />
                </label>
                <label>
                  <span>Phone number *</span>
                  <input
                    autoComplete="tel"
                    name="phone"
                    type="tel"
                    value={candidate.phone}
                    onChange={(event) =>
                      updateCandidate("phone", event.target.value)
                    }
                    required
                  />
                </label>
                <label>
                  <span>Location *</span>
                  <input
                    autoComplete="address-level2"
                    name="location"
                    value={candidate.location}
                    onChange={(event) =>
                      updateCandidate("location", event.target.value)
                    }
                    required
                  />
                </label>
                <label className="application-field-wide">
                  <span>LinkedIn or portfolio</span>
                  <input
                    autoComplete="url"
                    name="linkedin"
                    type="url"
                    value={candidate.linkedin}
                    onChange={(event) =>
                      updateCandidate("linkedin", event.target.value)
                    }
                    placeholder="https://"
                  />
                </label>
                <label className="application-field-wide resume-field">
                  <span>Resume * (PDF, DOC, or DOCX, max 10 MB)</span>
                  <span className="resume-picker">
                    <Upload size={17} />
                    <span>{resume?.name ?? "Choose a resume file"}</span>
                    <input
                      name="resume"
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={(event) =>
                        handleResumeChange(event.target.files?.[0])
                      }
                    />
                  </span>
                  {resumeError && (
                    <span className="resume-error" role="alert">
                      {resumeError}
                    </span>
                  )}
                </label>
                <label className="application-field-wide">
                  <span>Note to the hiring team</span>
                  <textarea
                    name="message"
                    rows={4}
                    value={candidate.message}
                    onChange={(event) =>
                      updateCandidate("message", event.target.value)
                    }
                  />
                </label>
                <div className="application-submit-row application-field-wide">
                  <button
                    className="careers-button careers-button-primary"
                    type="submit"
                  >
                    Prepare Application <ArrowRight size={16} />
                  </button>
                  {applicationLink && (
                    <a
                      className="careers-button careers-button-secondary"
                      href={applicationLink}
                    >
                      Open Email Draft
                    </a>
                  )}
                </div>
                {applicationLink && (
                  <p
                    className="application-note application-field-wide"
                    role="status"
                  >
                    Your application details are ready in an email draft. Attach
                    the selected resume file before sending; this site does not
                    upload files to a server.
                  </p>
                )}
              </form>
            </section>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}