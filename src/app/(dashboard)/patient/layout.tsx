"use client"

import { Sidebar } from "@/components/shared/Sidebar"
import { Header } from "@/components/shared/Header"
import { useRoleProtection } from "@/hooks/use-role-protection"

export default function PatientLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const { isLoading, isAuthorized } = useRoleProtection("patient")

    if (isLoading) {
        return <div className="flex h-screen items-center justify-center bg-background text-primary">Loading...</div>
    }

    if (!isAuthorized) {
        return null
    }

    return (
        <div className="flex h-screen w-full overflow-hidden bg-background">
            <Sidebar role="patient" />
            <div className="flex flex-1 flex-col overflow-hidden">
                <Header title="Patient Dashboard" userName="John Doe" userRoleLabel="Patient" role="patient" />
                <main className="flex-1 overflow-auto bg-muted/20 p-6">
                    {children}
                </main>
            </div>
        </div>
    )
}
