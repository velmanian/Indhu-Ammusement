export default function About() {
  const stats = [
    { value: "10+", label: "Years of Excellence" },
    { value: "500+", label: "Projects Completed" },
    { value: "12", label: "States Covered" },
    { value: "50K+", label: "Children Delighted" },
  ];

  const testimonials = [
    {
      name: "Mr. Rajasekaran",
      title: "Director, Tamil Nadu Tourism Development Corporation",
      quote:
        "Indhu Industries delivered exceptional FRP slides and park equipment for our coastal resort project in Rameswaram. The quality, finish, and on-time delivery exceeded our expectations. A truly professional team.",
      project: "Government Tourism Resort, Rameswaram",
      type: "Government",
    },
    {
      name: "Ms. Priya Mohan",
      title: "General Manager, Silverine Resorts & Spa",
      quote:
        "We chose Indhu for our luxury resort's kids zone, and it was the best decision. The custom FRP equipment blends seamlessly with our premium aesthetic. Parents and children absolutely love it.",
      project: "Silverine Resorts Kids Zone, Ooty",
      type: "Resort",
    },
    {
      name: "Mr. Venkatesh Kumar",
      title: "Commissioner, Coimbatore City Municipal Corporation",
      quote:
        "Our Smart City park initiative required high-durability, weather-resistant play structures. Indhu Industries not only met the specifications but also provided excellent post-installation support.",
      project: "Smart City Park, Coimbatore",
      type: "Government",
    },
    {
      name: "Mrs. Deepa Suresh",
      title: "Operations Head, Palm Meadows Club",
      quote:
        "The entire playground setup was crafted with precision and care. Every piece reflects top-tier craftsmanship. Our members are delighted, and we've received glowing feedback from families.",
      project: "Palm Meadows Residential Club, Bengaluru",
      type: "Private",
    },
    {
      name: "Mr. Arumugam",
      title: "Executive Engineer, TNRD",
      quote:
        "We have awarded three consecutive tenders to Indhu Industries for district park development. Their consistency in quality and adherence to government standards is commendable.",
      project: "District Parks, Tirunelveli & Thoothukudi",
      type: "Government",
    },
    {
      name: "Ms. Kavitha Nair",
      title: "Property Manager, Seagreen Beach Resort",
      quote:
        "From concept to completion, Indhu's team was professional and creative. The marine-grade FRP structures have held up beautifully in our coastal environment. Highly recommended.",
      project: "Seagreen Beach Resort, Kovalam",
      type: "Resort",
    },
  ];

  const clients = [
    { name: "Tamil Nadu Tourism", type: "Government" },
    { name: "Smart City Mission", type: "Government" },
    { name: "TNRD Parks Division", type: "Government" },
    { name: "Silverine Resorts", type: "Resort" },
    { name: "Seagreen Beach Resort", type: "Resort" },
    { name: "Palm Meadows Club", type: "Private" },
    { name: "Coimbatore City Corp.", type: "Government" },
    { name: "The Tamara Coorg", type: "Resort" },
  ];

  const typeColors: Record<string, string> = {
    Government: "bg-brand-primary/10 text-brand-primary border border-brand-primary/20",
    Resort: "bg-amber-50 text-amber-700 border border-amber-200",
    Private: "bg-gray-100 text-gray-600 border border-gray-200",
  };

  return (
    <div
      className="bg-white"
      style={
        {
          "--brand-primary": "#1a5c96",
          "--brand-navy": "#0d2b45",
          "--brand-accent": "#f59e0b",
          "--brand-light": "#eef4fb",
        } as React.CSSProperties
      }
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=DM+Sans:wght@300;400;500;600&display=swap');

        .font-display { font-family: 'Cormorant Garamond', serif; }
        .font-body { font-family: 'DM Sans', sans-serif; }

        .brand-primary { color: #1a5c96; }
        .brand-navy { color: #0d2b45; }
        .brand-accent { color: #f59e0b; }
        .bg-brand-primary { background-color: #1a5c96; }
        .bg-brand-navy { background-color: #0d2b45; }
        .bg-brand-accent { background-color: #f59e0b; }
        .bg-brand-light { background-color: #eef4fb; }
        .text-brand-light { color: #eef4fb; }
        .text-brand-primary { color: #1a5c96; }
        .text-brand-navy { color: #0d2b45; }
        .text-brand-accent { color: #f59e0b; }
        .border-brand-accent { border-color: #f59e0b; }
        .border-brand-primary { border-color: #1a5c96; }
        .border-t-brand-primary { border-top-color: #1a5c96; }
        .border-t-brand-accent { border-top-color: #f59e0b; }

        .hero-bg {
          background: linear-gradient(135deg, #0d2b45 0%, #1a5c96 60%, #1e6aab 100%);
          position: relative;
          overflow: hidden;
        }
        .hero-bg::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: radial-gradient(circle at 20% 80%, rgba(245,158,11,0.15) 0%, transparent 50%),
                            radial-gradient(circle at 80% 20%, rgba(255,255,255,0.05) 0%, transparent 40%);
        }
        .hero-bg::after {
          content: '';
          position: absolute;
          bottom: -1px;
          left: 0; right: 0;
          height: 80px;
          background: white;
          clip-path: ellipse(55% 100% at 50% 100%);
        }

        .gold-line {
          width: 64px;
          height: 3px;
          background: linear-gradient(90deg, #f59e0b, #fcd34d);
          border-radius: 2px;
          margin-bottom: 1.5rem;
        }

        .stat-card {
          border-top: 3px solid #f59e0b;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }
        .stat-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 40px rgba(26,92,150,0.12);
        }

        .testimonial-card {
          border-left: 4px solid #f59e0b;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }
        .testimonial-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 40px rgba(13,43,69,0.1);
        }

        .client-badge {
          transition: transform 0.2s ease;
        }
        .client-badge:hover {
          transform: scale(1.04);
        }

        .quote-mark {
          font-family: 'Cormorant Garamond', serif;
          font-size: 5rem;
          line-height: 1;
          color: #f59e0b;
          opacity: 0.4;
          position: absolute;
          top: -10px;
          left: 20px;
        }

        .section-label {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #f59e0b;
          margin-bottom: 0.75rem;
        }

        .zigzag-divider {
          width: 100%;
          height: 40px;
          background: white;
          clip-path: polygon(0 0, 4% 100%, 8% 0, 12% 100%, 16% 0, 20% 100%, 24% 0, 28% 100%, 32% 0, 36% 100%, 40% 0, 44% 100%, 48% 0, 52% 100%, 56% 0, 60% 100%, 64% 0, 68% 100%, 72% 0, 76% 100%, 80% 0, 84% 100%, 88% 0, 92% 100%, 96% 0, 100% 100%, 100% 0);
        }
      `}</style>

      {/* HERO */}
      <section className="hero-bg text-white py-28 pb-32 font-body">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <p className="section-label" style={{ color: "#fcd34d" }}>Our Story</p>
            <h1
              className="font-display mb-6"
              style={{ fontSize: "clamp(2.8rem, 6vw, 5rem)", fontWeight: 700, lineHeight: 1.1 }}
            >
              Crafting Joyful Spaces <br />
              <span style={{ color: "#f59e0b" }}>Since a Decade</span>
            </h1>
            <p
              className="text-brand-light opacity-85 max-w-xl mx-auto leading-relaxed"
              style={{ fontSize: "1.1rem" }}
            >
              From government parks to luxury resorts — Indhu Industries has built India's most trusted name in FRP amusement equipment, one joyful installation at a time.
            </p>
          </div>
        </div>
      </section>

      {/* STATS BAND */}
      <section className="py-16 font-body" style={{ background: "#fff" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((s) => (
              <div
                key={s.label}
                className="stat-card bg-white rounded-2xl p-8 text-center shadow-sm"
              >
                <p
                  className="font-display font-bold brand-accent"
                  style={{ fontSize: "3rem", lineHeight: 1 }}
                >
                  {s.value}
                </p>
                <p className="text-gray-500 mt-2 text-sm font-medium">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OUR JOURNEY */}
      <section className="py-20 font-body" style={{ background: "#eef4fb" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Image side */}
            <div className="relative order-2 lg:order-1">
              <div
                className="rounded-3xl overflow-hidden shadow-2xl aspect-square"
                style={{ background: "#c8ddf0" }}
              >
                <img
                  src="https://images.unsplash.com/photo-1572013175023-73010b1473f3?auto=format&fit=crop&q=80&w=800"
                  alt="Indhu Industries manufacturing"
                  className="w-full h-full object-cover"
                  style={{ opacity: 0.9 }}
                />
              </div>
              <div
                className="absolute -bottom-6 -right-6 rounded-2xl text-white p-6 shadow-xl hidden lg:block"
                style={{
                  background: "linear-gradient(135deg, #0d2b45, #1a5c96)",
                  borderLeft: "5px solid #f59e0b",
                  maxWidth: "260px",
                }}
              >
                <p className="font-display text-lg font-semibold leading-snug">
                  "Excellence in every ride we build."
                </p>
                <p className="text-xs opacity-60 mt-2">— Indhu Industries Founding Promise</p>
              </div>
            </div>

            {/* Text side */}
            <div className="order-1 lg:order-2">
              <p className="section-label">Who We Are</p>
              <div className="gold-line"></div>
              <h2
                className="font-display font-bold brand-navy mb-6"
                style={{ fontSize: "clamp(2rem, 4vw, 3rem)", lineHeight: 1.2 }}
              >
                Our Journey
              </h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Founded in Tirunelveli, Tamil Nadu, Indhu Amusement Ride Industries started with a
                simple mission: to create safe, durable, and innovative play solutions for children.
                Today, we are one of the leading manufacturers of FRP slides, swings, and park
                equipment in India.
              </p>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Our state-of-the-art manufacturing unit combines traditional craftsmanship with
                modern technology to deliver products that withstand the test of time and weather.
                We have proudly served government municipal corporations, national tourism boards,
                five-star resorts, and private residential communities alike.
              </p>
              <div
                className="rounded-xl p-5 flex gap-4 items-start"
                style={{ background: "#fff", border: "1px solid #d1e3f0" }}
              >
                <span style={{ fontSize: "2rem" }}>🏛️</span>
                <div>
                  <p className="font-semibold brand-navy text-sm mb-1">Government & Institutional Trust</p>
                  <p className="text-gray-500 text-sm">
                    Empanelled with multiple municipal corporations and state tourism departments for
                    park infrastructure development under Smart City and AMRUT missions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MISSION & VISION */}
      <section className="py-20 font-body bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="section-label">What Drives Us</p>
            <div className="gold-line mx-auto"></div>
            <h2
              className="font-display font-bold brand-navy"
              style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
            >
              Mission & Vision
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100 border-t-4 border-t-brand-primary">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 text-white font-bold text-xl"
                style={{ background: "#1a5c96" }}
              >
                🎯
              </div>
              <h3 className="font-display text-2xl font-bold brand-navy mb-4">Our Mission</h3>
              <p className="text-gray-600 leading-relaxed">
                To provide high-quality, safe, and engaging amusement equipment that inspires
                children and enhances recreational spaces — delivering maximum value to every client,
                from government municipalities to luxury resort destinations.
              </p>
            </div>
            <div className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100 border-t-4 border-t-brand-accent">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 text-white font-bold text-xl"
                style={{ background: "#f59e0b" }}
              >
                🌏
              </div>
              <h3 className="font-display text-2xl font-bold brand-navy mb-4">Our Vision</h3>
              <p className="text-gray-600 leading-relaxed">
                To become a global leader in amusement ride manufacturing — known for innovation,
                enduring quality, and an unwavering commitment to child safety and environmental
                sustainability.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* TRUSTED CLIENTS */}
      <section className="py-16 font-body" style={{ background: "#eef4fb" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="section-label">Our Clientele</p>
            <div className="gold-line mx-auto"></div>
            <h2
              className="font-display font-bold brand-navy"
              style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)" }}
            >
              Trusted by Government, Resorts & Beyond
            </h2>
          </div>
          <div className="flex flex-wrap gap-3 justify-center">
            {clients.map((c) => (
              <div
                key={c.name}
                className={`client-badge px-5 py-3 rounded-full text-sm font-semibold ${typeColors[c.type]}`}
              >
                {c.type === "Government" ? "🏛️" : c.type === "Resort" ? "🏨" : "🏘️"} {c.name}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LEADERSHIP SECTION */}
      <section className="py-24 font-body" style={{ background: "#eef4fb" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="section-label">Leadership</p>
            <div className="gold-line mx-auto"></div>
            <h2
              className="font-display font-bold brand-navy"
              style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
            >
              The Vision Behind the Brand
            </h2>
          </div>

          <div className="max-w-4xl mx-auto bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row border border-brand-primary/10">
            {/* Image Side */}
            <div className="w-full md:w-2/5 bg-brand-navy p-8 flex flex-col items-center justify-center text-center relative overflow-hidden">
              <div className="absolute -top-24 -left-24 w-48 h-48 bg-brand-primary/40 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-brand-accent/40 rounded-full blur-3xl"></div>

              <div className="relative z-10">
                <div className="w-32 h-32 bg-white rounded-full mx-auto mb-6 shadow-xl border-4 border-brand-accent/30 flex items-center justify-center p-2">
                  {/* Placeholder for proprietor image if they want one later */}
                  <div className="w-full h-full bg-brand-light rounded-full flex items-center justify-center">
                    <span className="text-brand-primary font-display font-bold text-4xl">JB</span>
                  </div>
                </div>
                <h3 className="font-display font-bold text-white text-3xl mb-1">Jeyamani Babu</h3>
                <p className="text-brand-accent font-medium tracking-wider uppercase text-sm mb-4">Proprietor</p>
                <a
                  href="https://bni-tirunelveli.in/tirunelveli-cmy-veli/en-IN/memberdetails?encryptedMemberId=KPZAM2s6IJl6HGNGEwH%2BgA%3D%3D&name=Babu+Jeyamani"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-full text-xs tracking-wide transition-colors border border-white/20"
                >
                  View BNI Profile
                </a>
              </div>
            </div>

            {/* Content Side */}
            <div className="w-full md:w-3/5 p-8 md:p-12 flex flex-col justify-center">
              <div className="text-brand-accent mb-6">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>
              <p className="text-gray-600 text-lg leading-relaxed mb-6 font-medium">
                "Our goal has always been simple: to create environments where children can play safely and communities can thrive. At Indhu Amusement Ride Industries, we don't just manufacture equipment; we engineer joy, ensuring every product reflects our commitment to uncompromising quality and enduring durability."
              </p>
              <div className="border-t border-gray-100 pt-6">
                <p className="font-bold brand-navy">Indhu Play Equipment Manufacturer</p>
                <p className="text-gray-500 text-sm mt-1">Tirunelveli, Tamil Nadu</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section
        className="py-20 font-body text-white"
        style={{ background: "linear-gradient(135deg, #0d2b45 0%, #1a5c96 100%)" }}
      >
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="section-label" style={{ color: "#fcd34d" }}>Ready to Build?</p>
          <h2
            className="font-display font-bold mb-6"
            style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)" }}
          >
            Let's Create Spaces That Inspire Joy
          </h2>
          <p className="opacity-80 mb-8 leading-relaxed max-w-xl mx-auto">
            Whether it's a government park, luxury resort, or residential community — our team is
            ready to deliver world-class amusement solutions tailored to your vision.
          </p>
          <a
            href="/contact"
            className="inline-block font-semibold px-10 py-4 rounded-full shadow-lg transition-all duration-200 hover:scale-105"
            style={{ background: "#f59e0b", color: "#0d2b45", fontSize: "1rem" }}
          >
            Get in Touch →
          </a>
        </div>
      </section>
    </div>
  );
}