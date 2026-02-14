import { Code2, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full h-16 border-b border-white/5 bg-black/20 backdrop-blur-md z-50 flex items-center justify-between px-6 lg:px-12">
      {/* Logo */}
      <Link to="/" className="flex items-center gap-3 group">
        <div className="p-2 bg-indigo-500/10 rounded-lg group-hover:bg-indigo-500/20 transition-colors">
          <Code2 className="text-indigo-400 w-6 h-6" />
        </div>
        <span className="text-xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
          CodeVault
        </span>
      </Link>
      
      {/* Security Status */}
      <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20">
        <ShieldCheck className="w-3 h-3 text-green-400" />
        <span className="text-xs font-medium text-green-400">AES-256 Encrypted</span>
      </div>
    </nav>
  );
};

export default Navbar;