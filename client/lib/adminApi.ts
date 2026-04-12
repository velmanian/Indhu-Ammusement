const getAuthHeader = () => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('adminToken') : '';
  return { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' };
};

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export const fetchAdmin = async (endpoint: string) => {
  const res = await fetch(`${API_URL}/admin${endpoint}`, { headers: getAuthHeader() });
  if (res.status === 401 || res.status === 403) {
    if (typeof window !== 'undefined') window.location.href = '/admin/login';
  }
  if (!res.ok) throw new Error('Admin fetch failed');
  return res.json();
};

export const createProduct = async (data: any) => {
  const res = await fetch(`${API_URL}/admin/products`, {
    method: 'POST',
    headers: getAuthHeader(),
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || errorData.message || 'Failed to create product');
  }
  return res.json();
};

export const updateProduct = async (id: string, data: any) => {
  const res = await fetch(`${API_URL}/admin/products/${id}`, {
    method: 'PUT',
    headers: getAuthHeader(),
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || errorData.message || 'Failed to update product');
  }
  return res.json();
};

export const deleteProduct = async (id: string) => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('adminToken') : '';
  const res = await fetch(`${API_URL}/admin/products/${id}`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${token}` },
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || errorData.message || 'Failed to delete product');
  }
  return res.json();
};

export const uploadImages = async (files: File[]): Promise<string[]> => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('adminToken') : '';
  const formData = new FormData();
  files.forEach(file => formData.append('images', file));
  const res = await fetch(`${API_URL}/admin/upload`, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${token}` },
    body: formData,
  });
  if (!res.ok) throw new Error('Failed to upload images');
  const data = await res.json();
  return data.urls as string[];
};

export const updateEnquiryStatus = async (enquiryId: any, data: any) => {
  const res = await fetch(`${API_URL}/admin/enquiries/${enquiryId}`, {
    method: 'PUT',
    headers: getAuthHeader(),
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || errorData.message || 'Failed to update enquiry status');
  }
  return res.json();
};

export const deleteEnquiry = async (enquiryId: any) => {
  const res = await fetch(`${API_URL}/admin/enquiries/${enquiryId}`, {
    method: 'DELETE',
    headers: getAuthHeader(),
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || errorData.message || 'Failed to delete enquiry');
  }
  return res.json();
};

export const getSingleEnquiry = async (enquiryId: number) => {
  const res = await fetch(`${API_URL}/admin/enquiries/${enquiryId}`, {
    headers: getAuthHeader(),
  });
  if (!res.ok) throw new Error('Failed to fetch enquiry');
  return res.json();
};

export const bulkUploadExcel = async (file: File) => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('adminToken') : '';
  const formData = new FormData();
  formData.append('file', file);
  const res = await fetch(`${API_URL}/admin/bulk-products`, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${token}` },
    body: formData,
  });
  if (!res.ok) throw new Error('Excel upload failed');
  return res.json();
};

export const bulkUploadZip = async (file: File) => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('adminToken') : '';
  const formData = new FormData();
  formData.append('file', file);
  const res = await fetch(`${API_URL}/admin/bulk-images`, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${token}` },
    body: formData,
  });
  if (!res.ok) throw new Error('ZIP upload failed');
  return res.json();
};
