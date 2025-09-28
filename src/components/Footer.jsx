// Footer.jsx
import { Link } from "react-router-dom";
import { useState } from "react";

const AREAS_PRIMARY = [
  "Boston",
  "Cambridge",
  "Somerville",
  "Brookline",
  "Newton",
  "Quincy",
  "Medford",
  "Malden",
  "Everett",
  "Chelsea",
  "Revere",
  "Watertown",
];

const AREAS_MORE = [
  "Allston / Brighton",
  "South Boston",
  "Charlestown",
  "Dorchester",
  "Jamaica Plain",
  "West Roxbury",
  "Roslindale",
  "Hyde Park",
  "Waltham",
  "Belmont",
  "Arlington",
  "Lexington",
  "Winchester",
  "Woburn",
  "Burlington",
  "Melrose",
  "Stoneham",
  "Saugus",
  "Lynn",
  "Salem",
  "Peabody",
  "Needham",
  "Dedham",
  "Milton",
  "Weymouth",
  "Braintree",
  "Norwood",
  "Canton",
];

export default function Footer() {
  const [showAllAreas, setShowAllAreas] = useState(false);
  const areas = showAllAreas ? [...AREAS_PRIMARY, ...AREAS_MORE] : AREAS_PRIMARY;

  return (
    <footer className="bg-[color:var(--surface)] border-t border-gray-200 mt-12">
      <div className="max-w-6xl mx-auto px-4 py-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
        {/* Brand / About */}
        <div>
          <h3 className="text-xl font-bold text-[color:var(--brand)]">Dr Appliances Repairs</h3>
          <p className="mt-2 text-sm text-[color:var(--muted)]">
            Reliable appliance repair you can trust — proudly serving the{" "}
            <span className="font-medium text-[color:var(--text)]">Greater Boston</span> area and nearby suburbs.
          </p>
          <div className="mt-3">
            <a
              href="https://www.google.com/maps/search/Greater+Boston"
              target="_blank"
              rel="noreferrer"
              className="text-sm underline text-[color:var(--brand)] hover:opacity-80"
            >
              View service map →
            </a>
          </div>
        </div>

        {/* Service Areas (Greater Boston) */}
        <div>
          <h4 className="font-semibold text-[color:var(--text)] mb-3">Service Areas</h4>
          <ul className="columns-1 sm:columns-2 gap-6 text-sm space-y-1">
            {areas.map((city) => (
              <li key={city} className="break-inside-avoid">
                {city}
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={() => setShowAllAreas((v) => !v)}
            className="mt-3 text-sm text-[color:var(--brand)] underline hover:opacity-80"
          >
            {showAllAreas ? "Show fewer areas" : `Show all ${AREAS_PRIMARY.length + AREAS_MORE.length}+ areas`}
          </button>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-semibold text-[color:var(--text)] mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-[color:var(--brand)]">Home</Link></li>
            <li><Link to="/services" className="hover:text-[color:var(--brand)]">Services</Link></li>
            <li><Link to="/booking" className="hover:text-[color:var(--brand)]">Book Now</Link></li>
            <li><Link to="/contactus" className="hover:text-[color:var(--brand)]">Contact Us</Link></li>
            <li><Link to="/privacypolicy" className="hover:text-[color:var(--brand)]">Privacy Policy</Link></li>
            <li><Link to="/termsofservice" className="hover:text-[color:var(--brand)]">Terms Of Service</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-semibold text-[color:var(--text)] mb-3">Contact</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="tel:+1-978-751-2596" className="hover:text-[color:var(--brand)]">
                📞 (978) 751-2596
              </a>
            </li>
            <li>
              <a href="mailto:doctor.scrubber@yahoo.com" className="hover:text-[color:var(--brand)]">
                ✉️ doctor.scrubber@yahoo.com
              </a>
            </li>
          </ul>
        </div>

        {/* Social */}
        {/* <div>
          <h4 className="font-semibold text-[color:var(--text)] mb-3">Follow Us</h4>
          <div className="flex gap-4 text-xl">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-[color:var(--brand)]">
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22 12a10 10 0 1 0-11.5 9.9v-7h-2v-3h2v-2.3c0-2 1.2-3.1 3-3.1.9 0 1.8.1 1.8.1v2h-1c-1 0-1.3.6-1.3 1.2V12h2.3l-.4 3h-1.9v7A10 10 0 0 0 22 12z"/>
              </svg>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-[color:var(--brand)]">
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M7 2C4.2 2 2 4.2 2 7v10c0 2.8 2.2 5 5 5h10c2.8 0 5-2.2 5-5V7c0-2.8-2.2-5-5-5H7zm10 2c1.6 0 3 1.4 3 3v10c0 1.6-1.4 3-3 3H7c-1.6 0-3-1.4-3-3V7c0-1.6 1.4-3 3-3h10zm-5 3a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 2a3 3 0 1 1 0 6 3 3 0 0 1 0-6zm4.8-.9a1.1 1.1 0 1 0 0 2.2 1.1 1.1 0 0 0 0-2.2z"/>
              </svg>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-[color:var(--brand)]">
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22.46 6c-.77.4-1.6.7-2.46.8a4.3 4.3 0 0 0 1.9-2.4c-.9.6-1.9 1-3 1.3A4.2 4.2 0 0 0 16 4a4.3 4.3 0 0 0-4.3 4.3c0 .3 0 .6.1.9A12 12 0 0 1 3 5.2a4.2 4.2 0 0 0-.6 2.2A4.3 4.3 0 0 0 4.9 12c-.7 0-1.3-.2-1.9-.5v.1c0 2.1 1.5 3.8 3.5 4.2-.4.1-.9.2-1.3.2-.3 0-.6 0-.9-.1.6 1.8 2.3 3 4.3 3a8.6 8.6 0 0 1-5.3 1.8H3c1.9 1.2 4.2 2 6.7 2 8 0 12.5-6.7 12.5-12.5v-.6c.8-.5 1.5-1.2 2-2z"/>
              </svg>
            </a>
          </div>
        </div> */}
      </div>

      {/* Bottom note */}
      <div className="border-t border-gray-200 mt-6 py-4 text-center text-xs text-[color:var(--muted)]">
        © {new Date().getFullYear()} Dr Appliances Repair — Serving Greater Boston. All rights reserved.
      </div>
    </footer>
  );
}
