import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Search, Hexagon } from "lucide-react";

const Navbar = () => {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== "/") {
      setKeyword("");
    }
  }, [location.pathname]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/?search=${encodeURIComponent(keyword.trim())}`);
    } else {
      navigate("/");
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-panel border-b-0 border-b-neon-blue/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2 group">
            <Hexagon className="h-8 w-8 text-neon-blue group-hover:text-neon-purple transition-colors duration-300" />
            <span className="font-display font-bold text-xl tracking-wider text-glow group-hover:text-neon-blue transition-colors">
              CYBER<span className="text-neon-purple">LOG</span>
            </span>
          </Link>

          <div className="flex-1 max-w-md ml-8">
            <form onSubmit={handleSearch} className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-text-muted group-focus-within:text-neon-blue transition-colors" />
              </div>
              <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-surfaceBorder rounded-md leading-5 bg-surface/50 text-text-primary placeholder-text-muted focus:outline-none focus:ring-1 focus:ring-neon-blue focus:border-neon-blue focus:bg-surface transition-all duration-300 sm:text-sm"
                placeholder="搜索文章..."
              />
              <div className="absolute inset-0 rounded-md pointer-events-none shadow-[0_0_0_0_rgba(0,240,255,0)] group-focus-within:shadow-neon-blue transition-shadow duration-300" />
            </form>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
