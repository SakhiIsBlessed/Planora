'use client';

import { motion } from 'framer-motion';
import { Sparkles, Brain, Code, Globe2 } from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-blue-600 pt-32 pb-20 px-4 text-center">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="max-w-4xl mx-auto text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About Planora</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            We are revolutionizing the way the world travels using the power of Artificial Intelligence.
          </p>
        </motion.div>
      </section>

      {/* Content */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                Travel planning used to mean spending hours reading reviews, cross-referencing maps, and managing complex spreadsheets. At Planora, we believe your vacation should start the moment you decide to travel.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                By leveraging advanced AI models, we analyze millions of data points to generate personalized, optimized, and budget-friendly itineraries in seconds.
              </p>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-blue-50 rounded-3xl p-8 flex items-center justify-center h-80 relative overflow-hidden">
              <div className="absolute top-10 left-10 p-4 bg-white rounded-2xl shadow-lg rotate-[-10deg]"><Globe2 className="text-blue-500" size={48} /></div>
              <div className="absolute bottom-10 right-10 p-4 bg-white rounded-2xl shadow-lg rotate-[10deg]"><Sparkles className="text-purple-500" size={48} /></div>
              <div className="z-10 text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">1,000,000+</h3>
                <p className="text-gray-600 font-medium">Itineraries Generated</p>
              </div>
            </motion.div>
          </div>

          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-12">How it works</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4"><Brain size={32} /></div>
                <h3 className="text-xl font-bold mb-2 text-gray-800">1. Intelligent Analysis</h3>
                <p className="text-gray-600">Our LLM assesses your destination, days, and budget constraints.</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mb-4"><Code size={32} /></div>
                <h3 className="text-xl font-bold mb-2 text-gray-800">2. Route Optimization</h3>
                <p className="text-gray-600">Algorithms map out the most logical geographical routes day by day.</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4"><Sparkles size={32} /></div>
                <h3 className="text-xl font-bold mb-2 text-gray-800">3. Curated Experience</h3>
                <p className="text-gray-600">You get a beautifully formatted, ready-to-use travel itinerary.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}