import React from 'react';
import { Link } from 'react-router-dom';
import { SidebarProvider } from '@/components/ui/sidebar';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Play, Info, ArrowRight } from 'lucide-react';

const Home = () => {
  return (
    <SidebarProvider>
      <div className="relative min-h-screen w-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/30 to-slate-900/50" />
        
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }} />
        </div>

        <Navigation />
        
        <main className="relative flex flex-col items-center justify-center min-h-screen p-4 sm:p-8 md:p-12 lg:p-16">
          <div className="max-w-7xl w-full space-y-12 md:space-y-16">
            <div className="space-y-6 text-center">
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold bg-gradient-to-r from-white via-white/90 to-white/70 text-transparent bg-clip-text break-words leading-tight px-4">
                Water Polo Strategy
              </h1>
              <p className="text-xl sm:text-2xl md:text-3xl text-white/60 max-w-3xl mx-auto leading-relaxed">
                Design, animate, and share your water polo plays with our interactive court builder
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link to="/plays">
                <Button size="lg" className="group bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 text-white gap-3 px-8 py-6 text-lg">
                  <Play className="w-6 h-6" />
                  Create Plays
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link to="/about">
                <Button variant="outline" size="lg" className="border-white/20 text-slate-900 bg-white/90 hover:bg-white gap-3 px-8 py-6 text-lg">
                  <Info className="w-6 h-6" />
                  Learn More
                </Button>
              </Link>
            </div>

            {/* Whiteboard Preview */}
            <div className="relative mx-auto max-w-5xl rounded-2xl overflow-hidden shadow-2xl border border-white/10">
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-transparent to-transparent pointer-events-none" />
              <img 
                src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b"
                alt="Water Polo Whiteboard Preview"
                className="w-full aspect-[16/9] object-cover"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="group bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-8 text-left transition-all hover:scale-105">
                <div className="bg-white/10 rounded-xl p-3 w-fit mb-4">
                  <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                    <path d="M12 6v6l4 2" />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold text-white mb-3">Interactive Court</h3>
                <p className="text-white/60 text-lg">Drag and drop players, draw movements, and create complex plays with ease.</p>
              </div>
              
              <div className="group bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-8 text-left transition-all hover:scale-105">
                <div className="bg-white/10 rounded-xl p-3 w-fit mb-4">
                  <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 3l14 9-14 9V3z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold text-white mb-3">Animate Plays</h3>
                <p className="text-white/60 text-lg">Bring your strategies to life with smooth animations and timeline controls.</p>
              </div>
              
              <div className="group bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-8 text-left transition-all hover:scale-105">
                <div className="bg-white/10 rounded-xl p-3 w-fit mb-4">
                  <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8" />
                    <path d="M16 6l-4-4-4 4" />
                    <path d="M12 2v13" />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold text-white mb-3">Share Strategies</h3>
                <p className="text-white/60 text-lg">Export and share your plays with your team or the water polo community.</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Home;