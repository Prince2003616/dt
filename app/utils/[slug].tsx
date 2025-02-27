// pages/courses/[slug].tsx

import { useRouter } from 'next/router';
import CourseDetail from '@/app/courses/coursedetails/details';

const CoursePage = () => {
  const router = useRouter();
  const { slug } = router.query;

  if (!slug) {
    return <div>Loading...</div>; // Or handle the case where slug is not available
  }

  return <CourseDetail slug={slug as string} />;
};

export default CoursePage;