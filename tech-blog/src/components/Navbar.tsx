import { Link } from 'react-router-dom';
import { Cpu } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-[#00ffcc]/20 shadow-[0_0_15px_rgba(0,255,204,0.1)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2 group">
            <Cpu className="h-8 w-8 text-[#00ffcc] group-hover:animate-pulse" />
            <span className="font-bold text-xl tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-[#00ffcc] to-[#aa3bff]">
              CYBER_BLOG
            </span>
          </Link>
          <div className="flex space-x-6">
            <Link to="/" className="text-gray-300 hover:text-[#00ffcc] transition-colors duration-300 font-medium tracking-wide">
              首页 (HOME)
            </Link>
            <a href="#" className="text-gray-300 hover:text-[#00ffcc] transition-colors duration-300 font-medium tracking-wide">
              归档 (ARCHIVE)
            </a>
            <a href="#" className="text-gray-300 hover:text-[#00ffcc] transition-colors duration-300 font-medium tracking-wide">
              关于 (ABOUT)
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
