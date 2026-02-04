"use client";

import React, { useMemo } from "react";
import ProtectedRoute from "@/components/shared/ProtectedRoute";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { useAuth } from "@/features/auth/auth-context";
import { useDemoData } from "@/hooks/use-demo-data";
import { StatCard, StatCardSkeleton } from "@/components/ui/StatCard";
import { AppointmentCard, AppointmentCardSkeleton } from "@/components/appointments/AppointmentCard";
import { RecordCard, RecordCardSkeleton } from "@/components/medical-records/RecordCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  ClipboardList,
  FileText,
  FlaskConical,
  Heart,
  Users
} from "lucide-react";

type AppRole = "patient" | "doctor" | "receptionist" | "lab_technician";

type RouteParams = {
  role: string;
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

const roleTitles: Record<AppRole, string> = {
  patient: "Patient Dashboard",
  doctor: "Doctor Dashboard",
  receptionist: "Receptionist Dashboard",
  lab_technician: "Laboratory Dashboard"
};

const defaultNames: Record<AppRole, string> = {
  patient: "John Doe",
  doctor: "Dr. Sarah Smith",
  receptionist: "Emily Rose",
  lab_technician: "Tech. Mike"
};

export default function RoleDashboardPage({ params }: { params: RouteParams }) {
  const role = roleFromSlug(params.role);
  const { user } = useAuth();
  const { appointments, records, labReports, patients, loading, error } = useDemoData();

  if (!role) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/30 p-6">
        <Card className="max-w-lg w-full">
          <CardHeader>
            <CardTitle>Unknown dashboard</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            The requested role does not exist. Please return to the home page and select a valid role.
          </CardContent>
        </Card>
      </div>
    );
  }

  const displayName = user?.name || defaultNames[role];

  const scopedAppointments = useMemo(() => {
    if (role === "patient") {
      return appointments.filter((appointment) => appointment.patientName === displayName);
    }
    if (role === "doctor") {
      return appointments.filter((appointment) => appointment.doctorName === displayName);
    }
    return appointments;
  }, [appointments, displayName, role]);

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

  const renderPatientDashboard = () => {
    const upcomingAppointments = scopedAppointments.filter(
      (appointment) => appointment.status !== "cancelled" && appointment.status !== "completed"
    );

    return (
      <>
        <div className="grid gap-4 md:grid-cols-3">
          {loading ? (
            <>
              <StatCardSkeleton />
              <StatCardSkeleton />
              <StatCardSkeleton />
            </>
          ) : (
            <>
              <StatCard
                title="Upcoming Appointments"
                value={upcomingAppointments.length}
                description="Next 30 days"
                icon={<Calendar className="h-4 w-4 text-primary" />}
              />
              <StatCard
                title="Medical Records"
                value={scopedRecords.length}
                description="Available for download"
                icon={<FileText className="h-4 w-4 text-primary" />}
              />
              <StatCard
                title="Lab Reports"
                value={scopedLabReports.length}
                description="Last 6 months"
                icon={<FlaskConical className="h-4 w-4 text-primary" />}
              />
            </>
          )}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-3">
            <Button>Book Appointment</Button>
            <Button variant="outline">Request Refill</Button>
            <Button variant="outline">Download Records</Button>
          </CardContent>
        </Card>

        <div className="grid gap-6 lg:grid-cols-2">
          <div>
            <h2 className="text-lg font-semibold mb-3">Upcoming Appointments</h2>
            <div className="grid gap-4">
              {loading ? (
                <>
                  <AppointmentCardSkeleton />
                  <AppointmentCardSkeleton />
                </>
              ) : upcomingAppointments.length > 0 ? (
                upcomingAppointments.slice(0, 2).map((appointment) => (
                  <AppointmentCard key={appointment.id} {...appointment} onViewDetails={() => undefined} />
                ))
              ) : (
                <Card className="p-6 text-sm text-muted-foreground">No upcoming appointments.</Card>
              )}
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-3">Recent Medical Records</h2>
            <div className="grid gap-4">
              {loading ? (
                <>
                  <RecordCardSkeleton />
                  <RecordCardSkeleton />
                </>
              ) : scopedRecords.length > 0 ? (
                scopedRecords.slice(0, 2).map((record) => (
                  <RecordCard key={record.id} record={record} onView={() => undefined} />
                ))
              ) : (
                <Card className="p-6 text-sm text-muted-foreground">No records available yet.</Card>
              )}
            </div>
          </div>
        </div>
      </>
    );
  };

  const renderDoctorDashboard = () => {
    return (
      <>
        <div className="grid gap-4 md:grid-cols-3">
          {loading ? (
            <>
              <StatCardSkeleton />
              <StatCardSkeleton />
              <StatCardSkeleton />
            </>
          ) : (
            <>
              <StatCard
                title="Upcoming Appointments"
                value={scopedAppointments.length}
                description="Next 7 days"
                icon={<Calendar className="h-4 w-4 text-primary" />}
              />
              <StatCard
                title="Active Patients"
                value={patients.length}
                description="Under your care"
                icon={<Users className="h-4 w-4 text-primary" />}
              />
              <StatCard
                title="Lab Results"
                value={labReports.length}
                description="Awaiting review"
                icon={<FlaskConical className="h-4 w-4 text-primary" />}
              />
            </>
          )}
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div>
            <h2 className="text-lg font-semibold mb-3">Today&apos;s Schedule</h2>
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
                <Card className="p-6 text-sm text-muted-foreground">No scheduled appointments.</Card>
              )}
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Patient Alerts</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Hypertension Follow-up</p>
                  <p className="text-muted-foreground">John Doe requires follow-up</p>
                </div>
                <Badge variant="destructive">High</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Lab Results Ready</p>
                  <p className="text-muted-foreground">Review lipid panel</p>
                </div>
                <Badge variant="secondary">Medium</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Medication Renewal</p>
                  <p className="text-muted-foreground">Patient awaiting approval</p>
                </div>
                <Badge variant="outline">Low</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </>
    );
  };

  const renderReceptionistDashboard = () => {
    const pendingAppointments = appointments.filter((appointment) => appointment.status === "scheduled");

    return (
      <>
        <div className="grid gap-4 md:grid-cols-3">
          {loading ? (
            <>
              <StatCardSkeleton />
              <StatCardSkeleton />
              <StatCardSkeleton />
            </>
          ) : (
            <>
              <StatCard
                title="Total Appointments"
                value={appointments.length}
                description="Across departments"
                icon={<Calendar className="h-4 w-4 text-primary" />}
              />
              <StatCard
                title="Pending Confirmations"
                value={pendingAppointments.length}
                description="Awaiting approval"
                icon={<ClipboardList className="h-4 w-4 text-primary" />}
              />
              <StatCard
                title="Registered Patients"
                value={patients.length}
                description="Active profiles"
                icon={<Users className="h-4 w-4 text-primary" />}
              />
            </>
          )}
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Check-in Queue</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              {[
                { name: "John Doe", status: "Waiting" },
                { name: "Jane Smith", status: "In Progress" },
                { name: "Michael Brown", status: "Completed" }
              ].map((item) => (
                <div key={item.name} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-muted-foreground">Front desk queue</p>
                  </div>
                  <Badge variant={item.status === "Waiting" ? "secondary" : item.status === "In Progress" ? "default" : "outline"}>
                    {item.status}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Registrations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              {patients.slice(0, 3).map((patient) => (
                <div key={patient.id} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{patient.name}</p>
                    <p className="text-muted-foreground">{patient.email}</p>
                  </div>
                  <Button variant="outline" size="sm">View</Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </>
    );
  };

  const renderLabDashboard = () => {
    const completedReports = labReports.filter((report) => report.status === "completed");

    return (
      <>
        <div className="grid gap-4 md:grid-cols-3">
          {loading ? (
            <>
              <StatCardSkeleton />
              <StatCardSkeleton />
              <StatCardSkeleton />
            </>
          ) : (
            <>
              <StatCard
                title="Completed Reports"
                value={completedReports.length}
                description="Last 30 days"
                icon={<FlaskConical className="h-4 w-4 text-primary" />}
              />
              <StatCard
                title="Pending Reviews"
                value={labReports.length - completedReports.length}
                description="Awaiting approval"
                icon={<ClipboardList className="h-4 w-4 text-primary" />}
              />
              <StatCard
                title="Samples in Queue"
                value={4}
                description="Active test orders"
                icon={<Heart className="h-4 w-4 text-primary" />}
              />
            </>
          )}
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Recent Reports</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              {labReports.slice(0, 3).map((report) => (
                <div key={report.id} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{report.testType}</p>
                    <p className="text-muted-foreground">{report.patientName}</p>
                  </div>
                  <Badge variant="secondary">{report.status}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quality Checklist</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span>Sample integrity verified</span>
                <Badge variant="outline">Complete</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>Equipment calibration</span>
                <Badge variant="outline">Complete</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>Pending doctor review</span>
                <Badge variant="secondary">2 reports</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </>
    );
  };

  const renderContent = () => {
    if (role === "patient") return renderPatientDashboard();
    if (role === "doctor") return renderDoctorDashboard();
    if (role === "receptionist") return renderReceptionistDashboard();
    return renderLabDashboard();
  };

  return (
    <ProtectedRoute allowedRoles={[role]}>
      <DashboardLayout role={role} title={roleTitles[role]}>
        {error && (
          <Card className="border-amber-200 bg-amber-50">
            <CardContent className="p-4 text-sm text-amber-900">{error}</CardContent>
          </Card>
        )}
        {renderContent()}
      </DashboardLayout>
    </ProtectedRoute>
  );
}
