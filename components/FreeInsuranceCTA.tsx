import React, { useEffect, useState } from 'react';

interface FreeInsuranceCTAProps {
  onOpen: () => void;
  suppressed: boolean; // true while another modal is open
}

const SEEN_KEY = 'lg_cta_popup_seen';

function popupSeen() {
  try { return sessionStorage.getItem(SEEN_KEY) === '1'; } catch { return false; }
}
function markSeen() {
  try { sessionStorage.setItem(SEEN_KEY, '1'); } catch { /* storage blocked */ }
}

// A popup that appears suddenly (after a few seconds or some scrolling, once per visit)
// plus a floating button that stays on screen afterwards.
const FreeInsuranceCTA: React.FC<FreeInsuranceCTAProps> = ({ onOpen, suppressed }) => {
  const [popup, setPopup] = useState(false);
  const [floating, setFloating] = useState(false);

  useEffect(() => {
    const showFloat = setTimeout(() => setFloating(true), 2500);
    if (popupSeen()) return () => clearTimeout(showFloat);

    const trigger = () => {
      setPopup(true);
      markSeen();
      cleanup();
    };
    const timer = setTimeout(trigger, 6000);
    const onScroll = () => {
      if (window.scrollY > window.innerHeight * 0.9) trigger();
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    function cleanup() {
      clearTimeout(timer);
      window.removeEventListener('scroll', onScroll);
    }
    return () => { cleanup(); clearTimeout(showFloat); };
  }, []);

  const open = () => {
    setPopup(false);
    onOpen();
  };

  return (
    <>
      {popup && !suppressed && (
        <div className="fixed inset-0 z-[120] flex items-end sm:items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in" onClick={() => setPopup(false)}>
          <div
            className="relative w-full max-w-md rounded-[32px] overflow-hidden shadow-2xl animate-pop-in bg-gradient-to-br from-[#002147] via-[#0b2f63] to-[#3b0a45]"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-label="Free insurance offer"
          >
            <button onClick={() => setPopup(false)} className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white z-10" aria-label="Close">
              <i className="fa-solid fa-xmark" />
            </button>
            <div className="absolute -top-16 -right-16 w-56 h-56 bg-[#D4AF37]/30 rounded-full blur-3xl" />
            <div className="relative p-8 text-center text-white">
              <div className="w-20 h-20 mx-auto mb-5 rounded-3xl bg-gradient-to-br from-[#FFD56B] to-[#D4AF37] flex items-center justify-center text-4xl text-[#2a1200] animate-wiggle shadow-xl shadow-yellow-500/30">
                <i className="fa-solid fa-gift" />
              </div>
              <p className="text-[#FFD56B] text-[11px] font-black uppercase tracking-[0.3em] mb-3">🪔 Diwali Special Offer</p>
              <h3 className="text-3xl font-display font-bold leading-tight mb-3">
                Get Your <span className="text-shimmer">FREE</span> Insurance Plan
              </h3>
              <p className="text-blue-100/80 text-sm mb-6">
                Share a few details and get a personalised LIC plan from an expert, free of cost.
                New policy holders also get <strong className="text-[#FFD56B]">Diwali gifts worth up to ₹5,000</strong>.
              </p>
              <button
                onClick={open}
                className="btn-shine animate-glow-ring w-full bg-gradient-to-r from-[#FFD56B] to-[#D4AF37] text-[#2a1200] py-4 rounded-2xl font-black text-lg hover:scale-[1.02] active:scale-95 transition-transform"
              >
                Click Here to Claim <i className="fa-solid fa-arrow-right ml-1" />
              </button>
              <button onClick={() => setPopup(false)} className="mt-4 text-xs text-white/50 hover:text-white/80">
                Maybe later
              </button>
            </div>
          </div>
        </div>
      )}

      {floating && !suppressed && (
        <button
          onClick={open}
          className="fixed z-[90] bottom-5 left-1/2 -translate-x-1/2 sm:left-auto sm:translate-x-0 sm:right-6 sm:bottom-6 animate-sheet"
          aria-label="Get free insurance plan"
        >
          <span className="btn-shine animate-glow-ring flex items-center gap-3 bg-gradient-to-r from-[#c2410c] via-[#e8590c] to-[#D4AF37] animate-gradient text-white pl-4 pr-6 py-3.5 rounded-full shadow-2xl shadow-orange-900/40 font-bold text-sm whitespace-nowrap hover:scale-105 transition-transform">
            <span className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center animate-wiggle">
              <i className="fa-solid fa-gift" />
            </span>
            Get FREE Insurance Plan · Click Here
          </span>
        </button>
      )}
    </>
  );
};

export default FreeInsuranceCTA;
