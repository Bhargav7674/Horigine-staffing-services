import { Link } from "react-router-dom";
import { Facebook, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <>
      <footer className="site-footer" id="contact-us">
        <div className="footer-main container">
          <div className="footer-about">
            <Link to="/" className="footer-brand">
              <img src="/images/horigine-logo.png" alt="Horigine logo" />
            </Link>
            <p>
              Horigine Staffing is a specialized recruitment firm focused on
              connecting businesses with top-tier talent in AWS, .NET, and
              Salesforce. With a commitment to quality, speed, and personalized
              service, we help companies build high-performing teams that
              deliver real results.
            </p>
          </div>
          <div>
            <h3>Quick Links</h3>
            <Link to="/">Home</Link>
            <Link to="/about-us">About Us</Link>
            <Link to="/careers">Careers</Link>
            <Link to="/contact-us">Contact Us</Link>
          </div>
          <div>
            <h3>Services</h3>
            <Link to="/services">
              Managed IT Solutions
            </Link>
            <Link to="/services">Staffing Services</Link>
          </div>
          <div>
            <h3>Contact Us</h3>
            <a href="tel:+918001234567">+91 800 123 4567</a>
            <a href="mailto:hello@horigine.com">hello@horigine.com</a>
            <address>
              Tech Park Phase II, Autonagar, Vijayawada, Andhra Pradesh 520007,
              India
            </address>
            <div className="footer-social-links">
              <a href="https://www.facebook.com/" aria-label="Facebook">
                <Facebook size={14} />
              </a>
              <a href="https://www.linkedin.com/" aria-label="LinkedIn">
                <Linkedin size={14} />
              </a>
            </div>
            <a
              className="footer-location-link"
              href="https://maps.google.com/?q=Tech+Park+Phase+II,+Autonagar,+Vijayawada"
              target="_blank"
              rel="noreferrer"
            >
              View location
            </a>
          </div>
        </div>
        <div className="footer-bottom container">
          <span>© 2025 Horigine Staffing | All rights reserved</span>
          <span>Website designed by Amul Infotech.</span>
        </div>
      </footer>
      <a
        className="floating-contact"
        href="https://wa.me/"
        target="_blank"
        rel="noreferrer"
        aria-label="Contact us on WhatsApp"
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 32 32"
          width="26"
          height="26"
          fill="currentColor"
        >
          <path d="M16.04 3.2A12.72 12.72 0 0 0 5.1 22.42L3.3 28.8l6.54-1.72A12.76 12.76 0 1 0 16.04 3.2Zm0 23.2c-2 0-3.96-.54-5.67-1.57l-.4-.24-3.88 1.02 1.04-3.78-.26-.41a10.38 10.38 0 1 1 9.17 4.98Zm5.7-7.77c-.31-.16-1.84-.91-2.12-1.01-.29-.11-.5-.16-.7.16-.21.31-.8 1.01-.98 1.22-.18.2-.36.23-.67.08-.31-.16-1.31-.49-2.5-1.54a9.38 9.38 0 0 1-1.73-2.15c-.18-.31-.02-.48.14-.64.14-.14.31-.36.47-.54.16-.18.21-.31.31-.52.1-.2.05-.38-.02-.54-.08-.16-.7-1.68-.96-2.3-.25-.6-.5-.52-.7-.53h-.6c-.2 0-.54.08-.83.39-.29.31-1.08 1.06-1.08 2.59s1.1 3 1.25 3.2c.16.21 2.16 3.3 5.23 4.63.73.31 1.3.5 1.74.64.73.23 1.4.2 1.93.12.59-.09 1.84-.75 2.1-1.48.26-.72.26-1.34.18-1.48-.08-.13-.28-.2-.59-.36Z" />
        </svg>
      </a>
    </>
  );
}
