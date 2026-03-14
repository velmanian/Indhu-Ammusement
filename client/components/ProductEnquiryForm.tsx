'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Product, Category } from '@/types';
import { fetchPublic } from '@/lib/api';
import ThankYouAnimation from './ThankYouAnimation';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, ChevronLeft, Check, Smartphone, Mail, User, MapPin, Briefcase } from 'lucide-react';
import { FALLBACK_PRODUCTS } from '@/lib/fallbackData';

interface ExtendedProduct extends Product {
  image: string;
  description: string;
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
        const data = await fetchPublic('/products').catch(() => []);

        const finalData = (data && data.length > 0) ? data : FALLBACK_PRODUCTS;

        // Map to ExtendedProduct format
        const fetchedProducts: ExtendedProduct[] = finalData.map((p: any, idx: number) => ({
          ...p,
          id: p._id || p.id || `temp-id-${idx}`,
          image: p.images?.[0] || '/placeholder-image.png',
          description: p.description || '',
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
      // Use the centralized API utility
      const { postEnquiry } = await import('@/lib/api');
      await postEnquiry({
        ...formData,
        location: formData.place,
        message: 'Product enquiry from website'
      });

      // Fallback if API fails but we want to show success UI
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

      // Close modal if needed
      if (onClose) {
        setTimeout(() => {
          onClose();
        }, 3000);
      }
    } catch (error: any) {
      console.error('Error submitting enquiry:', error);
      const errorMessage = error.message || 'Error submitting enquiry';
      alert(`${errorMessage}. Please try again or contact us directly.`);
    }
  };

  const nextStep = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      handleSubmit();
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
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

  const steps = [
    { title: 'Personal Info', description: 'Who are you?' },
    { title: 'Selection', description: 'What do you need?' },
    { title: 'Requirements', description: 'Final details' },
  ];

  if (loading) {
    return (
      <div className="fixed inset-0 bg-white/80 backdrop-blur-md flex items-center justify-center z-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center gap-4"
        >
          <div className="w-16 h-16 border-4 border-brand-primary border-t-brand-accent rounded-full animate-spin"></div>
          <p className="text-brand-navy font-black tracking-widest uppercase text-xs">Curating Products...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="w-full flex justify-center py-4">
      <motion.div
        key="form-modal"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        className="bg-white rounded-[32px] shadow-[0_32px_120px_-20px_rgba(0,0,0,0.3)] max-w-5xl w-full overflow-hidden border border-gray-100 flex flex-col md:flex-row min-h-[600px]"
      >
        {/* Left Sidebar - Progress */}
        <div className="md:w-1/3 bg-brand-navy p-8 md:p-12 text-white flex flex-col justify-between relative overflow-hidden">
          {/* Decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary opacity-20 -mr-32 -mt-32 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-accent opacity-20 -ml-32 -mb-32 rounded-full blur-3xl"></div>

          <div className="relative z-10">
            <h2 className="text-3xl font-black mb-2 tracking-tight">Request <br /> <span className="text-brand-accent">Enquiry</span></h2>
            <p className="text-white/60 text-sm mb-12">Building safe and joyful play spaces together.</p>

            <div className="space-y-8">
              {steps.map((s, i) => (
                <div key={i} className="flex items-center gap-4 group">
                  <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-black transition-all duration-500 border-2 ${step > i + 1
                    ? 'bg-brand-accent border-brand-accent text-brand-navy'
                    : step === i + 1
                      ? 'bg-white border-white text-brand-navy scale-110 shadow-lg shadow-white/20'
                      : 'bg-transparent border-white/20 text-white/40'
                    }`}>
                    {step > i + 1 ? <Check size={20} /> : i + 1}
                  </div>
                  <div>
                    <p className={`text-sm font-black tracking-wide uppercase ${step === i + 1 ? 'text-white' : 'text-white/40'}`}>{s.title}</p>
                    <p className={`text-xs ${step === i + 1 ? 'text-brand-accent' : 'text-white/20'}`}>{s.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative z-10 mt-12 hidden md:block">
            <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
              <p className="text-sm font-medium italic text-white/80">"Quality is our priority. We usually respond within 24 hours."</p>
            </div>
          </div>
        </div>

        {/* Right Main Content */}
        <div className="md:w-2/3 p-8 md:p-12 bg-white relative">
          <div className="max-w-xl mx-auto h-full flex flex-col">
            <div className="flex justify-between items-center mb-10">
              <div>
                <p className="text-brand-accent font-black text-xs uppercase tracking-widest mb-1">Step {step} of 3</p>
                <h3 className="text-2xl font-black text-brand-navy">
                  {step === 1 ? "Fill your details" : step === 2 ? "Pick your favorites" : "Final requirements"}
                </h3>
              </div>
              {onClose && (
                <button onClick={onClose} className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-red-50 hover:text-red-500 transition-all">
                  <X size={20} />
                </button>
              )}
            </div>

            <div className="flex-grow">
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    {formData.selectedProducts.length > 0 && (
                      <div className="bg-brand-primary/5 border border-brand-primary/10 rounded-2xl p-4 mb-6">
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-primary mb-3">Enquiring About</p>
                        <div className="flex flex-wrap gap-2">
                          <AnimatePresence>
                            {formData.selectedProducts.map((p, idx) => (
                              <motion.div
                                key={`${p.id || idx}-${idx}`}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                className="bg-white px-3 py-2 rounded-xl shadow-sm border border-brand-primary/5 flex items-center gap-2 pr-4 transition-all hover:border-brand-primary/20"
                              >
                                <div className="w-8 h-8 rounded-lg overflow-hidden bg-gray-50 p-1">
                                  <img src={p.image} alt={p.name} className="w-full h-full object-contain" />
                                </div>
                                <span className="text-xs font-black text-brand-navy">{p.name}</span>
                                <button
                                  onClick={() => toggleProductSelection(p)}
                                  className="ml-1 text-gray-300 hover:text-red-500 transition-colors"
                                  title="Remove this product"
                                >
                                  <X size={14} />
                                </button>
                              </motion.div>
                            ))}
                          </AnimatePresence>
                          <button
                            onClick={() => setStep(2)}
                            className="px-4 py-2 rounded-xl border-2 border-dashed border-brand-primary/20 text-brand-primary font-black text-[10px] uppercase tracking-widest hover:bg-brand-primary/5 hover:border-brand-primary/40 transition-all flex items-center gap-2"
                          >
                            + Add More
                          </button>
                        </div>
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div className="space-y-1">
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Full Name</label>
                        <div className="relative">
                          <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                          <input
                            type="text" name="name" value={formData.name} onChange={handleInputChange}
                            placeholder="John Doe"
                            className="w-full pl-12 pr-4 py-4 bg-gray-50 border-none rounded-2xl focus:ring-4 focus:ring-brand-primary/10 transition-all font-medium text-brand-navy"
                          />
                        </div>
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Phone Number</label>
                        <div className="relative">
                          <Smartphone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                          <input
                            type="tel" name="phone" value={formData.phone} onChange={handleInputChange}
                            placeholder="+91 98765 43210"
                            className="w-full pl-12 pr-4 py-4 bg-gray-50 border-none rounded-2xl focus:ring-4 focus:ring-brand-primary/10 transition-all font-medium text-brand-navy"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Email Address</label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                        <input
                          type="email" name="email" value={formData.email} onChange={handleInputChange}
                          placeholder="john@example.com"
                          className="w-full pl-12 pr-4 py-4 bg-gray-50 border-none rounded-2xl focus:ring-4 focus:ring-brand-primary/10 transition-all font-medium text-brand-navy"
                        />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Location / Place</label>
                      <div className="relative">
                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                        <input
                          type="text" name="place" value={formData.place} onChange={handleInputChange}
                          placeholder="Tirunelveli, Tamil Nadu"
                          className="w-full pl-12 pr-4 py-4 bg-gray-50 border-none rounded-2xl focus:ring-4 focus:ring-brand-primary/10 transition-all font-medium text-brand-navy"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-4"
                  >
                    <div className="grid grid-cols-2 gap-3 max-h-[350px] overflow-y-auto pr-2 custom-scrollbar">
                      {products.map((p, idx) => {
                        const isSelected = formData.selectedProducts.some(sp => sp.id === p.id);
                        return (
                          <div
                            key={`${p.id || idx}-${idx}`}
                            onClick={() => toggleProductSelection(p)}
                            className={`p-3 rounded-2xl border-2 transition-all cursor-pointer group flex flex-col items-center text-center ${isSelected ? 'bg-brand-primary/5 border-brand-primary shadow-lg shadow-brand-primary/5' : 'bg-gray-50 border-transparent hover:border-gray-200'
                              }`}
                          >
                            <div className="w-20 h-20 bg-white rounded-xl mb-3 flex items-center justify-center p-2 shadow-sm group-hover:scale-110 transition-transform">
                              <img src={p.image} alt={p.name} className="max-h-full max-w-full object-contain" />
                            </div>
                            <p className={`text-xs font-black tracking-tight ${isSelected ? 'text-brand-primary' : 'text-brand-navy'}`}>{p.name}</p>
                            {isSelected && (
                              <div className="absolute top-2 right-2 w-6 h-6 bg-brand-accent text-brand-navy rounded-full flex items-center justify-center shadow-lg">
                                <Check size={14} strokeWidth={4} />
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                    {formData.selectedProducts.length === 0 && (
                      <p className="text-center text-red-500 font-bold text-xs animate-pulse">Select at least one product to continue</p>
                    )}
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Usage Purpose</label>
                      <div className="flex flex-wrap gap-2">
                        {['Commercial Park', 'School', 'Residential', 'Hotel', 'Government', 'Private'].map((p) => {
                          const isSelected = formData.usagePurpose.includes(p);
                          return (
                            <button
                              key={p}
                              onClick={() => toggleUsagePurpose(p)}
                              className={`px-4 py-2 rounded-xl text-xs font-black transition-all border-2 ${isSelected ? 'bg-brand-accent border-brand-accent text-brand-navy shadow-lg shadow-brand-accent/20' : 'bg-gray-50 border-transparent text-gray-400 hover:border-gray-200'
                                }`}
                            >
                              {p}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Additional Information</label>
                      <div className="relative">
                        <Briefcase className="absolute left-4 top-4 text-gray-300" size={18} />
                        <textarea
                          name="additionalInfo" value={formData.additionalInfo} onChange={handleInputChange}
                          placeholder="Tell us more about your project..."
                          rows={4}
                          className="w-full pl-12 pr-4 py-4 bg-gray-50 border-none rounded-2xl focus:ring-4 focus:ring-brand-primary/10 transition-all font-medium text-brand-navy resize-none"
                        ></textarea>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="mt-10 flex gap-4 pt-4 border-t border-gray-50">
              {step > 1 && (
                <button
                  onClick={prevStep}
                  className="flex-1 py-4 px-6 rounded-2xl font-black text-xs uppercase tracking-widest text-gray-400 bg-gray-50 hover:bg-gray-100 transition-all flex items-center justify-center gap-2"
                >
                  <ChevronLeft size={16} /> Back
                </button>
              )}
              <button
                onClick={nextStep}
                disabled={step === 1 ? !isStep1Valid() : step === 2 ? formData.selectedProducts.length === 0 : false}
                className={`flex-[2] py-4 px-6 rounded-2xl font-black text-xs uppercase tracking-widest text-white shadow-xl transition-all flex items-center justify-center gap-2 ${(step === 1 && !isStep1Valid()) || (step === 2 && formData.selectedProducts.length === 0)
                  ? 'bg-gray-200 text-gray-400 shadow-none cursor-not-allowed'
                  : 'bg-brand-primary hover:bg-brand-navy shadow-brand-primary/20'
                  }`}
              >
                {step === 3 ? "Submit Enquiry" : "Continue"} <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #0B4F8A;
          border-radius: 10px;
        }
      `}</style>

      <ThankYouAnimation
        isVisible={showThankYou}
        autoRedirect={true}
        onClose={() => {
          setShowThankYou(false);
          if (onClose) onClose();
        }}
      />
    </div>
  );
}