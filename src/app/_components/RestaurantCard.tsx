'use client';
import React from 'react';

interface Props {
  name: string;
  image?: string;
  onClick?: () => void;
}

export default function RestaurantCard({ name, image, onClick }: Props) {
  return (
    <div
      onClick={onClick}
      className="w-48 h-64 bg-[#429B99] rounded-lg flex flex-col items-center justify-center text-white p-4 cursor-pointer hover:scale-105 transition-transform"
    >
      {image ? (
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover rounded-md" 
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-600 rounded-md">
          Carguen una imagen vagos
        </div>
      )}
      <span className="mt-2 text-lg font-bold text-center">{name}</span>
    </div>
  );
}