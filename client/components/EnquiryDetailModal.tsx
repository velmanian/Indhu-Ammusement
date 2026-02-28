import { Enquiry } from '@/types';
import { X, Phone, Mail, MapPin, Clock, CheckCircle, Circle, AlertCircle, Package, Tag } from 'lucide-react';

interface EnquiryDetailModalProps {
  enquiry: Enquiry | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function EnquiryDetailModal({ enquiry, isOpen, onClose }: EnquiryDetailModalProps) {
  if (!isOpen || !enquiry) return null;

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'PENDING':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'RESPONDED':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'CLOSED':
        return <Circle className="w-4 h-4 text-gray-500" />;
      default:
        return <AlertCircle className="w-4 h-4 text-red-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800';
      case 'RESPONDED':
        return 'bg-green-100 text-green-800';
      case 'CLOSED':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-red-100 text-red-800';
    }
  };

  const handleWhatsAppClick = () => {
    // Generate WhatsApp URL using the same format as the admin dashboard
    const phoneNumber = enquiry.phone.replace(/[^0-9]/g, '');
    const message = `Hello ${encodeURIComponent(enquiry.name)}, we received your enquiry about ${(enquiry.selectedProducts && enquiry.selectedProducts.length > 0 ? enquiry.selectedProducts[0]?.name : enquiry.product?.name || 'our products')} and would like to assist you.`;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <div 
        className="relative bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 bg-white border-b border-gray-200 p-6 rounded-t-2xl">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Enquiry Details</h2>
              <p className="text-gray-500 text-sm mt-1">ID: {enquiry.id}</p>
            </div>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Customer Information */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <span className="bg-blue-100 p-2 rounded-lg">
                <UserIcon />
              </span>
              Customer Information
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <div className="bg-gray-100 p-2 rounded-lg">
                  <UserIcon />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Name</p>
                  <p className="font-medium">{enquiry.name}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="bg-gray-100 p-2 rounded-lg">
                  <Phone size={16} />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="font-medium">{enquiry.phone}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="bg-gray-100 p-2 rounded-lg">
                  <Mail size={16} />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium">{enquiry.email}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="bg-gray-100 p-2 rounded-lg">
                  <MapPin size={16} />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Location</p>
                  <p className="font-medium">{enquiry.location}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Products & Services */}
          {(enquiry.selectedProducts || enquiry.product) && (
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <span className="bg-blue-100 p-2 rounded-lg">
                  <Package size={16} />
                </span>
                Products & Services
              </h3>
              
              {enquiry.selectedProducts && enquiry.selectedProducts.length > 0 && (
                <div className="space-y-4">
                  {enquiry.selectedProducts.map((product: any, index: number) => (
                    <div key={index} className="border border-gray-200 rounded-xl p-4">
                      <div className="flex gap-4">
                        {product.image ? (
                          <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center flex-shrink-0">
                            <img 
                              src={product.image} 
                              alt={product.name}
                              className="w-full h-full object-contain p-1"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src = '/placeholder-image.png';
                              }}
                            />
                          </div>
                        ) : (
                          <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
                              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                              <circle cx="8.5" cy="8.5" r="1.5"/>
                              <polyline points="21 15 16 10 5 21"/>
                            </svg>
                          </div>
                        )}
                        <div>
                          <h4 className="font-medium text-gray-900">{product.name || product.id || 'Unknown Product'}</h4>
                          <p className="text-sm text-gray-500">{product.description || 'No description available'}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              {enquiry.product && !enquiry.selectedProducts && (
                <div className="border border-gray-200 rounded-xl p-4">
                  <div className="flex gap-4">
                    {enquiry.product.images && enquiry.product.images[0] ? (
                      <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center flex-shrink-0">
                        <img 
                          src={enquiry.product.images[0]} 
                          alt={enquiry.product.name}
                          className="w-full h-full object-contain p-1"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = '/placeholder-image.png';
                          }}
                        />
                      </div>
                    ) : (
                      <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
                          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                          <circle cx="8.5" cy="8.5" r="1.5"/>
                          <polyline points="21 15 16 10 5 21"/>
                        </svg>
                      </div>
                    )}
                    <div>
                      <h4 className="font-medium text-gray-900">{enquiry.product.name}</h4>
                      <p className="text-sm text-gray-500">{enquiry.product.description || 'No description available'}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Usage Purpose */}
          {enquiry.usagePurpose && enquiry.usagePurpose.length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <span className="bg-blue-100 p-2 rounded-lg">
                  <Tag size={16} />
                </span>
                Usage Purpose
              </h3>
              
              <div className="flex flex-wrap gap-2">
                {enquiry.usagePurpose.map((purpose: string, index: number) => (
                  <span 
                    key={index}
                    className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                  >
                    {purpose}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Message */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Message</h3>
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
              <p className="text-gray-700 whitespace-pre-wrap">{enquiry.message}</p>
            </div>
          </div>

          {/* Status & Timestamp */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Status</h3>
              <div className="flex items-center gap-2">
                {getStatusIcon(enquiry.status)}
                <span className={`px-3 py-1.5 rounded-full text-sm font-medium ${getStatusColor(enquiry.status)}`}>
                  {enquiry.status}
                </span>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Timestamp</h3>
              <div className="flex items-center gap-2 text-gray-700">
                <Clock size={16} />
                <span>{new Date(enquiry.createdAt).toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-gray-200">
            <button
              onClick={handleWhatsAppClick}
              className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-xl font-bold transition duration-200 flex-1"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.502 16.842c-.94-.618-1.826-1.132-2.905-1.132-1.387 0-2.33.722-3.42 2.158-1.957-1.044-3.75-3.419-3.75-5.81 0-3.312 2.96-6.437 6.96-6.437 3.867 0 6.54 2.812 6.54 6.06 0 1.866-.84 3.533-2.375 4.724zm-4.835-9.69c-2.077 0-3.75 1.8-3.75 4 0 1.08.66 2.106 1.83 2.64.3.12.42.3.3.54l-1.02 2.34c-.12.3.06.42.3.48l2.46-.54c.72 0 1.38-.18 1.98-.48.96-.42 1.62-1.26 1.62-2.28 0-2.2-1.68-4-3.75-4z"/><circle cx="10.5" cy="9" r="1"/><circle cx="13.5" cy="9" r="1"/><path d="M18 3H6c-1.657 0-3 1.343-3 3v12c0 1.657 1.343 3 3 3h12c1.657 0 3-1.343 3-3V6c0-1.657-1.343-3-3-3zm.5 15c0 .276-.224.5-.5.5H6c-.276 0-.5-.224-.5-.5V6c0-.276.224-.5.5-.5h12c.276 0 .5.224.5.5v12z"/>
              </svg>
              WhatsApp Contact
            </button>
            
            <a 
              href={`mailto:${enquiry.email}?subject=Regarding your enquiry&body=Hello ${encodeURIComponent(enquiry.name)}, we received your enquiry about ${enquiry.selectedProducts && enquiry.selectedProducts.length > 0 ? enquiry.selectedProducts[0]?.name : enquiry.product?.name || 'our products'} and would like to assist you.`}
              className="flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-3 rounded-xl font-bold transition duration-200 flex-1"
            >
              <Mail size={18} />
              Email Contact
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

// UserIcon helper component since lucide-react doesn't have a direct User icon
function UserIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
      <circle cx="12" cy="7" r="4"></circle>
    </svg>
  );
}