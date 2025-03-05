/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import Lottie from "lottie-react";
import { motion } from "framer-motion"; // Import framer-motion

interface AccordionItem {
  title: string;
  content: string;
}

const Accordion: React.FC<{ items: AccordionItem[] }> = ({ items }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [animationData, setAnimationData] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const fadeInRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    fetch("/assets/animation.json")
      .then((response) => response.ok ? response.json() : Promise.reject(`HTTP error! Status: ${response.status}`))
      .then((data) => setAnimationData(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const toggleAccordion = useCallback((index: number) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (fadeInRef.current) observer.observe(fadeInRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="bg-white text-gray-800 py-16">
      <div className="container mx-auto px-6 md:px-12 lg:px-20 grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Left Section (Text + Accordion) */}
        <motion.div
          ref={fadeInRef}
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
            Meet <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-transparent bg-clip-text">STU</span>, your AI Knowledge Companion!
          </h1>

          {items.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <button
                id={`accordion-button-${index}`}
                className="flex items-center justify-between w-full gap-5 py-4 px-6 bg-gradient-to-r from-yellow-200 to-yellow-400 border border-yellow-500 rounded-lg shadow-lg cursor-pointer hover:bg-yellow-300 transition-all duration-300"
                onClick={() => toggleAccordion(index)}
                aria-expanded={openIndex === index}
                aria-controls={`accordion-content-${index}`}
              >
                <div className="flex items-center space-x-3 text-lg font-semibold text-gray-900">
                  <span className="text-yellow-700">●</span>
                  <span>{item.title}</span>
                </div>
                <motion.span
                  animate={{ rotate: openIndex === index ? 45 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-2xl text-yellow-700"
                >
                  +
                </motion.span>
              </button>
              <motion.div
                id={`accordion-content-${index}`}
                role="region"
                aria-labelledby={`accordion-button-${index}`}
                initial={{ height: 0, opacity: 0 }}
                animate={openIndex === index ? { height: "auto", opacity: 1 } : {}}
                transition={{ duration: 0.5 }}
                className="px-6 overflow-hidden bg-yellow-100 border border-t-0 border-yellow-500 rounded-b-lg"
              >
                <p className="text-gray-700 text-md py-4">{item.content}</p>
              </motion.div>
            </motion.div>
          ))}

          <p className="mt-8 text-gray-600 text-lg">
            Simply type your question into the chat, and STU will provide instant, clear, and detailed answers. Dive deeper into concepts with follow-ups!
          </p>
        </motion.div>

        {/* Right Section (Animation) */}
        <motion.div
          className="hidden md:flex justify-center items-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="bg-yellow-100 h-full rounded-xl p-6 flex justify-center items-center shadow-xl">
            {loading ? (
              <p className="text-gray-900">Loading animation...</p>
            ) : error ? (
              <p className="text-red-500">Error: {error}</p>
            ) : animationData ? (
              <Lottie animationData={animationData} loop autoplay style={{ width: "100%", height: "auto" }} />
            ) : (
              <p className="text-gray-600">Animation data not available</p>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const Home: React.FC = () => {
  const accordionItems = useMemo<AccordionItem[]>(() => [
    {
      title: "Instant answers",
      content:
        "You don't need to wait for an instructor or TA to respond to your queries, instead STU can provide instant answers 24/7.",
    },
    {
      title: "Detailed explanations",
      content:
        "STU can provide step-by-step breakdowns of complex topics, making it easier to grasp new concepts effectively.",
    },
    {
      title: "Problem-solving assistance",
      content:
        "STU assists with homework, coding problems, and theoretical queries, ensuring you never get stuck in learning.",
    },
    {
      title: "Personalized learning",
      content:
        "STU adapts to your pace and learning style, delivering customized content for a seamless educational experience.",
    },
  ], []);

  return (
    <div className="h-fit">
      <Accordion items={accordionItems} />
    </div>
  );
};

export default Home;
