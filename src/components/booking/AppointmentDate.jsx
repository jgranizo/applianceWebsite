import { useMemo, useState } from "react";

export default function AppointmentDate({
  value, onChange, onSend, onBack, sending, error, setTodayAsMin
}){
  const entry = value ?? { date: "", time: "" };
  const [calendarOpen, setCalendarOpen] = useState(false);

  const days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

  const todayISO = () => {
    const d = new Date();
    d.setHours(0,0,0,0);
    return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
  };

  const fmtYYYYMMDD = (d) =>
    `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;

  // --- NEW: start of current week (Monday) + top-5 window (Mon–Fri) ---
  const startOfThisWeekMon = useMemo(() => {
    const d = new Date();
    d.setHours(0,0,0,0);
    const day = d.getDay();              // 0 Sun … 6 Sat
    const diffToMon = (day + 6) % 7;     // Sun->6, Mon->0, Tue->1, ...
    d.setDate(d.getDate() - diffToMon);  // go back to Monday
    return d;
  }, []);

  const isTop5OfCurrentWeek = (d) => {
    const start = startOfThisWeekMon;
    const end = new Date(start);
    end.setDate(start.getDate() + 4);    // Mon..Fri
    return d >= start && d <= end;
  };

  // next 7 days (starting tomorrow)
  const upcoming = useMemo(() => {
    const base = new Date();
    base.setHours(0,0,0,0);
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(base);
      d.setDate(base.getDate() + (i + 1));
      return d;
    });
  }, []);

  const slots = ["8:00 AM","9:00 AM","10:00 AM","11:00 AM","12:00 PM","1:00 PM","2:00 PM","3:00 PM","4:00 PM","6:00 PM"];

  const setDate = (dOrISO) => {
    const iso = typeof dOrISO === "string" ? dOrISO : fmtYYYYMMDD(dOrISO);
    onChange({ ...entry, date: iso, time: "" }); // reset time on date change
  };
  const setTime = (t) => onChange({ ...entry, time: t });

  const canContinue = entry.date && entry.time;

  // --- NEW: pretty display for selected date ---
  const prettyDate = entry.date
    ? new Date(entry.date + "T00:00:00").toLocaleDateString(undefined, {
        weekday: "short", month: "short", day: "numeric", year: "numeric",
      })
    : "";

  return (
    <div className="space-y-8">
      <h2 className="text-xl font-semibold">Pick Your Appointment</h2>

      {/* NEW: selection summary */}
      {(entry.date || entry.time) && (
        <div className="text-sm text-gray-700">
          Selected{entry.date ? `: ${prettyDate}` : ""}{entry.time ? ` at ${entry.time}` : ""}
        </div>
      )}

      {/* Dates */}
      <section>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium text-gray-700">Choose a date</h3>
          <button
            type="button"
            onClick={() => setCalendarOpen(true)}
            className="text-sm underline underline-offset-2 hover:opacity-80"
          >
            Select from calendar
          </button>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-7 gap-2">
          {upcoming.map((d) => {
            const key = fmtYYYYMMDD(d);
            const selected = entry.date === key;
            const inTop5 = isTop5OfCurrentWeek(d);

            return (
              <button
                key={key}
                type="button"
                onClick={() => setDate(d)}
                className={[
                  "rounded-lg border px-3 py-2 text-center transition",
                  selected ? "bg-black text-white border-black" : "bg-white hover:bg-gray-50",
                  inTop5 && !selected ? "ring-2 ring-blue-500" : "", // <-- highlight Mon–Fri of current week
                ].join(" ")}
                title={inTop5 ? "Mon–Fri of this week" : undefined}
              >
                <div className="text-xs">{days[d.getDay()]}</div>
                <div className="text-lg font-semibold">{d.getDate()}</div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Time slots (only after a date is chosen) */}
      {entry.date && (
        <section>
          <h3 className="text-sm font-medium text-gray-700 mb-2">Choose a time</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {slots.map((t) => {
              const selected = entry.time === t;
              return (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTime(t)}
                  className={`rounded-md border px-3 py-2 ${
                    selected ? "bg-black text-white border-black" : "bg-white hover:bg-gray-50"
                  }`}
                >
                  {t}
                </button>
              );
            })}
          </div>
        </section>
      )}

    
      {error && <p className="text-red-600 mt-3">{error}</p>}

      <div className="mt-6 flex gap-3 justify-center">
        <button
          type="button"
          onClick={onBack}
          disabled={sending}
          className="px-5 py-3 rounded-2xl border border-gray-300 hover:bg-gray-50"
        >
          Back
        </button>

        <button
  type="button"
  onClick={onSend}
  disabled={sending || !value.date || !value.time}
  aria-busy={sending}
  className={`px-6 py-3 rounded-2xl font-medium text-white
    ${sending ? "btn-brand-400 cursor-not-allowed opacity-60" : "btn-brand hover:btn-brand-700"}`}
>
  {sending ? (
    <span className="inline-flex items-center gap-2">
      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" opacity=".25"/>
        <path d="M4 12a8 8 0 018-8" stroke="currentColor" strokeWidth="4" fill="none"/>
      </svg>
      Sending…
    </span>
  ) : (
    "Submit Request"
  )}
</button>

      </div>

      {/* Calendar Modal */}
      {calendarOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
          onClick={() => setCalendarOpen(false)}
        >
          <div
            className="w-full max-w-sm rounded-xl bg-white p-4 shadow-lg"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="calendar-title"
          >
            <div className="flex items-center justify-between mb-3">
              <h4 id="calendar-title" className="input focus:ring-brand">Select date</h4>
              <button
                onClick={() => setCalendarOpen(false)}
                className="text-gray-500 hover:text-gray-800"
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            <label className="block text-sm text-gray-700 mb-1">Date</label>
            <input
              type="date"
              className="input focus:ring-brand"
              min={todayISO()}
              value={entry.date || ""}
              onChange={(e) => setDate(e.target.value)}
            />

            <div className="mt-4 flex gap-2 justify-end">
              <button
                type="button"
                onClick={() => setCalendarOpen(false)}
                className="px-4 py-2 rounded-md border hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => setCalendarOpen(false)}
                className="px-4 py-2 rounded-md bg-black text-white"
              >
                Done
              </button>
            </div>

            <p className="mt-2 text-xs text-gray-500">
              Tip: picking a new date resets the time — choose time after closing.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
