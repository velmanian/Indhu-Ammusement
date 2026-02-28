'use client';

interface TokenPayload {
  id: string;
  email: string;
  role: string;
  exp: number;
}

export async function verifyToken(token: string): Promise<TokenPayload> {
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
  
  const res = await fetch(`${API_URL}/auth/verify`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    throw new Error('Token verification failed');
  }

  const data = await res.json();
  return data.payload || data;
}
