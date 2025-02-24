// components/PartnersSection.tsx
"use client";
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import CountUp from 'react-countup';

interface NumberData {
  value: number;
  text: string;
}

const PartnersSection = () => {
  const images = [
    '/IBM-3.webp',
    '/Google-Cloud-3.webp',
    '/Microsoft-1.webp',
    '/Tableau-2.webp',
    '/Blockchain-1.webp',
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(timerRef.current!);
  }, [images.length]);

  const numberData: NumberData[] = [
    { value: 50, text: "Online Courses" },
    { value: 1000, text: "Active Students" },
    { value: 15, text: "Instructors" },
    { value: 20, text: "Certifications" },
  ];

  return (
    <div className="bg-gray-50 py-16">
      <div className="container mx-auto text-center">
        {/* Learning Partner */}
        <h2 className="text-3xl font-semibold mb-8 text-yellow-500">
          Learning Partners
        </h2>
        <div className="flex justify-center space-x-8 mb-12">
          <Image src="/gk.webp" alt="Global Knowledge" width={150} height={15} className="object-contain" />
          <Image src="/gkcloud.webp" alt="GK Cloud Solutions" width={100} height={10} className="object-contain " />
        </div>

        {/* In Association With Image Slider */}
        <h2 className="text-3xl font-semibold mb-8 text-yellow-500">
          In Association With
        </h2>
        <div className="flex justify-center items-center overflow-hidden py-6">
          {images.map((image, index) => {
            const style = {
              transform: `translateX(${(index - currentIndex) * 100}%)`, // Adjust spacing
              transition: 'transform 0.5s linear',
            };

            const className = "w-40 h-40 object-contain rounded-lg mx-4 opacity-75";
            return (
              <div
                key={index}
                className="relative"
                style={style}
              >
                <Image
                  src={image}
                  alt={`Partner ${index + 1}`}
                  width={200}
                  height={200}
                  className={className}
                  style={{ transition: 'transform 0.5s linear' }}
                />
              </div>
            );
          })}
        </div>

        {/* Stats Section */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
          {numberData.map((item, index) => (
            <div key={index} className="bg-white rounded-xl p-8 shadow-md hover:shadow-lg transition-shadow duration-300 hover:bg-yellow-500 hover:text-white">
              <div className="text-4xl font-bold text-gray-800">
                <CountUp end={item.value} duration={3} />+
              </div>
              <div className="text-gray-600 mt-2">{item.text}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PartnersSection;