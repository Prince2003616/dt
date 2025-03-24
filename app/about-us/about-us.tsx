/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

// Motion utilities
const staggerContainer = (staggerChildren?: number, delayChildren?: number) => ({
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren,
      delayChildren,
    },
  },
});

const fadeIn = (direction: string, type: string, delay: number, duration: number) => ({
  hidden: {
    x: direction === 'left' ? 100 : direction === 'right' ? -100 : 0,
    y: direction === 'up' ? 100 : direction === 'down' ? -100 : 0,
    opacity: 0,
  },
  show: {
    x: 0,
    y: 0,
    opacity: 1,
    transition: {
      type,
      delay,
      duration,
      ease: 'easeOut',
    },
  },
});

const slideIn = (direction: string, type: string, delay: number, duration: number) => ({
  hidden: {
    x: direction === 'left' ? '-100%' : direction === 'right' ? '100%' : 0,
    y: direction === 'up' ? '100%' : direction === 'down' ? '100%' : 0,
  },
  show: {
    x: 0,
    y: 0,
    transition: {
      type,
      delay,
      duration,
      ease: 'easeOut',
    },
  },
});

const rotate = (delay: number, duration: number) => ({
  hidden: { rotate: -180, opacity: 0, scale: 0.5 },
  show: { 
    rotate: 0, 
    opacity: 1, 
    scale: 1,
    transition: {
      type: 'spring',
      delay,
      duration,
      ease: 'easeOut',
    },
  },
});

const pulse = (delay: number, duration: number) => ({
  hidden: { scale: 0.8, opacity: 0 },
  show: { 
    scale: [1, 1.05, 1],
    opacity: 1,
    transition: {
      type: 'spring',
      delay,
      duration,
      ease: 'easeOut',
      repeat: Infinity,
      repeatDelay: 3,
    },
  },
});

const AboutUs = () => {
  const [LottieComponent, setLottieComponent] = useState<React.ComponentType<any> | null>(null);
  const [aboutUsData, setAboutUsData] = useState<any>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const importLottie = async () => {
      try {
        const LottieReact = (await import('lottie-react')).default;
        const data = (await import('@/public/about-us.json')).default;
        setLottieComponent(() => LottieReact);
        setAboutUsData(data);
      } catch (error) {
        console.error("Failed to load Lottie or data:", error);
      }
    };

    importLottie();
    
    // Set visibility after a short delay for entrance effect
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const values = [
    { title: "Integrity", description: "We act with honesty and transparency in all our interactions, building trust with our clients and within our team.", icon: "🛡️" },
    { title: "Innovation", description: "We constantly seek new and better ways to leverage AI technology, pushing boundaries and creating breakthrough solutions.", icon: "💡" },
    { title: "Inclusivity", description: "We design our AI solutions to be accessible and beneficial to diverse populations and needs.", icon: "🤝" },
    { title: "Impact", description: "We measure our success by the positive difference our solutions make in people's lives and society.", icon: "🌟" },
  ];

  const focusAreas = [
    { title: "Healthcare", description: "Improving patient outcomes through AI-driven diagnostics and personalized treatment recommendations.", icon: "🏥" },
    { title: "Education", description: "Empowering learners with adaptive learning platforms and intelligent tutoring systems.", icon: "🎓" },
    { title: "Finance", description: "Enhancing financial decision-making through predictive analytics and risk assessment tools.", icon: "💹" },
    { title: "Sustainability", description: "Advancing environmental protection through intelligent resource management and predictive modeling.", icon: "🌱" },
  ];

  if (!LottieComponent || !aboutUsData) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col justify-center items-center h-screen bg-gradient-to-br from-yellow-50 to-white"
      >
        <div className="w-16 h-16 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-yellow-600 font-medium animate-pulse">Loading our story...</p>
      </motion.div>
    );
  }

  return (
    <motion.section
      variants={staggerContainer(0.1, 0.2)}
      initial="hidden"
      animate={isVisible ? "show" : "hidden"}
      className="py-20 bg-gradient-to-br from-yellow-50 to-white overflow-x-hidden"
    >
      <div className="container mx-auto px-4">
        {/* Floating particles background effect */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 15 }).map((_, i) => (
            <motion.div
              key={`particle-${i}`}
              className="absolute rounded-full bg-yellow-500 opacity-10"
              style={{
                width: Math.random() * 50 + 20,
                height: Math.random() * 50 + 20,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                x: [0, Math.random() * 100 - 50],
                y: [0, Math.random() * 100 - 50],
                opacity: [0.1, 0.2, 0.1],
              }}
              transition={{
                duration: Math.random() * 20 + 10,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
          ))}
        </div>
        
        {/* Main header with enhanced design */}
        <motion.div
          variants={pulse(0.2, 1)}
          className="relative mb-20"
        >
          <motion.h2
            variants={fadeIn('down', 'spring', 0.2, 1)}
            className="text-5xl font-bold text-gray-800 text-center mb-6 relative"
          >
            <span className="relative inline-block">
              Our <span className="text-yellow-500">Story</span>
              <motion.span
                className="absolute -bottom-2 left-0 w-full h-1 bg-yellow-500 transform origin-left"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.8, duration: 0.6 }}
              />
            </span>
          </motion.h2>
          
          <motion.div
            variants={fadeIn('up', 'spring', 0.3, 1)}
            className="w-24 h-1 bg-yellow-300 mx-auto rounded-full"
          />
        </motion.div>

        {/* Vision statement with animated highlighting */}
        <motion.div
          variants={fadeIn('up', 'spring', 0.4, 1)}
          className="max-w-4xl mx-auto text-gray-700 leading-relaxed mb-20 space-y-8"
        >
          <motion.div
            variants={slideIn('left', 'spring', 0.1, 1)}
            className="text-2xl font-light text-center italic text-gray-600 mb-10 px-6 py-8 border-l-4 border-r-4 border-yellow-300 relative"
          >
            <span className="absolute -top-3 left-12 text-5xl text-yellow-400 opacity-30">&quot;</span>
            <p>At <span className="font-semibold">Decision Tree Solutions</span>, we are passionate about harnessing the power of artificial intelligence to revolutionize the way people learn and grow.</p>
            <span className="absolute -bottom-3 right-12 text-5xl text-yellow-400 opacity-30">&quot;</span>
          </motion.div>
          
          {[
            "As a cutting-edge AI firm, we specialize in developing innovative solutions that transform the educational landscape. Our team of expert data scientists, machine learning engineers, and educational professionals work tirelessly to create AI-driven tools and platforms that personalize learning experiences, streamline educational processes, and empower learners of all ages to reach their full potential.",
            "Our flagship edtech offerings leverage the latest advancements in AI to provide adaptive learning, intelligent tutoring systems, and predictive analytics. By analyzing vast amounts of data and understanding individual learning patterns, our AI algorithms deliver customized content, real-time feedback, and targeted recommendations, ensuring that each learner receives the support and guidance they need to succeed.",
            "We believe that education is the key to unlocking a brighter future, and we are committed to making high-quality, AI-powered learning accessible to everyone. Through our intuitive interfaces, engaging content, and seamless integration with existing educational systems, we strive to create a world where every individual has the opportunity to learn, grow, and thrive.",
            "At DTS, we are not just building AI solutions; we are shaping the future of education. Join us on this exciting journey as we redefine what is possible in learning and pave the way for a smarter, more connected world.",
          ].map((text, index) => (
            <motion.p
              key={index}
              variants={slideIn('left', 'spring', index * 0.1, 1)}
              className="text-lg relative overflow-hidden"
            >
              <motion.span
                className="inline-block"
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 + index * 0.2, duration: 0.5 }}
              >
                {text}
              </motion.span>
              <motion.span
                className="absolute bottom-0 left-0 w-full h-0.5 bg-yellow-200"
                initial={{ scaleX: 0, originX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8 + index * 0.1, duration: 0.6 }}
              />
            </motion.p>
          ))}
        </motion.div>

        {/* Animated Lottie with enhanced presentation */}
        <motion.div
          variants={fadeIn('up', 'spring', 0.6, 1)}
          className="mb-24 max-w-4xl mx-auto relative"
        >
          <motion.div
            className="absolute -inset-4 bg-gradient-to-r from-yellow-200 to-yellow-400 rounded-2xl blur-lg opacity-30"
            animate={{ 
              opacity: [0.2, 0.4, 0.2], 
              scale: [0.98, 1.01, 0.98] 
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity,
              repeatType: "mirror" 
            }}
          />
          <div className="relative bg-white rounded-xl shadow-xl overflow-hidden p-1">
            <LottieComponent
              animationData={aboutUsData}
              loop={true}
              className="rounded-xl"
            />
          </div>
        </motion.div>

        {/* Mission, Vision, Focus with creative design */}
        <motion.div
          variants={staggerContainer(0.1, 0.2)}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24"
        >
          {[
            { 
              title: "Our Mission", 
              content: "To create innovative and ethical AI solutions that positively impact people's lives and transform industries.",
              icon: "🎯",
              color: "from-yellow-400 to-amber-500" 
            },
            { 
              title: "Our Vision", 
              content: "To be a global leader in AI technology that drives sustainable development and improves the human experience.",
              icon: "🔭",
              color: "from-amber-400 to-yellow-300"
            },
            { 
              title: "Our Focus", 
              content: "To develop cutting-edge AI applications in fields including healthcare, finance, logistics, and education.",
              icon: "🔍",
              color: "from-yellow-300 to-yellow-400"
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              variants={fadeIn('up', 'spring', index * 0.2, 1)}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              className="p-8 bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all relative overflow-hidden group"
            >
              <motion.div 
                className={`absolute -right-4 -top-4 w-20 h-20 rounded-full bg-gradient-to-br ${item.color} opacity-10 group-hover:opacity-20 transition-opacity`}
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.1, 0.2, 0.1] 
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity,
                  repeatType: "mirror" 
                }}
              />
              
              <motion.div
                variants={rotate(index * 0.2, 1)}
                className="text-3xl mb-4 bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto shadow-inner"
              >
                {item.icon}
              </motion.div>
              
              <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">
                <span className="text-yellow-500">{item.title.split(' ')[0]}</span>{' '}
                {item.title.split(' ').slice(1).join(' ')}
              </h3>
              
              <p className="text-gray-700 text-center">{item.content}</p>
              
              <motion.div
                className="w-12 h-1 bg-yellow-300 mx-auto mt-4 rounded-full"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + index * 0.2, duration: 0.6 }}
              />
            </motion.div>
          ))}
        </motion.div>

        <div className="space-y-24">
          {/* Values section with a creative display */}
          <motion.div
            variants={staggerContainer(0.1, 0.2)}
            className="space-y-8 relative"
          >
            <motion.div
              className="absolute w-full h-full -z-10 opacity-5"
              animate={{
                backgroundPosition: ['0% 0%', '100% 100%'],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                repeatType: 'mirror',
              }}
              style={{
                backgroundImage: "url('/api/placeholder/400/400')",
                backgroundSize: '50px 50px',
              }}
            />
            
            <motion.h3
              variants={fadeIn('down', 'spring', 0.2, 1)}
              className="text-3xl font-bold text-gray-800 text-center mb-6 flex flex-col items-center"
            >
              <span className="text-yellow-500">Our Values</span>
              <motion.div
                className="w-24 h-1 bg-yellow-300 mt-4 rounded-full"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.6 }}
              />
            </motion.h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((item, index) => (
                <motion.div
                  key={index}
                  variants={fadeIn('up', 'spring', index * 0.2, 1)}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-all border-t-4 border-yellow-400 relative"
                >
                  <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-yellow-400 rounded-full w-10 h-10 flex items-center justify-center shadow-md text-xl">
                    {item.icon}
                  </div>
                  <h4 className="text-lg font-semibold mb-3 text-center text-yellow-600 mt-4">
                    {item.title}
                  </h4>
                  <p className="text-gray-700 text-center">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Focus Areas section with visual enhancement */}
          <motion.div
            variants={staggerContainer(0.1, 0.2)}
            className="space-y-8 bg-gray-50 py-16 px-6 rounded-3xl relative overflow-hidden"
          >
            <motion.div
              className="absolute inset-0 opacity-5 -z-10"
              style={{
                backgroundImage: "radial-gradient(circle at 1% 1%, #fff 2px, transparent 2px), radial-gradient(circle at 99% 99%, #fff 2px, transparent 2px)",
                backgroundSize: '40px 40px',
              }}
            />
            
            <motion.h3
              variants={fadeIn('down', 'spring', 0.2, 1)}
              className="text-3xl font-bold text-gray-800 text-center mb-12 flex flex-col items-center"
            >
              <span className="text-yellow-500">Our Focus Areas</span>
              <motion.div
                className="w-32 h-1 bg-yellow-300 mt-4 rounded-full"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.6 }}
              />
            </motion.h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {focusAreas.map((item, index) => (
                <motion.div
                  key={index}
                  variants={fadeIn('up', 'spring', index * 0.2, 1)}
                  whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
                  className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all relative overflow-hidden"
                >
                  <motion.div
                    className="text-5xl mb-6 mx-auto w-20 h-20 rounded-full bg-yellow-100 flex items-center justify-center"
                    animate={{ 
                      rotate: [0, 10, 0, -10, 0],
                    }}
                    transition={{ 
                      duration: 6, 
                      repeat: Infinity,
                      repeatType: "mirror" 
                    }}
                  >
                    {item.icon}
                  </motion.div>
                  
                  <h4 className="text-xl font-semibold mb-3 text-center text-yellow-600">
                    {item.title}
                  </h4>
                  
                  <p className="text-gray-700 text-center">{item.description}</p>
                  
                  <motion.div
                    className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-300 to-yellow-500"
                    initial={{ scaleX: 0, originX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.8 + index * 0.1, duration: 0.6 }}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Commitment cards with visual flair */}
          <motion.div
            variants={staggerContainer(0.1, 0.2)}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
          >
            {[
              { 
                title: "Commitment", 
                content: "To ethical practices and ensuring our AI systems are designed and developed responsibly. We prioritize transparency, accountability, and human-centered design principles in all our projects.",
                gradient: "from-yellow-400 to-amber-300"
              },
              { 
                title: "Privacy", 
                content: "We also believe in the importance of data privacy and security, and we ensure that all our solutions comply with industry standards and regulations.",
                gradient: "from-amber-300 to-yellow-400"
              },
              { 
                title: "Promise", 
                content: "Overall, we strive to create a company that not only delivers innovations, AI solutions, and services but also operates with integrity and social responsibility.",
                gradient: "from-yellow-300 to-amber-400"
              },
              { 
                title: "Success", 
                content: "We believe that our success will come from making a positive impact on society and contributing to the sustainable development of our world.",
                gradient: "from-amber-400 to-yellow-300"
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={fadeIn('up', 'spring', index * 0.2, 1)}
                whileHover={{ 
                  y: -10,
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                }}
                className="p-8 bg-white rounded-xl shadow-md transition-all border border-gray-100 relative overflow-hidden"
              >
                <motion.div 
                  className={`absolute -left-10 -top-10 w-32 h-32 rounded-full bg-gradient-to-r ${item.gradient} opacity-10`}
                  animate={{ 
                    scale: [1, 1.2, 1],
                  }}
                  transition={{ 
                    duration: 4, 
                    repeat: Infinity,
                    repeatType: "mirror" 
                  }}
                />
              
                <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">
                  <span className="text-yellow-500">{item.title[0]}</span>
                  {item.title.slice(1)}
                </h3>
                
                <p className="text-gray-700 text-center">{item.content}</p>
                
                <motion.div
                  className="w-12 h-1 bg-yellow-300 mx-auto mt-6 rounded-full"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + index * 0.2, duration: 0.6 }}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
        
        {/* Footer section */}
        <motion.div
          variants={fadeIn('up', 'spring', 0.8, 1)}
          className="text-center mt-16 pt-12 border-t border-gray-200"
        >
          <p className="text-gray-600">Join us on our mission to revolutionize education through AI</p>
          <Link href="./contact">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-6 px-8 py-3 bg-gradient-to-r from-yellow-400 to-amber-500 text-white font-medium rounded-full shadow-lg hover:shadow-xl transition-all"
          >
            Get in Touch
          </motion.button>
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default AboutUs;