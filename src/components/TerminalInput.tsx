import { useState, useRef, useEffect } from 'react';
import { Send, Terminal } from 'lucide-react';

interface TerminalInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

export function TerminalInput({ onSend, disabled }: TerminalInputProps) {
  const [input, setInput] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (input.trim() && !disabled) {
      onSend(input.trim());
      setInput('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  }, [input]);

  return (
    <form onSubmit={handleSubmit} className="relative group glass rounded-xl focus-within:border-agent-accent/50 transition-all p-2 neon-glow">
      <div className="absolute left-4 top-4 text-agent-accent">
        <Terminal size={18} />
      </div>
      <textarea
        ref={textareaRef}
        rows={1}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Enter neural command or query..."
        disabled={disabled}
        className="w-full bg-transparent border-none focus:ring-0 text-agent-text placeholder:text-slate-600 py-3 pl-12 pr-14 resize-none min-h-[52px] font-mono text-sm custom-scrollbar"
      />
      <button
        type="submit"
        disabled={!input.trim() || disabled}
        className="absolute right-2 bottom-2 w-10 h-10 flex items-center justify-center rounded-lg bg-sky-500 text-black hover:bg-sky-400 disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-[0_0_15px_rgba(56,189,248,0.4)]"
      >
        <Send size={18} />
      </button>
    </form>
  );
}
