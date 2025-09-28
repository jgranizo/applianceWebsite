import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const linkBase =
    "transition hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 rounded";
  const linkActive = "underline underline-offset-4";

  return (
    <nav className="sticky top-0 z-50 bg-brand text-white shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold tracking-tight hover:opacity-90">
          Dr Appliances Repair
        </Link>

        {/* Desktop menu */}
        <div className="hidden md:flex items-center gap-6 text-sm font-medium">
          
          <NavLink
            to="/contactus"
            className={({ isActive }) => `${linkBase} ${isActive ? linkActive : ""}`}
          >
            Contact Us
          </NavLink>
           <NavLink
            to="/aboutus"
            className={({ isActive }) => `${linkBase} ${isActive ? linkActive : ""}`}
          >
            About Us
          </NavLink>

         
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setMenuOpen((v) => !v)}
          className="md:hidden p-2 rounded hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2"
            viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round"
              d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          id="mobile-menu"
          className="md:hidden absolute inset-x-0 top-full bg-brand text-white shadow-lg"
        >
          <div className="px-4 py-3 flex flex-col gap-2 text-sm font-medium">
            
            <NavLink to="contactus" onClick={() => setMenuOpen(false)} className={linkBase}>
              Contact Us
            </NavLink>
           <NavLink
            to="/aboutus"
            className={({ isActive }) => `${linkBase} ${isActive ? linkActive : ""}`}
          >
            About Us
          </NavLink>
          </div>
        </div>
      )}
    </nav>
  );
}
