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
  return res.json();
};

export const updateEnquiryStatus = async (enquiryId: number, data: any) => {
  const res = await fetch(`${API_URL}/admin/enquiries/${enquiryId}`, {
    method: 'PUT',
    headers: getAuthHeader(),
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to update enquiry status');
  return res.json();
};

export const deleteEnquiry = async (enquiryId: number) => {
  const res = await fetch(`${API_URL}/admin/enquiries/${enquiryId}`, {
    method: 'DELETE',
    headers: getAuthHeader(),
  });
  if (!res.ok) throw new Error('Failed to delete enquiry');
  return res.json();
};

export const getSingleEnquiry = async (enquiryId: number) => {
  const res = await fetch(`${API_URL}/admin/enquiries/${enquiryId}`, {
    headers: getAuthHeader(),
  });
  if (!res.ok) throw new Error('Failed to fetch enquiry');
  return res.json();
};
