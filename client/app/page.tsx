'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Shield, Settings, Truck } from 'lucide-react';
import Logo from '@/components/Logo';

export default function Home() {
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

      {/* Product Categories Preview */}
      <section className="py-24 bg-brand-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-4xl font-bold text-brand-navy">Our Expertise</h2>
              <p className="text-gray-600 mt-2">Durable solutions for every recreational space.</p>
            </div>
            <Link href="/products" className="text-brand-primary font-bold hover:underline">View All Products</Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {/* Slides */}
            <Link href="/products" className="relative h-60 sm:h-64 md:h-72 lg:h-80 rounded-3xl overflow-hidden group cursor-pointer shadow-lg">
              <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/80 to-transparent z-10"></div>
              <div className="absolute inset-0 bg-gray-300 group-hover:scale-110 transition duration-500"></div>
              <div className="absolute inset-0 flex items-center justify-center p-4 bg-white">
                <img
                  src="/WAVE SLIDE.png"
                  alt="Wave Slide"
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/placeholder-slide.jpg';
                  }}
                />
              </div>
              <div className="absolute bottom-8 left-8 z-20 text-white">
                <h3 className="text-2xl font-bold">FRP Slides</h3>
                <button className="mt-2 text-sm text-brand-accent group-hover:text-white flex items-center gap-1 transition">
                  Explore <ArrowRight size={14} />
                </button>
              </div>
            </Link>

            {/* Swings */}
            <Link href="/products" className="relative h-60 sm:h-64 md:h-72 lg:h-80 rounded-3xl overflow-hidden group cursor-pointer shadow-lg">
              <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/80 to-transparent z-10"></div>
              <div className="absolute inset-0 bg-gray-300 group-hover:scale-110 transition duration-500"></div>
              <div className="absolute inset-0 flex items-center justify-center p-4 bg-white">
                <img
                  src="/CIRCULAR SWING.png"
                  alt="Circular Swing"
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/placeholder-swing.jpg';
                  }}
                />
              </div>
              <div className="absolute bottom-8 left-8 z-20 text-white">
                <h3 className="text-2xl font-bold">Swings & Climbers</h3>
                <button className="mt-2 text-sm text-brand-accent group-hover:text-white flex items-center gap-1 transition">
                  Explore <ArrowRight size={14} />
                </button>
              </div>
            </Link>

            {/* Outdoor Gym */}
            <Link href="/products" className="relative h-60 sm:h-64 md:h-72 lg:h-80 rounded-3xl overflow-hidden group cursor-pointer shadow-lg">
              <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/80 to-transparent z-10"></div>
              <div className="absolute inset-0 bg-gray-300 group-hover:scale-110 transition duration-500"></div>
              <div className="absolute inset-0 flex items-center justify-center p-4 bg-white">
                <img
                  src="/ROTATOR.png"
                  alt="Outdoor Gym Equipment"
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/placeholder-gym.jpg';
                  }}
                />
              </div>
              <div className="absolute bottom-8 left-8 z-20 text-white">
                <h3 className="text-2xl font-bold">Outdoor Gym</h3>
                <button className="mt-2 text-sm text-brand-accent group-hover:text-white flex items-center gap-1 transition">
                  Explore <ArrowRight size={14} />
                </button>
              </div>
            </Link>

            {/* Park Benches */}
            <Link href="/products" className="relative h-60 sm:h-64 md:h-72 lg:h-80 rounded-3xl overflow-hidden group cursor-pointer shadow-lg">
              <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/80 to-transparent z-10"></div>
              <div className="absolute inset-0 bg-gray-300 group-hover:scale-110 transition duration-500"></div>
              <div className="absolute inset-0 flex items-center justify-center p-4 bg-white">
                <img
                  src="/SEESAW.png"
                  alt="Park Bench"
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/placeholder-bench.jpg';
                  }}
                />
              </div>
              <div className="absolute bottom-8 left-8 z-20 text-white">
                <h3 className="text-2xl font-bold">Park Benches</h3>
                <button className="mt-2 text-sm text-brand-accent group-hover:text-white flex items-center gap-1 transition">
                  Explore <ArrowRight size={14} />
                </button>
              </div>
            </Link>

            {/* Merry-Go-Rounds */}
            <Link href="/products" className="relative h-60 sm:h-64 md:h-72 lg:h-80 rounded-3xl overflow-hidden group cursor-pointer shadow-lg">
              <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/80 to-transparent z-10"></div>
              <div className="absolute inset-0 bg-gray-300 group-hover:scale-110 transition duration-500"></div>
              <div className="absolute inset-0 flex items-center justify-center p-4 bg-white">
                <img
                  src="/DUCK RIDER.png"
                  alt="Merry-Go-Round"
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/placeholder-merry-go-round.jpg';
                  }}
                />
              </div>
              <div className="absolute bottom-8 left-8 z-20 text-white">
                <h3 className="text-2xl font-bold">Merry-Go-Rounds</h3>
                <button className="mt-2 text-sm text-brand-accent group-hover:text-white flex items-center gap-1 transition">
                  Explore <ArrowRight size={14} />
                </button>
              </div>
            </Link>

            {/* Dustbins */}
            <Link href="/products" className="relative h-60 sm:h-64 md:h-72 lg:h-80 rounded-3xl overflow-hidden group cursor-pointer shadow-lg">
              <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/80 to-transparent z-10"></div>
              <div className="absolute inset-0 bg-gray-300 group-hover:scale-110 transition duration-500"></div>
              <div className="absolute inset-0 flex items-center justify-center p-4 bg-white">
                <img
                  src="/logo.png"
                  alt="Dustbins"
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/placeholder-dustbin.jpg';
                  }}
                />
              </div>
              <div className="absolute bottom-8 left-8 z-20 text-white">
                <h3 className="text-2xl font-bold">Dustbins</h3>
                <button className="mt-2 text-sm text-brand-accent group-hover:text-white flex items-center gap-1 transition">
                  Explore <ArrowRight size={14} />
                </button>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
