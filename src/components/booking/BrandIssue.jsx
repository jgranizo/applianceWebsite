// booking/BrandIssue.jsx
import React from "react";

const BRAND_SETS = {
  appliance: [
    "Amazon Basics",
  "AR Blue Clean",
  "Ariens",
  "Ashley Furniture",
  "Briggs & Stratton",
  "CB2",
  "Crate & Barrel",
  "Craftsman",
  "DeWalt",
  "ECHOGEAR",
  "EGO",
  "Generac",
  "Greenworks",
  "Home Depot (Hampton Bay)",
  "Honda",
  "Honda (engines)",
  "Husqvarna",
  "IKEA",
  "John Deere",
  "Kanto",
  "Kärcher",
  "Lowe's (Style Selections)",
  "Monoprice",
  "Mounting Dream",
  "OmniMount",
  "Peerless-AV",
  "PERLESMITH",
  "Pottery Barn",
  "PowerSmart",
  "Rocketfish",
  "Room & Board",
  "Ryobi",
  "Sanus",
  "Sauder",
  "Simpson",
  "Simplicity",
  "Snow Joe",
  "Sun Joe",
  "Target (Threshold / Project 62)",
  "Toro",
  "Troy-Bilt",
  "USX Mount",
  "VideoSecu",
  "Vogel's",
  "Walmart (Mainstays / BH&G)",
  "Wayfair (Wayfair Basics)",
  "West Elm",
  "Westinghouse",
  "Worx"
  ],
  handyman: [
  "Amazon Basics",
  "AR Blue Clean",
  "Ariens",
  "Ashley Furniture",
  "Briggs & Stratton",
  "CB2",
  "Crate & Barrel",
  "Craftsman",
  "DeWalt",
  "ECHOGEAR",
  "EGO",
  "Generac",
  "Greenworks",
  "Home Depot (Hampton Bay)",
  "Honda",
  "Honda (engines)",
  "Husqvarna",
  "IKEA",
  "John Deere",
  "Kanto",
  "Kärcher",
  "Lowe's (Style Selections)",
  "Monoprice",
  "Mounting Dream",
  "OmniMount",
  "Peerless-AV",
  "PERLESMITH",
  "Pottery Barn",
  "PowerSmart",
  "Rocketfish",
  "Room & Board",
  "Ryobi",
  "Sanus",
  "Sauder",
  "Simpson",
  "Simplicity",
  "Snow Joe",
  "Sun Joe",
  "Target (Threshold / Project 62)",
  "Toro",
  "Troy-Bilt",
  "USX Mount",
  "VideoSecu",
  "Vogel's",
  "Walmart (Mainstays / BH&G)",
  "Wayfair (Wayfair Basics)",
  "West Elm",
  "Westinghouse",
  "Worx"
  ],

};

export default function BrandIssue({
  categoryKey = "appliance",
  value,
  amountSelected,
  onChange,
  onNext,
  onBack,
}) {
  // normalize entries and ensure `other` flag exists
  const entries = [
    { brand: "", issue: "", other: false, ...(value?.[0] || {}) },
    { brand: "", issue: "", other: false, ...(value?.[1] || {}) },
  ];

  const baseBrands = BRAND_SETS[categoryKey] || [];
  const brands = [...baseBrands, "Other"]; // chips

  const setBrand = (idx, brandName) => {
    const next = [...entries];
    if (brandName === "Other") {
      // show free-type input; keep whatever user had typed (or empty)
      next[idx] = { ...next[idx], other: true };
      // if the current brand is one of the chips, clear it for typing
      if (baseBrands.includes(next[idx].brand)) next[idx].brand = "";
    } else {
      // picked a known brand
      next[idx] = { ...next[idx], brand: brandName, other: false };
    }
    onChange(next);
  };

  const setBrandText = (idx, text) => {
    const next = [...entries];
    next[idx] = { ...next[idx], brand: text };
    onChange(next);
  };

  const setIssue = (idx, issue) => {
    const next = [...entries];
    next[idx] = { ...next[idx], issue };
    onChange(next);
  };

  const isSelectedChip = (idx, name) =>
    name === "Other" ? entries[idx].other : (!entries[idx].other && entries[idx].brand === name);

  // validation (same spirit as your original)
  const validPrimary = !!entries[0].brand && entries[0].issue.trim().length >= 10;
  const secondProvided = !!entries[1].brand && entries[1].issue.trim().length >= 10;
  const validSecond = amountSelected === 1 || secondProvided;
  const canContinue = validPrimary && validSecond;

  return (
    <div className="space-y-8">
      {/* Primary */}
      <section>
        <h2 className="text-lg font-semibold mb-2">Primary Brand & Issue</h2>

        <div className="flex flex-wrap gap-2 mb-3">
          {brands.map((name) => (
            <button
              key={`b0-${name}`}
              type="button"
              onClick={() => setBrand(0, name)}
              className={`inline-flex items-center justify-center rounded-md px-3 py-2 border text-sm font-medium transition
                ${isSelectedChip(0, name)
                  ? "bg-brand text-white border-brand"
                  : "!bg-white !text-slate-900 border-slate-300 hover:bg-gray-50"}`}
            >
              {name}
            </button>
          ))}
        </div>

        {/* Free-type brand when "Other" is active */}
        {entries[0].other && (
          <>
            <label htmlFor="brand-0" className="block text-sm text-slate-600 mb-1">Brand</label>
            <input
              id="brand-0"
              name="brand[0]"
              type="text"
              className="w-full mb-3 p-2 border rounded"
              placeholder="Type brand…"
              value={entries[0].brand}
              onChange={(e) => setBrandText(0, e.target.value)}
              autoComplete="organization"
            />
          </>
        )}

        <label htmlFor="issue-0" className="block text-sm text-slate-600 mb-1">Issue</label>
        <textarea
          id="issue-0"
          name="issue[0]"
          className="w-full min-h-[90px] p-2 border rounded"
          placeholder="Describe the issue (min 10 chars)…"
          value={entries[0].issue}
          onChange={(e) => setIssue(0, e.target.value)}
        />
        {!validPrimary && (
          <p className="text-xs text-red-600 mt-1">
            Pick a brand and write at least 10 characters.
          </p>
        )}
      </section>

      {/* Second (only if user selected two services) */}
      {amountSelected > 1 && (
        <section>
          <h2 className="text-lg font-semibold mb-2">Second Brand & Issue</h2>

          <div className="flex flex-wrap gap-2 mb-3">
            {brands.map((name) => (
              <button
                key={`b1-${name}`}
                type="button"
                onClick={() => setBrand(1, name)}
                className={`inline-flex items-center justify-center rounded-md px-3 py-2 border text-sm font-medium transition
                  ${isSelectedChip(1, name)
                    ? "bg-brand text-white border-brand"
                    : "!bg-white !text-slate-900 border-slate-300 hover:bg-gray-50"}`}
              >
                {name}
              </button>
            ))}
          </div>

          {entries[1].other && (
            <>
              <label htmlFor="brand-1" className="block text-sm text-slate-600 mb-1">Brand</label>
              <input
                id="brand-1"
                name="brand[1]"
                type="text"
                className="w-full mb-3 p-2 border rounded"
                placeholder="Type brand…"
                value={entries[1].brand}
                onChange={(e) => setBrandText(1, e.target.value)}
                autoComplete="organization"
              />
            </>
          )}

          <label htmlFor="issue-1" className="block text-sm text-slate-600 mb-1">
            Issue
          </label>
          <textarea
            id="issue-1"
            name="issue[1]"
            className="w-full min-h-[90px] p-2 border rounded"
            placeholder="Only required if you pick a second brand"
            value={entries[1].issue}
            onChange={(e) => setIssue(1, e.target.value)}
          />
          {!validSecond && (
            <p className="text-xs text-red-600 mt-1">
              If you add a second brand, write at least 10 characters.
            </p>
          )}
        </section>
      )}

      {/* Nav */}
      <div className="flex gap-2">
        <button type="button" onClick={onBack} className="btn-outline-brand">
          Back
        </button>
        <button type="button" onClick={onNext} disabled={!canContinue} className="btn-brand">
          Continue
        </button>
      </div>
    </div>
  );
}
