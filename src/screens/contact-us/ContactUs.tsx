import { useState } from "react";
import type { FormEvent } from "react";
import Navbar from "../../shared/Navbar";
import Footer from "../../shared/Footer";
import ContactDetailsSection from "./components/ContactDetailsSection";
import InquiryFormSection from "./components/InquiryFormSection";
import OfficeMapSection from "./components/OfficeMapSection";
import { submitInquiry, InquiryApiError } from "../../services/inquiryService";
import "./contact-us.css";

export type InquiryFormValues = {
  fullName: string;
  workEmail: string;
  serviceInterest: string;
  message: string;
};

export default function ContactUs() {
  const [form, setForm] = useState<InquiryFormValues>({
    fullName: "",
    workEmail: "",
    serviceInterest: "",
    message: "",
  });
  const [notice, setNotice] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isError, setIsError] = useState(false);

  const updateField = (field: keyof InquiryFormValues, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
    setNotice("");
    setIsError(false);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const payload = {
      full_name: form.fullName.trim(),
      work_email: form.workEmail.trim(),
      service_interest: form.serviceInterest.trim(),
      message: form.message.trim(),
      website: "",
    };

    if (
      !payload.full_name ||
      !payload.work_email ||
      !payload.service_interest ||
      !payload.message
    ) {
      setIsError(true);
      setNotice("Please complete all required fields before submitting.");
      return;
    }

    setIsSubmitting(true);
    setNotice("");
    setIsError(false);

    try {
      const response = await submitInquiry(payload);

      setNotice(response.message || "Your inquiry has been sent successfully.");
      setForm({
        fullName: "",
        workEmail: "",
        serviceInterest: "",
        message: "",
      });
    } catch (error) {
      const message =
        error instanceof InquiryApiError
          ? error.message
          : "Unable to submit your inquiry right now. Please try again later.";

      setIsError(true);
      setNotice(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-page">
      <Navbar />
      <main className="contact-main">
        <section className="contact-intro" aria-labelledby="contact-title">
          <span className="contact-eyebrow">LET'S CONNECT</span>
          <h1 id="contact-title">Get in Touch</h1>
          <p>
            Ready to transform your tech teams or take the next step in your
            career? Our team in Vijayawada is here to provide exceptional
            staffing solutions tailored to your unique needs.
          </p>
        </section>

        <section
          className="contact-content contact-container"
          aria-label="Contact information and inquiry form"
        >
          <ContactDetailsSection />
          <InquiryFormSection
            form={form}
            updateField={updateField}
            onSubmit={handleSubmit}
            notice={notice}
            isSubmitting={isSubmitting}
            isError={isError}
          />
        </section>

        <OfficeMapSection />
      </main>
      <Footer />
    </div>
  );
}
