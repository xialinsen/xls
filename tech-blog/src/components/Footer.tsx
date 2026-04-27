export default function Footer() {
  return (
    <footer className="border-t border-[#00ffcc]/20 bg-[#0a0a0a] mt-12 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-500">
        <p className="font-mono text-sm tracking-widest">
          &copy; {new Date().getFullYear()} CYBER_BLOG. SYS.ALL_RIGHTS_RESERVED.
        </p>
      </div>
    </footer>
  );
}
