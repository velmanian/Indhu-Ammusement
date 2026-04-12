'use client';

import { useState, useEffect } from 'react';
import { fetchPublic } from '@/lib/api';
import { Product } from '@/types';
import EnquiryForm from '@/components/EnquiryForm';
import { Loader2, ArrowLeft, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function ProductDetailClient({ slug }: { slug: string }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProduct = async () => {
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
  }, [slug]);


  if (loading) return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="animate-spin text-brand-primary" size={48} />
        <p className="text-gray-500 font-medium">Loading product details...</p>
      </div>
    </div>
  );

  if (!product) return (
    <div className="text-center py-24 bg-brand-light">
      <h2 className="text-3xl font-black text-brand-navy mb-4">Product Not Found</h2>
      <p className="text-gray-600 mb-8">The product you are looking for might have been moved or removed.</p>
      <Link href="/products" className="inline-flex items-center gap-2 bg-brand-primary text-white px-8 py-3 rounded-xl font-bold hover:bg-brand-secondary transition">
        <ArrowLeft size={20} /> Back to Products
      </Link>
    </div>
  );

  return (
    <div className="bg-white pb-24">
      {/* Hero Header */}
      <div className="bg-brand-light py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <Link href="/products" className="flex items-center gap-2 text-brand-primary hover:text-brand-navy transition mb-6 font-bold uppercase tracking-wider text-xs">
            <ArrowLeft size={14} /> Back to Products
          </Link>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="text-brand-primary font-black uppercase tracking-[0.2em] text-[10px] sm:text-xs mb-2 block">
                {product.category?.name || 'Amusement Equipment'}
              </span>
              <h1 className="text-4xl md:text-6xl font-black text-brand-navy leading-tight">{product.name}</h1>
            </div>
            {product.price && (
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 hidden md:block">
                  <span className="text-gray-400 text-xs block mb-1">Starting from</span>
                  <span className="text-2xl font-black text-brand-primary">₹{product.price}</span>
                </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24">
          {/* Images Section */}
          <div className="space-y-8">
            <div className="aspect-square bg-white rounded-[2.5rem] overflow-hidden shadow-2xl shadow-brand-navy/5 border border-gray-100 group">
                <img 
                  src={product.images?.[0] || '/placeholder-image.png'} 
                  alt={product.name}
                  className="w-full h-full object-contain p-8 group-hover:scale-105 transition-transform duration-700"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/placeholder-image.png';
                  }}
                />
            </div>
            
            {product.images && product.images.length > 1 && (
                <div className="grid grid-cols-4 gap-6">
                {product.images.map((img, i) => (
                    <div key={i} className="aspect-square bg-white rounded-2xl cursor-pointer hover:ring-4 hover:ring-brand-primary/20 transition-all border border-gray-100 overflow-hidden p-2">
                         <img src={img} alt={`${product.name} thumbnail ${i+1}`} className="w-full h-full object-contain" />
                    </div>
                ))}
                </div>
            )}
          </div>

          {/* Details & Action Section */}
          <div>
            <div className="mb-12">
              <div className="inline-block bg-brand-accent/20 text-brand-navy px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-6">
                Premium Specification
              </div>
              <h2 className="text-3xl font-black text-brand-navy mb-6">Product Description</h2>
              <p className="text-gray-600 leading-relaxed text-xl font-medium">
                {product.description || "Indhu Industries provides the highest quality amusement and playground equipment. Our products are built with durability and safety as the top priority, using high-grade FRP materials and robust engineering standards."}
              </p>
              
              <div className="mt-12 space-y-6">
                <h3 className="font-black text-brand-navy text-lg uppercase tracking-wide">Key Features & Benefits</h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                  {[
                    'High-grade FRP material', 
                    'Weather & UV protected colors', 
                    'Heavy-duty safety standards', 
                    'Child-safe smooth finishes',
                    'Corrosion resistant coating',
                    'Low maintenance design'
                  ].map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-gray-700 font-medium">
                      <CheckCircle2 size={20} className="text-brand-primary shrink-0" /> 
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="bg-brand-light p-8 sm:p-12 rounded-[3rem] border border-brand-primary/10 shadow-sm relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/5 rounded-full -mr-16 -mt-16"></div>
               <EnquiryForm productId={String(product._id || product.id)} productName={product.name} />
            </div>
          </div>
        </div>

        {/* Specifications Table */}
        <div className="mt-32">
          <div className="flex flex-col items-center mb-16 text-center">
            <span className="text-brand-primary font-black uppercase tracking-[0.3em] text-xs mb-4">Data Sheet</span>
            <h2 className="text-4xl sm:text-5xl font-black text-brand-navy">Technical Specifications</h2>
            <div className="h-1.5 w-24 bg-brand-accent rounded-full mt-6"></div>
          </div>
          
          <div className="max-w-4xl mx-auto overflow-hidden border border-gray-100 rounded-[2.5rem] shadow-2xl shadow-brand-navy/5">
            <table className="w-full text-left">
              <thead className="bg-brand-navy text-white">
                <tr>
                  <th className="px-10 py-6 font-black uppercase tracking-widest text-xs">Feature</th>
                  <th className="px-10 py-6 font-black uppercase tracking-widest text-xs">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 bg-white">
                {[
                  { label: 'Material', value: product.specifications?.material || 'FRP (Fiber Reinforced Plastic)' },
                  { label: 'Dimensions', value: product.specifications?.dimensions || 'Customizable as per site' },
                  { label: 'Age Group', value: product.specifications?.ageGroup || '3 - 12 Years' },
                  { label: 'Installation', value: 'On-site by professional engineering team' },
                  { label: 'Warranty', value: '12 Months Manufacturing Warranty' },
                  { label: 'Safety Standard', value: 'Industry Grade Safety Compliance' }
                ].map((spec, i) => (
                    <tr key={i} className="hover:bg-brand-light/50 transition-colors">
                        <td className="px-10 py-6 text-gray-500 font-bold">{spec.label}</td>
                        <td className="px-10 py-6 text-brand-navy font-black">{spec.value}</td>
                    </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
