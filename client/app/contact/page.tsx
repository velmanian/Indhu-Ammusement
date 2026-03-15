import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Contact Us | Indhu Amusement Ride Industries",
  description: "Get in touch for custom playground designs, amusement ride manufacturing, or project enquiries. Located in Tirunelveli, Tamil Nadu.",
  keywords: [
    "Contact Playground Manufacturer",
    "Indhu Industries Address",
    "Tirunelveli Play Equipment Factory",
    "Amusement Ride Quote"
  ],
  alternates: {
    canonical: '/contact',
  },
};

import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import ContactForm from '@/components/ContactForm';

export default function Contact() {
  return (
    <div className="bg-white">
      <section className="bg-brand-navy text-white py-20 sm:py-32 relative overflow-hidden">
        {/* Background Glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-primary/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center sm:text-left">
          <h1 className="text-4xl sm:text-7xl font-black mb-6 leading-tight">
            Let's Start a <br />
            <span className="text-brand-accent">Conversation</span>
          </h1>
          <p className="text-lg sm:text-2xl text-white/70 max-w-2xl sm:mx-0 mx-auto leading-relaxed">
            Have questions about our equipment or need a custom quote? Our engineering team is ready to help you build the perfect play area.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-brand-light/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
            <div className="space-y-10">
              <div>
                <h2 className="text-2xl sm:text-3xl font-black text-brand-navy mb-10 flex items-center gap-4">
                  Contact Information
                  <div className="h-1 flex-grow bg-brand-navy/10 rounded-full hidden sm:block"></div>
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
                  <div className="flex flex-col gap-4 p-6 bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all group">
                    <div className="w-12 h-12 bg-brand-navy text-white rounded-2xl flex items-center justify-center group-hover:bg-brand-primary transition-colors">
                      <MapPin size={24} />
                    </div>
                    <div>
                      <h4 className="text-sm font-black text-brand-navy uppercase tracking-widest mb-2">Our Location</h4>
                      <p className="text-gray-500 text-sm leading-relaxed">
                        No1, Railway Feeder road, Maharaja Nagar, Tirunelveli, 627011
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-4 p-6 bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all group">
                    <div className="w-12 h-12 bg-brand-navy text-white rounded-2xl flex items-center justify-center group-hover:bg-brand-primary transition-colors">
                      <Phone size={24} />
                    </div>
                    <div>
                      <h4 className="text-sm font-black text-brand-navy uppercase tracking-widest mb-2">Call Us</h4>
                      <p className="text-gray-500 text-sm font-bold">+91 93823 08899</p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-4 p-6 bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all group">
                    <div className="w-12 h-12 bg-brand-navy text-white rounded-2xl flex items-center justify-center group-hover:bg-brand-primary transition-colors">
                      <Mail size={24} />
                    </div>
                    <div>
                      <h4 className="text-sm font-black text-brand-navy uppercase tracking-widest mb-2">Email</h4>
                      <p className="text-gray-500 text-sm break-all font-medium">indhuamusement123@gmail.com</p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-4 p-6 bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all group">
                    <div className="w-12 h-12 bg-brand-navy text-white rounded-2xl flex items-center justify-center group-hover:bg-brand-primary transition-colors">
                      <Clock size={24} />
                    </div>
                    <div>
                      <h4 className="text-sm font-black text-brand-navy uppercase tracking-widest mb-2">Hours</h4>
                      <p className="text-gray-500 text-sm font-medium">Mon - Sat: 9 AM - 7 PM</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-brand-navy text-white p-8 sm:p-12 rounded-[2.5rem] relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-accent/20 rounded-full blur-[60px] translate-x-1/2 -translate-y-1/2"></div>
                <p className="text-lg sm:text-xl font-display italic relative z-10 leading-relaxed">
                  "We take pride in our precision engineering and dedicated customer service. Reach out to us for a world-class solution today."
                </p>
                <div className="mt-8 flex items-center gap-4">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-brand-navy font-black">JB</div>
                  <div>
                    <p className="font-black text-sm uppercase tracking-widest">Jeyamani Babu</p>
                    <p className="text-white/50 text-xs">Proprietor, Indhu Industries</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:sticky lg:top-32 lg:pt-0 pt-8">
              <div className="bg-white p-8 sm:p-12 rounded-[3.5rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] border border-gray-50 flex flex-col items-center text-center">
                <div className="w-20 h-20 bg-brand-light text-brand-primary rounded-[2rem] flex items-center justify-center mb-8 shadow-inner">
                  <Mail size={36} />
                </div>
                <h2 className="text-3xl font-black text-brand-navy mb-4">Project Enquiry</h2>
                <p className="text-gray-500 mb-10 max-w-xs leading-relaxed">Use our professional enquiry portal to get a detailed custom quote for your specific site requirements.</p>
                <a
                  href="/enquiry"
                  className="w-full py-5 px-8 bg-brand-navy text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-2xl shadow-brand-navy/30 hover:bg-brand-primary transition-all active:scale-95"
                >
                  Go to Enquiry Portal
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Implementation */}
      <section className="h-[400px] sm:h-[500px] w-full border-t border-gray-100">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3943.832869427898!2d77.74251187477662!3d8.70741629134165!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b0413070faac21f%3A0x6cb1243862b2327e!2sIndhu%20Play%20Equipment%20Manufacturer!5e0!3m2!1sen!2sin!4v1773481525021!5m2!1sen!2sin"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Indhu Amusement Ride Industries Location"
          className="w-full h-full grayscale hover:grayscale-0 transition-all duration-700"
        ></iframe>
      </section>
    </div>
  );
}
