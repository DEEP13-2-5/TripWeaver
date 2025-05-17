// A function to get a color for a day based on its index
export const getDayColor = (index: number): string => {
  const colors = [
    '#4F46E5', // Indigo
    '#0EA5E9', // Sky
    '#10B981', // Emerald
    '#F59E0B', // Amber
    '#EF4444', // Red
    '#8B5CF6', // Violet
    '#EC4899', // Pink
    '#06B6D4', // Cyan
    '#84CC16', // Lime
    '#F97316', // Orange
  ];
  
  return colors[index % colors.length];
};

// Function to get a lighter version of a color for backgrounds
export const getLightColor = (color: string, opacity: number = 0.1): string => {
  return `${color}${Math.floor(opacity * 255).toString(16).padStart(2, '0')}`;
};