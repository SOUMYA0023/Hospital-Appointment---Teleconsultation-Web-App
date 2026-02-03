"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { FileText, Download, Eye, FlaskConical, HeartPulse, Stethoscope, Syringe, User } from "lucide-react"

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { medicalRecordService } from '@/lib/medical-record-service';
import { labReportService } from '@/lib/lab-report-service';
import { MedicalRecord } from '@/types/medical-record';
import { LabReport } from '@/types/lab-report';

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function MedicalRecordsPage() {
    const [medicalRecords, setMedicalRecords] = useState<MedicalRecord[]>([]);
    const [labReports, setLabReports] = useState<LabReport[]>([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                // In a real app, we would get the patient ID from auth context
                const patientId = 'pat-001'; // Mock patient ID
                
                // Fetch both medical records and lab reports
                const [medicalRecs, labRecs] = await Promise.all([
                    medicalRecordService.getPatientRecords(patientId),
                    labReportService.getPatientLabReports(patientId)
                ]);
                
                setMedicalRecords(medicalRecs);
                setLabReports(labRecs);
            } catch (error) {
                console.error('Error fetching records:', error);
            } finally {
                setLoading(false);
            }
        };
        
        fetchData();
    }, []);
    
    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-primary">Medical Records</h2>
                    <p className="text-muted-foreground">View and download your medical history and lab reports.</p>
                </div>
                <Button variant="outline">Request Records</Button>
            </div>

            <Tabs defaultValue="medical" className="w-full">
                <TabsList>
                    <TabsTrigger value="medical">Medical Records</TabsTrigger>
                    <TabsTrigger value="labs">Lab Reports</TabsTrigger>
                </TabsList>

                <TabsContent value="medical" className="mt-4">
                    {loading ? (
                        <div className="flex items-center justify-center h-[40vh]">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                        </div>
                    ) : medicalRecords.length > 0 ? (
                        <div className="space-y-4">
                            {medicalRecords.map((record) => (
                                <Link href={`/patient/records/detail/${record.id}`} key={record.id}>
                                    <Card className="hover:shadow-md transition-shadow cursor-pointer">
                                        <CardHeader className="pb-3">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <CardTitle className="text-lg">{record.title}</CardTitle>
                                                    <CardDescription>
                                                        {record.doctorName} • {record.date.toLocaleDateString()} • {record.type.replace('-', ' ')}
                                                    </CardDescription>
                                                </div>
                                                <Badge variant="outline" className="capitalize">
                                                    {record.type.replace('-', ' ')}
                                                </Badge>
                                            </div>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                                                <div className="flex items-center gap-1">
                                                    <HeartPulse className="h-4 w-4" />
                                                    <span>{record.vitalSigns.bloodPressure}</span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <Stethoscope className="h-4 w-4" />
                                                    <span>{record.diagnosis.length} condition(s)</span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <Syringe className="h-4 w-4" />
                                                    <span>{record.treatmentPlan.medications.length} medication(s)</span>
                                                </div>
                                            </div>
                                            <p className="mt-3 text-sm line-clamp-2">{record.notes}</p>
                                        </CardContent>
                                    </Card>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-12 text-center">
                            <FileText className="h-16 w-16 text-muted-foreground mb-4" />
                            <h3 className="text-xl font-semibold mb-2">No Medical Records</h3>
                            <p className="text-muted-foreground mb-4 max-w-md">
                                You don't have any medical records yet. Medical records will appear here after your consultations.
                            </p>
                            <Button asChild>
                                <Link href="/patient/appointments">Book Appointment</Link>
                            </Button>
                        </div>
                    )}
                </TabsContent>

                <TabsContent value="labs" className="mt-4">
                    {loading ? (
                        <div className="flex items-center justify-center h-[40vh]">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                        </div>
                    ) : labReports.length > 0 ? (
                        <div className="space-y-4">
                            {labReports.map((report) => (
                                <Link href={`/patient/records/lab-reports/${report.id}`} key={report.id}>
                                    <Card className="hover:shadow-md transition-shadow cursor-pointer">
                                        <CardHeader className="pb-3">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <CardTitle className="text-lg">{report.testType}</CardTitle>
                                                    <CardDescription>
                                                        {report.doctorName} • {report.testDate.toLocaleDateString()} • {report.status}
                                                    </CardDescription>
                                                </div>
                                                <Badge variant="outline" className="capitalize">
                                                    {report.status}
                                                </Badge>
                                            </div>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                                                <div className="flex items-center gap-1">
                                                    <FlaskConical className="h-4 w-4" />
                                                    <span>{report.results.length} test(s)</span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <User className="h-4 w-4" />
                                                    <span>{report.labTechnician}</span>
                                                </div>
                                            </div>
                                            <p className="mt-3 text-sm line-clamp-2">{report.notes}</p>
                                        </CardContent>
                                    </Card>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-12 text-center">
                            <FileText className="h-16 w-16 text-muted-foreground mb-4" />
                            <h3 className="text-xl font-semibold mb-2">No Lab Reports</h3>
                            <p className="text-muted-foreground mb-4 max-w-md">
                                You don't have any lab reports yet. Lab reports will appear here after your tests are completed.
                            </p>
                            <Button asChild>
                                <Link href="/patient/appointments">View Appointments</Link>
                            </Button>
                        </div>
                    )}
                </TabsContent>
            </Tabs>
        </div>
    )
}
