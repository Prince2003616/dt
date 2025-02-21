/* eslint-disable @typescript-eslint/no-explicit-any */
// components/CourseList.tsx
"use client";

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import {
  fetchCourses,
  fetchCertifications,
  CourseData,
  CertificationData,
} from '@/app/utils/api';

const COURSES_PER_PAGE = 9;

const CourseList = () => {
  const [courses, setCourses] = useState<CourseData[]>([]);
  const [certificateCourses, setCertificateCourses] = useState<CertificationData[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [partnerFilter, setPartnerFilter] = useState('');
  const [uniquePartners, setUniquePartners] = useState<string[]>([]);
  const [sidebarHeight, setSidebarHeight] = useState(0);

  const mainRef = React.useRef<HTMLElement>(null);
  const sidebarRef = React.useRef<HTMLElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const coursesData = await fetchCourses();
        setCourses(coursesData);

        const certificationsData = await fetchCertifications();
        setCertificateCourses(certificationsData);
      } catch (err: any) {
        console.error('Error fetching data:', err);
        setError(err.message || "Failed to load data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Extract unique partners
  useEffect(() => {
    const allPartners = [...courses, ...certificateCourses].reduce((acc: string[], course) => {
      let partnerName = "";
      if ("Partner" in course && course.Partner) {
        partnerName = course.Partner.partnerName || "";
      }
      if ("CertificationPartner" in course && course.Partner) {
        partnerName = course.Partner.partnerName || "";
      }
      if (partnerName && !acc.includes(partnerName)) {
        acc.push(partnerName);
      }
      return acc;
    }, []);
    setUniquePartners([...new Set(allPartners)]); // Remove duplicates and update state
  }, [courses, certificateCourses]);

  // Update Sidebar Height
  useEffect(() => {
    const updateSidebarHeight = () => {
      if (mainRef.current && sidebarRef.current) {
        setSidebarHeight(mainRef.current.offsetHeight);
        sidebarRef.current.style.height = `${mainRef.current.offsetHeight}px`;
      }
    };

    // Initial height set
    updateSidebarHeight();

    // Listen for changes
    window.addEventListener('resize', updateSidebarHeight);

    return () => {
      window.removeEventListener('resize', updateSidebarHeight);
    };
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handlePartnerClick = (partner: string) => {
    setPartnerFilter(partner);
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setSearchTerm('');
    setPartnerFilter('');
    setCurrentPage(1);
  };

  const filteredCourses = useCallback(() => {
    let courseList: (CourseData | CertificationData)[] = [];

    if (activeTab === 'all') {
      courseList = courses;
    } else if (activeTab === 'certificate') {
      courseList = certificateCourses;
    }

    return courseList.filter((course) => {
      const searchMatch = course.title.toLowerCase().includes(searchTerm.toLowerCase());
      const partnerMatch = partnerFilter === '' || (("Partner" in course && course.Partner && course.Partner.partnerName === partnerFilter) || ("CertificationPartner" in course && course.Partner && course.Partner.partnerName === partnerFilter));

      return searchMatch && partnerMatch;
    });
  }, [courses, certificateCourses, searchTerm, partnerFilter, activeTab]);

  const paginatedCourses = () => {
    const startIndex = (currentPage - 1) * COURSES_PER_PAGE;
    const endIndex = startIndex + COURSES_PER_PAGE;
    return filteredCourses().slice(startIndex, endIndex);
  };

  const totalPages = Math.ceil(filteredCourses().length / COURSES_PER_PAGE);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  return (
    <div className="flex antialiased text-gray-900 bg-white transition-all duration-300 ease-in-out min-h-screen">

      {/* Sidebar */}
      <aside
        ref={sidebarRef}
        className="w-full md:w-64 border rounded shadow-md px-4 py-6 transition-transform duration-300 ease-in-out"
        style={{ position: "sticky", top: "1rem", height: `${sidebarHeight}px` }}
      >
        <div className="sticky top-6">
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2 text-gray-800" htmlFor="search">Search Courses</label>
            <input
              type="text"
              id="search"
              placeholder="Enter course title"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline transition-shadow duration-300 ease-in-out"
              onChange={handleSearchChange}
            />
          </div>

          <div className="mb-4">
            <p className="block text-sm font-bold mb-2 text-gray-800">Partners</p>
            <ul className="text-sm">
              {uniquePartners.map((partner) => (
                <li key={partner} className="mb-2 transition-all duration-200 ease-in-out">
                  <button
                    onClick={() => handlePartnerClick(partner)}
                    className={`block hover:bg-purple-100 rounded py-1 px-2 transition-colors duration-200 ease-in-out ${partnerFilter === partner ? 'font-semibold text-purple-700 bg-purple-50' : 'text-gray-700'}`}
                  >
                    {partner}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <button
            onClick={handleResetFilters}
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full transition-colors duration-200 ease-in-out"
          >
            Reset Filters
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6" ref={mainRef}>
        {/* Navigation */}
        <nav className="mb-4 flex justify-center">
          <ul className="flex space-x-4">
            <li>
              <button
                className={`py-2 px-4 rounded-md transition-colors duration-200 ease-in-out ${activeTab === 'all' ? 'bg-purple-700 text-white hover:bg-purple-800' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                onClick={() => setActiveTab('all')}
              >
                All Courses
              </button>
            </li>
            <li>
              <button
                className={`py-2 px-4 rounded-md transition-colors duration-200 ease-in-out ${activeTab === 'certificate' ? 'bg-purple-700 text-white hover:bg-purple-800' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                onClick={() => setActiveTab('certificate')}
              >
                Certificate Courses
              </button>
            </li>
          </ul>
        </nav>

        {/* Course List */}
        {loading ? (
          <div className="text-center py-8">Loading courses...</div>
        ) : error ? (
          <div className="text-center py-8 text-red-500">{error}</div>
        ) : (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {paginatedCourses().length > 0 ? (
                paginatedCourses().map((course) => (
                  <div
                    key={"courseId" in course ? course.courseId : course.certificateCourseId}
                    className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transform transition-transform duration-300 hover:scale-105"
                  >
                    {/* Course Image */}
                    {course.imageUrl && (
                      <div className="relative h-40">
                        <Image
                          src={course.imageUrl}
                          alt={course.title}
                          layout="fill"
                          objectFit="cover"
                          onError={(e: any) => {
                            e.currentTarget.src = "/placeholder.png";
                          }}
                        />
                      </div>
                    )}

                    <div className="p-4">
                      <h3 className="text-md font-semibold mb-2 text-gray-800">{course.title}</h3>
                      <p className="text-gray-700 transition-opacity duration-300">
                        Price: {"discountedPrice" in course && course.discountedPrice ? `₹${course.discountedPrice}` : "originalPrice" in course && course.originalPrice ? `₹${course.originalPrice}` : "N/A"}
                      </p>
                      <button className="bg-purple-700 hover:bg-purple-800 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-200 ease-in-out">
                        Add to cart
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 col-span-full">No courses found.</div>
              )}
            </div>

            {/* Pagination */}
            <div className="mt-8 flex justify-center">
              <button
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2 transition-colors duration-200 ease-in-out"
                onClick={handlePrevPage}
                disabled={currentPage === 1}
              >
                « Previous
              </button>
              <button
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-200 ease-in-out"
                onClick={handleNextPage}
                disabled={currentPage === totalPages || totalPages === 0}
              >
                Next »
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default CourseList;