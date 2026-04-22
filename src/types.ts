export type MessageRole = 'user' | 'agent';

export interface Message {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: Date;
  isThinking?: boolean;
}

export type ThinkingStep = 
  | 'UNDERSTAND'
  | 'DECOMPOSE'
  | 'PLAN'
  | 'REASON'
  | 'ACT'
  | 'OBSERVE'
  | 'REFINE'
  | 'RESPOND'
  | 'COMPLETE';

export const THINKING_STEPS: ThinkingStep[] = [
  'UNDERSTAND',
  'DECOMPOSE',
  'PLAN',
  'REASON',
  'ACT',
  'OBSERVE',
  'REFINE',
  'RESPOND',
];
