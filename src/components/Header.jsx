import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="bg-white">
      <div className="max-w-3xl mx-auto px-4 py-12 text-center">
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight">
          Fast, Reliable Appliance Repair
          <span className="block text-brand mt-2">Dr. Appliances Repairs</span>
        </h1>

        <p className="mt-4 text-base md:text-lg text-muted max-w-2xl mx-auto">
          Same-day service. Certified techs. Fixed right the first time.
        </p>
{/* 
        <div className="mt-6 flex items-center justify-center gap-2 text-sm text-muted" aria-label="Rating 4.9 out of 5 based on 1,008 reviews">
          <div className="flex items-center gap-1 text-amber-500" aria-hidden="true">
           
            <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor"><path d="M10 15l-5.878 3.09L5.5 12 1 7.91 7.06 7 10 1.5 12.94 7 19 7.91 14.5 12l1.378 6.09z"/></svg>
            <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor"><path d="M10 15l-5.878 3.09L5.5 12 1 7.91 7.06 7 10 1.5 12.94 7 19 7.91 14.5 12l1.378 6.09z"/></svg>
            <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor"><path d="M10 15l-5.878 3.09L5.5 12 1 7.91 7.06 7 10 1.5 12.94 7 19 7.91 14.5 12l1.378 6.09z"/></svg>
            <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor"><path d="M10 15l-5.878 3.09L5.5 12 1 7.91 7.06 7 10 1.5 12.94 7 19 7.91 14.5 12l1.378 6.09z"/></svg>
            <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor"><path d="M10 15l-5.878 3.09L5.5 12 1 7.91 7.06 7 10 1.5 12.94 7 19 7.91 14.5 12l1.378 6.09z"/></svg>
          </div>
          <span className="font-semibold text-slate-900">4.9</span>
          <span>· Based on 1,008 reviews</span>
        </div> */}

        <div className="mt-8 flex items-center justify-center gap-3">
          <Link to="/booking" className="btn-brand">Book a Service</Link>
          <Link to="/contactus" className="btn-outline-brand">Contact Us</Link>
        </div>
      </div>
    </header>
  );
}
