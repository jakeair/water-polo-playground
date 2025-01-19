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
    <nav className="flex items-center gap-2 sm:gap-6">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link 
              to="/" 
              className={`flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full ${
                isActive('/') 
                  ? 'bg-blue-50 text-blue-700 font-medium backdrop-blur-md' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50 backdrop-blur-sm'
              } border border-gray-200 transition-all`}
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
                  ? 'bg-blue-50 text-blue-700 font-medium backdrop-blur-md' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50 backdrop-blur-sm'
              } border border-gray-200 transition-all`}
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
                  ? 'bg-blue-50 text-blue-700 font-medium backdrop-blur-md' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50 backdrop-blur-sm'
              } border border-gray-200 transition-all`}
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