'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, MessageCircle } from 'lucide-react';

interface ThankYouAnimationProps {
  isVisible: boolean;
  onClose: () => void;
  autoRedirect?: boolean;
}

export default function ThankYouAnimation({ isVisible, onClose, autoRedirect = false }: ThankYouAnimationProps) {
  if (!isVisible) return null;

  // Auto redirect to homepage after animation completes
  React.useEffect(() => {
    if (autoRedirect && isVisible) {
      const timer = setTimeout(() => {
        onClose();
        // Redirect to homepage
        window.location.href = '/';
      }, 3000); // 3 seconds delay
      
      return () => clearTimeout(timer);
    }
  }, [isVisible, autoRedirect, onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.5, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.5, opacity: 0, y: 50 }}
        transition={{ 
          type: "spring", 
          stiffness: 300, 
          damping: 20,
          duration: 0.5 
        }}
        className="relative bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 text-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Animated Checkmark */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ 
            delay: 0.2, 
            type: "spring", 
            stiffness: 200,
            damping: 10
          }}
          className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <motion.div
            initial={{ rotate: -180, scale: 0 }}
            animate={{ rotate: 0, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <CheckCircle className="w-12 h-12 text-green-600" />
          </motion.div>
        </motion.div>

        {/* Main Message */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="text-2xl font-bold text-brand-navy mb-3"
        >
          Thank You!
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="text-gray-600 mb-6"
        >
          Your enquiry has been submitted successfully. Our team will reach out to you shortly via WhatsApp.
        </motion.p>

        {/* WhatsApp Icon Animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.9, duration: 0.5 }}
          className="flex items-center justify-center mb-6"
        >
          <div className="relative">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
              <MessageCircle className="w-8 h-8 text-white" />
            </div>
            {/* Pulsing ring */}
            <motion.div
              className="absolute inset-0 w-16 h-16 border-4 border-green-300 rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.7, 0, 0.7]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </div>
        </motion.div>

        {/* Close Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.5 }}
          onClick={onClose}
          className="bg-brand-primary hover:bg-brand-navy text-white px-6 py-3 rounded-full font-bold transition-colors shadow-lg hover:shadow-xl"
        >
          Continue Browsing
        </motion.button>

        {/* Confetti Effect Elements */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-brand-accent rounded-full"
            initial={{ 
              x: 0, 
              y: 0, 
              opacity: 1,
              scale: 1
            }}
            animate={{ 
              x: [0, (i % 2 === 0 ? 1 : -1) * (100 + Math.random() * 100)],
              y: [-50, -200 - Math.random() * 100],
              opacity: [1, 0],
              scale: [1, 0]
            }}
            transition={{ 
              duration: 1 + Math.random() * 1,
              delay: 0.5 + Math.random() * 0.5
            }}
            style={{
              left: `${20 + i * 15}%`,
              bottom: '20%'
            }}
          />
        ))}
      </motion.div>
    </motion.div>
  );
}