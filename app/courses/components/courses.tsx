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
import Image from "next/image";
import debounce from 'lodash.debounce'; // Import debounce

const COURSES_PER_PAGE = 9;

interface SidebarProps {
  onFilter: (partnerId: number | null) => void;  // Modified onFilter
  courses: CourseData[];
  onSearch: (query: string) => void;
}

interface CourseCardProps {
  courses: (CourseData | CertificationData)[];
}

interface Filters {
  partner: number | null;
  search: string;
}

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

  const Sidebar: React.FC<SidebarProps> = ({ onFilter, courses, onSearch }) => {
    const [filters, setFilters] = useState<Filters>({
      partner: null,
      search: "",
    });

    const { partners } = useMemo(() => {
      const partnerMap: Record<number, string> = {};

      courses.forEach((course: CourseData) => {
        if (course.Partner) {
          partnerMap[course.Partner.partnerId] = course.Partner.partnerName;
        }
      });


      return {
        partners: Object.entries(partnerMap).map(([id, name]) => ({
          id: Number(id),
          name,
        })),
      };
    }, [courses]);

    const handleFilterChange = (
      type: keyof Filters,
      value: number | string | null
    ) => {
      const newFilters = { ...filters, [type]: value };

      setFilters(newFilters);

      if (type === "search") {
        onSearch(typeof value === "string" ? value : "");
      } else {
        onFilter(newFilters.partner);
      }
    };

     const getButtonClasses = (filterType: keyof Filters, filterValue: any, currentValue: any) => {
      return `w-full text-left px-4 py-2.5 rounded-xl transition-all ${
        currentValue === filterValue
          ? "bg-yellow-100 text-yellow-700 font-medium border border-yellow-300"
          : "text-gray-700 hover:bg-yellow-50"
      }`;
    };

    const resetFilters = () => {
      setFilters({ partner: null, search: "" });
      onFilter(null);
      onSearch("");
    };

    return (
      <div className="p-6 bg-white rounded-2xl shadow-md border border-gray-200">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Course Filters</h2>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search courses..."
              value={filters.search}
              onChange={(e) => handleFilterChange("search", e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-300 text-gray-800 placeholder-gray-400 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/25 transition-all"
            />
            <svg
              className="absolute left-3 top-3.5 h-5 w-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        {/* Partner Filter */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-3">
            Partner
          </h3>
          <div className="space-y-2">
            {partners.map((partner) => (
              <button
                key={partner.id}
                onClick={() => handleFilterChange("partner", partner.id)}
                className={getButtonClasses("partner", partner.id, filters.partner)}

              >
                {partner.name}
              </button>
            ))}
          </div>
        </div>


        {/* Reset Button */}
        <button
          onClick={resetFilters}
          className="w-full py-3 px-4 rounded-xl border-2 border-yellow-300 text-gray-700 hover:bg-yellow-50 transition-all font-medium"
        >
          Reset All Filters
        </button>
      </div>
    );
  };

  interface CourseCardItemProps {
    course: CourseData | CertificationData
  }
  const CourseCardItem:React.FC<CourseCardItemProps> = ({course}) => {
    const [imageLoading, setImageLoading] = useState(true)

    // Mock price and cart functionality (replace with your actual implementation)
    const price = useMemo(() => {
      return Math.floor(Math.random() * 200) + 50; // Random price between 50 and 250
    }, []);

    const handleAddToCart = () => {
      alert(`Added "${course.title}" to cart! (Price: $${price})`);
      // In a real application, you would dispatch an action to update the cart state.
    };

    return (
      <div
      key={"courseId" in course ? course.courseId : course.certificationId}
      className="bg-white border border-gray-200 rounded-2xl shadow-md overflow-hidden transition-all duration-300 hover:transform hover:scale-105 hover:shadow-yellow-500/20"
    >
      {/* Course Image */}
      {"imageUrl" in course && course.imageUrl && (
        <div className="relative h-52">
          <Image
            src={course.imageUrl}
            alt={course.title}
            layout="fill"
            objectFit="cover"
            onLoad={() => setImageLoading(false)}
            onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
              e.currentTarget.src = "/placeholder.png";
              setImageLoading(false);
            }}
          />
           {imageLoading && (
              <div className="absolute inset-0 bg-gray-100 flex justify-center items-center">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-yellow-500"></div>
              </div>
            )}
        </div>
      )}

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

        {/* Course Title */}
        <h3 className="text-lg font-bold text-gray-800 mb-3 line-clamp-2">
          {course.title}
        </h3>

         {/* Price */}
         <div className="mb-3 font-semibold text-gray-600">
            Price: ${price}
          </div>

           {/* Add to Cart Button */}
           <button
            onClick={handleAddToCart}
            className="w-full py-2 px-4 rounded-xl bg-yellow-500 hover:bg-yellow-600 text-white transition-all font-medium"
          >
            Add to Cart
          </button>
      </div>
    </div>
    )
  }

  const CourseCard: React.FC<CourseCardProps> = ({ courses }) => {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
            <CourseCardItem key={"courseId" in course ? course.courseId : course.certificationId} course={course} />
        ))}
      </div>
    );
  };

  return (
    <div className="antialiased text-gray-900 bg-white transition-all duration-300 ease-in-out min-h-screen p-6">
      {/* Sidebar Inside Main Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <aside
          ref={sidebarRef}
          className="md:col-span-1 bg-white border border-gray-200 rounded-md shadow-md p-6 transition-transform duration-300 ease-in-out"
        >
          <Sidebar onFilter={handleFilter} courses={courses} onSearch={handleSearch} />
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