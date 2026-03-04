'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Product, Category } from '@/types';
import { fetchPublic } from '@/lib/api';
import ThankYouAnimation from './ThankYouAnimation';

interface ExtendedProduct extends Product {
  image: string;
  description: string;
  price: string;
}

interface EnquiryFormData {
  name: string;
  phone: string;
  email: string;
  place: string;
  selectedProducts: ExtendedProduct[];
  usagePurpose: string[];
  additionalInfo: string;
}

interface ProductEnquiryFormProps {
  onClose?: () => void;
  productId?: string | number;
}

export default function ProductEnquiryForm({ onClose, productId: propProductId }: ProductEnquiryFormProps) {
  const router = useRouter();

  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState<EnquiryFormData>({
    name: '',
    phone: '',
    email: '',
    place: '',
    selectedProducts: [],
    usagePurpose: [],
    additionalInfo: ''
  });

  const [products, setProducts] = useState<ExtendedProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showThankYou, setShowThankYou] = useState<boolean>(false);

  // Load products from API
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const data = await fetchPublic('/products');

        // Map to ExtendedProduct format
        const fetchedProducts: ExtendedProduct[] = data.map((p: any) => ({
          ...p,
          id: p._id || p.id,
          image: p.images?.[0] || '/placeholder-image.png',
          description: p.description || '',
          price: (p.price || p.specifications?.price) ? `₹${p.price || p.specifications?.price}` : 'On Enquiry'
        }));

        setProducts(fetchedProducts);

        // Handle pre-selection from prop OR URL param
        const targetId = propProductId || (typeof window !== 'undefined' ? new URLSearchParams(window.location.search).get('productId') : null);

        if (targetId) {
          const productToSelect = fetchedProducts.find(p => String(p.id) === String(targetId));
          if (productToSelect) {
            setFormData(prev => ({
              ...prev,
              selectedProducts: [productToSelect]
            }));
          }
        }
      } catch (err) {
        console.error('Error fetching products for enquiry form:', err);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [propProductId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const toggleProductSelection = (product: ExtendedProduct) => {
    setFormData(prev => {
      const isSelected = prev.selectedProducts.some(p => p.id === product.id);
      if (isSelected) {
        return {
          ...prev,
          selectedProducts: prev.selectedProducts.filter(p => p.id !== product.id)
        };
      } else {
        return {
          ...prev,
          selectedProducts: [...prev.selectedProducts, product]
        };
      }
    });
  };

  const toggleUsagePurpose = (purpose: string) => {
    setFormData(prev => {
      const isSelected = prev.usagePurpose.includes(purpose);
      if (isSelected) {
        return {
          ...prev,
          usagePurpose: prev.usagePurpose.filter(p => p !== purpose)
        };
      } else {
        return {
          ...prev,
          usagePurpose: [...prev.usagePurpose, purpose]
        };
      }
    });
  };

  const handleSubmit = async () => {
    try {
      // Send enquiry to backend API
      const response = await fetch('/api/public/enquiry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          location: formData.place,
          selectedProducts: formData.selectedProducts,
          usagePurpose: formData.usagePurpose,
          additionalInfo: formData.additionalInfo,
          message: 'Product enquiry from website'
        }),
      });

      const result = await response.json();

      if (result.success) {
        console.log('Enquiry submitted successfully');
        // Show thank you animation
        setShowThankYou(true);

        // Reset form after a delay
        setTimeout(() => {
          setFormData({
            name: '',
            phone: '',
            email: '',
            place: '',
            selectedProducts: [],
            usagePurpose: [],
            additionalInfo: ''
          });
          setStep(1);
        }, 3000);

        // Auto-redirect handles closing
      } else {
        console.error('Failed to submit enquiry:', result.message);
        alert('Failed to submit enquiry. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting enquiry:', error);
      alert('Error submitting enquiry. Please try again.');
    }

    // Reset form after a delay
    setTimeout(() => {
      setFormData({
        name: '',
        phone: '',
        email: '',
        place: '',
        selectedProducts: [],
        usagePurpose: [],
        additionalInfo: ''
      });
      setStep(1);
    }, 3000);

    // Close modal if needed
    if (onClose) {
      setTimeout(() => {
        onClose();
      }, 3000);
    }
  };

  const nextStep = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      handleSubmit();
    }
  };

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isStep1Valid = () => {
    return formData.name.trim() !== '' &&
      formData.phone.trim() !== '' &&
      formData.email.trim() !== '' &&
      isValidEmail(formData.email) &&
      formData.place.trim() !== '';
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-8 rounded-xl">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-900"></div>
            <span className="ml-3">Loading products...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="w-full">
        <div className="bg-white rounded-2xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-brand-navy">Product Enquiry Form</h2>
              {onClose && (
                <button
                  onClick={onClose}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Progress indicator */}
            <div className="mb-8">
              <div className="flex justify-between relative">
                <div className={`absolute top-1/2 left-0 right-0 h-1 -z-10 ${step >= 2 ? 'bg-brand-primary' : 'bg-gray-200'
                  }`}></div>
                {[1, 2, 3].map((num) => (
                  <div key={num} className="flex flex-col items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === num
                      ? 'bg-brand-primary text-white'
                      : step > num
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-200 text-gray-700'
                      }`}>
                      {num}
                    </div>
                    <span className="mt-2 text-sm font-medium">
                      {num === 1 ? 'Details' : num === 2 ? 'Products' : 'Purpose'}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Step 1: Customer Details */}
            {step === 1 && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-brand-navy">Customer Information</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                      placeholder="Enter your phone number"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                      placeholder="Enter your email address"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="place" className="block text-sm font-medium text-gray-700 mb-1">
                      Place/City *
                    </label>
                    <input
                      type="text"
                      id="place"
                      name="place"
                      value={formData.place}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                      placeholder="Enter your city or place"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Product Selection */}
            {step === 2 && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-brand-navy">Select Products</h3>
                <p className="text-gray-600">Choose the products you're interested in</p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {products.map((product) => (
                    <div
                      key={product.id}
                      onClick={() => toggleProductSelection(product)}
                      className={`border rounded-xl p-4 cursor-pointer transition-all ${formData.selectedProducts.some(p => p.id === product.id)
                        ? 'border-brand-primary bg-brand-light shadow-md'
                        : 'border-gray-200 hover:border-brand-primary hover:bg-gray-50'
                        }`}
                    >
                      <div className="flex items-start space-x-3">
                        <input
                          type="checkbox"
                          checked={formData.selectedProducts.some(p => p.id === product.id)}
                          onChange={() => { }}
                          className="mt-1 h-4 w-4 text-brand-primary focus:ring-brand-primary"
                        />
                        <div className="flex-1">
                          <div className="w-full h-24 bg-gray-100 rounded-lg overflow-hidden mb-2 flex items-center justify-center">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="max-h-full max-w-full object-contain p-1"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src = '/placeholder-image.png';
                              }}
                            />
                          </div>
                          <h4 className="font-medium text-gray-900">{product.name}</h4>
                          <p className="text-xs text-gray-500 mt-1 line-clamp-2">{product.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {formData.selectedProducts.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <p>Please select at least one product</p>
                  </div>
                )}
              </div>
            )}

            {/* Step 3: Usage Purpose */}
            {step === 3 && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-brand-navy">Usage Purpose</h3>
                <p className="text-gray-600">Select where you plan to use these products</p>

                <div className="space-y-4">
                  {[
                    'Commercial Park',
                    'School Playground',
                    'Residential Community',
                    'Hotel Resort',
                    'Government Project',
                    'Private Garden',
                    'Other'
                  ].map((purpose) => (
                    <div
                      key={purpose}
                      onClick={() => toggleUsagePurpose(purpose)}
                      className={`border rounded-lg p-4 cursor-pointer transition-all ${formData.usagePurpose.includes(purpose)
                        ? 'border-brand-primary bg-brand-light'
                        : 'border-gray-200 hover:border-brand-primary'
                        }`}
                    >
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          checked={formData.usagePurpose.includes(purpose)}
                          onChange={() => { }}
                          className="h-4 w-4 text-brand-primary focus:ring-brand-primary mr-3"
                        />
                        <span>{purpose}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div>
                  <label htmlFor="additionalInfo" className="block text-sm font-medium text-gray-700 mb-1">
                    Additional Information
                  </label>
                  <textarea
                    id="additionalInfo"
                    name="additionalInfo"
                    value={formData.additionalInfo}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                    placeholder="Any additional details about your requirement..."
                  ></textarea>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              <button
                type="button"
                onClick={prevStep}
                disabled={step === 1}
                className={`px-6 py-3 rounded-lg font-medium ${step === 1
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
              >
                Back
              </button>

              <button
                type="button"
                onClick={nextStep}
                disabled={
                  (step === 1 && !isStep1Valid()) ||
                  (step === 2 && formData.selectedProducts.length === 0) ||
                  (step === 3 && formData.usagePurpose.length === 0)
                }
                className={`px-6 py-3 rounded-lg font-medium text-white ${(step === 1 && !isStep1Valid()) ||
                  (step === 2 && formData.selectedProducts.length === 0) ||
                  (step === 3 && formData.usagePurpose.length === 0)
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-brand-primary hover:bg-brand-navy'
                  }`}
              >
                {step === 3 ? 'Submit Enquiry' : 'Next'}
              </button>
            </div>
          </div>
        </div>
      </div>

      <ThankYouAnimation
        isVisible={showThankYou}
        autoRedirect={true}
        onClose={() => {
          setShowThankYou(false);
          if (onClose) onClose();
        }}
      />
    </>
  );
}