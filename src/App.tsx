import { useState, useRef, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { ChatBubble } from './components/ChatBubble';
import { TerminalInput } from './components/TerminalInput';
import { ThinkingIndicator } from './components/ThinkingIndicator';
import { Message, ThinkingStep, THINKING_STEPS } from './types';
import { askTinyBrain } from './services/geminiService';
import { Cpu, Maximize2, ShieldCheck, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'agent',
      content: "[TINYBRAIN-X CORE NODE v3]\n\n### 🧠 UNDERSTANDING: SYSTEM_WARM_BOOT\nNodes active. Memory indexing... [84%]. Secure kernel monitors established.\n\n### 🧩 PLAN:\n- Step 1: Initializing priority scheduling.\n- Step 2: Mapping semantic retrieval bridges.\n\n### 📈 EVALUATION:\n- Accuracy: 0.92\n- Efficiency: 0.88\n- Depth: shallow\n\n### ⚡ SYSTEM STATUS:\n- Memory Usage: LOW\n- Execution Depth: shallow\n- Confidence: 94%\n- Retry Count: 0\n- Next Action: STANDBY",
      timestamp: new Date(),
    }
  ]);
  const [isThinking, setIsThinking] = useState(false);
  const [thinkingStep, setThinkingStep] = useState<ThinkingStep>('UNDERSTAND');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [messages, isThinking]);

  const simulateThinking = async () => {
    for (const step of THINKING_STEPS) {
      setThinkingStep(step as ThinkingStep);
      await new Promise(resolve => setTimeout(resolve, 600 + Math.random() * 800));
    }
  };

  const handleSend = async (content: string) => {
    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMsg]);
    setIsThinking(true);
    
    try {
      // Start thinking simulation while waiting for API
      const thinkingPromise = simulateThinking();
      
      const history = messages.map(m => ({
        role: (m.role === 'user' ? 'user' : 'model') as 'user' | 'model',
        parts: [{ text: m.content }]
      }));
      
      const aiResponse = await askTinyBrain(content, history);
      
      // Wait for thinking simulation to finish at least once
      await thinkingPromise;
      
      const agentMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'agent',
        content: aiResponse || "SYSTEM ERROR: Null response from neural core.",
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, agentMsg]);
    } catch (error) {
      console.error(error);
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'agent',
        content: `### 📊 Result\n**INTERNAL SYSTEM ERROR**\n\nNeural link severed. Details: ${error instanceof Error ? error.message : 'Unknown exception'}.`,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsThinking(false);
    }
  };

  return (
    <div className="flex h-screen bg-agent-bg text-agent-text overflow-hidden font-sans">
      <Sidebar />
      
      <main className="flex-1 flex flex-col relative overflow-hidden p-4 gap-4">
        {/* Header bar */}
        <header className="h-16 shrink-0 flex items-center justify-between px-8 glass rounded-xl z-10">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-3">
              <div className="status-pulse" />
              <span className="text-xs text-slate-300 font-medium">SYSTEM: ACTIVE</span>
            </div>
            
            <div className="h-4 w-px bg-white/10" />
            
            <div className="flex flex-col items-end">
              <span className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Memory Utilization</span>
              <div className="w-32 h-1.5 bg-slate-800 rounded-full mt-1 overflow-hidden">
                <div className="bg-sky-500 h-full w-[42%] shadow-[0_0_8px_rgba(14,165,233,0.5)]"></div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Zap size={14} className="text-yellow-500 fill-yellow-500 animate-pulse" />
              <span className="text-[10px] font-mono font-bold tracking-widest text-slate-400">PRIORITY_QUEUE: HIGH</span>
            </div>
            <div className="h-4 w-px bg-white/10" />
            <div className="flex items-center gap-2">
              <ShieldCheck size={14} className="text-agent-accent" />
              <span className="text-[10px] font-mono font-bold tracking-widest text-slate-400">ENCRYPTION: AES-256</span>
            </div>
            <button className="p-2 text-slate-500 hover:text-white transition-colors">
              <Maximize2 size={16} />
            </button>
          </div>
        </header>

        {/* Message area */}
        <div 
          ref={scrollRef}
          className="flex-1 overflow-y-auto custom-scrollbar border-gradient rounded-xl relative"
        >
          <div className="max-w-4xl mx-auto py-8">
            <AnimatePresence initial={false}>
              {messages.map((message) => (
                <ChatBubble key={message.id} message={message} />
              ))}
              
              {isThinking && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="px-6 py-2"
                >
                  <ThinkingIndicator currentStep={thinkingStep} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="sticky bottom-0 h-24 bg-gradient-to-t from-agent-bg to-transparent pointer-events-none" />
        </div>

        {/* Backdrop decorations */}
        <div className="absolute inset-0 pointer-events-none opacity-10 overflow-hidden">
          <div className="absolute top-1/4 -right-20 w-80 h-80 bg-agent-accent/20 blur-[120px] rounded-full" />
          <div className="absolute bottom-1/4 -left-20 w-80 h-80 bg-indigo-500/10 blur-[120px] rounded-full" />
        </div>

        {/* Input area */}
        <div className="shrink-0 p-2">
          <div className="max-w-4xl mx-auto">
            <TerminalInput onSend={handleSend} disabled={isThinking} />
            <p className="mt-3 text-center text-[10px] text-slate-500 font-mono tracking-tight uppercase">
              Communications Encrypted // Kernel Monitored Session
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
