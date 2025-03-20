import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import {
  CourseData,
  fetchCourseBySlug,
  fetchCourseDetails,
} from "@/app/utils/api";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import CourseSections from "./coursesection";
import CourseCurriculum from "./CourseCurriculum";
import Partner from "./partner";
import CareerPath from "./careerpath";
import IScienceSection from "@/app/iScience/iscience"; // Import iScience Section

config.autoAddCss = false;

interface CourseDetailProps {
  slug: string;
}

interface Section {
  name: string;
  subtitle: string;
  isExpanded?: boolean;
}

const CourseDetail: React.FC<CourseDetailProps> = ({ slug }) => {
  const [course, setCourse] = useState<CourseData | null>(null);
  const [sections, setSections] = useState<Section[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCourseData = useCallback(async () => {
    setLoading(true);
    try {
      const [courseData, fetchedSections] = await Promise.all([
        fetchCourseBySlug(slug),
        fetchCourseDetails(slug),
      ]);

      setCourse(courseData || null);

      if (!Array.isArray(fetchedSections) || fetchedSections.length === 0) {
        throw new Error("No curriculum data available.");
      }

      setSections(
        fetchedSections.map((section) => ({ ...section, isExpanded: false }))
      );

      setError(null);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to load course data."
      );
    } finally {
      setLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    fetchCourseData();
  }, [fetchCourseData]);

  const toggleSection = (index: number) => {
    setSections((prevSections) =>
      prevSections.map((section, i) =>
        i === index ? { ...section, isExpanded: !section.isExpanded } : section
      )
    );
  };

  if (loading)
    return <div className="text-center py-10 text-gray-700">Loading...</div>;
  if (error)
    return <div className="text-center py-10 text-red-500">{error}</div>;
  if (!course)
    return (
      <div className="text-center py-10 text-gray-700">No Course Found...</div>
    );

  return (
    <motion.div
      className="flex flex-col m-4 space-y-6"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <motion.div
        className="bg-white p-6 flex flex-col lg:flex-row justify-between gap-6"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="lg:w-2/3 space-y-4">
          <h1 className="text-4xl font-bold text-gray-900">{course.title || "Course Title"}</h1>
          <p className="text-gray-700 text-lg">{course.description || "No description available."}</p>
          <div className="flex items-center text-yellow-500 font-semibold">
            {course.Partner?.partnerName || "Unknown Partner"}
          </div>
          <motion.button
            className="mt-4 bg-yellow-500 text-black px-6 py-3 rounded-lg font-semibold hover:bg-yellow-600 transition shadow-md"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Enroll Now
          </motion.button>
        </div>

        <motion.div
          className="lg:w-1/3 bg-white p-6 rounded-lg shadow-lg border border-gray-200"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Request More Information
          </h2>
          <motion.form
            className="flex flex-col space-y-3"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.2 },
              },
            }}
          >
            {["Name *", "Email *", "Phone Number *"].map((placeholder, idx) => (
              <motion.input
                key={idx}
                type={placeholder.includes("Email") ? "email" : "text"}
                placeholder={placeholder}
                className="p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-yellow-500"
                required
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  visible: { opacity: 1, y: 0 },
                }}
              />
            ))}
            <motion.button
              type="submit"
              className="bg-yellow-500 text-black p-3 rounded-md font-semibold hover:bg-yellow-600 transition shadow-md"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Submit
            </motion.button>
          </motion.form>
        </motion.div>
      </motion.div>

      {/* Conditionally Render CareerPath for AI Course */}
      {course.Partner?.partnerName === "Artificial Intelligence" && <CareerPath />}

      {/* Conditionally Render IScienceSection for iScience Course */}
      {course.title === "iScience" && <IScienceSection />}

      <CourseSections />
      <Partner />
      <CourseCurriculum sections={sections} toggleSection={toggleSection} />
    </motion.div>
  );
};

export default CourseDetail;
