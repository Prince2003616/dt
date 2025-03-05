"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion"; // Import framer-motion

const Skill = () => {
  const [headingText] = useState<string>(
    "Cultivate Skills from Futuristic Courses"
  );

  const reasons = [
    {
      title: "Crafted by Industry Experts",
      description:
        "Our curriculum is meticulously crafted with industry and academic professionals, ensuring you gain practical skills through real-world projects.",
      imageUrl: "/Crafted-by-industry-8.webp",
    },
    {
      title: "Empowering Learners for a Bright Future",
      description:
        "We provide high-quality programs to help learners reach their full potential through innovative courses and a supportive learning environment.",
      imageUrl: "/Empowering-learner-8.webp",
    },
    {
      title: "Weekend Batches for Flexibility",
      description:
        "Weekend batches allow you to upskill without compromising your current commitments.",
      imageUrl: "/Weekend-8.webp",
    },
    {
      title: "Certified by OEMs",
      description:
        "OEM certification ensures credibility by aligning with the latest technologies and best practices.",
      imageUrl: "/Certified-OEM-8.webp",
    },
  ];

  // Framer Motion animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="bg-gray-50 py-16">
      <div className="container mx-auto px-6 md:px-12 lg:px-16 text-center">
        {/* Heading Animation */}
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, amount: 0.5 }}
          className="text-4xl font-extrabold text-yellow-500 mb-10"
        >
          {headingText}
        </motion.h2>

        {/* Animated Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10"
        >
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-6 flex flex-col items-center text-center border border-gray-200"
            >
              {/* Image */}
              <div className="w-24 h-24 mb-4 flex items-center justify-center rounded-full bg-gradient-to-r from-yellow-300 to-orange-400 p-2 shadow-inner">
                <Image
                  src={reason.imageUrl}
                  alt={reason.title}
                  width={96}
                  height={96}
                  className="object-contain"
                />
              </div>

              {/* Title */}
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {reason.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 leading-relaxed">{reason.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Skill;
