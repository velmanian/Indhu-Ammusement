'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import Logo from './Logo';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const pathname = usePathname();

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
            {[
              { name: 'Home', href: '/' },
              { name: 'Products', href: '/products' },
              { name: 'Gallery', href: '/gallery' },
              { name: 'About Us', href: '/about' },
            ].map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative py-2 text-sm lg:text-base font-medium transition-colors duration-300 ${isActive ? 'text-white' : 'text-white/80 hover:text-white'
                    }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-1 bg-white rounded-full shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
                  )}
                </Link>
              );
            })}
            <Link href="/enquiry" className={`bg-brand-accent text-brand-navy px-4 py-2 sm:px-6 sm:py-2 rounded-full hover:bg-opacity-90 transition font-bold text-sm lg:text-base ${pathname === '/enquiry' ? 'ring-2 ring-white' : ''}`}>
              Enquiry
            </Link>
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
          {[
            { name: 'Home', href: '/' },
            { name: 'Products', href: '/products' },
            { name: 'Gallery', href: '/gallery' },
            { name: 'About Us', href: '/about' },
          ].map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`block py-2 text-base font-medium transition-colors ${isActive ? 'text-white border-l-4 border-white pl-2' : 'text-white/80'
                  }`}
              >
                {link.name}
              </Link>
            );
          })}
          <Link
            href="/enquiry"
            onClick={() => setIsOpen(false)}
            className={`block py-2 text-brand-accent font-bold ${pathname === '/enquiry' ? 'underline' : ''}`}
          >
            Enquiry
          </Link>
        </div>
      )}
    </nav>
  );
}
