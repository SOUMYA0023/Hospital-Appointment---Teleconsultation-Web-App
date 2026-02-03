"use client"

import React, { createContext, useContext, useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Role } from "@/components/shared/Sidebar"

interface User {
    id: string
    name: string
    role: Role
    email: string
}

interface AuthContextType {
    user: User | null
    login: (role: Role) => void
    logout: () => void
    isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {
        // Simulate checking session
        const storedUser = localStorage.getItem("medicare_user")
        if (storedUser) {
            setUser(JSON.parse(storedUser))
        }
        setIsLoading(false)
    }, [])

    const login = (role: Role) => {
        // Mock login logic
        const mockUser: User = {
            id: "1",
            name: role === "doctor" ? "Dr. Sarah Smith" : role === "patient" ? "John Doe" : role === "receptionist" ? "Emily Rose" : "Tech. Mike",
            role,
            email: "user@medicare.com"
        }

        setUser(mockUser)
        localStorage.setItem("medicare_user", JSON.stringify(mockUser))

        // Redirect based on role
        if (role === 'lab_technician') {
            router.push('/lab')
        } else {
            router.push(`/${role}`)
        }
    }

    const logout = () => {
        setUser(null)
        localStorage.removeItem("medicare_user")
        router.push("/")
    }

    return (
        <AuthContext.Provider value={{ user, login, logout, isLoading }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider")
    }
    return context
}
