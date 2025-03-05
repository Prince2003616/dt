import React from "react";
import { motion } from "framer-motion";
import { CheckCircle, Users, Target, Book, Lightbulb } from "lucide-react";

const sections = [
  {
    title: "Prerequisites",
    icon: Users,
    color: "bg-blue-500",
    items: ["Anyone can attend the course."],
  },
  {
    title: "Objectives",
    icon: Target,
    color: "bg-green-500",
    items: [
      "Elevate your tech and AI career with our cutting-edge Prompt Engineering for Generative AI Course.",
      "Gain hands-on experience with Prompt Engineering and Generative AI.",
    ],
  },
  {
    title: "What You Will Learn",
    icon: Book,
    color: "bg-purple-500",
    items: [
      "Use prompt engineering to build better applications.",
      "Discover the endless possibilities of LLMs and create your own chatbot.",
      "Write and refine prompts using the OpenAI API.",
    ],
  },
  {
    title: "Target Audience",
    icon: Lightbulb,
    color: "bg-yellow-500",
    items: [
      "Ideal for AI researchers, software engineers, data scientists, and professionals working on NLP projects.",
      "Open doors to new opportunities in AI and technology.",
    ],
  },
];

const CourseSections: React.FC = () => {
  return (
    <div className="bg-white py-16 px-6 md:px-12">
      <motion.h2
        className="text-4xl font-bold text-gray-900 text-center mb-12"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        Course Overview
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10">
        {sections.map((section, index) => (
          <motion.div
            key={index}
            className="relative p-8 bg-white shadow-lg border border-gray-200 rounded-xl overflow-hidden transition-all"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.05, boxShadow: "0px 10px 20px rgba(0,0,0,0.15)" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            {/* Icon Badge */}
            <div
              className={`w-14 h-14 flex items-center justify-center rounded-full ${section.color} text-white shadow-md`}
            >
              <section.icon className="w-7 h-7" />
            </div>

            {/* Section Title */}
            <h2 className="text-2xl font-semibold text-gray-900 mt-5 mb-4">
              {section.title}
            </h2>

            {/* Content List */}
            <ul className="space-y-3">
              {section.items.map((item, idx) => (
                <motion.li
                  key={idx}
                  className="flex items-start gap-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1, duration: 0.4 }}
                >
                  <CheckCircle className="w-6 h-6 text-yellow-500 mt-1" />
                  <span className="text-gray-700 leading-relaxed">{item}</span>
                </motion.li>
              ))}
            </ul>

            {/* Animated Gradient Background */}
            <motion.div
              className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-500 via-blue-500 to-green-500"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 1, ease: "easeInOut" }}
            ></motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CourseSections;
