'use client';

import { useState, useEffect } from 'react';
import ProductEnquiryForm from './ProductEnquiryForm';

interface ProductEnquiryFormWrapperProps {
  productId?: number;
}

export default function ProductEnquiryFormWrapper({ productId }: ProductEnquiryFormWrapperProps) {
  return <ProductEnquiryForm productId={productId} />;
}