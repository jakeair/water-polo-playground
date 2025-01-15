import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Gamepad2, Info } from 'lucide-react';

const Navigation = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 right-0 p-4 z-50 flex gap-6">
      <Link 
        to="/" 
        className={`flex items-center gap-2 px-4 py-2 rounded-full ${
          isActive('/') 
            ? 'bg-white/20 text-white' 
            : 'bg-white/10 hover:bg-white/15 text-white/80 hover:text-white'
        } backdrop-blur-md border border-white/20 transition-all`}
      >
        <Home className="h-5 w-5" />
        <span className="hidden sm:inline">Home</span>
      </Link>
      <Link 
        to="/plays" 
        className={`flex items-center gap-2 px-4 py-2 rounded-full ${
          isActive('/plays') 
            ? 'bg-white/20 text-white' 
            : 'bg-white/10 hover:bg-white/15 text-white/80 hover:text-white'
        } backdrop-blur-md border border-white/20 transition-all`}
      >
        <Gamepad2 className="h-5 w-5" />
        <span className="hidden sm:inline">Playground</span>
      </Link>
      <Link 
        to="/about" 
        className={`flex items-center gap-2 px-4 py-2 rounded-full ${
          isActive('/about') 
            ? 'bg-white/20 text-white' 
            : 'bg-white/10 hover:bg-white/15 text-white/80 hover:text-white'
        } backdrop-blur-md border border-white/20 transition-all`}
      >
        <Info className="h-5 w-5" />
        <span className="hidden sm:inline">About</span>
      </Link>
    </nav>
  );
};

export default Navigation;