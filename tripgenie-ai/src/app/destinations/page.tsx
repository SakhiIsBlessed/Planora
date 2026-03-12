'use client';

import { motion } from 'framer-motion';
import { MapPin, Star } from 'lucide-react';
import Link from 'next/link';

const destinations = [
  {
    name: "Paris, France",
    image: "https://images.unsplash.com/photo-1502602868884-2af8d4928d32?q=80&w=2670&auto=format&fit=crop",
    rating: 4.9,
    snippet: "The city of light, romance, and unparalleled art."
  },
  {
    name: "Kyoto, Japan",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=2670&auto=format&fit=crop",
    rating: 4.8,
    snippet: "Discover ancient temples, geishas, and stunning gardens."
  },
  {
    name: "Santorini, Greece",
    image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=2574&auto=format&fit=crop",
    rating: 4.9,
    snippet: "Breathtaking sunsets viewing the Aegean sea from the caldera."
  },
  {
    name: "Machu Picchu, Peru",
    image: "https://images.unsplash.com/photo-1587595431973-160d0d94add1?q=80&w=2676&auto=format&fit=crop",
    rating: 5.0,
    snippet: "Explore the ancient Incan citadel set high in the Andes."
  },
  {
    name: "Banff, Canada",
    image: "https://images.unsplash.com/photo-1585553616435-2dc0a54e271d?q=80&w=2574&auto=format&fit=crop",
    rating: 4.8,
    snippet: "Crystal clear lakes surrounded by majestic snow-capped peaks."
  },
  {
    name: "Dubai, UAE",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=2670&auto=format&fit=crop",
    rating: 4.7,
    snippet: "Experience futuristic architecture and luxury shopping."
  }
];

export default function Destinations() {
  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Popular Destinations</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get inspired by our top curated travel locations. Where will Genie take you next?
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((dest, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow group relative flex flex-col h-[400px]"
            >
              <div className="h-2/3 w-full overflow-hidden border-b-4 border-blue-600 relative">
                <img
                  src={dest.image}
                  alt={dest.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1 font-semibold text-gray-800 text-sm shadow">
                  <Star size={14} className="text-orange-400 fill-orange-400" /> {dest.rating}
                </div>
              </div>
              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <MapPin size={20} className="text-blue-600" />
                  {dest.name}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">{dest.snippet}</p>
                <div className="mt-auto">
                  <Link href={`/plan-trip?dest=${encodeURIComponent(dest.name)}`} className="text-blue-600 font-semibold text-sm hover:underline flex items-center gap-1">
                    Plan Trip Here &rarr;
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}