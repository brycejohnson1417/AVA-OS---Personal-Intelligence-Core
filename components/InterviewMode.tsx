import React, { useState, useEffect, useRef } from 'react';
import { Send, Globe } from 'lucide-react';
import { Message } from '../types';
import AgentCore from './AgentCore';
import { streamChatResponse } from '../services/geminiService';

interface InterviewModeProps {
  initialContext: string;
}

const InterviewMode: React.FC<InterviewModeProps> = ({ initialContext }) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messages.length === 0) {
        handleInitialLoad();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleInitialLoad = async () => {
      setIsProcessing(true);
      const tempId = Date.now();
      setMessages([{ role: 'model', content: '', timestamp: tempId }]);
      
      let fullText = "";
      await streamChatResponse(
          [], // No history yet
          `Context: ${initialContext}. \n\n Task: Initiate the session. Introduce yourself as Ava, the personal AI operating system. Acknowledge the user's workload plan and ask the first key question to clarify daily priorities or automation goals.`,
          (chunk) => {
             fullText += chunk;
             setMessages(prev => {
                 const copy = [...prev];
                 const found = copy.find(m => m.timestamp === tempId);
                 if (found) found.content = fullText;
                 return copy;
             });
          }
      );
      setIsProcessing(false);
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isProcessing) return;

    const userMsg: Message = { role: 'user', content: input, timestamp: Date.now() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsProcessing(true);

    const tempId = Date.now() + 1;
    setMessages(prev => [...prev, { role: 'model', content: '', timestamp: tempId }]);

    // Prepare history for API
    const history = messages.map(m => ({
        role: m.role,
        parts: [{ text: m.content }]
    }));

    let fullText = "";
    await streamChatResponse(
        history,
        input,
        (chunk) => {
            fullText += chunk;
            setMessages(prev => {
                const copy = [...prev];
                const found = copy.find(m => m.timestamp === tempId);
                if (found) found.content = fullText;
                return copy;
            });
        }
    );

    setIsProcessing(false);
  };

  return (
    <div className="flex flex-col h-full bg-void rounded-xl border border-white/10 overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-cyan-500 opacity-50"></div>
      
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {messages.map((msg, idx) => (
          <div key={msg.timestamp} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] rounded-2xl p-4 ${
              msg.role === 'user' 
                ? 'bg-accent-900/30 border border-accent-700/50 text-accent-50 rounded-tr-sm' 
                : 'bg-white/5 border border-white/10 text-gray-200 rounded-tl-sm'
            }`}>
              {msg.role === 'model' && idx === messages.length - 1 && isProcessing && !msg.content ? (
                 <div className="flex space-x-2 h-6 items-center">
                    <div className="w-2 h-2 bg-accent-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-accent-400 rounded-full animate-bounce delay-75"></div>
                    <div className="w-2 h-2 bg-accent-400 rounded-full animate-bounce delay-150"></div>
                 </div>
              ) : (
                <p className="whitespace-pre-wrap leading-relaxed text-sm md:text-base font-light">{msg.content}</p>
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-void border-t border-white/10">
        <div className="flex items-center gap-3 relative">
          <div className="absolute left-3 text-accent-500 animate-pulse">
            <AgentCore status={isProcessing ? 'processing' : 'idle'} size="sm" />
          </div>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your instruction or override code..."
            className="w-full bg-black/50 border border-white/20 rounded-full py-4 pl-16 pr-12 text-white focus:outline-none focus:border-accent-500 focus:ring-1 focus:ring-accent-500 transition-all font-mono text-sm"
          />
          <button 
            onClick={handleSend}
            disabled={isProcessing}
            className="absolute right-3 p-2 bg-accent-600 hover:bg-accent-500 text-white rounded-full transition-colors disabled:opacity-50"
          >
            <Send size={18} />
          </button>
        </div>
        <div className="flex justify-between items-center mt-2 px-2 text-[10px] text-gray-500 font-mono uppercase tracking-widest">
           <span><Globe size={10} className="inline mr-1" /> End-to-End Encrypted</span>
           <span>AVA OS v2.0 • Build ID: 94-AE-3F</span>
        </div>
      </div>
    </div>
  );
};

export default InterviewMode;
