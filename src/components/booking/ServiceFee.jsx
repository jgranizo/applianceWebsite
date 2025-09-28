// booking/ServiceFee.jsx
import { useEffect, useState } from "react";

export default function ServiceFee({ selected = [], visible = false }) {
  const [open, setOpen] = useState(false);

  // Compute visibility AFTER hooks will run
  const show = visible && selected.length > 0;

  // ESC to close (only when open)
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // If it becomes not showable, ensure modal is closed
  useEffect(() => {
    if (!show && open) setOpen(false);
  }, [show, open]);

  if (!show) return null;

  const price =100

  return (
    <>
      {/* Wide desktop: fixed bottom-right card */}
      <div className="hidden xl:block fixed right-6 bottom-6 z-40">
        <div className="card p-4 w-72 shadow-lg">
          <h3 className="text-lg font-semibold mb-2 text-gray-900">Service Fee</h3>
          <div className="text-2xl font-bold text-gray-900">${price}</div>
          <div className="mt-2 text-sm text-muted">
            {selected.map((s) => s.name).join(", ")}
          </div>
        </div>
      </div>

      {/* ≤ xl: FAB + modal */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="xl:hidden fixed bottom-4 right-4 z-50 px-4 py-3 rounded-full btn-brand shadow-lg pb-[env(safe-area-inset-bottom)]"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls="service-fee-modal"
      >
        Service Fee • ${price}
      </button>

      {open && (
        <div
          id="service-fee-modal"
          role="dialog"
          aria-modal="true"
          className="xl:hidden fixed inset-0 z-50 bg-black/50 flex items-end md:items-center md:justify-center"
          onClick={() => setOpen(false)}
        >
          <div
            className="bg-white w-full md:max-w-md p-6 rounded-t-2xl md:rounded-xl md:shadow-lg max-h-[75vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-gray-900">Service Fee</h3>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="text-gray-500 hover:text-gray-800"
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            <div className="mt-2 text-2xl font-bold text-gray-900">${price}</div>
            <div className="mt-3 text-gray-700 space-y-1">
              {selected.map((s) => (
                <p key={s.name}>{s.name}</p>
              ))}
            </div>

            <div className="mt-6 flex justify-end">
              <button type="button" className="btn-brand" onClick={() => setOpen(false)}>
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

