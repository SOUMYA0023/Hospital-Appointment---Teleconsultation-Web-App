"use client";

import React, { useEffect, useMemo, useState } from "react";
import ProtectedRoute from "@/components/shared/ProtectedRoute";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { useAuth } from "@/features/auth/auth-context";
import { useDemoData } from "@/hooks/use-demo-data";
import { AppointmentCard, AppointmentCardSkeleton } from "@/components/appointments/AppointmentCard";
import AppointmentBookingModal from "@/components/appointments/BookingModal";
import MedicalRecordView from "@/components/features/medical-records/MedicalRecordView";
import { RecordCard, RecordCardSkeleton } from "@/components/medical-records/RecordCard";
import { ChatInterface } from "@/components/chat/ChatInterface";
import PatientRegistrationForm from "@/components/features/patients/PatientRegistrationForm";
import LabReportUploadForm from "@/components/features/lab/LabReportUploadForm";
import { LabReportDetail } from "@/components/features/lab-reports/LabReportDetail";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { patientService } from "@/lib/patient-service";
import { Appointment, Patient } from "@/types/appointment";


type AppRole = "patient" | "doctor" | "receptionist" | "lab_technician";

type RouteParams = {
  role: string;
  section: string;
};

const roleFromSlug = (slug: string): AppRole | null => {
  switch (slug) {
    case "patient":
    case "doctor":
    case "receptionist":
      return slug;
    case "lab":
    case "lab_technician":
      return "lab_technician";
    default:
      return null;
  }
};

const defaultNames: Record<AppRole, string> = {
  patient: "John Doe",
  doctor: "Dr. Sarah Smith",
  receptionist: "Emily Rose",
  lab_technician: "Tech. Mike"
};

const sectionTitles: Record<AppRole, Record<string, string>> = {
  patient: {
    appointments: "Appointments",
    records: "Medical Records",
    messages: "Messages",
    profile: "Profile"
  },
  doctor: {
    schedule: "My Schedule",
    patients: "My Patients",
    messages: "Messages",
    profile: "Profile"
  },
  receptionist: {
    appointments: "All Appointments",
    registration: "Patient Registration",
    queue: "Queue Management"
  },
  lab_technician: {
    requests: "Test Requests",
    reports: "Lab Reports",
    profile: "Profile"
  }
};

export default function RoleSectionPage({ params }: { params: RouteParams }) {
  const role = roleFromSlug(params.role);
  const section = params.section;
  const { user } = useAuth();
  const { appointments, records, labReports, patients, loading, error } = useDemoData();

  const [bookingOpen, setBookingOpen] = useState(false);
  const [appointmentList, setAppointmentList] = useState<Appointment[]>([]);
  const [activeRecordId, setActiveRecordId] = useState<string | null>(null);
  const [isRegistering, setIsRegistering] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (!loading) {
      setAppointmentList(appointments);
    }
  }, [appointments, loading]);

  useEffect(() => {
    if (!activeRecordId && records.length > 0) {
      setActiveRecordId(records[0].id);
    }
  }, [activeRecordId, records]);

  if (!role) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/30 p-6">
        <Card className="max-w-lg w-full">
          <CardHeader>
            <CardTitle>Unknown section</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            The requested section does not exist. Please return to the home page and select a valid role.
          </CardContent>
        </Card>
      </div>
    );
  }

  const displayName = user?.name || defaultNames[role];

  const scopedAppointments = useMemo(() => {
    if (role === "patient") {
      return appointmentList.filter((appointment) => appointment.patientName === displayName);
    }
    if (role === "doctor") {
      return appointmentList.filter((appointment) => appointment.doctorName === displayName);
    }
    return appointmentList;
  }, [appointmentList, displayName, role]);

  const scopedRecords = useMemo(() => {
    if (role === "patient") {
      return records.filter((record) => record.patientName === displayName);
    }
    return records;
  }, [displayName, records, role]);

  const scopedLabReports = useMemo(() => {
    if (role === "patient") {
      return labReports.filter((report) => report.patientName === displayName);
    }
    return labReports;
  }, [displayName, labReports, role]);

  const activeRecord = scopedRecords.find((record) => record.id === activeRecordId) || scopedRecords[0];

  const fallbackTitle = section
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
  const title = sectionTitles[role]?.[section] || fallbackTitle;

  const handleRegisterPatient = async (data: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    dateOfBirth: string;
    gender: string;
    bloodType: string;
    medicalHistory: string;
    allergies: string;
    emergencyContact: { name: string; relationship: string; phone: string };
  }) => {
    setIsRegistering(true);
    try {
      await patientService.registerPatient({
        name: `${data.firstName} ${data.lastName}`.trim(),
        email: data.email,
        phone: data.phone,
        dateOfBirth: new Date(data.dateOfBirth),
        gender: (data.gender || "other") as Patient["gender"],
        bloodType: data.bloodType,
        medicalHistory: data.medicalHistory
          ? data.medicalHistory.split(",").map((item) => item.trim()).filter(Boolean)
          : []
      });
    } finally {
      setIsRegistering(false);
    }
  };

  const labRequests = [
    {
      id: "req-001",
      patientName: "John Doe",
      priority: "routine",
      status: "in-progress",
      tests: ["CBC", "Lipid Panel"],
      orderedDate: new Date("2024-10-12")
    },
    {
      id: "req-002",
      patientName: "Jane Smith",
      priority: "urgent",
      status: "sample-collected",
      tests: ["Metabolic Panel"],
      orderedDate: new Date("2024-10-13")
    }
  ];

  const queueItems = [
    { id: "queue-1", name: "John Doe", status: "Waiting", time: "9:30 AM" },
    { id: "queue-2", name: "Jane Smith", status: "In Progress", time: "9:45 AM" },
    { id: "queue-3", name: "Michael Brown", status: "Completed", time: "10:00 AM" }
  ];

  const renderSectionContent = () => {
    if (role === "patient") {
      switch (section) {
        case "appointments":
          return (
            <div className="space-y-6">
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-lg font-semibold">Your appointments</h2>
                  <p className="text-sm text-muted-foreground">Manage your visits and teleconsultations</p>
                </div>
                <Button onClick={() => setBookingOpen(true)}>Book Appointment</Button>
              </div>

              <div className="grid gap-4">
                {loading ? (
                  <>
                    <AppointmentCardSkeleton />
                    <AppointmentCardSkeleton />
                  </>
                ) : scopedAppointments.length > 0 ? (
                  scopedAppointments.map((appointment) => (
                    <AppointmentCard
                      key={appointment.id}
                      {...appointment}
                      onReschedule={() => undefined}
                      onCancel={() => undefined}
                      onJoin={() => undefined}
                      onViewDetails={() => undefined}
                    />
                  ))
                ) : (
                  <Card className="p-6 text-sm text-muted-foreground">No appointments scheduled.</Card>
                )}
              </div>

              <AppointmentBookingModal
                open={bookingOpen}
                onOpenChange={setBookingOpen}
                onBookingComplete={(appointment) => {
                  const normalized = {
                    ...appointment,
                    patientName: displayName,
                    patientId: user?.id || appointment.patientId
                  };
                  setAppointmentList((prev) => [normalized, ...prev]);
                }}
              />
            </div>
          );

        case "records":
          return (
            <div className="grid gap-6 lg:grid-cols-3">
              <div className="lg:col-span-2">
                {loading ? (
                  <RecordCardSkeleton />
                ) : activeRecord ? (
                  <MedicalRecordView record={activeRecord} />
                ) : (
                  <Card className="p-6 text-sm text-muted-foreground">No medical records available.</Card>
                )}
              </div>
              <div className="space-y-4">
                {loading ? (
                  <>
                    <RecordCardSkeleton />
                    <RecordCardSkeleton />
                  </>
                ) : (
                  scopedRecords.map((record) => (
                    <RecordCard key={record.id} record={record} onView={() => setActiveRecordId(record.id)} />
                  ))
                )}
              </div>
            </div>
          );

        case "messages":
          return <ChatInterface />;

        case "profile":
          return (
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Review and update your personal details.</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4 md:grid-cols-2 text-sm">
                <div>
                  <p className="text-muted-foreground">Full Name</p>
                  <p className="font-medium">{displayName}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Email</p>
                  <p className="font-medium">{user?.email || "user@medicare.com"}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Role</p>
                  <p className="font-medium">Patient</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Preferred Contact</p>
                  <p className="font-medium">Email & Phone</p>
                </div>
              </CardContent>
            </Card>
          );
        default:
          return (
            <Card className="p-6 text-sm text-muted-foreground">
              This section is not available for patients yet.
            </Card>
          );
      }
    }

    if (role === "doctor") {
      switch (section) {
        case "schedule":
          return (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold">Upcoming appointments</h2>
                <p className="text-sm text-muted-foreground">Review your schedule for the week.</p>
              </div>
              <div className="grid gap-4">
                {loading ? (
                  <>
                    <AppointmentCardSkeleton />
                    <AppointmentCardSkeleton />
                  </>
                ) : scopedAppointments.length > 0 ? (
                  scopedAppointments.map((appointment) => (
                    <AppointmentCard key={appointment.id} {...appointment} onViewDetails={() => undefined} />
                  ))
                ) : (
                  <Card className="p-6 text-sm text-muted-foreground">No appointments scheduled.</Card>
                )}
              </div>
            </div>
          );

        case "patients":
          return (
            <div className="grid gap-4 md:grid-cols-2">
              {patients.map((patient) => (
                <Card key={patient.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">{patient.name}</CardTitle>
                    <CardDescription>{patient.email}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{patient.bloodType}</Badge>
                      <span className="text-muted-foreground">{patient.phone}</span>
                    </div>
                    <div className="text-muted-foreground">
                      Medical history: {patient.medicalHistory.join(", ") || "None"}
                    </div>
                    <Button variant="outline" size="sm">View Profile</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          );

        case "messages":
          return <ChatInterface />;

        case "profile":
          return (
            <Card>
              <CardHeader>
                <CardTitle>Doctor Profile</CardTitle>
                <CardDescription>Update your availability and contact details.</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4 md:grid-cols-2 text-sm">
                <div>
                  <p className="text-muted-foreground">Full Name</p>
                  <p className="font-medium">{displayName}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Email</p>
                  <p className="font-medium">{user?.email || "doctor@medicare.com"}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Specialty</p>
                  <p className="font-medium">Cardiology</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Status</p>
                  <p className="font-medium">Available for teleconsults</p>
                </div>
              </CardContent>
            </Card>
          );

        default:
          return (
            <Card className="p-6 text-sm text-muted-foreground">
              This section is not available for doctors yet.
            </Card>
          );
      }
    }

    if (role === "receptionist") {
      switch (section) {
        case "appointments":
          return (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold">All appointments</h2>
                <p className="text-sm text-muted-foreground">Manage and confirm visits across departments.</p>
              </div>
              <div className="grid gap-4">
                {loading ? (
                  <>
                    <AppointmentCardSkeleton />
                    <AppointmentCardSkeleton />
                  </>
                ) : appointmentList.length > 0 ? (
                  appointmentList.map((appointment) => (
                    <AppointmentCard key={appointment.id} {...appointment} onViewDetails={() => undefined} />
                  ))
                ) : (
                  <Card className="p-6 text-sm text-muted-foreground">No appointments scheduled.</Card>
                )}
              </div>
            </div>
          );

        case "registration":
          return (
            <PatientRegistrationForm
              onSubmit={handleRegisterPatient}
              onCancel={() => undefined}
              isSubmitting={isRegistering}
            />
          );

        case "queue":
          return (
            <Card>
              <CardHeader>
                <CardTitle>Queue Management</CardTitle>
                <CardDescription>Track walk-ins and appointment arrivals.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                {queueItems.map((item) => (
                  <div key={item.id} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-muted-foreground">Arrival: {item.time}</p>
                    </div>
                    <Badge variant={item.status === "Waiting" ? "secondary" : item.status === "In Progress" ? "default" : "outline"}>
                      {item.status}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          );

        default:
          return (
            <Card className="p-6 text-sm text-muted-foreground">
              This section is not available for reception yet.
            </Card>
          );
      }
    }

    switch (section) {
      case "requests":
        return (
          <Card>
            <CardHeader>
              <CardTitle>Lab Requests</CardTitle>
              <CardDescription>Prioritize and track incoming test orders.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              {labRequests.map((request) => (
                <div key={request.id} className="rounded-lg border p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="font-medium">{request.patientName}</p>
                      <p className="text-muted-foreground">Ordered {request.orderedDate.toLocaleDateString()}</p>
                    </div>
                    <Badge variant={request.priority === "urgent" ? "destructive" : "outline"}>
                      {request.priority}
                    </Badge>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {request.tests.map((test) => (
                      <Badge key={test} variant="secondary">{test}</Badge>
                    ))}
                    <Badge variant="outline">{request.status}</Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        );

      case "reports":
        return (
          <div className="space-y-6">
            <LabReportUploadForm
              onSubmit={async () => {
                setIsUploading(true);
                setTimeout(() => setIsUploading(false), 800);
              }}
              onCancel={() => undefined}
              isSubmitting={isUploading}
              patients={patients.map((patient) => ({ id: patient.id, name: patient.name }))}
            />

            {scopedLabReports[0] && (
              <div>
                <h2 className="text-lg font-semibold mb-3">Latest Report Preview</h2>
                <LabReportDetail report={scopedLabReports[0]} />
              </div>
            )}
          </div>
        );

      case "profile":
        return (
          <Card>
            <CardHeader>
              <CardTitle>Lab Technician Profile</CardTitle>
              <CardDescription>Manage certification and contact details.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2 text-sm">
              <div>
                <p className="text-muted-foreground">Full Name</p>
                <p className="font-medium">{displayName}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Email</p>
                <p className="font-medium">{user?.email || "lab@medicare.com"}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Shift</p>
                <p className="font-medium">Day Shift</p>
              </div>
              <div>
                <p className="text-muted-foreground">Specialization</p>
                <p className="font-medium">Clinical Chemistry</p>
              </div>
            </CardContent>
          </Card>
        );

      default:
        return (
          <Card className="p-6 text-sm text-muted-foreground">
            This section is not available for the lab yet.
          </Card>
        );
    }
  };

  return (
    <ProtectedRoute allowedRoles={[role]}>
      <DashboardLayout role={role} title={title}>
        {error && (
          <Card className="border-amber-200 bg-amber-50">
            <CardContent className="p-4 text-sm text-amber-900">{error}</CardContent>
          </Card>
        )}
        {renderSectionContent()}
      </DashboardLayout>
    </ProtectedRoute>
  );
}
