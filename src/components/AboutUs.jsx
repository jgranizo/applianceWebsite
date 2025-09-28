// AboutUs.jsx
export default function AboutUs() {
  return (
    <section className="max-w-5xl mx-auto px-4 py-12">
      {/* Header */}
      <header className="text-center mb-10">
        <h1 className="section-title text-3xl md:text-4xl">About Us</h1>
        <p className="text-muted mt-2 max-w-2xl mx-auto">
          Learn more about who we are, what we do, and why families trust Dr Appliances Repair.
        </p>
      </header>

      {/* Story */}
      <div className="card p-6 md:p-10 space-y-6 leading-relaxed">
        <h2 className="text-xl font-semibold text-[color:var(--text)]">
          Our Story
        </h2>
        <p>
          At <span className="font-semibold text-brand">Dr Appliances Repair</span>, 
          we know how important working appliances are for your daily life. 
          From keeping food fresh to making sure laundry gets done, your home runs on reliable machines. 
          That’s why we’ve built our reputation on providing quick, friendly, and professional service 
          that keeps households running smoothly.
        </p>
        <p>
          With years of hands-on experience, our team combines technical expertise with a customer-first approach. 
          We don’t just fix appliances — we restore peace of mind.
        </p>
      </div>

      {/* Mission & Values */}
      <div className="grid md:grid-cols-3 gap-6 mt-10">
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-[color:var(--text)]">⚡ Fast & Reliable</h3>
          <p className="text-sm text-muted mt-2">
            Same-week appointments and clear communication ensure you’re never left waiting or guessing.
          </p>
        </div>
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-[color:var(--text)]">🔧 Skilled Technicians</h3>
          <p className="text-sm text-muted mt-2">
            Our techs are trained across all major appliance brands and models, 
            from refrigerators and washers to ovens and dishwashers.
          </p>
        </div>
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-[color:var(--text)]">🤝 Customer First</h3>
          <p className="text-sm text-muted mt-2">
            Transparent pricing, respectful service, and guaranteed work. 
            We treat your home like our own.
          </p>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center mt-12">
        <a href="/booking" className="btn-brand">
          Book a Service Today
        </a>
      </div>
    </section>
  );
}
