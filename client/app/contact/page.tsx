import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import ContactForm from '@/components/ContactForm';

export default function Contact() {
  return (
    <div className="bg-white">
      <section className="bg-brand-primary text-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4">Contact Us</h1>
          <p className="text-lg sm:text-xl text-brand-light max-w-2xl mx-auto opacity-90 px-4">
            Have questions? We are here to help you build the perfect play area.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16">
            <div>
              <h2 className="text-3xl font-bold text-brand-navy mb-8">Get In Touch</h2>
              <div className="space-y-8">
                <div className="flex gap-6 items-start">
                  <div className="bg-brand-light text-brand-primary p-4 rounded-2xl">
                    <MapPin size={28} />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-1 text-brand-navy">Our Location</h4>
                    <p className="text-gray-600">
                      No1, Railway Feeder road,<br />
                      Maharaja Nagar,<br />
                      Tirunelveli, India, 627011
                    </p>
                  </div>
                </div>
                <div className="flex gap-6 items-start">
                  <div className="bg-brand-accent/20 text-brand-navy p-4 rounded-2xl">
                    <Phone size={28} />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-1 text-brand-navy">Phone Number</h4>
                    <p className="text-gray-600">093823 08899</p>
                  </div>
                </div>
                <div className="flex gap-6 items-start">
                  <div className="bg-brand-light text-brand-secondary p-4 rounded-2xl">
                    <Mail size={28} />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-1 text-brand-navy">Email Address</h4>
                    <p className="text-gray-600">indhuamusement123@gmail.com</p>
                  </div>
                </div>
                <div className="flex gap-6 items-start">
                  <div className="bg-brand-light text-brand-accent p-4 rounded-2xl">
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-1 text-brand-navy">Proprietor</h4>
                    <p className="text-gray-600">JEYAMANI BABU</p>
                  </div>
                </div>
                <div className="flex gap-6 items-start">
                  <div className="bg-brand-light text-brand-navy p-4 rounded-2xl">
                    <Clock size={28} />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-1 text-brand-navy">Business Hours</h4>
                    <p className="text-gray-600">Mon - Sat: 09:00 AM - 07:00 PM</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 sm:mt-12 bg-brand-light p-6 sm:p-8 rounded-3xl border border-gray-100 border-l-4 sm:border-l-8 border-l-brand-accent">
                <p className="text-brand-navy font-medium italic">"We take pride in our quick response time and dedicated customer service. Reach out to us for a custom quote today!"</p>
              </div>
            </div>

            <div>
              <div className="bg-white p-8 sm:p-12 rounded-[32px] shadow-[0_32px_120px_-20px_rgba(0,0,0,0.1)] border border-gray-100 flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-brand-light text-brand-primary rounded-2xl flex items-center justify-center mb-6">
                  <Mail size={32} />
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-brand-navy mb-4">Product Enquiries</h2>
                <p className="text-gray-500 mb-10 max-w-sm">Use our dedicated professional enquiry portal to get a custom quote for your project.</p>
                <a
                  href="/enquiry"
                  className="w-full py-5 px-8 bg-brand-primary text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-brand-primary/20 hover:bg-brand-navy transition-all"
                >
                  Submit Form for Enquiry
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
