'use client'
import React from 'react';

export const CarouselSlide: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className="w-full">{children}</div>;
};