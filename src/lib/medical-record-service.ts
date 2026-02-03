import { MedicalRecord, PatientRecord, VitalSigns, Diagnosis, TreatmentPlan } from '../types/medical-record';

// Mock data for demonstration
const mockMedicalRecords: MedicalRecord[] = [
  {
    id: 'rec-001',
    patientId: 'pat-001',
    patientName: 'John Doe',
    doctorId: 'doc-001',
    doctorName: 'Dr. Sarah Smith',
    date: new Date('2024-10-10'),
    type: 'consultation',
    title: 'General Checkup',
    description: 'Routine general health examination',
    vitalSigns: {
      bloodPressure: '120/80 mmHg',
      heartRate: '72 bpm',
      temperature: '98.6°F',
      respiratoryRate: '16/min',
      oxygenSaturation: '98%',
      height: '175 cm',
      weight: '70 kg'
    },
    diagnosis: [
      {
        code: 'Z00.00',
        name: 'Encounter for general adult medical examination without abnormal findings',
        description: 'Regular checkup with no significant findings'
      }
    ],
    treatmentPlan: {
      medications: [],
      procedures: [],
      followUp: 'Return in 6 months for routine checkup',
      recommendations: ['Maintain healthy diet', 'Regular exercise']
    },
    notes: 'Patient in good health. All vitals normal.',
    attachments: []
  },
  {
    id: 'rec-002',
    patientId: 'pat-001',
    patientName: 'John Doe',
    doctorId: 'doc-001',
    doctorName: 'Dr. Sarah Smith',
    date: new Date('2024-09-15'),
    type: 'follow-up',
    title: 'Cardiology Follow-up',
    description: 'Follow-up visit for hypertension management',
    vitalSigns: {
      bloodPressure: '135/85 mmHg',
      heartRate: '76 bpm',
      temperature: '98.4°F',
      respiratoryRate: '16/min',
      oxygenSaturation: '99%',
      height: '175 cm',
      weight: '71 kg'
    },
    diagnosis: [
      {
        code: 'I10',
        name: 'Essential (primary) hypertension',
        description: 'High blood pressure, well controlled on current medication'
      }
    ],
    treatmentPlan: {
      medications: [
        {
          name: 'Lisinopril',
          dosage: '10mg',
          frequency: 'once daily',
          duration: 'ongoing'
        }
      ],
      procedures: [],
      followUp: 'Return in 3 months',
      recommendations: ['Continue current medication', 'Monitor BP regularly']
    },
    notes: 'BP slightly elevated but within target range. Patient compliant with medication.',
    attachments: ['echo-report.pdf', 'blood-work.pdf']
  }
];

export const medicalRecordService = {
  getPatientRecords: async (patientId: string): Promise<MedicalRecord[]> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockMedicalRecords.filter(record => record.patientId === patientId);
  },

  getMedicalRecordById: async (recordId: string): Promise<MedicalRecord | undefined> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockMedicalRecords.find(record => record.id === recordId);
  },

  getRecordsByDateRange: async (
    patientId: string,
    startDate: Date,
    endDate: Date
  ): Promise<MedicalRecord[]> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockMedicalRecords.filter(record => 
      record.patientId === patientId &&
      record.date >= startDate &&
      record.date <= endDate
    );
  },

  createMedicalRecord: async (recordData: Omit<MedicalRecord, 'id'>): Promise<MedicalRecord> => {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const newRecord: MedicalRecord = {
      ...recordData,
      id: `rec-${Math.floor(Math.random() * 10000)}`
    };
    
    // Update mock data
    mockMedicalRecords.push(newRecord);
    
    return newRecord;
  },

  updateMedicalRecord: async (id: string, updateData: Partial<MedicalRecord>): Promise<MedicalRecord | null> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const index = mockMedicalRecords.findIndex(rec => rec.id === id);
    if (index === -1) return null;
    
    mockMedicalRecords[index] = { ...mockMedicalRecords[index], ...updateData };
    return mockMedicalRecords[index];
  },

  deleteMedicalRecord: async (id: string): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const index = mockMedicalRecords.findIndex(rec => rec.id === id);
    if (index === -1) return false;
    
    mockMedicalRecords.splice(index, 1);
    return true;
  }
};