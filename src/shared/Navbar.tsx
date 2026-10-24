import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";

const links = [
  { label: "Home", to: "/" },
  { label: "About Us", to: "/about-us" },
  { label: "Services", to: "/services" },
  { label: "Careers", to: "/careers" },
  { label: "Contact Us", to: "/contact-us" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="nav-wrap">
      <div className="nav-bar">
        <Link to="/" className="brand" aria-label="Horigine Staffing home">
          <span className="brand-mark">H</span>
          <span className="brand-copy">
            <b>HORIGINE</b>
            <small>STAFFING</small>
          </span>
        </Link>
        <button
          className="mobile-menu-toggle"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
        <nav
          className={open ? "nav-links nav-links-open" : "nav-links"}
          aria-label="Primary navigation"
        >
          {links.map((link) => (
            <NavLink
              key={link.label}
              to={link.to}
              onClick={() => setOpen(false)}
              end={link.to === "/"}
              className={({ isActive }) =>
                isActive &&
                ["/", "/about-us", "/services", "/careers"].includes(link.to)
                  ? "nav-link active"
                  : "nav-link"
              }
            >
              {link.label}
            </NavLink>
          ))}
          <Link
            to="/contact-us"
            className="gradient-button nav-cta"
            onClick={() => setOpen(false)}
          >
            GET STARTED
          </Link>
        </nav>
      </div>
    </header>
  );
}
