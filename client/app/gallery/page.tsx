'use client';

import { useState, useEffect } from 'react';
import { Loader2, Search, Filter, Camera } from 'lucide-react';
import { fetchPublic } from '@/lib/api';
import { Product, Category } from '@/types';
import { FALLBACK_CATEGORIES, FALLBACK_PRODUCTS } from '@/lib/fallbackData';

export default function Gallery() {
    const [products, setProducts] = useState<Product[]>(FALLBACK_PRODUCTS as Product[]);
    const [categories, setCategories] = useState<Category[]>(FALLBACK_CATEGORIES);
    const [loading, setLoading] = useState(false); // Silent loading by default
    const [error, setError] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const loadData = async () => {
            try {
                const [prodData, catData] = await Promise.all([
                    fetchPublic('/products'),
                    fetchPublic('/categories'),
                ]);

                if (prodData && prodData.length > 0) {
                    setProducts(prodData);
                }
                if (catData && catData.length > 0) {
                    setCategories(catData);
                }
            } catch (err) {
                console.error('Error loading gallery, using fallback:', err);
                // Keep the fallback data already in state
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, []);

    const allImages = products.flatMap(product =>
        (product.images || []).map((img: string) => ({
            url: img,
            productName: product.name,
            categorySlug: product.category?.slug || 'other',
            categoryName: product.category?.name || 'Other',
            productId: product.id
        }))
    );

    const filteredImages = allImages.filter(img => {
        const matchesCategory = selectedCategory === 'all' || img.categorySlug === selectedCategory;
        const matchesSearch = img.productName.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    if (loading) {
        return (
            <div className="bg-brand-light min-h-screen flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="animate-spin text-brand-primary" size={48} />
                    <p className="text-gray-500 font-medium text-lg">Loading Gallery…</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-brand-light min-h-screen py-16 sm:py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h1 className="text-4xl sm:text-5xl font-bold text-brand-navy mb-4">Our Product Gallery</h1>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        Browse through our extensive collection of high-quality amusement equipment, categorized for your convenience.
                    </p>
                </div>

                {/* Filters */}
                <div className="flex flex-col md:flex-row gap-6 mb-12 items-center justify-between">
                    <div className="relative w-full md:max-w-md">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search products by name..."
                            className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-primary bg-white shadow-sm transition-all"
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <div className="flex items-center gap-4 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
                        <button
                            onClick={() => setSelectedCategory('all')}
                            className={`px-6 py-2.5 rounded-full font-bold transition-all whitespace-nowrap shadow-sm ${selectedCategory === 'all'
                                ? 'bg-brand-primary text-white scale-105'
                                : 'bg-white text-brand-navy hover:bg-gray-50 border border-gray-100'
                                }`}
                        >
                            All Categories
                        </button>
                        {categories.map(cat => (
                            <button
                                key={cat.id || (cat as any)._id}
                                onClick={() => setSelectedCategory(cat.slug)}
                                className={`px-6 py-2.5 rounded-full font-bold transition-all whitespace-nowrap shadow-sm ${selectedCategory === cat.slug
                                    ? 'bg-brand-primary text-white scale-105'
                                    : 'bg-white text-brand-navy hover:bg-gray-50 border border-gray-100'
                                    }`}
                            >
                                {cat.name}
                            </button>
                        ))}
                    </div>
                </div>

                {error ? (
                    <div className="text-center py-20">
                        <p className="text-red-500 font-medium text-lg">{error}</p>
                        <button
                            onClick={() => window.location.reload()}
                            className="mt-4 text-brand-primary font-bold hover:underline"
                        >
                            Try Refreshing
                        </button>
                    </div>
                ) : filteredImages.length === 0 ? (
                    <div className="text-center py-24 bg-white rounded-3xl border border-dashed border-gray-300 shadow-sm">
                        <Camera size={64} className="mx-auto text-gray-200 mb-4" />
                        <h3 className="text-xl font-bold text-gray-500">No images found</h3>
                        <p className="text-gray-400 mt-2">Try adjusting your filters or search terms.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {filteredImages.map((img, index) => (
                            <div
                                key={`${img.productId}-${index}`}
                                className="group relative aspect-square bg-white rounded-3xl shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100"
                            >
                                {/* Background Glassmorphism Blur */}
                                <div className="absolute inset-0 bg-white/20 backdrop-blur-3xl z-0"></div>

                                {/* Image */}
                                <img
                                    src={img.url}
                                    alt={img.productName}
                                    className="w-full h-full object-contain p-6 relative z-10 group-hover:scale-110 transition-transform duration-700"
                                    loading="lazy"
                                    onError={e => {
                                        (e.target as HTMLImageElement).src = '/placeholder-image.png';
                                    }}
                                />

                                {/* Overlay on Hover */}
                                <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/90 via-brand-navy/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 flex flex-col justify-end p-8">
                                    <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                        <span className="text-brand-accent text-xs font-black uppercase tracking-widest mb-2 block">
                                            {img.categoryName}
                                        </span>
                                        <h3 className="text-white text-2xl font-black leading-tight mb-4">
                                            {img.productName}
                                        </h3>
                                        <a
                                            href={`/enquiry?productId=${img.productId}`}
                                            className="inline-flex items-center gap-2 bg-white text-brand-navy px-5 py-2.5 rounded-xl font-black text-sm hover:bg-brand-accent transition-colors"
                                        >
                                            Enquire Now
                                        </a>
                                    </div>
                                </div>

                                {/* Always visible category tag (mobile optimization) */}
                                <div className="absolute top-4 left-4 z-10 lg:group-hover:opacity-0 transition-opacity">
                                    <span className="bg-brand-primary text-white text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest shadow-lg">
                                        {img.categoryName}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                <div className="mt-24 text-center">
                    <div className="inline-block p-12 bg-white rounded-[40px] shadow-sm border border-gray-100 max-w-3xl">
                        <h2 className="text-3xl font-black text-brand-navy mb-6">Need a Custom Design?</h2>
                        <p className="text-gray-600 mb-8 text-lg">
                            We specialize in custom FRP fabrication and site-specific amusement layouts. Contact our engineering team today.
                        </p>
                        <a
                            href="/contact"
                            className="inline-block bg-brand-primary text-white px-10 py-5 rounded-2xl font-black text-lg hover:bg-brand-secondary transition transform hover:-translate-y-1 shadow-xl hover:shadow-brand-primary/20"
                        >
                            Get a Free Quote
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
