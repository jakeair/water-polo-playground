import React from "react";
import { Target, Trophy, MessageSquare, Lightbulb, Users, ClipboardList } from "lucide-react";
import Navigation from "@/components/Navigation";

const AboutPage = () => {
  return (
    <div className="relative min-h-screen w-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Navigation />
      
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      {/* Header Section */}
      <header className="relative py-16 px-4 text-center">
        <h1 className="text-5xl sm:text-6xl font-bold bg-gradient-to-r from-white via-white/90 to-white/70 text-transparent bg-clip-text mb-4">
          About Us
        </h1>
        <p className="text-xl sm:text-2xl text-white/60 max-w-3xl mx-auto mb-4">
          Empowering Water Polo Coaches and Players Worldwide
        </p>
        <p className="text-lg text-white/80 max-w-2xl mx-auto">
          We combine cutting-edge technology with deep water polo expertise to revolutionize how teams strategize, train, and compete. Our platform serves everyone from youth teams to Olympic athletes.
        </p>
      </header>

      {/* Vision Section */}
      <section className="relative py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-8">
            Our Vision
          </h2>
          <div className="text-center mb-12">
            <p className="text-lg text-white/60 leading-relaxed max-w-3xl mx-auto mb-8">
              We are a dedicated team of water polo players and coaches committed to revolutionizing 
              how strategies are created, shared, and understood. Our tools are designed to serve 
              everyone in the water polo community, from youth teams to Olympic athletes.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
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
                className="group bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-8 text-left transition-all hover:scale-105"
              >
                <div className="bg-white/10 rounded-xl p-3 w-fit mb-4">
                  <item.icon
                    className="w-8 h-8 text-white"
                    strokeWidth={1.5}
                  />
                </div>
                <span className="text-lg font-semibold text-white block mb-2">{item.label}</span>
                <p className="text-sm text-white/60">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="relative py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-8">
            Our Mission
          </h2>
          <div className="text-center mb-12">
            <p className="text-lg text-white/60 leading-relaxed max-w-3xl mx-auto">
              Our mission is to empower coaches with intuitive digital tools that enhance 
              communication, simplify strategy planning, and elevate training effectiveness. 
              We believe that better tools lead to better coaching, and better coaching 
              creates stronger athletes.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative bg-white/5 backdrop-blur-sm border-t border-white/10 text-white/60 py-8 px-4 text-center mt-16">
        <p className="text-sm md:text-base">
          © {new Date().getFullYear()} Water Polo Coaching Tools | Designed by Players, Built for Coaches
        </p>
      </footer>
    </div>
  );
};

export default AboutPage;