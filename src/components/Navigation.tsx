import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Layout, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip } from '@/components/ui/tooltip';

const Navigation = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 right-0 p-4 z-50 flex gap-4">
      <Tooltip content="Home">
        <Link to="/">
          <Button
            variant={isActive('/') ? 'default' : 'secondary'}
            size="lg"
            className={`relative flex items-center gap-2 ${
              isActive('/') 
                ? 'bg-white text-slate-900 hover:bg-white/90' 
                : 'bg-white/10 hover:bg-white/20 text-white'
            } backdrop-blur-md transition-all duration-200`}
          >
            <Home className="h-5 w-5" />
            <span className="hidden sm:inline">Home</span>
            <span className="absolute -top-1 -right-1 text-[10px] bg-white/20 px-1.5 py-0.5 rounded-full">
              Main
            </span>
          </Button>
        </Link>
      </Tooltip>

      <Tooltip content="Interactive Whiteboard">
        <Link to="/plays">
          <Button
            variant={isActive('/plays') ? 'default' : 'secondary'}
            size="lg"
            className={`relative flex items-center gap-2 ${
              isActive('/plays') 
                ? 'bg-white text-slate-900 hover:bg-white/90' 
                : 'bg-white/10 hover:bg-white/20 text-white'
            } backdrop-blur-md transition-all duration-200`}
          >
            <Layout className="h-5 w-5" />
            <span className="hidden sm:inline">Whiteboard</span>
            <span className="absolute -top-1 -right-1 text-[10px] bg-white/20 px-1.5 py-0.5 rounded-full">
              Tool
            </span>
          </Button>
        </Link>
      </Tooltip>

      <Tooltip content="About Us">
        <Link to="/about">
          <Button
            variant={isActive('/about') ? 'default' : 'secondary'}
            size="lg"
            className={`relative flex items-center gap-2 ${
              isActive('/about') 
                ? 'bg-white text-slate-900 hover:bg-white/90' 
                : 'bg-white/10 hover:bg-white/20 text-white'
            } backdrop-blur-md transition-all duration-200`}
          >
            <Info className="h-5 w-5" />
            <span className="hidden sm:inline">About</span>
            <span className="absolute -top-1 -right-1 text-[10px] bg-white/20 px-1.5 py-0.5 rounded-full">
              Info
            </span>
          </Button>
        </Link>
      </Tooltip>
    </nav>
  );
};

export default Navigation;