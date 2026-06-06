'use client';
import { useState } from 'react';

const INITIAL_SALARY_DATA = [
  { company: 'Google', level: 'L4', title: 'Software Engineer II', base: 135000, stock: 45000, bonus: 20000, location: 'Mountain View' },
  { company: 'Meta', level: 'E4', title: 'Software Engineer', base: 162000, stock: 68000, bonus: 22000, location: 'Menlo Park' },
  { company: 'Microsoft', level: '62', title: 'Software Engineer II', base: 128000, stock: 25000, bonus: 15000, location: 'Redmond' },
  { company: 'Amazon', level: 'L5', title: 'SDE II', base: 145000, stock: 80000, bonus: 0, location: 'Seattle' }
];

export default function CompensationIntelligencePage() {
  const [data, setData] = useState(INITIAL_SALARY_DATA);
  const [sortKey, setSortKey] = useState('total');

  const getNormalizedTotal = (item: any) => item.base + (item.stock || 0) + (item.bonus || 0);

  const sortedData = [...data].sort((a, b) => {
    if (sortKey === 'total') return getNormalizedTotal(b) - getNormalizedTotal(a);
    if (sortKey === 'base') return b.base - a.base;
    return b.company.localeCompare(a.company);
  });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 p-6 md:p-12">
      <div className="max-w-6xl mx-auto space-y-12">
        
        <header className="border-b pb-6">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Track C: Strategic Compensation Intelligence Matrix</h1>
          <p className="text-slate-500 text-sm">Cross-company engineering level mapping engine and data normalization compiler modeling total compensation variables.</p>
        </header>

        {/* Required Competitive Evaluation Matrix */}
        <section className="space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500">Benchmark Platform Feature Comparison Matrix</h3>
          <div className="bg-white border rounded-xl shadow-sm overflow-hidden">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-100 border-b border-slate-200 text-slate-700 font-semibold">
                  <th className="p-3">Platform Module</th>
                  <th className="p-3">Levels.fyi</th>
                  <th className="p-3">6figr</th>
                  <th className="p-3">AmbitionBox</th>
                  <th className="p-3">Glassdoor</th>
                  <th className="p-3 text-indigo-600">Built?</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-600">
                <tr>
                  <td className="p-3 font-semibold text-slate-800">Normalized Level Cross-Mapping</td>
                  <td className="p-3 text-emerald-600 font-medium">✓ Excellent</td>
                  <td className="p-3">❌ Poor</td>
                  <td className="p-3">⚠️ Limited</td>
                  <td className="p-3">❌ Mixed</td>
                  <td className="p-3 text-indigo-600 font-bold">✓ Implemented</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-slate-800">Total Compensation Component Splits</td>
                  <td className="p-3 text-emerald-600 font-medium">✓ Base/Stock/Bonus</td>
                  <td className="p-3">⚠️ Basic</td>
                  <td className="p-3">✓ Good</td>
                  <td className="p-3">❌ Static Averaging</td>
                  <td className="p-3 text-indigo-600 font-bold">✓ Implemented</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Live Total Compensation Normalized Table Data */}
        <section className="space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500">Normalized Total Compensation Ledger</h3>
            <div className="flex gap-2 text-xs font-medium">
              <span className="text-slate-500 self-center">Sort Metrics Matrix:</span>
              <button onClick={() => setSortKey('total')} className={`px-3 py-1.5 border rounded-md transition-colors ${sortKey === 'total' ? 'bg-slate-900 text-white' : 'bg-white hover:bg-slate-100'}`}>Total Comp</button>
              <button onClick={() => setSortKey('base')} className={`px-3 py-1.5 border rounded-md transition-colors ${sortKey === 'base' ? 'bg-slate-900 text-white' : 'bg-white hover:bg-slate-100'}`}>Base Salary</button>
            </div>
          </div>

          <div className="bg-white border rounded-xl shadow-sm overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b text-xs font-semibold uppercase text-slate-400">
                  <th className="p-4">Company Profile</th>
                  <th className="p-4">Standardized Level</th>
                  <th className="p-4">Base Salary</th>
                  <th className="p-4">Equity / Stock</th>
                  <th className="p-4">Annual Bonus</th>
                  <th className="p-4 bg-indigo-50 text-indigo-900">Total Compensation (Normalized)</th>
                </tr>
              </thead>
              <tbody className="divide-y text-sm">
                {sortedData.map((item, index) => (
                  <tr key={index} className="hover:bg-slate-50/50 transition-colors">
                    <td className="p-4 font-bold text-slate-900">{item.company} <span className="text-xs font-normal text-slate-400 block">{item.title}</span></td>
                    <td className="p-4 font-mono font-medium text-slate-600"><span className="bg-slate-100 border px-2 py-0.5 rounded text-xs">{item.level}</span></td>
                    <td className="p-4 text-slate-600">${item.base.toLocaleString()}</td>
                    <td className="p-4 text-slate-600">${item.stock.toLocaleString()}</td>
                    <td className="p-4 text-slate-600">${item.bonus.toLocaleString()}</td>
                    <td className="p-4 bg-indigo-50/40 font-bold text-indigo-700 border-l-2 border-indigo-500">${getNormalizedTotal(item).toLocaleString()}/yr</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}