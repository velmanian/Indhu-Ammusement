'use client';

import { useState, useEffect } from 'react';
import { X, Upload } from 'lucide-react';
import { Category } from '@/types';

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (productData: any) => void;
  categories: Category[];
  loading: boolean;
}

export default function ProductModal({ isOpen, onClose, onSubmit, categories, loading }: ProductModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    categoryId: '',
    specifications: '',
    images: [] as string[],
  });

  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    console.log('ProductModal categories:', categories);
  }, [categories]);

  useEffect(() => {
    if (isOpen) {
      // Reset form when modal opens
      setFormData({
        name: '',
        slug: '',
        description: '',
        categoryId: '',
        specifications: '',
        images: [],
      });
      setImageFiles([]);
      setUploading(false);
    }
  }, [isOpen]);

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    setFormData({
      ...formData,
      name,
      slug: generateSlug(name),
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      setImageFiles(prev => [...prev, ...files]);
      // Convert files to URLs for preview
      const urls = files.map(file => URL.createObjectURL(file));
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, ...urls]
      }));
    }
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
    setImageFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setUploading(true);
      
      // For now, we'll submit with local URLs
      // In production, you'd upload files to a storage service
      const productData = {
        ...formData,
        categoryId: parseInt(formData.categoryId),
        specifications: formData.specifications || '{}',
        images: formData.images.length > 0 ? formData.images : ['/placeholder-image.png'],
      };
      
      await onSubmit(productData);
      
    } catch (error) {
      console.error('Error submitting product:', error);
    } finally {
      setUploading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div 
        className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Add New Product</h2>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <X size={24} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleNameChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-900 focus:border-transparent"
                  placeholder="Enter product name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Slug *
                </label>
                <input
                  type="text"
                  required
                  value={formData.slug}
                  onChange={(e) => setFormData({...formData, slug: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-900 focus:border-transparent"
                  placeholder="product-name"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category *
                </label>
                <select
                  required
                  value={formData.categoryId}
                  onChange={(e) => setFormData({...formData, categoryId: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-900 focus:border-transparent"
                >
                  <option value="">Select a category</option>
                  {categories && categories.length > 0 ? (
                    categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name.length > 20 ? category.name.substring(0, 20) + '...' : category.name}
                      </option>
                    ))
                  ) : (
                    <option disabled>Loading categories...</option>
                  )}
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-900 focus:border-transparent"
                  placeholder="Product description..."
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Specifications (JSON format)
                </label>
                <textarea
                  value={formData.specifications}
                  onChange={(e) => setFormData({...formData, specifications: e.target.value})}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-900 focus:border-transparent font-mono text-sm"
                  placeholder='{"material": "FRP", "capacity": "20 people"}'
                />
              </div>
            </div>

            {/* Image Management */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Images
              </label>
              <div className="mb-3">
                <label className="flex items-center justify-center w-full px-4 py-6 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-blue-900 transition">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <div className="flex flex-col items-center">
                    <Upload size={24} className="text-gray-400 mb-2" />
                    <span className="text-gray-600 font-medium">Click to upload images</span>
                    <span className="text-sm text-gray-500 mt-1">or drag and drop</span>
                  </div>
                </label>
              </div>
              
              {formData.images.length > 0 && (
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">Added images:</p>
                  {formData.images.map((image, index) => (
                    <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                      <span className="text-sm text-gray-700 truncate flex-1 mr-2">{image}</span>
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="text-red-500 hover:text-red-700 text-sm font-bold"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex justify-end gap-4 pt-6 border-t">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-bold hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading || uploading}
                className="bg-blue-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-800 transition disabled:opacity-50 flex items-center gap-2"
              >
                {loading || uploading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    {uploading ? 'Uploading...' : 'Adding...'}
                  </>
                ) : (
                  'Add Product'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}