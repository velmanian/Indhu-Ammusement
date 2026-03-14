'use client';

import { useState } from 'react';
import { postEnquiry } from '@/lib/api';
import { Loader2, CheckCircle, Send } from 'lucide-react';

interface EnquiryFormProps {
  productId?: string | number;
  productName?: string;
}

export default function EnquiryForm({ productId, productName }: EnquiryFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    location: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await postEnquiry({ ...formData, productId });
      setSubmitted(true);
      // Redirect to WhatsApp after a short delay
      setTimeout(() => {
        window.open(res.whatsappUrl, '_blank');
      }, 2000);
    } catch (err) {
      alert('Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) return (
    <div className="bg-brand-light p-8 rounded-3xl text-center border border-brand-primary/10">
      <CheckCircle className="text-brand-accent mx-auto mb-4" size={48} />
      <h3 className="text-2xl font-bold text-brand-navy mb-2">Enquiry Sent!</h3>
      <p className="text-brand-primary mb-4 font-medium">Redirecting you to WhatsApp for instant chat...</p>
      <button
        onClick={() => setSubmitted(false)}
        className="text-brand-secondary underline text-sm font-bold"
      >
        Send another enquiry
      </button>
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100">
      <h3 className="text-2xl font-bold text-brand-navy mb-6 border-b-4 border-brand-accent inline-block pb-1">Enquire Now</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-bold text-brand-navy mb-1 uppercase tracking-wider">Full Name</label>
          <input
            required
            type="text"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-primary outline-none bg-brand-light/30"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-bold text-brand-navy mb-1 uppercase tracking-wider">Phone Number</label>
            <input
              required
              type="tel"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-primary outline-none bg-brand-light/30"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-brand-navy mb-1 uppercase tracking-wider">Email Address</label>
            <input
              required
              type="email"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-primary outline-none bg-brand-light/30"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-bold text-brand-navy mb-1 uppercase tracking-wider">Location</label>
          <input
            required
            type="text"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-primary outline-none bg-brand-light/30"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-brand-navy mb-1 uppercase tracking-wider">Message</label>
          <textarea
            required
            rows={4}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-primary outline-none bg-brand-light/30"
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          ></textarea>
        </div>
        <button
          disabled={submitting}
          type="submit"
          className="w-full bg-brand-accent text-brand-navy py-4 rounded-xl font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-opacity-90 transition disabled:opacity-50 shadow-md"
        >
          {submitting ? <Loader2 className="animate-spin" size={20} /> : <><Send size={20} /> Submit Request</>}
        </button>
      </div>
    </form>
  );
}
