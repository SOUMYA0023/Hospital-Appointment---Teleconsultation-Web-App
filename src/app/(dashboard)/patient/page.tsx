'use client';

import React, { useState } from 'react';
import { StatCard } from '@/components/ui/StatCard';
import { AppointmentCard } from '@/components/appointments/AppointmentCard';
import { RecordCard } from '@/components/medical-records/RecordCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Calendar, 
  Clock, 
  FileText, 
  MessageSquare, 
  Plus, 
  Video,
  Activity,
  Stethoscope,
  TrendingUp
} from 'lucide-react';
import AppointmentBookingModal from '@/components/appointments/BookingModal';
import { ChatInterface } from '@/components/chat/ChatInterface';

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
    patientName: 'John Doe',
    doctorName: 'Dr. James Wilson',
    department: 'Dermatology',
    date: new Date('2024-01-18'),
    startTime: '14:00',
    endTime: '14:30',
    type: 'in-person' as const,
    status: 'scheduled' as const,
    notes: 'Follow-up visit'
  }
];

const mockRecords = [
  {
    id: 'rec-001',
    patientId: 'pat-001',
    patientName: 'John Doe',
    doctorId: 'doc-001',
    doctorName: 'Dr. Sarah Smith',
    date: new Date('2024-01-10'),
    type: 'consultation' as const,
    title: 'General Health Checkup',
    description: 'Routine annual physical examination with comprehensive health assessment',
    vitalSigns: {
      bloodPressure: '120/80 mmHg',
      heartRate: '72 bpm',
      temperature: '98.6°F',
      respiratoryRate: '16/min',
      oxygenSaturation: '98%',
      height: '175 cm',
      weight: '70 kg'
    },
    diagnosis: [
      {
        code: 'Z00.00',
        name: 'Encounter for general adult medical examination',
        description: 'Regular checkup with no significant findings'
      }
    ],
    treatmentPlan: {
      medications: [],
      procedures: [],
      followUp: 'Return in 6 months for routine checkup',
      recommendations: ['Maintain healthy diet', 'Regular exercise']
    },
    notes: 'Patient in good health. All vitals normal.',
    attachments: []
  }
];

export default function PatientDashboard() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [activeView, setActiveView] = useState<'dashboard' | 'chat'>('dashboard');

  const handleBookingComplete = (appointment: any) => {
    console.log('Appointment booked:', appointment);
    // In a real app, you would update the appointments list
  };

  const stats = [
    {
      title: "Upcoming Appointments",
      value: "2",
      description: "Next: Dr. Smith (Cardiology)",
      icon: <Calendar className="h-5 w-5 text-blue-500" />,
      trend: { value: 12, isPositive: true, label: "from last month" }
    },
    {
      title: "Medical Records",
      value: "8",
      description: "Updated this month",
      icon: <FileText className="h-5 w-5 text-green-500" />,
      trend: { value: 8, isPositive: true, label: "new records" }
    },
    {
      title: "Unread Messages",
      value: "3",
      description: "From Dr. Sarah",
      icon: <MessageSquare className="h-5 w-5 text-purple-500" />,
      trend: { value: 2, isPositive: false, label: "unread" }
    },
    {
      title: "Health Score",
      value: "92",
      description: "Excellent health status",
      icon: <Activity className="h-5 w-5 text-teal-500" />,
      trend: { value: 3, isPositive: true, label: "improved" }
    }
  ];

  return (
    <div className="space-y-6">
      {/* Quick Actions */}
      <div className="flex flex-wrap gap-3">
        <Button 
          onClick={() => setIsBookingModalOpen(true)}
          className="gap-2"
        >
          <Plus className="h-4 w-4" />
          Book Appointment
        </Button>
        <Button 
          variant="outline"
          onClick={() => setActiveView('chat')}
          className="gap-2"
        >
          <MessageSquare className="h-4 w-4" />
          Open Chat
        </Button>
        <Button 
          variant="outline"
          className="gap-2"
        >
          <FileText className="h-4 w-4" />
          View All Records
        </Button>
      </div>

      {activeView === 'dashboard' ? (
        <>
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

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Upcoming Appointments */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Upcoming Appointments</h2>
                <Button variant="ghost" size="sm">View All</Button>
              </div>
              
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

            {/* Recent Medical Records */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Recent Records</h2>
                <Button variant="ghost" size="sm">View All</Button>
              </div>
              
              <div className="space-y-4">
                {mockRecords.map((record) => (
                  <RecordCard
                    key={record.id}
                    record={record}
                    onView={(id) => console.log('View record:', id)}
                    onDownload={(id) => console.log('Download record:', id)}
                  />
                ))}
              </div>
            </div>
          </div>
        </>
      ) : (
        /* Chat View */
        <div className="h-[calc(100vh-200px)]">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Secure Messaging</h2>
            <Button 
              variant="outline"
              onClick={() => setActiveView('dashboard')}
            >
              Back to Dashboard
            </Button>
          </div>
          <ChatInterface />
        </div>
      )}

      {/* Booking Modal */}
      <AppointmentBookingModal
        open={isBookingModalOpen}
        onOpenChange={setIsBookingModalOpen}
        onBookingComplete={handleBookingComplete}
      />
    </div>
  );
}