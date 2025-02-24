// components/WhyChooseUs.tsx
"use client";

import React, { useState } from "react";
import Image from "next/image";

const Skill = () => {
  const [headingText] = useState<string>(
    "Cultivate Skills from futuristic Courses"
  );

  const reasons = [
    {
      title: "Crafted by Industry Expert",
      description:
        "Our curriculum is meticulously crafted with industry and academic professionals along with industrial projects and case studies to ensure you gain not just theoretical knowledge but practical skills.",
      imageUrl: "/Crafted-by-industry-8.webp", // Replace with your actual image
    },
    {
      title: "Empowering learners for a Bright Future",
      description:
        "We provide high-quality programs to empower learners to each their full potential by offering innovative programs and supportive learning environments.",
      imageUrl: "/Empowering-learner-8.webp", // Replace with your actual image
    },
    {
      title: "Weekend Batches for Flexibility",
      description:
        "Weekend batches allow you to upskill without compromising your current commitments.",
      imageUrl: "/Weekend-8.webp", // Replace with your actual image
    },
    {
      title: "Certified by OEMs",
      description:
        "OEMs certification gives the credibility based on technologies and best practices, ensuring that you're up to date with the latest advancements.",
      imageUrl: "/Certified-OEM-8.webp", // Replace with your actual image
    },
  ];

  return (
    <div className="bg-white py-16">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-semibold mb-12 text-yellow-500">
          {headingText}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-black">
          {reasons.map((reason, index) => (
            <div key={index} className="p-6 flex flex-col items-center">
              <div className="w-24 h-24 mb-4">
                <Image
                  src={reason.imageUrl}
                  alt={reason.title}
                  width={96}
                  height={96}
                  className="object-contain"
                />
              </div>
              <h3 className="text-lg font-semibold mb-2">{reason.title}</h3>
              <p className="text-gray-700">{reason.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Skill;
