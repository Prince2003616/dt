/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import {
  fetchCourses,
  fetchCertifications,
  CourseData,
  CertificationData,
} from "@/app/utils/api";
import { COURSES_PER_PAGE } from "@/app/utils/constants";
import { Sidebar } from "./sidebar";
import debounce from "lodash.debounce";
import { CourseCard } from "./coursecard";
import { motion } from "framer-motion"; // Import Framer Motion

const CourseList = () => {
  const [courses, setCourses] = useState<CourseData[]>([]);
  const [certificateCourses, setCertificateCourses] = useState<CertificationData[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState<"all" | "certificate">("all");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [partnerFilterId, setPartnerFilterId] = useState<number | null>(null);
  const mainRef = useRef<HTMLElement>(null);
  const sidebarRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [coursesData, certificationsData] = await Promise.all([
          fetchCourses(),
          fetchCertifications(),
        ]);
        setCourses(coursesData);
        setCertificateCourses(certificationsData);
      } catch (err: any) {
        console.error("Error fetching data:", err);
        setError(err.message || "Failed to load data.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredCourseList = useMemo(() => {
    const courseList: (CourseData | CertificationData)[] = activeTab === "all" ? courses : certificateCourses;
    return courseList.filter((course) => {
      const searchMatch = course.title.toLowerCase().includes(searchTerm.toLowerCase());
      const partnerMatch = partnerFilterId === null || ("Partner" in course && course.Partner?.partnerId === partnerFilterId);
      return searchMatch && partnerMatch;
    });
  }, [courses, certificateCourses, searchTerm, partnerFilterId, activeTab]);

  const totalPages = Math.ceil(filteredCourseList.length / COURSES_PER_PAGE);
  const paginatedCourses = filteredCourseList.slice(
    (currentPage - 1) * COURSES_PER_PAGE,
    currentPage * COURSES_PER_PAGE
  );

  const debouncedHandleSearch = useMemo(() => debounce((query: string) => {
    setSearchTerm(query);
    setCurrentPage(1);
  }, 300), []);

  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      if (mainRef.current && sidebarRef.current) {
        sidebarRef.current.style.height = `${mainRef.current.offsetHeight}px`;
      }
    });
    if (mainRef.current) {
      resizeObserver.observe(mainRef.current);
    }
    return () => resizeObserver.disconnect();
  }, [filteredCourseList.length]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="antialiased text-gray-900 min-h-screen p-6 bg-gradient-to-b from-yellow-100 to-white transition-all"
    >
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Sidebar */}
        <motion.aside
          ref={sidebarRef}
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="md:col-span-1 bg-white border border-gray-200 rounded-xl shadow-md p-6"
        >
          <Sidebar onFilter={setPartnerFilterId} courses={courses} onSearch={debouncedHandleSearch} loading={loading} />
        </motion.aside>

        {/* Main Content */}
        <motion.main
          ref={mainRef}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="md:col-span-3"
        >
          {/* Navigation Tabs */}
          <nav className="mb-6">
            <ul className="flex justify-center space-x-5">
              {["all", "certificate"].map((tab) => (
                <motion.li
                  key={tab}
                  whileHover={{ scale: 1.05 }}
                  className="cursor-pointer"
                >
                  <button
                    className={`block py-2 px-5 rounded-md transition-all duration-200 ${
                      activeTab === tab
                        ? "bg-yellow-500 text-gray-900 shadow-md"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                    onClick={() => setActiveTab(tab as "all" | "certificate")}
                  >
                    {tab === "all" ? "Courses" : "Certifications"}
                  </button>
                </motion.li>
              ))}
            </ul>
          </nav>

          {/* Course List */}
          {loading ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center py-10 text-lg text-gray-700"
            >
              Loading courses...
            </motion.div>
          ) : error ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center py-10 text-red-500"
            >
              {error}
            </motion.div>
          ) : (
            <>
              {filteredCourseList.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="text-center py-10 text-gray-600"
                >
                  No courses found. Try adjusting your filters or search term.
                </motion.div>
              ) : (
                <>
                  <CourseCard courses={paginatedCourses} />
                  {/* Pagination */}
                  <div className="mt-10 flex justify-center space-x-4">
                    <motion.button
                      whileHover={{ scale: currentPage === 1 ? 1 : 1.05 }}
                      onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className={`px-4 py-2 rounded-md ${
                        currentPage === 1
                          ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                          : "bg-yellow-500 hover:bg-yellow-600 text-white"
                      }`}
                    >
                      Previous
                    </motion.button>

                    <span className="text-lg font-semibold text-gray-700">
                      Page {currentPage} of {totalPages}
                    </span>

                    <motion.button
                      whileHover={{ scale: currentPage === totalPages ? 1 : 1.05 }}
                      onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className={`px-4 py-2 rounded-md ${
                        currentPage === totalPages
                          ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                          : "bg-yellow-500 hover:bg-yellow-600 text-white"
                      }`}
                    >
                      Next
                    </motion.button>
                  </div>
                </>
              )}
            </>
          )}
        </motion.main>
      </div>
    </motion.div>
  );
};

export default CourseList;
