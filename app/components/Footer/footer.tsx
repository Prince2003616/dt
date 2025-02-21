// components/Footer.tsx
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaLinkedin, FaInstagram, FaFacebook } from 'react-icons/fa';  //react-icons

const Footer = () => {

    return (
        <footer className="bg-white text-gray-700 py-8"> {/* Increased py */}
            <div className="container mx-auto px-8 flex items-center justify-between"> {/* Increased px */}
                {/* Logo and Description */}
                <div className="w-1/4"> {/* Adjust width as needed */}
                    <Link href="/" legacyBehavior>
                        <a className="flex flex-col items-start">
                            <Image
                                src="/dts.webp" // Path to your logo file
                                alt="DTS Logo"
                                width={150} // Adjust as needed
                                height={50} // Adjust as needed
                                className="mb-2" // Increased mb
                            />
                            <span className="text-xs text-gray-500">DECISION TREE SOLUTIONS</span>
                        </a>
                    </Link>
                </div>

                {/* Quick Links */}
                <div className="w-1/4"> {/* Adjust width as needed */}
                    <h3 className="text-lg font-semibold mb-4">Quick Link</h3> {/* Increased mb */}
                    <ul className="space-y-2"> {/* Increased space-y */}
                        <li><Link href="/courses" legacyBehavior><a className="hover:text-[#B126B1]">Courses</a></Link></li>
                        <li><Link href="/iscience" legacyBehavior><a className="hover:text-[#B126B1]">iScience</a></Link></li>
                        <li><Link href="/about" legacyBehavior><a className="hover:text-[#B126B1]">About Us</a></Link></li>
                        <li><Link href="/more" legacyBehavior><a className="hover:text-[#B126B1]">More</a></Link></li>
                        <li><Link href="/login" legacyBehavior><a className="hover:text-[#B126B1]">Login</a></Link></li>
                    </ul>
                </div>

                {/* Join Us and Reach Us */}
                <div className="flex items-start w-1/2 justify-end"> {/* Aligned Join Us and Reach Us + Width control */}
                    {/* Join Us - Social Icons */}
                    <div className="mr-12"> {/* Increased mr */}
                        <h3 className="text-lg font-semibold mb-4">Join Us</h3> {/* Increased mb */}
                        <div className="flex space-x-4"> {/* Increased space-x */}
                            <a href="#" className="bg-blue-700 hover:bg-blue-600 text-white rounded-full p-3"> {/* Increased p */}
                                <FaLinkedin className="w-6 h-6" /> {/* Increased icon size */}
                            </a>
                            <a href="#" className="bg-gray-800 hover:bg-gray-700 text-white rounded-full p-3"> {/* Increased p */}
                                <FaInstagram className="w-6 h-6" /> {/* Increased icon size */}
                            </a>
                            <a href="#" className="bg-blue-800 hover:bg-blue-700 text-white rounded-full p-3"> {/* Increased p */}
                                <FaFacebook className="w-6 h-6" /> {/* Increased icon size */}
                            </a>
                        </div>
                    </div>

                    {/* Reach Us */}
                    <div className="ml-4"> {/* Added ml */}
                        <h3 className="text-lg font-semibold mb-4">Reach Us</h3> {/* Increased mb */}
                        <p className="text-sm leading-relaxed">Address: #37/1977, Infra Futura Building,<br /> Opp Bharata Mata College,<br />
                           Seaport Airport Road,<br />
                            Kakkanad,<br />
                             Kochi, Kerala - 682021.</p>
                        <p className="text-sm">Phone: +91 6362234133</p>
                    </div>
                </div>
            </div>

            {/* Copyright */}
            <div className="text-center mt-8 border-t border-gray-300 pt-4"> {/* Increased mt and pt */}
                Copyright © 2025, All rights reserved by <Link href="/" legacyBehavior><a className="text-[#B126B1] hover:underline">Decision Tree Solutions Pvt Ltd</a></Link>
            </div>
        </footer>
    );
};

export default Footer;