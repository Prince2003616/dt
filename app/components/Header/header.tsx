// components/Header.tsx
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Header = () => {

  return (
    <header className="sticky top-0 bg-white shadow-md z-50">
      <div className="container mx-auto py-3 px-6 flex items-center justify-between"> {/* Reduced py */}
        {/* Logo */}
        <div className="flex items-center">
          <Link href="/" legacyBehavior>
            <a className="flex flex-col items-start"> {/* Improved alignment */}
            <Image
                src="/dts.webp" // Path to your logo file in public directory
                alt="DTS Logo"
                width={150}
                height={50}
                className="mb-1" // Added spacing below image
              />
            </a>
          </Link>
        </div>

        {/* Search Bar */}
        <div className="flex-grow mx-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search here.."
              className="block w-full pl-4 pr-10 py-2 text-gray-900 bg-gray-100 border border-gray-300 rounded-full focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
               <svg className="h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
               </svg>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="space-x-3 md:space-x-5 flex items-center"> {/* Reduced space-x */}
          <Link href="/courses" legacyBehavior>
            <a className="text-black hover:text-yellow-500 transition-colors">Courses</a>
          </Link>
          <Link href="/iscience" legacyBehavior>
            <a className="text-black hover:text-yellow-500 transition-colors">iScience</a>
          </Link>
          <Link href="/about" legacyBehavior>
            <a className="text-black hover:text-yellow-500 transition-colors">About Us</a>
          </Link>
          <div className="relative">
            <button className="text-black hover:text-yellow-500 transition-colors flex items-center" >
              More
              <svg className="fill-current h-4 w-4 ml-1" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
            </button>
            {/* Add dropdown menu here if needed */}
          </div>
          <Link href="/login" legacyBehavior>
            <a className="text-black hover:text-yellow-500 transition-colors">Login</a>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;