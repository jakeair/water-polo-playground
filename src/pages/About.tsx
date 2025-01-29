import React from "react";
import Navigation from "@/components/Navigation";

const AboutPage = () => {
  return (
    <div className="relative min-h-screen w-full bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Navigation Bar */}
      <div className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-sm border-b border-gray-200 z-50">
        <div className="max-w-[1800px] mx-auto px-4 sm:px-8 py-3 sm:py-4">
          <Navigation />
        </div>
      </div>
      
      <div className="max-w-[1400px] mx-auto pt-28 sm:pt-32 px-4 sm:px-6">
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
          <p className="text-xl sm:text-2xl text-gray-700 mb-4">
            Hi, there.
          </p>
          <p className="text-lg sm:text-xl text-gray-600">
            Inquiries DM @waterpolostrategy
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;