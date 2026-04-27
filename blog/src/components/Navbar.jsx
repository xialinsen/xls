import React from 'react';
import { Link } from 'react-router-dom';
import { Terminal, Cpu } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 bg-[#050505]/80 backdrop-blur-md border-b border-[#0ff]/30 shadow-[0_0_15px_rgba(0,255,255,0.1)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 group">
            <Cpu className="w-8 h-8 text-[#0ff] group-hover:shadow-[0_0_10px_#0ff] transition-shadow duration-300 rounded-full" />
            <span className="text-xl font-bold tracking-wider text-white cyber-glow group-hover:text-[#0ff] transition-colors duration-300">
              SYS.BLOG
            </span>
          </Link>
          <div className="flex space-x-4">
            <Link to="/" className="text-gray-300 hover:text-[#0ff] transition-colors duration-200 px-3 py-2 rounded-md text-sm font-medium flex items-center gap-1">
              <Terminal className="w-4 h-4" />
              主控制台
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
