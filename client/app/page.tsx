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
    size: "large" // Takes up more space in grid
  },
  {
    id: 2,
    title: "Swings & Climbers",
    description: "Classic movement and agility builders.",
    image: "/CIRCULAR SWING.png",
    fallback: "/placeholder-swing.jpg",
    icon: Activity,
    color: "from-orange-500/20 to-brand-accent/80",
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
    size: "normal"
  },
  {
    id: 4,
    title: "Merry-Go-Rounds",
    description: "Spinning joy for all age groups.",
    image: "/DUCK RIDER.png",
    fallback: "/placeholder-merry-go-round.jpg",
    icon: Navigation,
    color: "from-purple-500/20 to-purple-700/80",
    size: "wide" // spans two columns
  },
  {
    id: 5,
    title: "Park Benches",
    description: "Comfortable seating blending with nature.",
    image: "/SEESAW.png", // Using SEESAW currently as placeholder
    fallback: "/placeholder-bench.jpg",
    icon: TreePine,
    color: "from-stone-500/20 to-stone-700/80",
    size: "normal"
  },
  {
    id: 6,
    title: "Dustbins",
    description: "Keeping play areas clean and aesthetic.",
    image: "/",
    fallback: "/placeholder-dustbin.jpg",
    icon: PaintBucket,
    color: "from-cyan-500/20 to-cyan-700/80",
    size: "normal"
  }
];

export default function Home() {
  const [activeExpertise, setActiveExpertise] = useState(expertiseCategories[0].id);
  const expertiseRef = useRef(null);
  const isExpertiseInView = useInView(expertiseRef, { once: true, amount: 0.1 });

  const activeCategory = expertiseCategories.find(c => c.id === activeExpertise) || expertiseCategories[0];
  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-[60vh] sm:min-h-[70vh] md:min-h-[80vh] lg:min-h-[85vh] flex items-center justify-center bg-brand-navy text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          {/* Hero Background Image */}
          <div className="w-full h-full bg-[url('/herobg.jpg')] bg-cover bg-center"></div>
          {/* Glassmorphism Overlay with Brand Colors */}
          <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/60 via-brand-secondary/50 to-brand-navy/70 backdrop-blur-sm z-10"></div>
        </div>

        <div className="relative z-20 text-center px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-center mb-6 sm:mb-8"
          >
            <div className="origin-center rounded-sm overflow-hidden scale-100 sm:scale-125 md:scale-150 lg:scale-200 xl:scale-250">
              <Logo size="default" />
            </div>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              delay: 0.3,
              duration: 0.8,
              staggerChildren: 0.05
            }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6"
          >
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              Crafting Joy through{' '}
            </motion.span>
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                delay: 0.8,
                duration: 0.5,
                type: "spring",
                stiffness: 100
              }}
              className="text-brand-accent inline-block"
            >
              Innovation
            </motion.span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-lg sm:text-xl md:text-2xl mb-8 sm:mb-10 text-gray-200"
          >
            Leading manufacturer of FRP slides, swings, and premium amusement equipment for a better tomorrow.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center"
          >
            <Link href="/products" className="bg-brand-accent text-brand-navy px-8 py-4 rounded-full font-bold text-lg flex items-center justify-center gap-2 hover:bg-opacity-90 transition">
              Explore Products <ArrowRight size={20} />
            </Link>
            <Link href="/enquiry" className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border-2 border-white px-8 py-4 rounded-full font-bold text-lg transition text-center">
              Enquire About Products
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-brand-navy mb-16">Why Choose Indhu Industries?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="p-8 border border-gray-100 rounded-2xl hover:shadow-xl transition group bg-white">
              <div className="w-16 h-16 bg-brand-light text-brand-primary rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:bg-brand-primary group-hover:text-white transition">
                <Shield size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-brand-navy">Uncompromising Safety</h3>
              <p className="text-gray-600">All our equipment meets stringent safety standards for worry-free play.</p>
            </div>
            <div className="p-8 border border-gray-100 rounded-2xl hover:shadow-xl transition group bg-white">
              <div className="w-16 h-16 bg-brand-light text-brand-secondary rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:bg-brand-secondary group-hover:text-white transition">
                <Settings size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-brand-navy">Custom Fabrication</h3>
              <p className="text-gray-600">FRP and steel components tailored to your specific site and design needs.</p>
            </div>
            <div className="p-8 border border-gray-100 rounded-2xl hover:shadow-xl transition group bg-white">
              <div className="w-16 h-16 bg-brand-light text-brand-accent rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:bg-brand-accent group-hover:text-brand-navy transition">
                <Truck size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-brand-navy">Global Delivery</h3>
              <p className="text-gray-600">Reliable logistics and installation services across India and beyond.</p>
            </div>
          </div>
        </div>
      </section>

      {/* New Enhanced Expertise Section */}
      <section className="py-24 bg-brand-light relative overflow-hidden" ref={expertiseRef}>
        {/* Background Decorative Elements */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-white/50 to-transparent pointer-events-none"></div>
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-brand-primary/5 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isExpertiseInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="max-w-2xl"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="h-1 w-12 bg-brand-accent rounded-full"></div>
                <span className="text-brand-accent font-bold tracking-widest uppercase text-sm">Discover</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-brand-navy leading-tight">
                Our Core <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-accent">Expertise</span>
              </h2>
              <p className="text-gray-500 mt-4 text-lg">
                Precision-engineered recreational solutions designed to transform ordinary spaces into extraordinary experiences.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isExpertiseInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Link href="/products" className="group flex items-center gap-3 bg-white px-6 py-3 rounded-full shadow-md text-brand-navy font-bold hover:shadow-lg hover:bg-brand-primary hover:text-white transition-all duration-300">
                View Full Catalog
                <div className="bg-brand-light text-brand-primary group-hover:bg-white group-hover:text-brand-primary p-2 rounded-full transition-colors">
                  <ArrowRight size={16} />
                </div>
              </Link>
            </motion.div>
          </div>

          <div
            className="flex flex-col lg:flex-row gap-8 lg:gap-12 min-h-[600px]"
            onMouseLeave={() => setActiveExpertise(expertiseCategories[0].id)}
          >

            {/* Left Side: Interactive List */}
            <div className="w-full lg:w-5/12 flex flex-col justify-center gap-4">
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
                    {/* Active Indicator Background */}
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

                        {/* Expandable Description */}
                        <div className={`overflow-hidden transition-all duration-500 ${isActive ? 'max-h-24 opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
                          <p className="text-gray-500 text-sm md:text-base leading-relaxed">
                            {category.description}
                          </p>
                          <Link href="/products" className="inline-flex items-center gap-1 mt-3 text-sm font-bold text-brand-primary hover:text-brand-accent transition-colors">
                            Explore Catalog <ArrowRight size={14} />
                          </Link>
                        </div>
                      </div>

                      {/* Right Chevron for inactive items */}
                      <div className={`transition-all duration-300 ${isActive ? 'opacity-0 translate-x-4' : 'opacity-100'}`}>
                        <ArrowRight size={20} className="text-gray-300 group-hover:text-brand-primary" />
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Right Side: Showcase Image Display */}
            <div className="w-full lg:w-7/12 relative rounded-[3rem] overflow-hidden shadow-2xl bg-gray-100 border-4 border-white/50 min-h-[400px]">
              {/* Background Glow */}
              <div className={`absolute inset-0 bg-gradient-to-br ${activeCategory.color} opacity-20 transition-colors duration-700 z-0`}></div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCategory.id}
                  initial={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
                  animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
                  transition={{ duration: 0.7, ease: "easeInOut" }}
                  className="absolute inset-0 z-10 p-8 flex items-center justify-center bg-white"
                >
                  <img
                    src={activeCategory.image}
                    alt={activeCategory.title}
                    className="w-full h-full object-contain filter drop-shadow-[0_20px_50px_rgba(0,0,0,0.15)]"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = activeCategory.fallback;
                      target.className = "w-full h-full object-cover opacity-80 mix-blend-multiply";
                    }}
                  />
                </motion.div>
              </AnimatePresence>

              {/* Overlay Content */}
              <div className="absolute inset-0 z-20 pointer-events-none flex flex-col justify-between p-8 md:p-12">
                <div className="self-end">
                  <motion.div
                    key={`badge-${activeCategory.id}`}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                    className="bg-white/80 backdrop-blur-md px-6 py-3 rounded-full shadow-lg border border-white flex items-center gap-3"
                  >
                    <div className="w-3 h-3 rounded-full bg-brand-accent animate-pulse"></div>
                    <span className="font-bold text-brand-navy tracking-wide text-sm uppercase">Featured Showcase</span>
                  </motion.div>
                </div>

                <div className="self-start">
                  <motion.div
                    key={`title-${activeCategory.id}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                  >
                    <Link href="/products" className="pointer-events-auto inline-flex items-center gap-3 bg-brand-navy/90 backdrop-blur-sm text-white px-8 py-4 rounded-2xl font-black shadow-xl hover:bg-brand-primary transition-colors hover:scale-105 duration-300">
                      View Details <ArrowRight size={18} />
                    </Link>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Location & Contact Section */}
      <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center max-w-2xl mx-auto">
            <div className="inline-flex items-center justify-center gap-2 bg-brand-primary/10 text-brand-primary px-4 py-2 rounded-full font-bold text-sm mb-4">
              <MapPin size={16} /> Our Location
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-brand-navy">
              Visit Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-accent">Manufacturing Unit</span>
            </h2>
            <p className="text-gray-500 mt-4 text-lg">
              Come see where the magic of play is manufactured with precision and care.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-6 bg-white rounded-[2.5rem] p-4 lg:p-6 shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-gray-100">
            {/* Contact Details Card */}
            <div className="w-full lg:w-1/3 bg-gradient-to-br from-brand-navy to-[#0a1930] rounded-[2rem] p-8 md:p-10 text-white relative overflow-hidden flex flex-col justify-between">
              <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-brand-accent/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

              <div className="relative z-10 flex-grow">
                <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mb-8 backdrop-blur-md border border-white/20">
                  <MapPin size={32} className="text-brand-accent" />
                </div>

                <h3 className="text-3xl font-bold mb-4">Indhu Play Equipment Manufacturer</h3>

                <div className="space-y-4 mb-8">
                  <p className="text-blue-100/80 text-lg leading-relaxed flex items-start gap-3">
                    <span className="mt-1">📍</span>
                    <span>
                      No1, Railway Feeder road,<br />
                      Maharaja Nagar,<br />
                      Tirunelveli, India, 627011
                    </span>
                  </p>
                  <p className="text-blue-100/80 text-lg font-medium flex items-center gap-3">
                    <span>📞</span> 093823 08899
                  </p>
                  <p className="text-blue-100/80 text-lg font-medium flex items-center gap-3 break-all">
                    <span>✉️</span> indhuamusement123@gmail.com
                  </p>
                </div>
              </div>

              <div className="relative z-10">
                <a
                  href="https://www.google.com/maps/dir//Indhu+Play+Equipment+Manufacturer"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-brand-primary hover:bg-brand-accent text-white w-full py-4 rounded-xl font-bold transition-colors text-lg shadow-lg hover:shadow-xl hover:-translate-y-1 transform duration-300"
                >
                  Get Directions <Navigation size={20} />
                </a>
              </div>
            </div>

            {/* Map Iframe */}
            <div className="w-full lg:w-2/3 h-[400px] lg:h-auto min-h-[450px] rounded-[2rem] overflow-hidden relative group shadow-inner bg-gray-100 border-2 border-dashed border-gray-200 hover:border-solid hover:border-brand-primary/50 transition-all duration-500">
              <div className="absolute inset-0 bg-brand-navy/5 pointer-events-none z-10 rounded-[2rem] group-hover:bg-transparent transition-colors duration-500"></div>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3943.832869427898!2d77.74251187477662!3d8.70741629134165!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b0413070faac21f%3A0x6cb1243862b2327e!2sIndhu%20Play%20Equipment%20Manufacturer!5e0!3m2!1sen!2sin!4v1773481525021!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Indhu Amusement Ride Industries Location"
                className="absolute inset-0 w-full h-full object-cover grayscale opacity-90 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
