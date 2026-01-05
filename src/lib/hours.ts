import { isToday, format, parse, isWithinInterval, startOfDay, endOfDay } from 'date-fns';

export interface BusinessHours {
  [key: string]: {
    open: string; // Format: "HH:mm" (24-hour)
    close: string; // Format: "HH:mm" (24-hour)
    closed?: boolean; // Optional: mark day as closed
  };
}

// Business hours configuration
export const businessHours: BusinessHours = {
  monday: { open: '11:00', close: '22:00' },
  tuesday: { open: '11:00', close: '22:00' },
  wednesday: { open: '11:00', close: '22:00' },
  thursday: { open: '11:00', close: '22:00' },
  friday: { open: '11:00', close: '23:00' },
  saturday: { open: '10:00', close: '23:00' },
  sunday: { open: '11:00', close: '21:00' },
};

export type DayOfWeek = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';

/**
 * Get the current day of week as a key
 */
export function getCurrentDayOfWeek(): DayOfWeek {
  const dayIndex = new Date().getDay();
  const days: DayOfWeek[] = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  return days[dayIndex];
}

/**
 * Check if the business is currently open
 */
export function isOpenNow(): boolean {
  const now = new Date();
  const dayOfWeek = getCurrentDayOfWeek();
  const hours = businessHours[dayOfWeek];

  if (!hours || hours.closed) {
    return false;
  }

  const today = startOfDay(now);
  const openTime = parse(hours.open, 'HH:mm', today);
  const closeTime = parse(hours.close, 'HH:mm', today);

  // Handle case where closing time is past midnight
  if (closeTime < openTime) {
    const nextDay = new Date(today);
    nextDay.setDate(nextDay.getDate() + 1);
    const closeTimeNextDay = parse(hours.close, 'HH:mm', nextDay);
    return isWithinInterval(now, { start: openTime, end: closeTimeNextDay });
  }

  return isWithinInterval(now, { start: openTime, end: closeTime });
}

/**
 * Get today's hours as a formatted string
 */
export function getTodaysHours(): string {
  const dayOfWeek = getCurrentDayOfWeek();
  const hours = businessHours[dayOfWeek];

  if (!hours || hours.closed) {
    return 'Closed Today';
  }

  // Format times to 12-hour format
  const formatTime = (time: string): string => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours, 10);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  return `${formatTime(hours.open)} - ${formatTime(hours.close)}`;
}

/**
 * Get the next opening time
 */
export function getNextOpenTime(): string | null {
  const now = new Date();
  const dayOfWeek = getCurrentDayOfWeek();
  const days: DayOfWeek[] = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
  
  const currentIndex = days.indexOf(dayOfWeek);
  
  // Check next 7 days
  for (let i = 0; i < 7; i++) {
    const checkIndex = (currentIndex + i) % 7;
    const checkDay = days[checkIndex];
    const hours = businessHours[checkDay];
    
    if (hours && !hours.closed) {
      const checkDate = new Date(now);
      checkDate.setDate(checkDate.getDate() + i);
      const openTime = parse(hours.open, 'HH:mm', startOfDay(checkDate));
      
      if (i === 0 && now < openTime) {
        // Today, but not yet open
        return format(openTime, 'EEEE at h:mm a');
      } else if (i > 0) {
        // Future day
        return format(openTime, 'EEEE at h:mm a');
      }
    }
  }
  
  return null;
}

