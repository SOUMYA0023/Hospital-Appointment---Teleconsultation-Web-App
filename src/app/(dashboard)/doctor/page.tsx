"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Users, Clock, Video, User } from "lucide-react"
import Link from "next/link"
import PageTransition from "@/components/shared/PageTransition"

export default function DoctorDashboard() {
    return (
        <PageTransition>
            <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-3xl font-bold tracking-tight text-primary">Doctor&apos;s Dashboard</h2>
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">Today: Oct 12, 2024</span>
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Online</Badge>
                    </div>
                </div>

                {/* Quick Stats Row */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Card className="glass-card">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Today&apos;s Appointments</CardTitle>
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">8</div>
                            <p className="text-xs text-muted-foreground">3 Completed, 5 Remaining</p>
                        </CardContent>
                    </Card>

                    <Card className="glass-card">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Pending Reports</CardTitle>
                            <Clock className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">2</div>
                            <p className="text-xs text-muted-foreground">Review required</p>
                        </CardContent>
                    </Card>

                    <Card className="glass-card">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">1,204</div>
                            <p className="text-xs text-muted-foreground">+12 this week</p>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid gap-6 md:grid-cols-3">
                    {/* Today's Schedule Card */}
                    <Card className="col-span-2 shadow-md hover:shadow-lg transition-shadow bg-card/50 backdrop-blur-sm">
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div>
                                <CardTitle>Upcoming Schedule</CardTitle>
                                <CardDescription>You have 5 more appointments today.</CardDescription>
                            </div>
                            <Button variant="outline" size="sm">View Calendar</Button>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {/* Active Appointment */}
                                <div className="flex items-center justify-between p-4 border rounded-lg bg-primary/5 border-primary/20">
                                    <div className="flex items-center gap-4">
                                        <div className="flex flex-col items-center justify-center h-12 w-12 rounded-full bg-primary text-primary-foreground font-bold">
                                            <User className="h-6 w-6" />
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <h4 className="font-semibold text-foreground">John Doe</h4>
                                                <Badge variant="secondary" className="text-xs">In Progress</Badge>
                                            </div>
                                            <p className="text-sm text-muted-foreground">General Checkup • 10:00 AM</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Button size="sm">Open Profile</Button>
                                        <Button size="sm" variant="default" className="gap-2"><Video className="h-4 w-4" /> Join Call</Button>
                                    </div>
                                </div>

                                {/* Next Appointments */}
                                {[1, 2].map((i) => (
                                    <div key={i} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                                        <div className="flex items-center gap-4">
                                            <p className="font-mono text-sm font-medium text-muted-foreground">10:30 AM</p>
                                            <div>
                                                <h4 className="font-medium text-foreground">Jane Smith</h4>
                                                <p className="text-xs text-muted-foreground">Follow Up • Video Consultation</p>
                                            </div>
                                        </div>
                                        <Button size="sm" variant="ghost">View Details</Button>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Quick Actions Panel */}
                    <Card className="shadow-md hover:shadow-lg transition-shadow bg-card/50 backdrop-blur-sm">
                        <CardHeader>
                            <CardTitle>Actions</CardTitle>
                        </CardHeader>
                        <CardContent className="grid gap-2">
                            <Button variant="outline" className="justify-start gap-2 h-12">
                                <Users className="h-4 w-4" /> Assign Test
                            </Button>
                            <Button variant="outline" className="justify-start gap-2 h-12">
                                <Clock className="h-4 w-4" /> Manage Slots
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </PageTransition>
    )
}
