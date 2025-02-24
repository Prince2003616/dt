"use client";
import React, { useState, useEffect, useRef } from "react";

interface AccordionItem {
  title: string;
  content: string;
}

const Accordion: React.FC<{ items: AccordionItem[] }> = ({ items }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const fadeInRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (fadeInRef.current) {
      observer.observe(fadeInRef.current);
    }

    return () => {
      if (fadeInRef.current) {
        observer.unobserve(fadeInRef.current);
      }
    };
  }, []);

  return (
    <div className="bg-black text-white py-12">
      <div className="container mx-auto px-4 md:px-8 lg:px-12 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div
          ref={fadeInRef}
          className={`opacity-0 transform transition-all duration-1000 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "translate-y-10"
          }`}
        >
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8">
            Introducing STU, your knowledge companion!
          </h1>
          {items.map((item, index) => (
            <div key={index} className="mb-3">
              <div
                className="flex items-center justify-between py-3 px-4 bg-black border border-gray-700 rounded-md cursor-pointer hover:bg-gray-900 hover:scale-105 transition-all duration-300 ease-out"  // Shorter and smoother hover animation
                onClick={() => toggleAccordion(index)}
              >
                <div className="flex items-center">
                  <span className="mr-2">●</span>
                  <span className="font-medium">{item.title}</span>
                </div>
                <span
                  className={`transform transition-transform duration-300 ease-out ${   // Shorter and smoother rotation animation
                    openIndex === index ? "rotate-45" : "rotate-0"
                  }`}
                >
                  +
                </span>
              </div>
              <div
                className={`px-4 overflow-hidden transition-[max-height] duration-500 ease-out bg-black border border-t-0 border-gray-700 rounded-b-md ${  // Shorter and smoother height transition
                  openIndex === index ? "max-h-60 py-3" : "max-h-0 py-0"
                }`}
              >
                {item.content}
              </div>
            </div>
          ))}
          <p className="mt-8">
            Using Stu is as simple as typing your question into the chat
            interface. Stu, your virtual assistant, will swiftly process your
            query and provide you with a clear and concise answer. If you&apos;re
            looking for a deeper understanding, don&apos;t hesitate to ask
            follow-up questions or request a more detailed explanation.
          </p>
        </div>
        <div className="hidden md:block">
          <div className="bg-transparent h-full rounded-md p-4 flex justify-center items-center">
            <video className="rounded-md w-full h-auto" autoPlay loop muted>
              <source src="/stuanimation5.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </div>
    </div>
  );
};

const Home: React.FC = () => {
  const accordionItems: AccordionItem[] = [
    {
      title: "Instant answers",
      content:
        "You don't need to wait for an instructor or TA to respond to your queries, instead Stu can respond to them right now.",
    },
    {
      title: "Detailed explanations",
      content:
        "Stu can provide detailed explanations of the answers, so you can understand the concepts better. This includes breaking down complex topics into smaller, more digestible pieces, and providing relevant examples to illustrate the concepts.",
    },
    {
      title: "Problem-solving assistance",
      content:
        "Stu is available 24/7 to help you with your doubts. Whether you're stuck on a homework problem, struggling to understand a concept, or simply need some guidance, Stu is there to provide support and assistance whenever you need it.",
    },
    {
      title: "Personalized learning",
      content:
        "Stu adapts to your learning style, pace, and preferences, providing a customized learning experience tailored to your specific needs.",
    },
  ];

  return (
    <div className="bg-black min-h-screen">
      <Accordion items={accordionItems} />
    </div>
  );
};

export default Home;