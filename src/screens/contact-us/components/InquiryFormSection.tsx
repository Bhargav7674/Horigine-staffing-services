import type { FormEvent } from "react";
import { ArrowRight } from "lucide-react";
import type { InquiryFormValues } from "../ContactUs";

type Props = {
  form: InquiryFormValues;
  updateField: (field: keyof InquiryFormValues, value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  notice: string;
};

export default function InquiryFormSection({
  form,
  updateField,
  onSubmit,
  notice,
}: Props) {
  return (
    <section className="inquiry-card" aria-labelledby="inquiry-title">
      <h2 id="inquiry-title">Send an Inquiry</h2>
      <form className="inquiry-form" onSubmit={onSubmit}>
        <div className="inquiry-field-grid">
          <label className="inquiry-field">
            <span>Full Name</span>
            <input
              autoComplete="name"
              name="fullName"
              value={form.fullName}
              onChange={(event) => updateField("fullName", event.target.value)}
              placeholder="John Doe"
              required
            />
          </label>
          <label className="inquiry-field">
            <span>Work Email</span>
            <input
              autoComplete="email"
              name="workEmail"
              type="email"
              value={form.workEmail}
              onChange={(event) => updateField("workEmail", event.target.value)}
              placeholder="john@company.com"
              required
            />
          </label>
        </div>
        <label className="inquiry-field">
          <span>Service Interest</span>
          <select
            name="serviceInterest"
            value={form.serviceInterest}
            onChange={(event) =>
              updateField("serviceInterest", event.target.value)
            }
            required
          >
            <option value="" disabled>
              Select an option...
            </option>
            <option value="IT Services">IT Services</option>
            <option value="IT Staffing">IT Staffing</option>
            <option value="Contract Staffing">Contract Staffing</option>
            <option value="Full-time / Direct Hire">
              Full-time / Direct Hire
            </option>
            <option value="Managed Project Teams">Managed Project Teams</option>
            <option value="Career Opportunities">Career Opportunities</option>
            <option value="Other">Other</option>
          </select>
        </label>
        <label className="inquiry-field">
          <span>Message</span>
          <textarea
            name="message"
            value={form.message}
            onChange={(event) => updateField("message", event.target.value)}
            placeholder="How can we help you?"
            rows={5}
            required
          />
        </label>
        <button className="inquiry-submit" type="submit">
          Send Message <ArrowRight size={17} />
        </button>
        {notice && (
          <p className="inquiry-notice" role="status">
            {notice}
          </p>
        )}
      </form>
    </section>
  );
}
