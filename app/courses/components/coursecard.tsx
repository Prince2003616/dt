"use client";

import React, { useCallback } from "react";
import { CourseData, CertificationData } from "@/app/utils/api";
import Link from "next/link";
import { motion } from "framer-motion"; // Import Framer Motion for animations

interface CourseCardProps {
  courses: (CourseData | CertificationData)[];
}

interface CourseCardItemProps {
  course: CourseData | CertificationData;
}

const CourseCardItem: React.FC<CourseCardItemProps> = ({ course }) => {
  const handleAddToCart = useCallback(() => {
    alert(`Added "${course.title}" to cart!`);
  }, [course.title]);

  const slug = "slug" in course ? course.slug : "";

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      viewport={{ once: true }} // Only animates once when it enters viewport
      className="bg-white border border-gray-200 rounded-2xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-yellow-500/20"
    >
      <div className="p-6">
        {/* Dynamic Badges */}
        <div className="flex flex-wrap gap-2 mb-3">
          {"Partner" in course && course.Partner && (
            <span className="bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full border border-gray-300">
              {course.Partner.partnerName}
            </span>
          )}
          {"CourseCategory" in course && course.CourseCategory && (
            <span className="bg-yellow-100 text-yellow-700 text-xs px-3 py-1 rounded-full border border-yellow-300">
              {course.CourseCategory.categoryName}
            </span>
          )}
        </div>

        {/* Course Title with Slug */}
        {"courseId" in course && slug ? (
          <Link href={`/courses/coursedetails?slug=${slug}`} passHref>
            <h3 className="text-lg font-bold text-gray-800 mb-3 line-clamp-2 hover:text-yellow-600 transition-colors">
              {course.title}
            </h3>
          </Link>
        ) : (
          <h3 className="text-lg font-bold text-gray-800 mb-3 line-clamp-2">
            {course.title}
          </h3>
        )}

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          className="w-full py-2 px-4 rounded-xl bg-yellow-500 hover:bg-yellow-600 text-white transition-all font-medium"
        >
          Add to Cart
        </button>
      </div>
    </motion.div>
  );
};

export const CourseCard: React.FC<CourseCardProps> = ({ courses }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {courses.map((course) => (
        <CourseCardItem
          key={"courseId" in course ? course.courseId : course.certificationId}
          course={course}
        />
      ))}
    </div>
  );
};
