export interface VitalSigns {
  bloodPressure: string;
  heartRate: string;
  temperature: string;
  respiratoryRate: string;
  oxygenSaturation: string;
  height: string;
  weight: string;
}

export interface Diagnosis {
  code: string;
  name: string;
  description: string;
}

export interface Medication {
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
}

export interface Procedure {
  name: string;
  date: Date;
  notes: string;
}

export interface TreatmentPlan {
  medications: Medication[];
  procedures: Procedure[];
  followUp: string;
  recommendations: string[];
}

export interface MedicalRecord {
  id: string;
  patientId: string;
  patientName: string;
  doctorId: string;
  doctorName: string;
  date: Date;
  type: 'consultation' | 'follow-up' | 'emergency' | 'surgery' | 'lab-result' | 'discharge';
  title: string;
  description: string;
  vitalSigns: VitalSigns;
  diagnosis: Diagnosis[];
  treatmentPlan: TreatmentPlan;
  notes: string;
  attachments: string[];
}

export interface PatientRecord {
  id: string;
  patientId: string;
  name: string;
  dateOfBirth: Date;
  gender: 'male' | 'female' | 'other';
  bloodType: string;
  allergies: string[];
  medicalHistory: string[];
  currentMedications: Medication[];
  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
  };
}