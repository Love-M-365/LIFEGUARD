
import React from 'react';
import { Policy } from '../types';

interface PolicyCardProps {
  policy: Policy;
  onViewDetails: (policy: Policy) => void;
}

const PolicyCard: React.FC<PolicyCardProps> = ({ policy, onViewDetails }) => {
  return (
    <div 
      className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 flex flex-col cursor-pointer"
      onClick={() => onViewDetails(policy)}
    >
      <div className="relative h-64 overflow-hidden">
        <img 
          src={policy.imageUrl} 
          alt={policy.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-[#002147] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-lg border border-white/20">
            Plan No: {policy.policyNumber}
          </span>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
        <div className="absolute bottom-4 left-4 right-4">
          <p className="text-[#D4AF37] text-xs font-bold mb-1 uppercase tracking-widest">{policy.category}</p>
          <h3 className="text-white text-2xl font-display font-bold leading-tight">{policy.name}</h3>
        </div>
      </div>
      
      <div className="p-6 flex-1 flex flex-col">
        <p className="text-gray-800 font-semibold mb-6 leading-relaxed text-sm line-clamp-2">{policy.tagline}</p>
        
        <ul className="space-y-3 mb-8 flex-1">
          {policy.keyBenefits.slice(0, 3).map((benefit, idx) => (
            <li key={idx} className="flex gap-3 text-xs text-gray-500 leading-tight">
              <i className="fa-solid fa-check text-green-500 mt-0.5"></i>
              <span>{benefit}</span>
            </li>
          ))}
        </ul>

        <div className="flex items-center justify-between pt-6 border-t border-gray-100">
          <div className="text-xs">
            <p className="text-gray-400 uppercase font-bold tracking-widest text-[10px]">Min. Sum Assured</p>
            <p className="text-[#002147] font-black text-lg">₹ {policy.minSumAssured.toLocaleString()}</p>
          </div>
          <button 
            className="bg-slate-50 text-[#002147] p-4 rounded-2xl group-hover:bg-[#D4AF37] group-hover:text-[#002147] transition-all duration-300 shadow-sm"
            onClick={(e) => {
              e.stopPropagation();
              onViewDetails(policy);
            }}
          >
            <i className="fa-solid fa-arrow-right"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PolicyCard;
