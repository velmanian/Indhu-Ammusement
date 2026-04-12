import { Metadata } from 'next';
import ProductDetailClient from '@/components/ProductDetailClient';
import { fetchPublic } from '@/lib/api';
import { FALLBACK_PRODUCTS } from '@/lib/fallbackData';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  
  try {
    let product: any = null;
    try {
      product = await fetchPublic(`/products/${slug}`);
    } catch (apiError) {
      console.warn(`[Metadata] Backend offline or error fetching product ${slug}, using fallback.`);
      product = FALLBACK_PRODUCTS.find(p => p.slug === slug);
    }
    
    if (!product) {
      return {
        title: 'Product Not Found | Indhu Amusement Ride Industries',
      };
    }

    const title = `${product.name} | Amusement & Playground Equipment`;
    const description = product.description 
      ? product.description.substring(0, 160) 
      : `High-quality ${product.name} manufactured by Indhu Amusement Ride Industries. Durable, safe, and premium quality equipment in Tirunelveli, Tamil Nadu.`;

    return {
      title,
      description,
      keywords: [
        product.name,
        product.category?.name || 'Amusement Ride',
        'Tirunelveli Manufacturer',
        'Indhu Industries',
        'Playground Equipment India'
      ],
      openGraph: {
        title,
        description,
        images: product.images?.[0] ? [{ url: product.images[0] }] : [],
        type: 'article',
      },
      alternates: {
        canonical: `/products/${slug}`,
      },
    };
  } catch (error) {
    return {
      title: 'Product Details | Indhu Amusement Ride Industries',
    };
  }
}

export default async function ProductDetail({ params }: PageProps) {
  const { slug } = await params;
  let product = null;
  let jsonLd = null;

  try {
    try {
      product = await fetchPublic(`/products/${slug}`);
    } catch (apiError) {
      console.warn(`[Page] Backend offline or error fetching product ${slug}, using fallback.`);
      product = FALLBACK_PRODUCTS.find(p => p.slug === slug);
    }

    if (product) {
      jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: product.name,
        image: product.images || [],
        description: product.description || `Premium ${product.name} by Indhu Industries.`,
        brand: {
          '@type': 'Brand',
          name: 'Indhu Amusement Ride Industries',
        },
        offers: {
          '@type': 'Offer',
          availability: 'https://schema.org/InStock',
          priceCurrency: 'INR',
          price: product.price || 'Call for Price',
        },
        manufacturer: 'Indhu Amusement Ride Industries',
      };
    }
  } catch (e) {
    console.error('Error fetching product for JSON-LD:', e);
  }

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <ProductDetailClient slug={slug} />
    </>
  );
}
