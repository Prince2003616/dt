/* eslint-disable @typescript-eslint/no-explicit-any */
// lib/api.ts
import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://stu.globalknowledgetech.com:5002";

// Logging function
const logError = (message: string, error: any) => {
    console.error(message, error);
    // Optionally, send the error to a monitoring service.
};

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
    const response = await fetch(`${API_BASE_URL}/lms/course`);
    if (!response.ok) {
      const errorText = await response.text();
      logError("Failed to fetch courses:", {
        status: response.status,
        statusText: response.statusText,
        errorText,
      });
      return [];
    }

    const data = await response.json();
      // Make sure the response contains a courses array property
    if (data && typeof data === 'object' && Array.isArray(data.courses)) {
      return data.courses;
    } else {
      logError("API response does not contain an array of courses:", data);
      return [];
    }
  } catch (error) {
    logError("Error fetching courses:", error || "No error object provided");
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
            `${API_BASE_URL}/lms/certificate-course`,
            {
                method: "GET",
                headers: {
                    Accept: "application/json",
                },
            }
        );

        if (!response.ok) {
            const errorText = await response.text();
            logError("Response not OK:", {
                status: response.status,
                statusText: response.statusText,
                body: errorText,
            });
            return [];
        }

        const data = await response.json();
        if (data && typeof data === 'object' && Array.isArray(data.certificateCourses)) {
            return data.certificateCourses;
        } else {
            logError("API response does not contain an array of certificateCourses:", data);
            return [];
        }
    } catch (error) {
        logError("Error fetching certifications:", error || "No error object provided");
        return [];
    }
};

export const fetchCoursesByPartner = async (): Promise<Record<string, CourseData[]>> => {
    try {
        const response = await fetch(`${API_BASE_URL}/lms/course`);
        if (!response.ok) {
            const errorText = await response.text();
            logError("Failed to fetch courses by partner:", {
                status: response.status,
                statusText: response.statusText,
                errorText,
            });
            return {};
        }

        const data = await response.json();
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
            logError("API response does not contain an array of courses:", data);
            return {};
        }
    } catch (error) {
        logError("Error fetching courses by partner:", error || "No error object provided");
        return {};
    }
};

const axiosPublic = axios.create({
  baseURL: API_BASE_URL,
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

export interface CertificateDetails {
  title: string;
  description: string | null;
  CertificateCourseCostPlans: CertificateCourseCostPlan[];
  imageUrl?: string;
}

export const fetchCertificateBySlug = async (slug: string): Promise<CertificateDetails | null> => {
    try {
        const response = await axiosPublic.get("/lms/certificate-course", {
            params: {
                slug: slug,
            },
        });

        if (!response.data || !Array.isArray(response.data.certificateCourses)) {
            logError("Invalid API response for certificate by slug:", response.data);
            return null;
        }

        console.log("API Response:", response.data);
        return response.data.certificateCourses[0];
    } catch (error) {
        logError("Error fetching certificate by slug:", error || "No error object provided");
        return null;
    }
};

export const fetchCourseBySlug = async (slug: string): Promise<CourseData | null> => {
    try {
        const response = await fetch(`${API_BASE_URL}/lms/course?slug=${slug}`);
        if (!response.ok) {
            logError(`HTTP error! status: ${response.status}`, "No error object provided");
            return null;
        }

        const data = await response.json();

        if (data && data.courses && Array.isArray(data.courses) && data.courses.length > 0) {
            return data.courses[0];
        } else if (data && data.courses && typeof data.courses === 'object') {
            return data.courses;
        } else {
            console.warn("Course not found or invalid API response");
            return null;
        }
    } catch (error) {
        logError("Error fetching course by slug:", error || "No error object provided");
        return null;
    }
};

// New code:

interface Module {
    name?: string;
    description?: string;
    content?: any[]; // Keeping `any` for now, but try to define a more specific type if possible
}

interface Section {
    name: string;
    subtitle: string;
}

const fetchCourseDetails = async (slug: string): Promise<Section[]> => {
    const axiosInstance = axios.create({
        baseURL: API_BASE_URL, // Use the centralized baseURL
        headers: { "Content-Type": "application/json" },
    });

    try {
        const response = await axiosInstance.get("/lms/course-details", {
            params: { slug },
        });

        const modules: Module[] =
            response.data?.courses?.[0]?.CourseContent?.courseContent?.course?.courseDetails?.content?.modules || [];

        if (!Array.isArray(modules)) {
            logError("Modules data not found or invalid structure", response.data);
            return []; // Return empty array instead of throwing an error
        }

        return modules.map((module: Module) => ({
            name: module.name?.trim() || "Untitled Module",
            subtitle: module.name?.trim() || "Untitled Module",
        }));
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const errorMessage = error.response?.data?.message || "Failed to fetch course details";
            logError(errorMessage, error.response?.data);
            throw new Error(errorMessage); // Re-throw for the component to handle
        } else {
            logError("An unexpected error occurred", error);
            throw new Error("An unexpected error occurred"); // Re-throw
        }
    }
};

export { fetchCourseDetails };
export type { Module, Section };