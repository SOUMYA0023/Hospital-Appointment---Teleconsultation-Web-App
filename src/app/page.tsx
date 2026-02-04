'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/features/auth/auth-context';
import { Role } from '@/components/shared/Sidebar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Calendar, 
  User, 
  Stethoscope, 
  FlaskConical,
  Shield,
  Heart,
  MessageSquare
} from 'lucide-react';

export default function HospitalApp() {
  const { user, login, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && user) {
      const target = user.role === 'lab_technician' ? '/lab' : `/${user.role}`;
      router.replace(target);
    }
  }, [isLoading, router, user]);

  // Login screen
  const renderLoginScreen = () => (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-4">
      <div className="w-full max-w-md">
        <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center pb-8">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 shadow-lg">
              <Heart className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-3xl font-bold text-gray-900">MediCare</CardTitle>
            <CardDescription className="text-lg text-gray-600">
              Hospital Management System
            </CardDescription>
            <p className="text-sm text-gray-500 mt-2">
              Sign in to access your medical dashboard
            </p>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <Button 
                onClick={() => login('patient')}
                className="h-20 flex flex-col gap-2 bg-white border-2 border-gray-200 hover:border-primary hover:shadow-md transition-all duration-300"
                variant="secondary"
              >
                <User className="h-6 w-6 text-blue-500" />
                <span className="font-medium text-gray-700">Patient</span>
                <span className="text-xs text-gray-500">Access records</span>
              </Button>
              
              <Button 
                onClick={() => login('doctor')}
                className="h-20 flex flex-col gap-2 bg-white border-2 border-gray-200 hover:border-primary hover:shadow-md transition-all duration-300"
                variant="secondary"
              >
                <Stethoscope className="h-6 w-6 text-green-500" />
                <span className="font-medium text-gray-700">Doctor</span>
                <span className="text-xs text-gray-500">Manage patients</span>
              </Button>
              
              <Button 
                onClick={() => login('receptionist')}
                className="h-20 flex flex-col gap-2 bg-white border-2 border-gray-200 hover:border-primary hover:shadow-md transition-all duration-300"
                variant="secondary"
              >
                <Shield className="h-6 w-6 text-purple-500" />
                <span className="font-medium text-gray-700">Receptionist</span>
                <span className="text-xs text-gray-500">Front desk</span>
              </Button>
              
              <Button 
                onClick={() => login('lab_technician')}
                className="h-20 flex flex-col gap-2 bg-white border-2 border-gray-200 hover:border-primary hover:shadow-md transition-all duration-300"
                variant="secondary"
              >
                <FlaskConical className="h-6 w-6 text-amber-500" />
                <span className="font-medium text-gray-700">Lab Technician</span>
                <span className="text-xs text-gray-500">Test reports</span>
              </Button>
            </div>
            
            <div className="pt-4 text-center">
              <div className="inline-flex items-center gap-2 text-sm text-gray-500 bg-gray-50 px-4 py-2 rounded-full">
                <Shield className="h-4 w-4" />
                <span>Secure medical platform</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Select your role to access the appropriate dashboard</p>
          <div className="flex items-center justify-center gap-4 mt-4">
            <div className="flex items-center gap-1">
              <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
              <span>Secure</span>
            </div>
            <div className="flex items-center gap-1">
              <MessageSquare className="h-4 w-4" />
              <span>Encrypted</span>
            </div>
            <div className="flex items-center gap-1">
              <Shield className="h-4 w-4" />
              <span>Compliant</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary mx-auto mb-4"></div>
          <p className="text-lg font-medium text-gray-700">Loading MediCare...</p>
          <p className="text-sm text-gray-500 mt-2">Preparing your medical dashboard</p>
        </div>
      </div>
    );
  }

  // Redirect to appropriate dashboard
  if (user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary mx-auto mb-4"></div>
          <p className="text-lg font-medium text-gray-700">Redirecting to your dashboard...</p>
          <p className="text-sm text-gray-500 mt-2">Preparing your personalized workspace</p>
        </div>
      </div>
    );
  }

  return renderLoginScreen();
}
