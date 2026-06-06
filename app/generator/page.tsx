'use client';
import { useState } from 'react';

const INITIAL_JSON_CONFIG = `{
  "appName": "Dynamic Enterprise CRM",
  "layout": "grid",
  "components": [
    { "id": "f-1", "type": "input", "label": "Full Name", "placeholder": "Enter client name" },
    { "id": "f-2", "type": "select", "label": "Account Status", "options": ["Lead", "Active", "Churned"] },
    { "id": "f-3", "type": "unknown_broken_tag", "label": "Ghost Field Example" },
    { "id": "f-4", "type": "button", "label": "Save Account Profile" }
  ]
}`;

export default function AppGeneratorPage() {
  const [jsonText, setJsonText] = useState(INITIAL_JSON_CONFIG);
  const [errorLog, setErrorLog] = useState<string | null>(null);
  const [runtimeConfig, setRuntimeConfig] = useState(JSON.parse(INITIAL_JSON_CONFIG));

  const handleCompile = () => {
    try {
      const parsed = JSON.parse(jsonText);
      setRuntimeConfig(parsed);
      setErrorLog(null);
    } catch (err: any) {
      setErrorLog(`Compilation Schema Error: ${err.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-6 md:p-12">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8 border-b border-slate-800 pb-4">
          <h1 className="text-2xl font-bold tracking-tight text-indigo-400">Track A: Metadata-Driven Application Runtime</h1>
          <p className="text-slate-400 text-sm">Converts dynamic JSON schemas into functioning interface structures with graceful degradation layout safety.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* JSON Schema IDE Compiler */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-slate-300">JSON Configuration Manifest</h3>
              <button onClick={handleCompile} className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-medium px-4 py-2 rounded-md transition-colors">
                Compile & Hot-Reload Engine
              </button>
            </div>
            <textarea
              value={jsonText}
              onChange={(e) => setJsonText(e.target.value)}
              className="w-full h-96 p-4 font-mono text-xs bg-slate-950 border border-slate-800 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-emerald-400"
            />
            {errorLog && (
              <div className="p-3 bg-rose-950/50 border border-rose-800 text-rose-400 text-xs rounded-md font-mono">
                {errorLog}
              </div>
            )}
          </div>

          {/* Dynamic App Simulation Sandboxed Engine */}
          <div className="bg-slate-950 border border-slate-800 rounded-lg p-6 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center border-b border-slate-800 pb-3 mb-6">
                <span className="text-xs uppercase font-bold tracking-wider text-slate-500">Sandbox App Target Window</span>
                <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-bold px-2 py-0.5 rounded">
                  Status: Operational
                </span>
              </div>
              
              <h2 className="text-xl font-bold text-slate-200 mb-6">{runtimeConfig?.appName || "Untitled Sandbox"}</h2>

              {/* Dynamic Engine Component Resolver Loop */}
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                {runtimeConfig?.components?.map((component: any) => {
                  switch (component.type) {
                    case 'input':
                      return (
                        <div key={component.id} className="space-y-1.5">
                          <label className="text-xs font-medium text-slate-400">{component.label}</label>
                          <input type="text" placeholder={component.placeholder} className="w-full bg-slate-900 border border-slate-800 px-3 py-2 rounded-md text-sm outline-none focus:border-indigo-500" />
                        </div>
                      );
                    case 'select':
                      return (
                        <div key={component.id} className="space-y-1.5">
                          <label className="text-xs font-medium text-slate-400">{component.label}</label>
                          <select className="w-full bg-slate-900 border border-slate-800 px-3 py-2 rounded-md text-sm outline-none focus:border-indigo-500 text-slate-300">
                            {component.options?.map((opt: string, idx: number) => (
                              <option key={idx} value={opt}>{opt}</option>
                            ))}
                          </select>
                        </div>
                      );
                    case 'button':
                      return (
                        <button key={component.id} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-sm py-2 rounded-md transition-colors mt-4">
                          {component.label}
                        </button>
                      );
                    default:
                      // Graceful Degradation Strategy fallback UI component handling
                      return (
                        <div key={component.id} className="p-3 bg-amber-950/30 border border-amber-900/50 text-amber-500 rounded-md text-xs">
                          ⚠️ Component Schema Fallback: Unrecognized system metadata type <span className="font-mono bg-amber-950/50 px-1 py-0.5 rounded">"{component.type}"</span> ignored gracefully without crashing runtime loop.
                        </div>
                      );
                  }
                })}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}