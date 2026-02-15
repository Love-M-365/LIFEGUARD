
import React from 'react';
import { Policy } from '../types';

interface PolicyModalProps {
  policy: Policy;
  onClose: () => void;
}

const PolicyModal: React.FC<PolicyModalProps> = ({ policy, onClose }) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
      <div 
        className="bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-[40px] shadow-2xl relative animate-in slide-in-from-bottom-10 duration-500"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 w-12 h-12 bg-gray-100 hover:bg-[#002147] hover:text-white rounded-full flex items-center justify-center transition-all z-10"
        >
          <i className="fa-solid fa-xmark text-xl"></i>
        </button>

        <div className="grid lg:grid-cols-5 h-full">
          <div className="lg:col-span-2 h-full min-h-[300px] relative">
            <img 
              src={policy.imageUrl} 
              alt={policy.name} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#002147] via-transparent to-transparent"></div>
            <div className="absolute bottom-8 left-8 text-white">
              <span className="text-[#D4AF37] font-bold text-xs uppercase tracking-[0.2em]">{policy.category}</span>
              <h2 className="text-4xl font-display font-bold mt-2">{policy.name}</h2>
              <p className="text-sm opacity-80 mt-1">Plan Number: {policy.policyNumber}</p>
            </div>
          </div>

          <div className="lg:col-span-3 p-8 lg:p-12 overflow-y-auto">
            <div className="mb-10">
              <h3 className="text-2xl font-display font-bold text-[#002147] mb-4">Policy Overview</h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                {policy.description}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-10">
              <div>
                <h4 className="font-bold text-[#002147] mb-4 flex items-center gap-2">
                  <i className="fa-solid fa-star text-[#D4AF37]"></i> Key Benefits
                </h4>
                <ul className="space-y-3">
                  {policy.keyBenefits.map((benefit, i) => (
                    <li key={i} className="flex gap-3 text-sm text-gray-600 leading-tight">
                      <i className="fa-solid fa-circle-check text-green-500 mt-0.5"></i>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-[#002147] mb-4 flex items-center gap-2">
                  <i className="fa-solid fa-file-invoice text-[#D4AF37]"></i> Documents Required
                </h4>
                <ul className="space-y-3">
                  {policy.documentsRequired.map((doc, i) => (
                    <li key={i} className="flex gap-3 text-sm text-gray-600 leading-tight">
                      <i className="fa-solid fa-arrow-right text-[#D4AF37] text-[10px] mt-1"></i>
                      <span>{doc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 mb-10">
                <div className="flex flex-wrap gap-8">
                    <div>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Entry Age</p>
                        <p className="font-bold text-[#002147]">{policy.entryAgeRange}</p>
                    </div>
                    <div>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Min. Sum Assured</p>
                        <p className="font-bold text-[#002147]">₹ {policy.minSumAssured.toLocaleString()}</p>
                    </div>
                    {policy.termOptions && (
                      <div>
                          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Tenure</p>
                          <p className="font-bold text-[#002147]">{policy.termOptions}</p>
                      </div>
                    )}
                </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href={`https://wa.me/919540598999?text=I'm interested in the ${policy.name} (Plan ${policy.policyNumber}) policy. Please send me more details.`}
                className="flex-1 bg-[#25D366] text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-3 hover:scale-[1.02] transition-transform active:scale-95 shadow-xl shadow-green-900/10"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fa-brands fa-whatsapp text-2xl"></i> Chat for {policy.name}
              </a>
              <a 
                href="tel:+919540598999"
                className="flex-1 bg-[#002147] text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-[#D4AF37] hover:text-[#002147] transition-all active:scale-95 shadow-xl shadow-blue-900/10"
              >
                <i className="fa-solid fa-phone"></i> Call Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PolicyModal;
