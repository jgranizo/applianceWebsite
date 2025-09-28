import React, { useMemo, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

/* =========================
   Icon base + SVG emblems
   ========================= */
const ibase = {
  width: 48, height: 48, viewBox: "0 0 24 24",
  fill: "none", stroke: "currentColor", strokeWidth: 1.6,
  strokeLinecap: "round", strokeLinejoin: "round",
};

const Refrigerator = (p) => (
  <svg {...ibase} {...p}>
    <rect x="6" y="3" width="12" height="18" rx="2" />
    <line x1="6" y1="12" x2="18" y2="12" />
    <line x1="9" y1="8"  x2="9"  y2="10" />
    <line x1="9" y1="14" x2="9"  y2="16" />
  </svg>
);

const Toolbox = (p) => (
  <svg {...ibase} {...p}>
    <rect x="3" y="8" width="18" height="11" rx="2" />
    <path d="M3 12h18" />
    <path d="M9 8V6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" />
    <path d="M10 15h4" />
  </svg>
);

const Droplet = (p) => (
  <svg {...ibase} {...p}>
    <path d="M12 2s6 6.5 6 11a6 6 0 0 1-12 0C6 8.5 12 2 12 2z" />
  </svg>
);

const Door = (p) => (
  <svg {...ibase} {...p}>
    <rect x="7" y="3" width="10" height="18" rx="1.5" />
    <circle cx="15" cy="12" r="0.8" />
  </svg>
);

const ICONS = { Refrigerator, Droplet, Toolbox, Door };

/* =========================
   Data model (Categories)
   ========================= */
const CATEGORIES = [
  {
    name: "Handyman",
    key: "handyman",
    logo: "Toolbox",
    theme: { from: "#0ea5e9", to: "#22d3ee" },
    services: [
      { name: "TV Mounting" },
      { name: "Furniture Assembly" },
      { name: "Snow Blowers" },
      { name: "Pressure Washer" },
    ],
  },
  {
    name: "Home Appliances",
    key: "appliance",
    logo: "Refrigerator",
    theme: { from: "#f43f5e", to: "#fb7185" },
    services: [
      { name: "Refrigerator" },
      { name: "Dishwasher" },
      { name: "Washer Machine" },
      { name: "Dryer" },
      { name: "Microwave" },
      { name: "Oven" },
      { name: "Freezer" },
      { name: "Stove" },
    ],
  },
];

/* =========================
   Utils
   ========================= */
const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

/* =========================
   UI atoms
   ========================= */
const Card = ({ children, className = "" }) => (
  <div className={`group rounded-lg border border-slate-200 bg-white p-3 transition hover:shadow-sm ${className}`}>
    {children}
  </div>
);

/* =========================
   Category Tile (responsive)
   ========================= */
const CategoryTile = ({ c, open }) => {
  const Logo = (c.logo && ICONS[c.logo]) || ICONS.Toolbox; // safe fallback
  const from = c.theme?.from ?? "#0ea5e9";
  const to   = c.theme?.to   ?? "#22d3ee";
  const uid  = c.key;

  return (
    <Card className="w-full max-w-[400px]" >
      {/* use aspect to keep shape consistent while grid resizes columns */}
      <div className="relative w-full aspect-[5/4] overflow-hidden rounded-md">
        {/* Background SVG */}
        <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <linearGradient id={`g-${uid}`} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor={from} />
              <stop offset="1" stopColor={to} />
            </linearGradient>
            <pattern id={`p-${uid}`} width="8" height="8" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="1" fill="rgba(255,255,255,.35)" />
            </pattern>
          </defs>
          <rect width="100" height="100" fill={`url(#g-${uid})`} />
          <rect width="100" height="100" fill={`url(#p-${uid})`} opacity="0.25" />
        </svg>

        {/* center logo (scales with breakpoints) */}
        <div className="absolute inset-0 grid place-items-center">
          <Logo className="text-white drop-shadow-[0_1px_8px_rgba(0,0,0,.25)] w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14" />
        </div>

        {/* label */}
        <div className="absolute inset-x-2 bottom-2">
          <div className="text-white font-semibold text-sm sm:text-base drop-shadow-sm">{c.name}</div>
        </div>
      </div>

      {/* footer */}
      <div className="mt-2 flex items-center justify-between">
        <span className="font-semibold text-slate-900 text-sm sm:text-base">{c.name}</span>
        <span className="text-blue-600 text-xs sm:text-sm">{open ? "Hide ↑" : "Explore →"}</span>
      </div>
    </Card>
  );
};

/* =========================
   Page
   ========================= */
export default function Services() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const initialKey = params.get("category") || "";
  const [openKey, setOpenKey] = useState(initialKey);

  const onToggle = (key) => {
    const next = openKey === key ? "" : key;
    setOpenKey(next);
    const search = next ? `?category=${encodeURIComponent(next)}` : "";
    navigate({ pathname: "/services", search });
  };

  const catMap = useMemo(() => Object.fromEntries(CATEGORIES.map((c) => [c.key, c])), []);

  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-6 text-center">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">What We Do</h2>
        <p className="mx-auto mt-2 max-w-xl text-slate-600">
          Pick a category to see services and start your booking.
        </p>
      </div>

      {/* Responsive, auto-fitting grid:
          - min tile width 160px
          - fills available space, changes # of columns automatically */}
 <div className="grid gap-4 sm:gap-6 justify-center justify-items-center grid-cols-[repeat(auto-fit,minmax(160px,400px))]">
        {CATEGORIES.map((c) => (
          <button
            key={c.key}
            onClick={() => onToggle(c.key)}
            className="block w-full text-left rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            aria-expanded={openKey === c.key}
            aria-controls={`panel-${c.key}`}
          >
            <CategoryTile c={c} open={openKey === c.key} />
          </button>
        ))}
      </div>

      {/* Inline service panel (text-only) */}
      {openKey && (
        <div
          id={`panel-${openKey}`}
          className="mt-8 border-t pt-6"
          role="region"
          aria-label={`${catMap[openKey]?.name} services`}
        >
          <h3 className="mb-3 text-xl font-semibold">{catMap[openKey]?.name}</h3>

          <ul className="grid gap-2 sm:grid-cols-2">
            {catMap[openKey]?.services.map((svc) => {
              const svcSlug = svc.slug || slug(svc.name);
              const to = `/booking?category=${openKey}&service=${svcSlug}`;
              return (
                <li key={svcSlug}>
                  <Link
                    to={to}
                    className="group block rounded-md px-3 py-2 text-slate-800 transition hover:bg-blue-50 hover:text-blue-700"
                    aria-label={`Book ${svc.name}`}
                  >
                    <span className="text-sm font-medium sm:text-base">{svc.name}</span>
                    <span className="ml-1 text-blue-600 opacity-0 transition group-hover:opacity-100">→</span>
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="mt-6 text-center">
            <Link
              to={`/booking?category=${openKey}`}
              className="inline-flex items-center justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              Book {catMap[openKey]?.name}
            </Link>
          </div>
        </div>
      )}
    </section>
  );
}
