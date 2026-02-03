import { LabReport, LabTest, LabResult } from '../types/lab-report';

// Mock data for demonstration
const mockLabReports: LabReport[] = [
  {
    id: 'lab-001',
    patientId: 'pat-001',
    patientName: 'John Doe',
    patientAge: 35,
    patientGender: 'male',
    doctorId: 'doc-001',
    doctorName: 'Dr. Sarah Smith',
    testType: 'Complete Blood Count (CBC)',
    testDate: new Date('2024-10-05'),
    status: 'completed',
    results: [
      {
        testName: 'White Blood Cell Count',
        value: '7.2',
        unit: 'x10^9/L',
        referenceRange: '4.0-11.0',
        status: 'normal'
      },
      {
        testName: 'Red Blood Cell Count',
        value: '4.8',
        unit: 'x10^12/L',
        referenceRange: '4.2-5.4',
        status: 'normal'
      },
      {
        testName: 'Hemoglobin',
        value: '14.2',
        unit: 'g/dL',
        referenceRange: '12.0-16.0',
        status: 'normal'
      },
      {
        testName: 'Platelet Count',
        value: '280',
        unit: 'x10^9/L',
        referenceRange: '150-450',
        status: 'normal'
      }
    ],
    notes: 'All values within normal range. No abnormalities detected.',
    reportFile: 'cbc-report-2024-10-05.pdf',
    labTechnician: 'Tech. Mike',
    reviewedBy: 'Dr. Sarah Smith',
    reviewedDate: new Date('2024-10-06')
  },
  {
    id: 'lab-002',
    patientId: 'pat-002',
    patientName: 'Jane Smith',
    patientAge: 28,
    patientGender: 'female',
    doctorId: 'doc-002',
    doctorName: 'Dr. James Wilson',
    testType: 'Lipid Panel',
    testDate: new Date('2024-10-08'),
    status: 'completed',
    results: [
      {
        testName: 'Total Cholesterol',
        value: '198',
        unit: 'mg/dL',
        referenceRange: '<200',
        status: 'normal'
      },
      {
        testName: 'LDL Cholesterol',
        value: '115',
        unit: 'mg/dL',
        referenceRange: '<100 optimal',
        status: 'borderline'
      },
      {
        testName: 'HDL Cholesterol',
        value: '65',
        unit: 'mg/dL',
        referenceRange: '>40 for men, >50 for women',
        status: 'normal'
      },
      {
        testName: 'Triglycerides',
        value: '89',
        unit: 'mg/dL',
        referenceRange: '<150',
        status: 'normal'
      }
    ],
    notes: 'LDL slightly elevated. Recommend lifestyle modifications.',
    reportFile: 'lipid-panel-2024-10-08.pdf',
    labTechnician: 'Tech. Mike',
    reviewedBy: 'Dr. James Wilson',
    reviewedDate: new Date('2024-10-09')
  }
];

export const labReportService = {
  getPatientLabReports: async (patientId: string): Promise<LabReport[]> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockLabReports.filter(report => report.patientId === patientId);
  },

  getLabReportById: async (reportId: string): Promise<LabReport | undefined> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockLabReports.find(report => report.id === reportId);
  },

  getLabReportsByDateRange: async (
    startDate: Date,
    endDate: Date
  ): Promise<LabReport[]> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockLabReports.filter(report => 
      report.testDate >= startDate &&
      report.testDate <= endDate
    );
  },

  getLabReportsByStatus: async (status: string): Promise<LabReport[]> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockLabReports.filter(report => report.status === status);
  },

  createLabReport: async (reportData: Omit<LabReport, 'id'>): Promise<LabReport> => {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const newReport: LabReport = {
      ...reportData,
      id: `lab-${Math.floor(Math.random() * 10000)}`
    };
    
    // Update mock data
    mockLabReports.push(newReport);
    
    return newReport;
  },

  updateLabReport: async (id: string, updateData: Partial<LabReport>): Promise<LabReport | null> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const index = mockLabReports.findIndex(rep => rep.id === id);
    if (index === -1) return null;
    
    mockLabReports[index] = { ...mockLabReports[index], ...updateData };
    return mockLabReports[index];
  },

  deleteLabReport: async (id: string): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const index = mockLabReports.findIndex(rep => rep.id === id);
    if (index === -1) return false;
    
    mockLabReports.splice(index, 1);
    return true;
  }
};