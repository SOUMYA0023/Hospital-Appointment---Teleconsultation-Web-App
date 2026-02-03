"use client"

import { ChatWindow } from "@/components/features/chat/ChatWindow"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function PatientMessagesPage() {
    return (
        <div className="flex flex-col gap-6 h-[calc(100vh-140px)]">
            <div className="flex items-center justify-between shrink-0">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-primary">Messages</h2>
                    <p className="text-muted-foreground">Secure consultation with your doctor.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-full">
                {/* Contacts List (Sidebar) */}
                <Card className="hidden md:block md:col-span-4 lg:col-span-3 h-full overflow-hidden flex flex-col">
                    <CardHeader className="px-4 py-3 border-b">
                        <CardTitle className="text-base">Active Chats</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0 flex-1 overflow-y-auto">
                        <div className="flex flex-col">
                            <button className="flex items-center gap-3 p-4 border-l-4 border-l-primary bg-primary/5 hover:bg-muted transition-colors text-left">
                                <div className="h-10 w-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">DS</div>
                                <div className="flex-1 overflow-hidden">
                                    <div className="flex justify-between items-center mb-1">
                                        <span className="font-semibold text-sm">Dr. Sarah Smith</span>
                                        <span className="text-xs text-muted-foreground">Now</span>
                                    </div>
                                    <p className="text-xs text-muted-foreground truncate">Session Active...</p>
                                </div>
                            </button>
                            {/* Inactive Chat */}
                            <button className="flex items-center gap-3 p-4 border-l-4 border-l-transparent hover:bg-muted transition-colors text-left opacity-70">
                                <div className="h-10 w-10 rounded-full bg-muted text-muted-foreground flex items-center justify-center font-bold">JD</div>
                                <div className="flex-1 overflow-hidden">
                                    <div className="flex justify-between items-center mb-1">
                                        <span className="font-semibold text-sm">Dr. John Doe</span>
                                        <span className="text-xs text-muted-foreground">Yesterday</span>
                                    </div>
                                    <p className="text-xs text-muted-foreground truncate">Prescription sent.</p>
                                </div>
                            </button>
                        </div>
                    </CardContent>
                </Card>

                {/* Chat Area */}
                <div className="col-span-1 md:col-span-8 lg:col-span-9 h-full">
                    <ChatWindow chatId="session-1" title="Dr. Sarah Smith (Cardiologist)" />
                </div>
            </div>
        </div>
    )
}
