import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Terminal } from 'lucide-react';
import { useStore } from '../store';
import { motion } from 'framer-motion';

export const Layout = ({ children }: { children: ReactNode }) => {
  const { searchQuery, setSearchQuery } = useStore();
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Background ambient light */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyber-purple/20 blur-[120px] rounded-full mix-blend-screen" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-cyber-cyan/20 blur-[120px] rounded-full mix-blend-screen" />
      </div>

      <header className="sticky top-0 z-50 glass-panel border-b-cyber-cyan/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2 group">
            <Terminal className="w-6 h-6 text-cyber-cyan group-hover:animate-glitch" />
            <span className="font-mono text-xl font-bold text-white neon-text-cyan tracking-wider">
              CYBER_BLOG
            </span>
          </Link>

          {isHome && (
            <div className="flex-1 max-w-md mx-8">
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-cyber-cyan group-focus-within:text-white transition-colors" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-cyber-blue rounded-md leading-5 bg-cyber-dark/50 text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-cyber-cyan focus:border-cyber-cyan focus:shadow-neon-cyan transition-all duration-300 sm:text-sm font-mono"
                  placeholder="> Search data streams..."
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 w-1.5 h-4 bg-cyber-cyan animate-pulse-slow" />
              </div>
            </div>
          )}
          
          <nav className="flex items-center space-x-4">
            <Link 
              to="/" 
              className="text-gray-300 hover:text-cyber-cyan font-mono text-sm transition-colors relative group"
            >
              /home
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyber-cyan transition-all group-hover:w-full" />
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1 relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {children}
        </motion.div>
      </main>

      <footer className="border-t border-white/10 glass-panel mt-auto relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center text-xs font-mono text-gray-500">
          <p>© {new Date().getFullYear()} CYBER_BLOG. All systems nominal.</p>
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-cyber-cyan animate-pulse" />
            <span>SYSTEM_ONLINE</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
