import React from "react";

const Footer = () => {
  return (
    <footer className="bg-cyan-950 text-center py-3 text-sm text-cyan-400 border-t border-cyan-700">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-2">
        <div>© {new Date().getFullYear()} Cyber Game by Hossam 🔐</div>
        <div className="flex items-center gap-3">
          <a href="#" className="text-cyan-300 hover:underline">Privacy</a>
          <span className="hidden md:inline">•</span>
          <a href="#" className="text-cyan-300 hover:underline">Terms</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
