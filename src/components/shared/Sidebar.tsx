"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
    LayoutDashboard,
    Calendar,
    FileText,
    MessageSquare,
    User,
    Settings,
    FlaskConical,
    Users,
    LogOut
} from "lucide-react"

export type Role = "patient" | "doctor" | "receptionist" | "lab_technician"

interface SidebarProps {
    role: Role
    className?: string
}

export function Sidebar({ role, className }: SidebarProps) {
    return (
        <div className={cn("hidden h-full w-64 flex-col border-r glass z-40 md:flex", className)}>
            <SidebarContent role={role} />
        </div>
    )
}

export function SidebarContent({ role }: { role: Role }) {
    const pathname = usePathname()

    const links = {
        patient: [
            { href: "/patient", label: "Overview", icon: LayoutDashboard },
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
            { href: "/receptionist", label: "Front Desk", icon: LayoutDashboard },
            { href: "/receptionist/appointments", label: "All Appointments", icon: Calendar },
            { href: "/receptionist/registration", label: "Patient Registration", icon: User },
        ],
        lab_technician: [
            { href: "/lab", label: "Lab Dashboard", icon: FlaskConical },
            { href: "/lab/requests", label: "Test Requests", icon: FileText },
            { href: "/lab/reports", label: "Upload Reports", icon: LayoutDashboard },
        ]
    }

    const roleLinks = links[role] || []

    return (
        <>
            <div className="flex h-16 items-center border-b px-6">
                <div className="flex items-center gap-2 font-bold text-xl text-primary">
                    <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                        <span className="text-primary text-xl">+</span>
                    </div>
                    <span>MediCare</span>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto py-4">
                <nav className="grid gap-1 px-2">
                    {roleLinks.map((link, index) => {
                        const Icon = link.icon
                        const isActive = pathname === link.href || pathname?.startsWith(`${link.href}/`)

                        return (
                            <Link
                                key={index}
                                href={link.href}
                                className={cn(
                                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-all hover:bg-accent hover:text-accent-foreground",
                                    isActive ? "bg-accent text-accent-foreground shadow-sm" : "text-muted-foreground"
                                )}
                            >
                                <Icon className="h-4 w-4" />
                                {link.label}
                            </Link>
                        )
                    })}
                </nav>
            </div>

            <div className="border-t p-4">
                <button className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-destructive transition-colors hover:bg-destructive/10">
                    <LogOut className="h-4 w-4" />
                    Sign Out
                </button>
            </div>
        </>
    )
}
