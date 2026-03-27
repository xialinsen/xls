import { Link, useLocation } from 'react-router-dom';
import { Terminal, Search } from 'lucide-react';
import { useState } from 'react';

export default function Navbar({ onSearch }: { onSearch?: (query: string) => void }) {
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const isHome = location.pathname === '/';

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchQuery);
    }
  };

  return (
    <nav className="sticky top-0 z-50 glass-panel border-b border-glass-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2 group">
            <Terminal className="w-8 h-8 text-cyan group-hover:text-purple transition-colors duration-300" />
            <span className="font-mono text-xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyan to-purple">
              NEXUS_BLOG
            </span>
          </Link>

          {isHome && (
            <div className="flex-1 max-w-md ml-8 hidden sm:block">
              <form onSubmit={handleSearch} className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-gray-400 group-focus-within:text-cyan transition-colors" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 border border-glass-border rounded-none bg-dark/50 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-cyan focus:border-cyan sm:text-sm transition-all duration-300 font-mono"
                  placeholder="SEARCH_QUERY..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none opacity-0 group-focus-within:opacity-100 transition-opacity">
                  <span className="animate-pulse w-2 h-4 bg-cyan block"></span>
                </div>
              </form>
            </div>
          )}

          <div className="flex items-center space-x-4">
            <Link to="/" className="text-sm font-mono text-gray-300 hover:text-cyan hover:neon-text transition-all">
              [HOME]
            </Link>
            <a href="#" className="text-sm font-mono text-gray-300 hover:text-purple hover:drop-shadow-[0_0_8px_rgba(138,43,226,0.8)] transition-all">
              [ABOUT]
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
