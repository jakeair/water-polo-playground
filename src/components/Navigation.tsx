import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { cn } from '@/lib/utils';
import { Notebook } from 'lucide-react';

const Navigation = () => {
  const { user, signOut } = useAuth();

  return (
    <nav className="w-full max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
      <div className="flex items-center gap-8">
        <Link to="/" className="flex items-center gap-2 text-blue-600 font-semibold">
          <Notebook className="w-6 h-6" />
          <span className="text-lg">WaterPolo Plays</span>
        </Link>
        
        <div className="hidden md:flex items-center gap-6">
          <Link 
            to="/about"
            className="text-gray-600 hover:text-gray-900 transition-colors"
          >
            About
          </Link>
          <Link 
            to="/pricing"
            className="text-gray-600 hover:text-gray-900 transition-colors"
          >
            Pricing
          </Link>
          {user && (
            <Link 
              to="/playbook"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Playbook
            </Link>
          )}
        </div>
      </div>

      <div className="flex items-center gap-4">
        {user ? (
          <>
            <Button
              variant="ghost"
              onClick={() => signOut()}
              className="text-gray-600 hover:text-gray-900"
            >
              Sign Out
            </Button>
          </>
        ) : (
          <Link to="/auth">
            <Button variant="default">Sign In</Button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navigation;