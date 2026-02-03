'use client';

import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar, 
  Clock, 
  User, 
  Stethoscope,
  Check,
  AlertCircle,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { DayPicker } from 'react-day-picker';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Doctor, TimeSlot } from '@/types/appointment';
import { appointmentService } from '@/lib/appointment-service';

interface AppointmentBookingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onBookingComplete: (appointment: any) => void;
  doctors?: Doctor[];
}

export default function AppointmentBookingModal({
  open,
  onOpenChange,
  onBookingComplete,
  doctors = []
}: AppointmentBookingModalProps) {
  const [step, setStep] = useState(1);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<TimeSlot | null>(null);
  const [availableSlots, setAvailableSlots] = useState<TimeSlot[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Reset form when modal opens/closes
  useEffect(() => {
    if (open) {
      resetForm();
    }
  }, [open]);

  const resetForm = () => {
    setStep(1);
    setSelectedDoctor(null);
    setSelectedDate(undefined);
    setSelectedTimeSlot(null);
    setAvailableSlots([]);
    setError(null);
  };

  const handleDoctorSelect = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setStep(2);
  };

  const handleDateSelect = async (date: Date | undefined) => {
    if (!date || !selectedDoctor) return;
    
    setSelectedDate(date);
    setIsLoading(true);
    setError(null);
    
    try {
      const slots = await appointmentService.getAvailableTimeSlots(selectedDoctor.id, date);
      setAvailableSlots(slots);
      
      if (slots.length === 0) {
        setError('No available time slots for this date. Please select another date.');
      } else {
        setStep(3);
      }
    } catch (err) {
      setError('Failed to load available time slots. Please try again.');
      console.error('Error loading time slots:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTimeSlotSelect = (slot: TimeSlot) => {
    setSelectedTimeSlot(slot);
    setStep(4);
  };

  const handleConfirmBooking = async () => {
    if (!selectedDoctor || !selectedDate || !selectedTimeSlot) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const appointmentData = {
        patientId: 'current-patient-id',
        patientName: 'Current Patient',
        doctorId: selectedDoctor.id,
        doctorName: selectedDoctor.name,
        department: selectedDoctor.department,
        date: selectedDate,
        startTime: selectedTimeSlot.startTime,
        endTime: selectedTimeSlot.endTime,
        type: 'teleconsultation' as const,
        notes: ''
      };
      
      const newAppointment = await appointmentService.createAppointment(appointmentData);
      onBookingComplete(newAppointment);
      onOpenChange(false);
    } catch (err) {
      setError('Failed to book appointment. Please try again.');
      console.error('Error booking appointment:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
      if (step === 2) {
        setSelectedDate(undefined);
        setAvailableSlots([]);
      } else if (step === 3) {
        setSelectedTimeSlot(null);
      } else if (step === 4) {
        setStep(3);
      }
    }
  };

  const mockDoctors: Doctor[] = [
    {
      id: 'doc-001',
      name: 'Dr. Sarah Smith',
      specialization: 'Cardiology',
      department: 'Cardiology',
      rating: 4.8,
      availableSlots: []
    },
    {
      id: 'doc-002',
      name: 'Dr. James Wilson',
      specialization: 'Dermatology',
      department: 'Dermatology',
      rating: 4.9,
      availableSlots: []
    },
    {
      id: 'doc-003',
      name: 'Dr. Emily Johnson',
      specialization: 'Pediatrics',
      department: 'Pediatrics',
      rating: 4.7,
      availableSlots: []
    },
    {
      id: 'doc-004',
      name: 'Dr. Michael Brown',
      specialization: 'Orthopedics',
      department: 'Orthopedics',
      rating: 4.6,
      availableSlots: []
    }
  ];

  const availableDoctors = doctors.length > 0 ? doctors : mockDoctors;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader className="shrink-0">
          <DialogTitle className="text-2xl">Book an Appointment</DialogTitle>
          <DialogDescription>
            Schedule your consultation with our medical professionals
          </DialogDescription>
        </DialogHeader>

        {/* Progress Indicator */}
        <div className="flex justify-between mb-6 shrink-0">
          {[1, 2, 3, 4].map((stepNum) => (
            <div key={stepNum} className="flex flex-col items-center flex-1">
              <div className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-all duration-300",
                step >= stepNum 
                  ? "bg-primary text-primary-foreground shadow-md" 
                  : "bg-muted text-muted-foreground"
              )}>
                {step > stepNum ? (
                  <Check className="h-5 w-5" />
                ) : (
                  <span className="font-medium">{stepNum}</span>
                )}
              </div>
              <span className="text-xs text-muted-foreground text-center">
                {stepNum === 1 && 'Select Doctor'}
                {stepNum === 2 && 'Choose Date'}
                {stepNum === 3 && 'Select Time'}
                {stepNum === 4 && 'Confirm'}
              </span>
            </div>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto px-2">
          {/* Step 1: Select Doctor */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">Select a Doctor</h3>
                <p className="text-muted-foreground">Choose the specialist you'd like to consult with</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {availableDoctors.map((doctor) => (
                  <Card 
                    key={doctor.id} 
                    className={cn(
                      "cursor-pointer transition-all duration-300 hover:shadow-md hover:-translate-y-0.5",
                      selectedDoctor?.id === doctor.id && "border-primary shadow-md ring-2 ring-primary/20"
                    )}
                    onClick={() => handleDoctorSelect(doctor)}
                  >
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <Stethoscope className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{doctor.name}</CardTitle>
                          <CardDescription>{doctor.specialization}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <span className="text-yellow-500">★</span>
                          <span className="font-medium">{doctor.rating}</span>
                        </div>
                        <Badge variant="secondary">{doctor.department}</Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Select Date */}
          {step === 2 && selectedDoctor && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">Select Date</h3>
                <p className="text-muted-foreground">
                  Choose a date for your appointment with {selectedDoctor.name}
                </p>
              </div>
              
              <div className="flex flex-col lg:flex-row gap-6">
                <div className="flex-1">
                  <DayPicker
                    mode="single"
                    selected={selectedDate}
                    onSelect={handleDateSelect}
                    disabled={{ before: new Date() }}
                    className="border rounded-lg p-4"
                  />
                </div>
                
                <div className="flex-1 space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <User className="h-5 w-5" />
                        Selected Doctor
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <p className="font-medium">{selectedDoctor.name}</p>
                        <p className="text-sm text-muted-foreground">{selectedDoctor.specialization}</p>
                        <div className="flex items-center gap-1">
                          <span className="text-yellow-500">★</span>
                          <span>{selectedDoctor.rating}</span>
                        </div>
                        <Badge variant="secondary">{selectedDoctor.department}</Badge>
                      </div>
                    </CardContent>
                  </Card>
                  
                  {selectedDate && (
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Calendar className="h-5 w-5" />
                          Selected Date
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="font-medium">{format(selectedDate, 'PPP')}</p>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </div>
              
              {isLoading && (
                <div className="flex justify-center py-4">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
              )}
              
              {error && (
                <div className="flex items-center gap-2 p-3 bg-destructive/10 text-destructive rounded-lg">
                  <AlertCircle className="h-4 w-4" />
                  <span className="text-sm">{error}</span>
                </div>
              )}
            </div>
          )}

          {/* Step 3: Select Time Slot */}
          {step === 3 && selectedDoctor && selectedDate && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">Select Time Slot</h3>
                <p className="text-muted-foreground">
                  Choose an available time for your appointment
                </p>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-4">Available Time Slots</h4>
                  {isLoading ? (
                    <div className="flex justify-center py-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                    </div>
                  ) : availableSlots.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {availableSlots.map((slot) => (
                        <Button
                          key={slot.id}
                          variant={selectedTimeSlot?.id === slot.id ? "default" : "outline"}
                          className="h-12 text-sm"
                          onClick={() => handleTimeSlotSelect(slot)}
                        >
                          <Clock className="h-4 w-4 mr-2" />
                          {slot.startTime}
                        </Button>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      <Clock className="h-12 w-12 mx-auto mb-3 opacity-50" />
                      <p>No available slots for this date</p>
                      <Button 
                        variant="outline" 
                        className="mt-4"
                        onClick={() => setStep(2)}
                      >
                        Choose Different Date
                      </Button>
                    </div>
                  )}
                </div>
                
                <div className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Appointment Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{selectedDoctor.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>{format(selectedDate, 'PPP')}</span>
                      </div>
                      {selectedTimeSlot && (
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span>{selectedTimeSlot.startTime} - {selectedTimeSlot.endTime}</span>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                  
                  {error && (
                    <div className="flex items-center gap-2 p-3 bg-destructive/10 text-destructive rounded-lg">
                      <AlertCircle className="h-4 w-4" />
                      <span className="text-sm">{error}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Confirm Booking */}
          {step === 4 && selectedDoctor && selectedDate && selectedTimeSlot && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">Confirm Your Appointment</h3>
                <p className="text-muted-foreground">
                  Review your appointment details before confirming
                </p>
              </div>
              
              <Card className="border-2 border-primary/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-green-500" />
                    Appointment Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <h4 className="font-medium text-muted-foreground">Doctor</h4>
                      <p className="font-medium">{selectedDoctor.name}</p>
                      <p className="text-sm text-muted-foreground">{selectedDoctor.specialization}</p>
                      <Badge variant="secondary">{selectedDoctor.department}</Badge>
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="font-medium text-muted-foreground">Appointment</h4>
                      <p className="font-medium">{format(selectedDate, 'PPP')}</p>
                      <p className="text-sm text-muted-foreground">
                        {selectedTimeSlot.startTime} - {selectedTimeSlot.endTime}
                      </p>
                      <Badge variant="default" className="mt-2">Teleconsultation</Badge>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t">
                    <p className="text-sm text-muted-foreground">
                      By confirming, you agree to our appointment policy and terms of service.
                    </p>
                  </div>
                </CardContent>
              </Card>
              
              {error && (
                <div className="flex items-center gap-2 p-3 bg-destructive/10 text-destructive rounded-lg">
                  <AlertCircle className="h-4 w-4" />
                  <span className="text-sm">{error}</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-6 pt-4 border-t shrink-0">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={step === 1 || isLoading}
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          
          <div className="space-x-2">
            {step < 4 && (
              <Button
                onClick={() => {
                  if (step === 1 && selectedDoctor) setStep(2);
                  else if (step === 2 && selectedDate) setStep(3);
                  else if (step === 3 && selectedTimeSlot) setStep(4);
                }}
                disabled={
                  isLoading || 
                  (step === 1 && !selectedDoctor) ||
                  (step === 2 && !selectedDate) ||
                  (step === 3 && !selectedTimeSlot)
                }
              >
                Continue
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            )}
            {step === 4 && (
              <Button
                onClick={handleConfirmBooking}
                disabled={isLoading}
                className="bg-primary hover:bg-primary/90"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Booking...
                  </>
                ) : (
                  'Confirm Appointment'
                )}
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}