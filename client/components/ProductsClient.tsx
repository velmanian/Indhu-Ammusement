'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Search, Filter, Loader2, ArrowRight } from 'lucide-react';
import { fetchPublic } from '@/lib/api';
import { FALLBACK_CATEGORIES, FALLBACK_PRODUCTS } from '@/lib/fallbackData';
import QuickViewModal from '@/components/QuickViewModal';

interface Product {
  _id?: string;
  id?: string | number;
  name: string;
  slug: string;
  description?: string;
  images?: string[];
  categoryId?: any;
  category?: {
    _id?: string;
    id?: string | number;
    name: string;
    slug: string;
  };
  specifications?: any;
  price?: number | string;
}

interface Category {
  _id?: string;
  id?: string | number;
  name: string;
  slug: string;
}

export default function ProductsClient() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [quickViewSlug, setQuickViewSlug] = useState<string | null>(null);

  const searchParams = useSearchParams();

  useEffect(() => {
    const loadData = async () => {
      try {
        const [prodData, catData] = await Promise.all([
          fetchPublic('/products'),
          fetchPublic('/categories'),
        ]);

        if (prodData && prodData.length > 0) {
          setProducts(prodData);
        } else {
          setProducts(FALLBACK_PRODUCTS as Product[]);
        }

        if (catData && catData.length > 0) {
          setCategories(catData);
        } else {
          setCategories(FALLBACK_CATEGORIES);
        }

        // Handle initial category filter from URL
        const categoryParam = searchParams.get('category');
        if (categoryParam) {
          setSelectedCategory(categoryParam);
        }
      } catch (err) {
        console.error('Error loading products, using fallback:', err);
        setProducts(FALLBACK_PRODUCTS as Product[]);
        setCategories(FALLBACK_CATEGORIES);
        
        // Handle initial category filter from URL even in fallback
        const categoryParam = searchParams.get('category');
        if (categoryParam) {
          setSelectedCategory(categoryParam);
        }
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [searchParams]);

  const getCategorySlug = (product: Product): string => {
    return product.category?.slug || 'other';
  };

  const getProductId = (product: Product): string => {
    return String(product._id || product.id || product.slug);
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === 'all' || getCategorySlug(product) === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div className="bg-brand-light min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="animate-spin text-brand-primary" size={48} />
          <p className="text-gray-500 font-medium">Loading products…</p>
        </div>
      </div>
    );
  }

  const categoryOptions = [
    { id: 'all', name: 'All Categories', slug: 'all' },
    ...categories.map(c => ({
      id: String(c._id || c.id),
      name: c.name,
      slug: c.slug,
    })),
  ];

  const productsByCategory = categoryOptions
    .filter(cat => cat.slug !== 'all')
    .map(cat => ({
      ...cat,
      products: products.filter(
        p =>
          getCategorySlug(p) === cat.slug &&
          p.name.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    }))
    .filter(cat => cat.products.length > 0);

  return (
    <div className="bg-brand-light min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <h1 className="text-3xl sm:text-5xl font-black text-brand-navy mb-8 sm:mb-12">Our Products</h1>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mb-12">
          <div className="relative flex-grow">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search products..."
              className="w-full pl-14 pr-6 py-3.5 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-primary bg-white text-base shadow-sm"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-white border border-gray-200 rounded-2xl flex items-center px-4 w-full sm:w-auto shadow-sm">
              <Filter className="text-brand-navy mr-2" size={18} />
              <select
                className="py-3.5 focus:outline-none bg-transparent text-brand-navy font-bold text-sm sm:text-base appearance-none cursor-pointer pr-8"
                style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0/0/24/24\' stroke=\'%230A2E4F\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'M19 9l-7 7-7-7\'/%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right center', backgroundSize: '1.2em' }}
                value={selectedCategory}
                onChange={e => setSelectedCategory(e.target.value)}
              >
                {categoryOptions.map(cat => (
                  <option key={cat.id} value={cat.slug}>{cat.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <p className="text-lg font-medium">No products available yet.</p>
            <p className="text-sm mt-2">Check back soon!</p>
          </div>
        ) : selectedCategory === 'all' ? (
          <>
            {productsByCategory.length === 0 ? (
              <div className="text-center py-20 text-gray-500">
                No products found matching your search.
              </div>
            ) : (
              productsByCategory.map(category => (
                <div key={category.slug} className="mb-20">
                  <div className="flex items-center gap-4 mb-8">
                    <h2 className="text-2xl sm:text-3xl font-black text-brand-navy whitespace-nowrap">
                      {category.name}
                    </h2>
                    <div className="h-1 flex-grow bg-gray-100 rounded-full"></div>
                  </div>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
                    {category.products.map(product => (
                      <ProductCard key={getProductId(product)} product={product} categoryName={category.name} onQuickView={setQuickViewSlug} />
                    ))}
                  </div>
                </div>
              ))
            )}
          </>
        ) : (
          <>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
              {filteredProducts.map(product => (
                <ProductCard
                  key={getProductId(product)}
                  product={product}
                  categoryName={product.category?.name || 'Other'}
                  onQuickView={setQuickViewSlug}
                />
              ))}
            </div>
            {filteredProducts.length === 0 && (
              <div className="text-center py-20 text-gray-500">
                No products found matching your search.
              </div>
            )}
          </>
        )}
      </div>
      
      <QuickViewModal 
        slug={quickViewSlug} 
        isOpen={!!quickViewSlug} 
        onClose={() => setQuickViewSlug(null)} 
      />
    </div>
  );
}

function ProductCard({ product, categoryName, onQuickView }: { product: Product; categoryName: string; onQuickView: (slug: string) => void }) {
  const productId = String(product._id || product.id || product.slug);
  return (
    <div className="bg-white rounded-2xl sm:rounded-[2rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 group border border-gray-100 flex flex-col h-full">
      <button onClick={() => onQuickView(product.slug)} className="block w-full text-left relative aspect-square bg-gray-50 overflow-hidden border-b border-gray-50 cursor-pointer">
        <img
          src={product.images?.[0] || '/placeholder-image.png'}
          alt={product.name}
          className="w-full h-full object-contain p-4 group-hover:scale-110 transition duration-700 bg-white"
          onError={e => {
            (e.target as HTMLImageElement).src = '/placeholder-image.png';
          }}
        />
        <span className="absolute top-2 left-2 sm:top-4 sm:left-4 bg-brand-primary/90 backdrop-blur-sm text-white text-[8px] sm:text-[10px] font-black px-2 py-1 sm:px-3 sm:py-1.5 rounded-full shadow-lg uppercase tracking-widest">
          {categoryName}
        </span>
      </button>
      <div className="p-4 sm:p-6 flex flex-col flex-grow">
        <button onClick={() => onQuickView(product.slug)} className="block w-full text-left group-hover:text-brand-primary transition">
          <h3 className="text-sm sm:text-xl font-black text-brand-navy group-hover:text-brand-primary transition leading-tight line-clamp-2 min-h-[2.5em] mb-2 sm:mb-3">
            {product.name}
          </h3>
        </button>
        <div className="flex flex-wrap gap-1.5 mb-4 mt-auto">
          {product.specifications?.material && (
            <span className="text-[8px] sm:text-[10px] bg-brand-light text-brand-primary px-2 py-0.5 rounded-md font-bold uppercase">
              {product.specifications.material}
            </span>
          )}
          {product.specifications?.dimensions && (
            <span className="text-[8px] sm:text-[10px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded-md font-bold uppercase">
              {product.specifications.dimensions}
            </span>
          )}
        </div>
        <div className="pt-3 border-t border-gray-50 mt-auto flex flex-col sm:flex-row gap-2">
          <button
            onClick={() => onQuickView(product.slug)}
            className="flex-1 bg-white border-2 border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white py-2.5 sm:py-3 rounded-xl font-black text-[10px] sm:text-sm tracking-widest uppercase transition-all flex items-center justify-center text-center"
          >
            Details
          </button>
          <button
            onClick={() => {
              const url = new URL(window.location.origin + '/enquiry');
              url.searchParams.set('productId', productId);
              window.location.href = url.toString();
            }}
            className="flex-1 bg-brand-navy hover:bg-brand-primary text-white py-2.5 sm:py-3 rounded-xl font-black text-[10px] sm:text-sm tracking-widest uppercase transition-all flex items-center justify-center gap-2 group/btn"
          >
            Enquire <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}
