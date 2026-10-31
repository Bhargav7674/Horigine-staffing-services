import { useEffect, useRef, useState, type FormEvent } from "react";
import { ArrowLeft, ArrowRight, CheckCircle2, Upload } from "lucide-react";
import { Link, Navigate, useParams } from "react-router-dom";
import Navbar from "../../shared/Navbar";
import Footer from "../../shared/Footer";
import {
  GuestApplicationApiError,
  submitGuestApplication,
} from "../../services/applicationService";
import { fetchJobs, normalizeJobForCareerCard } from "../../services/jobService";
import type { CareerRole } from "./Careers";

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
  const [roles, setRoles] = useState<CareerRole[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState("");
  const applicationRef = useRef<HTMLElement>(null);
  const [isApplicationOpen, setIsApplicationOpen] = useState(false);
  const [candidate, setCandidate] = useState(emptyCandidate);
  const [resume, setResume] = useState<File | null>(null);
  const [resumeError, setResumeError] = useState("");

  useEffect(() => {
    let isMounted = true;

    const loadRoleDetail = async () => {
      setIsLoading(true);
      setLoadError("");

      try {
        const jobs = await fetchJobs({ limit: 20, skip: 0 });
        const mapped = jobs.map(normalizeJobForCareerCard);

        if (isMounted) {
          setRoles(mapped);
        }
      } catch (error) {
        if (isMounted) {
          setRoles([]);
          setLoadError(
            error instanceof Error
              ? error.message
              : "Unable to load this role right now.",
          );
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadRoleDetail();

    return () => {
      isMounted = false;
    };
  }, []);

  const role = roles.find((item) => String(item.id) === String(roleId));

  if (isLoading) {
    return (
      <div className="careers-page">
        <Navbar />
        <main className="careers-main career-detail-main">
          <div className="section-container career-detail-container">
            <div className="no-roles">
              <CheckCircle2 size={24} />
              <h3>Loading role details...</h3>
              <p>Fetching the latest opportunity details.</p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!role || loadError) {
    return <Navigate to="/careers" replace />;
  }

  const updateCandidate = (field: keyof CandidateDetails, value: string) => {
    setCandidate((current) => ({ ...current, [field]: value }));
    setSubmitError("");
    setSubmitSuccess("");
  };

  const handleResumeChange = (file: File | undefined) => {
    setSubmitError("");
    setSubmitSuccess("");
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

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!roleId) {
      setSubmitError(
        "This job could not be identified. Please return to the careers list.",
      );
      return;
    }

    const fullName = candidate.fullName.trim();
    const workEmail = candidate.email.trim();
    const phone = candidate.phone.trim();
    const location = candidate.location.trim();
    const portfolioUrl = candidate.linkedin.trim();
    const note = candidate.message.trim();

    if (!fullName || fullName.length < 2) {
      setSubmitError("Please enter your full name.");
      return;
    }

    if (!workEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(workEmail)) {
      setSubmitError("Please enter a valid work email address.");
      return;
    }

    if (!phone || phone.length < 5) {
      setSubmitError("Please enter a valid phone number.");
      return;
    }

    if (!location || location.length < 2) {
      setSubmitError("Please enter your location.");
      return;
    }

    if (!resume) {
      setResumeError("Please select your resume to continue.");
      return;
    }

    setIsSubmitting(true);
    setSubmitError("");
    setSubmitSuccess("");

    try {
      await submitGuestApplication(roleId, {
        full_name: fullName,
        work_email: workEmail,
        phone,
        location,
        portfolio_url: portfolioUrl || undefined,
        note: note || undefined,
        resume,
      });

      setSubmitSuccess(
        "Your application was submitted successfully. Our team will review it shortly.",
      );
      setCandidate(emptyCandidate);
      setResume(null);
      setResumeError("");
    } catch (error) {
      const message =
        error instanceof GuestApplicationApiError
          ? error.message
          : "Unable to submit your application right now. Please try again.";
      setSubmitError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const openApplication = () => {
    setIsApplicationOpen(true);
    window.setTimeout(
      () => applicationRef.current?.scrollIntoView({ behavior: "smooth" }),
      0,
    );
  };

  const responsibilities = role.responsibilities ?? [];
  const requirements = role.requirements ?? [];

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
                {responsibilities.map((item) => (
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
                {requirements.map((item) => (
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
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : "Submit Application"}{" "}
                    <ArrowRight size={16} />
                  </button>
                </div>
                {submitError && (
                  <p className="application-note application-field-wide" role="alert">
                    {submitError}
                  </p>
                )}
                {submitSuccess && (
                  <p className="application-note application-field-wide" role="status">
                    {submitSuccess}
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