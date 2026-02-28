'use client';

import { useState, useEffect, use } from 'react';
import { fetchPublic } from '@/lib/api';
import { Product } from '@/types';
import EnquiryForm from '@/components/EnquiryForm';
import { Loader2, ArrowLeft, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function ProductDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const data = await fetchPublic(`/products/${slug}`);
        setProduct(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadProduct();
  }, [slug]);

  if (loading) return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <Loader2 className="animate-spin text-blue-900" size={48} />
    </div>
  );

  if (!product) return (
    <div className="text-center py-20">
      <h2 className="text-2xl font-bold">Product not found</h2>
      <Link href="/products" className="text-blue-900 underline mt-4 inline-block">Back to products</Link>
    </div>
  );

  return (
    <div className="bg-white pb-24">
      <div className="bg-brand-light py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/products" className="flex items-center gap-2 text-brand-primary hover:text-brand-navy transition mb-4 font-medium">
            <ArrowLeft size={16} /> Back to Products
          </Link>
          <h1 className="text-3xl md:text-5xl font-bold text-brand-navy">{product.name}</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Images */}
          <div className="space-y-6">
            <div className="aspect-square bg-brand-light rounded-3xl overflow-hidden shadow-lg border border-gray-100">
               <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1572013175023-73010b1473f3?auto=format&fit=crop&q=80')] bg-cover bg-center"></div>
            </div>
            {/* Thumbnails Placeholder */}
            <div className="grid grid-cols-4 gap-4">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="aspect-square bg-brand-light rounded-xl cursor-pointer hover:ring-2 hover:ring-brand-primary transition border border-gray-100"></div>
              ))}
            </div>
          </div>

          {/* Details & Form */}
          <div>
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-brand-navy mb-4 border-b-2 border-brand-accent pb-2 inline-block">Product Description</h2>
              <p className="text-gray-600 leading-relaxed text-lg">
                {product.description || "Indhu Industries provides the highest quality amusement and playground equipment. Our products are built with durability and safety as the top priority."}
              </p>
              
              <div className="mt-8 space-y-4">
                <h3 className="font-bold text-brand-navy">Key Features:</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {['High-grade FRP material', 'UV protected colors', 'Heavy-duty steel support', 'Child-safe finishes'].map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-gray-700">
                      <CheckCircle2 size={18} className="text-brand-accent" /> {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <EnquiryForm productId={product.id} productName={product.name} />
          </div>
        </div>

        {/* Specifications Table */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-brand-navy mb-8 text-center">Technical Specifications</h2>
          <div className="overflow-hidden border border-gray-200 rounded-2xl shadow-sm">
            <table className="w-full text-left">
              <thead className="bg-brand-light">
                <tr>
                  <th className="px-6 py-4 font-bold text-brand-navy">Feature</th>
                  <th className="px-6 py-4 font-bold text-brand-navy">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 text-gray-600 font-medium">Material</td>
                  <td className="px-6 py-4 text-brand-primary font-bold">FRP (Fiber Reinforced Plastic)</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-gray-600 font-medium">Age Group</td>
                  <td className="px-6 py-4 text-brand-primary font-bold">3 - 12 Years</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-gray-600 font-medium">Installation</td>
                  <td className="px-6 py-4 text-brand-primary font-bold">On-site by professional team</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-gray-600 font-medium">Warranty</td>
                  <td className="px-6 py-4 text-brand-primary font-bold">12 Months Manufacturing Warranty</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
