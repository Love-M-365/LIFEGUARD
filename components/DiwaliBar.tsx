import React from 'react';

interface DiwaliBarProps {
  onClaim: () => void;
}

const MESSAGES = [
  '🪔 Diwali Dhamaka: Gifts worth up to ₹5,000 for our new policy holders',
  '🎁 Get your FREE personalised insurance plan in 2 minutes',
  '✨ Tax savings under 80C & 10(10D) with LIC plans',
  '🪔 Limited festive season offer, claim before it ends',
];

const DiwaliBar: React.FC<DiwaliBarProps> = ({ onClaim }) => {
  const items = [...MESSAGES, ...MESSAGES];
  return (
    <button
      onClick={onClaim}
      className="w-full bg-gradient-to-r from-[#7a1f00] via-[#c2410c] to-[#7a1f00] animate-gradient text-white overflow-hidden relative z-[61] block"
      aria-label="Claim Diwali offer"
    >
      <div className="flex whitespace-nowrap animate-marquee py-2 w-max">
        {items.map((m, i) => (
          <span key={i} className="mx-10 text-xs sm:text-sm font-semibold tracking-wide">
            {m}
            <span className="ml-3 underline decoration-[#FFD56B] underline-offset-4 text-[#FFD56B]">Claim now →</span>
          </span>
        ))}
      </div>
    </button>
  );
};

export default DiwaliBar;
