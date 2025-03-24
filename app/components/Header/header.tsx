"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";

const Header = () => {
  return (
    <header className="sticky top-0 bg-white/80 backdrop-blur-md shadow-md z-50">
      <div className="container mx-auto py-4 px-6 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <Link href="/">
            <Image
              src="/dts.webp"
              alt="DTS Logo"
              width={150}
              height={50}
              className="mb-1"
            />
          </Link>
        </div>

        {/* Search Bar */}
        <div className="flex-grow mx-6 hidden md:block">
          <div className="relative">
            <input
              type="text"
              placeholder="Search here..."
              className="block w-full pl-4 pr-12 py-2 text-gray-900 bg-gray-100 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition hover:bg-gray-200"
            />
            <div className="absolute inset-y-0 right-3 flex items-center text-gray-500">
              <svg
                className="h-5 w-5 hover:scale-110 transition-transform cursor-pointer"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="space-x-4 flex items-center">
          <Link href="/courses" className="text-gray-800 hover:text-yellow-500 transition-all duration-200">
            Courses
          </Link>
          <Link href="/about-us" className="text-gray-800 hover:text-yellow-500 transition-all duration-200">
            About Us
          </Link>

          {/* More Dropdown */}
          <div className="relative group">
            <button className="text-gray-800 hover:text-yellow-500 transition flex items-center">
              More
              <svg
                className="fill-current h-4 w-4 ml-1 transition-transform transform group-hover:rotate-180"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </button>
            <div className="absolute left-0 hidden group-hover:block bg-white shadow-lg rounded-lg mt-2 py-2 min-w-[150px]">
              <Link href="/more" className="block px-4 py-2 hover:bg-yellow-400 transition">
                More Info
              </Link>
              <Link href="/webinar" className="block px-4 py-2 hover:bg-yellow-400 transition">
                Webinar
              </Link>
              <Link href="/contact" className="block px-4 py-2 hover:bg-yellow-400 transition">
                Contact
              </Link>
            </div>
          </div>

          <Link href="/login" className="text-gray-800 hover:text-yellow-500 transition-all duration-200">
            Login
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
