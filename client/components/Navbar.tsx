'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import Logo from './Logo';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down & past 100px
        setIsVisible(false);
      } else {
        // Scrolling up
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <nav className={`bg-brand-primary shadow-md sticky top-0 z-50 transition-transform duration-300 ${isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="bg-white px-2 py-1 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 flex items-center justify-center">
              <Logo size="default" />
            </Link>
          </div>

          <div className="hidden md:flex space-x-4 lg:space-x-6 items-center">
            <Link href="/" className="text-white/90 hover:text-white font-medium text-sm lg:text-base">Home</Link>
            <Link href="/products" className="text-white/90 hover:text-white font-medium text-sm lg:text-base">Products</Link>
            <Link href="/gallery" className="text-white/90 hover:text-white font-medium text-sm lg:text-base">Gallery</Link>
            <Link href="/about" className="text-white/90 hover:text-white font-medium text-sm lg:text-base">About Us</Link>
            <Link href="/enquiry" className="bg-brand-accent text-brand-navy px-4 py-2 sm:px-6 sm:py-2 rounded-full hover:bg-opacity-90 transition font-bold text-sm lg:text-base">Enquiry</Link>
          </div>

          <div className="md:hidden flex items-center space-x-3 text-white">
            <button onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-brand-primary pb-4 px-4 space-y-2 border-t border-white/10">
          <Link href="/" className="block py-2 text-white/90">Home</Link>
          <Link href="/products" className="block py-2 text-white/90">Products</Link>
          <Link href="/gallery" className="block py-2 text-white/90">Gallery</Link>
          <Link href="/about" className="block py-2 text-white/90">About Us</Link>
          <Link href="/enquiry" className="block py-2 text-brand-accent font-bold">Enquiry</Link>
        </div>
      )}
    </nav>
  );
}
