// booking/ApplianceChoice.jsx
import { useEffect } from "react";

export default function ApplianceChoice({
  services,
  maxSelections = 2,
  categoryLabel = "",
  selected,
  setSelected,
  onNext,
  onBack,              
  presetServiceSlug,
}) {
  const slug = (s) =>
    (s || "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  const isSelected = (s) => selected.some((i) => i.name === s.name);

  // Preselect from ?service=
  useEffect(() => {
    if (!presetServiceSlug || !services?.length) return;
    const svc = services.find((s) => slug(s.name) === presetServiceSlug);
    if (svc && !isSelected(svc)) setSelected([svc]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [presetServiceSlug, services]);

  function toggle(service) {
    const exists = isSelected(service);
    if (!exists && selected.length >= maxSelections) {
      alert(`Only ${maxSelections} selection${maxSelections > 1 ? "s" : ""} allowed.`);
      return;
    }
    setSelected(
      exists ? selected.filter((i) => i.name !== service.name) : [...selected, service]
    );
  }

  return (
    <div className="p-4">
      {/* Top row: Back + Title */}
      <div className="flex items-center justify-between mb-3">
       
        <h2 className="text-2xl font-semibold">
          Select {categoryLabel || "Services"}
        </h2>
        <div className="w-[64px]" aria-hidden /> {/* spacer */}
      </div>

      <p className="text-slate-600 mb-6">
        {maxSelections > 1 ? `Choose up to ${maxSelections}.` : `Choose one service.`}
      </p>

      <div className="flex flex-wrap gap-2 mb-6">
        {services.map((service) => (
          <button
            key={service.name}
            type="button"
            onClick={() => toggle(service)}
            className={`inline-flex items-center justify-center rounded-md px-3 py-2 border text-sm font-medium transition
              ${isSelected(service)
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-slate-900 border-slate-300 hover:bg-gray-50"}`}
            aria-pressed={isSelected(service)}
          >
            {service.name}
          </button>
        ))}
      </div>
 <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center justify-center rounded-lg px-4 py-2 border border-slate-300 font-medium hover:bg-slate-50"
        >
          Back
        </button>
      <button
        onClick={onNext}
        disabled={selected.length === 0}
        className={`inline-flex items-center justify-center rounded-lg px-4 py-2 font-medium
          ${selected.length === 0
            ? "bg-slate-300 text-slate-600 cursor-not-allowed"
            : "bg-blue-600 text-white hover:bg-blue-700"}`}
      >
        Continue
      </button>
      </div>
    </div>
  );
}
