import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Search, Terminal } from 'lucide-react';
import { useStore } from '../store';

const Navbar: React.FC = () => {
  const { searchQuery, setSearchQuery } = useStore();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    if (location.pathname !== '/') {
      navigate('/');
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-panel border-b border-white/10">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link 
          to="/" 
          className="flex items-center gap-2 text-xl font-bold neon-text hover:opacity-80 transition-opacity"
        >
          <Terminal className="w-6 h-6 text-neon-blue" />
          <span>Dev.Nexus</span>
        </Link>

        <div className="relative w-full max-w-md hidden md:block">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-slate-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-white/10 rounded-full leading-5 bg-dark-900/50 text-slate-300 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-neon-blue focus:border-neon-blue sm:text-sm transition-all duration-300 shadow-inner"
            placeholder="搜索文章..."
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>

        <div className="flex items-center gap-4">
          <Link to="/" className="text-slate-300 hover:text-neon-blue transition-colors text-sm font-medium">
            首页
          </Link>
          <a href="#" className="text-slate-300 hover:text-neon-purple transition-colors text-sm font-medium">
            关于
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
