export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  doctorId: string;
  doctorName: string;
  department: string;
  date: Date;
  startTime: string;
  endTime: string;
  status: 'scheduled' | 'confirmed' | 'completed' | 'cancelled' | 'no-show';
  type: 'in-person' | 'teleconsultation';
  notes?: string;
}

export interface TimeSlot {
  id: string;
  doctorId: string;
  doctorName: string;
  department: string;
  date: Date;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
}

export interface Doctor {
  id: string;
  name: string;
  specialization: string;
  department: string;
  rating: number;
  availableSlots: TimeSlot[];
}

export interface Patient {
  id: string;
  name: string;
  email: string;
  phone: string;
  dateOfBirth: Date;
  gender: 'male' | 'female' | 'other';
  bloodType: string;
  medicalHistory: string[];
}