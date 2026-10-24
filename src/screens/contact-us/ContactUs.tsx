import { useState } from "react";
import type { FormEvent } from "react";
import Navbar from "../../shared/Navbar";
import Footer from "../../shared/Footer";
import ContactDetailsSection from "./components/ContactDetailsSection";
import InquiryFormSection from "./components/InquiryFormSection";
import OfficeMapSection from "./components/OfficeMapSection";
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

  const updateField = (field: keyof InquiryFormValues, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
    setNotice("");
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const subject = encodeURIComponent(
      `Website inquiry — ${form.serviceInterest}`,
    );
    const body = encodeURIComponent(
      `Name: ${form.fullName}\nWork email: ${form.workEmail}\nService interest: ${form.serviceInterest}\n\nMessage:\n${form.message}`,
    );
    setNotice(
      "Your email app will open with the inquiry prepared. Please send the email to complete your submission.",
    );
    window.location.href = `mailto:hello@horigine.com?subject=${subject}&body=${body}`;
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
          />
        </section>

        <OfficeMapSection />
      </main>
      <Footer />
    </div>
  );
}
