import React, { useState, useEffect } from 'react';
import './animatedcheckbox.css'; 

export default function AnimatedCheckbox({ id, label = "Option Text", initialChecked = false }) {

 const [isChecked, setIsChecked] = useState(initialChecked);
 const [isRowAnimating, setIsRowAnimating] = useState(false);
 const [isVibrating, setIsVibrating] = useState(false);


 const handleClick = () => {
   const newState = !isChecked;
   setIsChecked(newState);
   setIsRowAnimating(true);
   setIsVibrating(false);
 };

 useEffect(() => {
   let pulseTimer;
   if (isRowAnimating) {
     pulseTimer = setTimeout(() => {
       setIsRowAnimating(false);
       setIsVibrating(true);  
     }, 300);
   }
   return () => clearTimeout(pulseTimer);
 }, [isRowAnimating]);

 useEffect(() => {
   let vibrateTimer;
   if (isVibrating) {
     vibrateTimer = setTimeout(() => {
       setIsVibrating(false);
     }, 200);
   }
   return () => clearTimeout(vibrateTimer);
 }, [isVibrating]);


 return (

   <label
     htmlFor={id}
     className={`
       flex items-center space-x-3 cursor-pointer p-3 rounded-lg
       transition-colors duration-150 ease-in-out group relative overflow-hidden
       ${isRowAnimating ? 'animate-pulse-bg' : ''}  /* Apply pulse animation */
       ${isVibrating ? 'animate-vibrate' : ''}    /* Apply vibrate animation */
       hover:bg-gray-100 active:bg-gray-200
     `}
   >
     <input
       id={id}
       type="checkbox"
       checked={isChecked}
       onChange={handleClick} 
       className="absolute opacity-0 w-0 h-0"
     />

     <div
       className={`
         relative flex items-center justify-center w-6 h-6 border-2 rounded-md flex-shrink-0
         transition-all duration-200 ease-in-out
         ${isChecked
           ? 'bg-blue-600 border-blue-600' 
           : 'bg-white border-gray-400 group-hover:border-blue-500' 
         }
       `}
       aria-hidden="true"
     >

       <svg
         className={`
           w-4 h-4 text-white fill-none
           transition-transform duration-200 ease-in-out transform
           ${isChecked ? 'scale-100 opacity-100' : 'scale-50 opacity-0'} // Animate scale and opacity
         `}
         stroke="currentColor"
         viewBox="0 0 24 24"
         xmlns="http://www.w3.org/2000/svg"
       >
         <path
           strokeLinecap="round"
           strokeLinejoin="round"
           strokeWidth="3"
           d="M5 13l4 4L19 7"
         ></path>
       </svg>
     </div>

     <span className="relative text-gray-800 select-none text-sm sm:text-base">
       {label}
       <span
         className={`
           absolute top-1/2 left-0 w-full h-0.5 bg-gray-700
           transition-transform duration-300 ease-in-out transform -translate-y-1/2
           ${isChecked ? 'scale-x-100 origin-left' : 'scale-x-0 origin-right'} // Animate scaleX
         `}
         style={{ transitionDelay: isChecked ? '50ms' : '0ms' }}
       ></span>
     </span>
   </label>
 );
};


// --- Example Usage ---


// // Main App Component to demonstrate the AnimatedCheckbox
// const App = () => {
//  return (
//    // Centering container with a gradient background
//    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50 font-sans px-4 py-8">
//      {/* Card container for the checkboxes */}
//      <div className="w-full max-w-lg p-6 sm:p-8 space-y-5 bg-white rounded-xl shadow-xl border border-gray-100">
//        <h1 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-6 sm:mb-8">
//          Project Tasks
//        </h1>
//        {/* Render multiple instances of the AnimatedCheckbox */}
//        <AnimatedCheckbox id="task1" label="Finalize requirement document" />
//        <AnimatedCheckbox id="task2" label="Create initial design mockups" initialChecked={true} />
//        <AnimatedCheckbox id="task3" label="Set up project repository" />
//        <AnimatedCheckbox id="task4" label="Develop login functionality" />
//        <AnimatedCheckbox id="task5" label="Write integration tests" initialChecked={false} />
//        <AnimatedCheckbox id="task6" label="Prepare deployment script" />


//        {/* CSS Keyframes for animations */}
//        <style jsx global>{`
//          /* Background Pulse Animation */
//          @keyframes pulse-bg-keyframes {
//            0%, 100% { background-color: transparent; }
//            50% { background-color: rgba(59, 130, 246, 0.1); } /* Light blue pulse */
//          }
//          .animate-pulse-bg {
//            animation: pulse-bg-keyframes 0.3s ease-in-out;
//          }


//          /* Vibration Animation */
//          @keyframes vibrate-keyframes {
//            0%, 100% { transform: translateX(0); }
//            25% { transform: translateX(-1px); }
//            50% { transform: translateX(1px); }
//            75% { transform: translateX(-1px); }
//          }
//          .animate-vibrate {
//            animation: vibrate-keyframes 0.2s linear; /* Short vibration duration */
//          }
//        `}</style>
//      </div>
//    </div>
//  );
// };


// // Export the App component as the default export
// export default App;