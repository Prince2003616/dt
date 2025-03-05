// components/Footer.tsx
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FaLinkedin, FaInstagram, FaFacebook } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-white text-gray-700 py-12">
      <div className="container mx-auto px-8 flex flex-wrap justify-between items-start">
        {/* Logo and Description */}
        <div className="w-full md:w-1/4 mb-6 md:mb-0">
          <Link href="/" legacyBehavior>
            <a className="flex flex-col items-start">
              <Image
                src="/dts.webp"
                alt="DTS Logo"
                width={150}
                height={50}
                className="mb-4"
              />
            </a>
          </Link>
        </div>

        {/* Quick Links */}
        <div className="w-full md:w-1/4 mb-6 md:mb-0">
          <h3 className="text-lg font-semibold mb-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-transparent bg-clip-text">
            Quick Links
          </h3>
          <ul className="space-y-2 text-gray-700">
            <li>
              <Link href="/courses" legacyBehavior>
                <a className="hover:text-yellow-500 transition">Courses</a>
              </Link>
            </li>
            <li>
              <Link href="/iscience" legacyBehavior>
                <a className="hover:text-yellow-500 transition">iScience</a>
              </Link>
            </li>
            <li>
              <Link href="/about" legacyBehavior>
                <a className="hover:text-yellow-500 transition">About Us</a>
              </Link>
            </li>
            <li>
              <Link href="/more" legacyBehavior>
                <a className="hover:text-yellow-500 transition">More</a>
              </Link>
            </li>
            <li>
              <Link href="/login" legacyBehavior>
                <a className="hover:text-yellow-500 transition">Login</a>
              </Link>
            </li>
          </ul>
        </div>

        {/* Join Us and Reach Us */}
        <div className="w-full md:w-1/2 flex flex-col md:flex-row justify-end space-y-6 md:space-y-0 md:space-x-12">
          {/* Join Us - Social Icons */}
          <div>
            <h3 className="text-lg font-semibold mb-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-transparent bg-clip-text">
              Join Us
            </h3>
            <div className="flex space-x-4">
              <a
                href="#"
                className="bg-blue-700 hover:bg-blue-600 text-white rounded-full p-3 transition-transform transform hover:scale-110"
              >
                <FaLinkedin className="w-6 h-6" />
              </a>
              <a
                href="#"
                className="bg-gray-800 hover:bg-gray-700 text-white rounded-full p-3 transition-transform transform hover:scale-110"
              >
                <FaInstagram className="w-6 h-6" />
              </a>
              <a
                href="#"
                className="bg-blue-800 hover:bg-blue-700 text-white rounded-full p-3 transition-transform transform hover:scale-110"
              >
                <FaFacebook className="w-6 h-6" />
              </a>
            </div>
          </div>

          {/* Reach Us */}
          <div>
            <h3 className="text-lg font-semibold mb-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-transparent bg-clip-text">
              Reach Us
            </h3>
            <p className="text-sm leading-relaxed">
              Address: #37/1977, Infra Futura Building, <br />
              Opp Bharata Mata College, <br />
              Seaport Airport Road, <br />
              Kakkanad, <br />
              Kochi, Kerala - 682021.
            </p>
            <p className="text-sm mt-2">Phone: +91 6362234133</p>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center mt-8 border-t border-gray-300 pt-4">
        Copyright © 2025, All rights reserved by{" "}
        <Link href="/" legacyBehavior>
          <a className="text-yellow-500 hover:underline transition">
            Decision Tree Solutions Pvt Ltd
          </a>
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
