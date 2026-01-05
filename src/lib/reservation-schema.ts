import { z } from 'zod';
import { addDays, startOfDay, setHours, setMinutes, isAfter, isBefore } from 'date-fns';
import { businessHours, getCurrentDayOfWeek, DayOfWeek } from './hours';

// Available time slots (every 30 minutes during business hours)
const TIME_SLOTS = [
  '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
  '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00', '18:30',
  '19:00', '19:30', '20:00', '20:30', '21:00', '21:30', '22:00', '22:30',
];

// Reservation schema
export const reservationSchema = z.object({
  date: z.date({
    required_error: 'Please select a date',
    invalid_type_error: 'Please select a valid date',
  }).refine(
    (date) => {
      const today = startOfDay(new Date());
      const selectedDate = startOfDay(date);
      return isAfter(selectedDate, today) || selectedDate.getTime() === today.getTime();
    },
    {
      message: 'Date must be today or in the future',
    }
  ),
  time: z.string({
    required_error: 'Please select a time',
  }).min(1, 'Please select a time'),
  partySize: z.number({
    required_error: 'Please enter party size',
    invalid_type_error: 'Party size must be a number',
  }).min(1, 'Party size must be at least 1').max(20, 'Maximum party size is 20'),
  name: z.string().min(2, 'Name must be at least 2 characters').max(100, 'Name is too long'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number').regex(
    /^[\d\s().-]+$/,
    'Phone number contains invalid characters'
  ),
  specialRequests: z.string().max(500, 'Special requests must be less than 500 characters').optional(),
  occasion: z.enum(['none', 'birthday', 'anniversary', 'business', 'celebration', 'other']).optional(),
  dietaryRestrictions: z.string().max(200, 'Dietary restrictions must be less than 200 characters').optional(),
});

export type ReservationFormData = z.infer<typeof reservationSchema>;

/**
 * Get available time slots for a given date
 */
export function getAvailableTimeSlots(date: Date): string[] {
  const dayOfWeek = getDayOfWeekFromDate(date);
  const hours = businessHours[dayOfWeek];

  if (!hours || hours.closed) {
    return [];
  }

  const [openHour, openMinute] = hours.open.split(':').map(Number);
  const [closeHour, closeMinute] = hours.close.split(':').map(Number);

  const availableSlots: string[] = [];
  const isToday = startOfDay(date).getTime() === startOfDay(new Date()).getTime();
  const now = new Date();

  for (const slot of TIME_SLOTS) {
    const [slotHour, slotMinute] = slot.split(':').map(Number);
    const slotTime = setMinutes(setHours(date, slotHour), slotMinute);

    // Check if slot is within business hours
    if (
      (slotHour > openHour || (slotHour === openHour && slotMinute >= openMinute)) &&
      (slotHour < closeHour || (slotHour === closeHour && slotMinute <= closeMinute))
    ) {
      // If today, only show future slots
      if (isToday && isBefore(slotTime, now)) {
        continue;
      }
      availableSlots.push(slot);
    }
  }

  return availableSlots;
}

/**
 * Get the next available reservation slot
 */
export function getNextAvailableSlot(): { date: Date; time: string } {
  const now = new Date();
  let checkDate = startOfDay(now);
  const maxDaysToCheck = 30; // Check up to 30 days ahead

  for (let i = 0; i < maxDaysToCheck; i++) {
    const dayOfWeek = getDayOfWeekFromDate(checkDate);
    const hours = businessHours[dayOfWeek];

    if (hours && !hours.closed) {
      const availableSlots = getAvailableTimeSlots(checkDate);
      
      if (availableSlots.length > 0) {
        // If today, find first future slot
        if (i === 0) {
          const futureSlots = availableSlots.filter(slot => {
            const [hour, minute] = slot.split(':').map(Number);
            const slotTime = setMinutes(setHours(checkDate, hour), minute);
            return isAfter(slotTime, now);
          });
          
          if (futureSlots.length > 0) {
            return { date: checkDate, time: futureSlots[0] };
          }
        } else {
          // For future days, return first available slot
          return { date: checkDate, time: availableSlots[0] };
        }
      }
    }

    checkDate = addDays(checkDate, 1);
  }

  // Fallback: return tomorrow at opening time
  const tomorrow = addDays(now, 1);
  const dayOfWeek = getDayOfWeekFromDate(tomorrow);
  const hours = businessHours[dayOfWeek];
  
  if (hours && !hours.closed) {
    return { date: tomorrow, time: hours.open };
  }

  // Final fallback
  return { date: addDays(now, 2), time: '11:00' };
}

/**
 * Get day of week from a date
 */
function getDayOfWeekFromDate(date: Date): DayOfWeek {
  const dayIndex = date.getDay();
  const days: DayOfWeek[] = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  return days[dayIndex];
}

/**
 * Format time slot for display
 */
export function formatTimeSlot(time: string): string {
  const [hours, minutes] = time.split(':').map(Number);
  const hour12 = hours % 12 || 12;
  const ampm = hours >= 12 ? 'PM' : 'AM';
  return `${hour12}:${minutes.toString().padStart(2, '0')} ${ampm}`;
}

