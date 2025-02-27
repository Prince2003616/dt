import { useEffect, useState } from 'react';
import { CourseData, fetchCourseBySlug } from '@/app/utils/api'; 
import CourseSections from './coursesection';

interface CourseDetailProps {
  slug: string;
}

const CourseDetail: React.FC<CourseDetailProps> = ({ slug }) => {
  const [course, setCourse] = useState<CourseData | null>(null);

  useEffect(() => {
      const fetchCourse = async () => {
          try {
              const courseData = await fetchCourseBySlug(slug); // Uncomment this later
              setCourse(courseData); // Uncomment this later

               // Placeholder data (replace with actual fetch)
              const placeholderCourse: CourseData = {
                  courseId: 1,
                  title: "Prompt Engineering for Generative AI",
                  originalPrice: "2,999.00",
                  discountedPrice: "2,999.00",
                  imageUrl: "",
                  Categories: "Artificial Intelligence",
                  CourseDuration: "0",
                  Partner: {
                    partnerName: "Global Knowledge",
                    partnerId: 0
                  }
              };
              setCourse(placeholderCourse);

          } catch (error) {
              console.error("Failed to fetch course:", error);
              // Handle error appropriately (e.g., display an error message)
          }
      };

      fetchCourse();
  }, [slug]);

  if (!course) {
    return <div>Loading...</div>; // Or a better loading indicator
  }


return (
    <div className="flex flex-1 flex-col m-4">
      <h1 className="text-2xl font-bold m-4 text-black">{course.title}</h1>
      <CourseSections />
    </div>
  );
};

export default CourseDetail;