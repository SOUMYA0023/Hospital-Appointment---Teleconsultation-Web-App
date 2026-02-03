'use client';

import React, { useState } from 'react';
import { StatCard } from '@/components/ui/StatCard';
import { AppointmentCard } from '@/components/appointments/AppointmentCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar, 
  Users, 
  Clock, 
  Video, 
  User,
  Stethoscope,
  TrendingUp,
  CheckCircle
} from 'lucide-react';

// Mock data
const mockAppointments = [
  {
    id: 'apt-001',
    patientName: 'John Doe',
    doctorName: 'Dr. Sarah Smith',
    department: 'Cardiology',
    date: new Date('2024-01-15'),
    startTime: '10:00',
    endTime: '10:30',
    type: 'teleconsultation' as const,
    status: 'confirmed' as const,
    notes: 'Regular checkup'
  },
  {
    id: 'apt-002',
    patientName: 'Jane Smith',
    doctorName: 'Dr. Sarah Smith',
    department: 'Cardiology',
    date: new Date('2024-01-15'),
    startTime: '11:00',
    endTime: '11:30',
    type: 'in-person' as const,
    status: 'scheduled' as const,
    notes: 'Follow-up visit'
  },
  {
    id: 'apt-003',
    patientName: 'Robert Johnson',
    doctorName: 'Dr. Sarah Smith',
    department: 'Cardiology',
    date: new Date('2024-01-15'),
    startTime: '14:00',
    endTime: '14:30',
    type: 'teleconsultation' as const,
    status: 'completed' as const,
    notes: 'Prescription review'
  }
];

const mockPatients = [
  { id: 'pat-001', name: 'John Doe', lastVisit: '2024-01-10', condition: 'Hypertension' },
  { id: 'pat-002', name: 'Jane Smith', lastVisit: '2024-01-12', condition: 'Diabetes' },
  { id: 'pat-003', name: 'Robert Johnson', lastVisit: '2024-01-14', condition: 'Heart Disease' }
];

export default function DoctorDashboard() {
  const [activeTab, setActiveTab] = useState<'today' | 'patients' | 'reports'>('today');

  const stats = [
    {
      title: "Today's Appointments",
      value: "8",
      description: "3 Completed, 5 Remaining",
      icon: <Calendar className="h-5 w-5 text-blue-500" />,
      trend: { value: 15, isPositive: true, label: "from yesterday" }
    },
    {
      title: "Active Patients",
      value: "1,204",
      description: "+12 this week",
      icon: <Users className="h-5 w-5 text-green-500" />,
      trend: { value: 2, isPositive: true, label: "new patients" }
    },
    {
      title: "Pending Reports",
      value: "3",
      description: "Review required",
      icon: <Clock className="h-5 w-5 text-amber-500" />,
      trend: { value: 1, isPositive: false, label: "pending" }
    },
    {
      title: "Patient Satisfaction",
      value: "4.8",
      description: "Out of 5 stars",
      icon: <Stethoscope className="h-5 w-5 text-purple-500" />,
      trend: { value: 0.1, isPositive: true, label: "improved" }
    }
  ];

  const todayAppointments = mockAppointments.filter(apt => 
    apt.date.toDateString() === new Date().toDateString()
  );

  return (
    <div className="space-y-6">
      {/* Header with Status */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Doctor Dashboard</h1>
          <p className="text-muted-foreground mt-1">Manage your patients and schedule</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground">
            Today: {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
          </span>
          <Badge variant="default" className="bg-green-100 text-green-800 border-green-200">
            Online
          </Badge>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-3">
        <Button className="gap-2">
          <Video className="h-4 w-4" />
          Start Consultation
        </Button>
        <Button variant="outline" className="gap-2">
          <Users className="h-4 w-4" />
          View All Patients
        </Button>
        <Button variant="outline" className="gap-2">
          <Clock className="h-4 w-4" />
          Manage Schedule
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <StatCard
            key={index}
            title={stat.title}
            value={stat.value}
            description={stat.description}
            icon={stat.icon}
            trend={stat.trend}
          />
        ))}
      </div>

      {/* Tab Navigation */}
      <div className="border-b">
        <nav className="-mb-px flex space-x-8">
          {(['today', 'patients', 'reports'] as const).map((tab) => (
            <button
              key={tab}
              className={`
                whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
                ${activeTab === tab
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground hover:border-muted'
                }
              `}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === 'today' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Today's Schedule</h2>
              <Button variant="ghost" size="sm">View Calendar</Button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-4">
                {todayAppointments.length > 0 ? (
                  todayAppointments.map((appointment) => (
                    <AppointmentCard
                      key={appointment.id}
                      {...appointment}
                      onReschedule={(id) => console.log('Reschedule:', id)}
                      onCancel={(id) => console.log('Cancel:', id)}
                      onJoin={(id) => console.log('Join:', id)}
                      onViewDetails={(id) => console.log('View details:', id)}
                    />
                  ))
                ) : (
                  <Card>
                    <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                      <Calendar className="h-12 w-12 text-muted-foreground mb-4" />
                      <h3 className="text-lg font-medium mb-2">No appointments today</h3>
                      <p className="text-muted-foreground mb-4">
                        You have no scheduled appointments for today.
                      </p>
                      <Button>
                        <Calendar className="h-4 w-4 mr-2" />
                        Schedule Appointment
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </div>
              
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="h-5 w-5" />
                      Quick Actions
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Button variant="outline" className="w-full justify-start gap-2">
                      <Users className="h-4 w-4" /> Assign Test
                    </Button>
                    <Button variant="outline" className="w-full justify-start gap-2">
                      <Clock className="h-4 w-4" /> Manage Slots
                    </Button>
                    <Button variant="outline" className="w-full justify-start gap-2">
                      <CheckCircle className="h-4 w-4" /> Review Reports
                    </Button>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Patients</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {mockPatients.map((patient) => (
                        <div key={patient.id} className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-sm">{patient.name}</p>
                            <p className="text-xs text-muted-foreground">{patient.condition}</p>
                          </div>
                          <Badge variant="secondary" className="text-xs">
                            {new Date(patient.lastVisit).toLocaleDateString()}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'patients' && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Patient Management</h2>
            <Card>
              <CardContent className="py-12 text-center">
                <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">Patient Management</h3>
                <p className="text-muted-foreground mb-4">
                  Comprehensive patient management system coming soon.
                </p>
                <Button>View All Patients</Button>
              </CardContent>
            </Card>
          </div>
        )}
        
        {activeTab === 'reports' && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Medical Reports</h2>
            <Card>
              <CardContent className="py-12 text-center">
                <Stethoscope className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">Report Management</h3>
                <p className="text-muted-foreground mb-4">
                  Medical report review and management system coming soon.
                </p>
                <Button>View Pending Reports</Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}