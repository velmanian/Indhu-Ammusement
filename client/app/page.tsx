import { Metadata } from 'next';
import HomeClient from '@/components/HomeClient';

export const metadata: Metadata = {
  title: "Amusement Ride & Playground Equipment Manufacturer in Tirunelveli | Indhu Industries",
  description: "Indhu Amusement Ride Industries is the top-rated playground equipment & gym machine manufacturer in Tirunelveli, Tamil Nadu. Specializing in FRP slides, swings, and park equipment.",
  keywords: [
    "Amusement Ride Manufacturer in Tirunelveli",
    "Playground Equipment Manufacturer in Tirunelveli",
    "Indhu Amusement Ride Industries",
    "FRP Slides Manufacturer Tirunelveli",
    "Park Equipment Manufacturer Tamil Nadu",
    "Outdoor Gym Equipment Tirunelveli"
  ],
  alternates: {
    canonical: '/',
  },
};

export default function Home() {
  return <HomeClient />;
}
