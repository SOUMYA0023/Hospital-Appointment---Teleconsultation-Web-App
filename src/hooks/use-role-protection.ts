"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/features/auth/auth-context"
import { Role } from "@/components/shared/Sidebar"

export function useRoleProtection(allowedRole: Role) {
    const { user, isLoading } = useAuth()
    const router = useRouter()

    useEffect(() => {
        if (isLoading) return

        if (!user) {
            router.replace("/")
            return
        }

        if (user.role !== allowedRole) {
            // Redirect to their own dashboard or authorized page
            // For simplicity, back to root or correct dashboard
            if (user.role === "patient") router.replace("/patient")
            else if (user.role === "doctor") router.replace("/doctor")
            else if (user.role === "receptionist") router.replace("/receptionist")
            else if (user.role === "lab_technician") router.replace("/lab")
            else router.replace("/")
        }
    }, [user, isLoading, allowedRole, router])

    return { isAuthorized: user?.role === allowedRole, isLoading }
}
