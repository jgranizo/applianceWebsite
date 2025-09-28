import { useState } from "react";
import emailjs from "@emailjs/browser";

const EMAILJS_SERVICE_ID = "service_vvhp0ch";
const EMAILJS_TEMPLATE_ID = "template_lgthsfh";
const EMAILJS_PUBLIC_KEY  = "6-omPnnu1h3-3gVUp";

const SERVICES = [
  "Refrigerator","Dishwasher","Ice Machine","Dryer","Washer","Cooktop","Microwave",
  "Range","Oven","Wine Cooler","Freezer","Stove","Vent Hood","Garbage Disposal","Warmer Drawer"
];

export default function ContactUs() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    service: "",
    serviceOther: "", // 👈 NEW
  });
  const [sending, setSending] = useState(false);
  const [ok, setOk] = useState(false);
  const [err, setErr] = useState("");

  const onChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const validate = () => {
    if (!form.name.trim()) return "Name is required.";
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) return "Valid email is required.";
    if (!form.phone.trim()) return "Phone is required.";
    if (!form.message.trim()) return "Message is required.";
    // If user picked Other, require a description
    if (form.service === "Other" && !form.serviceOther.trim()) return "Please describe the service needed.";
    return "";
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (sending) return;
    const v = validate();
    if (v) { setErr(v); setOk(false); return; }

    setSending(true);
    setErr("");
    setOk(false);

    const pickedService =
      form.service === "Other"
        ? (form.serviceOther.trim() || "Other")
        : (form.service || "N/A");

    const templateParams = {
       
    
      name: form.name,
      email: form.email,
      phoneNumber: form.phone,
      subject: form.subject || "General Inquiry",
      message: form.message,
      service: pickedService, // 👈 sends custom text if “Other”
    };

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      );
      setOk(true);
      setForm({
        name: "", email: "", phone: "", subject: "", message: "",
        service: "", serviceOther: "" // 👈 reset
      });
    } catch (e) {
      console.error(e);
      setErr("We couldn’t send your message. Please try again.");
      setOk(false);
    } finally {
      setSending(false);
    }
  };

  return (
    <section className="max-w-3xl mx-auto px-4 py-12">
      <header className="text-center mb-8">
        <h1 className="section-title text-3xl md:text-4xl">Contact Us</h1>
        <p className="text-muted mt-2">
          Questions, quotes, or urgent repairs—reach out and we’ll help fast.
        </p>
      </header>

      {/* Direct Contact Info */}
      <div className="card p-6 mb-8 text-center space-y-2">
        <a href="tel:+1-978-751-2596" className="block text-lg font-semibold text-brand hover:text-brand-dark transition">
          (978) 751-2596
        </a>
        <a href="mailto:doctor.scrubber@yahoo.com" className="block text-lg font-semibold text-brand hover:text-brand-dark transition">
          doctor.scrubber@yahoo.com
        </a>
      </div>

      {/* Contact Form */}
      <form onSubmit={onSubmit} className="card p-6 space-y-5">
        {/* Row 1 */}
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="block text-sm text-[color:var(--muted)] mb-1">
              Full name *
            </label>
            <input
              id="name" name="name" type="text" autoComplete="name"
              value={form.name} onChange={onChange}
              className="w-full rounded-md border px-3 py-2 outline-none focus:ring-2 focus:ring-[color:var(--brand)]"
              placeholder="John Doe"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm text-[color:var(--muted)] mb-1">
              Email *
            </label>
            <input
              id="email" name="email" type="email" autoComplete="email"
              value={form.email} onChange={onChange}
              className="w-full rounded-md border px-3 py-2 outline-none focus:ring-2 focus:ring-[color:var(--brand)]"
              placeholder="you@email.com"
            />
          </div>
        </div>

        {/* Row 2 */}
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="phone" className="block text-sm text-[color:var(--muted)] mb-1">
              Phone *
            </label>
            <input
              id="phone" name="phone" type="tel" autoComplete="tel"
              value={form.phone} onChange={onChange}
              className="w-full rounded-md border px-3 py-2 outline-none focus:ring-2 focus:ring-[color:var(--brand)]"
              placeholder="(555) 555-5555"
            />
          </div>

          {/* Service + Other */}
          <div>
            <label htmlFor="service" className="block text-sm text-[color:var(--muted)] mb-1">
              Service
            </label>
            <select
              id="service" name="service" value={form.service} onChange={onChange}
              className="w-full rounded-md border px-3 py-2 bg-white outline-none focus:ring-2 focus:ring-[color:var(--brand)]"
            >
              <option value="">Select a service (optional)</option>
              {SERVICES.map((s) => <option key={s} value={s}>{s}</option>)}
              <option value="Other">Other (not listed)</option> {/* 👈 NEW */}
            </select>

            {form.service === "Other" && (
              <input
                id="serviceOther" name="serviceOther" type="text"
                value={form.serviceOther} onChange={onChange}
                className="mt-2 w-full rounded-md border px-3 py-2 outline-none focus:ring-2 focus:ring-[color:var(--brand)]"
                placeholder="Describe the service you need"
              />
            )}
          </div>
        </div>

        {/* Row 3 */}
        <div>
          <label htmlFor="subject" className="block text-sm text-[color:var(--muted)] mb-1">
            Subject
          </label>
          <input
            id="subject" name="subject" type="text"
            value={form.subject} onChange={onChange}
            className="w-full rounded-md border px-3 py-2 outline-none focus:ring-2 focus:ring-[color:var(--brand)]"
            placeholder="Brief topic"
          />
        </div>

        {/* Message */}
        <div>
          <label htmlFor="message" className="block text-sm text-[color:var(--muted)] mb-1">
            Message *
          </label>
          <textarea
            id="message" name="message" rows={5}
            value={form.message} onChange={onChange}
            className="w-full rounded-md border px-3 py-2 outline-none focus:ring-2 focus:ring-[color:var(--brand)]"
            placeholder="Tell us what's going on…"
          />
        </div>

        {/* Alerts */}
        {err && <p className="text-sm text-[color:var(--danger)]">{err}</p>}
        {ok && <p className="text-sm text-[color:var(--success)]">Thanks! Your message was sent. We’ll reply shortly.</p>}

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button type="submit" className="btn-brand" disabled={sending}>
            {sending ? "Sending…" : "Send Message"}
          </button>
          <a href="tel:+1-978-751-2596" className="btn-outline-brand">Call Us</a>
        </div>

        <p className="text-xs text-muted">
          By submitting, you agree we may contact you about your request. No spam—ever.
        </p>
      </form>
    </section>
  );
}
