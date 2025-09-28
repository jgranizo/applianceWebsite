// Booking.jsx
import { useReducer, useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import ApplianceChoice from "./booking/ApplianceChoice";
import ContactInfo from "./booking/ContactInfo";
import AppointmentDate from "./booking/AppointmentDate";
import Confirmation from "./booking/Confirmation";
import BrandIssue from "./booking/BrandIssue";
import ServiceFee from "./booking/ServiceFee";
import emailjs from "@emailjs/browser";

const EMAILJS_SERVICE_ID = "service_vvhp0ch";
const EMAILJS_TEMPLATE_ID = "template_lgthsfh";
const EMAILJS_PUBLIC_KEY  = "6-omPnnu1h3-3gVUp";

/* ---------- Catalog ---------- */export const SERVICE_CATALOG = {
  appliance: {
    label: "Home Appliances",
    maxSelections: 2,
    services: [
      { name: "Refrigerator",        price: 100 },
      { name: "Dishwasher",          price: 100 },
      { name: "Washer Machine",      price: 100 },
      { name: "Dryer",               price: 100 },
      { name: "Microwave",           price: 100 },
      { name: "Oven",                price: 100 },
      { name: "Freezer",             price: 100},
      { name: "Stove",               price: 100 },


    ],
  },

  handyman: {
    label: "Handyman",
    maxSelections: 2,
    services: [
      { name: "TV Mounting",                 price: 100  },
      { name: "Furniture Assembly",          price: 100  },
      {name:"Snow Blowers",                  price:100},
      {name:"Pressure Washer",                price:100 }
    ],
  }


};


const initial = {
  // 0: category/services, 1: brandIssue, 2: contact, 3: appt, 4: confirmation
  step: 0,
  appliances: [], // selected services [{name, price}]
  brandIssue: [{ brand: "", issue: "" }, { brand: "", issue: "" }],
  contact: {
    firstName: "", lastName: "", email: "", phone: "",
    address: "", unit: "", city: "", state: "", zipCode: ""
  },
  appointment: { date: "", time: "" }
};

function reducer(state, action) {
  switch (action.type) {
    case "NEXT": return { ...state, step: Math.min(state.step + 1, 4) };
    case "BACK": return { ...state, step: Math.max(state.step - 1, 0) };
    case "SET":  return { ...state, ...action.payload };
    default:     return state;
  }
}

/* ---------- CategoryChoice (inline component) ---------- */
function CategoryChoice({ onPick }) {
  const entries = Object.entries(SERVICE_CATALOG); // [key, {label,...}]
  return (
    <section className="p-4">
      <h2 className="text-2xl font-semibold mb-2">What do you need?</h2>
      <p className="text-slate-600 mb-6">Choose a category to continue.</p>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {entries.map(([key, cfg]) => (
          <button
            key={key}
            type="button"
            onClick={() => onPick(key)}
            className="rounded-xl border border-slate-300 bg-white hover:bg-gray-50 px-4 py-3 text-left"
          >
            <div className="font-semibold">{cfg.label}</div>
            <div className="text-sm text-slate-600">{cfg.services.length} services</div>
          </button>
        ))}
      </div>
    </section>
  );
}

// Indeterminate top progress that creeps to ~90% while active
function useFakeProgress(active) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!active) { setProgress(0); return; }
    setProgress(8); // show immediately
    const id = setInterval(() => {
      setProgress(p => Math.min(p + 7 + Math.random() * 8, 90));
    }, 200);
    return () => clearInterval(id);
  }, [active]);

  return progress;
}

function TopProgress({ active }) {
  const progress = useFakeProgress(active);
  const visible = active || progress > 0;
  if (!visible) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-[1000] h-1 bg-pink-100">
      <div
        className="h-full bg-pink-600 transition-[width] duration-200 ease-out"
        style={{ width: `${active ? progress : 100}%` }}
      />
    </div>
  );
}


export default function Booking() {
  const [params, setParams] = useSearchParams();
  const urlCategory = params.get("category") || "";      // may be empty
  const presetServiceSlug = params.get("service") || "";

  const currentKey    = urlCategory || "";
  const catalog       = SERVICE_CATALOG[currentKey] || null;
  const categoryLabel = catalog?.label || "";
  const services      = catalog?.services || [];
  const maxSelections = catalog?.maxSelections || 1;

  const [state, dispatch] = useReducer(reducer, initial);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  const set  = (payload) => dispatch({ type: "SET", payload });
  const next = () => dispatch({ type: "NEXT" });
  const back = () => dispatch({ type: "BACK" });

  // Choose category from step 0 (CategoryChoice)
  const onPickCategory = (key) => {
    set({ appliances: [] });
    const p = new URLSearchParams(params);
    p.set("category", key);
    p.delete("service");
    setParams(p, { replace: true });
    // Stay on step 0 — it will now render ApplianceChoice because currentKey exists
  };

  // Back from services (also step 0) → return to CategoryChoice
  const backFromServices = () => {
    const p = new URLSearchParams(params);
    p.delete("category");
    p.delete("service");
    setParams(p, { replace: true });
    dispatch({ type: "SET", payload: { step: 0, appliances: [] } });
  };

  const changeCategory = backFromServices; // same behavior, used in header

  const fee = useMemo(
    () => (state.appliances || []).reduce((sum, s) => sum + (s.price || 0), 0),
    [state.appliances]
  );

  // --- Email ---
  const sendEmail = async () => {
    if (sending) return false;
    setError("");

    const {
      contact: { firstName, lastName, email, phone, address, unit, city, state: usState, zipCode },
      appointment: { date, time },
      appliances,
      brandIssue
    } = state;

    if (!email || !phone || !date || !time) {
      setError("Please fill email, phone, date and time.");
      return false;
    }

    const fullName = [firstName, lastName].filter(Boolean).join(" ");
    const location = [address, unit, city, usState, zipCode].filter(Boolean).join(", ");
    const dateTime = `${date} @ ${time}`;
    const serviceNames = (appliances || []).map(a => a?.name || "").filter(Boolean).join(", ");

    const servicesBlock = [
      serviceNames ? `Services: ${serviceNames}` : "",
      ...(brandIssue || []).map((bi, i) =>
        (bi.brand || bi.issue)
          ? `Brand/Issue ${i + 1}: ${(bi.brand || "").trim()} — ${(bi.issue || "").trim()}`
          : ""
      )
    ].filter(Boolean).join("\n");

    try {
      setSending(true);
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          name: fullName,
          email,
          phoneNumber: phone,
          
          dateTime,
          services: servicesBlock,
          location,
          category: currentKey || "(none)",
          categoryLabel: categoryLabel || "(none)",
          serviceSlug: presetServiceSlug,
          serviceFee: `$${fee}`,
        },
        EMAILJS_PUBLIC_KEY
      );
      return true;
    } catch (e) {
      console.error("EmailJS error:", e);
      setError("Oops, something went wrong. Please try again.");
      return false;
    } finally {
      setSending(false);
    }
  };

  // Step indicator (1..4 before confirmation)
  const showHeader = state.step < 4;
  const stepDisplay = state.step + 1;
  const totalSteps = 4;

  const showFee =
    (state.step === 0 && !!currentKey) || // services view inside step 0
    (state.step >= 1 && state.step <= 3); // brand, contact, appt

  return (
   <div className="max-w-3xl mx-auto p-4">
    <TopProgress active={sending} />
      {showHeader && (
        <div className="mb-4 flex items-center justify-between text-sm text-slate-600">
          <div>
            {categoryLabel && state.step >= 0 ? `${categoryLabel} • ` : ""}
            Step {stepDisplay} of {totalSteps}
          </div>

          {/* Change category shown when we're on services (step 0 with currentKey) or later steps */}
          {currentKey && state.step <= 3 && (
            <button
              type="button"
              onClick={changeCategory}
              className="underline underline-offset-2 hover:text-slate-900"
            >
              Change category
            </button>
          )}
        </div>
      )}

      {/* Step 0: either CategoryChoice (no category) OR ApplianceChoice (category present) */}
      {state.step === 0 && (
        !currentKey ? (
          <CategoryChoice onPick={onPickCategory} />
        ) : (
          <ApplianceChoice
            services={services}
            maxSelections={maxSelections}
            categoryLabel={categoryLabel}
            selected={state.appliances}
            setSelected={(appliances) => set({ appliances })}
            onNext={next}
            onBack={backFromServices}
            presetServiceSlug={presetServiceSlug}
          />
        )
      )}

      {/* Step 1: Brand & Issue */}
      {state.step === 1 && (
        <BrandIssue
          categoryKey={currentKey}
          categoryLabel={categoryLabel}
          value={state.brandIssue}
          amountSelected={state.appliances.length || 1}
          onChange={(brandIssue) => set({ brandIssue })}
          onNext={next}
          onBack={back}
        />
      )}

      {/* Step 2: Contact */}
      {state.step === 2 && (
        <ContactInfo
          value={state.contact}
          onChange={(contact) => set({ contact })}
          onNext={next}
          onBack={back}
        />
      )}

      {/* Step 3: Appointment + Send */}
      {state.step === 3 && (
        <AppointmentDate
          value={state.appointment}
          onChange={(appointment) => set({ appointment })}
          onSend={async () => {
            const ok = await sendEmail();
            if (ok) dispatch({ type: "SET", payload: { step: 4 } });
          }}
          onBack={back}
          sending={sending}
          error={error}
          setTodayAsMin
        />
      )}

      {/* Step 4: Confirmation */}
      {state.step === 4 && (
        <div className="w-full flex justify-center px-4">
          <Confirmation data={state} />
        </div>
      )}

      {/* Fee summary while in flow */}
      {showFee && <ServiceFee selected={state.appliances} visible total={fee} />}
    </div>
  );
}
