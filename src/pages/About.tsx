import React from "react";
import { Target, Trophy, MessageSquare, Lightbulb, Users, ClipboardList } from "lucide-react";
import Navigation from "@/components/Navigation";
import OlympicRings from "@/components/OlympicRings";
import NcaaLogo from "@/components/NcaaLogo";
import { Card } from "@/components/ui/card";

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

      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        {/* Hero Section */}
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-white via-white/90 to-white/70 bg-clip-text text-transparent mb-6">
            Revolutionizing Water Polo Strategy
          </h1>
          <p className="text-lg md:text-xl text-white/60 max-w-3xl mx-auto leading-relaxed">
            We're passionate about elevating the game of water polo through innovative digital solutions 
            that help coaches and players visualize, plan, and execute winning strategies.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {[
            {
              icon: Target,
              title: "Strategic Planning",
              description: "Create and share detailed play diagrams with your team"
            },
            {
              icon: Trophy,
              title: "Game Analysis",
              description: "Break down successful plays and identify areas for improvement"
            },
            {
              icon: MessageSquare,
              title: "Team Communication",
              description: "Enhance coordination with clear visual instructions"
            },
            {
              icon: Lightbulb,
              title: "Innovation",
              description: "Stay ahead with cutting-edge coaching tools"
            },
            {
              icon: Users,
              title: "Team Development",
              description: "Foster player growth and tactical understanding"
            },
            {
              icon: ClipboardList,
              title: "Practice Planning",
              description: "Organize efficient and focused training sessions"
            }
          ].map((feature, index) => (
            <Card 
              key={index}
              className="group hover:scale-105 transition-all duration-300 bg-white/5 border-white/10 p-6 backdrop-blur-sm"
            >
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="p-3 rounded-full bg-white/10 group-hover:bg-white/20 transition-colors">
                  <feature.icon className="w-8 h-8 text-white" strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-semibold text-white">{feature.title}</h3>
                <p className="text-white/60">{feature.description}</p>
              </div>
            </Card>
          ))}
        </div>

        {/* Partners Section */}
        <div className="text-center space-y-8">
          <h2 className="text-3xl font-bold text-white mb-8">Trusted By</h2>
          <div className="flex justify-center items-center gap-8 flex-wrap">
            <div className="backdrop-blur-sm bg-white/5 p-6 rounded-xl hover:bg-white/10 transition-colors">
              <OlympicRings className="opacity-90" size={180} />
            </div>
            <div className="backdrop-blur-sm bg-white/5 p-6 rounded-xl hover:bg-white/10 transition-colors">
              <NcaaLogo className="opacity-90" size={180} />
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-24 text-center text-white/60">
          <p>© {new Date().getFullYear()} Water Polo Strategy. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default AboutPage;