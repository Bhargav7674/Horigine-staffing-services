import { MapPin } from "lucide-react";

export default function OfficeMapSection() {
  const mapUrl =
    "https://maps.google.com/maps?q=Tech%20Park%20Phase%20II%2C%20Autonagar%2C%20Vijayawada%2C%20Andhra%20Pradesh%20520007&t=&z=12&ie=UTF8&iwloc=&output=embed";
  return (
    <section
      className="office-map-wrap contact-container"
      aria-label="Office location map"
    >
      <div className="office-map-frame">
        <iframe
          title="Map showing Horigine Staffing headquarters in Vijayawada"
          src={mapUrl}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
        <div className="office-map-label">
          <span className="office-map-pin">
            <MapPin size={15} />
          </span>
          <div>
            <strong>Vijayawada HQ</strong>
            <span>Tech Park Phase II, Autonagar</span>
          </div>
        </div>
      </div>
    </section>
  );
}
