import Link from 'next/link';
import Logo from './Logo';
import { MapPin, Mail, Phone, Instagram, Facebook, Link as LinkIcon, Briefcase } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-brand-navy text-white pt-10 sm:pt-24 pb-8 sm:pb-12 relative overflow-hidden">
      {/* Background Decorative Element */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-primary/10 rounded-full blur-3xl translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* Brand Info */}
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
            <div className="bg-white p-2 rounded-xl mb-3 sm:mb-6 inline-block shadow-lg">
              <Logo size="small" />
            </div>
            <p className="text-white/60 text-xs sm:text-base leading-relaxed max-w-xs">
              Leading manufacturer of high-quality amusement equipment in Tirunelveli, Tamil Nadu. 
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-center sm:text-left">
            <h4 className="text-brand-accent font-black tracking-widest uppercase text-[10px] mb-3 sm:mb-8">Navigation</h4>
            <ul className="space-y-2 sm:space-y-4 text-white/70 font-bold text-xs sm:text-base">
              <li><Link href="/" className="hover:text-brand-accent transition-colors">Home</Link></li>
              <li><Link href="/products" className="hover:text-brand-accent transition-colors">Our Products</Link></li>
              <li><Link href="/gallery" className="hover:text-brand-accent transition-colors">Photo Gallery</Link></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="text-center sm:text-left">
            <h4 className="text-brand-accent font-black tracking-widest uppercase text-[10px] mb-3 sm:mb-8">Contact</h4>
            <div className="space-y-3 sm:space-y-6 text-white/70">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-2">
                <MapPin size={16} className="text-brand-accent shrink-0" />
                <span className="text-[10px] sm:text-base">Railway Feeder road, Tirunelveli, 627011</span>
              </div>
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-2">
                <Phone size={16} className="text-brand-accent shrink-0" />
                <span className="text-[10px] sm:text-base font-black">+91 93823 08899</span>
              </div>
            </div>
          </div>

          {/* Connect */}
          <div className="text-center lg:text-left">
            <h4 className="text-brand-accent font-black tracking-widest uppercase text-[10px] mb-3 sm:mb-8">Follow</h4>
            <div className="flex justify-center lg:justify-start gap-3 mb-4 sm:mb-8">
              <a href="https://www.instagram.com/indhuamusementride/" target="_blank" rel="noopener noreferrer" className="w-9 h-9 sm:w-12 sm:h-12 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white" aria-label="Instagram">
                <Instagram size={18} />
              </a>
              <a href="https://www.facebook.com/p/Indhu-Amusement-Rides-100071764077150/" target="_blank" rel="noopener noreferrer" className="w-9 h-9 sm:w-12 sm:h-12 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white" aria-label="Facebook">
                <Facebook size={18} />
              </a>
            </div>
            <Link href="/enquiry" className="inline-flex items-center gap-2 bg-brand-accent text-brand-navy px-5 py-2.5 rounded-lg font-black text-[10px] uppercase tracking-widest active:scale-95 transition-all">
              Inquire Now
            </Link>
          </div>
        </div>

        <div className="mt-12 sm:mt-20 pt-6 sm:pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-white/30 font-bold tracking-widest uppercase text-center sm:text-left">
          <p>&copy; {new Date().getFullYear()} Indhu Industries. All Rights Reserved.</p>
          <div className="flex gap-4 sm:gap-6">
            <Link href="/admin/login" className="hover:text-white transition-colors">Admin Access</Link>
            <p>Made with Passion</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
