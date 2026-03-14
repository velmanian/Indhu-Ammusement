'use client';

import { useState, useEffect } from 'react';
import { X, Upload, ImageIcon } from 'lucide-react';
import { Category, Product } from '@/types';
import { uploadImages } from '@/lib/adminApi';

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (productData: any) => void;
  categories: Category[];
  loading: boolean;
  editingProduct?: Product | null;
}

export default function ProductModal({
  isOpen,
  onClose,
  onSubmit,
  categories,
  loading,
  editingProduct,
}: ProductModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    categoryId: '',
    specifications: '',
    dimensions: '',
    material: '',
    ageGroup: '',
    installation: '',
    warranty: '',
    images: [] as string[],
  });

  const [newImageFiles, setNewImageFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  // Pre-fill when editing
  useEffect(() => {
    if (isOpen) {
      if (editingProduct) {
        const catId =
          editingProduct.categoryId
            ? String(editingProduct.categoryId)
            : editingProduct.category
              ? String((editingProduct.category as any)._id || (editingProduct.category as any).id || editingProduct.category)
              : '';
        setFormData({
          name: editingProduct.name || '',
          slug: editingProduct.slug || '',
          description: editingProduct.description || '',
          categoryId: catId,
          specifications: editingProduct.specifications
            ? typeof editingProduct.specifications === 'string'
              ? editingProduct.specifications
              : JSON.stringify(editingProduct.specifications, null, 2)
            : '',
          dimensions: editingProduct.specifications?.dimensions || '',
          material: editingProduct.specifications?.material || '',
          ageGroup: editingProduct.specifications?.ageGroup || '',
          installation: editingProduct.specifications?.installation || '',
          warranty: editingProduct.specifications?.warranty || '',
          images: editingProduct.images || [],
        });
        setPreviewUrls(editingProduct.images || []);
      } else {
        setFormData({
          name: '',
          slug: '',
          description: '',
          categoryId: '',
          specifications: '',
          dimensions: '',
          material: '',
          ageGroup: '',
          installation: '',
          warranty: '',
          images: [],
        });
        setPreviewUrls([]);
      }
      setNewImageFiles([]);
      setError('');
    }
  }, [isOpen, editingProduct]);

  const generateSlug = (name: string) =>
    name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    setFormData(prev => ({ ...prev, name, slug: generateSlug(name) }));
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;
    setNewImageFiles(prev => [...prev, ...files]);
    const urls = files.map(f => URL.createObjectURL(f));
    setPreviewUrls(prev => [...prev, ...urls]);
    // Reset input so same file can be re-added
    e.target.value = '';
  };

  const removeImage = (index: number) => {
    // Determine if this was an existing server URL or a new local preview
    const existingCount = formData.images.length;
    if (index < existingCount) {
      // Remove from existing images
      setFormData(prev => ({ ...prev, images: prev.images.filter((_, i) => i !== index) }));
      setPreviewUrls(prev => prev.filter((_, i) => i !== index));
    } else {
      // Remove from new files
      const newIndex = index - existingCount;
      setNewImageFiles(prev => prev.filter((_, i) => i !== newIndex));
      setPreviewUrls(prev => prev.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      setUploading(true);

      // Upload any new image files to the server
      let serverUrls: string[] = [...formData.images]; // keep existing URLs
      if (newImageFiles.length > 0) {
        const uploaded = await uploadImages(newImageFiles);
        serverUrls = [...serverUrls, ...uploaded];
      }

      const productData = {
        ...formData,
        categoryId: formData.categoryId || undefined,
        specifications: {
          ...(formData.specifications ? (() => {
            try { return JSON.parse(formData.specifications); }
            catch { return {}; }
          })() : {}),
          dimensions: formData.dimensions,
          material: formData.material,
          ageGroup: formData.ageGroup,
          installation: formData.installation,
          warranty: formData.warranty,
        },
        images: serverUrls,
      };

      await onSubmit(productData);
    } catch (err: any) {
      console.error('Error submitting product:', err);
      setError(err?.message || 'Something went wrong. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  if (!isOpen) return null;

  const isEditing = !!editingProduct;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
      <div
        className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[92vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        <div className="p-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {isEditing ? 'Edit Product' : 'Add New Product'}
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                {isEditing ? 'Update product details and images' : 'Fill in the details and upload product images'}
              </p>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition">
              <X size={24} />
            </button>
          </div>

          {error && (
            <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Product Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Product Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleNameChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-900 focus:border-transparent outline-none transition"
                  placeholder="e.g. Wave Slide"
                />
              </div>

              {/* Slug */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  URL Slug <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.slug}
                  onChange={e => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-900 focus:border-transparent outline-none transition font-mono text-sm"
                  placeholder="wave-slide"
                />
              </div>

              {/* Category */}
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Category
                </label>
                <select
                  value={formData.categoryId}
                  onChange={e => setFormData(prev => ({ ...prev, categoryId: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-900 focus:border-transparent outline-none transition bg-white"
                >
                  <option value="">— Select a category —</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Description */}
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-900 focus:border-transparent outline-none transition resize-none"
                  placeholder="Describe the product..."
                />
              </div>

              {/* Dimensions */}
              <div className="md:col-span-1">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Dimensions</label>
                <input
                  type="text"
                  value={formData.dimensions}
                  onChange={e => setFormData(prev => ({ ...prev, dimensions: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-900 outline-none transition"
                  placeholder="e.g. 6ft"
                />
              </div>

              {/* Material & Age Group */}
              <div className="md:col-span-1">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Material</label>
                <input
                  type="text"
                  value={formData.material}
                  onChange={e => setFormData(prev => ({ ...prev, material: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-900 outline-none transition"
                  placeholder="e.g. FRP"
                />
              </div>
              <div className="md:col-span-1">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Age Group</label>
                <input
                  type="text"
                  value={formData.ageGroup}
                  onChange={e => setFormData(prev => ({ ...prev, ageGroup: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-900 outline-none transition"
                  placeholder="e.g. 3-10 yrs"
                />
              </div>

              {/* Installation & Warranty */}
              <div className="md:col-span-1">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Installation</label>
                <input
                  type="text"
                  value={formData.installation}
                  onChange={e => setFormData(prev => ({ ...prev, installation: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-900 outline-none transition"
                  placeholder="e.g. Yes"
                />
              </div>
              <div className="md:col-span-1">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Warranty</label>
                <input
                  type="text"
                  value={formData.warranty}
                  onChange={e => setFormData(prev => ({ ...prev, warranty: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-900 outline-none transition"
                  placeholder="e.g. 1 Year"
                />
              </div>

              {/* Specifications (Hidden Advanced) */}
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Additional Specs <span className="text-gray-400 font-normal">(JSON, optional)</span>
                </label>
                <textarea
                  value={formData.specifications}
                  onChange={e => setFormData(prev => ({ ...prev, specifications: e.target.value }))}
                  rows={2}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-900 outline-none transition font-mono text-xs resize-none"
                  placeholder='{"Other": "Info"}'
                />
              </div>
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Product Images
              </label>

              {/* Upload Zone */}
              <label className="flex flex-col items-center justify-center w-full px-4 py-8 border-2 border-dashed border-gray-300 rounded-2xl cursor-pointer hover:border-blue-900 hover:bg-blue-50 transition group">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageSelect}
                  className="hidden"
                />
                <div className="flex flex-col items-center text-center">
                  <Upload size={32} className="text-gray-400 group-hover:text-blue-900 transition mb-2" />
                  <span className="text-gray-600 font-semibold group-hover:text-blue-900 transition">
                    Click to upload images
                  </span>
                  <span className="text-sm text-gray-400 mt-1">
                    PNG, JPG, WEBP up to 10MB each
                  </span>
                </div>
              </label>

              {/* Image Previews */}
              {previewUrls.length > 0 && (
                <div className="mt-4 grid grid-cols-3 sm:grid-cols-4 gap-3">
                  {previewUrls.map((url, index) => (
                    <div key={index} className="relative group aspect-square rounded-xl overflow-hidden border border-gray-200 bg-gray-50">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={url}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-full object-cover"
                        onError={e => {
                          (e.target as HTMLImageElement).src = '/placeholder-image.png';
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition hover:bg-red-600 shadow"
                      >
                        <X size={12} />
                      </button>
                      {index === 0 && (
                        <span className="absolute bottom-1 left-1 bg-blue-900 text-white text-xs px-1.5 py-0.5 rounded-md font-bold">
                          Main
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {previewUrls.length === 0 && (
                <div className="mt-3 flex items-center gap-2 text-sm text-gray-400">
                  <ImageIcon size={16} />
                  <span>No images selected yet</span>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-4 pt-6 border-t border-gray-100">
              <button
                type="button"
                onClick={onClose}
                disabled={loading || uploading}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-bold hover:bg-gray-50 transition disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading || uploading}
                className="bg-blue-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-800 transition disabled:opacity-50 flex items-center gap-2 min-w-[140px] justify-center"
              >
                {uploading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Uploading…
                  </>
                ) : loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Saving…
                  </>
                ) : isEditing ? (
                  'Save Changes'
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