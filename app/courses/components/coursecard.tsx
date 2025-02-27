// app/courses/components/CourseCard.tsx
"use client";
import React from "react";
import { CourseData, CertificationData } from "@/app/utils/api";
import Link from "next/link";

interface CourseCardProps {
  courses: (CourseData | CertificationData)[];
}

interface CourseCardItemProps {
  course: CourseData | CertificationData;
}

const CourseCardItem: React.FC<CourseCardItemProps> = ({ course }) => {
  const handleAddToCart = () => {
    alert(`Added "${course.title}" to cart!`);
    // In a real application, you would dispatch an action to update the cart state.
  };

  // Determine the slug based on the course type.  Adapt the logic here
  // based on where your slugs actually reside in your CourseData/CertificationData.
  const slug = "courseId" in course ? course.courseId : course.certificationId
   //const slug = "courseId" in course ? course.slug : course.slug; // Assuming your CourseData/CertificationData interfaces have a 'slug' property.
  //const slug = course.slug; // Adjust this line based on where your slug is located in the course object

  return (
    <div
      key={"courseId" in course ? course.courseId : course.certificationId}
      className="bg-white border border-gray-200 rounded-2xl shadow-md overflow-hidden transition-all duration-300 hover:transform hover:scale-105 hover:shadow-yellow-500/20"
    >
      <div className="p-6">
        {/* Partner Badge */}
        {"Partner" in course && course.Partner && (
          <div className="mb-3">
            <span className="bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full border border-gray-300">
              {course.Partner.partnerName}
            </span>
          </div>
        )}

        {/* Category Tag */}
        {"CourseCategory" in course && course.CourseCategory && (
          <div className="flex items-center mb-3">
            <span className="bg-yellow-100 text-yellow-700 text-xs px-2 py-1 rounded-full border border-yellow-300">
              {course.CourseCategory.categoryName}
            </span>
          </div>
        )}

        {/* Course Title with Slug */}
        {"courseId" in course ? (
          <Link href={`/courses/coursedetails?slug=${slug}`} passHref>
            <h3 className="text-lg font-bold text-gray-800 mb-3 line-clamp-2 hover:text-yellow-600">
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
    </div>
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