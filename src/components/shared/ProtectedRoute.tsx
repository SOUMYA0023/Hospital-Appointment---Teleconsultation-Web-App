'use client';

import { useAuth } from '@/features/auth/auth-context';
import { Role } from './Sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Lock } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles: Role[];
  redirectPath?: string;
}

export default function ProtectedRoute({ 
  children, 
  allowedRoles, 
  redirectPath = '/' 
}: ProtectedRouteProps) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && user && !allowedRoles.includes(user.role)) {
      router.push(redirectPath);
    }
  }, [user, isLoading, allowedRoles, redirectPath, router]);

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  // If user is not logged in or doesn't have the required role
  if (!user || !allowedRoles.includes(user.role)) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-muted p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <Lock className="h-6 w-6 text-primary" />
            </div>
            <CardTitle className="text-xl mt-4">Access Denied</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-muted-foreground mb-6">
              You don't have permission to access this page.
            </p>
            <div className="space-y-2">
              <Button 
                onClick={() => router.push('/')} 
                className="w-full"
              >
                Go to Home
              </Button>
              <Button 
                variant="outline" 
                onClick={() => router.push('/')}
                className="w-full"
              >
                Sign In
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // User has required role, render the protected content
  return <>{children}</>;
}
