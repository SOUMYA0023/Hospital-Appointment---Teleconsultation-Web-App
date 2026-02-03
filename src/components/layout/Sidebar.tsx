'use client';

import React, { useState } from 'react';
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Calendar,
  FileText,
  MessageSquare,
  User,
  Settings,
  FlaskConical,
  Users,
  LogOut,
  X,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/features/auth/auth-context";

export type Role = "patient" | "doctor" | "receptionist" | "lab_technician";

interface SidebarProps {
  role: Role;
  className?: string;
  isOpen?: boolean;
  onToggle?: () => void;
}

export function Sidebar({ role, className, isOpen = true, onToggle }: SidebarProps) {
  const { logout } = useAuth();
  
  // Mobile sidebar state
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const toggleMobileSidebar = () => {
    setIsMobileOpen(!isMobileOpen);
    if (onToggle) onToggle();
  };

  const handleLogout = () => {
    logout();
    setIsMobileOpen(false);
  };

  const links = {
    patient: [
      { href: "/patient", label: "Dashboard", icon: LayoutDashboard },
      { href: "/patient/appointments", label: "Appointments", icon: Calendar },
      { href: "/patient/records", label: "Medical Records", icon: FileText },
      { href: "/patient/messages", label: "Messages", icon: MessageSquare },
      { href: "/patient/profile", label: "Profile", icon: User },
    ],
    doctor: [
      { href: "/doctor", label: "Dashboard", icon: LayoutDashboard },
      { href: "/doctor/schedule", label: "My Schedule", icon: Calendar },
      { href: "/doctor/patients", label: "My Patients", icon: Users },
      { href: "/doctor/messages", label: "Messages", icon: MessageSquare },
      { href: "/doctor/profile", label: "Profile", icon: User },
    ],
    receptionist: [
      { href: "/receptionist", label: "Dashboard", icon: LayoutDashboard },
      { href: "/receptionist/appointments", label: "All Appointments", icon: Calendar },
      { href: "/receptionist/registration", label: "Patient Registration", icon: User },
      { href: "/receptionist/queue", label: "Queue Management", icon: Users },
    ],
    lab_technician: [
      { href: "/lab", label: "Dashboard", icon: FlaskConical },
      { href: "/lab/requests", label: "Test Requests", icon: FileText },
      { href: "/lab/reports", label: "Upload Reports", icon: LayoutDashboard },
      { href: "/lab/profile", label: "Profile", icon: User },
    ]
  };

  const roleLinks = links[role] || [];

  const SidebarContent = () => {
    const pathname = usePathname();

    return (
      <>
        {/* Header */}
        <div className="flex h-16 items-center border-b px-4 md:px-6">
          <div className="flex items-center gap-2 font-bold text-xl text-primary">
            <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <span className="text-primary text-xl">+</span>
            </div>
            <div className="hidden md:block">
              <span>MediCare</span>
              <p className="text-xs font-normal text-muted-foreground capitalize">{role.replace('_', ' ')}</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="ml-auto md:hidden"
            onClick={toggleMobileSidebar}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto py-4">
          <nav className="grid gap-1 px-2">
            {roleLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href || pathname?.startsWith(`${link.href}/`);
              
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-all hover:bg-accent hover:text-accent-foreground",
                    isActive 
                      ? "bg-primary text-primary-foreground shadow-sm" 
                      : "text-muted-foreground"
                  )}
                  onClick={() => setIsMobileOpen(false)}
                >
                  <Icon className="h-5 w-5" />
                  <span className="hidden md:inline">{link.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer */}
        <div className="border-t p-4">
          <Button 
            variant="ghost" 
            className="w-full justify-start gap-3 px-3 text-destructive hover:text-destructive hover:bg-destructive/10"
            onClick={handleLogout}
          >
            <LogOut className="h-5 w-5" />
            <span className="hidden md:inline">Sign Out</span>
          </Button>
        </div>
      </>
    );
  };

  return (
    <>
      {/* Desktop Sidebar - Always visible on md+ screens when isOpen is true */}
      <div className={cn(
        "hidden h-full flex-col border-r bg-background md:flex",
        isOpen ? "w-64" : "w-16",
        className
      )}>
        <div className="flex h-full flex-col">
          <SidebarContent />
        </div>
      </div>

      {/* Collapsible Button for Desktop */}
      {isOpen && (
        <Button
          variant="outline"
          size="icon"
          className="hidden md:flex absolute top-4 right-[-12px] z-10 h-6 w-6 rounded-full border bg-background shadow-md"
          onClick={onToggle}
        >
          <ChevronLeft className="h-3 w-3" />
        </Button>
      )}
      
      {!isOpen && (
        <Button
          variant="outline"
          size="icon"
          className="hidden md:flex absolute top-4 right-[-12px] z-10 h-6 w-6 rounded-full border bg-background shadow-md"
          onClick={onToggle}
        >
          <ChevronRight className="h-3 w-3" />
        </Button>
      )}

      {/* Mobile Sidebar - Overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={toggleMobileSidebar}
        />
      )}
      
      <div className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 transform bg-background border-r transition-transform duration-300 ease-in-out md:hidden",
        isMobileOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex h-full flex-col">
          <SidebarContent />
        </div>
      </div>
    </>
  );
}