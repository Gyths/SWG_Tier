// app/login/page.tsx
'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { api } from '~/trpc/react';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const { login } = useAuth();

  const loginMutation = api.auth.login.useMutation({
    onSuccess: (data) => {
      login({
        id: data.id,
        username: data.name ?? data.email ?? 'Usuario',
      });
      router.push('/');
    },
    onError: (err) => {
      setError(err.message);
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    loginMutation.mutate({ email, password });
  };

  return (
    <div className="min-h-screen bg-[#F5F3EF] flex items-center justify-center p-4">
      <div className="bg-[#429B99] rounded-2xl shadow-2xl p-8 w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Image
            src="/images/SWG.svg"
            alt="Logo"
            width={300}
            height={300}
            className="rounded-full"
          />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-white/90 border-2 border-transparent focus:border-white focus:bg-white outline-none transition"
              placeholder="tu@email.com"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Contraseña
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-white/90 border-2 border-transparent focus:border-white focus:bg-white outline-none transition"
              placeholder="Ingresa tu contraseña"
              required
            />
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-500/20 border border-red-500 text-white px-4 py-2 rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loginMutation.isPending}
            className="w-full bg-[#833F57] text-white font-semibold py-3 rounded-lg hover:bg-[#B5416A] transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loginMutation.isPending ? 'Cargando...' : 'Lesgo'}
          </button>
        </form>
      </div>
    </div>
  );
}