const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export const fetchPublic = async (endpoint: string) => {
  const res = await fetch(`${API_URL}/public${endpoint}`);
  if (!res.ok) throw new Error('API request failed');
  return res.json();
};

export const postEnquiry = async (data: any) => {
  const res = await fetch(`${API_URL}/public/enquiry`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to submit enquiry');
  return res.json();
};

export const loginAdmin = async (credentials: any) => {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });
  if (!res.ok) throw new Error('Login failed');
  return res.json();
};
