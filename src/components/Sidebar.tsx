import { Brain, Database, Shield, Settings, History, Command } from 'lucide-react';
import { cn } from '../lib/utils';

export function Sidebar() {
  return (
    <aside className="w-64 flex flex-col gap-3 hidden lg:flex p-4 overflow-hidden">
      <div className="glass p-6 rounded-xl flex flex-col gap-6 flex-1 custom-scrollbar overflow-y-auto">
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 bg-sky-500 rounded flex items-center justify-center font-bold text-black shadow-[0_0_15px_rgba(56,189,248,0.3)]">
            TB
          </div>
          <div>
            <h1 className="text-sm font-bold tracking-tight text-white uppercase">TINYBRAIN-X</h1>
            <p className="text-[9px] text-slate-400 uppercase tracking-widest font-bold">Neural-Symbolic Agent</p>
          </div>
        </div>

        <div className="h-px bg-white/5" />

        <section>
          <h2 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4 px-2">Core Modules</h2>
          <nav className="flex flex-col gap-2">
            <SidebarItem icon={<Shield size={16} />} label="Security Engine" status="ACTIVE" />
            <SidebarItem icon={<Database size={16} />} label="Vector Memory" status="94.2 GB" />
            <SidebarItem icon={<Command size={16} />} label="Logic Controller" status="NOMINAL" />
          </nav>
        </section>

        <section>
          <h2 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4 px-2">Session Archive</h2>
          <div className="flex flex-col gap-1">
            {[
              "Market Analysis Alpha",
              "Recursive Sub-task Plan",
              "Inventory Optimization",
              "Neural Drift Debugging"
            ].map(log => (
              <button key={log} className="text-left px-2 py-2 text-[11px] text-slate-400 hover:text-agent-accent hover:bg-agent-accent/5 rounded transition-colors font-mono truncate">
                &gt; {log}
              </button>
            ))}
          </div>
        </section>

        <div className="mt-auto">
          <div className="glass bg-white/5 border-white/5 p-4 rounded-lg">
            <h2 className="text-[10px] font-bold text-orange-400 uppercase tracking-widest mb-2">Self-Improvement</h2>
            <p className="text-[10px] text-orange-200/50 leading-relaxed">
              Detected 12% inefficiency in logic cross-validation. Recalibrating.
            </p>
          </div>
        </div>
      </div>

      <div className="glass p-4 rounded-xl flex items-center gap-3">
        <div className="status-pulse" />
        <div className="flex-1">
          <p className="text-[10px] font-mono text-agent-text">SYSTEM: ACTIVE</p>
          <p className="text-[9px] font-mono text-slate-400">LATENCY: 0.42ms</p>
        </div>
        <Settings size={14} className="text-slate-500 hover:text-white cursor-pointer transition-colors" />
      </div>
    </aside>
  );
}

function SidebarItem({ icon, label, status }: { icon: React.ReactNode, label: string, status?: string }) {
  return (
    <div className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 transition-colors group cursor-pointer border border-transparent hover:border-white/5">
      <div className="text-slate-500 group-hover:text-agent-accent transition-colors">
        {icon}
      </div>
      <span className="flex-1 text-[11px] font-medium text-slate-300 group-hover:text-white">{label}</span>
      {status && <span className="text-[9px] font-mono text-agent-accent px-1.5 py-0.5 rounded bg-agent-accent/10 border border-agent-accent/20 uppercase">{status}</span>}
    </div>
  );
}
