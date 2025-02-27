/* eslint-disable @typescript-eslint/no-explicit-any */
// lib/api.ts (or lib/api.js)

import axios from "axios";

interface Partner {
  partnerId: number;
  partnerName: string;
}

interface CourseCategory {
  categoryName: string;
}

export interface CourseData {
  [x: string]: any;
  Partner?: Partner;
  CourseCategory?: CourseCategory;
  courseId: number;
  title: string;
  originalPrice: string;
  discountedPrice: string;
  imageUrl?: string;
  Categories?: string;  
  CourseDuration?: string; 
}

export const fetchCourses = async (): Promise<CourseData[]> => {
  try {
    const response = await fetch("http://stu.globalknowledgetech.com:5002/lms/course");
    if (!response.ok) {
      const errorText = await response.text();
      console.error("Failed to fetch courses:", {
        status: response.status,
        statusText: response.statusText,
        errorText,
      });
      throw new Error(`HTTP error: ${response.status}`);
    }

    const data = await response.json();
      // Make sure the response contains a courses array property
    if (data && typeof data === 'object' && Array.isArray(data.courses)) {
      return data.courses;
    } else {
      console.error("API response does not contain an array of courses:", data);
      return [];
    }
  } catch (error) {
    console.error("Error fetching courses:", error);
    return [];
  }
};

interface CertificationPartner {
  partnerId: number;
  partnerName: string;
}

interface CertificationCategory {
  categoryName: string;
}

export interface CertificationData {
  CertificationPartner: { partnerId: number; };
  certificationId: number;
  certificateCourseId: number;
  slug: string;
  title: string;
  Partner?: CertificationPartner;
  CertificationCategory?: CertificationCategory;
  description?: string;
  duration?: string;
  level?: string;
  imageUrl?: string; // Assuming there is a URL for certificate image
}

export const fetchCertifications = async (): Promise<CertificationData[]> => {
  try {
    const response = await fetch(
      "http://stu.globalknowledgetech.com:5002/lms/certificate-course",
      {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Response not OK:", {
        status: response.status,
        statusText: response.statusText,
        body: errorText,
      });
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
      // Make sure the response contains a certificateCourses array property
      if (data && typeof data === 'object' && Array.isArray(data.certificateCourses)) {
        return data.certificateCourses;
      } else {
        console.error("API response does not contain an array of certificateCourses:", data);
        return [];
      }
  } catch (error) {
    console.error("Error fetching certifications:", error);
    return [];
  }
};

export const fetchCoursesByPartner = async () => {
  try {
    const response = await fetch("http://stu.globalknowledgetech.com:5002/lms/course");
    if (!response.ok) {
      const errorText = await response.text();
      console.error("Failed to fetch courses by partner:", {
        status: response.status,
        statusText: response.statusText,
        errorText,
      });
      throw new Error(`HTTP error: ${response.status}`);
    }

    const data = await response.json();
      // Make sure the response contains a courses array property
      if (data && typeof data === 'object' && Array.isArray(data.courses)) {
        const groupedCourses = data.courses.reduce((acc: Record<string, CourseData[]>, course: CourseData) => {
          const partnerName = course.Partner?.partnerName || "Other";
          if (!acc[partnerName]) {
            acc[partnerName] = [];
          }
          acc[partnerName].push(course);
          return acc;
        }, {});

        return groupedCourses;
      } else {
        console.error("API response does not contain an array of courses:", data);
        return {};
      }
  } catch (error) {
    console.error("Error fetching courses by partner:", error);
    return {};
  }
};

const axiosPublic = axios.create({
  baseURL: "http://stu.globalknowledgetech.com:5002",
  headers: {
    "Content-Type": "application/json",
  },
});

export interface Course {
  courseId: number;
  title: string;
  description: string;
  slug: string;
}

export interface CertificateCourseItem {
  certificateCourseItemId: number;
  courseId: number;
  Course: Course;
}

export interface CertificateCourseCostPlan {
  certificateCourseCostPlanId: number;
  certificateCourseId: number;
  CertificateCourseItems: CertificateCourseItem[];
}

export interface CertificateData {
  title: string;
  description: string | null;
  CertificateCourseCostPlans: CertificateCourseCostPlan[];
  imageUrl?: string;
}

export const fetchCertificateBySlug = async (slug: string): Promise<CertificateData> => {
  try {
    const response = await axiosPublic.get("/lms/certificate-course", {
      params: {
        slug: slug,
      },
    });

    if (!response.data || !Array.isArray(response.data.certificateCourses)) {
      console.error("Invalid API response for certificate by slug:", response.data);
      throw new Error("Invalid API response structure");
    }

    console.log("API Response:", response.data);
    return response.data.certificateCourses[0];
  } catch (error) {
    console.error("Error fetching certificate by slug:", error);
    throw error;
  }
};

// lib/api.ts

export const fetchCourseBySlug = async (slug: string) => {
  try {
    const response = await fetch(`http://stu.globalknowledgetech.com:5002/lms/course?slug=${slug}`); // Adjust the URL if needed
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    // Assuming the API returns a single course or an array with a single course:
    if (data && Array.isArray(data.courses) && data.courses.length > 0) {
        return data.courses[0]; // Return the first course in the array
    } else if (data && typeof data === 'object' && data.courses) {
        return data.courses;
    }
      else {
      throw new Error("Course not found or invalid API response");
    }

  } catch (error) {
    console.error("Error fetching course by slug:", error);
    throw error; // Re-throw the error so the component knows it failed
  }
};