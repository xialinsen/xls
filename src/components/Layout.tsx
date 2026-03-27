import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';

export const Layout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Background decorations */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/10 rounded-full blur-[120px]" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+CjxyZWN0IHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgZmlsbD0ibm9uZSI+PC9yZWN0Pgo8Y2lyY2xlIGN4PSIxIiBjeT0iMSIgcj0iMSIgZmlsbD0icmdiYSgyNTUsIDI1NSwgMjU1LCAwLjA1KSI+PC9jaXJjbGU+Cjwvc3ZnPg==')] opacity-50"></div>
      </div>

      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-8 relative z-10">
        <Outlet />
      </main>

      <footer className="border-t border-white/10 mt-auto py-6 relative z-10 glass-panel">
        <div className="container mx-auto px-4 text-center text-text-muted text-sm font-mono">
          <p>© {new Date().getFullYear()} TECH_BLOG. All systems operational.</p>
        </div>
      </footer>
    </div>
  );
};
