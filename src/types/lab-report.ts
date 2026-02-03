export interface LabResult {
  testName: string;
  value: string;
  unit: string;
  referenceRange: string;
  status: 'normal' | 'high' | 'low' | 'critical' | 'borderline';
}

export interface LabTest {
  id: string;
  testName: string;
  description: string;
  category: string;
  estimatedTime: string;
  status: 'pending' | 'in-progress' | 'completed' | 'cancelled';
}

export interface LabReport {
  id: string;
  patientId: string;
  patientName: string;
  patientAge: number;
  patientGender: 'male' | 'female' | 'other';
  doctorId: string;
  doctorName: string;
  testType: string;
  testDate: Date;
  status: 'pending' | 'in-progress' | 'completed' | 'cancelled';
  results: LabResult[];
  notes: string;
  reportFile?: string;
  labTechnician: string;
  reviewedBy: string;
  reviewedDate: Date;
}

export interface LabOrder {
  id: string;
  patientId: string;
  doctorId: string;
  orderedDate: Date;
  tests: LabTest[];
  priority: 'routine' | 'urgent' | 'stat';
  status: 'ordered' | 'sample-collected' | 'in-progress' | 'completed' | 'cancelled';
  notes: string;
}