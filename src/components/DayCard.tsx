import React, { useState } from 'react';
import { Day } from '../types';
import { useTrip } from '../context/TripContext';
import { Calendar, Trash2, Plus, Sun, Coffee, Moon } from 'lucide-react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import ActivityItem from './ActivityItem';
import { getDayColor } from '../utils/colors';
import NewActivityModal from './NewActivityModal';

interface DayCardProps {
  day: Day;
  index: number;
}

const DayCard: React.FC<DayCardProps> = ({ day, index }) => {
  const { removeDay } = useTrip();
  const [isAddingActivity, setIsAddingActivity] = useState(false);
  const [timeOfDay, setTimeOfDay] = useState<'morning' | 'afternoon' | 'evening' | null>(null);
  
  const dayColor = getDayColor(index);
  const dayDate = new Date(day.date);
  const formattedDate = dayDate.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric'
  });

  const morningActivities = day.activities.filter(a => a.timeOfDay === 'morning');
  const afternoonActivities = day.activities.filter(a => a.timeOfDay === 'afternoon');
  const eveningActivities = day.activities.filter(a => a.timeOfDay === 'evening');
  const unscheduledActivities = day.activities.filter(a => !a.timeOfDay);

  const handleAddActivity = (tod: 'morning' | 'afternoon' | 'evening' | null) => {
    setTimeOfDay(tod);
    setIsAddingActivity(true);
  };

  return (
    <Draggable draggableId={`day-${day.id}`} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          className={`bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-200 ${
            snapshot.isDragging ? 'rotate-1 scale-102 shadow-xl' : ''
          }`}
        >
          <div 
            className="px-6 py-4 border-b flex justify-between items-center bg-gradient-to-r"
            style={{ 
              background: `linear-gradient(to right, ${dayColor}15, ${dayColor}30)`,
              borderLeft: `4px solid ${dayColor}`
            }}
            {...provided.dragHandleProps}
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white rounded-lg shadow-sm">
                <Calendar className="h-5 w-5" style={{ color: dayColor }} />
              </div>
              <div>
                <h3 className="font-bold text-gray-800">Day {index + 1}</h3>
                <p className="text-sm text-gray-600">{formattedDate}</p>
              </div>
            </div>
            <button 
              onClick={() => removeDay(day.id)}
              className="text-gray-400 hover:text-red-500 transition-colors p-2 hover:bg-red-50 rounded-full"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>

          <Droppable droppableId={`activities-${index}`} type="activity">
            {(droppableProvided) => (
              <div
                ref={droppableProvided.innerRef}
                {...droppableProvided.droppableProps}
                className="p-6 space-y-6"
              >
                {/* Morning section */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 bg-amber-100 rounded-lg">
                        <Coffee className="h-4 w-4 text-amber-700" />
                      </div>
                      <span className="font-medium text-amber-900">Morning</span>
                    </div>
                    <button 
                      onClick={() => handleAddActivity('morning')}
                      className="text-amber-600 hover:text-amber-800 text-sm flex items-center gap-1 p-1.5 hover:bg-amber-50 rounded-lg transition-colors"
                    >
                      <Plus className="h-4 w-4" />
                      <span className="hidden sm:inline">Add Activity</span>
                    </button>
                  </div>
                  <div className="pl-4 border-l-2 border-amber-200 space-y-3">
                    {morningActivities.length > 0 ? (
                      morningActivities.map((activity, actIndex) => (
                        <ActivityItem 
                          key={activity.id} 
                          activity={activity} 
                          index={actIndex} 
                          dayIndex={index} 
                          timeOfDay="morning"
                        />
                      ))
                    ) : (
                      <p className="text-sm text-gray-400 italic py-2">No morning activities planned</p>
                    )}
                  </div>
                </div>

                {/* Afternoon section */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 bg-blue-100 rounded-lg">
                        <Sun className="h-4 w-4 text-blue-700" />
                      </div>
                      <span className="font-medium text-blue-900">Afternoon</span>
                    </div>
                    <button 
                      onClick={() => handleAddActivity('afternoon')}
                      className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1 p-1.5 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <Plus className="h-4 w-4" />
                      <span className="hidden sm:inline">Add Activity</span>
                    </button>
                  </div>
                  <div className="pl-4 border-l-2 border-blue-200 space-y-3">
                    {afternoonActivities.length > 0 ? (
                      afternoonActivities.map((activity, actIndex) => (
                        <ActivityItem 
                          key={activity.id} 
                          activity={activity} 
                          index={actIndex} 
                          dayIndex={index}
                          timeOfDay="afternoon"
                        />
                      ))
                    ) : (
                      <p className="text-sm text-gray-400 italic py-2">No afternoon activities planned</p>
                    )}
                  </div>
                </div>

                {/* Evening section */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 bg-indigo-100 rounded-lg">
                        <Moon className="h-4 w-4 text-indigo-700" />
                      </div>
                      <span className="font-medium text-indigo-900">Evening</span>
                    </div>
                    <button 
                      onClick={() => handleAddActivity('evening')}
                      className="text-indigo-600 hover:text-indigo-800 text-sm flex items-center gap-1 p-1.5 hover:bg-indigo-50 rounded-lg transition-colors"
                    >
                      <Plus className="h-4 w-4" />
                      <span className="hidden sm:inline">Add Activity</span>
                    </button>
                  </div>
                  <div className="pl-4 border-l-2 border-indigo-200 space-y-3">
                    {eveningActivities.length > 0 ? (
                      eveningActivities.map((activity, actIndex) => (
                        <ActivityItem 
                          key={activity.id} 
                          activity={activity} 
                          index={actIndex} 
                          dayIndex={index}
                          timeOfDay="evening"
                        />
                      ))
                    ) : (
                      <p className="text-sm text-gray-400 italic py-2">No evening activities planned</p>
                    )}
                  </div>
                </div>

                {/* Unscheduled activities */}
                {unscheduledActivities.length > 0 && (
                  <div className="mt-6 pt-6 border-t border-gray-100">
                    <div className="text-sm font-medium text-gray-500 mb-3">Unscheduled Activities</div>
                    <div className="space-y-3">
                      {unscheduledActivities.map((activity, actIndex) => (
                        <ActivityItem 
                          key={activity.id} 
                          activity={activity} 
                          index={day.activities.indexOf(activity)} 
                          dayIndex={index}
                          timeOfDay={null}
                        />
                      ))}
                    </div>
                  </div>
                )}
                
                {droppableProvided.placeholder}
              </div>
            )}
          </Droppable>

          {isAddingActivity && (
            <NewActivityModal 
              dayId={day.id}
              onClose={() => setIsAddingActivity(false)}
              defaultTimeOfDay={timeOfDay}
            />
          )}
        </div>
      )}
    </Draggable>
  );
};

export default DayCard;