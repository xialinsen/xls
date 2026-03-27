import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Terminal } from 'lucide-react';
import { useBlogStore } from '../store';

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
    <nav className="sticky top-0 z-50 glass-panel border-b border-white/10 px-6 py-4">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <Terminal className="w-8 h-8 text-primary group-hover:text-secondary transition-colors" />
          <span className="text-xl font-display font-bold neon-text tracking-wider">
            TECH_BLOG
          </span>
        </Link>

        <div className="relative w-full max-w-md hidden md:block">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-text-muted" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-white/10 rounded-lg leading-5 bg-surface/50 text-text-main placeholder-text-muted focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm transition-all glow-hover"
            placeholder="搜索文章..."
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
      </div>
    </nav>
  );
};
