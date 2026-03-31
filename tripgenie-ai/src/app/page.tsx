'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Map, Plane } from 'lucide-react';

export default function Home() {
  const router = useRouter();
  const [isFlying, setIsFlying] = useState(false);

  const handleStartPlanning = () => {
    setIsFlying(true);
    setTimeout(() => {
      router.push('/plan-trip');
    }, 1500); // Wait for the animation to complete before navigating
  };

  return (
    <div className="min-h-screen bg-brand-bg flex flex-col items-center justify-center font-sans relative overflow-hidden selection:bg-brand-primary/20">
      {/* Background Image Overlay inspired by User's Sunset */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40 mix-blend-screen"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1472214103451-9374bd1c798e?q=80&w=2070&auto=format&fit=crop')" }}
      />
      
      {/* Dynamic Gradients for Sunset Vibe */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0b1a30]/80 via-[#0b1a30]/60 to-[#ff6b1a]/20 -z-10" />
      <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-[#ff6b7b]/20 rounded-full mix-blend-screen filter blur-[100px] opacity-60 animate-pulse duration-10000 -z-10" />
      <div className="absolute bottom-0 left-1/4 w-[800px] h-[800px] bg-[#ff6b1a]/20 rounded-full mix-blend-screen filter blur-[120px] opacity-50 animate-pulse duration-7000 -z-10" />

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 flex flex-col items-center text-center px-4"
      >
        <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-3xl flex items-center justify-center mb-8 shadow-2xl border border-white/20">
          <Map className="text-brand-accent w-10 h-10" />
        </div>

        <motion.h1 
          className="text-6xl md:text-8xl font-black text-white tracking-tight mb-6 drop-shadow-xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          Plan Your Trip
        </motion.h1>
        
        <motion.p 
          className="text-xl md:text-2xl text-gray-300 font-medium max-w-2xl mb-12 drop-shadow-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          Discover hidden gems, instantly craft perfect itineraries, and embark on unforgettable journeys with AI.
        </motion.p>

        <motion.button
          onClick={handleStartPlanning}
          disabled={isFlying}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="group relative inline-flex items-center justify-center gap-3 px-10 py-5 bg-gradient-to-r from-brand-primary to-brand-secondary text-white font-bold text-xl rounded-full shadow-[0_0_40px_rgba(255,107,26,0.5)] hover:shadow-[0_0_60px_rgba(255,107,123,0.6)] transition-all duration-300 overflow-hidden cursor-pointer"
        >
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
          <Sparkles className="w-6 h-6 relative z-10 text-white" />
          <span className="relative z-10">Start Planning</span>
        </motion.button>
      </motion.div>

      {/* Proper Airplane Takeoff Animation Overlay */}
      <AnimatePresence>
        {isFlying && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-black flex items-center justify-center overflow-hidden"
          >
            <motion.div
              initial={{ x: '-100vw', y: '0vh', rotate: 0, scale: 0.8 }}
              animate={{ x: '100vw', y: '0vh', rotate: 0, scale: 2 }}
              transition={{ duration: 1.5, ease: 'easeInOut', delay: 0.1 }}
              className="absolute pointer-events-none flex items-center justify-center"
            >
              {/* Massive Commercial Airplane SVG */}
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" className="w-[400px] md:w-[900px] h-auto text-white fill-current drop-shadow-[0_0_80px_rgba(255,255,255,0.8)]">
                <path d="M482.3 192c34.2 0 93.7 29 93.7 64c0 36-59.5 64-93.7 64l-116.6 0L265.2 495.9c-5.7 10-16.3 16.1-27.8 16.1l-56.2 0c-10.6 0-18.3-10.2-15.4-20.4l49-171.6L112 320 68.8 377.6c-3 4-7.8 6.4-12.8 6.4l-42 0c-7.8 0-14-6.3-14-14c0-1.3 .2-2.6 .5-3.9L32 256 .5 145.9c-.4-1.3-.5-2.6-.5-3.9c0-7.8 6.3-14 14-14l42 0c5 0 9.8 2.4 12.8 6.4L112 192l102.9 0-49-171.6C162.9 10.2 170.6 0 181.2 0l56.2 0c11.5 0 22.1 6.2 27.8 16.1L365.7 192l116.6 0z" />
              </svg>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
