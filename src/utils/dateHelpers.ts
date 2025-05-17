/**
 * Generates a range of dates starting from a specific date
 * @param startDate The date to start from
 * @param numberOfDays The number of days to generate
 * @returns An array of date strings in ISO format
 */
export const generateDateRange = (startDate: Date, numberOfDays: number): string[] => {
  const dates: string[] = [];
  const currentDate = new Date(startDate);
  
  for (let i = 0; i < numberOfDays; i++) {
    dates.push(currentDate.toISOString());
    currentDate.setDate(currentDate.getDate() + 1);
  }
  
  return dates;
};

/**
 * Format a date string to a human-readable format
 * @param dateString ISO date string
 * @returns Formatted date string
 */
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
  });
};