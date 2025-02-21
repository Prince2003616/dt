// components/CategorySection.tsx
"use client";

import React from 'react';
import Image from 'next/image';
import { useState } from 'react';

const CategorySection = () => {
  const [displayText] = useState<string>("Browse By Category")

  const categories = [
    { name: 'Artificial Intelligence', imageUrl: '/AI.webp', link: '/' }, // Replace with actual links
    { name: 'Google Cloud', imageUrl: '/GlCloud.webp', link: '/' },
    { name: 'RedHat', imageUrl: '/RedHat.webp', link: '/' },
    { name: 'Tableau', imageUrl: '/tab.webp', link: '/' },
    { name: 'Microsoft', imageUrl: '/ms.webp', link: '/' },
  ];

  return (
    <div className="bg-white py-12">
      <div className="container mx-auto text-center">

        <h2 className="text-3xl font-semibold mb-8 text-black">
          {displayText}
        </h2>

        <div className="flex justify-center space-x-24">
          {categories.map((category) => (
            <a
              key={category.name}
              href={category.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center transform transition-transform duration-300 hover:scale-110" // Enlarge on hover
            >
              <div className="w-24 h-24 mb-4 rounded-full transition-transform duration-300"> {/* Removed shadow */}
                <Image
                  src={category.imageUrl}
                  alt={category.name}
                  width={96}
                  height={96}
                  className="object-contain p-2"
                />
              </div>
              <p className="text-gray-700">{category.name}</p>
            </a>
          ))}
        </div>

      </div>
    </div>
  );
};

export default CategorySection;