import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Hexagon } from 'lucide-react';
import { useStore } from '../store/useStore';

export const Navbar: React.FC = () => {
  const { searchQuery, setSearchQuery } = useStore();
  const navigate = useNavigate();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    if (window.location.pathname !== '/') {
      navigate('/');
    }
  };

  return (
    <nav className="sticky top-0 z-50 glass-panel border-b border-white/10 shadow-lg">
      <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2 group">
          <Hexagon className="w-8 h-8 text-neon-blue group-hover:text-neon-purple transition-colors duration-300" />
          <span className="text-xl font-bold font-mono tracking-wider neon-text-blue">
            NEXUS_BLOG
          </span>
        </Link>

        <div className="relative w-full md:w-96 group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400 group-focus-within:text-neon-blue transition-colors" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-white/10 rounded-md leading-5 bg-dark-800/50 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-neon-blue focus:border-neon-blue focus:shadow-neon-blue transition-all duration-300 sm:text-sm"
            placeholder="搜索关键字..."
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>

        <div className="flex items-center gap-6">
          <Link to="/" className="text-sm font-medium text-gray-300 hover:text-neon-blue transition-colors">
            主页
          </Link>
          <a href="#" className="text-sm font-medium text-gray-300 hover:text-neon-purple transition-colors">
            归档
          </a>
          <a href="#" className="text-sm font-medium text-gray-300 hover:text-neon-green transition-colors">
            关于
          </a>
        </div>
      </div>
    </nav>
  );
};
