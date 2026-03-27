import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { ArticlePage } from './pages/ArticlePage';

function App() {
  return (
    <Router>
      <div className="min-h-screen selection:bg-primary selection:text-black">
        {/* Global ambient glow effect */}
        <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden">
          <div className="absolute top-[20%] left-[10%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-[20%] right-[10%] w-[400px] h-[400px] bg-secondary/5 rounded-full blur-[100px]"></div>
        </div>
        
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/article/:id" element={<ArticlePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
