
import React, { useState, useEffect } from 'react';
import { Analytics } from '@vercel/analytics/react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import PolicyCard from './components/PolicyCard';
import Calculator from './components/Calculator';
import PolicyAdvisor from './components/PolicyAdvisor';
import TeamSection from './components/TeamSection';
import GallerySection from './components/GallerySection';
import VideoSection from './components/VideoSection';
import Footer from './components/Footer';
import PolicyModal from './components/PolicyModal';
import BookingModal from './components/BookingModal';
import { POLICIES } from './constants';
import { Policy } from './types';

const App: React.FC = () => {
  const [selectedPolicy, setSelectedPolicy] = useState<Policy | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  // Prevent scrolling when modals are open
  useEffect(() => {
    if (selectedPolicy || isBookingOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [selectedPolicy, isBookingOpen]);

  const openBooking = () => setIsBookingOpen(true);

  return (
    <div className="min-h-screen selection:bg-[#D4AF37] selection:text-[#002147]">
      <Navbar onBookClick={openBooking} />
      
      <main>
        <Hero onBookClick={openBooking} />

        {/* Feature Highlights */}
        <section className="py-24 bg-white relative">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-20">
              <span className="text-[#D4AF37] font-bold tracking-[0.3em] uppercase text-xs mb-4 block">Our Foundation</span>
              <h2 className="text-4xl lg:text-5xl font-display font-bold text-[#002147] mb-6">The LIC Advantage</h2>
              <p className="text-lg text-gray-500">
                Insurance is a legal contract, but with us, it's a sacred bond. We merge traditional trust with modern wealth engineering.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-10">
              <div className="group p-10 rounded-[40px] bg-slate-50 hover:bg-[#002147] transition-all duration-700 hover:-translate-y-2">
                <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center text-[#002147] text-4xl mb-8 shadow-xl group-hover:bg-[#D4AF37] group-hover:text-white transition-all duration-500">
                  <i className="fa-solid fa-landmark"></i>
                </div>
                <h3 className="text-2xl font-display font-bold mb-4 group-hover:text-white transition-colors">Sovereign Guarantee</h3>
                <p className="text-gray-500 group-hover:text-blue-100/60 leading-relaxed transition-colors">
                  Every policy is backed by the Government of India. Your capital and returns are 100% legally secured.
                </p>
              </div>
              
              <div className="group p-10 rounded-[40px] bg-slate-50 hover:bg-[#D4AF37] transition-all duration-700 hover:-translate-y-2">
                <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center text-yellow-600 text-4xl mb-8 shadow-xl group-hover:bg-[#002147] group-hover:text-white transition-all duration-500">
                  <i className="fa-solid fa-chart-line"></i>
                </div>
                <h3 className="text-2xl font-display font-bold mb-4 group-hover:text-[#002147] transition-colors">Wealth Engine</h3>
                <p className="text-gray-500 group-hover:text-[#002147]/70 leading-relaxed transition-colors">
                  Benefit from the power of compounding and LIC's heavy-hitting annual bonuses to build generational wealth.
                </p>
              </div>
              
              <div className="group p-10 rounded-[40px] bg-slate-50 hover:bg-gray-900 transition-all duration-700 hover:-translate-y-2">
                <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center text-gray-600 text-4xl mb-8 shadow-xl group-hover:bg-white group-hover:text-black transition-all duration-500">
                  <i className="fa-solid fa-shield-halved"></i>
                </div>
                <h3 className="text-2xl font-display font-bold mb-4 group-hover:text-white transition-colors">Tax Efficiency</h3>
                <p className="text-gray-500 group-hover:text-gray-400 leading-relaxed transition-colors">
                  Maximize your savings under Section 80C and enjoy 100% tax-free maturity benefits under Section 10(10D).
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Policies Grid */}
        <section id="policies" className="py-24 bg-slate-50 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
              <div className="max-w-xl">
                <span className="text-[#D4AF37] font-bold tracking-[0.3em] uppercase text-xs mb-4 block">Investment Portfolio</span>
                <h2 className="text-4xl lg:text-5xl font-display font-bold text-[#002147] mb-6">Our Flagship Plans</h2>
                <p className="text-gray-500 text-lg">Meticulously crafted policies for every life milestone. From birth to retirement, we have you covered.</p>
              </div>
              <div className="flex bg-white p-1 rounded-2xl shadow-sm border">
                <button className="px-8 py-3 rounded-xl bg-[#002147] text-white font-bold text-sm shadow-lg">Popular</button>
                <button className="px-8 py-3 rounded-xl text-gray-400 font-bold text-sm hover:text-[#002147] transition-colors">Pension</button>
                <button className="px-8 py-3 rounded-xl text-gray-400 font-bold text-sm hover:text-[#002147] transition-colors">Children</button>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {POLICIES.map((policy) => (
                <PolicyCard key={policy.id} policy={policy} onViewDetails={(p) => setSelectedPolicy(p)} />
              ))}
            </div>
          </div>
        </section>

        <TeamSection />

        <VideoSection onSubscribeClick={openBooking} />

        <Calculator />

       
        <PolicyAdvisor />

        {/* High Conversion CTA */}
        <section className="py-28 bg-[#002147] relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
          <div className="max-w-5xl mx-auto px-4 text-center relative z-10">
            <div className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#D4AF37] text-[10px] font-black uppercase tracking-[0.3em] mb-10">
                Limited Availability
            </div>
            <h2 className="text-4xl lg:text-7xl font-display font-bold text-white mb-8 leading-tight">
              Ready to Secure Your <br/> <span className="italic text-[#D4AF37]">Legacy</span>?
            </h2>
            <p className="text-xl text-blue-100/60 mb-14 max-w-2xl mx-auto leading-relaxed">
              Don't leave your family's future to chance. Join 5,000+ happy families who have built their financial fortress with LifeGuard.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center items-center gap-8">
              <a 
                href="https://wa.me/919540598999" 
                className="group relative px-12 py-6 bg-[#25D366] text-white rounded-3xl font-black text-xl hover:scale-105 transition-all shadow-2xl shadow-green-900/40 active:scale-95 flex items-center gap-4"
              >
                <i className="fa-brands fa-whatsapp text-3xl"></i> WhatsApp Us
                <div className="absolute -top-3 -right-3 bg-red-500 text-white text-[10px] px-2 py-1 rounded-full font-bold animate-pulse">Online</div>
              </a>
              
              <button 
                onClick={openBooking}
                className="px-12 py-6 bg-[#D4AF37] text-[#002147] rounded-3xl font-black text-xl hover:bg-white hover:scale-105 transition-all shadow-2xl shadow-yellow-900/20 active:scale-95"
              >
                Book Consultation
              </button>
            </div>
            
            <div className="mt-16 flex items-center justify-center gap-10">
                <div className="flex -space-x-4">
                    {[1,2,3,4].map(i => (
                        <img key={i} src={`https://picsum.photos/seed/${i+40}/100/100`} className="w-12 h-12 rounded-full border-4 border-[#002147]" />
                    ))}
                    <div className="w-12 h-12 rounded-full border-4 border-[#002147] bg-[#D4AF37] flex items-center justify-center text-[10px] font-bold">+5k</div>
                </div>
                <p className="text-blue-100/40 text-sm font-bold tracking-widest uppercase">Trusted by 5,000+ Families</p>
            </div>
          </div>
        </section>

        {/* Global Testimonials */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4">
             <div className="text-center mb-16">
              <span className="text-[#D4AF37] font-bold tracking-[0.3em] uppercase text-xs mb-4 block">Success Stories</span>
              <h2 className="text-4xl lg:text-5xl font-display font-bold text-[#002147]">Voices of Trust</h2>
            </div>
            <div className="grid lg:grid-cols-3 gap-10">
              {[
                { name: "Amit Sharma", role: "Business Owner", text: "LifeGuard transformed the way I view insurance. It's not an expense anymore; it's my biggest asset.", seed: "a" },
                { name: "Priya Menon", role: "Software Architect", text: "The team's transparency is unmatched. They don't just sell; they educate you on every clause.", seed: "b" },
                { name: "Col. Arvind Singh", role: "Retired Army", text: "Service-oriented mindset. My claim for my mother was settled in record time without any hassle.", seed: "c" }
              ].map((t, i) => (
                <div key={i} className="group p-10 rounded-[40px] bg-slate-50 border border-slate-100 hover:border-[#D4AF37]/30 transition-all duration-500">
                  <div className="flex text-[#D4AF37] mb-8 gap-1">
                    {[1, 2, 3, 4, 5].map(s => <i key={s} className="fa-solid fa-star text-xs"></i>)}
                  </div>
                  <p className="text-gray-600 italic text-lg leading-relaxed mb-10">
                    "{t.text}"
                  </p>
                  <div className="flex items-center gap-4">
                    <img src={`https://picsum.photos/seed/${t.seed}/60/60`} alt="user" className="w-14 h-14 rounded-2xl object-cover grayscale group-hover:grayscale-0 transition-all shadow-lg" />
                    <div>
                      <p className="font-bold text-[#002147] text-lg">{t.name}</p>
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{t.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {selectedPolicy && (
        <PolicyModal 
          policy={selectedPolicy} 
          onClose={() => setSelectedPolicy(null)} 
        />
      )}

      {isBookingOpen && (
        <BookingModal 
          onClose={() => setIsBookingOpen(false)} 
        />
      )}

      <Footer />
      <Analytics />
    </div>
  );
};

export default App;
