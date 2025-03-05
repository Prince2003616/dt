// components/PartnersSection.tsx
"use client";

import React from "react";
import Image from "next/image";
import CountUp from "react-countup";
import { motion } from "framer-motion";

interface NumberData {
  value: number;
  text: string;
}

const PartnersSection = () => {
  const images = [
    "/IBM-3.webp",
    "/Google-Cloud-3.webp",
    "/Microsoft-1.webp",
    "/Tableau-2.webp",
    "/Blockchain-1.webp",
  ];

  const numberData: NumberData[] = [
    { value: 50, text: "Online Courses" },
    { value: 1000, text: "Active Students" },
    { value: 15, text: "Instructors" },
    { value: 20, text: "Certifications" },
  ];

  return (
    <div className="bg-white py-16">
      <div className="container mx-auto text-center">
        {/* Learning Partner */}
        <motion.h2
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-extrabold mb-10 bg-gradient-to-r from-yellow-400 to-orange-500 text-transparent bg-clip-text"
        >
          Learning Partners
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex justify-center space-x-8 mb-12"
        >
          <Image src="/gk.webp" alt="Global Knowledge" width={150} height={15} className="object-contain" />
          <Image src="/gkcloud.webp" alt="GK Cloud Solutions" width={100} height={10} className="object-contain" />
        </motion.div>

        {/* In Association With Infinite Marquee */}
        <motion.h2
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-4xl font-extrabold mb-10 bg-gradient-to-r from-yellow-400 to-orange-500 text-transparent bg-clip-text"
        >
          In Association With
        </motion.h2>

        <div className="overflow-hidden py-6 relative w-full">
          <motion.div
            className="flex w-max space-x-8"
            animate={{ x: [0, "-50%"] }}
            transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
            style={{ display: "flex", whiteSpace: "nowrap" }}
          >
            {[...images, ...images].map((image, index) => (
              <div key={index} className="relative flex-shrink-0">
                <Image
                  src={image}
                  alt={`Partner ${index + 1}`}
                  width={200}
                  height={200}
                  className="w-40 h-40 object-contain rounded-lg opacity-75 hover:opacity-100 transition-opacity duration-300"
                />
              </div>
            ))}
          </motion.div>
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {numberData.map((item, index) => (
            <div
              key={index}
              className="bg-white text-yellow-500 rounded-xl p-8 shadow-md hover:shadow-lg transition-all duration-300"
            >
              <div className="text-4xl font-bold">
                <CountUp end={item.value} duration={3} />+
              </div>
              <div className="mt-2">{item.text}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default PartnersSection;