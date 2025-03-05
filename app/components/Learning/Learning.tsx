"use client";
import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion"; // Import framer-motion

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel({ children, value, index, ...other }: TabPanelProps) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <div className="pt-6">{children}</div>}
    </div>
  );
}

const Learning: React.FC = () => {
  const [value, setValue] = useState(0);

  const handleTabChange = (index: number) => setValue(index);

  const partners = [
    { name: "The AI Alliance", image: "/assets/AiAlliance.png", link: "#" },
    { name: "Google Cloud", image: "/assets/google-cloud.png", link: "#" },
    { name: "Red Hat", image: "/assets/redhat.png", link: "#" },
    { name: "Microsoft", image: "/assets/microsoft.png", link: "#" },
    { name: "IBM", image: "/assets/ibm.png", link: "#" },
    { name: "iScience", image: "/assets/iscience.png", link: "#" },
  ];

  const technologiesData = [
    { name: "Cloud Computing", image: "/assets/cloud-computing.png", link: "#" },
    { name: "AI", image: "/assets/ai.png", link: "#" },
    { name: "Security", image: "/assets/security.png", link: "#" },
    { name: "Microsoft Azure", image: "/assets/azure.png", link: "#" },
    { name: "Infrastructure", image: "/assets/infrastructure.png", link: "#" },
    { name: "Azure Infrastructure", image: "/assets/azureinfrastructure.png", link: "#" },
    { name: "Cloud", image: "/assets/server.png", link: "#" },
    { name: "Business Automation", image: "/assets/management.png", link: "#" },
  ];

  const popularCourses = [
    { name: "Course 1", link: "#" },
    { name: "Course 2", link: "#" },
    { name: "Course 3", link: "#" },
    { name: "Course 4", link: "#" },
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
    <div className="bg-white text-gray-800 py-16">
      <div className="container mx-auto px-6 md:px-12 lg:px-16">
        {/* Section Title */}
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, amount: 0.5 }} // Trigger when 50% of the element is in view
          className="text-4xl font-extrabold text-center bg-gradient-to-r from-yellow-400 to-orange-500 text-transparent bg-clip-text mb-10"
        >
          Discover Our Learning Modules
        </motion.h2>

        {/* Tab Navigation */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true, amount: 0.5 }}
          className="flex justify-center space-x-8 border-b border-gray-300 pb-4"
        >
          {["Partners", "Technologies", "Popular Courses"].map((tab, index) => (
            <button
              key={index}
              className={`relative text-lg font-semibold transition-all ${
                value === index ? "text-yellow-500" : "text-gray-600"
              }`}
              onClick={() => handleTabChange(index)}
            >
              {tab}
              <div
                className={`absolute left-0 bottom-0 h-0.5 bg-yellow-500 transition-all ${
                  value === index ? "w-full" : "w-0"
                }`}
              ></div>
            </button>
          ))}
        </motion.div>

        {/* Partners Section */}
        <TabPanel value={value} index={0}>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }} // Trigger when 20% of the element is in view
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-6"
          >
            {partners.map((partner, index) => (
              <motion.a
                key={index}
                href={partner.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-white border border-gray-200 rounded-xl overflow-hidden shadow-md hover:shadow-lg hover:border-yellow-500 hover:scale-105 transition-all duration-300"
                variants={itemVariants}
              >
                <div className="relative h-56 bg-gray-100 flex items-center justify-center">
                  <Image
                    src={partner.image}
                    alt={partner.name}
                    layout="fill"
                    objectFit="contain"
                    className="p-6 grayscale hover:grayscale-0 transition-all duration-300"
                  />
                </div>
                <div className="p-5 text-center">
                  <h3 className="text-lg font-semibold text-gray-800 hover:text-yellow-500 transition-all">
                    {partner.name}
                  </h3>
                </div>
              </motion.a>
            ))}
          </motion.div>
        </TabPanel>

        {/* Technologies Section */}
        <TabPanel value={value} index={1}>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-6"
          >
            {technologiesData.map((tech, index) => (
              <motion.a
                key={index}
                href={tech.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex flex-col items-center text-center transition-transform transform hover:scale-105 hover:rotate-2"
                variants={itemVariants}
              >
                <div className="w-28 h-28 bg-gradient-to-r from-yellow-300 to-orange-400 p-1 rounded-full shadow-lg group-hover:bg-gradient-to-r group-hover:from-orange-400 group-hover:to-yellow-300">
                  <div className="w-full h-full bg-white rounded-full flex justify-center items-center overflow-hidden">
                    <Image
                      src={tech.image}
                      alt={tech.name}
                      width={96}
                      height={96}
                      className="p-4 grayscale group-hover:grayscale-0 transition-all"
                    />
                  </div>
                </div>
                <span className="mt-2 text-gray-800 text-sm group-hover:text-yellow-500 transition-all">
                  {tech.name}
                </span>
              </motion.a>
            ))}
          </motion.div>
        </TabPanel>

        {/* Popular Courses Section */}
        <TabPanel value={value} index={2}>
          <motion.ul
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, amount: 0.2 }}
            className="list-none pl-0 text-center mt-6"
          >
            {popularCourses.map((course, index) => (
              <li key={index} className="py-3">
                <a
                  href={course.link}
                  className="text-lg font-medium text-gray-800 hover:text-yellow-500 hover:underline hover:scale-105 transition-all"
                >
                  {course.name}
                </a>
              </li>
            ))}
          </motion.ul>
        </TabPanel>
      </div>
    </div>
  );
};

export default Learning;