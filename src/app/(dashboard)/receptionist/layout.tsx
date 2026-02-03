"use client"

import { Sidebar } from "@/components/shared/Sidebar"
import { Header } from "@/components/shared/Header"
import { useRoleProtection } from "@/hooks/use-role-protection"

export default function ReceptionistLayout({
    children,
}: {
    children: React.ReactNode
}) {
    useRoleProtection("receptionist")

    return (
        <div className="flex h-screen w-full overflow-hidden bg-background">
            <Sidebar role="receptionist" />
            <div className="flex flex-1 flex-col overflow-hidden">
                <Header title="Front Desk" userName="Emily Rose" userRoleLabel="Receptionist" role="receptionist" />
                <main className="flex-1 overflow-auto bg-muted/20 p-6">
                    {children}
                </main>
            </div>
        </div>
    )
}
