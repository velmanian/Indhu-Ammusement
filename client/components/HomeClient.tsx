'use client';

import Link from 'next/link';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ArrowRight, Shield, Settings, Truck, Play, Activity, Maximize, PaintBucket, TreePine, Navigation, MapPin } from 'lucide-react';
import Logo from '@/components/Logo';
import { useRef, useState } from 'react';

const expertiseCategories = [
  {
    id: 1,
    title: "FRP Slides",
    description: "Vibrant, durable slides for endless fun.",
    image: "/WAVE SLIDE.png",
    fallback: "/placeholder-slide.jpg",
    icon: Play,
    color: "from-blue-500/20 to-brand-primary/80",
    slug: "frp-slides",
    size: "large"
  },
  {
    id: 2,
    title: "Premium Swings",
    description: "Classic movement and agility builders.",
    image: "/CIRCULAR SWING.png",
    fallback: "/placeholder-swing.jpg",
    icon: Activity,
    color: "from-orange-500/20 to-brand-accent/80",
    slug: "swings-climbers",
    size: "normal"
  },
  {
    id: 3,
    title: "Outdoor Gym",
    description: "Fitness solutions for public spaces.",
    image: "/ROTATOR.png",
    fallback: "/placeholder-gym.jpg",
    icon: Maximize,
    color: "from-emerald-500/20 to-emerald-700/80",
    slug: "outdoor-gym",
    size: "normal"
  },
  {
    id: 4,
    title: "Seesaws",
    description: "Perfectly balanced fun for partners in play.",
    image: "/SEESAW.png",
    fallback: "/placeholder-seesaw.jpg",
    icon: Navigation,
    color: "from-purple-500/20 to-purple-700/80",
    slug: "swings-climbers",
    size: "wide"
  },
  {
    id: 5,
    title: "Spring Riders",
    description: "Bouncy joy for our youngest adventurers.",
    image: "/DUCK RIDER.png",
    fallback: "/placeholder-rider.jpg",
    icon: TreePine,
    color: "from-stone-500/20 to-stone-700/80",
    slug: "swings-climbers",
    size: "normal"
  },
  {
    id: 6,
    title: "Multiplay Systems",
    description: "Integrated play solutions for maximum engagement.",
    image: "/STRAIGHT SLIDE.png",
    fallback: "/placeholder-multiplay.jpg",
    icon: PaintBucket,
    color: "from-cyan-500/20 to-cyan-700/80",
    slug: "frp-slides",
    size: "normal"
  }
];

export default function HomeClient() {
  const [activeExpertise, setActiveExpertise] = useState(expertiseCategories[0].id);
  const expertiseRef = useRef(null);
  const isExpertiseInView = useInView(expertiseRef, { once: true, amount: 0.1 });

  const activeCategory = expertiseCategories.find(c => c.id === activeExpertise) || expertiseCategories[0];
  
  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-[70vh] sm:min-h-[85vh] flex items-center justify-center bg-brand-navy text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="w-full h-full bg-[url('/herobg.jpg')] bg-cover bg-center"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/70 via-brand-secondary/40 to-brand-navy/80 backdrop-blur-[2px] z-10"></div>
        </div>

        <div className="relative z-20 text-center px-6 max-w-4xl py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-center mb-8 sm:mb-12"
          >
            <div className="bg-white px-8 py-4 rounded-[2rem] sm:rounded-full shadow-2xl border-4 border-white/20 backdrop-blur-sm transform hover:scale-105 transition-transform duration-500">
              <Logo size="large" />
            </div>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-6 tracking-tight leading-tight"
          >
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="block sm:inline"
            >
              Crafting Joy through{' '}
            </motion.span>
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, duration: 0.5, type: "spring", stiffness: 100 }}
              className="text-brand-accent inline-block drop-shadow-[0_0_15px_rgba(198,211,0,0.3)]"
            >
              Innovation
            </motion.span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-lg sm:text-xl md:text-2xl mb-10 text-white/80 max-w-2xl mx-auto leading-relaxed"
          >
            Leading manufacturer of FRP slides, swings, and premium amusement equipment for a better tomorrow.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-stretch sm:items-center"
          >
            <Link href="/products" className="bg-brand-accent text-brand-navy px-8 py-4 rounded-2xl font-black text-lg flex items-center justify-center gap-2 hover:shadow-[0_0_25px_rgba(198,211,0,0.5)] transition-all duration-300">
              Explore Products <ArrowRight size={20} />
            </Link>
            <Link href="/enquiry" className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border-2 border-white/30 px-8 py-4 rounded-2xl font-black text-lg transition text-center">
              Enquire Now
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 sm:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16 sm:mb-24">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-brand-navy mb-6">Why Choose Indhu Industries?</h2>
            <div className="h-1.5 w-24 bg-brand-accent mx-auto rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-12">
            {[
              { icon: Shield, title: "Uncompromising Safety", desc: "All our equipment meets stringent safety standards for worry-free play.", color: "primary" },
              { icon: Settings, title: "Custom Fabrication", desc: "FRP and steel components tailored to your specific site and design needs.", color: "secondary" },
              { icon: Truck, title: "Global Delivery", desc: "Reliable logistics and installation services across India and beyond.", color: "accent" }
            ].map((f, i) => (
              <div key={i} className="p-8 border border-gray-100 rounded-[2rem] hover:shadow-2xl hover:shadow-brand-primary/5 transition-all duration-500 group bg-white flex flex-col items-center text-center">
                <div className={`w-20 h-20 rounded-2xl flex items-center justify-center mb-8 transition-all duration-500 bg-brand-light group-hover:bg-brand-${f.color} ${f.color === 'accent' ? 'group-hover:text-brand-navy' : 'group-hover:text-white'}`}>
                  <f.icon size={36} />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-brand-navy">{f.title}</h3>
                <p className="text-gray-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Expertise Section */}
      <section className="py-20 sm:py-32 bg-brand-light relative overflow-hidden" ref={expertiseRef}>
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-white/50 to-transparent pointer-events-none"></div>
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-brand-primary/5 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 sm:mb-16 gap-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isExpertiseInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="max-w-2xl"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="h-1 w-12 bg-brand-accent rounded-full"></div>
                <span className="text-brand-accent font-black tracking-widest uppercase text-xs sm:text-sm">Discover</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-brand-navy leading-tight">
                Our Core <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-accent">Expertise</span>
              </h2>
              <p className="text-gray-500 mt-4 text-sm sm:text-lg max-w-xl">
                Precision-engineered recreational solutions designed to transform ordinary spaces into extraordinary experiences.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isExpertiseInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="hidden sm:block"
            >
              <Link href="/products" className="group flex items-center gap-3 bg-white px-6 py-3 rounded-full shadow-md text-brand-navy font-bold hover:shadow-lg hover:bg-brand-primary hover:text-white transition-all duration-300">
                View Full Catalog
                <div className="bg-brand-light text-brand-primary group-hover:bg-white group-hover:text-brand-primary p-2 rounded-full transition-colors">
                  <ArrowRight size={16} />
                </div>
              </Link>
            </motion.div>
          </div>

          {/* Mobile category tabs */}
          <div className="lg:hidden flex overflow-x-auto pb-6 -mx-6 px-6 gap-3 no-scrollbar scroll-smooth snap-x">
            {expertiseCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveExpertise(category.id)}
                className={`flex-none snap-start flex items-center gap-2 px-5 py-3 rounded-2xl border transition-all duration-300 ${activeExpertise === category.id
                  ? 'bg-brand-primary border-brand-primary text-white shadow-lg'
                  : 'bg-white border-gray-100 text-gray-500 hover:border-brand-primary/30'
                  }`}
              >
                <category.icon size={18} />
                <span className="font-bold text-sm whitespace-nowrap">{category.title}</span>
              </button>
            ))}
          </div>

          <div
            className="flex flex-col lg:flex-row gap-8 lg:gap-12"
          >
            {/* Left: category list (desktop only) */}
            <div className="hidden lg:flex w-5/12 flex-col justify-center gap-4">
              {expertiseCategories.map((category, index) => {
                const Icon = category.icon;
                const isActive = activeExpertise === category.id;

                return (
                  <motion.div
                    key={category.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isExpertiseInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    onMouseEnter={() => setActiveExpertise(category.id)}
                    onClick={() => setActiveExpertise(category.id)}
                    className={`group relative p-6 rounded-3xl cursor-pointer overflow-hidden transition-all duration-500 border
                      ${isActive
                        ? 'bg-white shadow-xl shadow-brand-primary/10 border-brand-primary/20 scale-[1.02]'
                        : 'bg-white/50 border-transparent hover:bg-white/80'
                      }`}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-r ${category.color} opacity-0 transition-opacity duration-500 rounded-3xl ${isActive ? 'opacity-10' : 'group-hover:opacity-5'}`}></div>

                    <div className="relative z-10 flex items-center gap-6">
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm transition-all duration-500
                        ${isActive
                          ? `bg-gradient-to-br ${category.color} text-white shadow-lg scale-110 rotate-3`
                          : 'bg-gray-100 text-gray-500 group-hover:bg-gray-200 group-hover:text-brand-primary'
                        }`}
                      >
                        <Icon size={26} strokeWidth={isActive ? 2.5 : 2} />
                      </div>

                      <div className="flex-1">
                        <h3 className={`font-black text-xl transition-colors duration-300 ${isActive ? 'text-brand-navy' : 'text-gray-700'}`}>
                          {category.title}
                        </h3>
                        <div className={`overflow-hidden transition-all duration-500 ${isActive ? 'max-h-24 opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
                          <p className="text-gray-500 text-sm md:text-base leading-relaxed">
                            {category.description}
                          </p>
                        </div>
                      </div>

                      <div className={`transition-all duration-300 ${isActive ? 'opacity-0 translate-x-4' : 'opacity-100'}`}>
                        <ArrowRight size={20} className="text-gray-300 group-hover:text-brand-primary" />
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Right: vertical card — image top, content bottom */}
            <div className="w-full lg:w-7/12 relative rounded-[2.5rem] sm:rounded-[3rem] overflow-hidden shadow-2xl bg-white border border-gray-100 flex flex-col">
              <div className={`absolute inset-0 bg-gradient-to-br ${activeCategory.color} opacity-10 z-0`}></div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCategory.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4, ease: "circOut" }}
                  className="relative z-10 w-full flex flex-col flex-1"
                >
                  {/* Image — full width, fixed height, no padding, no gaps */}
                  <div className="w-full h-full object-cover object-top">
                    <img
                      src={activeCategory.image}
                      alt={activeCategory.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = activeCategory.fallback;
                        target.className = "w-full h-full object-contain opacity-20 p-12";
                      }}
                    />
                  </div>

                  {/* Content — sits flush below the image */}
                 <div className="p-8 sm:p-10 flex flex-col items-center text-center justify-center">
  <div className="flex items-center gap-3 mb-4">
    <span className="bg-brand-primary/10 text-brand-primary px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
      Indhu Quality
    </span>
  </div>

  <h3 className="text-2xl sm:text-3xl font-black text-brand-navy mb-3">
    {activeCategory.title}
  </h3>

  <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-8 font-medium">
    {activeCategory.description}
  </p>

  <Link
    href={`/products?category=${activeCategory.slug}`}
    className="inline-flex items-center gap-3 bg-brand-navy text-white px-8 py-4 rounded-2xl font-bold text-lg hover:shadow-xl transition-all active:scale-95 group w-fit"
  >
    Browse {activeCategory.title}
    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
  </Link>
</div>
                </motion.div>
              </AnimatePresence>

              {/* Featured pill — top right over image */}
              <div className="absolute top-6 right-6 z-20">
                <div className="bg-white/80 backdrop-blur-md px-4 py-2 rounded-full shadow-lg border border-white flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-brand-accent animate-pulse"></div>
                  <span className="font-bold text-brand-navy tracking-wide text-xs uppercase">Featured</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Location & Contact Section */}
      <section className="py-20 sm:py-32 bg-white relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-12 text-center max-w-2xl mx-auto">
            <div className="inline-flex items-center justify-center gap-2 bg-brand-primary/10 text-brand-primary px-4 py-2 rounded-full font-black text-xs sm:text-sm mb-4">
              <MapPin size={16} /> OUR LOCATION
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-brand-navy mb-6">
              Visit Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-accent">Manufacturing Unit</span>
            </h2>
            <p className="text-gray-500 text-sm sm:text-lg">
              Come see where the magic of play is manufactured with precision and care in the heart of Tirunelveli.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-6 bg-white rounded-[2rem] sm:rounded-[3rem] p-3 sm:p-6 shadow-[0_20px_60px_rgba(0,0,0,0.05)] border border-gray-100">
            <div className="w-full lg:w-1/3 bg-brand-navy rounded-[1.5rem] sm:rounded-[2.5rem] p-8 sm:p-12 text-white relative overflow-hidden flex flex-col justify-between min-h-[400px]">
              <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mb-8 backdrop-blur-md border border-white/20">
                  <MapPin size={28} className="text-brand-accent" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-black mb-8 leading-tight">Indhu Play Equipment Manufacturer</h3>
                <div className="space-y-6 mb-10">
                  <div className="flex items-start gap-4">
                    <span className="text-brand-accent mt-1 text-xl">📍</span>
                    <p className="text-white/70 text-base sm:text-lg leading-relaxed">
                      No1, Railway Feeder road,<br />
                      Maharaja Nagar, Tirunelveli,<br />
                      Tamil Nadu, India, 627011
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-brand-accent text-xl">📞</span>
                    <p className="text-white/70 text-lg sm:text-xl font-bold">+91 93823 08899</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-brand-accent text-xl">✉️</span>
                    <p className="text-white/70 text-base sm:text-lg break-all">indhuamusement123@gmail.com</p>
                  </div>
                </div>
              </div>

              <div className="relative z-10 pt-4">
                <a
                  href="https://www.google.com/maps/dir//Indhu+Play+Equipment+Manufacturer"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 bg-brand-accent text-brand-navy w-full py-5 rounded-2xl font-black transition-all hover:shadow-[0_0_30px_rgba(198,211,0,0.3)] hover:-translate-y-1 text-lg"
                >
                  GET DIRECTIONS <Navigation size={20} />
                </a>
              </div>
            </div>

            <div className="w-full lg:w-2/3 h-[300px] sm:h-[450px] lg:h-auto rounded-[1.5rem] sm:rounded-[2.5rem] overflow-hidden relative shadow-inner">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3943.832869427898!2d77.74251187477662!3d8.70741629134165!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b0413070faac21f%3A0x6cb1243862b2327e!2sIndhu%20Play%20Equipment%20Manufacturer!5e0!3m2!1sen!2sin!4v1773481525021!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Maps Location"
                className="absolute inset-0 w-full h-full grayscale-[0.2] hover:grayscale-0 transition-all duration-700"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}