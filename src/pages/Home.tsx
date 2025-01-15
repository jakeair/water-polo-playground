import React from 'react';
import { Link } from 'react-router-dom';
import { SidebarProvider } from '@/components/ui/sidebar';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Play, Info } from 'lucide-react';

const Home = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-slate-900 to-slate-800">
        <Navigation />
        <main className="flex-1 flex flex-col items-center justify-center p-4 sm:p-8 md:p-12 lg:p-16">
          <div className="max-w-4xl w-full space-y-8 text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-white to-white/60 text-transparent bg-clip-text break-words">
              Water Polo Strategy
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-white/60 max-w-2xl mx-auto">
              Design, animate, and share your water polo plays with our interactive court builder
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-12">
              <Link to="/plays">
                <Button size="lg" className="bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 text-white gap-2">
                  <Play className="w-5 h-5" />
                  Create Plays
                </Button>
              </Link>
              <Link to="/about">
                <Button variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10 gap-2">
                  <Info className="w-5 h-5" />
                  Learn More
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
              <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 text-left">
                <h3 className="text-xl font-semibold text-white mb-2">Interactive Court</h3>
                <p className="text-white/60">Drag and drop players, draw movements, and create complex plays with ease.</p>
              </div>
              <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 text-left">
                <h3 className="text-xl font-semibold text-white mb-2">Animate Plays</h3>
                <p className="text-white/60">Bring your strategies to life with smooth animations and timeline controls.</p>
              </div>
              <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 text-left">
                <h3 className="text-xl font-semibold text-white mb-2">Share Strategies</h3>
                <p className="text-white/60">Export and share your plays with your team or the water polo community.</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Home;