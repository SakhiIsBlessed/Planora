'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mountain, Waves, Building2, Landmark, MapPin } from 'lucide-react';

const categories = [
  { id: 'mountains', name: 'Mountains', icon: Mountain },
  { id: 'beaches', name: 'Beaches', icon: Waves },
  { id: 'cities', name: 'Cities', icon: Building2 },
  { id: 'historical', name: 'Historical', icon: Landmark },
];

const galleryData: Record<string, { title: string; location: string; image: string }[]> = {
  mountains: [
    { title: 'Swiss Alps', location: 'Switzerland', image: 'https://images.unsplash.com/photo-1531366936337-7c912a458b66?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    { title: 'Banff National Park', location: 'Canada', image: 'https://images.unsplash.com/photo-1608272765108-62a22d3e34b1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    { title: 'Mount Fuji', location: 'Japan', image: 'https://images.unsplash.com/photo-1490806840056-e74672520418?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    { title: 'The Dolomites', location: 'Italy', image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  ],
  beaches: [
    { title: 'Maldives', location: 'Indian Ocean', image: 'https://images.unsplash.com/photo-1514282401047-d15314365091?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    { title: 'Bora Bora', location: 'French Polynesia', image: 'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    { title: 'Amalfi Coast', location: 'Italy', image: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    { title: 'Maui', location: 'Hawaii, USA', image: 'https://images.unsplash.com/photo-1542259009477-d625272157b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  ],
  cities: [
    { title: 'Tokyo', location: 'Japan', image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    { title: 'New York City', location: 'USA', image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    { title: 'Paris', location: 'France', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    { title: 'Dubai', location: 'UAE', image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  ],
  historical: [
    { title: 'Machu Picchu', location: 'Peru', image: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    { title: 'Colosseum', location: 'Rome, Italy', image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    { title: 'Taj Mahal', location: 'India', image: 'https://images.unsplash.com/photo-1564507592208-02df59530444?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    { title: 'Pyramids of Giza', location: 'Egypt', image: 'https://images.unsplash.com/photo-1539650116574-8efeb43e2b08?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  ],
};

export default function InspirationGallery() {
  const [activeTab, setActiveTab] = useState('mountains');

  return (
    <section className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex justify-center items-center p-2 bg-brand-primary/10 rounded-2xl text-brand-primary mb-4 px-4"
          >
            <span className="font-bold text-sm tracking-wide uppercase">Travel Inspiration</span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-black text-gray-900 mb-6"
          >
            Discover Your Next Adventure
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-500 max-w-2xl mx-auto"
          >
            Explore breathtaking destinations handpicked by our travel experts. 
            Find the perfect backdrop for your upcoming AI-planned journey.
          </motion.p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => {
            const Icon = category.icon;
            const isActive = activeTab === category.id;
            return (
              <button
                key={category.id}
                onClick={() => setActiveTab(category.id)}
                className={`relative flex items-center gap-2 px-6 py-3 rounded-full font-bold transition-all duration-300 ${
                  isActive 
                    ? 'text-white shadow-lg shadow-brand-primary/30 scale-105' 
                    : 'bg-gray-50 text-gray-500 hover:bg-gray-100'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="gallery-tab"
                    className="absolute inset-0 bg-brand-primary rounded-full -z-10"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
                <Icon size={18} />
                <span>{category.name}</span>
              </button>
            );
          })}
        </div>

        {/* Gallery Grid */}
        <div className="overflow-hidden min-h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {galleryData[activeTab].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="group relative h-80 rounded-3xl overflow-hidden cursor-pointer shadow-md hover:shadow-xl transition-all duration-500"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/20 to-transparent" />
                  
                  <div className="absolute bottom-0 left-0 p-6 w-full translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                    <div className="flex items-center gap-1.5 text-gray-300 text-sm font-medium">
                      <MapPin size={14} className="text-brand-accent" />
                      <span>{item.location}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
