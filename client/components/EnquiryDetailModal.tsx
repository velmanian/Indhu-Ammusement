'use client';

import { X, Phone, Mail, MapPin, Calendar, CheckCircle, Clock } from 'lucide-react';
import { Enquiry } from '@/types';

interface EnquiryDetailModalProps {
  enquiry: Enquiry | null;
  onClose: () => void;
  onUpdateStatus: (id: any, status: string) => void;
}

export default function EnquiryDetailModal({ enquiry, onClose, onUpdateStatus }: EnquiryDetailModalProps) {
  if (!enquiry) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'RESPONDED': return 'bg-green-100 text-green-800 border-green-200';
      case 'CLOSED': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'PENDING': return <Clock size={16} className="mr-1.5" />;
      case 'RESPONDED': return <CheckCircle size={16} className="mr-1.5" />;
      case 'CLOSED': return <CheckCircle size={16} className="mr-1.5" />;
      default: return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <div
        className="bg-white rounded-[2rem] shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col animate-in fade-in zoom-in duration-300"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-8 py-6 border-b border-gray-100 flex justify-between items-center bg-gradient-to-r from-blue-50/50 to-white">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h2 className="text-2xl font-black text-gray-900">Enquiry Details</h2>
              <span className={`px-3 py-1 rounded-full text-xs font-bold border flex items-center ${getStatusColor(enquiry.status)}`}>
                {getStatusIcon(enquiry.status)}
                {enquiry.status}
              </span>
            </div>
            <p className="text-sm text-gray-500 flex items-center gap-1.5">
              <Calendar size={14} />
              Submitted on {new Date(enquiry.createdAt).toLocaleDateString()} at {new Date(enquiry.createdAt).toLocaleTimeString()}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors group"
          >
            <X size={24} className="text-gray-400 group-hover:text-gray-600" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-8 space-y-10">
          {/* Customer Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-gray-50 p-6 rounded-3xl border border-gray-100">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Customer Name</p>
              <p className="text-lg font-bold text-gray-900">{enquiry.name}</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-3xl border border-gray-100 flex flex-col justify-center">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Contact Details</p>
              <div className="space-y-2">
                <a href={`tel:${enquiry.phone}`} className="flex items-center gap-2 text-blue-900 font-bold hover:underline">
                  <Phone size={16} /> {enquiry.phone}
                </a>
                {enquiry.email && (
                  <a href={`mailto:${enquiry.email}`} className="flex items-center gap-2 text-blue-900 font-bold hover:underline truncate">
                    <Mail size={16} /> {enquiry.email}
                  </a>
                )}
              </div>
            </div>
            <div className="bg-gray-50 p-6 rounded-3xl border border-gray-100">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Location</p>
              <div className="flex items-start gap-2 text-gray-700 font-medium">
                <MapPin size={18} className="text-blue-900 mt-0.5" />
                <span>{enquiry.location}</span>
              </div>
            </div>
          </div>

          {/* Selected Products */}
          <section>
            <h3 className="text-xl font-black text-gray-900 mb-6 flex items-center gap-2">
              Selected Products
              <span className="bg-blue-100 text-blue-900 text-sm px-2.5 py-0.5 rounded-full">
                {enquiry.selectedProducts?.length || (enquiry.product ? 1 : 0)}
              </span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {enquiry.selectedProducts && enquiry.selectedProducts.length > 0 ? (
                enquiry.selectedProducts.map((prod: any, idx: number) => (
                  <div key={idx} className="group bg-white border border-gray-200 rounded-[2rem] overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    <div className="aspect-video bg-gray-100 overflow-hidden relative">
                      <img
                        src={prod.image || '/placeholder-image.png'}
                        alt={prod.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3">
                        <span className="bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-black uppercase text-blue-900 shadow-sm">
                          {prod.category?.name || 'Product'}
                        </span>
                      </div>
                    </div>
                    <div className="p-5">
                      <h4 className="font-black text-gray-900 mb-1">{prod.name}</h4>
                    </div>
                  </div>
                ))
              ) : enquiry.product ? (
                <div className="group bg-white border border-gray-200 rounded-[2rem] overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="aspect-video bg-gray-100 overflow-hidden relative">
                    <img
                      src={enquiry.product.images?.[0] || '/placeholder-image.png'}
                      alt={enquiry.product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-5">
                    <h4 className="font-black text-gray-900 mb-1">{enquiry.product.name}</h4>
                  </div>
                </div>
              ) : (
                <div className="col-span-full py-8 text-center bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200 text-gray-400 font-medium">
                  General Inquiry (No specific products selected)
                </div>
              )}
            </div>
          </section>

          {/* Message and Purpose */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <section className="bg-blue-900 text-white p-8 rounded-[2.5rem] shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-10 opacity-10 pointer-events-none">
                <MessageSquareIcon size={120} />
              </div>
              <h3 className="text-xl font-black mb-4 relative z-10">Customer Message</h3>
              <p className="text-blue-50 leading-relaxed font-medium relative z-10 whitespace-pre-wrap">
                {enquiry.message || "No specific message provided."}
              </p>
            </section>

            <section className="space-y-6">
              <div>
                <h3 className="text-xl font-black text-gray-900 mb-4">Usage Purpose</h3>
                <div className="flex flex-wrap gap-2">
                  {enquiry.usagePurpose && enquiry.usagePurpose.length > 0 ? (
                    enquiry.usagePurpose.map((purpose: string, idx: number) => (
                      <span key={idx} className="bg-green-50 text-green-700 border border-green-100 px-4 py-2 rounded-2xl text-sm font-bold flex items-center gap-2">
                        <CheckCircle size={14} />
                        {purpose}
                      </span>
                    ))
                  ) : (
                    <span className="text-gray-400 italic">No usage purpose specified</span>
                  )}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-black text-gray-900 mb-4">Action & Status</h3>
                <div className="flex flex-wrap gap-3">
                  <select
                    value={enquiry.status}
                    onChange={(e) => onUpdateStatus(enquiry._id || enquiry.id, e.target.value)}
                    className="flex-1 bg-white border-2 border-gray-200 px-4 py-3 rounded-2xl font-bold text-gray-700 focus:border-blue-900 outline-none transition-all cursor-pointer shadow-sm hover:border-gray-300"
                  >
                    <option value="PENDING">Mark as PENDING</option>
                    <option value="RESPONDED">Mark as RESPONDED</option>
                    <option value="CLOSED">Mark as CLOSED</option>
                  </select>
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* Footer */}
        <div className="px-8 py-6 bg-gray-50 border-t border-gray-100 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-8 py-3 bg-white border-2 border-gray-200 text-gray-700 rounded-2xl font-black hover:bg-gray-100 transition-all duration-300 active:scale-95"
          >
            Close
          </button>
          <a
            href={`https://wa.me/${enquiry.phone.replace(/[^0-9]/g, '')}`}
            target="_blank"
            className="px-8 py-3 bg-[#25D366] text-white rounded-2xl font-black hover:bg-[#128C7E] transition-all duration-300 flex items-center gap-2 active:scale-95 shadow-lg shadow-green-200"
          >
            Reply via WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}

function MessageSquareIcon({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}