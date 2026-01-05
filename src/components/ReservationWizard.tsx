import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { CalendarIcon, ChevronLeft, ChevronRight, Check, Users, Clock, Mail, Phone, User, MessageSquare, UtensilsCrossed } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { reservationSchema, ReservationFormData, getAvailableTimeSlots, getNextAvailableSlot, formatTimeSlot } from '@/lib/reservation-schema';
import { getTodaysHours } from '@/lib/hours';

interface ReservationWizardProps {
  onClose?: () => void;
  onSuccess?: (data: ReservationFormData) => void;
}

const STEPS = [
  { id: 1, title: 'Date & Time', icon: CalendarIcon },
  { id: 2, title: 'Party Size', icon: Users },
  { id: 3, title: 'Details', icon: User },
  { id: 4, title: 'Confirm', icon: Check },
];

const ReservationWizard: React.FC<ReservationWizardProps> = ({ onClose, onSuccess }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const { toast } = useToast();

  const nextAvailableSlot = getNextAvailableSlot();

  const form = useForm<ReservationFormData>({
    resolver: zodResolver(reservationSchema),
    defaultValues: {
      date: nextAvailableSlot.date,
      time: nextAvailableSlot.time,
      partySize: 2,
      name: '',
      email: '',
      phone: '',
      specialRequests: '',
      occasion: 'none',
      dietaryRestrictions: '',
    },
    mode: 'onChange',
  });

  const watchedDate = form.watch('date');
  const watchedTime = form.watch('time');
  const watchedPartySize = form.watch('partySize');

  // Update available time slots when date changes
  useEffect(() => {
    if (watchedDate) {
      const availableSlots = getAvailableTimeSlots(watchedDate);
      if (availableSlots.length > 0 && !availableSlots.includes(watchedTime)) {
        form.setValue('time', availableSlots[0]);
      }
    }
  }, [watchedDate, form, watchedTime]);

  // Set selected date when form date changes
  useEffect(() => {
    if (watchedDate) {
      setSelectedDate(watchedDate);
    }
  }, [watchedDate]);

  const onSubmit = async (data: ReservationFormData) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      toast({
        title: 'Reservation Confirmed! 🎉',
        description: `Your reservation for ${format(data.date, 'MMMM d, yyyy')} at ${formatTimeSlot(data.time)} has been confirmed.`,
      });

      if (onSuccess) {
        onSuccess(data);
      }

      if (onClose) {
        setTimeout(() => onClose(), 2000);
      }
    } catch (error) {
      toast({
        title: 'Reservation Failed',
        description: 'There was an error processing your reservation. Please try again or call us at (503) 555-1234',
        variant: 'destructive',
      });
    }
  };

  const nextStep = async () => {
    let fieldsToValidate: (keyof ReservationFormData)[] = [];

    switch (currentStep) {
      case 1:
        fieldsToValidate = ['date', 'time'];
        break;
      case 2:
        fieldsToValidate = ['partySize'];
        break;
      case 3:
        fieldsToValidate = ['name', 'email', 'phone'];
        break;
    }

    const isValid = await form.trigger(fieldsToValidate);
    if (isValid) {
      setCurrentStep(prev => Math.min(prev + 1, STEPS.length));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const availableTimeSlots = watchedDate ? getAvailableTimeSlots(watchedDate) : [];

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Progress Stepper */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {STEPS.map((step, index) => {
            const isActive = currentStep === step.id;
            const isCompleted = currentStep > step.id;
            const Icon = step.icon;

            return (
              <React.Fragment key={step.id}>
                <div className="flex flex-col items-center flex-1">
                  <motion.div
                    className={cn(
                      'w-12 h-12 rounded-full flex items-center justify-center border-2 transition-colors',
                      isActive
                        ? 'bg-primary border-primary text-primary-foreground'
                        : isCompleted
                        ? 'bg-primary/20 border-primary text-primary'
                        : 'bg-background border-border text-muted-foreground'
                    )}
                    animate={{ scale: isActive ? 1.1 : 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    {isCompleted ? (
                      <Check className="h-6 w-6" />
                    ) : (
                      <Icon className="h-6 w-6" />
                    )}
                  </motion.div>
                  <span
                    className={cn(
                      'mt-2 text-xs font-medium text-center',
                      isActive ? 'text-primary' : isCompleted ? 'text-foreground' : 'text-muted-foreground'
                    )}
                  >
                    {step.title}
                  </span>
                </div>
                {index < STEPS.length - 1 && (
                  <div
                    className={cn(
                      'h-0.5 flex-1 mx-2 transition-colors',
                      isCompleted ? 'bg-primary' : 'bg-border'
                    )}
                  />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <AnimatePresence mode="wait">
            {/* Step 1: Date & Time */}
            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="text-2xl font-semibold text-foreground mb-2">Select Date & Time</h3>
                  <p className="text-muted-foreground">Choose when you'd like to visit us</p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Date</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                className={cn(
                                  'w-full justify-start text-left font-normal',
                                  !field.value && 'text-muted-foreground'
                                )}
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {field.value ? format(field.value, 'PPP') : 'Pick a date'}
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) => {
                                const today = new Date();
                                today.setHours(0, 0, 0, 0);
                                return date < today;
                              }}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormDescription>Today's hours: {getTodaysHours()}</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="time"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Time</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                          disabled={!watchedDate || availableTimeSlots.length === 0}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a time">
                                {field.value ? formatTimeSlot(field.value) : 'Select a time'}
                              </SelectValue>
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {availableTimeSlots.length > 0 ? (
                              availableTimeSlots.map((slot) => (
                                <SelectItem key={slot} value={slot}>
                                  {formatTimeSlot(slot)}
                                </SelectItem>
                              ))
                            ) : (
                              <SelectItem value="none" disabled>
                                No available times
                              </SelectItem>
                            )}
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          {!watchedDate
                            ? 'Please select a date first'
                            : availableTimeSlots.length === 0
                            ? 'No available times for this date'
                            : `${availableTimeSlots.length} time slots available`}
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </motion.div>
            )}

            {/* Step 2: Party Size */}
            {currentStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="text-2xl font-semibold text-foreground mb-2">Party Size</h3>
                  <p className="text-muted-foreground">How many people will be joining?</p>
                </div>

                <FormField
                  control={form.control}
                  name="partySize"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Number of Guests</FormLabel>
                      <FormControl>
                        <div className="flex items-center space-x-4">
                          <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            onClick={() => {
                              const newValue = Math.max(1, field.value - 1);
                              field.onChange(newValue);
                            }}
                            disabled={field.value <= 1}
                          >
                            <ChevronLeft className="h-4 w-4" />
                          </Button>
                          <Input
                            type="number"
                            min={1}
                            max={20}
                            className="text-center text-2xl font-semibold w-24"
                            {...field}
                            onChange={(e) => {
                              const value = parseInt(e.target.value) || 1;
                              field.onChange(Math.min(20, Math.max(1, value)));
                            }}
                          />
                          <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            onClick={() => {
                              const newValue = Math.min(20, field.value + 1);
                              field.onChange(newValue);
                            }}
                            disabled={field.value >= 20}
                          >
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                        </div>
                      </FormControl>
                      <FormDescription>
                        {watchedPartySize >= 6
                          ? 'Reservations are recommended for parties of 6 or more'
                          : 'For smaller parties, walk-ins are welcome'}
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </motion.div>
            )}

            {/* Step 3: Contact & Preferences */}
            {currentStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="text-2xl font-semibold text-foreground mb-2">Your Details</h3>
                  <p className="text-muted-foreground">We'll use this to confirm your reservation</p>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="john@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input type="tel" placeholder="(503) 555-0123" {...field} />
                      </FormControl>
                      <FormDescription>We'll call if there are any changes</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="occasion"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Special Occasion (Optional)</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select an occasion" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="none">None</SelectItem>
                          <SelectItem value="birthday">Birthday</SelectItem>
                          <SelectItem value="anniversary">Anniversary</SelectItem>
                          <SelectItem value="business">Business Meeting</SelectItem>
                          <SelectItem value="celebration">Celebration</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="dietaryRestrictions"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Dietary Restrictions (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Vegetarian, Gluten-free" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="specialRequests"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Special Requests (Optional)</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Any special requests or notes for your visit..."
                          rows={3}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </motion.div>
            )}

            {/* Step 4: Confirmation */}
            {currentStep === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="text-center">
                  <motion.div
                    className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 0.5, repeat: Infinity }}
                  >
                    <Check className="h-8 w-8 text-primary" />
                  </motion.div>
                  <h3 className="text-2xl font-semibold text-foreground mb-2">Review Your Reservation</h3>
                  <p className="text-muted-foreground">Please confirm your details before submitting</p>
                </div>

                <div className="brew-card space-y-4">
                  <div className="flex items-center space-x-3 pb-4 border-b border-border">
                    <CalendarIcon className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Date & Time</p>
                      <p className="font-semibold text-foreground">
                        {watchedDate && format(watchedDate, 'EEEE, MMMM d, yyyy')} at{' '}
                        {watchedTime && formatTimeSlot(watchedTime)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 pb-4 border-b border-border">
                    <Users className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Party Size</p>
                      <p className="font-semibold text-foreground">
                        {watchedPartySize} {watchedPartySize === 1 ? 'guest' : 'guests'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 pb-4 border-b border-border">
                    <User className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Contact</p>
                      <p className="font-semibold text-foreground">{form.watch('name')}</p>
                      <p className="text-sm text-muted-foreground">{form.watch('email')}</p>
                      <p className="text-sm text-muted-foreground">{form.watch('phone')}</p>
                    </div>
                  </div>

                  {form.watch('occasion') && form.watch('occasion') !== 'none' && (
                    <div className="flex items-center space-x-3">
                      <UtensilsCrossed className="h-5 w-5 text-primary" />
                      <div>
                        <p className="text-sm text-muted-foreground">Occasion</p>
                        <p className="font-semibold text-foreground capitalize">
                          {form.watch('occasion')}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-6 border-t border-border">
            <Button
              type="button"
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 1}
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Back
            </Button>

            {currentStep < STEPS.length ? (
              <Button type="button" onClick={nextStep}>
                Next
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            ) : (
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-foreground mr-2" />
                    Confirming...
                  </>
                ) : (
                  <>
                    <Check className="h-4 w-4 mr-2" />
                    Confirm Reservation
                  </>
                )}
              </Button>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ReservationWizard;

