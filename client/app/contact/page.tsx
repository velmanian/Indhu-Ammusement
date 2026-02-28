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
                    <p className="text-gray-600">Tirunelveli, Tamil Nadu, India</p>
                  </div>
                </div>
                <div className="flex gap-6 items-start">
                  <div className="bg-brand-accent/20 text-brand-navy p-4 rounded-2xl">
                    <Phone size={28} />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-1 text-brand-navy">Phone Number</h4>
                    <p className="text-gray-600">+91 98765 43210</p>
                  </div>
                </div>
                <div className="flex gap-6 items-start">
                  <div className="bg-brand-light text-brand-secondary p-4 rounded-2xl">
                    <Mail size={28} />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-1 text-brand-navy">Email Address</h4>
                    <p className="text-gray-600">info@indhu.com</p>
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
              <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-100">
                <h2 className="text-xl sm:text-2xl font-bold text-brand-navy mb-4 sm:mb-6">Send Product Enquiry</h2>
                <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base">Fill out the form below and we'll get back to you shortly.</p>
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Map Placeholder */}
      <section className="h-96 bg-gray-200">
        <div className="w-full h-full flex items-center justify-center text-gray-500 font-bold">
          [ Google Maps Integration Placeholder ]
        </div>
      </section>
    </div>
  );
}
