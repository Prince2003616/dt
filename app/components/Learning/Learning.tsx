"use client";
import React, { useState } from "react";
import Image from "next/image";

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
    { name: "The AI Alliance", image: "/ai-alliance.jpeg", link: "#" },
    { name: "Google Cloud", image: "/google-cloud.png", link: "#" },
    { name: "Red Hat", image: "/red-hat.png", link: "#" },
    { name: "Microsoft", image: "/microsoft.png", link: "#" },
    { name: "IBM", image: "/ibm.png", link: "#" },
    { name: "iScience", image: "/iscience.png", link: "#" },
  ];

  const technologiesData = [
    { name: "Cloud Computing", image: "/cloud-computing.png", link: "#" },
    { name: "AI", image: "/ai.png", link: "#" },
    { name: "Security", image: "/security.png", link: "#" },
    { name: "Microsoft Azure", image: "/microsoft-azure.png", link: "#" },
    { name: "Infrastructure", image: "/infrastructure.png", link: "#" },
    { name: "Azure Infrastructure", image: "/azure-infrastructure.png", link: "#" },
    { name: "Cloud", image: "/cloud.png", link: "#" },
    { name: "Business Automation", image: "/business-automation.png", link: "#" },
  ];

  const popularCourses = [
    { name: "Course 1", link: "#" },
    { name: "Course 2", link: "#" },
    { name: "Course 3", link: "#" },
    { name: "Course 4", link: "#" },
  ];

  return (
    <div className="bg-white text-gray-800 py-16">
      <div className="container mx-auto px-4 md:px-8 lg:px-12">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center text-yellow-500 mb-8">
          Discover Our Learning Modules
        </h2>

        <div className="flex justify-center space-x-12 mb-12">
          {["Partners", "Technologies", "Popular Courses"].map((tab, index) => (
            <button
              key={index}
              className={`text-lg hover:text-yellow-500 transition-colors duration-200 ${
                value === index ? "text-yellow-500 font-semibold" : "text-gray-600"
              }`}
              onClick={() => handleTabChange(index)}
            >
              {tab}
            </button>
          ))}
        </div>

        <TabPanel value={value} index={0}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {partners.map((partner, index) => (
              <a
                key={index}
                href={partner.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className="relative h-56 bg-gray-100">
                  <Image
                    src={partner.image}
                    alt={partner.name}
                    layout="fill"
                    objectFit="contain"
                    className="p-6 grayscale hover:grayscale-0 transition-all duration-300"
                  />
                </div>
                <div className="p-5 text-center">
                  <h3 className="text-lg font-semibold hover:text-yellow-500 transition-colors duration-200">
                    {partner.name}
                  </h3>
                </div>
              </a>
            ))}
          </div>
        </TabPanel>

        <TabPanel value={value} index={1}>
          <div className="grid grid-cols-4 gap-8 relative">
            {technologiesData.map((tech, index) => (
              <a
                key={index}
                href={tech.link}
                target="_blank"
                rel="noopener noreferrer"
                className="w-28 h-28 relative transition-transform duration-300 hover:scale-110"
              >
                <div className="absolute inset-0 rounded-full overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 bg-white">
                  <Image
                    src={tech.image}
                    alt={tech.name}
                    layout="fill"
                    objectFit="contain"
                    className="p-4 grayscale hover:grayscale-0 transition-all duration-300"
                  />
                </div>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-center text-sm text-gray-700">
                  {tech.name}
                </div>
              </a>
            ))}
          </div>
        </TabPanel>

        <TabPanel value={value} index={2}>
          <ul className="list-none pl-0">
            {popularCourses.map((course, index) => (
              <li key={index} className="py-3">
                <a
                  href={course.link}
                  className="text-lg hover:text-yellow-500 transition-colors duration-200"
                >
                  {course.name}
                </a>
              </li>
            ))}
          </ul>
        </TabPanel>
      </div>
    </div>
  );
};

export default Learning;