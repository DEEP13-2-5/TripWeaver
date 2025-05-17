export interface Activity {
  id: string;
  title: string;
  timeOfDay?: 'morning' | 'afternoon' | 'evening' | null;
  time?: string;
  location?: string;
  notes?: string;
  emoji?: string;
  imageUrl?: string;
}

export interface Day {
  id: string;
  date: string;
  activities: Activity[];
}

export interface EmojiOption {
  emoji: string;
  keywords: string[];
}