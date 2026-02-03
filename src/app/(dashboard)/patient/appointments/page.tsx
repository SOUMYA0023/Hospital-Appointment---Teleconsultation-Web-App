"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Clock, MapPin, Video } from "lucide-react"

export default function AppointmentsPage() {
    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight text-primary">Appointments</h2>
                <Button>Book New Appointment</Button>
            </div>

            <Tabs defaultValue="upcoming" className="w-full">
                <TabsList>
                    <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                    <TabsTrigger value="history">History</TabsTrigger>
                </TabsList>

                <TabsContent value="upcoming" className="mt-4 space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Next Consultation</CardTitle>
                            <CardDescription>Scheduled appointments with your doctors.</CardDescription>
                        </CardHeader>
                        <CardContent className="grid gap-4">
                            {/* Appointment Item */}
                            <div className="flex flex-col md:flex-row items-start md:items-center justify-between p-4 border rounded-lg bg-card/50">
                                <div className="flex gap-4">
                                    <div className="flex flex-col items-center justify-center p-3 bg-primary/10 rounded-md text-primary min-w-[60px]">
                                        <span className="text-xl font-bold">12</span>
                                        <span className="text-xs uppercase font-medium">Oct</span>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg">Dr. Sarah Smith</h3>
                                        <p className="text-sm text-muted-foreground">Cardiologist • General Checkup</p>
                                        <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                                            <div className="flex items-center gap-1">
                                                <Clock className="h-4 w-4" /> 10:00 AM - 10:30 AM
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Video className="h-4 w-4" /> Teleconsultation
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-4 md:mt-0 flex gap-2 w-full md:w-auto">
                                    <Button variant="outline" className="flex-1 md:flex-none">Reschedule</Button>
                                    <Button className="flex-1 md:flex-none">Join Call</Button>
                                </div>
                            </div>

                            {/* Appointment Item 2 */}
                            <div className="flex flex-col md:flex-row items-start md:items-center justify-between p-4 border rounded-lg bg-card/50">
                                <div className="flex gap-4">
                                    <div className="flex flex-col items-center justify-center p-3 bg-muted rounded-md text-muted-foreground min-w-[60px]">
                                        <span className="text-xl font-bold">15</span>
                                        <span className="text-xs uppercase font-medium">Oct</span>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg">Dr. James Wilson</h3>
                                        <p className="text-sm text-muted-foreground">Dermatologist • Follow Up</p>
                                        <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                                            <div className="flex items-center gap-1">
                                                <Clock className="h-4 w-4" /> 02:00 PM - 02:15 PM
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <MapPin className="h-4 w-4" /> Room 304, 3rd Floor
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-4 md:mt-0 flex gap-2 w-full md:w-auto">
                                    <Button variant="outline" className="flex-1 md:flex-none">Reschedule</Button>
                                    <Button variant="secondary" className="flex-1 md:flex-none" disabled>In-Person</Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="history" className="mt-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Past Appointments</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="p-8 text-center text-muted-foreground">
                                No past appointments found.
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}
