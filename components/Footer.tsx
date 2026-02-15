
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#001a33] text-white py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-12 border-b border-white/10 pb-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-[#003366] font-bold text-xl">L</div>
              <span className="font-display font-bold text-2xl">LifeGuard Advisor -LIC</span>
            </div>
            <p className="text-blue-200 mb-8 max-w-sm">
              Providing expert financial guidance and securing families across India for over a decade. Authorized LIC Agency with a focus on trust, transparency, and top-tier service.
            </p>
            <div className="flex gap-4">
              
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-green-500 transition-colors">
                <i className="fa-brands fa-whatsapp"></i>
              </a>
             
            </div>
          </div>
          
          <div>
            <h4 className="font-bold text-lg mb-6">Quick Links</h4>
            <ul className="space-y-4 text-blue-200 text-sm">
              <li><a href="#home" className="hover:text-white transition-colors">Home</a></li>
              <li><a href="#policies" className="hover:text-white transition-colors">All Policies</a></li>
              <li><a href="#calculator" className="hover:text-white transition-colors">Maturity Calculator</a></li>
              
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-lg mb-6">Contact Us</h4>
            <div className="space-y-4 text-blue-200 text-sm">
              <div className="flex gap-3">
                <i className="fa-solid fa-location-dot mt-1 text-yellow-500"></i>
                <p>11D Branch ,Jeevan Pragati Building, Laxmi Nagar ,Delhi-110092</p>
              </div>
              <div className="flex gap-3">
                <i className="fa-solid fa-phone text-yellow-500"></i>
                <p>+91 9540598999</p>
                <p>+91 8595633810</p>
              </div>
              <div className="flex gap-3">
                <i className="fa-solid fa-envelope text-yellow-500"></i>
                <p>sanjeevca121@gmail.com</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-blue-300/60">
          <p>© 2026 LifeGuard Advisor. All Rights Reserved. Insurance is a subject matter of solicitation.</p>
          <div className="flex gap-6">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Disclaimers</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
