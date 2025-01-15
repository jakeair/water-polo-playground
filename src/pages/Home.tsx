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

        <Navigation />
        
        <main className="relative flex flex-col items-center justify-center min-h-screen p-4 sm:p-8 md:p-12 lg:p-16">
          <div className="max-w-7xl w-full space-y-16 md:space-y-24">
            {/* Hero Section */}
            <div className="space-y-8 text-center animate-fade-in">
              <div className="inline-block px-4 py-1.5 bg-white/10 backdrop-blur rounded-full text-sm font-medium text-white/80 mb-4">
                🎯 Professional Water Polo Strategy Platform
              </div>
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold bg-gradient-to-r from-white via-white/90 to-white/70 text-transparent bg-clip-text break-words leading-tight px-4">
                Elevate Your Water Polo Game
              </h1>
              <p className="text-xl sm:text-2xl text-white/60 max-w-3xl mx-auto leading-relaxed">
                Create, animate, and share professional water polo strategies. Used by top coaches and teams worldwide.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-4">
                <Link to="/plays">
                  <Button size="lg" className="group bg-white text-slate-900 hover:bg-white/90 gap-3 px-8 py-6 text-lg">
                    <Play className="w-6 h-6" />
                    Start Creating Plays
                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
                <Link to="/pricing">
                  <Button variant="outline" size="lg" className="border-white/20 text-slate-900 bg-white hover:bg-white/10 hover:text-white gap-3 px-8 py-6 text-lg">
                    View Pricing
                  </Button>
                </Link>
              </div>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-fade-in" style={{ animationDelay: '200ms' }}>
              <div className="group bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-8 text-left transition-all hover:scale-105">
                <div className="bg-white/10 rounded-xl p-3 w-fit mb-4">
                  <Trophy className="w-8 h-8 text-yellow-400" />
                </div>
                <h3 className="text-2xl font-semibold text-white mb-3">Professional Tools</h3>
                <p className="text-white/60 text-lg">Advanced animation tools and strategies used by championship teams.</p>
              </div>
              
              <div className="group bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-8 text-left transition-all hover:scale-105">
                <div className="bg-white/10 rounded-xl p-3 w-fit mb-4">
                  <Users className="w-8 h-8 text-blue-400" />
                </div>
                <h3 className="text-2xl font-semibold text-white mb-3">Team Collaboration</h3>
                <p className="text-white/60 text-lg">Share and collaborate on plays with your entire coaching staff.</p>
              </div>
              
              <div className="group bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-8 text-left transition-all hover:scale-105">
                <div className="bg-white/10 rounded-xl p-3 w-fit mb-4">
                  <Zap className="w-8 h-8 text-purple-400" />
                </div>
                <h3 className="text-2xl font-semibold text-white mb-3">Real-time Updates</h3>
                <p className="text-white/60 text-lg">Instant updates and synchronization across all devices.</p>
              </div>
            </div>

            {/* Social Proof */}
            <div className="text-center space-y-8 animate-fade-in" style={{ animationDelay: '400ms' }}>
              <h2 className="text-3xl sm:text-4xl font-bold text-white">Trusted by Leading Teams</h2>
              <div className="flex flex-wrap justify-center gap-8 items-center opacity-60">
                <span className="text-white/80 text-xl font-semibold">Olympic Teams</span>
                <span className="text-white/80 text-xl font-semibold">NCAA Programs</span>
                <span className="text-white/80 text-xl font-semibold">Club Teams</span>
                <span className="text-white/80 text-xl font-semibold">National Teams</span>
              </div>
            </div>

            {/* CTA Section */}
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-12 text-center space-y-6 animate-fade-in" style={{ animationDelay: '600ms' }}>
              <h2 className="text-3xl sm:text-4xl font-bold text-white">Ready to Transform Your Strategy?</h2>
              <p className="text-xl text-white/60 max-w-2xl mx-auto">
                Join the elite teams using our platform to develop winning strategies.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
                <Link to="/signup">
                  <Button size="lg" className="bg-white text-slate-900 hover:bg-white/90 gap-2 px-8">
                    Start Free Trial
                  </Button>
                </Link>
                <Link to="/demo">
                  <Button variant="outline" size="lg" className="border-white/20 bg-white text-slate-900 hover:bg-white/10 hover:text-white gap-2">
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