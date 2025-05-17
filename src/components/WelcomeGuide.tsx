import React from 'react';
import { useTrip } from '../context/TripContext';
import { Calendar, MapPin, DollarSign, Compass } from 'lucide-react';

const WelcomeGuide = () => {
  const { addDay } = useTrip();

  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Welcome to TripWeaver</h1>
        <p className="text-gray-600">Your interactive travel itinerary planner</p>
      </div>
      
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-6 py-8 text-white">
          <h2 className="text-xl font-bold mb-2">Let's plan your next adventure</h2>
          <p>Create, organize, and share your travel plans with ease</p>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="flex items-start gap-3">
              <div className="bg-blue-100 p-2 rounded-full text-blue-600">
                <Calendar className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-medium text-gray-800 mb-1">Organize by Day</h3>
                <p className="text-gray-600 text-sm">Plan your activities day-by-day with an easy-to-use drag-and-drop interface.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="bg-blue-100 p-2 rounded-full text-blue-600">
                <MapPin className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-medium text-gray-800 mb-1">Track Locations</h3>
                <p className="text-gray-600 text-sm">Keep track of all your destinations and activities in one place.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="bg-blue-100 p-2 rounded-full text-blue-600">
                <DollarSign className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-medium text-gray-800 mb-1">Visual Timeline</h3>
                <p className="text-gray-600 text-sm">See your entire trip at a glance with our visual timeline view.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="bg-blue-100 p-2 rounded-full text-blue-600">
                <Compass className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-medium text-gray-800 mb-1">Export Your Plans</h3>
                <p className="text-gray-600 text-sm">Download your itinerary to share with friends or keep offline.</p>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <button
              onClick={addDay}
              className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors shadow-md"
            >
              Start Planning
            </button>
            <p className="text-gray-500 text-sm mt-4">
              Your trips are saved locally in your browser.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeGuide;