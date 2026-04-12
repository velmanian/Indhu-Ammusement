import { Metadata } from 'next';
import ProductsClient from '@/components/ProductsClient';

export const metadata: Metadata = {
  title: "Playground & Park Equipment Catalog | Indhu Amusement Ride Industries",
  description: "Browse our extensive catalog of FRP slides, swings, outdoor gym equipment, and more. High-quality amusement equipment manufactured in Tirunelveli, Tamil Nadu.",
  keywords: [
    "Playground Equipment Manufacturer in Tirunelveli",
    "Kids Playground Swings Supplier",
    "Multi Play Station Manufacturer",
    "School Playground Equipment",
    "FRP Slides Catalog",
    "Outdoor Fitness Equipment Tamil Nadu"
  ],
  alternates: {
    canonical: '/products',
  },
};

import { Suspense } from 'react';

export default function Products() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-brand-light">Loading...</div>}>
      <ProductsClient />
    </Suspense>
  );
}
