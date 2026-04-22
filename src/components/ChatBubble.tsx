import ReactMarkdown from 'react-markdown';
import { Message } from '../types';
import { cn } from '../lib/utils';
import { User, Cpu } from 'lucide-react';
import { motion } from 'motion/react';

interface ChatBubbleProps {
  message: Message;
}

export function ChatBubble({ message }: ChatBubbleProps) {
  const isUser = message.role === 'user';

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "flex gap-6 p-8",
        !isUser && "bg-white/[0.02] border-y border-white/5"
      )}
    >
      <div className={cn(
        "w-10 h-10 rounded shrink-0 flex items-center justify-center font-bold text-xs",
        isUser ? "bg-white/5 border border-white/10 text-white" : "bg-sky-500 text-black shadow-[0_0_15px_rgba(56,189,248,0.3)]"
      )}>
        {isUser ? "USR" : "TB"}
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-2">
          <span className={cn(
            "text-xs font-mono uppercase tracking-widest",
            isUser ? "text-agent-text/60" : "text-agent-accent"
          )}>
            {isUser ? "Authorized User" : "TinyBrain-X Node"}
          </span>
          <span className="text-[10px] text-agent-muted">
            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
        
        <div className="markdown-body text-agent-text/90 leading-relaxed max-w-none">
          <ReactMarkdown>{message.content}</ReactMarkdown>
        </div>
      </div>
    </motion.div>
  );
}
