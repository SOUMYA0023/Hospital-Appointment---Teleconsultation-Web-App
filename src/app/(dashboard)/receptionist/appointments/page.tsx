"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, MapPin, User, Search, PlusCircle, Phone, Video } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ReceptionistAppointmentsPage() {
    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-primary">All Appointments</h2>
                    <p className="text-muted-foreground">Manage all appointments across departments.</p>
                </div>
                <Button className="gap-2">
                    <PlusCircle className="h-4 w-4" /> Book Appointment
                </Button>
            </div>

            {/* Search and Filter */}
            <Card>
                <CardContent className="p-4 flex flex-col sm:flex-row gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="Search by patient name, ID, or doctor..." className="pl-9" />
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline">Today</Button>
                        <Button variant="outline">All Day</Button>
                    </div>
                </CardContent>
            </Card>

            <Tabs defaultValue="today" className="w-full">
                <TabsList>
                    <TabsTrigger value="today">Today</TabsTrigger>
                    <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                    <TabsTrigger value="completed">Completed</TabsTrigger>
                </TabsList>

                <TabsContent value="today" className="mt-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Today's Appointments</CardTitle>
                            <CardDescription>Appointments scheduled for today across all departments.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="rounded-md border">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="border-b bg-muted/50 text-left">
                                            <th className="p-4 font-medium text-muted-foreground w-[100px]">Time</th>
                                            <th className="p-4 font-medium text-muted-foreground">Patient</th>
                                            <th className="p-4 font-medium text-muted-foreground">Doctor</th>
                                            <th className="p-4 font-medium text-muted-foreground">Department</th>
                                            <th className="p-4 font-medium text-muted-foreground">Type</th>
                                            <th className="p-4 font-medium text-muted-foreground">Status</th>
                                            <th className="p-4 font-medium text-muted-foreground text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="border-b last:border-0 hover:bg-muted/20">
                                            <td className="p-4 font-medium">09:00 AM</td>
                                            <td className="p-4">
                                                <div className="flex items-center gap-2">
                                                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-sm">JD</div>
                                                    <div>
                                                        <div className="font-medium">John Doe</div>
                                                        <div className="text-xs text-muted-foreground">#P-12345</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-4">Dr. Sarah Smith</td>
                                            <td className="p-4">Cardiology</td>
                                            <td className="p-4">
                                                <div className="flex items-center gap-1">
                                                    <Video className="h-4 w-4 text-muted-foreground" />
                                                    <span>Teleconsult</span>
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-200">Confirmed</Badge>
                                            </td>
                                            <td className="p-4 text-right">
                                                <div className="flex gap-2 justify-end">
                                                    <Button variant="ghost" size="sm">Call</Button>
                                                    <Button variant="outline" size="sm">Check-in</Button>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr className="border-b last:border-0 hover:bg-muted/20">
                                            <td className="p-4 font-medium">10:30 AM</td>
                                            <td className="p-4">
                                                <div className="flex items-center gap-2">
                                                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-sm">AS</div>
                                                    <div>
                                                        <div className="font-medium">Alice Smith</div>
                                                        <div className="text-xs text-muted-foreground">#P-12346</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-4">Dr. James Wilson</td>
                                            <td className="p-4">Dermatology</td>
                                            <td className="p-4">
                                                <div className="flex items-center gap-1">
                                                    <MapPin className="h-4 w-4 text-muted-foreground" />
                                                    <span>In-Person</span>
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 border-yellow-200">Arrived</Badge>
                                            </td>
                                            <td className="p-4 text-right">
                                                <div className="flex gap-2 justify-end">
                                                    <Button variant="ghost" size="sm">
                                                        <Phone className="h-4 w-4" />
                                                    </Button>
                                                    <Button variant="outline" size="sm">Room</Button>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr className="border-b last:border-0 hover:bg-muted/20">
                                            <td className="p-4 font-medium">02:00 PM</td>
                                            <td className="p-4">
                                                <div className="flex items-center gap-2">
                                                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-sm">MJ</div>
                                                    <div>
                                                        <div className="font-medium">Mary Johnson</div>
                                                        <div className="text-xs text-muted-foreground">#P-12347</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-4">Dr. Emily Davis</td>
                                            <td className="p-4">Pediatrics</td>
                                            <td className="p-4">
                                                <div className="flex items-center gap-1">
                                                    <Video className="h-4 w-4 text-muted-foreground" />
                                                    <span>Teleconsult</span>
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <Badge variant="secondary" className="bg-muted text-muted-foreground border">Scheduled</Badge>
                                            </td>
                                            <td className="p-4 text-right">
                                                <div className="flex gap-2 justify-end">
                                                    <Button variant="ghost" size="sm">
                                                        <Phone className="h-4 w-4" />
                                                    </Button>
                                                    <Button variant="outline" size="sm">Reschedule</Button>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="upcoming" className="mt-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Upcoming Appointments</CardTitle>
                            <CardDescription>Appointments scheduled for the coming days.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="p-8 text-center text-muted-foreground">
                                No upcoming appointments found.
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="completed" className="mt-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Completed Appointments</CardTitle>
                            <CardDescription>Appointments that have been completed today.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="p-8 text-center text-muted-foreground">
                                No completed appointments today.
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}