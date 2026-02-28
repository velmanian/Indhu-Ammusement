'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { loginAdmin } from '@/lib/api';
import { Lock, User, Loader2 } from 'lucide-react';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const data = await loginAdmin({ email, password });
      localStorage.setItem('adminToken', data.token);
      localStorage.setItem('adminUser', JSON.stringify(data.user));
      router.push('/admin/dashboard');
    } catch (err) {
      setError('Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-10 border border-gray-100">
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-blue-900 text-white rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Lock size={40} />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Login</h1>
          <p className="text-gray-500 mt-2">Access the management portal</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 text-center font-medium border border-red-100">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input 
              required
              type="email" 
              placeholder="Admin Email" 
              className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-900 outline-none transition"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input 
              required
              type="password" 
              placeholder="Password" 
              className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-900 outline-none transition"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button 
            disabled={loading}
            className="w-full bg-blue-900 text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-800 transition shadow-lg flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? <Loader2 className="animate-spin" size={24} /> : 'Login to Dashboard'}
          </button>
        </form>
      </div>
    </div>
  );
}
