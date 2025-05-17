import React, { useState } from 'react';
import { useTrip } from '../context/TripContext';
import { X } from 'lucide-react';

const GalleryView = () => {
  const { days } = useTrip();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  
  // Collect all activities with images
  const activitiesWithImages = days.flatMap(day => 
    day.activities.filter(activity => activity.imageUrl)
  );

  if (activitiesWithImages.length === 0) {
    return (
      <div className="text-center py-8">
        <h3 className="text-xl font-medium text-gray-600">No images in your trip yet</h3>
        <p className="text-gray-500 mt-2">Add image URLs to your activities to see them here.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {activitiesWithImages.map((activity) => (
          <div 
            key={activity.id} 
            className="overflow-hidden rounded-lg shadow-md cursor-pointer transition-transform hover:scale-105"
            onClick={() => setSelectedImage(activity.imageUrl!)}
          >
            <div className="aspect-w-16 aspect-h-9 relative">
              <img 
                src={activity.imageUrl!}
                alt={activity.title}
                className="w-full h-48 object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{activity.emoji || '📍'}</span>
                  <h4 className="font-medium text-white">{activity.title}</h4>
                </div>
                {activity.location && (
                  <p className="text-sm text-white/80">{activity.location}</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedImage && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50">
          <button 
            className="absolute top-4 right-4 text-white hover:text-gray-300"
            onClick={() => setSelectedImage(null)}
          >
            <X className="h-8 w-8" />
          </button>
          <div className="max-w-4xl max-h-[90vh]">
            <img 
              src={selectedImage}
              alt="Gallery image"
              className="max-w-full max-h-[90vh] object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default GalleryView;