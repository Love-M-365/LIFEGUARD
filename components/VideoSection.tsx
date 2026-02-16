
import React, { useState, useRef } from 'react';
import insurance from '../assets/insurance.jpg';
import ved from '../assets/ved.mp4'
const VideoSection: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <section id="brand-video" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5">
            <span className="text-[#D4AF37] font-bold tracking-[0.3em] uppercase text-xs mb-4 block">Brand Story</span>
            <h2 className="text-4xl lg:text-5xl font-display font-bold text-[#002147] mb-6 leading-tight">
              Why 5,000+ Families <br/> Choose <span className="italic">LifeGuard</span>
            </h2>
            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
              Watch our latest presentation on how we help individuals build tax-free wealth while ensuring their families are protected against every uncertainty. 
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-[#002147] shrink-0">
                  <i className="fa-solid fa-play text-xl"></i>
                </div>
                <div>
                  <h4 className="font-bold text-[#002147]">Direct Advice</h4>
                  <p className="text-sm text-gray-500">Insights directly from our founder, Rajesh Malhotra.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-yellow-50 rounded-2xl flex items-center justify-center text-yellow-600 shrink-0">
                  <i className="fa-solid fa-clapperboard text-xl"></i>
                </div>
                <div>
                  <h4 className="font-bold text-[#002147]">Policy Breakdown</h4>
                  <p className="text-sm text-gray-500">Visual explanation of Jeevan Umang and Jeevan Labh benefits.</p>
                </div>
              </div>
            </div>
            
            <button className="mt-10 bg-[#002147] text-white px-8 py-4 rounded-2xl font-bold hover:bg-[#D4AF37] hover:text-[#002147] transition-all shadow-xl shadow-blue-900/10">
              Subscribe for Updates
            </button>
          </div>

          <div className="lg:col-span-7 relative group">
            <div className="absolute -inset-4 bg-[#D4AF37] rounded-[40px] rotate-2 opacity-10 group-hover:rotate-1 transition-transform"></div>
            <div className="relative aspect-video rounded-[32px] overflow-hidden shadow-2xl bg-black border-4 border-white/10">
              <video 
                ref={videoRef}
                className="w-full h-full object-cover"
                poster={insurance}
                onClick={togglePlay}
                onEnded={() => setIsPlaying(false)}
              >
                {/* User can replace this source URL with their actual video file */}
                <source src={ved} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              
              {!isPlaying && (
                <div 
                  className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-[2px] cursor-pointer group-hover:bg-black/40 transition-all"
                  onClick={togglePlay}
                >
                  <div className="w-24 h-24 bg-white/20 backdrop-blur-xl border border-white/30 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-2xl">
                    <div className="w-16 h-16 bg-[#D4AF37] rounded-full flex items-center justify-center shadow-lg">
                      <i className="fa-solid fa-play text-white text-2xl ml-1"></i>
                    </div>
                  </div>
                </div>
              )}

              {isPlaying && (
                <button 
                  onClick={togglePlay}
                  className="absolute bottom-6 right-6 w-12 h-12 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <i className="fa-solid fa-pause"></i>
                </button>
              )}
            </div>
            
            {/* Overlay Info Tag */}
            <div className="absolute -bottom-6 -right-6 bg-white p-5 rounded-2xl shadow-xl border border-gray-100 hidden sm:block">
               <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center text-red-600">
                    <i className="fa-solid fa-video"></i>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest leading-none mb-1">Duration</p>
                    <p className="text-[#002147] font-bold">2:45 mins</p>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
