import React from "react";
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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-8">
      {sections.map((section, index) => (
        <div
          key={index}
          className="relative h-60 p-6 bg-white shadow-lg border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl transition-shadow"
        >
          {/* Icon Badge */}
          <div className={`top-1 left-6 w-10 h-10 flex items-center justify-center rounded-full ${section.color} text-white shadow-md`}>
            <section.icon className="w-5 h-5" />
          </div>

          {/* Section Title */}
          <h2 className="text-xl font-semibold text-gray-800 mb-4 mt-4 flex items-center gap-2">
            {section.title}
          </h2>

          {/* Content List */}
          <ul className="space-y-2">
            {section.items.map((item, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-blue-500 mt-1" />
                <span className="text-gray-700 leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>

          {/* Decorative Gradient Background */}
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-green-500 to-purple-500"></div>
        </div>
      ))}
    </div>
  );
};

export default CourseSections;
