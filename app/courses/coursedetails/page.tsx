// app/courses/coursedetails/page.tsx
"use client"; // Make it a client component since we're using useRouter
import React from 'react';
import CourseDetail from './details';
import { useSearchParams } from 'next/navigation'; // Correct import
import Header from '@/app/components/Header/header';
import Footer from '@/app/components/Footer/footer';

function Content() {
  const searchParams = useSearchParams();
  const slug = searchParams.get('slug') as string; // Access the slug from the query

  return (
    <div>
      <Header />
      <CourseDetail slug={slug} />
      <Footer />
    </div>
  );
}

export default Content;