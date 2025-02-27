/* eslint-disable @typescript-eslint/no-explicit-any */
// app/courses/components/CourseList.tsx
"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import {
  fetchCourses,
  fetchCertifications,
  CourseData,
  CertificationData,
} from "@/app/utils/api";
import { COURSES_PER_PAGE } from "@/app/utils/constants";
import { CourseCard } from "./coursecard";
import { Sidebar } from "./sidebar";
import debounce from 'lodash.debounce'; // Import debounce


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
        if (err.message === 'Network Error') {
          setError("Failed to connect to the server. Please check your internet connection.");
        } else if (err.response && err.response.status === 404) {
          setError("Data not found on the server.");
        }
        else {
           setError(err.message || "Failed to load data.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredCourseList = useMemo(() => {
    let courseList: (CourseData | CertificationData)[] = [];

    if (activeTab === "all") {
      courseList = courses;
    } else if (activeTab === "certificate") {
      courseList = certificateCourses;
    }

    return courseList.filter((course) => {
      const searchMatch = course.title.toLowerCase().includes(searchTerm.toLowerCase());

      let partnerMatch = true;
      if (partnerFilterId !== null) {
         if ("Partner" in course) {
          const courseWithPartner = course as CourseData; // or CertificationData depending on where this is used
          partnerMatch = courseWithPartner.Partner?.partnerId === partnerFilterId;
        }  else if ("CertificationPartner" in course) {
            const certCourse = course as CertificationData;
            partnerMatch = (certCourse.CertificationPartner as { partnerId: number })?.partnerId === partnerFilterId;

          }

      }

      return searchMatch && partnerMatch; // Removed technologyFilter
    });
  }, [courses, certificateCourses, searchTerm, partnerFilterId, activeTab]);

  const totalPages = Math.ceil(filteredCourseList.length / COURSES_PER_PAGE);
  const paginatedCourses = filteredCourseList.slice(
    (currentPage - 1) * COURSES_PER_PAGE,
    currentPage * COURSES_PER_PAGE
  );

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleFilter = (partnerId: number | null) => { // Modified handleFilter
    setPartnerFilterId(partnerId);
    setCurrentPage(1);
  };

  const debouncedHandleSearch = useMemo(() => {
    return debounce((query: string) => {
      setSearchTerm(query);
      setCurrentPage(1);
    }, 300); // 300ms delay
  }, []);


  const handleSearch = (query: string) => {
    debouncedHandleSearch(query);
  };

  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      if (mainRef.current && sidebarRef.current) {
        sidebarRef.current.style.height = `${mainRef.current.offsetHeight}px`;
      }
    });

    if (mainRef.current) {
      resizeObserver.observe(mainRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, [filteredCourseList.length]);

  return (
    <div className="antialiased text-gray-900 bg-white transition-all duration-300 ease-in-out min-h-screen p-6">
      {/* Sidebar Inside Main Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <aside
          ref={sidebarRef}
          className="md:col-span-1 bg-white border border-gray-200 rounded-md shadow-md p-6 transition-transform duration-300 ease-in-out"
        >
          <Sidebar onFilter={handleFilter} courses={courses} onSearch={handleSearch} loading={loading} />
        </aside>

        <main className="md:col-span-3" ref={mainRef}>
          {/* Navigation Tabs */}
          <nav className="mb-6">
            <ul className="flex justify-center space-x-5">
              <li>
                <button
                  className={`block py-2 px-5 rounded-md transition-colors duration-200 ease-in-out ${
                    activeTab === "all"
                      ? "bg-yellow-500 text-gray-900 hover:bg-yellow-600"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                  onClick={() => setActiveTab("all")}
                >
                  Courses
                </button>
              </li>
              <li>
                <button
                  className={`block py-2 px-5 rounded-md transition-colors duration-200 ease-in-out ${
                    activeTab === "certificate"
                      ? "bg-yellow-500 text-gray-900 hover:bg-yellow-600"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                  onClick={() => setActiveTab("certificate")}
                >
                  Certifications
                </button>
              </li>
            </ul>
          </nav>

          {/* Course List */}
          {loading ? (
            <div className="text-center py-10 text-lg text-gray-700">Loading courses...</div>
          ) : error ? (
            <div className="text-center py-10 text-red-500">{error}</div>
          ) : (
            <div>
              {filteredCourseList.length === 0 ? (
                <div className="text-center py-10 text-gray-600">
                  No courses found. Try adjusting your filters or search term.
                </div>
              ) : (
                <>
                  <CourseCard courses={paginatedCourses} />
                  {/* Pagination Controls */}
                  <div className="mt-10 flex justify-center space-x-4">
                    <button
                      onClick={handlePrevPage}
                      disabled={currentPage === 1}
                      className={`px-4 py-2 rounded-md ${
                        currentPage === 1
                          ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                          : "bg-blue-500 hover:bg-blue-600 text-white"
                      }`}
                    >
                      Previous
                    </button>
                    <span className="text-lg font-semibold text-gray-700">
                      Page {currentPage} of {totalPages}
                    </span>
                    <button
                      onClick={handleNextPage}
                      disabled={currentPage === totalPages}
                      className={`px-4 py-2 rounded-md ${
                        currentPage === totalPages
                          ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                          : "bg-blue-500 hover:bg-blue-600 text-white"
                      }`}
                    >
                      Next
                    </button>
                  </div>
                </>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default CourseList;