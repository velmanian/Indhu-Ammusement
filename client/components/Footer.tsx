import Link from 'next/link';
import Logo from './Logo';
import { MapPin, Mail, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-brand-secondary text-white pt-10 sm:pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
        <div className="sm:col-span-2 md:col-span-1">
          <Logo size="small" />
          <p className="text-white/80 mt-3 text-sm">
            Leading manufacturer of high-quality amusement equipment in Tirunelveli, Tamil Nadu.
          </p>
        </div>
        <div>
          <h4 className="text-md font-semibold mb-3 text-brand-accent">Quick Links</h4>
          <ul className="space-y-2 text-white/80 text-sm">
            <li><Link href="/" className="hover:text-white transition">Home</Link></li>
            <li><Link href="/products" className="hover:text-white transition">Products</Link></li>
            <li><Link href="/enquiry" className="hover:text-white transition">Enquiry</Link></li>
            <li><Link href="/admin/login" className="hover:text-white transition text-xs">Admin Login</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-md font-semibold mb-3 text-brand-accent">Contact</h4>
          <div className="space-y-2 text-white/80 text-sm">
            <div className="flex items-center">
              <MapPin size={14} className="mr-2 text-brand-accent" />
              <span>Tirunelveli, Tamil Nadu</span>
            </div>
            <div className="flex items-center">
              <Mail size={14} className="mr-2 text-brand-accent" />
              <span>info@indhu.com</span>
            </div>
            <div className="flex items-center">
              <Phone size={14} className="mr-2 text-brand-accent" />
              <span>+91 98765 43210</span>
            </div>
          </div>
        </div>
        <div>
          <h4 className="text-md font-semibold mb-3 text-brand-accent">Hours</h4>
          <p className="text-white/80 text-sm">Mon - Sat: 9:00 AM - 7:00 PM</p>
          <p className="text-white/80 text-sm mt-1">Sunday: Closed</p>
        </div>
      </div>
      <div className="mt-6 sm:mt-8 border-t border-white/10 pt-4 sm:pt-6 text-center text-white/40 text-xs">
        <p>&copy; {new Date().getFullYear()} Indhu Amusement Ride Industries. All rights reserved.</p>
      </div>
    </footer>
  );
}
