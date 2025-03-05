'use client';

import { motion } from 'framer-motion';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faPlay, faChevronRight, faChevronDown } from "@fortawesome/free-solid-svg-icons";

interface Section {
  name: string;
  subtitle: string;
  isExpanded?: boolean;
}

interface CourseCurriculumProps {
  sections: Section[];
  toggleSection: (index: number) => void;
}

const CourseCurriculum: React.FC<CourseCurriculumProps> = ({ sections, toggleSection }) => {
  return (
    <div className="p-8 rounded-2xl shadow-lg border border-gray-200 bg-white">
      <h2 className="text-4xl font-bold mb-6 text-gray-900 text-center">Course Curriculum</h2>
      {sections.length === 0 ? (
        <div className="p-4 text-gray-500 italic text-center">No curriculum available.</div>
      ) : (
        <ul className="divide-y divide-gray-300">
          {sections.map((section, index) => (
            <li key={index} className="py-3">
              <button
                className="flex items-center justify-between w-full text-left cursor-pointer hover:bg-yellow-200 p-4 rounded-lg transition-all duration-300 ease-in-out"
                onClick={() => toggleSection(index)}
                aria-expanded={section.isExpanded}
                aria-label={`Toggle section: ${section.name}`}
              >
                <div className="flex items-center space-x-3">
                  <FontAwesomeIcon
                    icon={section.isExpanded ? faChevronDown : faChevronRight}
                    className="text-yellow-500 transform transition-transform duration-300 ease-in-out"
                  />
                  <span className="font-semibold text-gray-800 text-lg">{section.name}</span>
                </div>
                <FontAwesomeIcon icon={faLock} className="text-gray-400" />
              </button>
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: section.isExpanded ? 'auto' : 0, opacity: section.isExpanded ? 1 : 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="overflow-hidden"
              >
                <ul className="ml-6 mt-3 space-y-2">
                  <li className="flex items-center text-base text-gray-600 hover:text-yellow-600 cursor-pointer p-3 rounded-lg hover:bg-gray-100 transition-all duration-300 ease-in-out">
                    <FontAwesomeIcon icon={faPlay} className="mr-3 text-yellow-500" />
                    {section.subtitle}
                  </li>
                </ul>
              </motion.div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CourseCurriculum;