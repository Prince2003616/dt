"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaPaperPlane,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Message Sent!");
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
  };

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center min-h-screen bg-white px-8 py-12">
      {/* Left Section with Logo */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="relative flex-1 max-w-lg p-10 bg-white/60 backdrop-blur-lg rounded-2xl shadow-lg border border-yellow-300 text-black space-y-6 before:w-24 before:h-24 before:absolute before:bg-yellow-500 before:rounded-full before:-z-10 before:blur-3xl after:w-32 after:h-32 after:absolute after:bg-yellow-400 after:rounded-full after:-z-10 after:blur-xl after:top-24 after:-right-12"
      >
        {/* Logo */}
        <div className="flex justify-center">
          <Link href="#">
            <Image
              src="/dts.webp"
              alt="Decision Tree Solutions"
              width={230}
              height={150}
            />
          </Link>
        </div>

        <h2 className="text-3xl font-bold text-center drop-shadow-lg">
          Contact Us
        </h2>
        <p className="text-center text-gray-700">
          Have questions? Get in touch and we&apos;ll be happy to help.
        </p>

        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <FaMapMarkerAlt className="text-yellow-500 text-xl" />
            <span className="text-gray-800">
              123 Main Street, City, Country
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <FaPhoneAlt className="text-yellow-500 text-xl" />
            <span className="text-gray-800">+123 456 7890</span>
          </div>
          <div className="flex items-center space-x-4">
            <FaEnvelope className="text-yellow-500 text-xl" />
            <span className="text-gray-800">contact@yourcompany.com</span>
          </div>
        </div>
      </motion.div>

      {/* Right Section (Form) */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="relative flex-1 max-w-lg w-full p-10 bg-white/50 backdrop-blur-lg rounded-2xl shadow-lg border border-yellow-300 space-y-5 mt-10 lg:mt-0 lg:ml-10 before:w-24 before:h-24 before:absolute before:bg-yellow-500 before:rounded-full before:-z-10 before:blur-3xl after:w-32 after:h-32 after:absolute after:bg-yellow-400 after:rounded-full after:-z-10 after:blur-xl after:top-24 after:-right-12"
      >
        <h2 className="text-3xl font-bold text-black text-center drop-shadow-lg">
          Get in Touch
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Full Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-black mb-2"
            >
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 border border-yellow-500 rounded-lg shadow-sm bg-white/60 text-black placeholder-gray-500 focus:ring-2 focus:ring-yellow-500"
              placeholder="John Doe"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-black mb-2"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border border-yellow-500 rounded-lg shadow-sm bg-white/60 text-black placeholder-gray-500 focus:ring-2 focus:ring-yellow-500"
              placeholder="your.email@example.com"
              required
            />
          </div>

          {/* Phone Number */}
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-black mb-2"
            >
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-3 border border-yellow-500 rounded-lg shadow-sm bg-white/60 text-black placeholder-gray-500 focus:ring-2 focus:ring-yellow-500"
              placeholder="+123 456 7890"
            />
          </div>

          {/* Subject */}
          <div>
            <label
              htmlFor="subject"
              className="block text-sm font-medium text-black mb-2"
            >
              Subject
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="w-full p-3 border border-yellow-500 rounded-lg shadow-sm bg-white/60 text-black placeholder-gray-500 focus:ring-2 focus:ring-yellow-500"
              placeholder="Inquiry about services"
              required
            />
          </div>

          {/* Message */}
          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-black mb-2"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              value={formData.message}
              onChange={handleChange}
              className="w-full p-3 border border-yellow-500 rounded-lg shadow-sm bg-white/60 text-black placeholder-gray-500 focus:ring-2 focus:ring-yellow-500"
              placeholder="Your message here..."
              required
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="flex items-center gap-2 px-6 py-3 font-bold rounded-lg text-white bg-gradient-to-r from-yellow-500 to-yellow-600 shadow-lg hover:from-yellow-600 hover:to-yellow-700 transition-all"
            >
              <FaPaperPlane />
              Send Message
            </motion.button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
