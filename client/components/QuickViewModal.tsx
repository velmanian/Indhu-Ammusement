'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Loader2, CheckCircle2, ArrowRight } from 'lucide-react';
import { fetchPublic } from '@/lib/api';
import { Product } from '@/types';
import Link from 'next/link';

interface QuickViewModalProps {
  slug: string | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function QuickViewModal({ slug, isOpen, onClose }: QuickViewModalProps) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    if (!isOpen || !slug) return;
    
    const loadProduct = async () => {
      setLoading(true);
      setProduct(null);
      setActiveImage(0);
      try {
        const data = await fetchPublic(`/products/${slug}`);
        if (data) {
          setProduct(data);
        } else {
          throw new Error('Product not found in API');
        }
      } catch (err) {
        console.error('Error loading product, using fallback:', err);
        const fallbackProd = import('@/lib/fallbackData').then(m => m.FALLBACK_PRODUCTS.find(p => p.slug === slug));
        fallbackProd.then(data => {
            if(data) setProduct(data as Product);
        })
      } finally {
        setLoading(false);
      }
    };
    
    loadProduct();
  }, [slug, isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-brand-navy/60 backdrop-blur-sm"
            onClick={onClose}
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-12 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-white rounded-[2rem] shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col pointer-events-auto border border-gray-100"
            >
              {/* Header */}
              <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                <span className="font-bold text-brand-navy tracking-widest uppercase text-xs">
                  Quick View
                </span>
                <button
                  onClick={onClose}
                  className="bg-white text-gray-500 hover:text-red-500 p-2 rounded-full shadow-sm hover:shadow transition-all border border-gray-100"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Content area: Scrollable */}
              <div className="overflow-y-auto flex-grow p-6 sm:p-8 md:p-10 custom-scrollbar">
                {loading ? (
                  <div className="flex flex-col items-center justify-center h-64 gap-4">
                    <Loader2 className="animate-spin text-brand-primary" size={40} />
                    <p className="text-gray-500 font-medium">Fetching details...</p>
                  </div>
                ) : !product ? (
                  <div className="text-center py-24">
                    <h2 className="text-2xl font-black text-brand-navy mb-4">Product Not Found</h2>
                    <p className="text-gray-500 mb-8">This product may have been moved or removed.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16">
                    {/* Images Column */}
                    <div className="space-y-6">
                      <div className="aspect-square bg-gray-50 rounded-[2rem] overflow-hidden border border-gray-100 relative group">
                        <img 
                          src={product.images?.[activeImage] || '/placeholder-image.png'} 
                          alt={product.name}
                          className="w-full h-full object-contain p-8 group-hover:scale-105 transition-transform duration-700 mix-blend-multiply"
                          onError={(e) => {
                             (e.target as HTMLImageElement).src = '/placeholder-image.png';
                          }}
                        />
                        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-gray-100 shadow-sm">
                           <span className="text-[10px] font-black tracking-widest text-brand-primary uppercase">
                             {product.category?.name || 'Equipment'}
                           </span>
                        </div>
                      </div>
                      
                      {product.images && product.images.length > 1 && (
                          <div className="grid grid-cols-4 gap-4">
                          {product.images.map((img, i) => (
                              <button 
                                key={i} 
                                onClick={() => setActiveImage(i)}
                                className={`aspect-square bg-gray-50 rounded-2xl overflow-hidden p-2 transition-all border ${activeImage === i ? 'ring-2 ring-brand-primary border-transparent' : 'border-gray-200 hover:border-brand-primary/50'}`}
                              >
                                   <img src={img} alt={`${product.name} thumbnail ${i+1}`} className="w-full h-full object-contain mix-blend-multiply" />
                              </button>
                          ))}
                          </div>
                      )}
                    </div>

                    {/* Details Column */}
                    <div className="flex flex-col">
                      <h1 className="text-3xl sm:text-4xl font-black text-brand-navy leading-tight mb-4">
                        {product.name}
                      </h1>
                      
                      {product.price && (
                        <div className="text-2xl font-black text-brand-primary mb-6">
                          ₹{product.price}
                        </div>
                      )}
                      
                      <div className="w-16 h-1 bg-brand-accent rounded-full mb-8"></div>
                      
                      <p className="text-gray-600 leading-relaxed font-medium mb-8 text-sm sm:text-base">
                        {product.description || "Indhu Industries provides the highest quality amusement and playground equipment. Our products are built with durability and safety as the top priority."}
                      </p>

                      <div className="space-y-4 mb-10">
                        <h3 className="font-bold text-brand-navy uppercase tracking-widest text-xs">Technical Specs</h3>
                        <div className="grid grid-cols-2 gap-4">
                           <div className="bg-brand-light/50 p-4 rounded-xl border border-brand-primary/10">
                             <span className="block text-[10px] uppercase text-gray-400 font-bold tracking-wider mb-1">Material</span>
                             <span className="block text-brand-navy font-bold text-sm">{product.specifications?.material || 'FRP'}</span>
                           </div>
                           <div className="bg-brand-light/50 p-4 rounded-xl border border-brand-primary/10">
                             <span className="block text-[10px] uppercase text-gray-400 font-bold tracking-wider mb-1">Dimensions</span>
                             <span className="block text-brand-navy font-bold text-sm">{product.specifications?.dimensions || 'Custom'}</span>
                           </div>
                        </div>
                      </div>

                      <div className="mt-auto pt-8 border-t border-gray-100 flex flex-col sm:flex-row gap-4">
                        <Link 
                           href={`/products/${product.slug}`}
                           onClick={onClose}
                           className="flex-1 text-brand-navy font-bold text-sm py-4 rounded-xl border-2 border-gray-200 hover:border-brand-navy hover:bg-brand-navy hover:text-white transition-all text-center uppercase tracking-widest"
                        >
                          View Full Page
                        </Link>
                        <Link
                           href={`/enquiry?productId=${product._id || product.id}`}
                           className="flex-1 bg-brand-primary hover:bg-brand-secondary text-white font-bold text-sm py-4 rounded-xl shadow-lg shadow-brand-primary/30 transition-all flex items-center justify-center gap-2 uppercase tracking-widest group"
                        >
                          Enquire Now <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </div>

                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
