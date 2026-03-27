import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

const Layout: React.FC = () => {
  return (
    <div className="min-h-screen pt-20 pb-12 relative overflow-hidden">
      <Navbar />
      <main className="container mx-auto px-4 relative z-10">
        <Outlet />
      </main>
      
      {/* Background ambient effects */}
      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-neon-blue/10 blur-[120px] pointer-events-none z-0 mix-blend-screen" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-neon-purple/10 blur-[120px] pointer-events-none z-0 mix-blend-screen" />
    </div>
  );
};

export default Layout;
