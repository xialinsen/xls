import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Hexagon } from 'lucide-react';
import { useBlogStore } from '../store/useBlogStore';

export const Navbar: React.FC = () => {
  const { searchQuery, setSearchQuery } = useBlogStore();
  const navigate = useNavigate();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    if (window.location.pathname !== '/') {
      navigate('/');
    }
  };

  return (
    <nav className="sticky top-0 z-50 glass-panel border-b border-muted/50 py-4 px-6 mb-8">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <Link 
          to="/" 
          className="flex items-center gap-2 text-2xl font-bold text-primary hover:text-glow transition-all"
        >
          <Hexagon className="w-8 h-8 text-accent" />
          <span>CYBER_BLOG</span>
        </Link>

        <div className="relative w-full sm:w-96">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-500" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-muted bg-surface/50 rounded-md leading-5 text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary focus:shadow-neon-primary transition-all sm:text-sm"
            placeholder="搜索文章关键字..."
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
      </div>
    </nav>
  );
};
