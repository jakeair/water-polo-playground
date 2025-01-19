import React from "react";
import { Target, Trophy, MessageSquare, Lightbulb, Users, ClipboardList } from "lucide-react";
import Navigation from "@/components/Navigation";
import OlympicRings from "@/components/OlympicRings";
import { Link } from "react-router-dom";

const AboutPage = () => {
  return (
    <div className="relative min-h-screen w-full bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Navigation Bar */}
      <div className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-sm border-b border-gray-200 z-50">
        <div className="max-w-[1800px] mx-auto px-4 sm:px-8 py-3 sm:py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-4 group">
            <img 
              src="/lovable-uploads/909e2d5e-f8a8-493f-9d95-f0d86ecd99be.png" 
              alt="Logo" 
              className="h-10 sm:h-14 w-auto opacity-90 transition-all duration-200 group-hover:opacity-100"
            />
          </Link>
          <Navigation />
        </div>
      </div>
      
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, #3b82f6 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      {/* Vision Section */}
      <div className="max-w-[1400px] mx-auto pt-28 sm:pt-32 px-4 sm:px-6">
        <section className="relative py-12 sm:py-16">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col items-center mb-12 sm:mb-16">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-center bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 text-transparent bg-clip-text mb-6 sm:mb-8 animate-fade-in">
                Our Vision
              </h1>
            </div>
            <div className="text-center mb-12 sm:mb-16 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto mb-8">
                We are a dedicated team of water polo players and coaches committed to revolutionizing 
                how strategies are created, shared, and understood. Our tools are designed to serve 
                everyone in the water polo community, from youth teams to Olympic athletes.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 max-w-4xl mx-auto">
              {[
                { icon: Target, label: "Strategy", description: "Advanced tactical planning and execution" },
                { icon: Trophy, label: "Competition", description: "Excellence in competitive play" },
                { icon: MessageSquare, label: "Communication", description: "Enhanced team coordination" },
                { icon: Lightbulb, label: "Innovation", description: "Cutting-edge coaching solutions" },
                { icon: Users, label: "Empowerment", description: "Team development and growth" },
                { icon: ClipboardList, label: "Coaching Tools", description: "Comprehensive training resources" },
              ].map((item, index) => (
                <div
                  key={index}
                  className="group bg-white shadow-lg hover:shadow-xl backdrop-blur-md border border-gray-200 rounded-2xl p-6 sm:p-8 text-left transition-all hover:scale-105 animate-fade-in"
                  style={{ animationDelay: `${0.1 * (index + 3)}s` }}
                >
                  <div className="bg-blue-50 rounded-xl p-3 w-fit mb-4 group-hover:bg-blue-100 transition-colors">
                    <item.icon
                      className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600"
                      strokeWidth={1.5}
                    />
                  </div>
                  <span className="text-lg sm:text-xl font-semibold text-gray-900 block mb-2">{item.label}</span>
                  <p className="text-sm sm:text-base text-gray-600">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="relative py-12 sm:py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-8 animate-fade-in">
              Our Mission
            </h2>
            <div className="text-center mb-12 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto">
                Our mission is to empower coaches with intuitive digital tools that enhance 
                communication, simplify strategy planning, and elevate training effectiveness. 
                We believe that better tools lead to better coaching, and better coaching 
                creates stronger athletes.
              </p>
            </div>
            <div className="flex justify-center items-center mt-8 animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <OlympicRings className="opacity-90 transform hover:scale-105 transition-transform" size={120} />
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="relative bg-white/80 backdrop-blur-sm border-t border-gray-200 text-gray-600 py-6 sm:py-8 px-4 text-center mt-16">
        <p className="text-sm sm:text-base">
          © {new Date().getFullYear()} Water Polo Coaching Tools | Designed by Players, Built for Coaches
        </p>
      </footer>
    </div>
  );
};

export default AboutPage;