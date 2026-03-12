'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Sparkles, Plane } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

const predefinedResponses: Record<string, string> = {
  'default': "I'm your Planora AI assistant. I can help you find the best times to visit destinations, suggest packing lists, or give quick travel tips! How can I assist you today?",
  'goa': "November to February is the best time to visit Goa. The weather is pleasantly cool, making it perfect for relaxing on the beaches and enjoying the vibrant nightlife.",
  'budget': "To travel on a budget, consider staying in high-rated hostels, eating local street food, and using public transport like buses or trains instead of domestic flights.",
  'packing': "Always pack versatile clothing, a universal power adapter, comfortable walking shoes, and a basic first-aid kit. Don't forget copies of important documents!",
  'visa': "Visa requirements depend on your passport and destination. Always check the official embassy website of the country you plan to visit at least two months in advance."
};

const getResponse = (query: string) => {
  const lowerQuery = query.toLowerCase();
  for (const [key, response] of Object.entries(predefinedResponses)) {
    if (key !== 'default' && lowerQuery.includes(key)) {
      return response;
    }
  }
  return predefinedResponses['default'];
};

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', role: 'assistant', content: predefinedResponses['default'] }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Simulate AI delay
    setTimeout(() => {
      const responseContent = getResponse(userMsg.content);
      const aiMsg: Message = { id: (Date.now() + 1).toString(), role: 'assistant', content: responseContent };
      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-20 right-0 w-80 md:w-96 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col"
            style={{ height: '500px', maxHeight: '80vh' }}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-brand-primary to-brand-secondary p-4 flex justify-between items-center text-white">
              <div className="flex items-center gap-2">
                <div className="bg-white/20 p-1.5 rounded-lg">
                  <Sparkles size={18} />
                </div>
                <div>
                  <h3 className="font-bold text-sm">Planora AI</h3>
                  <p className="text-xs text-brand-primary-light opacity-80">Online & Ready</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="hover:bg-white/20 p-1 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {msg.role === 'assistant' && (
                    <div className="w-8 h-8 rounded-full bg-brand-primary/10 flex items-center justify-center mr-2 flex-shrink-0">
                       <Plane size={14} className="text-brand-primary -rotate-45" />
                    </div>
                  )}
                  <div 
                    className={`max-w-[75%] p-3 rounded-2xl text-sm ${
                      msg.role === 'user' 
                        ? 'bg-brand-primary text-white rounded-br-sm shadow-md shadow-brand-primary/20' 
                        : 'bg-white text-gray-700 rounded-bl-sm shadow-sm border border-gray-100'
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
              {isTyping && (
                 <div className="flex justify-start">
                    <div className="w-8 h-8 rounded-full bg-brand-primary/10 flex items-center justify-center mr-2 flex-shrink-0">
                       <Plane size={14} className="text-brand-primary -rotate-45" />
                    </div>
                    <div className="bg-white p-3 rounded-2xl rounded-bl-sm shadow-sm border border-gray-100 flex items-center gap-1">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                 </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white border-t border-gray-100">
              <form 
                onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                className="flex gap-2"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask a travel question..."
                  className="flex-1 bg-gray-50 border border-gray-200 rounded-full px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary transition-all text-gray-800"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isTyping}
                  className="bg-brand-primary hover:bg-brand-primary/90 disabled:opacity-50 disabled:hover:bg-brand-primary text-white p-2.5 rounded-full transition-colors flex items-center justify-center shadow-lg shadow-brand-primary/20"
                >
                  <Send size={18} />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`${isOpen ? 'bg-gray-900 shadow-gray-900/20' : 'bg-gradient-to-r from-brand-primary to-brand-secondary shadow-brand-primary/30'} text-white p-4 rounded-full shadow-2xl hover:scale-105 transition-all duration-300 flex items-center justify-center`}
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </button>
    </div>
  );
}
