import { Link, useLocation } from 'react-router-dom';
import { Search, Terminal } from 'lucide-react';
import { useBlogStore } from '../store/useBlogStore';

export default function Navbar() {
  const { searchQuery, setSearchQuery } = useBlogStore();
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <nav className="sticky top-0 z-50 glass-panel border-b-0 border-slate-700 shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 group">
            <Terminal className="text-[#00F0FF] group-hover:animate-pulse" size={28} />
            <span className="font-bold text-xl tracking-wider neon-text text-[#F8FAFC]">
              CYBER<span className="text-[#00F0FF]">_BLOG</span>
            </span>
          </Link>

          <div className="flex items-center gap-6">
            {isHome && (
              <div className="relative hidden sm:block">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-slate-400" />
                </div>
                <input
                  type="text"
                  className="block w-64 pl-10 pr-3 py-2 border border-slate-700 rounded-md leading-5 bg-slate-900/50 text-slate-300 placeholder-slate-500 focus:outline-none focus:border-[#00F0FF] focus:ring-1 focus:ring-[#00F0FF] transition-colors duration-300 sm:text-sm"
                  placeholder="搜索文章指令..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            )}
            
            <div className="flex space-x-4">
              <Link to="/" className="text-slate-300 hover:text-[#00F0FF] transition-colors px-3 py-2 rounded-md text-sm font-medium">
                [ 首页 ]
              </Link>
              <a href="#" className="text-slate-300 hover:text-[#8A2BE2] transition-colors px-3 py-2 rounded-md text-sm font-medium">
                [ 关于 ]
              </a>
            </div>
          </div>
        </div>
        {/* Mobile search bar */}
        {isHome && (
          <div className="sm:hidden pb-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-slate-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-slate-700 rounded-md leading-5 bg-slate-900/50 text-slate-300 placeholder-slate-500 focus:outline-none focus:border-[#00F0FF] focus:ring-1 focus:ring-[#00F0FF] transition-colors duration-300 sm:text-sm"
                placeholder="搜索文章指令..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        )}
      </div>
      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[#00F0FF]/50 to-transparent"></div>
    </nav>
  );
}
