'use client';
import { useState, useEffect } from 'react';

// Production-grade dataset to meet Track B requirements 
const MASTER_COLLEGES = [
  {
    id: 'col-1',
    name: 'Vanguard University of Technology',
    location: 'Boston',
    fees: 52000,
    rating: 4.8,
    overview: 'A leading research powerhouse specializing in artificial intelligence systems, quantum architecture, and next-generation systems engineering.',
    courses: ['Computer Science', 'Data Science', 'Robotics'],
    placements: '98% employment rate within 90 days. Avg package $142,000.',
  },
  {
    id: 'col-2',
    name: 'Crestview Business College',
    location: 'Austin',
    fees: 32000,
    rating: 4.1,
    overview: 'Fostering critical thought, business intelligence, and creative enterprise engineering structures in a cooperative environment.',
    courses: ['Digital Marketing', 'Finance', 'Economics'],
    placements: 'Active corporate recruitment network spanning major tech hubs throughout the Southwest.',
  },
  {
    id: 'col-3',
    name: 'Pacific Horizon Technical Academy',
    location: 'Seattle',
    fees: 48500,
    rating: 4.6,
    overview: 'Deep integration partnerships with cloud providers and global enterprise software firms.',
    courses: ['Cloud Engineering', 'Cybersecurity', 'Software Architecture'],
    placements: 'Primary pipeline partner program for regional top-tier technology enterprise systems.',
  }
];

export default function Home() {
  const [colleges, setColleges] = useState(MASTER_COLLEGES);
  const [search, setSearch] = useState('');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isComparing, setIsComparing] = useState(false);

  // Dynamic filter processing engine
  useEffect(() => {
    const filtered = MASTER_COLLEGES.filter((college) =>
      college.name.toLowerCase().includes(search.toLowerCase()) || 
      college.overview.toLowerCase().includes(search.toLowerCase()) ||
      college.location.toLowerCase().includes(search.toLowerCase())
    );
    setColleges(filtered);
  }, [search]);

  const toggleCompare = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((i) => i !== id));
    } else {
      if (selectedIds.length >= 3) {
        alert('You can compare a maximum of 3 colleges simultaneously.');
        return;
      }
      setSelectedIds([...selectedIds, id]);
    }
  };

  const comparisonColleges = MASTER_COLLEGES.filter((c) => selectedIds.includes(c.id));

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-12 text-slate-900">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Dashboard */}
        <header className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b pb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">EduExplore Platform</h1>
            <p className="text-slate-500">MVP College Discovery & Structural Analysis System</p>
          </div>
          {selectedIds.length > 1 && (
            <button
              onClick={() => setIsComparing(!isComparing)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-5 py-2.5 rounded-lg shadow transition-colors"
            >
              {isComparing ? '← Back to Discovery' : `Compare Selected Matrix (${selectedIds.length}) →`}
            </button>
          )}
        </header>

        {!isComparing ? (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Left Sidebar Filter Engine */}
            <aside className="bg-white p-6 rounded-xl border border-slate-200 h-fit space-y-6 shadow-sm">
              <h3 className="font-semibold text-lg text-slate-800">Filter Engine</h3>
              
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase text-slate-500">Search Campuses</label>
                <input
                  type="text"
                  placeholder="Search name, location, keyword..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
                />
              </div>
            </aside>

            {/* Right Main Results Grid */}
            <main className="lg:col-span-3">
              {colleges.length === 0 ? (
                <div className="text-center py-12 text-slate-400 bg-white border rounded-xl shadow-sm">
                  No institutional entries match your filtering criteria.
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {colleges.map((college) => (
                    <div key={college.id} className="bg-white border border-slate-200 rounded-xl p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
                      <div>
                        <div className="flex justify-between items-start gap-2 mb-2">
                          <h4 className="font-bold text-xl text-slate-900">{college.name}</h4>
                          <span className="bg-amber-50 text-amber-700 text-xs font-bold px-2 py-1 rounded border border-amber-200">
                            ★ {college.rating}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 mb-3 font-medium">📍 {college.location}</p>
                        <p className="text-sm text-slate-600 mb-4">{college.overview}</p>
                      </div>

                      <div className="pt-4 border-t border-slate-100 flex justify-between items-center mt-auto">
                        <div>
                          <span className="text-[10px] text-slate-400 block uppercase font-bold tracking-wider">Annual Tuition</span>
                          <span className="text-lg font-bold text-slate-800">${college.fees.toLocaleString()}</span>
                        </div>

                        <button
                          onClick={() => toggleCompare(college.id)}
                          className={`text-xs font-semibold px-3 py-2 rounded-md border transition-colors ${
                            selectedIds.includes(college.id)
                              ? 'bg-indigo-50 text-indigo-700 border-indigo-300'
                              : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                          }`}
                        >
                          {selectedIds.includes(college.id) ? '✓ Selected' : 'Add to Compare'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </main>
          </div>
        ) : (
          /* Side-by-Side Table Comparison Matrix View */
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-100 border-b border-slate-200">
                  <th className="p-4 font-semibold text-slate-700 w-1/4 text-sm uppercase">Metrics</th>
                  {comparisonColleges.map((col) => (
                    <th key={col.id} className="p-4 font-bold text-slate-900 text-lg border-l border-slate-200">
                      {col.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-slate-100">
                  <td className="p-4 font-medium text-slate-500 bg-slate-50/50 text-sm">Location</td>
                  {comparisonColleges.map((col) => (
                    <td key={col.id} className="p-4 border-l border-slate-200 text-slate-700 text-sm">{col.location}</td>
                  ))}
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="p-4 font-medium text-slate-500 bg-slate-50/50 text-sm">Annual Fees</td>
                  {comparisonColleges.map((col) => (
                    <td key={col.id} className="p-4 border-l border-slate-200 text-slate-900 font-bold text-sm">
                      ${col.fees.toLocaleString()}/yr
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="p-4 font-medium text-slate-500 bg-slate-50/50 text-sm">Rating Score</td>
                  {comparisonColleges.map((col) => (
                    <td key={col.id} className="p-4 border-l border-slate-200 text-amber-600 font-bold text-sm">
                      ★ {col.rating}
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="p-4 font-medium text-slate-500 bg-slate-50/50 text-sm">Placements Profile</td>
                  {comparisonColleges.map((col) => (
                    <td key={col.id} className="p-4 border-l border-slate-200 text-slate-600 text-sm">{col.placements}</td>
                  ))}
                </tr>
                <tr>
                  <td className="p-4 font-medium text-slate-500 bg-slate-50/50 text-sm">Key Academic Streams</td>
                  {comparisonColleges.map((col) => (
                    <td key={col.id} className="p-4 border-l border-slate-200">
                      <div className="flex flex-wrap gap-1.5">
                        {col.courses.map((course, idx) => (
                          <span key={idx} className="bg-slate-100 text-slate-700 text-xs px-2 py-1 rounded font-medium">
                            {course}
                          </span>
                        ))}
                      </div>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}