
import React, { useState } from 'react';
import { BookingData } from '../types';

interface BookingModalProps {
  onClose: () => void;
  preselectedPolicy?: string;
}

const TIME_SLOTS = [
  "10:00 AM - 11:00 AM",
  "11:30 AM - 12:30 PM",
  "02:00 PM - 03:00 PM",
  "04:00 PM - 05:00 PM",
  "06:30 PM - 07:30 PM"
];

const BookingModal: React.FC<BookingModalProps> = ({ onClose, preselectedPolicy }) => {
  const [formData, setFormData] = useState<BookingData>({
    name: '',
    phone: '',
    email: '',
    date: '',
    timeSlot: '',
    policyInterest: preselectedPolicy || ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent, method: 'whatsapp' | 'email') => {
    e.preventDefault();
    
    const message = `*Consultation Request - LifeGuard LIC*\n\n*Name:* ${formData.name}\n*Date:* ${formData.date}\n*Time:* ${formData.timeSlot}\n*Email:* ${formData.email}\n*Phone:* ${formData.phone}\n${formData.policyInterest ? `*Interested in:* ${formData.policyInterest}` : ''}\n\nPlease confirm my appointment.`;

    if (method === 'whatsapp') {
      const encodedMsg = encodeURIComponent(message);
      window.open(`https://wa.me/919540598999?text=${encodedMsg}`, '_blank');
    } else {
      const mailtoLink = `mailto:sanjeevca121@gmail.com?subject=Consultation Booking: ${formData.name}&body=${encodeURIComponent(message.replace(/\*/g, ''))}`;
      window.location.href = mailtoLink;
    }

    setIsSubmitted(true);
    setTimeout(() => {
      onClose();
    }, 3000);
  };

  if (isSubmitted) {
    return (
      <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-[#002147]/95 backdrop-blur-xl animate-in fade-in duration-300">
        <div className="bg-white rounded-[40px] p-12 text-center max-w-md shadow-2xl border border-white/20">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center text-green-600 text-5xl mx-auto mb-8 animate-bounce">
            <i className="fa-solid fa-calendar-check"></i>
          </div>
          <h2 className="text-3xl font-display font-bold text-[#002147] mb-4">Request Sent!</h2>
          <p className="text-gray-600 mb-8 leading-relaxed">
            Your consultation request for <strong>{formData.date}</strong> at <strong>{formData.timeSlot}</strong> has been shared. We will confirm shortly via WhatsApp.
          </p>
          <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-[#D4AF37] animate-[progress_3s_linear]"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300" onClick={onClose}>
      <div 
        className="bg-white w-full max-w-2xl rounded-[40px] shadow-2xl relative overflow-hidden flex flex-col max-h-[95vh] animate-in slide-in-from-bottom-10 duration-500"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-[#002147] p-8 text-white relative">
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all"
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
          <span className="text-[#D4AF37] font-bold text-xs uppercase tracking-[0.3em] mb-2 block">Secure Your Time</span>
          <h2 className="text-3xl font-display font-bold">Book Free Consultation</h2>
          <p className="text-blue-200 text-sm mt-2 opacity-80">Our experts are ready to build your financial fortress.</p>
        </div>

        <form className="p-8 lg:p-10 overflow-y-auto space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Full Name</label>
              <div className="relative">
                <i className="fa-solid fa-user absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm"></i>
                <input 
                  required
                  type="text" 
                  placeholder="John Doe"
                  className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-[#D4AF37] outline-none transition-all text-sm"
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Phone / WhatsApp</label>
              <div className="relative">
                <i className="fa-brands fa-whatsapp absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm"></i>
                <input 
                  required
                  type="tel" 
                  placeholder="+91 98765-XXXXX"
                  className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-[#D4AF37] outline-none transition-all text-sm"
                  value={formData.phone}
                  onChange={e => setFormData({...formData, phone: e.target.value})}
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Email Address</label>
            <div className="relative">
              <i className="fa-solid fa-envelope absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm"></i>
              <input 
                required
                type="email" 
                placeholder="john@example.com"
                className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-[#D4AF37] outline-none transition-all text-sm"
                value={formData.email}
                onChange={e => setFormData({...formData, email: e.target.value})}
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Select Date</label>
              <input 
                required
                type="date" 
                min={new Date().toISOString().split('T')[0]}
                className="w-full px-4 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-[#D4AF37] outline-none transition-all text-sm cursor-pointer"
                value={formData.date}
                onChange={e => setFormData({...formData, date: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Time Slot</label>
              <select 
                required
                className="w-full px-4 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-[#D4AF37] outline-none transition-all text-sm cursor-pointer appearance-none"
                value={formData.timeSlot}
                onChange={e => setFormData({...formData, timeSlot: e.target.value})}
              >
                <option value="">Choose a slot</option>
                {TIME_SLOTS.map(slot => <option key={slot} value={slot}>{slot}</option>)}
              </select>
            </div>
          </div>

          <div className="pt-6 border-t border-gray-100">
            <p className="text-[10px] text-gray-400 uppercase font-bold text-center mb-6 tracking-widest">Confirm Booking Via</p>
            <div className="grid grid-cols-2 gap-4">
              <button 
                type="button"
                onClick={(e) => handleSubmit(e, 'whatsapp')}
                disabled={!formData.name || !formData.date || !formData.timeSlot}
                className="flex items-center justify-center gap-3 bg-[#25D366] text-white py-4 rounded-2xl font-bold hover:scale-[1.02] transition-transform active:scale-95 disabled:opacity-50 disabled:grayscale"
              >
                <i className="fa-brands fa-whatsapp text-2xl"></i> WhatsApp
              </button>
              <button 
                type="button"
                onClick={(e) => handleSubmit(e, 'email')}
                disabled={!formData.name || !formData.date || !formData.timeSlot}
                className="flex items-center justify-center gap-3 bg-[#002147] text-white py-4 rounded-2xl font-bold hover:scale-[1.02] transition-transform active:scale-95 disabled:opacity-50 disabled:grayscale"
              >
                <i className="fa-solid fa-envelope"></i> Email
              </button>
            </div>
            <p className="text-center text-[10px] text-gray-400 mt-6 leading-relaxed">
              By clicking, you agree to receive a confirmation message. <br/> Appointment is subject to availability.
            </p>
          </div>
        </form>
      </div>
      <style>{`
        @keyframes progress {
          0% { width: 0%; }
          100% { width: 100%; }
        }
      `}</style>
    </div>
  );
};

export default BookingModal;
