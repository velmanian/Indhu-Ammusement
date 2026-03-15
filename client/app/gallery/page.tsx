import { Metadata } from 'next';
import GalleryClient from '@/components/GalleryClient';

export const metadata: Metadata = {
  title: "Product Gallery | Indhu Amusement Ride Industries",
  description: "View photos of our high-quality amusement rides, playground equipment, and outdoor gym installations across India.",
  keywords: [
    "Amusement Ride Gallery",
    "Playground Equipment Photos",
    "FRP Slides Gallery",
    "Park Equipment Installations",
    "Indhu Industries Portfolio"
  ],
  alternates: {
    canonical: '/gallery',
  },
};

export default function Gallery() {
  return <GalleryClient />;
}
