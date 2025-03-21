"use client"
import React from 'react';
import { Button } from '@/components/ui/button';

function Page() {
  const handleRedirect = () => {
    window.location.href = 'http://equiskillcourse.vercel.app/dashboard';
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-6">
      <div className="w-full bg-white shadow-lg rounded-2xl p-8 text-center">
        <h1 className="text-3xl font-bold text-blue-600 mb-4">Introducing AI-Powered Course Generator for Teachers</h1>
        <p className="text-gray-700 mb-6 text-lg">
          Elevate your teaching experience with our AI-driven course generator. Now available for educators, this tool empowers you to create, plan, and manage courses efficiently, saving time and enhancing lesson delivery.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
          <div className="bg-blue-50 p-5 rounded-xl shadow">
            <h2 className="text-xl font-semibold text-blue-700">📖 Plan Lesson Content & Course Structure</h2>
            <p className="text-gray-600 mt-2">
              Easily generate structured lesson plans, course modules, and comprehensive syllabi tailored to your subject and students' needs.
            </p>
          </div>

          <div className="bg-yellow-50 p-5 rounded-xl shadow">
            <h2 className="text-xl font-semibold text-yellow-700">🎯 Prepare Effectively for Your Classes</h2>
            <p className="text-gray-600 mt-2">
              Get AI-suggested study materials, quizzes, and activities that help make your classes more engaging and effective.
            </p>
          </div>
        </div>

        <div className="bg-green-50 p-5 rounded-xl shadow mt-6">
          <h2 className="text-xl font-semibold text-green-700">🚀 Why Use AI for Course Creation?</h2>
          <ul className="list-disc list-inside text-gray-600 mt-2">
            <li>✅ Save hours of manual planning with AI assistance</li>
            <li>✅ Customize course content to fit your teaching style</li>
            <li>✅ Provide students with well-structured, engaging learning materials</li>
            <li>✅ Adapt and refine lesson plans effortlessly</li>
          </ul>
        </div>

        <Button className="mt-8" onClick={handleRedirect}>Get Started</Button>
      </div>
    </div>
  );
}

export default Page;
