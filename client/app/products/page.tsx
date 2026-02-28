'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, Filter } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  category: string;
  image: string;
  description: string;
}

const products: Product[] = [
  // Slides
  {
    id: 1,
    name: "Wave Slide",
    category: "slides",
    image: "/WAVE SLIDE.png",
    description: "Exciting wave-shaped slide for maximum fun and thrill. Perfect for parks and recreational areas."
  },
  {
    id: 2,
    name: "Straight Slide",
    category: "slides",
    image: "/STRAIGHT SLIDE.png",
    description: "Classic straight slide design for smooth and fast descent. Durable FRP construction."
  },
  // Swings
  {
    id: 3,
    name: "Circular Swing",
    category: "swings",
    image: "/CIRCULAR SWING.png",
    description: "Spacious circular swing set for multiple users. Great for family parks and playgrounds."
  },
  {
    id: 4,
    name: "A-Leg Swing",
    category: "swings",
    image: "/‘A’ LEG SWING.png",
    description: "Sturdy A-leg swing frame design with excellent stability and safety features."
  },
  // Riders
  {
    id: 5,
    name: "Duck Rider",
    category: "riders",
    image: "/DUCK RIDER.png",
    description: "Fun duck-shaped rider that spins and rocks. Perfect for young children's entertainment."
  },
  {
    id: 6,
    name: "Horse Rider",
    category: "riders",
    image: "/HORSE RIDER.png",
    description: "Classic horse rider design that rocks back and forth. Durable construction for outdoor use."
  },
  // Other Equipment
  {
    id: 7,
    name: "Rotator",
    category: "other",
    image: "/ROTATOR.png",
    description: "Exciting rotating equipment for dynamic play experience. Great for developing balance and coordination."
  },
  {
    id: 8,
    name: "Seesaw",
    category: "other",
    image: "/SEESAW.png",
    description: "Traditional seesaw design for classic playground fun. Safe and durable construction."
  }
];

const categories = [
  { id: 'all', name: 'All Products', slug: 'all' },
  { id: 'slides', name: 'Slides', slug: 'slides' },
  { id: 'swings', name: 'Swings', slug: 'swings' },
  { id: 'riders', name: 'Riders', slug: 'riders' },
  { id: 'other', name: 'Other Equipment', slug: 'other' }
];

export default function Products() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-brand-light min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-brand-navy mb-8">Our Products</h1>
        
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mb-8 sm:mb-12">
          <div className="relative flex-grow">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input 
              type="text" 
              placeholder="Search products..." 
              className="w-full pl-10 sm:pl-12 pr-4 py-2.5 sm:py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-primary bg-white text-sm sm:text-base"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-4">
            <Filter className="text-brand-navy" size={20} />
            <select 
              className="bg-white border border-gray-200 rounded-xl px-3 py-2.5 sm:px-4 sm:py-3 focus:outline-none focus:ring-2 focus:ring-brand-primary text-brand-navy font-medium text-sm sm:text-base"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="all">All Categories</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.slug}>{cat.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Category Organization */}
        {selectedCategory === 'all' ? (
          <>
            {categories.filter(cat => cat.slug !== 'all').map(category => {
              const categoryProducts = products.filter(p => p.category === category.slug);
              if (categoryProducts.length === 0) return null;
              
              return (
                <div key={category.slug} className="mb-16">
                  <h2 className="text-3xl font-bold text-brand-navy mb-8 pb-2 border-b-2 border-brand-primary inline-block">
                    {category.name}
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {categoryProducts
                      .filter(product => product.name.toLowerCase().includes(searchTerm.toLowerCase()))
                      .map((product) => (
                        <div key={product.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition group border border-gray-100">
                          <div className="aspect-square bg-gray-100 overflow-hidden relative">
                            <img 
                              src={product.image} 
                              alt={product.name}
                              className="w-full h-full object-contain p-3 sm:p-4 group-hover:scale-105 transition duration-500 bg-white"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src = '/placeholder-image.png';
                              }}
                            />
                            <span className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-brand-primary text-white text-xs font-bold px-2 py-1 sm:px-3 sm:py-1 rounded-full shadow-lg">
                              {category.name}
                            </span>
                          </div>
                          <div className="p-4 sm:p-6">
                            <h3 className="text-lg sm:text-xl font-bold text-brand-navy group-hover:text-brand-primary transition">{product.name}</h3>
                            <p className="text-gray-500 text-xs sm:text-sm mt-2 line-clamp-2">{product.description}</p>
                            <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-0">
                              <span className="text-brand-primary font-bold text-sm">Price on Enquiry</span>
                              <button 
                                onClick={() => {
                                  // Create URL with product ID
                                  const url = new URL(window.location.origin + '/contact');
                                  url.searchParams.set('productId', product.id.toString());
                                  window.location.href = url.toString();
                                }}
                                className="bg-brand-accent text-brand-navy px-4 py-2 rounded-lg font-bold hover:bg-opacity-90 transition shadow-sm w-full sm:w-auto"
                              >
                                Enquire Now
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              );
            })}
          </>
        ) : (
          /* Product Grid for specific category */
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition group border border-gray-100">
                <div className="aspect-square bg-gray-100 overflow-hidden relative">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-contain p-4 group-hover:scale-105 transition duration-500 bg-white"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/placeholder-image.png';
                    }}
                  />
                  <span className="absolute top-4 left-4 bg-brand-primary text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                    {categories.find(cat => cat.slug === product.category)?.name || product.category}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-brand-navy group-hover:text-brand-primary transition">{product.name}</h3>
                  <p className="text-gray-500 text-sm mt-2 line-clamp-2">{product.description}</p>
                  <div className="mt-6 flex items-center justify-between">
                    <span className="text-brand-primary font-bold text-sm">Price on Enquiry</span>
                    <button 
                      onClick={() => {
                        // Create URL with product ID
                        const url = new URL(window.location.origin + '/contact');
                        url.searchParams.set('productId', product.id.toString());
                        window.location.href = url.toString();
                      }}
                      className="bg-brand-accent text-brand-navy px-4 py-2 rounded-lg font-bold hover:bg-opacity-90 transition shadow-sm"
                    >
                      Enquire Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {filteredProducts.length === 0 && (
          <div className="text-center py-20 text-gray-500">
            No products found matching your search.
          </div>
        )}
      </div>
    </div>
  );
}
