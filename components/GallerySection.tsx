
import React from 'react';
import { GALLERY_IMAGES } from '../constants';

const GallerySection: React.FC = () => {
  return (
    <section id="gallery" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-[#D4AF37] font-bold tracking-[0.3em] uppercase text-xs mb-4 block">Our Journey</span>
          <h2 className="text-4xl lg:text-5xl font-display font-bold text-[#002147]">Life at LifeGuard</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {GALLERY_IMAGES.map((img, i) => (
            <div key={i} className={`group relative overflow-hidden rounded-2xl shadow-md ${i === 1 ? 'md:row-span-2' : ''} ${i === 2 ? 'md:col-span-2' : ''}`}>
              <img 
                src={img.url} 
                alt={img.title}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6">
                <p className="text-white font-bold text-lg transform translate-y-4 group-hover:translate-y-0 transition-transform">
                  {img.title}
                </p>
                <div className="w-8 h-1 bg-[#D4AF37] mt-2 transform -translate-x-full group-hover:translate-x-0 transition-transform delay-100"></div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 flex justify-center">
            <button className="px-8 py-3 rounded-full border-2 border-[#002147] text-[#002147] font-bold hover:bg-[#002147] hover:text-white transition-all">
                Follow our Instagram
            </button>
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
