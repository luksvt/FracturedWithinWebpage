import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';

import Logo from "@/assets/pocketLogo_white-on-black.png";

const Navigation = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/shows', label: 'Shows' },
    { path: '/merch', label: 'Merch' },
  ];

  return (
    <nav className="bg-black text-white sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center h-16">
          {/* Logo on the left */}
          <Link to="/" className="flex items-center">
            <img 
              src={Logo}
              alt="FracturedWithin logo" 
              className="h-8"
            />
          </Link>
          {/* Centered navigation links */}
          <div className="flex-1 flex justify-center">
            <div className="flex space-x-1">
              {navItems.map(({ path, label }) => (
                <Button
                  key={path}
                  asChild
                  variant="ghost"
                  className={`text-white hover:text-white ${location.pathname === path ? "underline decoration-white decoration-2" : ""}`}
                >
                  <Link to={path}>
                    {label}
                  </Link>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;