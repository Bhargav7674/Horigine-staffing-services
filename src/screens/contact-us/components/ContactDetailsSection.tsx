import { Mail, MapPin, Phone } from "lucide-react";

const contactDetails = [
  {
    label: "Call Us",
    value: "+91 800 123 4567",
    note: "Mon - Fri, 9:00 AM - 6:00 PM IST",
    href: "tel:+918001234567",
    icon: Phone,
  },
  {
    label: "Email",
    value: "hello@horigine.com",
    note: "We aim to respond within 24 hours.",
    href: "mailto:hello@horigine.com",
    icon: Mail,
  },
];

export default function ContactDetailsSection() {
  return (
    <div className="contact-details-list">
      {contactDetails.map(({ label, value, note, href, icon: Icon }) => (
        <article className="contact-detail-card" key={label}>
          <span className="contact-detail-icon">
            <Icon size={20} aria-hidden="true" />
          </span>
          <div className="contact-detail-copy">
            <p className="contact-detail-label">{label}</p>
            <a className="contact-detail-value" href={href}>
              {value}
            </a>
            <p className="contact-detail-note">{note}</p>
          </div>
        </article>
      ))}
      <article className="contact-detail-card contact-address-card">
        <span className="contact-detail-icon">
          <MapPin size={20} aria-hidden="true" />
        </span>
        <div className="contact-detail-copy">
          <p className="contact-detail-label">Headquarters</p>
          <address>
            Tech Park Phase II,
            <br />
            Autonagar, Vijayawada,
            <br />
            Andhra Pradesh 520007, India
          </address>
        </div>
      </article>
    </div>
  );
}
