"use client"

import { useAuth } from "@/features/auth/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { User, Stethoscope, ClipboardList, FlaskConical } from "lucide-react"

export default function LoginPage() {
  const { login } = useAuth()

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted/30 p-4">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-primary mb-2">MediCare Portal</h1>
        <p className="text-muted-foreground">Secure Hospital Management System</p>
      </div>

      <Card className="w-full max-w-2xl border-none shadow-xl bg-card/50 backdrop-blur-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Select Your Role</CardTitle>
          <CardDescription>Enter the portal by selecting your user type</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">

          <Button
            variant="outline"
            className="h-32 flex-col gap-3 hover:border-primary hover:bg-primary/5 transition-all"
            onClick={() => login("patient")}
          >
            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
              <User className="h-6 w-6" />
            </div>
            <span className="font-semibold text-lg">Patient</span>
          </Button>

          <Button
            variant="outline"
            className="h-32 flex-col gap-3 hover:border-primary hover:bg-primary/5 transition-all"
            onClick={() => login("doctor")}
          >
            <div className="h-10 w-10 rounded-full bg-teal-100 flex items-center justify-center text-teal-600">
              <Stethoscope className="h-6 w-6" />
            </div>
            <span className="font-semibold text-lg">Doctor</span>
          </Button>

          <Button
            variant="outline"
            className="h-32 flex-col gap-3 hover:border-primary hover:bg-primary/5 transition-all"
            onClick={() => login("receptionist")}
          >
            <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
              <ClipboardList className="h-6 w-6" />
            </div>
            <span className="font-semibold text-lg">Receptionist</span>
          </Button>

          <Button
            variant="outline"
            className="h-32 flex-col gap-3 hover:border-primary hover:bg-primary/5 transition-all"
            onClick={() => login("lab_technician")}
          >
            <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">
              <FlaskConical className="h-6 w-6" />
            </div>
            <span className="font-semibold text-lg">Lab Technician</span>
          </Button>

        </CardContent>
      </Card>

      <div className="mt-8 text-center text-sm text-muted-foreground">
        <p>Protected System. Authorized Personnel Only.</p>
        <p>&copy; 2024 MediCare Hospital</p>
      </div>
    </div>
  )
}
