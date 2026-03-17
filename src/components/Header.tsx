import React from 'react';
import { ShoppingCart, User, Search, Menu, LogIn } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-xl border-b border-primary-50">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-12">
          <Link to="/" className="text-2xl font-black text-primary-950 tracking-tighter flex items-center gap-2">
            <span className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center text-white text-lg italic">M</span>
            MILK<span className="text-primary-500 font-medium">SHOP</span>
          </Link>
          <nav className="hidden lg:flex items-center gap-8">
            <Link to="/" className="text-primary-900/70 hover:text-primary-600 font-bold text-sm uppercase tracking-widest transition-colors">Home</Link>
            <Link to="#" className="text-primary-900/70 hover:text-primary-600 font-bold text-sm uppercase tracking-widest transition-colors">Products</Link>
            <Link to="#" className="text-primary-900/70 hover:text-primary-600 font-bold text-sm uppercase tracking-widest transition-colors">Farm Story</Link>
          </nav>
        </div>

        <div className="flex items-center gap-6">
          <div className="relative hidden xl:block">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-primary-400" />
            <input 
              type="text" 
              placeholder="Search freshest milk..." 
              className="pl-11 pr-6 py-2.5 bg-primary-50/50 border border-primary-100 rounded-2xl text-sm focus:outline-none focus:ring-4 focus:ring-primary-500/10 w-72 transition-all placeholder:text-primary-300"
            />
          </div>
          
          <div className="flex items-center gap-2 border-l border-primary-100 pl-6">
            <Link to="/login" className="hidden sm:flex items-center gap-2 px-4 py-2 text-sm font-bold text-primary-900 hover:text-primary-600 transition-colors">
              <LogIn className="w-4 h-4" />
              Login
            </Link>
            <Link to="/register" className="hidden sm:block px-6 py-2 bg-primary-950 text-white text-sm font-bold rounded-xl hover:bg-primary-800 transition-all shadow-lg shadow-primary-900/20">
              Sign Up
            </Link>
          </div>

          <button className="p-3 text-primary-950 hover:bg-primary-50 rounded-2xl transition-all relative">
            <ShoppingCart className="w-5 h-5" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-primary-500 rounded-full ring-4 ring-white"></span>
          </button>
          <button className="lg:hidden p-2 text-primary-950">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
