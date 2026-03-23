'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Star, Wifi, Car, Dumbbell, Utensils, Waves, MapPin, DollarSign, Filter, ExternalLink, Heart, ChevronDown, BedDouble } from 'lucide-react';

interface Hotel {
  id: number;
  name: string;
  type: string;
  stars: number;
  rating: number;
  reviews: number;
  pricePerNight: number;
  image: string;
  location: string;
  amenities: string[];
  description: string;
  badge?: string;
}

const HOTEL_DB: Record<string, Hotel[]> = {
  pune: [
    { id: 1, name: 'JW Marriott Hotel Pune', type: 'Luxury', stars: 5, rating: 4.7, reviews: 3241, pricePerNight: 12000, image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=80', location: 'Senapati Bapat Road, Pune', amenities: ['WiFi', 'Pool', 'Gym', 'Restaurant', 'Spa', 'Parking'], description: 'An iconic 5-star luxury hotel with world-class amenities set in the heart of Pune.', badge: 'Most Popular' },
    { id: 2, name: 'The O Hotel', type: 'Boutique', stars: 4, rating: 4.5, reviews: 1892, pricePerNight: 7500, image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=600&q=80', location: 'Koregaon Park, Pune', amenities: ['WiFi', 'Pool', 'Restaurant', 'Bar', 'Parking'], description: 'A stylish boutique hotel in the trendy Koregaon Park neighbourhood.' },
    { id: 3, name: 'Hyatt Regency Pune', type: 'Luxury', stars: 5, rating: 4.6, reviews: 2104, pricePerNight: 9500, image: 'https://images.unsplash.com/photo-1561501900-3701fa6a0864?w=600&q=80', location: 'Nagar Road, Pune', amenities: ['WiFi', 'Pool', 'Gym', 'Restaurant', 'Spa'], description: 'Luxurious rooms with panoramic city views and an exceptional dining experience.', badge: 'Top Rated' },
    { id: 4, name: 'Zostel Pune', type: 'Hostel', stars: 2, rating: 4.2, reviews: 876, pricePerNight: 800, image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=600&q=80', location: 'Koregaon Park, Pune', amenities: ['WiFi', 'Common Kitchen', 'Locker'], description: 'A vibrant backpacker hostel with a great community vibe and comfortable dorms.', badge: 'Best Value' },
    { id: 5, name: 'Lemon Tree Hotel', type: 'Mid Range', stars: 3, rating: 4.3, reviews: 1432, pricePerNight: 3500, image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=600&q=80', location: 'Baner, Pune', amenities: ['WiFi', 'Restaurant', 'Gym', 'Parking'], description: 'Modern, comfortable hotel with excellent breakfast and easy city access.' },
  ],
  goa: [
    { id: 1, name: 'Taj Exotica Resort & Spa', type: 'Luxury', stars: 5, rating: 4.8, reviews: 4211, pricePerNight: 22000, image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&q=80', location: 'Benaulim Beach, Goa', amenities: ['WiFi', 'Pool', 'Gym', 'Restaurant', 'Spa', 'Beach Access'], description: 'An exclusive resort facing the Arabian Sea with colonial-era inspired architecture.', badge: 'Most Popular' },
    { id: 2, name: 'Cidade de Goa', type: 'Resort', stars: 5, rating: 4.6, reviews: 3102, pricePerNight: 14000, image: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=600&q=80', location: 'Dona Paula, Goa', amenities: ['WiFi', 'Pool', 'Gym', 'Restaurant', 'Beach Access'], description: 'A stunning resort with Portuguese architecture overlooking a pristine beach.', badge: 'Top Rated' },
    { id: 3, name: 'Zostel Goa (Palolem)', type: 'Hostel', stars: 2, rating: 4.4, reviews: 1243, pricePerNight: 900, image: 'https://images.unsplash.com/photo-1549638441-b787d2e11f14?w=600&q=80', location: 'Palolem Beach, Goa', amenities: ['WiFi', 'Common Area', 'Bar'], description: 'The perfect base for backpackers looking to explore south Goa\'s beautiful beaches.', badge: 'Best Value' },
  ],
  tokyo: [
    { id: 1, name: 'The Peninsula Tokyo', type: 'Luxury', stars: 5, rating: 4.9, reviews: 5423, pricePerNight: 45000, image: 'https://images.unsplash.com/photo-1590073242678-70ee3fc28f8a?w=600&q=80', location: 'Chiyoda City, Tokyo', amenities: ['WiFi', 'Pool', 'Gym', 'Restaurant', 'Spa', 'Concierge'], description: 'Iconic luxury at the heart of Tokyo with stunning views and impeccable service.', badge: 'Most Popular' },
    { id: 2, name: 'Hyatt Regency Tokyo', type: 'Luxury', stars: 5, rating: 4.6, reviews: 3201, pricePerNight: 28000, image: 'https://images.unsplash.com/photo-1563911302283-d2bc129e7570?w=600&q=80', location: 'Shinjuku, Tokyo', amenities: ['WiFi', 'Pool', 'Gym', 'Restaurant', 'Bar'], description: 'A premium 5-star hotel in Shinjuku with easy access to major attractions.' },
    { id: 3, name: 'Khaosan Tokyo Origami', type: 'Hostel', stars: 3, rating: 4.5, reviews: 1876, pricePerNight: 3000, image: 'https://images.unsplash.com/photo-1595578041649-4eb4e7cd9be9?w=600&q=80', location: 'Asakusa, Tokyo', amenities: ['WiFi', 'Locker', 'Common Kitchen'], description: 'Trendy hostel in historic Asakusa blending traditional Japan with modern comfort.', badge: 'Best Value' },
  ],
  mahabaleshwar: [
    { id: 1, name: 'Le Méridien Resort & Spa', type: 'Luxury', stars: 5, rating: 4.7, reviews: 2105, pricePerNight: 15000, image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600&q=80', location: 'Mahabaleshwar, Maharashtra', amenities: ['WiFi', 'Pool', 'Spa', 'Restaurant', 'Gym'], description: 'A luxury mountain resort with sweeping views of the Sahyadri mountain range.', badge: 'Most Popular' },
    { id: 2, name: 'Bella Vista Resort', type: 'Resort', stars: 4, rating: 4.5, reviews: 1321, pricePerNight: 8000, image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&q=80', location: 'Mahabaleshwar, Maharashtra', amenities: ['WiFi', 'Pool', 'Restaurant', 'Parking'], description: 'Cozy resort with beautiful valley views and fresh mountain air.' },
  ],
};

const FALLBACK_HOTELS = (dest: string): Hotel[] => [
  { id: 1, name: `Grand ${dest} Luxury Resort`, type: 'Luxury', stars: 5, rating: 4.6, reviews: 1850, pricePerNight: 10000, image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=80', location: `City Center, ${dest}`, amenities: ['WiFi', 'Pool', 'Gym', 'Restaurant', 'Spa'], description: `A premium 5-star luxury hotel in the heart of ${dest} with world-class amenities.`, badge: 'Most Popular' },
  { id: 2, name: `${dest} Boutique Hotel`, type: 'Boutique', stars: 4, rating: 4.4, reviews: 940, pricePerNight: 5000, image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=600&q=80', location: `Downtown, ${dest}`, amenities: ['WiFi', 'Restaurant', 'Bar', 'Parking'], description: `A stylish boutique hotel with curated art and a welcoming atmosphere in ${dest}.` },
  { id: 3, name: `${dest} Comfort Inn`, type: 'Mid Range', stars: 3, rating: 4.2, reviews: 720, pricePerNight: 2500, image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=600&q=80', location: `${dest}`, amenities: ['WiFi', 'Restaurant', 'Parking'], description: 'A comfortable mid-range hotel with easy access to local attractions.', badge: 'Best Value' },
  { id: 4, name: `${dest} Backpackers Hostel`, type: 'Hostel', stars: 2, rating: 4.1, reviews: 430, pricePerNight: 700, image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=600&q=80', location: `${dest}`, amenities: ['WiFi', 'Locker', 'Common Kitchen'], description: 'An affordable and friendly hostel, perfect for budget-conscious travelers.' },
];

const amenityIcons: Record<string, React.ReactNode> = {
  'WiFi': <Wifi size={12} />,
  'Pool': <Waves size={12} />,
  'Gym': <Dumbbell size={12} />,
  'Restaurant': <Utensils size={12} />,
  'Parking': <Car size={12} />,
  'Spa': <Heart size={12} />,
};

const FILTERS = ['All', 'Luxury', 'Boutique', 'Resort', 'Mid Range', 'Hostel'];
const SORT_OPTIONS = ['Recommended', 'Price: Low', 'Price: High', 'Rating'];

export default function HotelFinderModal({ destination, budget, days, onClose }: {
  destination: string;
  budget: number;
  days: number;
  onClose: () => void;
}) {
  const [activeFilter, setActiveFilter] = useState('All');
  const [sortBy, setSortBy] = useState('Recommended');
  const [savedHotels, setSavedHotels] = useState<number[]>([]);
  const [showSortDropdown, setShowSortDropdown] = useState(false);

  const destKey = destination.toLowerCase().split(' ')[0];
  const hotelsForDest = HOTEL_DB[destKey] || FALLBACK_HOTELS(destination);

  const budgetPerNight = budget / days;

  let filtered = hotelsForDest.filter(h => activeFilter === 'All' || h.type === activeFilter);

  if (sortBy === 'Price: Low') filtered = [...filtered].sort((a, b) => a.pricePerNight - b.pricePerNight);
  else if (sortBy === 'Price: High') filtered = [...filtered].sort((a, b) => b.pricePerNight - a.pricePerNight);
  else if (sortBy === 'Rating') filtered = [...filtered].sort((a, b) => b.rating - a.rating);

  const toggleSave = (id: number) => {
    setSavedHotels(prev => prev.includes(id) ? prev.filter(h => h !== id) : [...prev, id]);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden"
        >
          {/* Header */}
          <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between flex-shrink-0">
            <div>
              <h2 className="text-2xl font-black text-gray-900 flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-brand-primary flex items-center justify-center text-white"><BedDouble size={16} /></span>
                Hotels in {destination}
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Your budget: <span className="font-bold text-brand-primary">₹{budgetPerNight.toLocaleString()}/night</span> &middot; {filtered.length} options found
              </p>
            </div>
            <button onClick={onClose} className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 transition">
              <X size={18} />
            </button>
          </div>

          {/* Filters & Sort Bar */}
          <div className="px-6 py-3 border-b border-gray-100 flex items-center gap-3 flex-wrap flex-shrink-0 bg-gray-50/80">
            <Filter size={14} className="text-gray-400 flex-shrink-0" />
            <div className="flex gap-2 flex-wrap">
              {FILTERS.map(f => (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition ${activeFilter === f ? 'bg-brand-primary text-white shadow-sm' : 'bg-white text-gray-600 border border-gray-200 hover:border-brand-primary hover:text-brand-primary'}`}
                >
                  {f}
                </button>
              ))}
            </div>
            <div className="ml-auto relative">
              <button
                onClick={() => setShowSortDropdown(!showSortDropdown)}
                className="flex items-center gap-1 text-xs font-bold text-gray-600 bg-white border border-gray-200 px-3 py-1.5 rounded-lg hover:border-brand-primary hover:text-brand-primary transition"
              >
                Sort: {sortBy} <ChevronDown size={12} />
              </button>
              {showSortDropdown && (
                <div className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg z-10 overflow-hidden">
                  {SORT_OPTIONS.map(o => (
                    <button key={o} onClick={() => { setSortBy(o); setShowSortDropdown(false); }}
                      className={`block w-full text-left text-xs font-semibold px-4 py-2.5 hover:bg-gray-50 transition ${sortBy === o ? 'text-brand-primary' : 'text-gray-700'}`}>
                      {o}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Hotel Cards */}
          <div className="overflow-y-auto flex-1 p-6 space-y-4">
            {filtered.length === 0 && (
              <div className="text-center py-20 text-gray-400">
                <BedDouble size={48} className="mx-auto mb-4 opacity-30" />
                <p className="font-bold text-lg">No hotels for this filter</p>
              </div>
            )}
            {filtered.map((hotel, i) => {
              const isAffordable = hotel.pricePerNight <= budgetPerNight;
              const isSaved = savedHotels.includes(hotel.id);
              return (
                <motion.div
                  key={hotel.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 }}
                  className="border border-gray-200 rounded-2xl overflow-hidden hover:shadow-md transition flex flex-col md:flex-row group"
                >
                  {/* Image */}
                  <div className="relative w-full md:w-52 h-44 md:h-auto flex-shrink-0 overflow-hidden">
                    <img src={hotel.image} alt={hotel.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                    {hotel.badge && (
                      <span className="absolute top-3 left-3 bg-brand-primary text-white text-[10px] font-black px-2 py-1 rounded-lg shadow">
                        {hotel.badge}
                      </span>
                    )}
                    <button
                      onClick={() => toggleSave(hotel.id)}
                      className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition shadow ${isSaved ? 'bg-rose-500 text-white' : 'bg-white text-gray-400 hover:text-rose-500'}`}
                    >
                      <Heart size={15} fill={isSaved ? 'white' : 'none'} />
                    </button>
                  </div>

                  {/* Info */}
                  <div className="flex-grow p-5 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-widest text-brand-primary bg-brand-primary/10 px-2 py-0.5 rounded-md">{hotel.type}</span>
                          <h3 className="font-black text-gray-900 text-lg mt-1">{hotel.name}</h3>
                          <div className="flex items-center gap-1 text-amber-400 mt-0.5">
                            {Array.from({ length: 5 }).map((_, s) => (
                              <Star key={s} size={12} fill={s < hotel.stars ? 'currentColor' : 'none'} />
                            ))}
                            <span className="text-xs text-gray-500 ml-1 font-semibold">{hotel.rating} ({hotel.reviews.toLocaleString()} reviews)</span>
                          </div>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <p className={`text-2xl font-black ${isAffordable ? 'text-green-600' : 'text-rose-500'}`}>₹{hotel.pricePerNight.toLocaleString()}</p>
                          <p className="text-xs text-gray-400 font-medium">per night</p>
                          {!isAffordable && <p className="text-[10px] text-rose-400 font-bold mt-0.5">Over budget</p>}
                          {isAffordable && <p className="text-[10px] text-green-500 font-bold mt-0.5">Within budget ✓</p>}
                        </div>
                      </div>

                      <p className="text-sm text-gray-500 mt-2">{hotel.description}</p>

                      <div className="flex items-center gap-1 text-gray-400 mt-2 text-xs">
                        <MapPin size={12} />
                        <span>{hotel.location}</span>
                      </div>

                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {hotel.amenities.map(am => (
                          <span key={am} className="flex items-center gap-1 text-[11px] font-semibold text-gray-500 bg-gray-100 px-2 py-1 rounded-lg">
                            {amenityIcons[am] || null} {am}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center gap-3 mt-4 pt-4 border-t border-gray-100">
                      <button className="flex-1 bg-brand-primary hover:brightness-110 text-white font-bold text-sm py-2.5 rounded-xl transition flex items-center justify-center gap-2">
                        Book Now <ExternalLink size={14} />
                      </button>
                      <button className="px-4 py-2.5 border border-gray-200 text-gray-600 hover:border-brand-primary hover:text-brand-primary font-bold text-sm rounded-xl transition">
                        View Details
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
