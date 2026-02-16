import React from 'react';
import { Policy } from '../types';

interface PolicyCardProps {
  policy: Policy;
  onViewDetails: (policy: Policy) => void;
}

const PolicyCard: React.FC<PolicyCardProps> = ({ policy, onViewDetails }) => {
  return (
    <div
      className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col cursor-pointer h-full"
      onClick={() => onViewDetails(policy)}
    >
      {/* Image Section */}
      <div className="relative h-44 sm:h-52 md:h-56 overflow-hidden">
        <img
          src={policy.imageUrl}
          alt={policy.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Plan Number Badge */}
        <div className="absolute top-3 left-3">
          <span className="bg-[#002147] text-white text-[9px] sm:text-[10px] font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider shadow">
            Plan {policy.policyNumber}
          </span>
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>

        {/* Title Section */}
        <div className="absolute bottom-3 left-3 right-3">
          <p className="text-[#D4AF37] text-[10px] sm:text-xs font-semibold uppercase tracking-widest">
            {policy.category}
          </p>
          <h3 className="text-white text-lg sm:text-xl font-bold leading-snug">
            {policy.name}
          </h3>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4 sm:p-5 flex flex-col flex-1">
        <p className="text-gray-700 font-medium mb-4 text-xs sm:text-sm line-clamp-2">
          {policy.tagline}
        </p>

        <ul className="space-y-2 mb-5 flex-1">
          {policy.keyBenefits.slice(0, 2).map((benefit, idx) => (
            <li key={idx} className="flex gap-2 text-[11px] sm:text-xs text-gray-500 leading-tight">
              <i className="fa-solid fa-check text-green-500 mt-0.5 text-[10px]"></i>
              <span>{benefit}</span>
            </li>
          ))}
        </ul>

        {/* Bottom Section */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div>
            <p className="text-[9px] uppercase font-semibold tracking-widest text-gray-400">
              Min. Cover
            </p>
            <p className="text-[#002147] font-bold text-sm sm:text-base">
              ₹ {policy.minSumAssured.toLocaleString()}
            </p>
          </div>

          <button
            className="bg-gray-100 text-[#002147] p-3 rounded-xl group-hover:bg-[#D4AF37] transition-all duration-300"
            onClick={(e) => {
              e.stopPropagation();
              onViewDetails(policy);
            }}
          >
            <i className="fa-solid fa-arrow-right text-sm"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PolicyCard;
