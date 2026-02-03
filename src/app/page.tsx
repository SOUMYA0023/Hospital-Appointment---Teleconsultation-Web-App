'use client';

import React, { useState } from 'react';
import { useAuth } from '@/features/auth/auth-context';
import { Role } from '@/components/shared/Sidebar';
import ProtectedRoute from '@/components/shared/ProtectedRoute';
import ErrorBoundary from '@/components/shared/ErrorBoundary';
import { Header } from '@/components/shared/Header';
import { Sidebar } from '@/components/shared/Sidebar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Calendar, 
  User, 
  Stethoscope, 
  FlaskConical,
  LogIn,
  Shield
} from 'lucide-react';

export default function HospitalApp() {
  const { user, login, logout, isLoading } = useAuth();
  const [showLogin, setShowLogin] = useState(false);

  // Role-based dashboard components
  const renderDashboard = () => {
    if (!user) return null;

    switch (user.role) {
      case 'patient':
        return (
          <div className="p-6">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-primary">Patient Dashboard</h1>
              <p className="text-muted-foreground">Manage your health and appointments</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-blue-500" />
                    Appointments
                  </CardTitle>
                  <CardDescription>View and manage your appointments</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">View Appointments</Button>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5 text-green-500" />
                    Medical Records
                  </CardTitle>
                  <CardDescription>Access your medical history</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full" variant="outline">View Records</Button>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FlaskConical className="h-5 w-5 text-purple-500" />
                    Lab Reports
                  </CardTitle>
                  <CardDescription>Check your latest test results</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full" variant="outline">View Reports</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        );
      
      case 'doctor':
        return (
          <div className="p-6">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-primary">Doctor Dashboard</h1>
              <p className="text-muted-foreground">Manage your patients and schedule</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-blue-500" />
                    Today's Schedule
                  </CardTitle>
                  <CardDescription>View your appointments for today</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">View Schedule</Button>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5 text-green-500" />
                    My Patients
                  </CardTitle>
                  <CardDescription>Manage your patient records</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full" variant="outline">View Patients</Button>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Stethoscope className="h-5 w-5 text-purple-500" />
                    Prescriptions
                  </CardTitle>
                  <CardDescription>Write and manage prescriptions</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full" variant="outline">New Prescription</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        );
      
      case 'receptionist':
        return (
          <div className="p-6">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-primary">Receptionist Dashboard</h1>
              <p className="text-muted-foreground">Manage patient registration and appointments</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5 text-blue-500" />
                    Patient Registration
                  </CardTitle>
                  <CardDescription>Register new patients</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">Register Patient</Button>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-green-500" />
                    Appointment Scheduling
                  </CardTitle>
                  <CardDescription>Schedule patient appointments</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full" variant="outline">Schedule Appointment</Button>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-purple-500" />
                    Queue Management
                  </CardTitle>
                  <CardDescription>Manage patient queue</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full" variant="outline">View Queue</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        );
      
      case 'lab_technician':
        return (
          <div className="p-6">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-primary">Lab Technician Dashboard</h1>
              <p className="text-muted-foreground">Manage lab tests and reports</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FlaskConical className="h-5 w-5 text-blue-500" />
                    Test Requests
                  </CardTitle>
                  <CardDescription>View pending test requests</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">View Requests</Button>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5 text-green-500" />
                    Report Upload
                  </CardTitle>
                  <CardDescription>Upload lab test results</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full" variant="outline">Upload Report</Button>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-purple-500" />
                    Quality Control
                  </CardTitle>
                  <CardDescription>Manage quality assurance</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full" variant="outline">QC Dashboard</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        );
      
      default:
        return (
          <div className="flex items-center justify-center h-64">
            <p>Role not recognized</p>
          </div>
        );
    }
  };

  // Login screen
  const renderLoginScreen = () => (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <Stethoscope className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="text-2xl">Hospital Portal</CardTitle>
          <CardDescription>
            Sign in to access your medical dashboard
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <Button 
              onClick={() => login('patient')}
              className="h-16 flex flex-col gap-1"
              variant="outline"
            >
              <User className="h-5 w-5" />
              Patient
            </Button>
            <Button 
              onClick={() => login('doctor')}
              className="h-16 flex flex-col gap-1"
              variant="outline"
            >
              <Stethoscope className="h-5 w-5" />
              Doctor
            </Button>
            <Button 
              onClick={() => login('receptionist')}
              className="h-16 flex flex-col gap-1"
              variant="outline"
            >
              <Shield className="h-5 w-5" />
              Receptionist
            </Button>
            <Button 
              onClick={() => login('lab_technician')}
              className="h-16 flex flex-col gap-1"
              variant="outline"
            >
              <FlaskConical className="h-5 w-5" />
              Lab Technician
            </Button>
          </div>
          
          <div className="pt-4 text-center text-sm text-muted-foreground">
            <p>Select your role to access the appropriate dashboard</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Main application layout
  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-background">
        {user ? (
          <div className="flex">
            <Sidebar role={user.role} />
            <div className="flex-1 flex flex-col">
              <Header 
                title={`${user.role.charAt(0).toUpperCase() + user.role.slice(1)} Dashboard`}
                userName={user.name}
                userRoleLabel={user.role.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                role={user.role}
              />
              <main className="flex-1 overflow-y-auto">
                <ProtectedRoute allowedRoles={[user.role]}>
                  {renderDashboard()}
                </ProtectedRoute>
              </main>
            </div>
          </div>
        ) : (
          renderLoginScreen()
        )}
      </div>
    </ErrorBoundary>
  );
}