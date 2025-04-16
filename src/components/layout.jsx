import React, { useState, useMemo, useEffect } from 'react';
// Import icons from lucide-react
import { List, LayoutGrid, Package, Box } from 'lucide-react';
// Import motion and AnimatePresence from framer-motion
import { motion, AnimatePresence } from 'framer-motion';

// Import one image that we know exists
import butterfly from '../assets/butterfly-2373175_1280.png';
import lion from '../assets/chinese-lion-6976588_1280.png';
import korablik from '../assets/korablik-2823073_1280.png';
import lunar from "../assets/lunarnewyearcontest-9392710_1920.png";
import hand from "../assets/Screenshot2025-04-16223444.png";
import music from "../assets/Screenshot2025-04-16223529.png";

// Updated data with proper image references
const initialContentData = [
 { id: 1, title: 'ButterFly', description: 'A colorful abstract butterfly.', imageUrl: butterfly, price: 0.855, tokenId: 209 },
 { id: 2, title: 'Chinese Lion', description: 'A beautiful Chines Lion Abstract.', imageUrl: lion, price: 0.209, tokenId: 808 },
 { id: 3, title: 'Korablik', description: 'abstract of korablik.', imageUrl: korablik, price: 1.100, tokenId: 101 },
 { id: 4, title: 'Lunar New Year', description: 'A potray of Lunar New Year.', imageUrl:lunar, price: 0.550, tokenId: 314 },
 { id: 5, title: 'Skilled Finger', description: 'Master at work.', imageUrl: hand, price: 0.765, tokenId: 500 },
 { id: 6, title: 'Vibrant Vibes', description: 'Vibrant music define you.', imageUrl: music, price: 0.300, tokenId: 999 },
];

// --- Tab Component ---
// No changes needed here, but removed isAnimating prop as it's handled differently now
function Tabs({ activeTab, onTabChange }) {
 const tabs = [
   { key: 'list', label: 'List view', icon: List },
   { key: 'card', label: 'Card view', icon: LayoutGrid },
   { key: 'pack', label: 'Pack view', icon: Package },
 ];

 return (
   <div className="flex justify-center space-x-2 mb-8">
     {tabs.map((tab) => {
       const Icon = tab.icon;
       const isActive = activeTab === tab.key;
       return (
         <button
           key={tab.key}
           onClick={() => onTabChange(tab.key)}
           // Removed disabled prop based on animation state
           className={`flex items-center justify-center space-x-2 px-4 py-2 rounded-full text-sm font-medium focus:outline-none transition-all duration-200 ease-in-out ${
             isActive
               ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-md'
               : 'bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-700'
           }`}
         >
           <Icon size={16} />
           <span>{tab.label}</span>
         </button>
       );
     })}
   </div>
 );
}

// --- List View Component ---
// Wraps items with motion.div for layout animation
function ListView({ items }) {
 return (
   // Add layout prop to the container for smoother overall transition
   <motion.div layout className="space-y-1">
     {items.map((item, index) => (
       // Wrap each item, assign layoutId for matching across views
       <motion.div
           key={item.id} // React key
           layoutId={`item-${item.id}`} // Shared layout ID
           layout="position" // Animate position changes smoothly
           // Optional: Animate opacity for entry/exit within the list itself
           initial={{ opacity: 0, y: 10 }}
           animate={{ opacity: 1, y: 0 }}
           exit={{ opacity: 0 }}
           transition={{ duration: 0.3, delay: index * 0.03 }}
           // Original item styling
           className="flex items-center p-4 rounded-xl bg-white hover:shadow-md transition-shadow duration-200"
       >
         {/* Original list item content */}
         <img
            src={item.imageUrl}
            alt={item.title}
            className="w-20 h-20 rounded-lg object-cover mr-2 flex-shrink-0"
            onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/80x80/cccccc/ffffff?text=Error"; }}
         />
         <div className="flex-grow max-w-3xl grid grid-cols-3 items-center">
            <div>
               <h3 className="font-semibold text-xl text-gray-800 truncate">{item.title}</h3>
               <p className="text-sm text-gray-500 truncate">{item.description}</p>
            </div>
            <div className="text-right">
               <p className="text-lg font-medium text-gray-800">{item.price.toFixed(3)} <span className='text-gray-400'>ETH</span></p>
            </div>
            <div className="text-right flex items-center justify-end space-x-1 text-gray-500">
               <Box size={14} />
               <span className="text-lg"># {item.tokenId}</span>
            </div>
         </div>
       </motion.div>
     ))}
   </motion.div>
 );
}

// --- Card View Component ---
// Wraps items with motion.div for layout animation
function CardView({ items }) {
 return (
   // Add layout prop to the container
   <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
     {items.map((item, index) => (
       // Wrap each item, assign layoutId for matching across views
       <motion.div
           key={item.id} // React key
           layoutId={`item-${item.id}`} // Shared layout ID
           layout="position" // Animate position changes smoothly
           // Optional: Animate opacity for entry/exit within the grid itself
           initial={{ opacity: 0, scale: 0.9 }}
           animate={{ opacity: 1, scale: 1 }}
           exit={{ opacity: 0, scale: 0.9 }}
           transition={{ duration: 0.3, delay: index * 0.03 }}
           // Original item styling
           className="bg-white rounded-xl overflow-hidden  hover:shadow-lg transition-shadow duration-200 flex flex-col"
       >
           {/* Original card item content */}
           <div className="aspect-square p-2 rounded-2xl">
              <img
                 src={item.imageUrl}
                 alt={item.title}
                 className="h-52 w-52 object-cover rounded-2xl"
                 onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/400x400/cccccc/ffffff?text=Error"; }}
              />
           </div>
           <div className="p-2 flex-grow flex flex-col justify-between">
              <div>
                 <h3 className="font-semibold text-xl text-gray-800 truncate">{item.title}</h3>
              </div>
              <div className="flex justify-between items-center">
                 <p className="text-lg font-medium text-gray-700">{item.price.toFixed(3)} <span className='text-gray-400'>ETH</span></p>
                 <div className="flex items-center space-x-1 text-gray-700">
                    <Box size={14} />
                    <span className="text-lg"># {item.tokenId}</span>
                 </div>
              </div>
           </div>
       </motion.div>
     ))}
   </motion.div>
 );
}

// --- Pack View Component ---
// Cannot easily participate in shared layout animation due to its structure
// It will rely on the fade transition applied by its wrapper in the App component
function PackView({ items }) {
 const getRotationValue = (index) => {
   const rotations = [-5, 8, -3, 6, -7, 4];
   return rotations[index % rotations.length];
 };
 const getTranslationValues = (index) => {
   const translations = [ { x: 0, y: 0 }, { x: 4, y: -4 }, { x: -4, y: 4 }, { x: 8, y: 2 }, { x: -2, y: -6 }, { x: 6, y: 6 } ];
   return translations[index % translations.length];
 }

 return (
   <div className="flex flex-col items-center justify-center pt-10">
       <div className="relative w-52 h-52 sm:w-60 sm:h-60 group cursor-pointer mb-6" style={{ perspective: '1000px' }}>
           {items.map((item, index) => {
               const rotation = getRotationValue(index);
               const translation = getTranslationValues(index);
               const transformStyle = `rotate(${rotation}deg) translateX(${translation.x}px) translateY(${translation.y}px)`;
               return (
                   <motion.img // Use motion.img for potential individual animation later if needed
                       key={item.id}
                       className={`absolute top-0 left-0 w-full h-full object-cover rounded-xl shadow-lg border border-gray-100 transition-transform duration-300 ease-in-out group-hover:rotate-[0deg] group-hover:-translate-y-2 group-hover:translate-x-0 group-hover:scale-105`}
                       src={item.imageUrl}
                       alt={item.title}
                       style={{ zIndex: index, transform: transformStyle }}
                       onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/240x240/cccccc/ffffff?text=Error"; }}
                       // Add initial/animate for subtle fade-in of the stack itself
                       initial={{ opacity: 0 }}
                       animate={{ opacity: 1 }}
                       transition={{ delay: 0.1 }} // Slight delay after container fade
                   />
               );
           })}
       </div>
        <div className="flex flex-col items-center text-center">
           <div className="font-semibold text-lg text-gray-800">{items.length} Collectibles</div>
         </div>
   </div>
 );
}

// --- Main App Component ---
// Uses AnimatePresence and motion.div for view transitions
export default function LayoutCard() {
 const [activeTab, setActiveTab] = useState('card');
 const [contentData, setContentData] = useState(initialContentData);
 // No longer need visibleTab or animationState, framer-motion handles transitions based on component presence/key change

 const handleTabChange = (tabKey) => {
   setActiveTab(tabKey); // Just update the active tab state
 };

 // Select the component based on activeTab
 const CurrentViewComponent = useMemo(() => {
   switch (activeTab) {
       case 'list': return ListView;
       case 'card': return CardView;
       case 'pack': return PackView;
       default: return CardView;
   }
 }, [activeTab]);

 // Define variants for the container fade (useful for PackView transition)
 const viewVariants = {
     initial: { opacity: 0 },
     animate: { opacity: 1 },
     exit: { opacity: 0 },
 };

 return (
   <div className="container mx-auto p-4 sm:p-6 lg:p-8 font-sans bg-white min-h-screen">
      <h1 className="text-3xl font-semibold text-center mb-6 text-gray-900">Collectibles</h1>
      <Tabs activeTab={activeTab} onTabChange={handleTabChange} />

      {/* Use AnimatePresence to manage mounting/unmounting views */}
      {/* Set min-height here to stabilize layout */}
      <div className="min-h-[600px] relative max-w-4xl">
           <AnimatePresence mode="wait"> {/* 'wait' ensures exit completes before enter begins */}
               {/* Render the CurrentViewComponent wrapped in motion.div */}
               {/* Use activeTab as key to trigger transitions when the component type changes */}
               <motion.div
                   key={activeTab} // Key change triggers AnimatePresence
                   variants={viewVariants} // Apply simple fade for overall view change
                   initial="initial"
                   animate="animate"
                   exit="exit"
                   transition={{ duration: 0.2 }} // Faster fade for container
               >
                   {/* Render the selected view component, passing items */}
                   {/* Framer Motion's layout prop handles item re-arrangement *within* these components */}
                   <CurrentViewComponent items={contentData} />
               </motion.div>
           </AnimatePresence>
      </div>
   </div>
 );
}





