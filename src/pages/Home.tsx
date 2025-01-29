import React from 'react';
import { Link } from 'react-router-dom';
import { SidebarProvider } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Play } from 'lucide-react';

const Home = () => {
  return (
    <SidebarProvider>
      <div className="relative min-h-screen w-full bg-gradient-to-br from-[#F8FAFC] via-white to-[#EFF6FF]">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, #0EA5E9 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }} />
        </div>

        <main className="relative flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 max-w-[1400px] mx-auto">
          <div className="w-full space-y-8 text-center animate-fade-in">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 leading-[1.15] mb-8">
              Water Polo Strategy
            </h1>
            
            <h2 className="text-xl sm:text-2xl md:text-3xl text-gray-600 font-medium">
              Tools for Coaches
            </h2>
            
            <p className="text-lg sm:text-xl text-gray-500 italic">
              Beta version - Free forever. No credit card needed. Ever. 🏊‍♂️
            </p>

            <div className="pt-8">
              <Link to="/plays">
                <Button 
                  size="lg" 
                  className="group bg-blue-600 hover:bg-blue-700 text-white gap-2 sm:gap-3 px-6 sm:px-8 py-5 sm:py-6 text-base sm:text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  <Play className="w-5 h-5 sm:w-6 sm:h-6" />
                  Start Creating Plays
                </Button>
              </Link>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Home;