import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { ArticleDetail } from './pages/ArticleDetail';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-dark-900 text-gray-200 selection:bg-neon-blue selection:text-dark-900">
        <Navbar />
        <main className="pb-20">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/article/:id" element={<ArticleDetail />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
