// booking/ContactInfo.jsx
import { useEffect, useState } from "react";

const GREATER_BOSTON_CITIES = [
  "Allston","Arlington","Belmont","Boston","Braintree","Brighton","Brookline","Burlington",
  "Cambridge","Canton","Charlestown","Chelsea","Dedham","Dorchester","Everett","Hyde Park",
  "Jamaica Plain","Lexington","Lynn","Malden","Melrose","Medford","Milton","Needham","Newton",
  "Norwood","Peabody","Quincy","Revere","Roslindale","Salem","Saugus","Somerville","South Boston",
  "Stoneham","Waltham","Watertown","West Roxbury","Weymouth","Winchester","Woburn"
];
const inGB = (c) => GREATER_BOSTON_CITIES.includes((c || "").trim());

export default function ContactInfo({ value, onChange, onNext, onBack }) {
  const entry = value ?? {};
  const setField = (k, v) => onChange({ ...entry, [k]: v });

  // keep a tiny bit of local UI state just for the select's value
  const [citySelect, setCitySelect] = useState(
    inGB(entry.city) ? entry.city : entry.city ? "Other" : ""
  );

  // Sync select when `city` (from props) changes elsewhere
  useEffect(() => {
    setCitySelect(inGB(entry.city) ? entry.city : entry.city ? "Other" : "");
  }, [entry.city]);

  // validators
  const isZipValid   = /^\d{5}(-\d{4})?$/.test(entry.zipcode || "");
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(entry.email || "");
  const isPhoneValid = /^\d{10}$/.test((entry.phone || "").replace(/\D/g, ""));

  const canContinue =
    (entry.address?.trim()?.length ?? 0) > 4 &&
    (entry.city?.trim()?.length ?? 0) > 1 &&
    (entry.state?.trim()?.length ?? 0) >= 2 &&
    isZipValid &&
    (entry.firstName?.trim()?.length ?? 0) > 1 &&
    (entry.lastName?.trim()?.length ?? 0) > 1 &&
    isEmailValid &&
    isPhoneValid;

  return (
    <div className="space-y-8">
      {/* Service Address */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Service Address</h2>

        {/* Street */}
        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-700">
            Street Address
          </label>
          <input
            id="address"
            type="text"
            autoComplete="street-address"
            className="mt-1 w-full rounded-md border px-3 py-2 outline-none focus:ring-2 focus:ring-black/60"
            placeholder="123 Main St"
            value={entry.address || ""}
            onChange={(e) => setField("address", e.target.value)}
          />
        </div>

        {/* Unit */}
        <div>
          <label htmlFor="unit" className="block text-sm font-medium text-gray-700">
            Apt / Unit <span className="text-gray-400">(optional)</span>
          </label>
          <input
            id="unit"
            type="text"
            className="mt-1 w-full rounded-md border px-3 py-2 outline-none focus:ring-2 focus:ring-black/60"
            placeholder="Apt 4B"
            value={entry.unit || ""}
            onChange={(e) => setField("unit", e.target.value)}
          />
        </div>

        {/* City / State / Zip */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {/* City (GB list + Other) */}
          <div>
            <label htmlFor="citySelect" className="block text-sm font-medium text-gray-700">
              City (Greater Boston)
            </label>
            <select
              id="citySelect"
              className="mt-1 w-full rounded-md border px-3 py-2 outline-none focus:ring-2 focus:ring-black/60"
              value={citySelect}
              onChange={(e) => {
                const v = e.target.value;
                setCitySelect(v);
                if (v !== "Other") {
                  setField("city", v); // writes directly to props
                } else {
                  // keep existing city text (if any). If blank, the input below will fill it.
                  if (!entry.city) setField("city", "");
                }
              }}
            >
              <option value="">Select a city</option>
              {GREATER_BOSTON_CITIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
              <option value="Other">Other (not listed)</option>
            </select>

            {/* Free-text city when "Other" */}
            {citySelect === "Other" && (
              <input
                id="cityOther"
                type="text"
                className="mt-2 w-full rounded-md border px-3 py-2 outline-none focus:ring-2 focus:ring-black/60"
                placeholder="Enter your city (e.g., Worcester)"
                value={entry.city || ""}
                onChange={(e) => setField("city", e.target.value)}
              />
            )}
          </div>

          {/* State */}
          <div>
            <label htmlFor="state" className="block text-sm font-medium text-gray-700">
              State
            </label>
            <input
              id="state"
              type="text"
              maxLength={2}
              autoComplete="address-level1"
              className="mt-1 w-full rounded-md border px-3 py-2 uppercase tracking-wide outline-none focus:ring-2 focus:ring-black/60"
              placeholder="MA"
              value={entry.state || ""}
              onChange={(e) => setField("state", e.target.value.toUpperCase())}
            />
          </div>

          {/* ZIP */}
          <div>
            <label htmlFor="zipcode" className="block text-sm font-medium text-gray-700">
              ZIP Code
            </label>
            <input
              id="zipcode"
              type="text"
              inputMode="numeric"
              autoComplete="postal-code"
              className={`mt-1 w-full rounded-md border px-3 py-2 outline-none focus:ring-2 ${
                entry.zipcode && !isZipValid
                  ? "border-red-500 focus:ring-red-400"
                  : "focus:ring-black/60"
              }`}
              placeholder="02118"
              value={entry.zipcode || ""}
              onChange={(e) =>
                setField("zipcode", e.target.value.replace(/[^\d-]/g, ""))
              }
            />
            {entry.zipcode && !isZipValid && (
              <p className="mt-1 text-xs text-red-600">
                Enter a valid ZIP (12345 or 12345-6789).
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Contact Information</h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
              First Name
            </label>
            <input
              id="firstName"
              type="text"
              className="mt-1 w-full rounded-md border px-3 py-2 outline-none focus:ring-2 focus:ring-black/60"
              placeholder="John"
              value={entry.firstName || ""}
              onChange={(e) => setField("firstName", e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
              Last Name
            </label>
            <input
              id="lastName"
              type="text"
              className="mt-1 w-full rounded-md border px-3 py-2 outline-none focus:ring-2 focus:ring-black/60"
              placeholder="Doe"
              value={entry.lastName || ""}
              onChange={(e) => setField("lastName", e.target.value)}
            />
          </div>
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
            Phone Number
          </label>
          <input
            id="phone"
            type="tel"
            inputMode="numeric"
            autoComplete="tel"
            className={`mt-1 w-full rounded-md border px-3 py-2 outline-none focus:ring-2 ${
              entry.phone && !isPhoneValid
                ? "border-red-500 focus:ring-red-400"
                : "focus:ring-black/60"
            }`}
            placeholder="5551234567"
            value={entry.phone || ""}
            onChange={(e) => setField("phone", e.target.value.replace(/\D/g, ""))}
          />
          {entry.phone && !isPhoneValid && (
            <p className="mt-1 text-xs text-red-600">Enter a valid 10-digit phone number.</p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            className={`mt-1 w-full rounded-md border px-3 py-2 outline-none focus:ring-2 ${
              entry.email && !isEmailValid
                ? "border-red-500 focus:ring-red-400"
                : "focus:ring-black/60"
            }`}
            placeholder="you@example.com"
            value={entry.email || ""}
            onChange={(e) => setField("email", e.target.value)}
          />
          {entry.email && !isEmailValid && (
            <p className="mt-1 text-xs text-red-600">Enter a valid email address.</p>
          )}
        </div>
      </section>

      {/* Nav */}
      <div className="flex items-center gap-2 pt-2">
        <button type="button" onClick={onBack} className="btn-outline-brand">
          Back
        </button>
        <button
          type="button"
          onClick={onNext}
          disabled={!canContinue}
          className="btn-brand"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
