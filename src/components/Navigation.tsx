import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Layout, Info, Notebook, Clock } from 'lucide-react';
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
    <div className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-sm border-b border-gray-200 z-50">
      <nav className="flex items-center h-16 px-4 max-w-[1800px] mx-auto">
        <div className="flex items-center gap-1 sm:gap-2 ml-auto">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link 
                  to="/" 
                  className={`flex items-center gap-1 px-2 sm:px-3 py-1.5 rounded-full transition-all ${
                    isActive('/') 
                      ? 'bg-blue-600 text-white shadow-md' 
                      : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                  }`}
                >
                  <Home className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span className="hidden sm:inline text-sm font-medium">Home</span>
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
                  className={`flex items-center gap-1 px-2 sm:px-3 py-1.5 rounded-full transition-all ${
                    isActive('/plays') 
                      ? 'bg-blue-600 text-white shadow-md' 
                      : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                  }`}
                >
                  <Layout className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span className="hidden sm:inline text-sm font-medium">Whiteboard</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>Open Whiteboard</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <div 
                  className="flex items-center gap-1 px-2 sm:px-3 py-1.5 rounded-full transition-all text-gray-500 cursor-not-allowed"
                >
                  <Notebook className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span className="hidden sm:inline text-sm font-medium">Playbook</span>
                  <Clock className="h-3 w-3 sm:h-4 sm:w-4 ml-1" />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Coming soon ;)</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Link 
                  to="/about" 
                  className={`flex items-center gap-1 px-2 sm:px-3 py-1.5 rounded-full transition-all ${
                    isActive('/about') 
                      ? 'bg-blue-600 text-white shadow-md' 
                      : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                  }`}
                >
                  <Info className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span className="hidden sm:inline text-sm font-medium">About</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>About Us</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </nav>
    </div>
  );
};

export default Navigation;