import { useEffect, useState } from "react";
import { Facebook, Instagram, Linkedin, Twitter, Youtube } from "lucide-react";
import { Link } from "react-router-dom";
import { buildApiUrl } from "../services/api";

type SocialLinkRecord = {
  id?: string | number;
  platform?: string;
  name?: string;
  label?: string;
  url?: string;
  link?: string;
  href?: string;
  link_url?: string;
  slug?: string;
  type?: string;
  is_active?: boolean;
};

type FooterSocialLink = {
  key: string;
  label: string;
  href: string;
  icon: typeof Instagram;
};

const baseSocialLinks: FooterSocialLink[] = [
  {
    key: "instagram",
    label: "Instagram",
    href: "https://www.instagram.com/horigineitsolutions?xtok=NnF4eHp5djh1eHBv",
    icon: Instagram,
  },
  {
    key: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/horiginestaffing/",
    icon: Linkedin,
  },
  {
    key: "youtube",
    label: "YouTube",
    href: "https://youtube.com/@horiginestaffing?si=Uelf_OHMn0bsolAM",
    icon: Youtube,
  },
  {
    key: "facebook",
    label: "Facebook",
    href: "https://www.facebook.com/",
    icon: Facebook,
  },
  {
    key: "twitter",
    label: "Twitter",
    href: "https://x.com/",
    icon: Twitter,
  },
];

function normalizePlatformKey(value: string | undefined): string {
  const normalized = (value ?? "")
    .toString()
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "");

  if (!normalized) return "";

  if (["instagram", "insta", "ig"].includes(normalized)) return "instagram";
  if (["facebook", "fb", "meta"].includes(normalized)) return "facebook";
  if (["twitter", "x", "tweet", "tweets"].includes(normalized)) return "twitter";
  if (["linkedin", "linkedincompany"].includes(normalized)) return "linkedin";
  if (["youtube", "yt"].includes(normalized)) return "youtube";

  return normalized;
}

function getSocialHref(link: SocialLinkRecord): string {
  const href = (
    link.url ??
    link.link ??
    link.href ??
    link.link_url ??
    ""
  )
    .toString()
    .trim();

  return href;
}

function extractSocialList(payload: unknown): SocialLinkRecord[] {
  if (!payload) return [];

  if (Array.isArray(payload)) return payload as SocialLinkRecord[];

  if (typeof payload === "object") {
    const record = payload as Record<string, unknown>;

    const candidates = [
      record.items,
      record.results,
      record.data,
      record.social_links,
      record.links,
      record.socialLinks,
    ];

    for (const candidate of candidates) {
      if (Array.isArray(candidate)) {
        return candidate as SocialLinkRecord[];
      }
    }
  }

  return [];
}

function buildAdminSocialMap(payload: unknown): Map<string, string> {
  const adminLinks = new Map<string, string>();

  extractSocialList(payload).forEach((link) => {
    const href = getSocialHref(link);
    const isActive = link.is_active === undefined || link.is_active === true;

    if (!href || !isActive) return;

    const platformKey = normalizePlatformKey(
      link.platform ?? link.name ?? link.label ?? link.slug ?? link.type,
    );

    if (!platformKey) return;

    if (!adminLinks.has(platformKey)) {
      adminLinks.set(platformKey, href);
    }
  });

  return adminLinks;
}

function mergeSocialLinks(payload: unknown): FooterSocialLink[] {
  const adminMap = buildAdminSocialMap(payload);

  const merged = baseSocialLinks.map((item) => {
    const nextHref = adminMap.get(item.key);

    return {
      ...item,
      href: nextHref ?? item.href,
    };
  });

  const extraLinks = Array.from(adminMap.entries())
    .filter(([key]) => !baseSocialLinks.some((item) => item.key === key))
    .map(([key, href]) => {
      const labelMap: Record<string, string> = {
        instagram: "Instagram",
        facebook: "Facebook",
        twitter: "Twitter",
        linkedin: "LinkedIn",
        youtube: "YouTube",
      };

      const iconMap: Record<string, typeof Instagram> = {
        instagram: Instagram,
        facebook: Facebook,
        twitter: Twitter,
        linkedin: Linkedin,
        youtube: Youtube,
      };

      return {
        key,
        label: labelMap[key] ?? key,
        href,
        icon: iconMap[key] ?? Instagram,
      } satisfies FooterSocialLink;
    });

  return [...merged, ...extraLinks];
}

export default function Footer() {
  const [socialLinks, setSocialLinks] = useState<FooterSocialLink[]>(baseSocialLinks);

  useEffect(() => {
    let isMounted = true;

    async function fetchSocialLinks() {
      try {
        const response = await fetch(buildApiUrl("/social-links/"), {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        });

        if (!response.ok) {
          return;
        }

        const payload = await response.json();
        const mergedLinks = mergeSocialLinks(payload);

        if (isMounted && mergedLinks.length > 0) {
          setSocialLinks(mergedLinks);
        }
      } catch {
        if (isMounted) {
          setSocialLinks(baseSocialLinks);
        }
      }
    }

    void fetchSocialLinks();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <>
      <footer className="site-footer" id="contact-us">
        <div className="footer-main container">
          <div className="footer-about">
            <Link to="/" className="footer-brand">
              <img src="/images/horigine-logo.png" alt="Horigine logo" />
            </Link>
            <p>
              Horigine delivers end-to-end IT solutions and staffing services,
              helping businesses hire skilled professionals and build resilient,
              future-ready technology teams. We connect organizations with top
              talent across Salesforce, Java, React, cloud platforms, and
              modern digital transformation initiatives—backed by a commitment
              to quality, speed, and personalized support.
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
            <Link to="/services#product-services">Managed IT Solutions</Link>
            <Link to="/services#staffing-services">Staffing Services</Link>
          </div>
          <div>
            <h3>Contact Us</h3>
            <a href="tel:+919059988259">+91 90599 88259</a>
            <a href="mailto:contact@horigineitsolutions.com">contact@horigineitsolutions.com</a>
            <address>
              Tech Park Phase II, Autonagar, Vijayawada, Andhra Pradesh 520007,
              India
            </address>
            <div className="footer-social-links">
              {socialLinks.map(({ key, label, href, icon: Icon }) => (
                <a
                  key={key}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Icon size={14} />
                </a>
              ))}
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
          <span>© 2025 Horigine | All rights reserved</span>
          <span></span>
        </div>
      </footer>
      <a
        className="floating-contact"
        href="https://wa.me/919059988259?text=Hello%20Horigine%20Staffing"
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
