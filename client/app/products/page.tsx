'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, Filter, Loader2 } from 'lucide-react';
import { fetchPublic } from '@/lib/api';
import { FALLBACK_CATEGORIES, FALLBACK_PRODUCTS } from '@/lib/fallbackData';

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

export default function Products() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

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
          console.log('No products found, using fallback data');
          setProducts(FALLBACK_PRODUCTS as Product[]);
        }

        if (catData && catData.length > 0) {
          setCategories(catData);
        } else {
          setCategories(FALLBACK_CATEGORIES);
        }
      } catch (err) {
        console.error('Error loading products, using fallback data:', err);
        // Fallback when API fails
        setProducts(FALLBACK_PRODUCTS as Product[]);
        setCategories(FALLBACK_CATEGORIES);
        // setError('Failed to load products. Please refresh the page.');
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const getCategoryName = (product: Product): string => {
    return product.category?.name || 'Other';
  };

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

  if (error) {
    return (
      <div className="bg-brand-light min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 font-medium">{error}</p>
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

  // Group products by category for the "All" view
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
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-4">
            <Filter className="text-brand-navy" size={20} />
            <select
              className="bg-white border border-gray-200 rounded-xl px-3 py-2.5 sm:px-4 sm:py-3 focus:outline-none focus:ring-2 focus:ring-brand-primary text-brand-navy font-medium text-sm sm:text-base"
              value={selectedCategory}
              onChange={e => setSelectedCategory(e.target.value)}
            >
              {categoryOptions.map(cat => (
                <option key={cat.id} value={cat.slug}>{cat.name}</option>
              ))}
            </select>
          </div>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <p className="text-lg font-medium">No products available yet.</p>
            <p className="text-sm mt-2">Check back soon!</p>
          </div>
        ) : selectedCategory === 'all' ? (
          /* Grouped by category */
          <>
            {productsByCategory.length === 0 ? (
              <div className="text-center py-20 text-gray-500">
                No products found matching your search.
              </div>
            ) : (
              productsByCategory.map(category => (
                <div key={category.slug} className="mb-16">
                  <h2 className="text-3xl font-bold text-brand-navy mb-8 pb-2 border-b-2 border-brand-primary inline-block">
                    {category.name}
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {category.products.map(product => (
                      <ProductCard key={getProductId(product)} product={product} categoryName={category.name} />
                    ))}
                  </div>
                </div>
              ))
            )}
          </>
        ) : (
          /* Filtered grid */
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredProducts.map(product => (
                <ProductCard
                  key={getProductId(product)}
                  product={product}
                  categoryName={getCategoryName(product)}
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
    </div>
  );
}

function ProductCard({ product, categoryName }: { product: Product; categoryName: string }) {
  const productId = String(product._id || product.id || product.slug);
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition group border border-gray-100">
      <div className="aspect-square bg-gray-100 overflow-hidden relative">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.images?.[0] || '/placeholder-image.png'}
          alt={product.name}
          className="w-full h-full object-contain p-3 sm:p-4 group-hover:scale-105 transition duration-500 bg-white"
          onError={e => {
            (e.target as HTMLImageElement).src = '/placeholder-image.png';
          }}
        />
        <span className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-brand-primary text-white text-xs font-bold px-2 py-1 sm:px-3 sm:py-1 rounded-full shadow-lg">
          {categoryName}
        </span>
      </div>
      <div className="p-4 sm:p-6">
        <h3 className="text-lg sm:text-xl font-bold text-brand-navy group-hover:text-brand-primary transition">
          {product.name}
        </h3>
        {product.description && (
          <p className="text-gray-500 text-xs sm:text-sm mt-2 line-clamp-2">{product.description}</p>
        )}

        {/* Specifications snippet */}
        {product.specifications && (
          <div className="mt-3 flex flex-wrap gap-2">
            {product.specifications.material && (
              <span className="text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-md font-medium">
                {product.specifications.material}
              </span>
            )}
            {product.specifications.dimensions && (
              <span className="text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-md font-medium">
                {product.specifications.dimensions}
              </span>
            )}
          </div>
        )}

        <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-0">
          <span className="text-brand-primary font-bold text-sm">
            Enquiry Only
          </span>
          <button
            onClick={() => {
              const url = new URL(window.location.origin + '/enquiry');
              url.searchParams.set('productId', productId);
              window.location.href = url.toString();
            }}
            className="bg-brand-accent text-brand-navy px-4 py-2 rounded-lg font-bold hover:bg-opacity-90 transition shadow-sm w-full sm:w-auto"
          >
            Enquire Now
          </button>
        </div>
      </div>
    </div>
  );
}
