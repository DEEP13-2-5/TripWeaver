import React, { createContext, useContext, useState, useEffect } from 'react';
import { Day, Activity } from '../types';
import { generateDateRange } from '../utils/dateHelpers';

interface TripContextProps {
  days: Day[];
  isEmpty: boolean;
  tripName: string;
  addDay: () => void;
  removeDay: (id: string) => void;
  updateDays: (days: Day[]) => void;
  addActivity: (dayId: string, activity: Activity) => void;
  removeActivity: (activityId: string) => void;
  updateActivity: (activityId: string, updatedActivity: Activity) => void;
  setTripName: (name: string) => void;
  exportTrip: () => void;
}

const TripContext = createContext<TripContextProps | undefined>(undefined);

// Sample data for initial experience
const sampleDays: Day[] = [
  {
    id: 'day-1',
    date: new Date().toISOString(),
    activities: [
      {
        id: 'activity-1',
        title: 'Morning Coffee at Artisan Cafe',
        location: 'Downtown District',
        time: '9:00 AM',
        notes: 'Try their famous croissants',
        emoji: '☕',
        timeOfDay: 'morning',
        imageUrl: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800'
      },
      {
        id: 'activity-2',
        title: 'City Museum Tour',
        location: 'Cultural Quarter',
        time: '2:00 PM',
        notes: 'Special exhibition on modern art',
        emoji: '🏛️',
        timeOfDay: 'afternoon',
        imageUrl: 'https://images.unsplash.com/photo-1554907984-15263bfd63bd?auto=format&fit=crop&w=800'
      },
      {
        id: 'activity-3',
        title: 'Sunset Dinner Cruise',
        location: 'Harbor District',
        time: '7:00 PM',
        notes: 'Reservation under "Smith"',
        emoji: '🚢',
        timeOfDay: 'evening',
        imageUrl: 'https://images.unsplash.com/photo-1514302240736-b1fee5985889?auto=format&fit=crop&w=800'
      }
    ]
  },
  {
    id: 'day-2',
    date: new Date(Date.now() + 86400000).toISOString(),
    activities: [
      {
        id: 'activity-4',
        title: 'Hiking Adventure',
        location: 'Mountain Trail Park',
        time: '8:00 AM',
        notes: 'Bring water and snacks',
        emoji: '🏔️',
        timeOfDay: 'morning',
        imageUrl: 'https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=800'
      },
      {
        id: 'activity-5',
        title: 'Local Market Visit',
        location: 'Old Town Square',
        time: '2:30 PM',
        notes: 'Famous for local crafts',
        emoji: '🛍️',
        timeOfDay: 'afternoon',
        imageUrl: 'https://images.unsplash.com/photo-1533900298318-6b8da08a523e?auto=format&fit=crop&w=800'
      },
      {
        id: 'activity-6',
        title: 'Jazz Club Evening',
        location: 'Blue Note Club',
        time: '8:00 PM',
        notes: 'Live performance night',
        emoji: '🎷',
        timeOfDay: 'evening',
        imageUrl: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&w=800'
      }
    ]
  },
  {
    id: 'day-3',
    date: new Date(Date.now() + 172800000).toISOString(),
    activities: [
      {
        id: 'activity-7',
        title: 'Beach Yoga Session',
        location: 'Sunrise Beach',
        time: '7:30 AM',
        notes: 'Bring yoga mat',
        emoji: '🧘‍♀️',
        timeOfDay: 'morning',
        imageUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800'
      },
      {
        id: 'activity-8',
        title: 'Botanical Gardens',
        location: 'City Gardens',
        time: '1:00 PM',
        notes: 'Butterfly house tour included',
        emoji: '🦋',
        timeOfDay: 'afternoon',
        imageUrl: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=800'
      },
      {
        id: 'activity-9',
        title: 'Rooftop Dinner',
        location: 'Sky Lounge Restaurant',
        time: '7:30 PM',
        notes: 'Dress code: Smart casual',
        emoji: '🍽️',
        timeOfDay: 'evening',
        imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800'
      }
    ]
  }
];

export const useTrip = (): TripContextProps => {
  const context = useContext(TripContext);
  if (!context) {
    throw new Error('useTrip must be used within a TripProvider');
  }
  return context;
};

interface TripProviderProps {
  children: React.ReactNode;
}

export const TripProvider: React.FC<TripProviderProps> = ({ children }) => {
  const [tripName, setTripName] = useState<string>('Weekend City Gateway');
  const [days, setDays] = useState<Day[]>([]);
  const [isEmpty, setIsEmpty] = useState<boolean>(true);

  // Load from localStorage on mount or use sample data if empty
  useEffect(() => {
    const savedTrip = localStorage.getItem('tripWeaver');
    if (savedTrip) {
      try {
        const { days, tripName } = JSON.parse(savedTrip);
        setDays(days);
        setTripName(tripName || 'Weekend City Gateway');
        setIsEmpty(days.length === 0);
      } catch (err) {
        console.error('Error loading saved trip:', err);
        // Use sample data if there's an error
        setDays(sampleDays);
        setIsEmpty(false);
      }
    } else {
      // Use sample data for first-time users
      setDays(sampleDays);
      setIsEmpty(false);
    }
  }, []);

  // Save to localStorage whenever days or tripName changes
  useEffect(() => {
    localStorage.setItem('tripWeaver', JSON.stringify({ days, tripName }));
    setIsEmpty(days.length === 0);
  }, [days, tripName]);

  const addDay = () => {
    const startDate = days.length > 0 
      ? new Date(days[days.length - 1].date)
      : new Date();
    
    if (days.length > 0) {
      startDate.setDate(startDate.getDate() + 1);
    }
    
    const newDay: Day = {
      id: `day-${Date.now()}`,
      date: startDate.toISOString(),
      activities: []
    };
    
    setDays([...days, newDay]);
    
    // @ts-ignore
    if (window.showToast) {
      // @ts-ignore
      window.showToast('Day added successfully', 'success');
    }
  };

  const removeDay = (id: string) => {
    setDays(days.filter(day => day.id !== id));
    
    // @ts-ignore
    if (window.showToast) {
      // @ts-ignore
      window.showToast('Day removed', 'info');
    }
  };

  const updateDays = (updatedDays: Day[]) => {
    setDays(updatedDays);
  };

  const addActivity = (dayId: string, activity: Activity) => {
    const updatedDays = days.map(day => {
      if (day.id === dayId) {
        return {
          ...day,
          activities: [...day.activities, activity]
        };
      }
      return day;
    });
    
    setDays(updatedDays);
    
    // @ts-ignore
    if (window.showToast) {
      // @ts-ignore
      window.showToast('Activity added', 'success');
    }
  };

  const removeActivity = (activityId: string) => {
    const updatedDays = days.map(day => ({
      ...day,
      activities: day.activities.filter(activity => activity.id !== activityId)
    }));
    
    setDays(updatedDays);
    
    // @ts-ignore
    if (window.showToast) {
      // @ts-ignore
      window.showToast('Activity removed', 'info');
    }
  };

  const updateActivity = (activityId: string, updatedActivity: Activity) => {
    const updatedDays = days.map(day => ({
      ...day,
      activities: day.activities.map(activity => 
        activity.id === activityId ? updatedActivity : activity
      )
    }));
    
    setDays(updatedDays);
    
    // @ts-ignore
    if (window.showToast) {
      // @ts-ignore
      window.showToast('Activity updated', 'success');
    }
  };

  const exportTrip = () => {
    let tripText = `${tripName.toUpperCase()}\n\n`;
    
    days.forEach((day, index) => {
      const dayDate = new Date(day.date);
      const formattedDate = dayDate.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric'
      });
      
      tripText += `DAY ${index + 1}: ${formattedDate}\n`;
      tripText += `${'='.repeat(50)}\n\n`;
      
      // Morning activities
      tripText += `MORNING:\n`;
      const morningActivities = day.activities.filter(a => a.timeOfDay === 'morning');
      if (morningActivities.length > 0) {
        morningActivities.forEach(activity => {
          tripText += `- ${activity.emoji || '•'} ${activity.title}${activity.time ? ` (${activity.time})` : ''}\n`;
          if (activity.location) tripText += `  Location: ${activity.location}\n`;
          if (activity.notes) tripText += `  Notes: ${activity.notes}\n`;
          tripText += '\n';
        });
      } else {
        tripText += `- No activities planned\n\n`;
      }
      
      // Afternoon activities
      tripText += `AFTERNOON:\n`;
      const afternoonActivities = day.activities.filter(a => a.timeOfDay === 'afternoon');
      if (afternoonActivities.length > 0) {
        afternoonActivities.forEach(activity => {
          tripText += `- ${activity.emoji || '•'} ${activity.title}${activity.time ? ` (${activity.time})` : ''}\n`;
          if (activity.location) tripText += `  Location: ${activity.location}\n`;
          if (activity.notes) tripText += `  Notes: ${activity.notes}\n`;
          tripText += '\n';
        });
      } else {
        tripText += `- No activities planned\n\n`;
      }
      
      // Evening activities
      tripText += `EVENING:\n`;
      const eveningActivities = day.activities.filter(a => a.timeOfDay === 'evening');
      if (eveningActivities.length > 0) {
        eveningActivities.forEach(activity => {
          tripText += `- ${activity.emoji || '•'} ${activity.title}${activity.time ? ` (${activity.time})` : ''}\n`;
          if (activity.location) tripText += `  Location: ${activity.location}\n`;
          if (activity.notes) tripText += `  Notes: ${activity.notes}\n`;
          tripText += '\n';
        });
      } else {
        tripText += `- No activities planned\n\n`;
      }
      
      // Unscheduled activities
      const unscheduledActivities = day.activities.filter(a => !a.timeOfDay);
      if (unscheduledActivities.length > 0) {
        tripText += `OTHER ACTIVITIES:\n`;
        unscheduledActivities.forEach(activity => {
          tripText += `- ${activity.emoji || '•'} ${activity.title}${activity.time ? ` (${activity.time})` : ''}\n`;
          if (activity.location) tripText += `  Location: ${activity.location}\n`;
          if (activity.notes) tripText += `  Notes: ${activity.notes}\n`;
          tripText += '\n';
        });
      }
      
      tripText += `\n${'='.repeat(50)}\n\n`;
    });
    
    const blob = new Blob([tripText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${tripName.replace(/\s+/g, '-').toLowerCase()}-itinerary.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    // @ts-ignore
    if (window.showToast) {
      // @ts-ignore
      window.showToast('Trip exported successfully!', 'success');
    }
  };

  return (
    <TripContext.Provider
      value={{
        days,
        isEmpty,
        tripName,
        addDay,
        removeDay,
        updateDays,
        addActivity,
        removeActivity,
        updateActivity,
        setTripName,
        exportTrip
      }}
    >
      {children}
    </TripContext.Provider>
  );
};