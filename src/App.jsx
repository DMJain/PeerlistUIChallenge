import './App.css'
import React, { useState } from 'react';
import HamBurger from './components/HamBurger'
import TransactionStatusIndicator from './components/statustransition'
import AnimatedCheckbox from './components/animatiedcheckbox'
import PlanToggle from './components/IntendedToggle'
import LayoutCard from './components/layout'

function App() {

  const [activeTab, setActiveTab] = useState('tab1');

  // Function to render the content based on the active tab
  const renderContent = () => {
    switch (activeTab) {
      case 'tab1':
        return <HamBurger />;
      case 'tab2':
        return <TransactionStatusIndicator />;
      case 'tab3':
        return <div className='shadow-lg rounded-lg p-4'>
        <AnimatedCheckbox id="task1" label="Open the Peerlist" />
         <AnimatedCheckbox id="task2" label="Check the UI Challenge" initialChecked={true} />
         <AnimatedCheckbox id="task3" label="Complete the challenge" />
         <AnimatedCheckbox id="task4" label="Submit the challenge" />
         <AnimatedCheckbox id="task5" label="See what other did and think you could have done better" initialChecked={false} />
         </div>;
      case 'tab4':
        return <PlanToggle />;
      case 'tab5':
        return <LayoutCard />;
      default:
        return <Tab1Content />; // Default to tab 1 content
    }
  };

  const getTabClassName = (tabName) => {
    // Base classes for all tabs
    let classes = "cursor-pointer px-4 py-2 text-lg font-medium text-gray-600 hover:text-green-600 transition-colors duration-200";
    // Add specific classes for the active tab
    if (activeTab === tabName) {
      classes += " text-green-600 border-b-2 border-green-600";
    } else {
       classes += "border-transparent"; // Transparent border for inactive tabs to maintain alignment
    }
    return classes;
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center mt-10">
    <div className="flex justify-center items-center gap-4">
      {/* First image (Peerlist logo) */}
      <img
        src="https://peerlist.io/favicon.png"
        alt="Peerlist"
        className="w-10 h-10" // Tailwind classes for width and height
        // Optional: Add error handling for image loading
        onError={(e) => {
          e.target.onerror = null; // Prevent infinite loop if fallback fails
          // You could replace with a placeholder or hide the image
          e.target.src="https://placehold.co/40x40/cccccc/ffffff?text=P";
          e.target.alt="Peerlist Placeholder";
        }}
      />

      {/* Separator text */}
      <p className="text-gray-500 dark:text-gray-600 font-normal text-xs">
        X {/* Simple text separator */}
      </p>

      {/* Link wrapping the second image */}
      <a href="/company/aceternity"> {/* Link destination */}
        {/* Second image (Aceternity logo) */}
        <img
          src="https://dqy38fnwh4fqs.cloudfront.net/website/logo/acerternity.png"
          alt="Aceternity" // Updated alt text for clarity
          className="w-10 h-10" // Tailwind classes for width and height
          // Optional: Add error handling for image loading
          onError={(e) => {
            e.target.onerror = null; // Prevent infinite loop
            // Replace with a placeholder or hide the image
            e.target.src="https://placehold.co/40x40/cccccc/ffffff?text=A";
            e.target.alt="Aceternity Placeholder";
          }}
        />
      </a>
    </div>
    <h1 class="text-center instrument-serif-regular text-5xl mt-4">UI Animation Challenge</h1>
    <div className="min-h-screen flex flex-col items-center m-6 font-mono">
      {/* Tab Navigation Container */}
      <div className="flex space-x-4 mb-8">
        {/* Tab Headings */}
        <div className={getTabClassName('tab1')} onClick={() => setActiveTab('tab1')}>
          Day 1
        </div>
        <div className={getTabClassName('tab2')} onClick={() => setActiveTab('tab2')}>
          Day 2
        </div>
        <div className={getTabClassName('tab3')} onClick={() => setActiveTab('tab3')}>
          Day 3
        </div>
         <div className={getTabClassName('tab4')} onClick={() => setActiveTab('tab4')}>
          Day 4
        </div>
         <div className={getTabClassName('tab5')} onClick={() => setActiveTab('tab5')}>
          Day 5
        </div>
      </div>

      {/* Content Area */}
      <div className="flex justify-center items-center ">
         {/* Render the content of the currently active tab */}
         <div>
          {renderContent()}
        </div>
      </div>
    </div>       
    </div>
  )
}

export default App
