import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Home, Cpu } from 'lucide-react';
import { useBlogStore } from '../store/useBlogStore';

export const Navbar: React.FC = () => {
  const { searchQuery, setSearchQuery } = useBlogStore();

  return (
    <nav className="sticky top-0 z-50 w-full glass-panel border-b-0 rounded-none border-x-0 border-t-0 shadow-lg shadow-primary/5">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="p-2 bg-surfaceHover rounded-lg border border-border group-hover:border-primary/50 transition-colors">
            <Cpu className="w-5 h-5 text-primary animate-pulse" />
          </div>
          <span className="font-bold text-xl tracking-wider neon-text hidden sm:block">
            CYBER_LOG
          </span>
        </Link>

        <div className="flex-1 max-w-md mx-4">
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-text-muted group-focus-within:text-primary transition-colors" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-border rounded-lg bg-surface/50 text-text-main placeholder-text-muted focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm transition-all"
              placeholder="搜索协议或关键字..."
            />
            <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary to-secondary opacity-0 group-focus-within:opacity-20 blur-sm -z-10 transition-opacity"></div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Link to="/" className="text-text-muted hover:text-primary transition-colors p-2 rounded-lg hover:bg-surfaceHover">
            <Home className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </nav>
  );
};
