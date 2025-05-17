import React, { useState } from 'react';
import { useTrip } from '../context/TripContext';
import { Map, Download, PlusCircle, Edit2 } from 'lucide-react';

const Header = () => {
  const { tripName, setTripName, exportTrip, addDay } = useTrip();
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(tripName);

  const handleSubmit = () => {
    setTripName(inputValue);
    setIsEditing(false);
  };

  return (
    <header className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 text-white shadow-lg">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/10 rounded-lg">
              <Map className="h-7 w-7" />
            </div>
            <div className="flex items-center gap-2">
              {isEditing ? (
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="px-3 py-1.5 text-black rounded-lg border-2 border-white/20 bg-white/90 focus:outline-none focus:border-white/40 transition-colors"
                    autoFocus
                    onBlur={handleSubmit}
                    onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                  />
                </div>
              ) : (
                <div 
                  className="group cursor-pointer flex items-center gap-2"
                  onClick={() => setIsEditing(true)}
                >
                  <h1 className="text-2xl md:text-3xl font-bold">
                    {tripName}
                  </h1>
                  <Edit2 className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={addDay}
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition-all duration-200 text-sm font-medium hover:scale-105"
            >
              <PlusCircle className="h-4 w-4" />
              <span>Add Day</span>
            </button>
            <button
              onClick={exportTrip}
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition-all duration-200 text-sm font-medium hover:scale-105"
            >
              <Download className="h-4 w-4" />
              <span>Export</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;