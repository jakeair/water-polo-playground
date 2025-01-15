import React from "react";
import { Trophy, Users, Target, Flag, Medal } from "lucide-react";
import Navigation from "@/components/Navigation";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-[#f4f8fb]">
      <Navigation />
      
      {/* Header Section */}
      <header className="bg-[#0074D9] text-white py-16 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">About Us</h1>
        <p className="text-xl md:text-2xl max-w-3xl mx-auto">
          Empowering Water Polo Coaches and Players Worldwide
        </p>
      </header>

      {/* Vision Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-[#333] mb-8">
            Our Vision
          </h2>
          <div className="text-center mb-12">
            <p className="text-lg text-[#333] leading-relaxed max-w-3xl mx-auto mb-8">
              We are a dedicated team of water polo players and coaches committed to revolutionizing 
              how strategies are created, shared, and understood. Our tools are designed to serve 
              everyone in the water polo community, from youth teams to Olympic athletes.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { icon: Trophy, label: "Excellence" },
              { icon: Users, label: "Teamwork" },
              { icon: Target, label: "Strategy" },
              { icon: Flag, label: "Competition" },
              { icon: Medal, label: "Achievement" },
            ].map((item, index) => (
              <div
                key={index}
                className="flex flex-col items-center group p-6 rounded-lg bg-white shadow-md transition-all duration-300 hover:shadow-lg"
              >
                <item.icon
                  className="w-16 h-16 mb-4 text-[#0074D9] transition-transform duration-300 group-hover:scale-110"
                  strokeWidth={1.5}
                />
                <span className="text-lg font-semibold text-[#333]">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-[#333] mb-8">
            Our Mission
          </h2>
          <div className="text-center mb-12">
            <p className="text-lg text-[#333] leading-relaxed max-w-3xl mx-auto">
              Our mission is to empower coaches with intuitive digital tools that enhance 
              communication, simplify strategy planning, and elevate training effectiveness. 
              We believe that better tools lead to better coaching, and better coaching 
              creates stronger athletes.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0074D9] text-white py-8 px-4 text-center">
        <p className="text-sm md:text-base">
          © {new Date().getFullYear()} Water Polo Coaching Tools | Designed by Players, Built for Coaches
        </p>
      </footer>
    </div>
  );
};

export default AboutPage;