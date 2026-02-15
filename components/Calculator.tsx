
import React, { useState, useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';

const Calculator: React.FC = () => {
  const [sumAssured, setSumAssured] = useState(1000000);
  const [term, setTerm] = useState(25);
  const [age, setAge] = useState(30);

  const data = useMemo(() => {
    // Highly simplified LIC-style projection
    const bonusRate = 0.045; // 4.5% annual bonus
    const fabRate = 0.005;   // 0.5% final additional bonus
    const result = [];
    let currentBenefit = 0;
    
    for (let i = 0; i <= term; i++) {
      const yearBonus = sumAssured * bonusRate * i;
      const fab = i === term ? sumAssured * fabRate * term : 0;
      result.push({
        year: i,
        premiumPaid: (sumAssured * 0.04) * i, // rough premium
        deathBenefit: sumAssured + yearBonus,
        maturityBenefit: i === term ? sumAssured + yearBonus + fab : 0
      });
    }
    return result;
  }, [sumAssured, term]);

  return (
    <section id="calculator" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-3 gap-12">
          <div className="bg-gray-50 p-8 rounded-3xl shadow-inner border">
            <h3 className="text-2xl font-display font-bold text-[#003366] mb-6">Returns Visualizer</h3>
            <div className="space-y-8">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Sum Assured (Life Cover)
                </label>
                <div className="text-2xl font-bold text-[#003366] mb-2">₹ {sumAssured.toLocaleString()}</div>
                <input 
                  type="range" min="100000" max="5000000" step="50000"
                  value={sumAssured}
                  onChange={(e) => setSumAssured(Number(e.target.value))}
                  className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer accent-[#003366]"
                />
              </div>
              
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Policy Term (Years)
                </label>
                <div className="text-2xl font-bold text-[#003366] mb-2">{term} Years</div>
                <input 
                  type="range" min="10" max="35"
                  value={term}
                  onChange={(e) => setTerm(Number(e.target.value))}
                  className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer accent-[#003366]"
                />
              </div>

              <div className="p-6 bg-[#003366] rounded-2xl text-white">
                <p className="text-sm opacity-80 mb-1">Estimated Maturity Value*</p>
                <p className="text-3xl font-bold">₹ {(sumAssured * 2.125).toLocaleString()}*</p>
                <p className="text-[10px] opacity-60 mt-4 leading-tight italic">
                  *Calculations are indicative based on typical bonus rates. Actual maturity depends on LIC's declared bonuses and final additional bonus.
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="mb-6 flex justify-between items-end">
              <div>
                <h2 className="text-3xl font-display font-bold text-[#003366]">Wealth Projection</h2>
                <p className="text-gray-500">Visualization of your coverage and corpus growth over time.</p>
              </div>
              <div className="hidden sm:flex items-center gap-4 text-xs font-bold text-gray-400">
                <span className="flex items-center gap-1"><span className="w-3 h-3 bg-blue-500 rounded-full"></span> Life Cover</span>
                <span className="flex items-center gap-1"><span className="w-3 h-3 bg-green-500 rounded-full"></span> Premium Paid</span>
              </div>
            </div>
            
            <div className="h-[400px] w-full bg-slate-50 rounded-3xl p-4 border shadow-sm">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id="colorDeath" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                  <XAxis dataKey="year" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `₹${(v/100000).toFixed(1)}L`} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                    formatter={(value: number) => `₹${value.toLocaleString()}`}
                  />
                  <Area type="monotone" dataKey="deathBenefit" stroke="#3b82f6" fillOpacity={1} fill="url(#colorDeath)" strokeWidth={3} name="Total Life Cover" />
                  <Area type="monotone" dataKey="premiumPaid" stroke="#10b981" fillOpacity={0} strokeWidth={2} name="Total Premium Paid" strokeDasharray="5 5" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-6 flex items-center gap-2 bg-yellow-50 p-4 rounded-xl border border-yellow-100">
              <i className="fa-solid fa-circle-info text-yellow-600"></i>
              <p className="text-sm text-yellow-800">
                <strong>Why LIC?</strong> Sovereign guarantee ensures 100% safety of your capital and bonuses.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Calculator;
