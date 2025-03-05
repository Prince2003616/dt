import React from 'react';
import { motion } from 'framer-motion';

// Define the type for a career path
type CareerPathType = {
  id: number;
  title: string;
  salary: string;
  openings: string;
};

// CareerPaths data
const careerPaths: CareerPathType[] = [
  {
    id: 1,
    title: 'Prompt Engineering Specialist',
    salary: '₹12-18 LPA',
    openings: '17621+',
  },
  {
    id: 2,
    title: 'Prompt Engineering Architect',
    salary: '₹18-24 LPA',
    openings: '15482+',
  },
  {
    id: 3,
    title: 'Prompt Engineering Manager',
    salary: '₹24-32 LPA',
    openings: '13270+',
  },
  {
    id: 4,
    title: 'Prompt Engineering Researcher',
    salary: '₹15-22 LPA',
    openings: '14156+',
  },
  {
    id: 5,
    title: 'Prompt Engineering Consultant',
    salary: '₹20-28 LPA',
    openings: '13498+',
  },
];

// Reusable CareerCard component
interface CareerCardProps {
  id: number;
  title: string;
  salary: string;
  openings: string;
}

const CareerCard: React.FC<CareerCardProps> = ({ id, title, salary, openings }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.05 }}
      className="bg-gray-100 p-8 rounded-2xl shadow-lg flex flex-col items-center text-center transition duration-300 w-full"
    >
      <div className="text-6xl font-bold text-yellow-500">{id}</div>
      <h3 className="text-xl font-semibold text-gray-900 mt-4">{title}</h3>
      <p className="text-gray-700 mt-2 text-lg">
        Average Salary: <span className="text-yellow-500 font-medium">{salary}</span>
      </p>
      <p className="text-gray-700 text-lg">
        Current Openings: <span className="font-semibold">{openings}</span>
      </p>
    </motion.div>
  );
};

// Main CareerPath component
const CareerPath: React.FC = () => {
  return (
    <motion.section 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      transition={{ duration: 0.5 }}
      className="bg-white py-16 px-6 text-center"
    >
      <h2 className="text-4xl font-bold text-gray-900">
        Fast Facts: <span className="text-yellow-500">Your Career Path</span>
      </h2>
      <p className="text-gray-600 max-w-3xl mx-auto mt-4 text-lg">
        Discover high-paying roles in Prompt Engineering with numerous job opportunities.
      </p>

      {/* Top 3 career paths */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10 px-4 md:px-10 justify-center">
        {careerPaths.map((path) => (
          <CareerCard key={path.id} {...path} />
        ))}
      </div>
    </motion.section>
  );
};

export default CareerPath;
