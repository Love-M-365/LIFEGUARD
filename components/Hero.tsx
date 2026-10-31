
import React from 'react';
import home from '../assets/home.jpeg';
import papa from '../assets/papa.jpeg';
interface HeroProps {
  onBookClick: () => void;
  onFreePlanClick: () => void;
}

const Hero: React.FC<HeroProps> = ({ onBookClick, onFreePlanClick }) => {
  return (
    <section id="home" className="relative bg-[#002147] min-h-[90vh] flex items-center pt-24 pb-32 overflow-hidden">
      {/* Premium Background Elements */}
      <div className="absolute top-0 right-0 w-[50%] h-full bg-[#001a38] skew-x-[-15deg] translate-x-32 hidden lg:block"></div>
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-blue-500 rounded-full opacity-10 blur-[120px]"></div>
      <div className="absolute top-0 right-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="text-white animate-fade-up">
            <div className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-md border border-white/10 rounded-full px-5 py-2 mb-8 animate-fade-in">
              <span className="flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-[#D4AF37] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#D4AF37]"></span>
              </span>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#D4AF37]">Official LIC Gold Partner</span>
            </div>
            
            <h1 className="text-5xl lg:text-8xl font-display font-bold mb-8 leading-[1.1]">
              Secure the <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-[#D4AF37]">Unwritten</span> <br />
              Future.
            </h1>
            
            <p className="text-lg text-blue-100/70 mb-10 max-w-xl leading-relaxed">
              We don't just sell insurance policies; we build fortresses around your family's dreams. Experience the pinnacle of financial security with India's most trusted advisor.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={onFreePlanClick}
                className="btn-shine animate-glow-ring inline-flex items-center justify-center gap-3 bg-gradient-to-r from-[#FFD56B] to-[#D4AF37] text-[#2a1200] px-8 py-4 rounded-full font-black text-base hover:scale-105 active:scale-95 transition-transform"
              >
                <i className="fa-solid fa-gift animate-wiggle"></i>
                Get FREE Insurance Plan
              </button>
              <button
                onClick={onBookClick}
                className="inline-flex items-center justify-center gap-3 border border-white/25 bg-white/5 backdrop-blur px-8 py-4 rounded-full font-bold text-base hover:bg-white hover:text-[#002147] transition-all"
              >
                <i className="fa-brands fa-whatsapp"></i>
                Book Consultation
              </button>
            </div>
            <p className="mt-4 text-sm text-[#FFD56B]/90 font-semibold">
              🪔 Diwali offer: gifts worth up to ₹5,000 for new policy holders*
            </p>

            <div className="mt-16 flex flex-wrap items-center gap-10 opacity-60 grayscale hover:grayscale-0 transition-all">
              <div className="flex items-center gap-2">
                <i className="fa-solid fa-award text-3xl text-[#D4AF37]"></i>
                <div className="text-[10px] font-bold uppercase tracking-widest">MDRT USA <br/> Certified</div>
              </div>
              <div className="flex items-center gap-2">
                <i className="fa-solid fa-crown text-3xl text-[#D4AF37]"></i>
                <div className="text-[10px] font-bold uppercase tracking-widest">Chairman's <br/> Club Member</div>
              </div>
              <div className="flex items-center gap-2">
                <i className="fa-solid fa-building-columns text-3xl text-[#D4AF37]"></i>
                <div className="text-[10px] font-bold uppercase tracking-widest">Authorized <br/> by LIC India</div>
              </div>
            </div>
          </div>
          
          <div className="relative animate-fade-up [animation-delay:200ms]">
            <div className="absolute -inset-4 bg-[#D4AF37] rounded-[40px] rotate-3 blur-2xl opacity-10"></div>
            <div className="relative z-10 rounded-[32px] overflow-hidden border-8 border-white/10 shadow-2xl">
              <img 
                src={home}
                alt="Professional Advisor" 
                className="w-full h-full object-cover aspect-[4/5] scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#002147] via-transparent to-transparent opacity-60"></div>
              
              <div className="absolute bottom-8 left-8 right-8 bg-white/10 backdrop-blur-2xl p-6 rounded-2xl border border-white/20">
                <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full border-2 border-[#D4AF37] p-0.5">
                        <img src={papa} className="w-full h-full rounded-full object-cover" />
                    </div>
                    <div>
                        <p className="text-white font-bold text-lg leading-tight">Sanjeev Kumar</p>
                        <p className="text-[#D4AF37] text-xs font-bold tracking-widest uppercase">Lead Insurance Advisor</p>
                    </div>
                    <div className="ml-auto">
                        <i className="fa-solid fa-quote-right text-3xl text-white/20"></i>
                    </div>
                </div>
              </div>
            </div>
            
            {/* Diwali Floater */}
            <button onClick={onFreePlanClick} className="absolute -bottom-8 -right-4 sm:-right-8 z-20 bg-gradient-to-br from-[#c2410c] to-[#7a1f00] text-white p-5 rounded-2xl shadow-2xl animate-float text-left hover:scale-105 transition-transform">
              <div className="flex items-center gap-3">
                <span className="text-3xl">🪔</span>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-[#FFD56B]">Diwali Gifts</p>
                  <p className="text-xl font-black leading-tight">Worth ₹5,000</p>
                </div>
              </div>
            </button>

            {/* Stats Floater */}
            <div className="absolute -top-10 -left-10 bg-white p-6 rounded-2xl shadow-2xl hidden xl:block animate-bounce-slow">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-[#002147]">
                  <i className="fa-solid fa-heart-pulse text-2xl"></i>
                </div>
                <div>
                  <p className="text-2xl font-black text-[#002147]">100%</p>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Peace of Mind</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
