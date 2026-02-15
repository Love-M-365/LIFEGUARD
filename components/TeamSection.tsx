
import React from 'react';
import { TEAM_MEMBERS } from '../constants';
import papa from './assets/papa.jpeg';
const TeamSection: React.FC = () => {
  return (
    <section id="team" className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-4xl lg:text-5xl font-display font-bold text-[#002147] mb-6">Meet Your Trusted Advisors</h2>
            <p className="text-gray-600 text-lg">
              Behind every successful policy is a dedicated team of experts. We are here to guide you, support you, and ensure your legacy remains unshakable.
            </p>
          </div>
          <div className="hidden md:block">
            <div className="w-24 h-1 bg-[#D4AF37]"></div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          {TEAM_MEMBERS.map((member, idx) => (
            <div key={idx} className="group relative">
              <div className="aspect-[3/4] overflow-hidden rounded-3xl shadow-xl transition-all duration-500 group-hover:shadow-2xl group-hover:-translate-y-2">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#002147]/90 via-[#002147]/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
                
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white transform transition-transform duration-500">
                  <div className="flex items-center gap-2 text-[#D4AF37] text-xs font-bold uppercase tracking-widest mb-2">
                    <span className="w-4 h-px bg-[#D4AF37]"></span>
                    {member.role}
                  </div>
                  <h3 className="text-2xl font-display font-bold mb-1">{member.name}</h3>
                  <p className="text-blue-200 text-sm mb-4 line-clamp-2 group-hover:line-clamp-none transition-all duration-500">
                    {member.bio}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 pt-4 border-t border-white/10 opacity-0 group-hover:opacity-100 transition-opacity delay-100">
                    {member.awards.map((award, i) => (
                      <span key={i} className="text-[10px] bg-white/10 px-2 py-1 rounded backdrop-blur-sm border border-white/5">
                        {award}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="absolute -top-4 -right-4 w-12 h-12 bg-[#D4AF37] text-white rounded-full flex items-center justify-center font-bold text-xs shadow-lg border-4 border-white group-hover:scale-110 transition-transform">
                {member.experience.split('+')[0]}y+
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
