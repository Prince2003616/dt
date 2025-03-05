// components/CategorySection.tsx
"use client";

import React from "react";
import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion"; // Import framer-motion

const CategorySection = () => {
  const [displayText] = useState<string>("Browse By Category");

  const categories = [
    { name: "Artificial Intelligence", imageUrl: "/AI.webp", link: "/" },
    { name: "Google Cloud", imageUrl: "/GlCloud.webp", link: "/" },
    { name: "RedHat", imageUrl: "/RedHat.webp", link: "/" },
    { name: "Tableau", imageUrl: "/tab.webp", link: "/" },
    { name: "Microsoft", imageUrl: "/ms.webp", link: "/" },
  ];

  // Animation variants for framer-motion
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Stagger the animation of children
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 }, // Start slightly below
    visible: { opacity: 1, y: 0 }, // Move to original position
  };

  return (
    <div className="bg-white py-16">
      <div className="container mx-auto text-center">
        {/* Title with Gradient Effect */}
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, amount: 0.5 }} // Trigger when 50% of the element is in view
          className="text-4xl font-extrabold mb-10 bg-gradient-to-r from-yellow-400 to-orange-500 text-transparent bg-clip-text"
        >
          {displayText}
        </motion.h2>

        {/* Categories Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }} // Trigger when 20% of the element is in view
          className="flex flex-wrap justify-center gap-10"
        >
          {categories.map((category) => (
            <motion.a
              key={category.name}
              href={category.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center transform transition-transform duration-300 hover:scale-110"
              variants={itemVariants}
              whileHover={{ scale: 1.1 }} // Add hover animation
            >
              {/* Circular Image Container with Gradient Border */}
              <div className="w-60 h-40 mb-4 rounded-full border-4 border-transparent bg-gradient-to-r from-yellow-400 to-orange-500 p-1">
                <div className="w-full h-full bg-white rounded-full flex justify-center items-center">
                  <Image
                    src={category.imageUrl}
                    alt={category.name}
                    width={96}
                    height={96}
                    className="object-contain p-2"
                  />
                </div>
              </div>

              {/* Category Name */}
              <p className="text-gray-800 font-semibold text-lg">{category.name}</p>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default CategorySection;