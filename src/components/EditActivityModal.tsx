import React, { useState } from 'react';
import { Activity } from '../types';
import { useTrip } from '../context/TripContext';
import { X, Search } from 'lucide-react';
import { emojiOptions } from '../utils/emojis';

interface EditActivityModalProps {
  activity: Activity;
  onClose: () => void;
}

const EditActivityModal: React.FC<EditActivityModalProps> = ({ activity, onClose }) => {
  const { updateActivity } = useTrip();
  const [title, setTitle] = useState(activity.title);
  const [location, setLocation] = useState(activity.location || '');
  const [time, setTime] = useState(activity.time || '');
  const [notes, setNotes] = useState(activity.notes || '');
  const [emoji, setEmoji] = useState(activity.emoji || '');
  const [imageUrl, setImageUrl] = useState(activity.imageUrl || '');
  const [timeOfDay, setTimeOfDay] = useState(activity.timeOfDay);
  const [searchEmoji, setSearchEmoji] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    updateActivity(activity.id, {
      ...activity,
      title,
      location,
      time,
      notes,
      emoji,
      imageUrl,
      timeOfDay
    });
    
    onClose();
  };

  const filteredEmojis = searchEmoji 
    ? emojiOptions.filter(e => 
        e.keywords.some(keyword => 
          keyword.toLowerCase().includes(searchEmoji.toLowerCase())
        )
      )
    : emojiOptions;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
  <div className="bg-white rounded-lg shadow-xl max-w-md w-full h-full overflow-auto">
    <div className="flex justify-between items-center p-4 border-b">

          <h3 className="font-semibold text-lg">Edit Activity</h3>
          <button onClick={onClose}>
            <X className="h-5 w-5 text-gray-500 hover:text-gray-700" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Activity Title *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., Visit Eiffel Tower"
              required
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Location
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., Paris, France"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Time
              </label>
              <input
                type="text"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., 10:00 AM"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Time of Day
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                className={`px-3 py-2 rounded-md border ${
                  timeOfDay === 'morning' 
                    ? 'bg-amber-100 border-amber-500 text-amber-800' 
                    : 'hover:bg-gray-50'
                }`}
                onClick={() => setTimeOfDay('morning')}
              >
                Morning
              </button>
              <button
                type="button"
                className={`px-3 py-2 rounded-md border ${
                  timeOfDay === 'afternoon' 
                    ? 'bg-blue-100 border-blue-500 text-blue-800' 
                    : 'hover:bg-gray-50'
                }`}
                onClick={() => setTimeOfDay('afternoon')}
              >
                Afternoon
              </button>
              <button
                type="button"
                className={`px-3 py-2 rounded-md border ${
                  timeOfDay === 'evening' 
                    ? 'bg-indigo-100 border-indigo-500 text-indigo-800' 
                    : 'hover:bg-gray-50'
                }`}
                onClick={() => setTimeOfDay('evening')}
              >
                Evening
              </button>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Emoji Icon
            </label>
            <div className="flex items-center gap-2">
              <div 
                className="w-10 h-10 border rounded-md flex items-center justify-center text-2xl cursor-pointer hover:bg-gray-50"
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              >
                {emoji || '🏖️'}
              </div>
              <div className="flex-1">
                <button
                  type="button"
                  className="text-sm text-blue-600 hover:underline"
                  onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                >
                  {showEmojiPicker ? 'Hide emoji picker' : 'Choose an emoji'}
                </button>
              </div>
            </div>
            
            {showEmojiPicker && (
              <div className="mt-2 p-2 border rounded-md max-h-40 overflow-auto">
                <div className="flex items-center gap-2 border-b pb-2 mb-2">
                  <Search className="h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    value={searchEmoji}
                    onChange={(e) => setSearchEmoji(e.target.value)}
                    className="flex-1 text-sm outline-none"
                    placeholder="Search emojis..."
                  />
                </div>
                <div className="grid grid-cols-6 gap-2">
                  {filteredEmojis.map((e) => (
                    <button
                      key={e.emoji}
                      type="button"
                      className="text-2xl hover:bg-gray-100 p-1 rounded"
                      onClick={() => {
                        setEmoji(e.emoji);
                        setShowEmojiPicker(false);
                      }}
                    >
                      {e.emoji}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Image URL
            </label>
            <input
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="https://example.com/image.jpg"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Notes
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Any additional details..."
              rows={3}
            />
          </div>
          
          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 border rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              disabled={!title}
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditActivityModal;