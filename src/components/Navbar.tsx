import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Menu, X } from 'lucide-react';
import { Button } from './Button';

interface NavbarProps {
  onSearch?: (query: string) => void;
}

export function Navbar({ onSearch }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchQuery);
    } else {
      navigate(`/?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-md border-b border-primary/30 shadow-[0_4px_30px_rgba(0,240,255,0.1)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="text-2xl font-mono font-bold text-white tracking-widest group">
              <span className="text-primary group-hover:animate-pulse">&lt;</span>
              Cyber
              <span className="text-primary group-hover:animate-pulse">&gt;</span>
              Blog
            </Link>
          </div>

          {/* Desktop Search & Nav */}
          <div className="hidden md:flex flex-1 items-center justify-end space-x-8">
            <form onSubmit={handleSearch} className="relative w-64 group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400 group-focus-within:text-primary transition-colors" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-1.5 border border-gray-700 rounded-none bg-background text-gray-300 placeholder-gray-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary focus:shadow-neon-primary transition-all font-mono"
                placeholder="搜索文章..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>
            
            <div className="flex space-x-4">
              <Link to="/" className="text-gray-300 hover:text-primary transition-colors font-mono uppercase tracking-wider text-sm">
                Home
              </Link>
              <a href="https://github.com" target="_blank" rel="noreferrer" className="text-gray-300 hover:text-primary transition-colors font-mono uppercase tracking-wider text-sm">
                About
              </a>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-300 hover:text-primary focus:outline-none"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-surface border-b border-primary/30">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <form onSubmit={handleSearch} className="relative w-full mb-4">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-700 bg-background text-gray-300 placeholder-gray-500 focus:outline-none focus:border-primary font-mono"
                placeholder="搜索文章..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>
            <Link to="/" className="block px-3 py-2 text-base font-mono uppercase text-gray-300 hover:text-primary hover:bg-gray-800">
              Home
            </Link>
            <a href="https://github.com" target="_blank" rel="noreferrer" className="block px-3 py-2 text-base font-mono uppercase text-gray-300 hover:text-primary hover:bg-gray-800">
              About
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
