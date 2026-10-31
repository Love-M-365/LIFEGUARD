import React, { useState, useEffect } from 'react';
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
import DiwaliBar from './components/DiwaliBar';
import DiwaliOffer from './components/DiwaliOffer';
import FreeInsuranceCTA from './components/FreeInsuranceCTA';
import LeadFormModal from './components/LeadFormModal';
import Reveal from './components/Reveal';
import { POLICIES } from './constants';
import { Policy } from './types';

const App: React.FC = () => {
  const [selectedPolicy, setSelectedPolicy] = useState<Policy | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isLeadFormOpen, setIsLeadFormOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = [
    'All',
    'Term',
    'Endowment',
    'ULIP',
    'Children',
    'Annuity',
    'Whole Life'
  ];

  const filteredPolicies =
    selectedCategory === 'All'
      ? POLICIES
      : POLICIES.filter(
          (policy) =>
            policy.category.toLowerCase() ===
            selectedCategory.toLowerCase()
        );

  // Prevent scrolling when modals are open
  useEffect(() => {
    if (selectedPolicy || isBookingOpen || isLeadFormOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [selectedPolicy, isBookingOpen, isLeadFormOpen]);

  const openBooking = () => setIsBookingOpen(true);
  const openLeadForm = () => {
    setSelectedPolicy(null);
    setIsBookingOpen(false);
    setIsLeadFormOpen(true);
  };

  return (
    <div className="min-h-screen selection:bg-[#D4AF37] selection:text-[#002147]">
      <DiwaliBar onClaim={openLeadForm} />
      <Navbar onBookClick={openBooking} />

      <main>
        <Hero onBookClick={openBooking} onFreePlanClick={openLeadForm} />
        <DiwaliOffer onClaim={openLeadForm} />

        {/* Policies Section */}
        <section id="policies" className="py-20 sm:py-24 bg-slate-50 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          
          <div className="max-w-7xl mx-auto px-4">
            
            {/* Section Header */}
            <Reveal>
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-14 gap-8">
              <div className="max-w-xl">
                <span className="text-[#D4AF37] font-bold tracking-[0.3em] uppercase text-xs mb-4 block">
                  Investment Portfolio
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-[#002147] mb-4">
                  Our Flagship Plans
                </h2>
                <p className="text-gray-500 text-base sm:text-lg">
                  Carefully structured LIC policies for every stage of life.
                </p>
              </div>

              {/* Filter Buttons */}
              <div className="w-full lg:w-auto overflow-x-auto scrollbar-hide">
                <div className="flex gap-3 min-w-max">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-5 py-2 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-300 border
                        ${
                          selectedCategory === cat
                            ? 'bg-[#002147] text-white border-[#002147] shadow-md'
                            : 'bg-white text-gray-600 border-gray-200 hover:bg-[#D4AF37] hover:text-[#002147]'
                        }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            </Reveal>

            {/* Policies Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6 lg:gap-7">
              {filteredPolicies.map((policy, i) => (
                <Reveal key={policy.id} delay={(i % 4) * 100} className="h-full">
                  <PolicyCard
                    policy={policy}
                    onViewDetails={(p) => setSelectedPolicy(p)}
                  />
                </Reveal>
              ))}
            </div>

            {/* Empty State */}
            {filteredPolicies.length === 0 && (
              <div className="text-center mt-16">
                <p className="text-gray-500 text-lg">
                  No policies available in this category.
                </p>
              </div>
            )}
          </div>
        </section>

        <Reveal><TeamSection /></Reveal>
        <Reveal><VideoSection onSubscribeClick={openBooking} /></Reveal>
        <Reveal><Calculator /></Reveal>
        <Reveal><PolicyAdvisor /></Reveal>

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

      {isLeadFormOpen && (
        <LeadFormModal onClose={() => setIsLeadFormOpen(false)} />
      )}

      <FreeInsuranceCTA
        onOpen={openLeadForm}
        suppressed={!!selectedPolicy || isBookingOpen || isLeadFormOpen}
      />

      <Footer />
    </div>
  );
};

export default App;
