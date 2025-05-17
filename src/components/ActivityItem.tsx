import React, { useState } from 'react';
import { Activity } from '../types';
import { useTrip } from '../context/TripContext';
import { MapPin, Clock, Trash2, Edit2 } from 'lucide-react';
import { Draggable } from 'react-beautiful-dnd';
import EditActivityModal from './EditActivityModal';

interface ActivityItemProps {
  activity: Activity;
  index: number;
  dayIndex: number;
  timeOfDay: 'morning' | 'afternoon' | 'evening' | null;
}

const ActivityItem: React.FC<ActivityItemProps> = ({ 
  activity, 
  index, 
  dayIndex,
  timeOfDay
}) => {
  const { removeActivity } = useTrip();
  const [isEditing, setIsEditing] = useState(false);

  const getTimeColor = () => {
    switch(activity.timeOfDay) {
      case 'morning': return 'text-amber-700';
      case 'afternoon': return 'text-blue-700';
      case 'evening': return 'text-indigo-700';
      default: return 'text-gray-500';
    }
  };

  return (
    <Draggable draggableId={`activity-${activity.id}`} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`bg-white rounded-md border p-3 shadow-sm ${
            snapshot.isDragging ? 'shadow-md' : ''
          }`}
        >
          <div className="flex justify-between">
            <div className="flex items-center gap-1 mb-1">
              <span className="text-xl" role="img" aria-label="emoji">
                {activity.emoji || '📍'}
              </span>
              <h4 className="font-medium text-gray-800">{activity.title}</h4>
            </div>
            <div className="flex gap-1">
              <button 
                onClick={() => setIsEditing(true)}
                className="text-gray-400 hover:text-blue-500 transition-colors"
              >
                <Edit2 className="h-4 w-4" />
              </button>
              <button 
                onClick={() => removeActivity(activity.id)}
                className="text-gray-400 hover:text-red-500 transition-colors"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
          
          {activity.location && (
            <div className="flex items-center gap-1 text-sm text-gray-600 mb-1">
              <MapPin className="h-3 w-3" />
              <span>{activity.location}</span>
            </div>
          )}
          
          {activity.time && (
            <div className="flex items-center gap-1 text-sm text-gray-600 mb-1">
              <Clock className="h-3 w-3" />
              <span>{activity.time}</span>
            </div>
          )}
          
          {activity.notes && (
            <p className="text-sm text-gray-600 mt-1 bg-gray-50 p-2 rounded">{activity.notes}</p>
          )}
          
          {activity.imageUrl && (
            <div className="mt-2 rounded overflow-hidden">
              <img 
                src={activity.imageUrl} 
                alt={activity.title} 
                className="w-full h-32 object-cover"
              />
            </div>
          )}

          {isEditing && (
            <EditActivityModal
              activity={activity}
              onClose={() => setIsEditing(false)}
            />
          )}
        </div>
      )}
    </Draggable>
  );
};

export default ActivityItem;