import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: {
    default: "Indhu Amusement Ride Industries | Leading Amusement Ride & Playground Equipment Manufacturer",
    template: "%s | Indhu Amusement Ride Industries"
  },
  description: "Premier manufacturer of high-quality FRP slides, swings, outdoor fitness gym equipment, and school playground systems in Tirunelveli, Tamil Nadu. Trusted by government and private sectors.",
  keywords: [
    "Amusement Ride Manufacturer in Tirunelveli",
    "Playground Equipment Manufacturer in Tirunelveli",
    "Outdoor Fitness Equipment Manufacturer in Tamil Nadu",
    "Multi Play Station Manufacturer in Tirunelveli",
    "Kids Playground Swings Supplier in Tirunelveli",
    "Horse Carousel Ride Manufacturer in Tamil Nadu",
    "School Playground Equipment Manufacturer in Tirunelveli",
    "Gym Machine Manufacturer in Tamil Nadu",
    "Trampoline Supplier in Tirunelveli",
    "Indhu Amusement Ride Industries Playground Equipment",
    "FRP Slides Manufacturer",
    "Park Equipment Manufacturer Tamil Nadu"
  ],
  authors: [{ name: "Indhu Amusement Ride Industries" }],
  creator: "Indhu Amusement Ride Industries",
  publisher: "Indhu Amusement Ride Industries",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://indhu-ammusement.vercel.app'), // Replace with actual domain if known
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Indhu Amusement Ride Industries | Manufacturer of Playground & Park Equipment",
    description: "High-quality FRP slides, swings, outdoor gym equipment, and more for parks and schools.",
    url: 'https://indhu-ammusement.vercel.app',
    siteName: 'Indhu Amusement Ride Industries',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Indhu Amusement Ride Industries | Manufacturer of Playground & Park Equipment",
    description: "High-quality FRP slides, swings, outdoor gym equipment, and more for parks and schools.",
  },
  verification: {
    google: "PPAzKbVE5ErjwfuZ6XvKokLVld2Tb4Z1YJQErpHZVwk",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1.0,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Indhu Amusement Ride Industries",
  "image": "https://indhu-ammusement.vercel.app/logo.png",
  "description": "Leading manufacturer of FRP slides, swings, and premium amusement equipment in Tirunelveli, Tamil Nadu.",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "No1, Railway Feeder road, Maharaja Nagar",
    "addressLocality": "Tirunelveli",
    "addressRegion": "Tamil Nadu",
    "postalCode": "627011",
    "addressCountry": "IN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 8.707416,
    "longitude": 77.742511
  },
  "url": "https://indhu-ammusement.vercel.app",
  "telephone": "+919382308899",
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ],
    "opens": "09:00",
    "closes": "19:00"
  },
  "priceRange": "$$"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.variable} ${playfairDisplay.variable} antialiased min-h-screen flex flex-col`}>
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
