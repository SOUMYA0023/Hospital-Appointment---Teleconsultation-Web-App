"use client"

import { Sidebar } from "@/components/shared/Sidebar"
import { Header } from "@/components/shared/Header"
import { useRoleProtection } from "@/hooks/use-role-protection"

export default function DoctorLayout({
    children,
}: {
    children: React.ReactNode
}) {
    useRoleProtection("doctor")

    return (
        <div className="flex h-screen w-full overflow-hidden bg-background">
            <Sidebar role="doctor" />
            <div className="flex flex-1 flex-col overflow-hidden">
                <Header title="Doctor Dashboard" userName="Dr. Sarah Smith" userRoleLabel="Cardiologist" role="doctor" />
                <main className="flex-1 overflow-auto bg-muted/20 p-6">
                    {children}
                </main>
            </div>
        </div>
    )
}
