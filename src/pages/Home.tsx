import React from 'react';
import { Link } from 'react-router-dom';
import { SidebarProvider } from '@/components/ui/sidebar';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Play, Info, ArrowRight, Trophy, Users, Zap, Share2 } from 'lucide-react';

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

        {/* Logo */}
        <div className="absolute top-6 left-6 sm:top-8 sm:left-8 z-50">
          <img 
            src="/lovable-uploads/3d2e9fbd-02ec-4aed-8cf5-8960a9a8ea77.png" 
            alt="Water Polo Strategy Logo" 
            className="w-14 h-14 sm:w-16 sm:h-16 object-contain filter drop-shadow-lg hover:scale-105 transition-transform duration-200"
          />
        </div>

        <Navigation />
        
        <main className="relative flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 md:px-8 lg:px-16 max-w-[1400px] mx-auto">
          <div className="w-full space-y-8 sm:space-y-12 md:space-y-16 lg:space-y-24 py-20 sm:py-24">
            <div className="space-y-6 sm:space-y-8 text-center animate-fade-in">
              <div className="inline-block px-3 py-1 sm:px-4 sm:py-1.5 bg-white/10 backdrop-blur rounded-full text-xs sm:text-sm font-medium text-white/80 mb-2 sm:mb-4">
                🎯 Professional Water Polo Strategy Platform
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-white via-white/90 to-white/70 text-transparent bg-clip-text leading-[1.15] px-2 sm:px-4 pb-2">
                Elevate Your Water Polo Strategy
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl text-white/60 max-w-3xl mx-auto leading-relaxed px-2">
                Create, animate, and share professional water polo strategies. Used by top coaches and teams worldwide.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center pt-4">
                <Link to="/plays">
                  <Button size="lg" className="w-full sm:w-auto group bg-white text-slate-900 hover:bg-white/90 gap-2 sm:gap-3 px-6 sm:px-8 py-5 sm:py-6 text-base sm:text-lg">
                    <Play className="w-5 h-5 sm:w-6 sm:h-6" />
                    Start Creating Plays
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
                <Link to="/pricing">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto border-white/20 text-white hover:bg-white/10 gap-2 sm:gap-3 px-6 sm:px-8 py-5 sm:py-6 text-base sm:text-lg">
                    View Pricing
                  </Button>
                </Link>
              </div>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 px-2 sm:px-4 animate-fade-in" style={{ animationDelay: '200ms' }}>
              <div className="group bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/10 rounded-xl sm:rounded-2xl p-6 sm:p-8 text-left transition-all hover:scale-[1.02]">
                <div className="bg-white/10 rounded-lg sm:rounded-xl p-2 sm:p-3 w-fit mb-3 sm:mb-4">
                  <Trophy className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-400" />
                </div>
                <h3 className="text-xl sm:text-2xl font-semibold text-white mb-2 sm:mb-3">Professional Tools</h3>
                <p className="text-base sm:text-lg text-white/60">Advanced animation tools and strategies used by championship teams.</p>
              </div>
              
              <div className="group bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/10 rounded-xl sm:rounded-2xl p-6 sm:p-8 text-left transition-all hover:scale-[1.02]">
                <div className="bg-white/10 rounded-lg sm:rounded-xl p-2 sm:p-3 w-fit mb-3 sm:mb-4">
                  <Users className="w-6 h-6 sm:w-8 sm:h-8 text-blue-400" />
                </div>
                <h3 className="text-xl sm:text-2xl font-semibold text-white mb-2 sm:mb-3">Team Collaboration</h3>
                <p className="text-base sm:text-lg text-white/60">Share and collaborate on plays with your entire coaching staff.</p>
              </div>
              
              <div className="group bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/10 rounded-xl sm:rounded-2xl p-6 sm:p-8 text-left transition-all hover:scale-[1.02]">
                <div className="bg-white/10 rounded-lg sm:rounded-xl p-2 sm:p-3 w-fit mb-3 sm:mb-4">
                  <Zap className="w-6 h-6 sm:w-8 sm:h-8 text-purple-400" />
                </div>
                <h3 className="text-xl sm:text-2xl font-semibold text-white mb-2 sm:mb-3">Real-time Updates</h3>
                <p className="text-base sm:text-lg text-white/60">Instant updates and synchronization across all devices.</p>
              </div>
            </div>

            {/* Social Proof */}
            <div className="text-center space-y-6 sm:space-y-8 animate-fade-in px-2 sm:px-4" style={{ animationDelay: '400ms' }}>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">Trusted by Leading Teams</h2>
              <div className="flex flex-wrap justify-center gap-4 sm:gap-8 items-center opacity-60">
                <span className="text-lg sm:text-xl text-white/80 font-semibold">Olympic Teams</span>
                <span className="text-lg sm:text-xl text-white/80 font-semibold">NCAA Programs</span>
                <span className="text-lg sm:text-xl text-white/80 font-semibold">Club Teams</span>
                <span className="text-lg sm:text-xl text-white/80 font-semibold">National Teams</span>
              </div>
            </div>

            {/* CTA Section */}
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-12 text-center space-y-4 sm:space-y-6 mx-2 sm:mx-4 animate-fade-in" style={{ animationDelay: '600ms' }}>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">Ready to Transform Your Strategy?</h2>
              <p className="text-base sm:text-lg md:text-xl text-white/60 max-w-2xl mx-auto">
                Join the elite teams using our platform to develop winning strategies.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center pt-2 sm:pt-4">
                <Link to="/pricing" className="w-full sm:w-auto">
                  <Button size="lg" className="w-full sm:w-auto bg-white text-slate-900 hover:bg-white/90 gap-2 px-6 sm:px-8 py-5 sm:py-6 text-base sm:text-lg">
                    Start Free Trial
                  </Button>
                </Link>
                <Link to="/pricing" className="w-full sm:w-auto">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto border-white/20 text-white hover:bg-white/10 gap-2 px-6 sm:px-8 py-5 sm:py-6 text-base sm:text-lg">
                    Watch Demo
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Home;