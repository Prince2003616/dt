/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";

interface SidebarProps {
  onFilter: (partnerId: number | null) => void;
  courses: any[] | undefined; // Allow courses to be undefined
  onSearch: (query: string) => void;
  loading: boolean; // Add loading prop
}

interface Filters {
  partner: number | null;
  search: string;
}

export const Sidebar: React.FC<SidebarProps> = ({ onFilter, courses, onSearch, loading }) => {
  const [filters, setFilters] = useState<Filters>({
    partner: null,
    search: "",
  });

  const { partners } = useMemo(() => {
    if (loading || !courses) { // Check for loading and courses being defined
      console.log("Sidebar: Data is loading or courses is undefined, returning empty partners.");
      return { partners: [] }; // Return an empty array to prevent the error
    }

    const partnerMap: Record<number, string> = {};

    courses.forEach((course: any) => { // Now safe to call forEach
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
  }, [courses, loading]); // Add loading to the dependency array

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
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="p-6 bg-white rounded-2xl shadow-md border border-gray-200"
    >
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
            <motion.button
              key={partner.id}
              whileHover={{ scale: 1.05 }}
              onClick={() => handleFilterChange("partner", partner.id)}
              className={getButtonClasses("partner", partner.id, filters.partner)}
            >
              {partner.name}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Reset Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        onClick={resetFilters}
        className="w-full py-3 px-4 rounded-xl border-2 border-yellow-300 text-gray-700 hover:bg-yellow-50 transition-all font-medium"
      >
        Reset All Filters
      </motion.button>
    </motion.div>
  );
};
