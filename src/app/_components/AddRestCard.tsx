'use client';
import React from 'react';

interface Props {
  onClick: () => void;
  size?: number;       // width & height of the button
  fontSize?: number;   // size of the '+'
  className?: string;
}

export default function AddRestaurantCard({ onClick, size = 40, fontSize = 24, className }: Props) {
  return (
    <div
      onClick={onClick}
      className={`bg-[#833F57] rounded-lg flex items-center justify-center font-light text-white cursor-pointer hover:brightness-110 transition ${className}`}
      style={{
        width: size,
        height: size,
      }}
    >
      <span
        style={{
          fontSize,
          lineHeight: 1,       // important to prevent baseline shifting
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        +
      </span>
    </div>
  );
}
