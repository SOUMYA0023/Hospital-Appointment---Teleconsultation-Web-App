"use client"

import { Bell, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { SidebarContent, Role } from "./Sidebar"

interface HeaderProps {
    title?: string
    userName?: string
    userRoleLabel?: string
    role?: Role
}

export function Header({
    title,
    userName = "Dr. Smith",
    userRoleLabel = "Doctor",
    role
}: HeaderProps) {
    return (
        <header className="glass sticky top-0 z-50 flex h-16 w-full items-center justify-between px-6">
            <div className="flex items-center gap-4">
                {role && (
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="md:hidden -ml-2">
                                <Menu className="h-5 w-5" />
                                <span className="sr-only">Toggle navigation menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="p-0 w-64">
                            <div className="flex h-full flex-col">
                                <SidebarContent role={role} />
                            </div>
                        </SheetContent>
                    </Sheet>
                )}
                <h1 className="text-lg font-semibold text-foreground">{title || "Dashboard"}</h1>
            </div>

            <div className="flex items-center gap-4">
                <button className="relative rounded-full p-2 text-muted-foreground hover:bg-accent hover:text-foreground transition-colors">
                    <Bell className="h-5 w-5" />
                    <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-destructive ring-2 ring-background" />
                </button>

                <div className="flex items-center gap-3 pl-4 border-l">
                    <div className="text-right hidden sm:block">
                        <p className="text-sm font-medium leading-none">{userName}</p>
                        <p className="text-xs text-muted-foreground">{userRoleLabel}</p>
                    </div>
                    <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-medium text-sm">
                        {userName.charAt(0)}
                    </div>
                </div>
            </div>
        </header>
    )
}
