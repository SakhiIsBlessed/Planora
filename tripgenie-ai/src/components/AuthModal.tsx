'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, User, Github } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: () => void;
}

export default function AuthModal({ isOpen, onClose, onLogin }: AuthModalProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login/signup logic
    if (email && password) {
      onLogin();
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={onClose}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-[2rem] shadow-2xl w-full max-w-md overflow-hidden relative"
            >
              <button 
                onClick={onClose}
                className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors z-10"
              >
                <X size={20} />
              </button>

              <div className="p-8 md:p-10">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-black text-gray-900 mb-2 tracking-tight">
                    {isLogin ? 'Welcome back' : 'Create an account'}
                  </h2>
                  <p className="text-gray-500 font-medium">
                    {isLogin ? 'Enter your details to access your trips.' : 'Start planning your dream trips with AI.'}
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {!isLogin && (
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">Full Name</label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl focus:ring-2 focus:ring-brand-primary focus:border-brand-primary block pl-11 p-3 transition-colors outline-none"
                          placeholder="John Doe"
                        />
                      </div>
                    </div>
                  )}
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl focus:ring-2 focus:ring-brand-primary focus:border-brand-primary block pl-11 p-3 transition-colors outline-none"
                        placeholder="you@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Password</label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                      <input
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl focus:ring-2 focus:ring-brand-primary focus:border-brand-primary block pl-11 p-3 transition-colors outline-none"
                        placeholder="••••••••"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-brand-primary hover:bg-brand-primary/90 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-brand-primary/20 transition-all active:scale-[0.98] mt-2"
                  >
                    {isLogin ? 'Sign In' : 'Sign Up'}
                  </button>
                </form>

                <div className="mt-6 flex items-center justify-center gap-2">
                  <div className="h-px bg-gray-200 flex-1" />
                  <span className="text-sm font-semibold text-gray-400 px-2">OR</span>
                  <div className="h-px bg-gray-200 flex-1" />
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  <button type="button" className="flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-200 hover:bg-gray-50 rounded-xl font-semibold text-gray-700 transition-colors">
                    <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" alt="Google" />
                    Google
                  </button>
                  <button type="button" className="flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-200 hover:bg-gray-50 rounded-xl font-semibold text-gray-700 transition-colors">
                    <Github size={18} />
                    GitHub
                  </button>
                </div>

                <p className="mt-8 text-center text-sm text-gray-500 font-medium">
                  {isLogin ? "Don't have an account? " : "Already have an account? "}
                  <button 
                    onClick={() => setIsLogin(!isLogin)}
                    className="text-brand-primary font-bold hover:underline"
                  >
                    {isLogin ? 'Sign up' : 'Sign in'}
                  </button>
                </p>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
