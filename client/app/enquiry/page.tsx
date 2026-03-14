'use client';

import ProductEnquiryForm from '@/components/ProductEnquiryForm';
import { motion } from 'framer-motion';

export default function EnquiryPage() {
    return (
        <div className="bg-brand-light min-h-screen pt-24 pb-16 flex flex-col items-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col items-center">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-4xl md:text-6xl font-black text-brand-navy mb-4 tracking-tight">
                        Start Your <span className="text-brand-primary">Project</span>
                    </h1>
                    <p className="text-gray-500 text-lg max-w-2xl mx-auto font-medium">
                        Fill out the form below and our professional engineering team will get back to you with a custom quote within 24 hours.
                    </p>
                </motion.div>

                <ProductEnquiryForm />

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 1 }}
                    className="mt-16 text-center text-gray-400 text-sm font-bold uppercase tracking-[0.2em]"
                >
                    Trusted by over 500+ Parks, Schools & Resorts across India
                </motion.div>
            </div>
        </div>
    );
}
