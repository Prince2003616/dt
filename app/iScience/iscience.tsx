import React from 'react';
import { MdTimer, MdSchool } from 'react-icons/md';
import { FaArrowRight } from 'react-icons/fa';

interface IScienceCardProps {
  title: string;
  icon: string;
  description: string;
  bg: string;
}

const courses = [
  { title: 'I-Intelligence', icon: '🤖', description: 'Explore AI and its impact.', bg: 'bg-purple-600' },
  { title: 'S-Social Media', icon: '💬', description: 'Develop key communication skills.', bg: 'bg-pink-600' },
  { title: 'C-Cloud Computing', icon: '☁️', description: 'Learn cloud technologies.', bg: 'bg-blue-600' },
  { title: 'I-Internet of Things', icon: '📡', description: 'Understand IoT and connectivity.', bg: 'bg-indigo-600' },
  { title: 'N-Network & Communication', icon: '🌐', description: 'Gain knowledge of digital networks.', bg: 'bg-cyan-600' },
  { title: 'E-Embedded Programming', icon: '🔧', description: 'Learn embedded systems.', bg: 'bg-teal-600' },
  { title: 'E-Ethereum (Blockchain)', icon: '🔗', description: 'Understand blockchain technology.', bg: 'bg-green-600' },
  { title: 'C-Cyber Security', icon: '🔒', description: 'Gain cybersecurity skills.', bg: 'bg-red-600' }
];

const IScienceCard: React.FC<IScienceCardProps> = ({ title, icon, description, bg }) => {
  return (
    <div className={`rounded-2xl shadow-lg p-6 transition transform hover:scale-105 ${bg} text-white`}>
      <div className="flex items-center space-x-4 mb-3">
        <span className="text-4xl">{icon}</span>
        <h3 className="text-lg font-bold">{title}</h3>
      </div>
      <p className="text-sm opacity-90">{description}</p>
      <div className="flex items-center justify-between mt-4 text-sm opacity-90">
        <span className="flex items-center"><MdTimer className="mr-1" /> 6 hrs</span>
        <span className="flex items-center"><MdSchool className="mr-1" /> 8th - 9th Grade</span>
      </div>
      <button className="mt-4 flex items-center bg-white text-black py-2 px-4 rounded-lg shadow hover:bg-gray-200">
        Know more <FaArrowRight className="ml-2" />
      </button>
    </div>
  );
};

const IScienceSection = () => {
  return (
    <div className="container mx-auto py-12 px-6">
      <h1 className="text-4xl font-bold text-gray-100 text-center mb-6">iScience</h1>
      <p className="text-center text-gray-300 max-w-3xl mx-auto mb-10">
        Explore emerging technologies, cybersecurity, AI, and more with our engaging courses designed for future-ready students.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course, index) => (
          <IScienceCard key={index} {...course} />
        ))}
      </div>
    </div>
  );
};

export default IScienceSection;
