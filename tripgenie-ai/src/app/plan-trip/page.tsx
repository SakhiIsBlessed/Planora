'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Calendar, DollarSign, Sparkles, Loader2, Navigation, Coffee, Sun, Cloud, Utensils, Compass, ArrowRight, Share2, Heart, CheckCircle2, BedDouble, RefreshCw, ShoppingBag, Landmark, PlusCircle, Check, Ticket } from 'lucide-react';
import HotelFinderModal from '@/components/HotelFinderModal';

const Map = dynamic(() => import('@/components/Map'), { ssr: false, loading: () => <div className="h-full w-full bg-white/10 animate-pulse rounded-2xl" /> });

function PlanTripContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const initDest = searchParams.get('dest') || '';
  const initDays = searchParams.get('days') || '';
  const initBudget = searchParams.get('budget') || '';
  const initType = searchParams.get('type') || 'Solo Traveler';
  const initVibe = searchParams.get('vibe') || 'Adventure & Explorer';

  const [destination, setDestination] = useState(initDest);
  const [days, setDays] = useState(initDays);
  const [budget, setBudget] = useState(initBudget);
  const [travelType, setTravelType] = useState(initType);
  const [vibe, setVibe] = useState(initVibe);

  const [isGenerating, setIsGenerating] = useState(!!initDest);
  const [loadingStep, setLoadingStep] = useState(0);
  const [itinerary, setItinerary] = useState<any>(null);
  const [showHotelFinder, setShowHotelFinder] = useState(false);

  // Real Geocoding Coordinates
  const [coords, setCoords] = useState<{ lat: number, lng: number } | null>(null);

  const loadingSteps = [
    "Analyzing destination popularity...",
    "Locating accurate map coordinates...",
    "Curating hidden gems and activities...",
    "Optimizing travel routes...",
    "Finalizing your personalized itinerary..."
  ];

  const generateItinerary = async () => {
    if (!destination || !days || !budget) return;
    setIsGenerating(true);
    setLoadingStep(0);
    setCoords(null);

    // Fetch real coordinates from OpenStreetMap Nominatim
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(destination)}`);
      const data = await res.json();
      if (data && data.length > 0) {
        setCoords({ lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) });
      }
    } catch (e) {
      console.warn('Geocoding failed, using fallback coordinates');
    }
  };

  useEffect(() => {
    if (initDest && initDays && initBudget && !itinerary && isGenerating && loadingStep === 0 && !coords) {
      generateItinerary();
    }
  }, [initDest, initDays, initBudget, coords]);

  useEffect(() => {
    if (isGenerating) {
      if (loadingStep < loadingSteps.length - 1) {
        const timer = setTimeout(() => {
          setLoadingStep(prev => prev + 1);
        }, 800);
        return () => clearTimeout(timer);
      } else {
        let isActive = true;
        const timer = setTimeout(async () => {
          // Fake AI Generation finished
          const numDays = parseInt(days) || 3;
          const parsedBudget = parseInt(budget) || 2000;
          const destName = destination || 'Unknown City';
          const lowerDest = destName.toLowerCase();

          // Define some mock datasets based on location
          const mockDataDb: Record<string, any> = {
            tokyo: {
              places: ['Shibuya Crossing', 'Sensō-ji Temple', 'Tokyo Skytree', 'Meiji Jingu', 'Akihabara', 'Tsukiji Outer Market'],
              restaurants: ['Sukiyabashi Jiro', 'Ichiran Ramen', 'Kyubey', 'Tonkatsu Maisen'],
              historical: ['Imperial Palace', 'Edo-Tokyo Museum', 'Asakusa Shrine'],
              shopping: ['Ginza Six', 'Takeshita Street', 'Omotesando Hills'],
              locations: [{ name: 'Shinjuku', lat: 35.6938, lng: 139.7034 }, { name: 'Shibuya', lat: 35.6580, lng: 139.7016 }, { name: 'Asakusa', lat: 35.7147, lng: 139.7966 }],
              weather: '18°C, Partly Cloudy'
            },
            paris: {
              places: ['Eiffel Tower', 'Louvre Museum', 'Seine River Cruise', 'Notre-Dame Cathedral', 'Montmartre'],
              restaurants: ['Le Jules Verne', 'Pierre Gagnaire', 'Septime', 'Epicure'],
              historical: ['Panthéon', 'Sainte-Chapelle', 'Palace of Versailles'],
              shopping: ['Champs-Élysées', 'Galeries Lafayette', 'Le Marais'],
              locations: [{ name: 'City Center', lat: 48.8566, lng: 2.3522 }, { name: 'Eiffel Tower', lat: 48.8584, lng: 2.2945 }, { name: 'Louvre', lat: 48.8606, lng: 2.3376 }],
              weather: '22°C, Sunny'
            },
            pune: {
              places: ['Shaniwar Wada', 'Aga Khan Palace', 'Dagadusheth Halwai Temple', 'Sinhagad Fort', 'Osho Ashram', 'Pataleshwar Cave Temple'],
              restaurants: ['Wadeshwar', 'Vaishali', 'Goodluck Cafe', 'Shabree', 'Kayani Bakery'],
              historical: ['Lal Mahal', 'Vishrambaug Wada', 'Kelkar Museum'],
              shopping: ['FC Road Market', 'Tulshibaug', 'Phoenix Mall'],
              locations: [{ name: 'Shivajinagar', lat: 18.5314, lng: 73.8446 }, { name: 'Koregaon Park', lat: 18.5362, lng: 73.8939 }, { name: 'Deccan Gymkhana', lat: 18.5156, lng: 73.8415 }],
              weather: '28°C, Clear Sky'
            },
            mahabaleshwar: {
              places: ['Venna Lake', 'Arthur Seat', 'Mapro Garden', 'Pratapgad Fort', 'Elephant\'s Head Point', 'Lingmala Waterfall', 'Parsi Point'],
              restaurants: ['Bagicha Corner', 'Grapevine Restaurant', 'Mapro Cafe', 'Hirkani', 'Little Italy'],
              historical: ['Pratapgad Fort', 'Krishnabai Temple', 'Mount Malcolm'],
              shopping: ['Town Bazaar', 'Mapro Outlet', 'Panchgani Market'],
              locations: [{ name: 'Market Area', lat: 17.9250, lng: 73.6558 }, { name: 'Lake Side', lat: 17.9300, lng: 73.6600 }],
              weather: '22°C, Misty & Cool'
            },
            konkan: {
              places: ['Tarkarli Beach', 'Sindhudurg Fort', 'Ganpatipule Temple', 'Ratnagiri Lighthouse', 'Murud Janjira', 'Devbag Sangam', 'Amboli Waterfalls'],
              restaurants: ['Gajalee Seafood', 'Nisarg Resort Food', 'Local Malvani Chulha', 'Konkan Katta', 'Fish Land Rathnagiri'],
              historical: ['Sindhudurg Fort', 'Vijayadurg Fort', 'Jaigad Fort', 'PadMADURG Fort'],
              shopping: ['Malvan Market', 'Ratnagiri Mango Market', 'Kudal Local Shops'],
              locations: [{ name: 'Malvan', lat: 16.0645, lng: 73.4651 }, { name: 'Ratnagiri', lat: 16.9902, lng: 73.2736 }],
              weather: '30°C, Humid & Sunny'
            },
            goa: {
              places: ['Baga Beach', 'Dudhsagar Falls', 'Basilica of Bom Jesus', 'Anjuna Beach', 'Fort Aguada', 'Chapora Fort'],
              restaurants: ['Thalassa', 'Curlies', 'Fishermans Wharf', 'Gunpowder', 'Britto\'s'],
              historical: ['Fort Aguada', 'Chapora Fort', 'Se Cathedral', 'Reis Magos Fort'],
              shopping: ['Anjuna Flea Market', 'Mapusa Friday Market', 'Arpora Night Market'],
              locations: [{ name: 'Panaji', lat: 15.4909, lng: 73.8278 }, { name: 'Baga', lat: 15.5553, lng: 73.7517 }],
              weather: '32°C, Tropical & Sunny'
            }
          };

          const travelImages = [
            'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&q=80',
            'https://images.unsplash.com/photo-1476514525f35-431014ccee59?w=800&q=80',
            'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&q=80',
            'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80',
            'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=800&q=80',
            'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=800&q=80',
            'https://images.unsplash.com/photo-1505832018823-50331d70d237?w=800&q=80',
            'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=800&q=80'
          ];

          const exactMatch = Object.keys(mockDataDb).find(k => lowerDest.includes(k.replace(' ', '')));

          let mockData;

          // Generate Map Details using the real geocoded coordinates!
          let baseLat = 34.0522;
          let baseLng = -118.2437;

          if (coords) {
            baseLat = coords.lat;
            baseLng = coords.lng;
          } else if (exactMatch) {
            baseLat = mockDataDb[exactMatch].locations[0].lat;
            baseLng = mockDataDb[exactMatch].locations[0].lng;
          }

          const dynamicLocations = [
            { name: `${destName} Center`, lat: baseLat, lng: baseLng },
            { name: `Scenic Viewpoint`, lat: baseLat + 0.015, lng: baseLng - 0.015 },
            { name: `Historical District`, lat: baseLat - 0.015, lng: baseLng + 0.015 }
          ];

          if (exactMatch) {
            mockData = mockDataDb[exactMatch];
            // Only overwrite locations if we didn't get coords dynamically
            if (!coords) mockData.locations = mockDataDb[exactMatch].locations;
            else mockData.locations = dynamicLocations;
          } else {
            mockData = {
              places: [`${destName} Historical Center`, `Mount ${destName} View`, `${destName} Museum`, `Old Town ${destName}`, `${destName} Botanical Gardens`, `${destName} Central Park`, `Hidden Gems of ${destName}`, `Art District`, `Riverfront Walk`],
              restaurants: [`The Great ${destName} Bistro`, `Local Flavors`, `Chef's Table ${destName}`, `Street Food Market`, `Boutique Cafe`, `Authentic ${destName} Dining`],
              historical: [`Old ${destName} Fort`, `Ancient Ruins of ${destName}`, `${destName} Heritage Site`, `Historic Downtown`],
              shopping: [`${destName} Grand Mall`, `Local Artisan Market`, `Downtown Shopping Street`],
              locations: dynamicLocations,
              weather: '24°C, Pleasant'
            };
          }

          const dailyBudget = parsedBudget / numDays;
          let diningLevel = 'local cafe';
          let lodgingLevel = 'standard hotel';
          let activityLevel = 'standard entry';
          let selectedHotel = `Comfort Inn ${destName} Center`;

          if (dailyBudget > 500) {
            diningLevel = 'fine dining restaurant';
            lodgingLevel = 'luxury resort';
            activityLevel = 'VIP private tour';
            selectedHotel = exactMatch === 'pune' ? 'JW Marriott Hotel Pune' : exactMatch === 'mahabaleshwar' ? 'Le Méridien Mahabaleshwar Resort' : `Grand ${destName} Luxury Resort & Spa`;
          } else if (dailyBudget < 100) {
            diningLevel = 'budget street food';
            lodgingLevel = 'hostel / budget stay';
            activityLevel = 'free public tour';
            selectedHotel = exactMatch === 'pune' ? 'Zostel Pune' : exactMatch === 'mahabaleshwar' ? 'Zostel Plus Panchgani' : `${destName} Backpackers Hostel`;
          } else if (exactMatch === 'pune') {
            selectedHotel = 'The O Hotel, Koregaon Park';
          } else if (exactMatch === 'mahabaleshwar') {
            selectedHotel = 'Bella Vista Resort';
          }

          const planData = await Promise.all(
            Array.from({ length: numDays }).map(async (_, i) => {
              const isFirstDay = i === 0;
              const isLastDay = i === numDays - 1;
              const place1 = mockData.places[(i * 2) % mockData.places.length];
              const place2 = mockData.places[(i * 2 + 1) % mockData.places.length];
              const rest1 = mockData.restaurants[(i * 2) % mockData.restaurants.length];
              const rest2 = mockData.restaurants[(i * 2 + 1) % mockData.restaurants.length];

              let activities = [];
              if (isFirstDay) {
                activities = [
                  { 
                    time: '02:00 PM', 
                    title: `Check-in at ${selectedHotel}`,
                    desc: `Arrival and check-in. Settle into your room.`, 
                    type: 'activity', 
                    isSwappable: false 
                  },
                  { 
                    time: '04:30 PM', 
                    title: mockData.locations[0].name,
                    desc: `Light stroll around ${mockData.locations[0].name} and acclimate to the vibe.`, 
                    type: 'activity', 
                    isSwappable: true 
                  },
                  { 
                    time: '07:30 PM', 
                    title: `Dinner at ${rest1}`,
                    desc: `Welcome Dinner (${diningLevel})`, 
                    type: 'food', 
                    isSwappable: true 
                  }
                ];
              } else if (isLastDay && numDays > 1) {
                activities = [
                  { time: '09:00 AM', title: `Breakfast near ${selectedHotel}`, desc: `Breakfast at a ${diningLevel}`, type: 'food', isSwappable: true },
                  { time: '10:30 AM', title: mockData.shopping[0], desc: `Last-minute souvenir shopping.`, type: 'activity', isSwappable: true },
                  { time: '12:00 PM', title: `Departure`, desc: `Check-out and departure. Safe travels!`, type: 'activity', isSwappable: false }
                ];
              } else {
                activities = [
                  { time: '08:30 AM', title: `Breakfast at Local Cafe`, desc: `Hearty breakfast to start the day.`, type: 'food', isSwappable: true },
                  { time: '10:00 AM', title: place1, desc: `Morning visit (${activityLevel}).`, type: 'activity', isSwappable: true },
                  { time: '01:00 PM', title: `Lunch at ${rest1}`, desc: `Lunch trying local specialties.`, type: 'food', isSwappable: true },
                  { time: '03:30 PM', title: place2, desc: `Explore the surroundings.`, type: 'activity', isSwappable: true },
                  { time: '07:00 PM', title: `Dinner at ${rest2}`, desc: `Evening dinner (${diningLevel}).`, type: 'food', isSwappable: true }
                ];
              }

              const resolvedActivities = await Promise.all(activities.map(async (act) => {
                 let fetchedImage = null;
                 if (act.type === 'activity' && act.title !== 'Departure' && !act.title.includes('Check')) {
                    try {
                      const res = await fetch(`https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(act.title)}&gsrlimit=1&prop=pageimages&pithumbsize=400&format=json&origin=*`);
                      const data = await res.json();
                      if (data?.query?.pages) {
                        const pageId = Object.keys(data.query.pages)[0];
                        const page = data.query.pages[pageId];
                        if (page.thumbnail && page.thumbnail.source) {
                          fetchedImage = page.thumbnail.source;
                        }
                      }
                    } catch (e) { }
                 }
                 const fallbackImg = act.type === 'activity' && !act.title.includes('Check') && act.title !== 'Departure' ? travelImages[(i + act.title.length) % travelImages.length] : null;
                 return { ...act, image: fetchedImage || fallbackImg };
              }));

              return {
                day: i + 1,
                title: isFirstDay ? "Arrival & Settlement" : (isLastDay && numDays > 1) ? "Farewell & Departure" : `Discovering ${place1}`,
                activities: resolvedActivities
              };
            })
          );

          const mockItinerary = {
            destination: destName,
            days: numDays,
            budget: parsedBudget,
            estimatedCost: Math.round(parsedBudget * (0.8 + Math.random() * 0.15)),
            costBreakdown: {
              hotel: Math.round(parsedBudget * 0.4),
              food: Math.round(parsedBudget * 0.25),
              transport: Math.round(parsedBudget * 0.15),
              activities: Math.round(parsedBudget * 0.20)
            },
            hotel: selectedHotel,
            travelType,
            vibe,
            locations: mockData.locations,
            places: mockData.places,
            restaurants: mockData.restaurants,
            historical: mockData.historical,
            shopping: mockData.shopping,
            weather: mockData.weather,
            plan: planData
          };

          if (isActive) {
            setItinerary(mockItinerary);
            setIsGenerating(false);
          }
        }, 1200);
        return () => {
          isActive = false;
          clearTimeout(timer);
        }
      }
    }
  }, [isGenerating, loadingStep]);

  // Swapping Features
  const swapHotel = () => {
    const hotelTypes = ['Luxury Resort', 'Boutique Hotel', 'Heritage Lodge', 'Backpackers Hostel', 'City Center Inn'];
    const randomHotel = `${hotelTypes[Math.floor(Math.random() * hotelTypes.length)]} ${itinerary.destination}`;
    setItinerary({ ...itinerary, hotel: randomHotel });
  };

  const swapActivity = (dayIndex: number, actIndex: number) => {
    const newPlaces = ['Local Museum', 'Scenic Viewpoint', 'Historical Monument', 'Art Gallery', 'Nature Park', 'Famous Temple', 'Shopping District', 'Botanic Garden'];
    const randomPlace = newPlaces[Math.floor(Math.random() * newPlaces.length)];

    setItinerary((prev: any) => {
      const newPlan = [...prev.plan];
      const newDay = { ...newPlan[dayIndex] };
      const newActs = [...newDay.activities];
      newActs[actIndex] = {
        ...newActs[actIndex],
        desc: `Visit ${randomPlace} (Alternative selected)`
      };
      newDay.activities = newActs;
      newPlan[dayIndex] = newDay;
      return { ...prev, plan: newPlan };
    });
  };

  const [addedItems, setAddedItems] = useState<string[]>([]);
  const [selectingDayFor, setSelectingDayFor] = useState<{ name: string, type: 'food' | 'activity' | 'shopping' | 'historical' } | null>(null);

  const confirmAddToDay = (dayIndex: number) => {
    if (!selectingDayFor) return;
    const { name: itemName, type } = selectingDayFor;

    setItinerary((prev: any) => {
      const newPlan = [...prev.plan];

      let replaced = false;
      let targetType = type === 'food' ? 'food' : 'activity';

      const newActs = [...newPlan[dayIndex].activities];
      for (let a = 0; a < newActs.length; a++) {
        if (newActs[a].type === targetType && newActs[a].isSwappable !== false) {
          newActs[a] = {
            ...newActs[a],
            desc: type === 'food' ? `Dining at ${itemName} (Added from Side Panel)` : `Visit ${itemName} (Added from Side Panel)`
          };
          newPlan[dayIndex].activities = newActs;
          replaced = true;
          break;
        }
      }

      // If we couldn't swap an existing slot, just add it to the end of the day.
      if (!replaced) {
        newActs.push({
          time: type === 'food' ? '08:30 PM' : '05:00 PM',
          desc: type === 'food' ? `Dining at ${itemName} (Added from Side Panel)` : `Visit ${itemName} (Added from Side Panel)`,
          type: targetType,
          isSwappable: true
        });
        newPlan[dayIndex].activities = newActs;
      }

      return { ...prev, plan: newPlan };
    });
    setAddedItems(prev => [...prev, itemName]);
    setSelectingDayFor(null);
    setTimeout(() => {
      setAddedItems(prev => prev.filter(i => i !== itemName));
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col pt-16">
      {showHotelFinder && itinerary && (
        <HotelFinderModal
          destination={itinerary.destination}
          budget={itinerary.budget}
          days={itinerary.days}
          onClose={() => setShowHotelFinder(false)}
        />
      )}
      {!itinerary ? (
        <main className="flex-1 flex flex-col items-center justify-center p-4">
          <div className="w-full max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-10"
            >
              <div className="inline-flex justify-center items-center p-2 bg-gradient-to-br from-brand-primary to-brand-secondary rounded-2xl text-white mb-6 shadow-lg shadow-brand-primary/20 px-4">
                <Sparkles size={24} className="mr-2" /> <span className="font-semibold text-lg">AI Driven Planning</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-black text-gray-900 mb-4 tracking-tight">Design Your Dream Trip</h1>
              <p className="text-gray-500 text-lg font-medium">Tell us where you want to go, and our AI will handle the rest.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-[2rem] shadow-2xl shadow-gray-200/50 p-8 md:p-10 border border-gray-100 relative overflow-hidden"
            >
              <AnimatePresence mode="wait">
                {!isGenerating ? (
                  <motion.div key="form" exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.3 }}>
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                          <MapPin size={16} className="text-brand-primary" /> Destination
                        </label>
                        <input
                          type="text"
                          value={destination}
                          onChange={(e) => setDestination(e.target.value)}
                          className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-lg rounded-xl focus:ring-2 focus:ring-brand-primary focus:border-brand-primary block p-4 transition-all outline-none"
                          placeholder="e.g., Mahabaleshwar, Pune, Tokyo..."
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                            <Calendar size={16} className="text-brand-primary" /> Duration (Days)
                          </label>
                          <input
                            type="number"
                            value={days}
                            min="1"
                            max="30"
                            onChange={(e) => setDays(e.target.value)}
                            className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-lg rounded-xl focus:ring-2 focus:ring-brand-primary focus:border-brand-primary block p-4 transition-all outline-none"
                            placeholder="e.g., 5"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                            <DollarSign size={16} className="text-brand-primary" /> Budget ($)
                          </label>
                          <input
                            type="number"
                            value={budget}
                            min="100"
                            onChange={(e) => setBudget(e.target.value)}
                            className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-lg rounded-xl focus:ring-2 focus:ring-brand-primary focus:border-brand-primary block p-4 transition-all outline-none"
                            placeholder="e.g., 2000"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                            <Heart size={16} className="text-pink-500" /> Travel Type
                          </label>
                          <select
                            value={travelType}
                            onChange={(e) => setTravelType(e.target.value)}
                            className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-lg rounded-xl focus:ring-2 focus:ring-brand-primary focus:border-brand-primary block p-4 transition-all outline-none appearance-none"
                          >
                            <option value="Solo">Solo Traveler</option>
                            <option value="Couple">Couple</option>
                            <option value="Family">Family</option>
                            <option value="Friends">Friends Group</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                            <Navigation size={16} className="text-violet-500" /> Trip Vibe
                          </label>
                          <select
                            value={vibe}
                            onChange={(e) => setVibe(e.target.value)}
                            className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-lg rounded-xl focus:ring-2 focus:ring-brand-primary focus:border-brand-primary block p-4 transition-all outline-none appearance-none"
                          >
                            <option value="Adventure">Adventure & Explorer</option>
                            <option value="Relaxing">Relaxing & Chill</option>
                            <option value="Culture">Culture & History</option>
                            <option value="Foodie">Foodie Adventure</option>
                          </select>
                        </div>
                      </div>

                      <button
                        onClick={generateItinerary}
                        disabled={!destination || !days || !budget}
                        className="w-full mt-6 bg-gradient-to-r from-brand-primary to-brand-secondary hover:brightness-110 text-white p-5 rounded-2xl font-bold text-lg transition-all shadow-xl hover:shadow-2xl disabled:opacity-50 flex items-center justify-center gap-2 group relative overflow-hidden"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-brand-primary/20 to-brand-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <Sparkles size={20} className="relative z-10 text-brand-primary" />
                        <span className="relative z-10">Generate AI Itinerary</span>
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-12 flex flex-col items-center justify-center text-center">
                    <Loader2 size={48} className="text-brand-primary animate-spin mb-6" />
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Genie is working its magic...</h3>
                    <AnimatePresence mode="wait">
                      <motion.p
                        key={loadingStep}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="text-gray-500 font-medium h-6"
                      >
                        {loadingSteps[loadingStep]}
                      </motion.p>
                    </AnimatePresence>

                    {/* Progress Bar */}
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mt-8 overflow-hidden">
                      <motion.div
                        className="bg-gradient-to-r from-brand-primary to-brand-secondary h-2.5 rounded-full"
                        initial={{ width: "0%" }}
                        animate={{ width: `${((loadingStep + 1) / loadingSteps.length) * 100}%` }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </main>
      ) : (
        <main className="flex-1 w-full max-w-7xl mx-auto p-4 md:p-8">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 border-b border-gray-200 pb-8 gap-4">
            <div>
              <p className="text-brand-primary font-bold mb-2 flex items-center gap-2">
                <Sparkles size={16} /> Here is your curated trip
              </p>
              <h1 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tight capitalize">
                {itinerary.destination}
              </h1>
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => router.push('/')}
                className="flex items-center gap-2 px-5 py-3 border-2 border-dashed border-gray-300 hover:border-brand-primary hover:text-brand-primary hover:bg-brand-primary/10 text-gray-600 font-bold rounded-xl transition"
              >
                <RefreshCw size={18} /> <span className="hidden md:inline">Plan Again</span>
              </button>
              <button className="flex items-center gap-2 px-5 py-3 bg-white border border-white/10 hover:border-gray-300 text-gray-700 font-bold rounded-xl shadow-sm transition">
                <Share2 size={18} /> <span className="hidden md:inline">Share</span>
              </button>
              <button className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-brand-primary to-brand-secondary hover:brightness-110 text-white font-bold rounded-xl shadow-xl transition">
                <Heart size={18} className="text-brand-accent" /> <span className="hidden md:inline">Save Trip</span>
              </button>
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column: Itinerary */}
            <div className="lg:col-span-2 space-y-10">
              {itinerary.plan.map((day: any, idx: number) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="space-y-4"
                >
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 tracking-tight">Day {day.day} - {day.title}</h2>
                  
                  {day.activities.map((activity: any, i: number) => (
                    <div key={i} className="bg-white border border-gray-200 rounded-xl p-5 flex flex-col md:flex-row gap-5 hover:shadow-md transition relative group">
                       <div className="flex-shrink-0 pt-1 flex gap-4">
                         <div className="flex flex-col items-center gap-1 w-12">
                           <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider text-center">{activity.time}</span>
                           <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white ${activity.type === 'food' ? 'bg-brand-primary shadow-brand-primary/30 shadow-md' : 'bg-brand-primary shadow-brand-primary/30 shadow-md'}`}>
                             {activity.type === 'food' ? <Utensils size={18} /> : <Landmark size={18} />}
                           </div>
                         </div>
                       </div>
                       
                       <div className="flex-grow flex flex-col justify-center">
                         <h4 className="text-lg font-bold text-gray-900 leading-tight">{activity.title}</h4>
                         <p className="text-sm text-gray-500 mt-2">{activity.desc}</p>
                         
                         <div className="flex items-center gap-4 mt-4">
                           {activity.type === 'activity' && (
                             <button className="flex items-center gap-1.5 text-brand-primary font-bold text-sm bg-brand-primary/5 hover:bg-brand-primary/15 px-3 py-1.5 rounded-lg transition">
                               <Ticket size={14} /> Book a Tour
                             </button>
                           )}
                           {activity.isSwappable && (
                             <button onClick={() => swapActivity(idx, i)} className="flex items-center gap-1 text-gray-400 hover:text-brand-primary font-bold text-xs opacity-0 group-hover:opacity-100 transition">
                               <RefreshCw size={12} /> Swap
                             </button>
                           )}
                         </div>
                       </div>
                       
                       {activity.image && (
                         <div className="w-full md:w-32 h-40 md:h-32 flex-shrink-0 mt-4 md:mt-0 rounded-xl overflow-hidden border border-gray-100">
                           <img src={activity.image} alt={activity.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                         </div>
                       )}
                    </div>
                  ))}
                  
                  {/* Hotel Card at end of day */}
                  <div className="bg-white border border-gray-200 rounded-xl p-5 flex flex-col md:flex-row gap-5 hover:shadow-md transition items-start md:items-center">
                       <div className="flex-shrink-0 flex gap-4">
                         <div className="flex flex-col items-center gap-1 w-12">
                           <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Set time</span>
                           <div className="w-10 h-10 rounded-full bg-brand-primary flex items-center justify-center text-white shadow-md shadow-brand-primary/30">
                             <BedDouble size={18} />
                           </div>
                         </div>
                       </div>
                       <div className="flex-grow">
                         <h4 className="text-lg font-bold text-gray-900">Find hotels in {itinerary.destination}</h4>
                         <p className="text-sm text-gray-500 mt-1">End your day by resting at one of {itinerary.destination}'s central locations.</p>
                       </div>
                       <div className="flex-shrink-0">
                         <button onClick={() => setShowHotelFinder(true)} className="bg-brand-primary hover:brightness-110 text-white font-bold text-sm px-5 py-2.5 rounded-xl shadow-md transition flex items-center gap-2">
                           Find hotels <ArrowRight size={14} />
                         </button>
                       </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Right Column: Overview */}
            <div className="space-y-6">
              {/* Map */}
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-white rounded-2xl p-2 shadow-soft border border-gray-100 h-80 relative z-0 overflow-hidden">
                <Map locations={itinerary.locations} center={[itinerary.locations[0].lat, itinerary.locations[0].lng]} />
              </motion.div>

              {/* Trip Summary */}
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-[2rem] p-8 shadow-soft border border-gray-100 relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/10 rounded-bl-full -z-10" />
                <h3 className="text-2xl font-black text-gray-900 mb-6 tracking-tight">Trip Details</h3>

                <div className="space-y-4 relative z-10">
                  <div className="flex flex-col gap-2 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-purple-100 rounded-xl"><BedDouble className="text-violet-600" size={18} /></div>
                        <span className="font-bold text-gray-800">Hotel</span>
                      </div>
                      <button onClick={swapHotel} className="text-xs font-bold text-violet-600 bg-violet-50 hover:bg-violet-100 px-3 py-1.5 rounded-lg flex items-center gap-1 transition">
                        <RefreshCw size={12} /> Change
                      </button>
                    </div>
                    <span className="font-medium text-gray-600 pl-11 text-sm">{itinerary.hotel}</span>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-sky-100 rounded-xl"><Calendar className="text-sky-600" size={18} /></div>
                      <span className="font-bold text-gray-800">Duration</span>
                    </div>
                    <span className="font-bold text-gray-600">{itinerary.days} Days</span>
                  </div>

                  <div className="p-4 bg-gray-50 border border-gray-200 rounded-2xl shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-green-500/20 rounded-xl"><DollarSign className="text-green-400" size={18} /></div>
                        <span className="font-bold text-gray-900">Est. Budget</span>
                      </div>
                      <div className="text-right">
                        <span className="font-black text-green-400 text-xl">${itinerary.estimatedCost}</span>
                        <p className="text-xs text-gray-400 font-medium">Out of ${itinerary.budget}</p>
                      </div>
                    </div>
                    {/* Breakdown */}
                    <div className="space-y-2 mt-4 pt-4 border-t border-gray-200/80">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-500">Hotel</span>
                        <span className="text-gray-900 font-semibold">${itinerary.costBreakdown.hotel}</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-500">Food</span>
                        <span className="text-gray-900 font-semibold">${itinerary.costBreakdown.food}</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-500">Transport</span>
                        <span className="text-gray-900 font-semibold">${itinerary.costBreakdown.transport}</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-500">Activities</span>
                        <span className="text-gray-900 font-semibold">${itinerary.costBreakdown.activities}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-orange-100 rounded-xl"><Sun className="text-orange-500" size={18} /></div>
                      <span className="font-bold text-gray-800">Weather</span>
                    </div>
                    <span className="font-bold text-gray-600">{itinerary.weather}</span>
                  </div>
                </div>
              </motion.div>

              {/* Top Places Component */}
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="bg-white rounded-[2rem] p-6 shadow-soft border border-gray-100 flex flex-col gap-6">

                {/* Top Sightseeing */}
                <div>
                  <h3 className="text-lg font-black text-gray-900 mb-3 flex items-center gap-2">
                    <Navigation className="text-brand-primary" size={18} /> Spots to Visit
                  </h3>
                  <div className="flex flex-col gap-2">
                    {itinerary.places.slice(0, 3).map((place: string, idx: number) => (
                      <div key={idx} className="flex items-center justify-between bg-brand-primary/5 border border-brand-primary/20 px-3 py-2 rounded-xl group hover:bg-brand-primary/10 transition-colors">
                        <span className="text-brand-primary font-semibold text-sm">{place}</span>
                        {selectingDayFor?.name === place ? (
                          <div className="flex gap-1 animate-in fade-in zoom-in duration-200">
                            {itinerary.plan.map((dayLine: any, i: number) => (
                              <button onClick={() => confirmAddToDay(i)} key={i} className="bg-white text-brand-primary hover:bg-brand-primary hover:text-white border border-brand-primary/30 px-2 py-1 text-xs font-bold rounded-md transition-colors">
                                D{dayLine.day}
                              </button>
                            ))}
                            <button onClick={() => setSelectingDayFor(null)} className="text-gray-400 hover:text-red-500 px-1 ml-1">&times;</button>
                          </div>
                        ) : (
                          <button
                            onClick={() => setSelectingDayFor({ name: place, type: 'activity' })}
                            className="bg-white text-brand-primary hover:bg-brand-primary hover:text-white border border-brand-primary/30 p-1.5 rounded-lg transition-colors flex items-center gap-1 opacity-0 group-hover:opacity-100"
                          >
                            {addedItems.includes(place) ? <Check size={14} /> : <PlusCircle size={14} />}
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Historical */}
                <div>
                  <h3 className="text-lg font-black text-gray-900 mb-3 flex items-center gap-2">
                    <Landmark className="text-brand-accent" size={18} /> Historical Places
                  </h3>
                  <div className="flex flex-col gap-2">
                    {itinerary.historical.slice(0, 3).map((place: string, idx: number) => (
                      <div key={idx} className="flex items-center justify-between bg-brand-accent/10 border border-brand-accent/20 px-3 py-2 rounded-xl group hover:bg-brand-accent/20 transition-colors">
                        <span className="text-yellow-800 font-semibold text-sm">{place}</span>
                        {selectingDayFor?.name === place ? (
                          <div className="flex gap-1 animate-in fade-in zoom-in duration-200">
                            {itinerary.plan.map((dayLine: any, i: number) => (
                              <button onClick={() => confirmAddToDay(i)} key={i} className="bg-white text-yellow-600 hover:bg-brand-accent hover:text-white border border-brand-accent/30 px-2 py-1 text-xs font-bold rounded-md transition-colors">
                                D{dayLine.day}
                              </button>
                            ))}
                            <button onClick={() => setSelectingDayFor(null)} className="text-gray-400 hover:text-red-500 px-1 ml-1">&times;</button>
                          </div>
                        ) : (
                          <button
                            onClick={() => setSelectingDayFor({ name: place, type: 'historical' })}
                            className="bg-white text-yellow-600 hover:bg-brand-accent hover:text-white border border-brand-accent/30 p-1.5 rounded-lg transition-colors flex items-center gap-1 opacity-0 group-hover:opacity-100"
                          >
                            {addedItems.includes(place) ? <Check size={14} /> : <PlusCircle size={14} />}
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Famous Food */}
                <div>
                  <h3 className="text-lg font-black text-gray-900 mb-3 flex items-center gap-2">
                    <Utensils className="text-orange-500" size={18} /> Famous Food & Dining
                  </h3>
                  <div className="flex flex-col gap-2">
                    {itinerary.restaurants.slice(0, 3).map((place: string, idx: number) => (
                      <div key={idx} className="flex items-center justify-between bg-orange-50/50 border border-orange-100 px-3 py-2 rounded-xl group hover:bg-orange-50 transition-colors">
                        <span className="text-orange-800 text-sm font-semibold">{place}</span>
                        {selectingDayFor?.name === place ? (
                          <div className="flex gap-1 animate-in fade-in zoom-in duration-200">
                            {itinerary.plan.map((dayLine: any, i: number) => (
                              <button onClick={() => confirmAddToDay(i)} key={i} className="bg-white text-orange-600 hover:bg-orange-500 hover:text-white border border-orange-200 px-2 py-1 text-xs font-bold rounded-md transition-colors">
                                D{dayLine.day}
                              </button>
                            ))}
                            <button onClick={() => setSelectingDayFor(null)} className="text-gray-400 hover:text-red-500 px-1 ml-1">&times;</button>
                          </div>
                        ) : (
                          <button
                            onClick={() => setSelectingDayFor({ name: place, type: 'food' })}
                            className="bg-white text-orange-600 hover:bg-orange-500 hover:text-white border border-orange-200 p-1.5 rounded-lg transition-colors flex items-center gap-1 opacity-0 group-hover:opacity-100"
                          >
                            {addedItems.includes(place) ? <Check size={14} /> : <PlusCircle size={14} />}
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Shopping */}
                <div>
                  <h3 className="text-lg font-black text-gray-900 mb-3 flex items-center gap-2">
                    <ShoppingBag className="text-pink-500" size={18} /> Shopping Markets
                  </h3>
                  <div className="flex flex-col gap-2">
                    {itinerary.shopping.slice(0, 3).map((place: string, idx: number) => (
                      <div key={idx} className="flex items-center justify-between bg-pink-50/50 border border-pink-100 px-3 py-2 rounded-xl group hover:bg-pink-50 transition-colors">
                        <span className="text-pink-800 text-sm font-semibold">{place}</span>
                        {selectingDayFor?.name === place ? (
                          <div className="flex gap-1 animate-in fade-in zoom-in duration-200">
                            {itinerary.plan.map((dayLine: any, i: number) => (
                              <button onClick={() => confirmAddToDay(i)} key={i} className="bg-white text-pink-600 hover:bg-pink-500 hover:text-white border border-pink-200 px-2 py-1 text-xs font-bold rounded-md transition-colors">
                                D{dayLine.day}
                              </button>
                            ))}
                            <button onClick={() => setSelectingDayFor(null)} className="text-gray-400 hover:text-red-500 px-1 ml-1">&times;</button>
                          </div>
                        ) : (
                          <button
                            onClick={() => setSelectingDayFor({ name: place, type: 'shopping' })}
                            className="bg-white text-pink-600 hover:bg-pink-500 hover:text-white border border-pink-200 p-1.5 rounded-lg transition-colors flex items-center gap-1 opacity-0 group-hover:opacity-100"
                          >
                            {addedItems.includes(place) ? <Check size={14} /> : <PlusCircle size={14} />}
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

              </motion.div>
            </div>
          </div>
        </main>
      )}
    </div>
  );
}

export default function PlanTrip() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin text-brand-primary" size={48} /></div>}>
      <PlanTripContent />
    </Suspense>
  );
}