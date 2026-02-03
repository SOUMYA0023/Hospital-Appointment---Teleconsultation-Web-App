import { Appointment, TimeSlot, Doctor } from '../types/appointment';

// Mock data for demonstration
const mockAppointments: Appointment[] = [
  {
    id: 'apt-001',
    patientId: 'pat-001',
    patientName: 'John Doe',
    doctorId: 'doc-001',
    doctorName: 'Dr. Sarah Smith',
    department: 'Cardiology',
    date: new Date('2024-10-15'),
    startTime: '09:00',
    endTime: '09:30',
    status: 'confirmed',
    type: 'teleconsultation',
    notes: 'Regular checkup'
  },
  {
    id: 'apt-002',
    patientId: 'pat-002',
    patientName: 'Jane Smith',
    doctorId: 'doc-002',
    doctorName: 'Dr. James Wilson',
    department: 'Dermatology',
    date: new Date('2024-10-16'),
    startTime: '10:00',
    endTime: '10:30',
    status: 'scheduled',
    type: 'in-person',
    notes: 'Follow-up visit'
  }
];

const mockTimeSlots: TimeSlot[] = [
  {
    id: 'slot-001',
    doctorId: 'doc-001',
    doctorName: 'Dr. Sarah Smith',
    department: 'Cardiology',
    date: new Date('2024-10-15'),
    startTime: '09:00',
    endTime: '09:30',
    isAvailable: true
  },
  {
    id: 'slot-002',
    doctorId: 'doc-001',
    doctorName: 'Dr. Sarah Smith',
    department: 'Cardiology',
    date: new Date('2024-10-15'),
    startTime: '09:30',
    endTime: '10:00',
    isAvailable: true
  },
  {
    id: 'slot-003',
    doctorId: 'doc-001',
    doctorName: 'Dr. Sarah Smith',
    department: 'Cardiology',
    date: new Date('2024-10-15'),
    startTime: '10:00',
    endTime: '10:30',
    isAvailable: false
  },
  {
    id: 'slot-004',
    doctorId: 'doc-002',
    doctorName: 'Dr. James Wilson',
    department: 'Dermatology',
    date: new Date('2024-10-16'),
    startTime: '10:00',
    endTime: '10:30',
    isAvailable: true
  }
];

export const appointmentService = {
  getAppointments: async (): Promise<Appointment[]> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockAppointments;
  },

  getAppointmentById: async (id: string): Promise<Appointment | undefined> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockAppointments.find(app => app.id === id);
  },

  getAvailableTimeSlots: async (
    doctorId: string,
    date: Date
  ): Promise<TimeSlot[]> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockTimeSlots.filter(slot => 
      slot.doctorId === doctorId && 
      slot.date.toDateString() === date.toDateString() &&
      slot.isAvailable
    );
  },

  getAllAvailableTimeSlots: async (
    date: Date
  ): Promise<TimeSlot[]> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockTimeSlots.filter(slot => 
      slot.date.toDateString() === date.toDateString() &&
      slot.isAvailable
    );
  },

  createAppointment: async (appointmentData: Omit<Appointment, 'id' | 'status'>): Promise<Appointment> => {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const newAppointment: Appointment = {
      ...appointmentData,
      id: `apt-${Math.floor(Math.random() * 10000)}`,
      status: 'scheduled'
    };
    
    // Update mock data
    mockAppointments.push(newAppointment);
    
    // Mark the time slot as unavailable
    const slotIndex = mockTimeSlots.findIndex(slot => 
      slot.doctorId === appointmentData.doctorId &&
      slot.date.toDateString() === appointmentData.date.toDateString() &&
      slot.startTime === appointmentData.startTime
    );
    
    if (slotIndex !== -1) {
      mockTimeSlots[slotIndex].isAvailable = false;
    }
    
    return newAppointment;
  },

  updateAppointment: async (id: string, updateData: Partial<Appointment>): Promise<Appointment | null> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const index = mockAppointments.findIndex(app => app.id === id);
    if (index === -1) return null;
    
    mockAppointments[index] = { ...mockAppointments[index], ...updateData };
    return mockAppointments[index];
  },

  cancelAppointment: async (id: string): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const index = mockAppointments.findIndex(app => app.id === id);
    if (index === -1) return false;
    
    mockAppointments[index].status = 'cancelled';
    
    // Make the time slot available again
    const cancelledApp = mockAppointments[index];
    const slotIndex = mockTimeSlots.findIndex(slot => 
      slot.doctorId === cancelledApp.doctorId &&
      slot.date.toDateString() === cancelledApp.date.toDateString() &&
      slot.startTime === cancelledApp.startTime
    );
    
    if (slotIndex !== -1) {
      mockTimeSlots[slotIndex].isAvailable = true;
    }
    
    return true;
  }
};