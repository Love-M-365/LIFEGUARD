
import React from 'react';
import logo from '../assets/logo.png';
interface NavbarProps{
  onBookClick: () => void;
}
const Navbar: React.FC<NavbarProps> = ({onBookClick}) => {
  return (
    <nav className="bg-white/90 backdrop-blur-md border-b sticky top-0 z-[60]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex items-center gap-2 group cursor-pointer">
             <img 
                src={logo}   // change this path
                alt="Logo"
                className="w-14 h-14 object-contain"
              />
            
          </div>
          
          <div className="hidden lg:flex items-center space-x-10 text-sm font-bold text-gray-500">
            <a href="#home" className="hover:text-[#002147] transition-colors relative group">
              Home
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#D4AF37] group-hover:w-full transition-all"></span>
            </a>
            <a href="#policies" className="hover:text-[#002147] transition-colors relative group">
              Policies
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#D4AF37] group-hover:w-full transition-all"></span>
            </a>
            <a href="#team" className="hover:text-[#002147] transition-colors relative group">
              Our Team
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#D4AF37] group-hover:w-full transition-all"></span>
            </a>
            <a href="#gallery" className="hover:text-[#002147] transition-colors relative group">
              Gallery
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#D4AF37] group-hover:w-full transition-all"></span>
            </a>
            <a href="#calculator" className="hover:text-[#002147] transition-colors relative group">
              Calculator
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#D4AF37] group-hover:w-full transition-all"></span>
            </a>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden xl:flex items-center gap-3 text-right">
             
              <p className="text-[#002147] font-black text-sm">+91 95405 98999</p>
            </div>
            <button onClick={onBookClick} className="bg-[#002147] text-white px-7 py-3 rounded-full font-bold text-sm hover:bg-[#D4AF37] hover:text-[#002147] transition-all shadow-xl shadow-blue-900/20 active:scale-95">
              Consultation
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
