// app/_components/NavBar.tsx
'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';

export default function NavBar() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleAuthClick = () => {
    if (user) {
      setShowDropdown(!showDropdown);
    } else {
      console.log('Navigating to /login');
      router.push('/login');
    }
  };

  const handleLogout = () => {
    logout();
    setShowDropdown(false);
    router.push('/');
  };

  return (
    <nav className="sticky top-0 z-50 bg-[#2F3337] flex items-center justify-between px-4 h-16">
      {/* Left SVG */}
      <div className="flex items-center cursor-pointer" onClick={() => router.push('/')}>
        <img
          src="/images/SWG.svg"
          alt="Icon"
          className="w-30 h-30"
        />
      </div>

      {/* Center SVG */}
      <div className="flex items-center">
        <img
          src="/images/BT.svg"
          alt="Icon"
          className="w-30 h-30"
        />
      </div>

      {/* Auth Section */}
      <div className="relative">
        {user ? (
          <>
            <button
              onClick={handleAuthClick}
              className="border border-[#429B99] text-[#429B99] px-3 py-1 rounded hover:bg-[#429B99]/10 transition flex items-center gap-2"
            >
              <span>{user.username}</span>
              <svg 
                className={`w-4 h-4 transition-transform ${showDropdown ? 'rotate-180' : ''}`}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {/* Dropdown Menu */}
            {showDropdown && (
              <>
                {/* Backdrop */}
                <div 
                  className="fixed inset-0 z-40" 
                  onClick={() => setShowDropdown(false)}
                />
                
                {/* Dropdown */}
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition"
                  >
                    Cerrar Sesión
                  </button>
                </div>
              </>
            )}
          </>
        ) : (
          <button
            onClick={handleAuthClick}
            className="border border-[#429B99] text-[#429B99] px-3 py-1 rounded hover:bg-[#429B99]/10 transition"
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
}