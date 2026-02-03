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
  UserPlus, 
  Clock, 
  Phone,
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
    notes: 'Walk-in registration'
  },
  {
    id: 'apt-002',
    patientName: 'Jane Smith',
    doctorName: 'Dr. James Wilson',
    department: 'Dermatology',
    date: new Date('2024-01-15'),
    startTime: '11:00',
    endTime: '11:30',
    type: 'in-person' as const,
    status: 'scheduled' as const,
    notes: 'Regular appointment'
  }
];

const mockQueue = [
  { id: 'q-001', name: 'Robert Johnson', department: 'Cardiology', waitTime: '15 min', priority: 'normal' },
  { id: 'q-002', name: 'Emily Davis', department: 'Emergency', waitTime: '5 min', priority: 'urgent' },
  { id: 'q-003', name: 'Michael Brown', department: 'Pediatrics', waitTime: '25 min', priority: 'normal' }
];

export default function ReceptionistDashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'queue' | 'appointments'>('overview');

  const stats = [
    {
      title: "Today's Appointments",
      value: "24",
      description: "12 completed, 12 pending",
      icon: <Calendar className="h-5 w-5 text-blue-500" />,
      trend: { value: 18, isPositive: true, label: "from yesterday" }
    },
    {
      title: "Patients in Queue",
      value: "8",
      description: "3 urgent cases",
      icon: <Users className="h-5 w-5 text-green-500" />,
      trend: { value: 2, isPositive: false, label: "waiting" }
    },
    {
      title: "Active Doctors",
      value: "12",
      description: "All departments covered",
      icon: <UserPlus className="h-5 w-5 text-purple-500" />,
      trend: { value: 1, isPositive: true, label: "online" }
    },
    {
      title: "Average Wait Time",
      value: "18 min",
      description: "Improved from 25 min",
      icon: <Clock className="h-5 w-5 text-amber-500" />,
      trend: { value: 7, isPositive: true, label: "faster" }
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Reception Dashboard</h1>
        <p className="text-muted-foreground mt-1">Manage patient registration and appointments</p>
      </div>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-3">
        <Button className="gap-2">
          <UserPlus className="h-4 w-4" />
          Register Patient
        </Button>
        <Button variant="outline" className="gap-2">
          <Calendar className="h-4 w-4" />
          Schedule Appointment
        </Button>
        <Button variant="outline" className="gap-2">
          <Phone className="h-4 w-4" />
          Call Patient
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
          {(['overview', 'queue', 'appointments'] as const).map((tab) => (
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
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-4">Today's Appointments</h2>
                <div className="space-y-4">
                  {mockAppointments.map((appointment) => (
                    <AppointmentCard
                      key={appointment.id}
                      {...appointment}
                      onReschedule={(id) => console.log('Reschedule:', id)}
                      onCancel={(id) => console.log('Cancel:', id)}
                      onJoin={(id) => console.log('Join:', id)}
                      onViewDetails={(id) => console.log('View details:', id)}
                    />
                  ))}
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Queue Status
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockQueue.map((patient) => (
                      <div key={patient.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium text-sm">{patient.name}</p>
                          <p className="text-xs text-muted-foreground">{patient.department}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge 
                            variant={patient.priority === 'urgent' ? 'destructive' : 'secondary'}
                            className="text-xs"
                          >
                            {patient.waitTime}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button variant="outline" className="w-full justify-start gap-2">
                    <UserPlus className="h-4 w-4" /> New Registration
                  </Button>
                  <Button variant="outline" className="w-full justify-start gap-2">
                    <Calendar className="h-4 w-4" /> Book Appointment
                  </Button>
                  <Button variant="outline" className="w-full justify-start gap-2">
                    <Phone className="h-4 w-4" /> Call Queue
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
        
        {activeTab === 'queue' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Patient Queue Management</h2>
              <Button variant="outline">Refresh Queue</Button>
            </div>
            
            <Card>
              <CardContent className="py-8">
                <div className="space-y-4">
                  {mockQueue.map((patient, index) => (
                    <div key={patient.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50">
                      <div className="flex items-center gap-4">
                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center font-medium">
                          {index + 1}
                        </div>
                        <div>
                          <p className="font-medium">{patient.name}</p>
                          <p className="text-sm text-muted-foreground">{patient.department}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge 
                          variant={patient.priority === 'urgent' ? 'destructive' : 'secondary'}
                        >
                          {patient.priority}
                        </Badge>
                        <Badge variant="outline">{patient.waitTime}</Badge>
                        <Button size="sm">Call</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
        
        {activeTab === 'appointments' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">All Appointments</h2>
              <Button>Book New Appointment</Button>
            </div>
            
            <Card>
              <CardContent className="py-12 text-center">
                <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">Appointment Management</h3>
                <p className="text-muted-foreground mb-4">
                  Comprehensive appointment scheduling system coming soon.
                </p>
                <Button>View All Appointments</Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}