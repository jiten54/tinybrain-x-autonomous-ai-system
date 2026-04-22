import { motion } from 'motion/react';
import { ThinkingStep, THINKING_STEPS } from '../types';
import { cn } from '../lib/utils';
import { Cpu, Terminal, Activity, Brain } from 'lucide-react';

interface ThinkingIndicatorProps {
  currentStep: ThinkingStep;
}

export function ThinkingIndicator({ currentStep }: ThinkingIndicatorProps) {
  const currentIndex = THINKING_STEPS.indexOf(currentStep as any);

  return (
    <div className="flex flex-col gap-4 p-6 glass rounded-xl font-mono neon-glow">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sky-400">
          <Activity size={16} className="animate-pulse" />
          <span className="text-[10px] uppercase tracking-widest font-bold">Neural core processing</span>
        </div>
        <span className="text-[9px] text-slate-500 uppercase tracking-widest">Inference speed: 0.42ms</span>
      </div>

      <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
        {THINKING_STEPS.map((step, idx) => {
          const isActive = step === currentStep;
          const isCompleted = currentIndex > idx;
          
          return (
            <div key={step} className="flex flex-col gap-1">
              <div className={cn(
                "h-1 rounded-full transition-all duration-300",
                isActive ? "bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.6)]" : 
                isCompleted ? "bg-sky-400/40" : "bg-white/5"
              )} />
              <span className={cn(
                "text-[8px] text-center truncate uppercase tracking-tighter",
                isActive ? "text-white font-bold" : "text-slate-500"
              )}>
                {step}
              </span>
            </div>
          );
        })}
      </div>

      <div className="flex items-center gap-3 mt-1">
        <div className="flex items-center gap-2 text-sky-400 bg-sky-500/10 px-3 py-1.5 rounded border border-sky-500/20 text-[10px] font-bold">
          <span className="animate-pulse">{currentStep}</span>
        </div>
        <div className="text-[10px] text-slate-400 italic">
          {currentIndex === 0 && "Parsing tokens and intent metrics..."}
          {currentIndex === 1 && "Segmenting tasks into non-linear steps..."}
          {currentIndex === 2 && "Compiling neural execution map..."}
          {currentIndex === 3 && "Applying logic constraints to inference..."}
          {currentIndex === 4 && "Simulating environmental variables..."}
          {currentIndex === 5 && "Validating output against symbolic rules..."}
          {currentIndex === 6 && "Refining response consistency matrix..."}
          {currentIndex === 7 && "Finalizing result serialization..."}
        </div>
      </div>
    </div>
  );
}
