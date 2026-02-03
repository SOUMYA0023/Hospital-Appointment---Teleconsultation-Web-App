"use client"

import { Sidebar } from "@/components/shared/Sidebar"
import { Header } from "@/components/shared/Header"
import { useRoleProtection } from "@/hooks/use-role-protection"

export default function LabLayout({
    children,
}: {
    children: React.ReactNode
}) {
    useRoleProtection("lab_technician")

    return (
        <div className="flex h-screen w-full overflow-hidden bg-background">
            <Sidebar role="lab_technician" />
            <div className="flex flex-1 flex-col overflow-hidden">
                <Header title="Laboratory" userName="Tech. Mike" userRoleLabel="Lab Technician" role="lab_technician" />
                <main className="flex-1 overflow-auto bg-muted/20 p-6">
                    {children}
                </main>
            </div>
        </div>
    )
}
