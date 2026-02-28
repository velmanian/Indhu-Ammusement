export default function About() {
  return (
    <div className="bg-white">
      {/* Header */}
      <section className="bg-brand-primary text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">About Indhu Industries</h1>
          <p className="text-xl text-brand-light max-w-2xl mx-auto opacity-90">
            Manufacturing quality amusement equipment for over a decade.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-brand-navy mb-6">Our Journey</h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Founded in Tirunelveli, Tamil Nadu, Indhu Amusement Ride Industries started with a simple mission: to create safe, durable, and innovative play solutions for children. Today, we are one of the leading manufacturers of FRP slides, swings, and park equipment in India.
              </p>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Our state-of-the-art manufacturing unit combines traditional craftsmanship with modern technology to deliver products that withstand the test of time and weather.
              </p>
              
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <h4 className="text-4xl font-bold text-brand-accent">10+</h4>
                  <p className="text-gray-500">Years Experience</p>
                </div>
                <div>
                  <h4 className="text-4xl font-bold text-brand-accent">500+</h4>
                  <p className="text-gray-500">Projects Completed</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square bg-brand-light rounded-3xl overflow-hidden shadow-2xl">
                 <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1572013175023-73010b1473f3?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-80"></div>
              </div>
              <div className="absolute -bottom-8 -left-8 bg-brand-navy text-white p-8 rounded-3xl hidden lg:block shadow-xl border-l-8 border-brand-accent">
                <p className="text-xl font-bold">"Excellence in every ride we build."</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-brand-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-white p-12 rounded-3xl shadow-sm border border-gray-100 border-t-4 border-t-brand-primary">
              <h3 className="text-2xl font-bold text-brand-navy mb-6">Our Mission</h3>
              <p className="text-gray-600 leading-relaxed">
                To provide high-quality, safe, and engaging amusement equipment that inspires children and enhances recreational spaces while ensuring maximum value for our clients.
              </p>
            </div>
            <div className="bg-white p-12 rounded-3xl shadow-sm border border-gray-100 border-t-4 border-t-brand-accent">
              <h3 className="text-2xl font-bold text-brand-navy mb-6">Our Vision</h3>
              <p className="text-gray-600 leading-relaxed">
                To become a global leader in the amusement ride manufacturing industry, known for our innovation, quality, and commitment to safety and environmental sustainability.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
