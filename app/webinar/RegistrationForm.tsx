"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";

interface FormData {
  name: string;
  email: string;
  companyName: string;
  mobile: string;
  webinar: string;
}

const webinarOptions = [
  "Artificial Intelligence",
  "Google Cloud",
  "Microsoft",
  "RedHat",
  "Tableau",
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      when: "beforeChildren",
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10,
    },
  },
};

const RegistrationForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    companyName: "",
    mobile: "",
    webinar: webinarOptions[0],
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Valid email is required.";
    if (!formData.mobile.trim() || !/^\d{10}$/.test(formData.mobile))
      newErrors.mobile = "Enter a valid 10-digit mobile number.";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form data submitted:", formData);
    }
  };

  return (
    <div className="max-h-screen flex items-center justify-center bg-gradient-to-br from-white via-gray-100 to-yellow-100 p-4 md:p-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white shadow-2xl rounded-xl overflow-hidden max-w-6xl w-full flex flex-col md:flex-row"
      >
        {/* Left Panel */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="md:w-1/2 bg-gradient-to-br from-yellow-500 to-yellow-400 text-white p-8 flex flex-col justify-center rounded-xl"
        >
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h2 
              variants={itemVariants}
              className="text-3xl font-bold mb-6 leading-tight"
            >
              Community and Collaboration: Join the GCP Ecosystem
            </motion.h2>
            <motion.p 
              variants={itemVariants}
              className="text-lg mb-6 flex items-center gap-2"
            >
             <span>📅 Date: 18-4-2024</span>
            </motion.p>
            <motion.h3 
              variants={itemVariants}
              className="text-xl font-bold mb-4"
            >
              Topics Covered
            </motion.h3>
            <motion.ul 
              variants={containerVariants}
              className="space-y-3"
            >
              {[
                "🚀 How We Differ From Others",
                "📊 Current Market Standards",
                "🧑‍💻 Realtime Case Studies",
                "💼 Interview Process in Top Tier Companies",
                "🔮 Future Trends",
                "🎯 Interactive Poll / Quiz"
              ].map((item, index) => (
                <motion.li 
                  key={index}
                  variants={itemVariants}
                  className="flex items-start gap-2"
                  whileHover={{ x: 5 }}
                >
                  <span>{item}</span>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        </motion.div>

        {/* Right Panel - Form */}
        <div className="md:w-1/2 p-8 flex flex-col justify-center">
          <motion.form 
            onSubmit={handleSubmit} 
            className="space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {/* Name */}
            <motion.div
              variants={itemVariants}
              initial="hidden"
              animate="visible"
            >
              <label htmlFor="name" className="block text-gray-700 font-medium mb-1.5">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all ${
                  errors.name ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter your full name"
              />
              {errors.name && (
                <motion.p 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-sm mt-1"
                >
                  {errors.name}
                </motion.p>
              )}
            </motion.div>

            {/* Email */}
            <motion.div
              variants={itemVariants}
              initial="hidden"
              animate="visible"
            >
              <label htmlFor="email" className="block text-gray-700 font-medium mb-1.5">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="your.email@example.com"
              />
              {errors.email && (
                <motion.p 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-sm mt-1"
                >
                  {errors.email}
                </motion.p>
              )}
            </motion.div>

            {/* Company Name */}
            <motion.div
              variants={itemVariants}
              initial="hidden"
              animate="visible"
            >
              <label htmlFor="companyName" className="block text-gray-700 font-medium mb-1.5">Company Name</label>
              <input
                type="text"
                id="companyName"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all"
                placeholder="Your company (optional)"
              />
            </motion.div>

            {/* Mobile */}
            <motion.div
              variants={itemVariants}
              initial="hidden"
              animate="visible"
            >
              <label htmlFor="mobile" className="block text-gray-700 font-medium mb-1.5">Mobile</label>
              <input
                type="tel"
                id="mobile"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                className={`w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all ${
                  errors.mobile ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="1234567890"
              />
              {errors.mobile && (
                <motion.p 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-sm mt-1"
                >
                  {errors.mobile}
                </motion.p>
              )}
            </motion.div>

            {/* Webinar Selection */}
            <motion.div
              variants={itemVariants}
              initial="hidden"
              animate="visible"
            >
              <label htmlFor="webinar" className="block text-gray-700 font-medium mb-1.5">Webinar On</label>
              <select
                id="webinar"
                name="webinar"
                value={formData.webinar}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all appearance-none bg-white"
              >
                {webinarOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </motion.div>

            {/* Submit Button */}
            <motion.div 
              className="flex justify-center pt-4"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <button
                type="submit"
                className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white font-bold py-3 px-8 rounded-lg shadow-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
              >
                Register Now 🚀
              </button>
            </motion.div>
          </motion.form>
        </div>
      </motion.div>
    </div>
  );
};

export default RegistrationForm;