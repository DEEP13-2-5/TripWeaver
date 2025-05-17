import React, { useState } from 'react';
import { useTrip } from '../context/TripContext';
import DayCard from './DayCard';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import GalleryView from './GalleryView';
import { Layers, Image, PlusCircle } from 'lucide-react';

const TripBoard = () => {
  const { days, updateDays, addDay } = useTrip();
  const [viewMode, setViewMode] = useState<'board' | 'gallery'>('board');

  const handleDragEnd = (result: any) => {
    const { source, destination, type } = result;
    if (!destination) return;

    if (type === 'day') {
      const reorderedDays = Array.from(days);
      const [removed] = reorderedDays.splice(source.index, 1);
      reorderedDays.splice(destination.index, 0, removed);
      updateDays(reorderedDays);
      return;
    }

    if (source.droppableId === destination.droppableId) {
      const dayIndex = parseInt(source.droppableId.split('-')[1]);
      const day = days[dayIndex];
      const newActivities = Array.from(day.activities);
      const [removed] = newActivities.splice(source.index, 1);
      newActivities.splice(destination.index, 0, removed);
      
      const newDays = [...days];
      newDays[dayIndex] = {
        ...day,
        activities: newActivities
      };
      
      updateDays(newDays);
      return;
    }

    const sourceDayIndex = parseInt(source.droppableId.split('-')[1]);
    const destDayIndex = parseInt(destination.droppableId.split('-')[1]);
    
    const sourceDayActivities = Array.from(days[sourceDayIndex].activities);
    const destDayActivities = Array.from(days[destDayIndex].activities);
    
    const [movedActivity] = sourceDayActivities.splice(source.index, 1);
    destDayActivities.splice(destination.index, 0, movedActivity);
    
    const newDays = [...days];
    newDays[sourceDayIndex] = {
      ...days[sourceDayIndex],
      activities: sourceDayActivities
    };
    newDays[destDayIndex] = {
      ...days[destDayIndex],
      activities: destDayActivities
    };
    
    updateDays(newDays);
  };

  return (
    <div className="space-y-6">
      {days.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6">
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-bold text-gray-800 tracking-tight">Plan Your Journey</h2>
            <p className="text-lg text-gray-600 max-w-md">Create your perfect trip itinerary with our interactive planner</p>
          </div>
          <button
            onClick={addDay}
            className="group relative inline-flex items-center justify-center px-8 py-3 text-lg font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full overflow-hidden shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
          >
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out"></span>
            <PlusCircle className="w-5 h-5 mr-2" />
            <span className="relative">Start Planning</span>
          </button>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center">
            <button
              onClick={addDay}
              className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-2"
            >
              <PlusCircle className="w-4 h-4" />
              Add Day
            </button>
            <div className="bg-white shadow-md rounded-lg flex overflow-hidden">
              <button 
                className={`px-4 py-2 flex items-center gap-2 transition-colors duration-200 ${
                  viewMode === 'board' 
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white' 
                    : 'hover:bg-gray-50'
                }`}
                onClick={() => setViewMode('board')}
              >
                <Layers className="w-4 h-4" />
                <span>Timeline</span>
              </button>
              <button 
                className={`px-4 py-2 flex items-center gap-2 transition-colors duration-200 ${
                  viewMode === 'gallery' 
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white' 
                    : 'hover:bg-gray-50'
                }`}
                onClick={() => setViewMode('gallery')}
              >
                <Image className="w-4 h-4" />
                <span>Gallery</span>
              </button>
            </div>
          </div>

          {viewMode === 'board' ? (
            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="days" direction="vertical" type="day">
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="space-y-6"
                  >
                    {days.map((day, index) => (
                      <DayCard 
                        key={day.id} 
                        day={day} 
                        index={index} 
                      />
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          ) : (
            <GalleryView />
          )}
        </>
      )}
    </div>
  );
};

export default TripBoard;