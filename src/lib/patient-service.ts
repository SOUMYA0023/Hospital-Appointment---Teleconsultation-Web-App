import { Patient } from '../types/appointment';

// Mock data for demonstration
const mockPatients: Patient[] = [
  {
    id: 'pat-001',
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    dateOfBirth: new Date('1989-05-15'),
    gender: 'male',
    bloodType: 'O+',
    medicalHistory: ['Hypertension', 'Diabetes'],
  },
  {
    id: 'pat-002',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    phone: '+1 (555) 987-6543',
    dateOfBirth: new Date('1995-12-03'),
    gender: 'female',
    bloodType: 'A+',
    medicalHistory: ['Asthma'],
  }
];

export const patientService = {
  getPatientById: async (patientId: string): Promise<Patient | undefined> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockPatients.find(patient => patient.id === patientId);
  },

  getPatientByEmail: async (email: string): Promise<Patient | undefined> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockPatients.find(patient => patient.email === email);
  },

  registerPatient: async (patientData: Omit<Patient, 'id'>): Promise<Patient> => {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const newPatient: Patient = {
      ...patientData,
      id: `pat-${Math.floor(Math.random() * 10000)}`
    };
    
    // Update mock data
    mockPatients.push(newPatient);
    
    return newPatient;
  },

  updatePatient: async (id: string, updateData: Partial<Patient>): Promise<Patient | null> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const index = mockPatients.findIndex(pat => pat.id === id);
    if (index === -1) return null;
    
    mockPatients[index] = { ...mockPatients[index], ...updateData };
    return mockPatients[index];
  },

  getAllPatients: async (): Promise<Patient[]> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return [...mockPatients];
  }
};