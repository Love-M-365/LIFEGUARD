
import React, { useState, useRef, useEffect } from 'react';
import { getPolicyAdvice } from '../services/geminiService';

const PolicyAdvisor: React.FC = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{ role: 'user' | 'bot'; content: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMsg = input;
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setInput('');
    setLoading(true);

    const advice = await getPolicyAdvice(userMsg);
    setMessages(prev => [...prev, { role: 'bot', content: advice || '' }]);
    setLoading(false);
  };

  return (
    <section id="advisor" className="py-24 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-display font-bold text-[#003366] mb-4">AI Insurance Consultant</h2>
          <p className="text-gray-600">Not sure which plan is right for you? Ask our intelligent advisor for an instant recommendation.</p>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col h-[600px] border">
          <div className="bg-[#003366] p-4 flex items-center gap-4 text-white">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <i className="fa-solid fa-robot"></i>
            </div>
            <div>
              <p className="font-bold">LIC Smart Advisor</p>
              <p className="text-xs text-blue-200">Online & Ready to Help</p>
            </div>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50">
            {messages.length === 0 && (
              <div className="h-full flex flex-col items-center justify-center text-gray-400 space-y-4">
                <i className="fa-solid fa-comments text-5xl"></i>
                <p>Try asking: "I'm 30, earning 10L, looking for retirement plan."</p>
              </div>
            )}
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-4 rounded-2xl ${
                  m.role === 'user' 
                  ? 'bg-[#003366] text-white rounded-tr-none' 
                  : 'bg-white text-gray-800 shadow-sm border rounded-tl-none'
                }`}>
                  <p className="whitespace-pre-wrap text-sm leading-relaxed">{m.content}</p>
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-white p-4 rounded-2xl shadow-sm border rounded-tl-none flex gap-2">
                  <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce"></span>
                  <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                  <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                </div>
              </div>
            )}
          </div>

          <div className="p-4 bg-white border-t flex gap-2">
            <input 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="E.g., Which policy is best for my 5 year old daughter?"
              className="flex-1 px-4 py-3 bg-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-[#003366] transition-all"
            />
            <button 
              onClick={handleSend}
              disabled={loading}
              className="bg-[#003366] text-white p-3 rounded-xl hover:bg-blue-900 transition-colors disabled:opacity-50"
            >
              <i className="fa-solid fa-paper-plane px-2"></i>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PolicyAdvisor;
