"use client";

import { useEffect, useState } from "react";
import { appointmentService } from "@/lib/appointment-service";
import { medicalRecordService } from "@/lib/medical-record-service";
import { labReportService } from "@/lib/lab-report-service";
import { patientService } from "@/lib/patient-service";
import { Appointment, Patient } from "@/types/appointment";
import { MedicalRecord } from "@/types/medical-record";
import { LabReport } from "@/types/lab-report";

interface DemoDataState {
  appointments: Appointment[];
  records: MedicalRecord[];
  labReports: LabReport[];
  patients: Patient[];
  loading: boolean;
  error: string | null;
}

export function useDemoData(): DemoDataState {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [records, setRecords] = useState<MedicalRecord[]>([]);
  const [labReports, setLabReports] = useState<LabReport[]>([]);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isActive = true;

    const load = async () => {
      try {
        const [appointmentsData, recordsData, labReportsData, patientsData] = await Promise.all([
          appointmentService.getAppointments(),
          medicalRecordService.getPatientRecords("pat-001"),
          labReportService.getLabReportsByStatus("completed"),
          patientService.getAllPatients()
        ]);

        if (!isActive) return;

        setAppointments(appointmentsData);
        setRecords(recordsData);
        setLabReports(labReportsData);
        setPatients(patientsData);
      } catch (err) {
        if (isActive) {
          setError("Failed to load demo data. Please refresh the page.");
        }
      } finally {
        if (isActive) {
          setLoading(false);
        }
      }
    };

    load();

    return () => {
      isActive = false;
    };
  }, []);

  return {
    appointments,
    records,
    labReports,
    patients,
    loading,
    error
  };
}
