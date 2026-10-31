import React, { useEffect, useState } from 'react';
import Reveal from './Reveal';

// Lakshmi Puja 2026. Update each year.
const DIWALI = new Date('2026-11-08T18:00:00+05:30');

const GIFTS = [
  { icon: 'fa-coins', title: 'Pure Silver Coin', desc: 'Lakshmi-Ganesh 999 silver coin' },
  { icon: 'fa-gift', title: 'Dry-Fruit Hamper', desc: 'Premium festive hamper for the family' },
  { icon: 'fa-clock', title: 'Smart Watch', desc: 'Fitness & health tracking' },
  { icon: 'fa-utensils', title: 'Designer Dinner Set', desc: 'Elegant set for festive dinners' },
];

function useCountdown(target: Date) {
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);
  const diff = Math.max(0, target.getTime() - now);
  return {
    done: diff === 0,
    parts: [
      ['Days', Math.floor(diff / 864e5)],
      ['Hours', Math.floor(diff / 36e5) % 24],
      ['Mins', Math.floor(diff / 6e4) % 60],
      ['Secs', Math.floor(diff / 1e3) % 60],
    ] as [string, number][],
  };
}

const Diya: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`relative w-14 h-14 ${className}`} aria-hidden>
    <div className="absolute left-1/2 -translate-x-1/2 top-0 w-3 h-6 rounded-[50%_50%_50%_50%/60%_60%_40%_40%] bg-gradient-to-t from-orange-500 via-yellow-300 to-yellow-100 animate-flicker shadow-[0_0_24px_8px_rgba(255,190,60,.55)]" />
    <div className="absolute bottom-0 left-0 right-0 h-7 rounded-b-full bg-gradient-to-b from-[#e25822] to-[#8b2500] border-t-4 border-[#ffb347]" />
  </div>
);

interface DiwaliOfferProps {
  onClaim: () => void;
}

const DiwaliOffer: React.FC<DiwaliOfferProps> = ({ onClaim }) => {
  const { done, parts } = useCountdown(DIWALI);

  return (
    <section id="diwali-offer" className="relative py-20 sm:py-28 overflow-hidden bg-[#1a0b2e]">
      {/* glowing backdrop */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,153,51,.25),transparent_60%)]" />
      <div className="absolute -bottom-40 -left-40 w-[30rem] h-[30rem] bg-[#D4AF37]/20 rounded-full blur-[120px]" />
      {Array.from({ length: 24 }).map((_, i) => (
        <span
          key={i}
          className="absolute w-1.5 h-1.5 rounded-full bg-yellow-200"
          style={{
            left: `${(i * 37) % 100}%`,
            top: `${(i * 53) % 100}%`,
            animation: `sparkle ${2 + (i % 4)}s ease-in-out ${(i % 7) * 0.4}s infinite`,
          }}
        />
      ))}

      <div className="relative max-w-7xl mx-auto px-4">
        <Reveal className="text-center max-w-3xl mx-auto">
          <div className="flex justify-center gap-6 mb-6">
            <Diya className="animate-float" />
            <Diya className="animate-float [animation-delay:1s] scale-110" />
            <Diya className="animate-float [animation-delay:2s]" />
          </div>
          <span className="inline-block bg-white/10 border border-white/20 text-[#FFD56B] text-[11px] font-black uppercase tracking-[0.3em] px-5 py-2 rounded-full mb-6">
            Diwali Season Special
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-white leading-tight mb-6">
            Light up your family's future,{' '}
            <span className="text-shimmer">get gifts worth ₹5,000</span>
          </h2>
          <p className="text-purple-100/80 text-base sm:text-lg">
            This Diwali, every new policy holder takes home an assured festive gift worth up to{' '}
            <strong className="text-[#FFD56B]">₹5,000</strong>. Protect your loved ones and celebrate with us.
          </p>
        </Reveal>

        {!done && (
          <Reveal delay={150} className="flex justify-center gap-3 sm:gap-5 mt-10">
            {parts.map(([label, value]) => (
              <div key={label} className="w-16 sm:w-20 py-3 rounded-2xl bg-white/10 border border-white/15 backdrop-blur text-center">
                <div className="text-2xl sm:text-3xl font-black text-white tabular-nums">{String(value).padStart(2, '0')}</div>
                <div className="text-[10px] uppercase tracking-widest text-[#FFD56B] font-bold">{label}</div>
              </div>
            ))}
          </Reveal>
        )}

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-14">
          {GIFTS.map((g, i) => (
            <Reveal key={g.title} delay={i * 120}>
              <div className="group h-full rounded-3xl p-6 bg-gradient-to-b from-white/10 to-white/[0.03] border border-white/10 hover:border-[#D4AF37]/60 hover:-translate-y-2 transition-all duration-500 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-[#FFD56B] to-[#D4AF37] flex items-center justify-center text-[#2a1200] text-2xl shadow-lg shadow-yellow-500/20 group-hover:rotate-6 group-hover:scale-110 transition-transform duration-500">
                  <i className={`fa-solid ${g.icon}`} />
                </div>
                <h3 className="text-white font-bold mb-1">{g.title}</h3>
                <p className="text-purple-100/60 text-xs sm:text-sm">{g.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200} className="text-center mt-14">
          <button
            onClick={onClaim}
            className="btn-shine animate-glow-ring inline-flex items-center gap-3 bg-gradient-to-r from-[#FFD56B] to-[#D4AF37] text-[#2a1200] px-8 sm:px-10 py-4 sm:py-5 rounded-full font-black text-base sm:text-lg hover:scale-105 active:scale-95 transition-transform"
          >
            <i className="fa-solid fa-gift animate-wiggle" />
            Claim My Free Plan + Diwali Gift
          </button>
          <p className="text-purple-100/40 text-[11px] mt-5 max-w-xl mx-auto">
            *Gift on new policies issued during the Diwali season. Gift item depends on plan & premium, subject to
            availability. T&amp;C apply. Insurance is the subject matter of solicitation.
          </p>
        </Reveal>
      </div>
    </section>
  );
};

export default DiwaliOffer;
