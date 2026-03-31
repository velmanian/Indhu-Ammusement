import { Metadata } from 'next';
import { Shield, Target, Globe, ChevronRight } from 'lucide-react';

export const metadata: Metadata = {
  title: "About Us | Indhu Amusement Ride Industries",
  description: "Learn about our 10+ years of excellence in manufacturing amusement rides and playground equipment with a commitment to quality and safety.",
  keywords: [
    "Amusement Ride Manufacturer History",
    "Indhu Industries Founders",
    "Tirunelveli Manufacturing Unit",
    "Quality Standards Play Equipment"
  ],
  alternates: {
    canonical: '/about',
  },
};

export default function About() {
  const stats = [
    { value: "10+", label: "Years of Excellence" },
    { value: "500+", label: "Projects Completed" },
    { value: "12", label: "States Covered" },
    { value: "50K+", label: "Children Delighted" },
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
    <div className="bg-white font-sans overflow-hidden">
      {/* HERO */}
      <section className="bg-gradient-to-br from-brand-navy via-brand-primary to-brand-secondary text-white py-20 sm:py-32 pb-24 sm:pb-36 relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(198,211,0,0.15),transparent_50%),radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.05),transparent_40%)]"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center sm:text-left">
          <div className="max-w-4xl">
            <p className="text-brand-accent font-black tracking-widest uppercase text-xs sm:text-sm mb-4">Our Story</p>
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black mb-8 leading-[1.1] tracking-tight">
              Crafting <span className="text-brand-accent">Joyful Spaces</span> <br />
              Across India
            </h1>
            <p className="text-white/80 max-w-xl sm:mx-0 mx-auto leading-relaxed text-lg sm:text-xl">
              From government parks to luxury resorts — Indhu Industries has built India's most trusted name in FRP amusement equipment, one joyful installation at a time.
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-white" style={{ clipPath: 'ellipse(55% 100% at 50% 100%)' }}></div>
      </section>

      {/* STATS BAND */}
      <section className="py-12 sm:py-20 relative -mt-16 sm:-mt-24 z-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8">
            {stats.map((s) => (
              <div
                key={s.label}
                className="bg-white rounded-[2rem] p-6 sm:p-10 text-center shadow-2xl shadow-brand-primary/10 border border-gray-100 border-t-4 border-t-brand-accent transform hover:-translate-y-1 transition-all duration-300"
              >
                <p className="text-4xl sm:text-5xl lg:text-6xl font-black text-brand-navy mb-2 tracking-tighter">
                  {s.value}
                </p>
                <p className="text-[10px] sm:text-xs font-black text-gray-400 uppercase tracking-widest leading-none">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OUR JOURNEY */}
      <section className="py-24 bg-brand-light/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative order-2 lg:order-1">
              <div className="rounded-[3rem] overflow-hidden shadow-2xl aspect-square bg-brand-light border-4 border-white">
                <img
                  src="https://images.unsplash.com/photo-1572013175023-73010b1473f3?auto=format&fit=crop&q=80&w=800"
                  alt="Manufacturing"
                  className="w-full h-full object-cover opacity-90 mix-blend-multiply"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 rounded-3xl bg-gradient-to-br from-brand-navy to-brand-primary text-white p-8 shadow-2xl border-l-8 border-brand-accent max-w-[280px] hidden lg:block">
                <p className="text-xl font-bold leading-tight italic">
                  "Excellence in every ride we build."
                </p>
                <p className="text-xs text-white/60 mt-3 font-semibold uppercase tracking-widest">— Indhu Industries Promise</p>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-1 w-12 bg-brand-accent rounded-full"></div>
                <span className="text-brand-accent font-black tracking-widest uppercase text-xs">Who We Are</span>
              </div>
              <h2 className="text-4xl sm:text-5xl font-black text-brand-navy mb-8 leading-tight">
                Our Journey
              </h2>
              <div className="space-y-6 text-gray-600 text-lg sm:text-xl leading-relaxed">
                <p>
                  Founded in Tirunelveli, Tamil Nadu, Indhu Amusement Ride Industries started with a
                  simple mission: to create safe, durable, and innovative play solutions for children.
                  Today, we are one of the leading manufacturers of FRP slides, swings, and park
                  equipment in India.
                </p>
                <p>
                  Our state-of-the-art manufacturing unit combines traditional craftsmanship with
                  modern technology to deliver products that withstand the test of time and weather.
                </p>
              </div>
              <div className="mt-10 bg-white p-6 rounded-3xl border border-brand-primary/10 flex gap-5 items-center shadow-sm">
                <div className="w-16 h-16 bg-brand-light rounded-2xl flex items-center justify-center text-3xl shadow-inner">🏛️</div>
                <div>
                  <p className="font-black text-brand-navy text-sm sm:text-base mb-1">Government & Institutional Trust</p>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    Empanelled with multiple municipal corporations and state tourism departments for infrastructure development.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MISSION & VISION */}
      <section className="py-24 sm:py-36 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 sm:mb-24">
            <p className="text-brand-accent font-black tracking-widest uppercase text-sm mb-4">What Drives Us</p>
            <h2 className="text-4xl sm:text-6xl font-black text-brand-navy">
              Mission & <span className="text-brand-accent text-transparent bg-clip-text bg-gradient-to-r from-brand-accent to-amber-500">Vision</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">
            <div className="bg-white p-10 sm:p-14 rounded-[3rem] shadow-xl border border-gray-50 border-t-[12px] border-t-brand-primary">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-brand-primary to-brand-navy flex items-center justify-center mb-10 shadow-lg shadow-brand-primary/20">
                <Target size={40} className="text-white" />
              </div>
              <h3 className="text-3xl font-black text-brand-navy mb-6">Our Mission</h3>
              <p className="text-gray-500 text-lg sm:text-xl leading-relaxed italic">
                "To provide high-quality, safe, and engaging amusement equipment that inspires children and enhances recreational spaces — delivering maximum value to every client."
              </p>
            </div>
            <div className="bg-white p-10 sm:p-14 rounded-[3rem] shadow-xl border border-gray-50 border-t-[12px] border-t-brand-accent">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-brand-accent to-amber-600 flex items-center justify-center mb-10 shadow-lg shadow-brand-accent/20">
                <Globe size={40} className="text-white" />
              </div>
              <h3 className="text-3xl font-black text-brand-navy mb-6">Our Vision</h3>
              <p className="text-gray-500 text-lg sm:text-xl leading-relaxed italic">
                "To become a global leader in amusement ride manufacturing — known for innovation, enduring quality, and an unwavering commitment to child safety."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* TRUSTED CLIENTS */}
      <section className="py-20 bg-brand-light/40">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-brand-accent font-black tracking-widest uppercase text-sm mb-4">Our Clientele</p>
          <h2 className="text-3xl sm:text-4xl font-black text-brand-navy mb-12">Trusted by Government, Resorts & Beyond</h2>
          <div className="flex flex-wrap gap-4 justify-center max-w-5xl mx-auto">
            {clients.map((c) => (
              <div
                key={c.name}
                className={`px-6 py-3 rounded-full text-sm font-bold shadow-sm transition-transform hover:scale-105 cursor-default ${typeColors[c.type]}`}
              >
                {c.type === "Government" ? "🏛️" : c.type === "Resort" ? "🏨" : "🏘️"} <span className="ml-2">{c.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="py-24 sm:py-32 bg-brand-navy text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-primary/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-4xl sm:text-6xl font-black mb-8 leading-tight tracking-tight">
            Let's Create Spaces <br />
            That <span className="text-brand-accent">Inspire Joy</span>
          </h2>
          <p className="text-white/70 text-lg sm:text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
            Whether it's a government park, luxury resort, or residential community — our team is ready to deliver world-class amusement solutions.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-3 bg-brand-accent text-brand-navy px-12 py-5 rounded-2xl font-black text-lg hover:shadow-[0_0_40px_rgba(198,211,0,0.4)] transition-all transform hover:-translate-y-1 active:scale-95"
          >
            Get in Touch <ChevronRight size={24} />
          </a>
        </div>
      </section>
    </div>
  );
}