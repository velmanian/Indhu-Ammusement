'use client';

import { useEffect, useState } from 'react';
import ProductEnquiryForm from './ProductEnquiryForm';

export default function ContactForm() {
  const [productId, setProductId] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const productIdParam = urlParams.get('productId');
      if (productIdParam) {
        const parsedId = parseInt(productIdParam);
        if (!isNaN(parsedId)) {
          setProductId(parsedId);
        }
      }
    }
  }, []);

  return <ProductEnquiryForm productId={productId} />;
}