import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Layout, Info } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const Navigation = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 right-0 p-3 sm:p-4 z-50 flex items-center gap-2 sm:gap-6">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link 
              to="/" 
              className={`flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full ${
                isActive('/') 
                  ? 'bg-white/20 text-white font-medium backdrop-blur-md' 
                  : 'text-white/70 hover:text-white hover:bg-white/10 backdrop-blur-sm'
              } border border-white/10 transition-all`}
            >
              <Home className="h-4 w-4 sm:h-5 sm:w-5" />
              <span className="hidden sm:inline">Home</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent>
            <p>Go to Home</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Link 
              to="/plays" 
              className={`flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full ${
                isActive('/plays') 
                  ? 'bg-white/20 text-white font-medium backdrop-blur-md' 
                  : 'text-white/70 hover:text-white hover:bg-white/10 backdrop-blur-sm'
              } border border-white/10 transition-all`}
            >
              <Layout className="h-4 w-4 sm:h-5 sm:w-5" />
              <span className="hidden sm:inline">Whiteboard</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent>
            <p>Open Whiteboard</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Link 
              to="/about" 
              className={`flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full ${
                isActive('/about') 
                  ? 'bg-white/20 text-white font-medium backdrop-blur-md' 
                  : 'text-white/70 hover:text-white hover:bg-white/10 backdrop-blur-sm'
              } border border-white/10 transition-all`}
            >
              <Info className="h-4 w-4 sm:h-5 sm:w-5" />
              <span className="hidden sm:inline">About</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent>
            <p>About Us</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </nav>
  );
};

export default Navigation;