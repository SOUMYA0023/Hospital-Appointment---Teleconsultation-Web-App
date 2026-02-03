'use client';

import React, { useState } from 'react';
import { Navbar } from './Navbar';
import { Sidebar, Role } from './Sidebar';
import { cn } from '@/lib/utils';

interface DashboardLayoutProps {
  children: React.ReactNode;
  role: Role;
  title?: string;
  className?: string;
}

export function DashboardLayout({ 
  children, 
  role, 
  title,
  className 
}: DashboardLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      {/* Sidebar */}
      <Sidebar 
        role={role} 
        isOpen={isSidebarOpen}
        onToggle={toggleSidebar}
      />
      
      {/* Main Content Area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Navbar */}
        <Navbar 
          role={role} 
          onMenuToggle={() => setIsSidebarOpen(true)}
        />
        
        {/* Page Content */}
        <main className={cn(
          "flex-1 overflow-auto bg-muted/10 p-4 md:p-6",
          className
        )}>
          {title && (
            <div className="mb-6">
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
                {title}
              </h1>
              <p className="text-muted-foreground mt-1">
                {role === 'patient' && 'Manage your health and appointments'}
                {role === 'doctor' && 'Manage your patients and schedule'}
                {role === 'receptionist' && 'Manage patient registration and appointments'}
                {role === 'lab_technician' && 'Manage lab tests and reports'}
              </p>
            </div>
          )}
          
          {/* Content with proper spacing */}
          <div className="space-y-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

// Individual role-specific layouts for convenience
export function PatientLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardLayout role="patient" title="Patient Dashboard">
      {children}
    </DashboardLayout>
  );
}

export function DoctorLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardLayout role="doctor" title="Doctor Dashboard">
      {children}
    </DashboardLayout>
  );
}

export function ReceptionistLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardLayout role="receptionist" title="Receptionist Dashboard">
      {children}
    </DashboardLayout>
  );
}

export function LabLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardLayout role="lab_technician" title="Laboratory Dashboard">
      {children}
    </DashboardLayout>
  );
}