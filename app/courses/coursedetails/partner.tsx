import Image from "next/image";
import { motion } from "framer-motion";

const companies = [
  { name: "DXC Technology", logo: "/dxc.png" },
  { name: "Flipkart", logo: "/flipkart.png" },
  { name: "Google", logo: "/google.png" },
  { name: "HCL", logo: "/hcl.png" },
  { name: "Infosys", logo: "/infosys.png" },
  { name: "PayPal", logo: "/paypal.png" },
  { name: "Accenture", logo: "/accenture.png" },
  { name: "Amazon", logo: "/amazon.png" },
  { name: "Cognizant", logo: "/cognizant.png" },
  { name: "Deloitte", logo: "/deloitte.png" },
  { name: "SalesForce", logo: "/salesforce.png" },
  { name: "Walmart", logo: "/walmart.png" },
];

const Partner = () => {
  return (
    <motion.section
      className="bg-white py-12 px-6 text-center rounded-md"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <motion.h2
        className="text-2xl md:text-3xl font-bold text-gray-900"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        Transformative <span className="text-yellow-500">AI & ML</span> Course for High-Impact Jobs
      </motion.h2>

      <motion.p
        className="text-gray-600 max-w-2xl mx-auto mt-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        Build expertise in AI and Machine Learning with our practical, project-based course.
        Designed to accelerate your career, this immersive learning journey prepares you for
        influential roles at some of the world&apos;s fastest-growing companies.
      </motion.p>

      {/* Marquee Wrapper */}
      <div className="relative w-full overflow-hidden mt-6 p-4 rounded-lg">
        <motion.div
          className="flex w-max flex-nowrap gap-8"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            duration: 12,
            ease: "linear",
          }}
          whileHover={{ animationPlayState: "paused" }} // Pause on hover
        >
          {[...companies, ...companies].map((company, index) => (
            <motion.div
              key={index}
              className="flex items-center justify-center"
              whileHover={{ scale: 1.1 }}
            >
              <Image src={company.logo} alt={company.name} width={120} height={40} priority />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Partner;
