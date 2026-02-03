"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, FileText, MessageSquare, ChevronRight, Activity } from "lucide-react"
import Link from "next/link"
import PageTransition from "@/components/shared/PageTransition"

export default function PatientDashboard() {
    return (
        <PageTransition>
            <div className="flex flex-col gap-6">
                <h2 className="text-3xl font-bold tracking-tight text-primary">Overview</h2>

                {/* Quick Stats Row */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Card className="glass-card">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Upcoming Visits</CardTitle>
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">2</div>
                            <p className="text-xs text-muted-foreground">Next: Dr. Smith (Cardiology)</p>
                        </CardContent>
                    </Card>

                    <Card className="glass-card">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Lab Reports</CardTitle>
                            <Activity className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">1 New</div>
                            <p className="text-xs text-muted-foreground">Blood Work (Yesterday)</p>
                        </CardContent>
                    </Card>

                    <Card className="glass-card">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Unread Messages</CardTitle>
                            <MessageSquare className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">3</div>
                            <p className="text-xs text-muted-foreground">From Dr. Sarah</p>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {/* Upcoming Appointments List */}
                    <Card className="col-span-2 shadow-md hover:shadow-lg transition-shadow bg-card/50 backdrop-blur-sm">
                        <CardHeader>
                            <CardTitle>Upcoming Appointments</CardTitle>
                            <CardDescription>Your scheduled consultation sessions.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {[1, 2].map((i) => (
                                    <div key={i} className="flex items-center justify-between p-4 border rounded-lg bg-card/50 hover:bg-accent/50 transition-colors">
                                        <div className="flex items-center gap-4">
                                            <div className="flex flex-col items-center justify-center h-12 w-12 rounded-lg bg-primary/10 text-primary font-bold">
                                                <span>12</span>
                                                <span className="text-[10px] uppercase">Oct</span>
                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-foreground">Dr. Sarah Smith</h4>
                                                <p className="text-sm text-muted-foreground">Cardiologist • 10:00 AM</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Button size="sm" variant="outline" className="hidden sm:flex">Reschedule</Button>
                                            <Button size="sm">Join Call</Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Quick Actions / Recent Records */}
                    <Card className="shadow-md hover:shadow-lg transition-shadow bg-card/50 backdrop-blur-sm">
                        <CardHeader>
                            <CardTitle>Recent History</CardTitle>
                            <CardDescription>Quick access to your records</CardDescription>
                        </CardHeader>
                        <CardContent className="grid gap-2">
                            <Link href="/patient/records" className="flex items-center justify-between p-3 rounded-md hover:bg-muted transition-colors border-b last:border-0">
                                <div className="flex items-center gap-3">
                                    <FileText className="h-5 w-5 text-blue-500" />
                                    <div className="text-sm">
                                        <p className="font-medium">General Checkup</p>
                                        <p className="text-xs text-muted-foreground">Sept 20, 2024</p>
                                    </div>
                                </div>
                                <ChevronRight className="h-4 w-4 text-muted-foreground" />
                            </Link>
                            <Link href="/patient/records" className="flex items-center justify-between p-3 rounded-md hover:bg-muted transition-colors border-b last:border-0">
                                <div className="flex items-center gap-3">
                                    <Activity className="h-5 w-5 text-green-500" />
                                    <div className="text-sm">
                                        <p className="font-medium">Blood Test Results</p>
                                        <p className="text-xs text-muted-foreground">Sept 18, 2024</p>
                                    </div>
                                </div>
                                <ChevronRight className="h-4 w-4 text-muted-foreground" />
                            </Link>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </PageTransition>
    )
}
