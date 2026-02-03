"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, User, Clock, MoreVertical, Video } from "lucide-react"

export default function DoctorSchedulePage() {
    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-primary">My Schedule</h2>
                    <p className="text-muted-foreground">Manage your appointments and availability.</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline">Day View</Button>
                    <Button variant="secondary">Week View</Button>
                </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-4">
                {/* Date Picker / Calendar Helper - Placeholder */}
                <Card className="lg:col-span-1 h-fit">
                    <CardContent className="p-4">
                        <div className="text-center p-8 border border-dashed rounded bg-muted/20 text-muted-foreground">
                            [Mini Calendar UI]
                        </div>
                    </CardContent>
                </Card>

                <Card className="lg:col-span-3">
                    <CardHeader>
                        <CardTitle>Friday, October 12</CardTitle>
                        <CardDescription>8 Appointments Scheduled</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-1">
                            {/* Hour Slot */}
                            <div className="flex gap-4 p-4 border-b last:border-0 hover:bg-muted/30 relative">
                                <div className="w-16 text-right font-medium text-muted-foreground text-sm pt-1">09:00 AM</div>
                                <div className="flex-1">
                                    <div className="border border-l-4 border-l-primary bg-primary/5 p-3 rounded text-sm w-full md:w-2/3 cursor-pointer hover:shadow-md transition-shadow">
                                        <div className="flex justify-between items-start">
                                            <span className="font-semibold text-primary">Team Meeting</span>
                                            <span className="text-xs text-muted-foreground">30m</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Hour Slot */}
                            <div className="flex gap-4 p-4 border-b last:border-0 hover:bg-muted/30 relative">
                                <div className="w-16 text-right font-medium text-muted-foreground text-sm pt-1">10:00 AM</div>
                                <div className="flex-1">
                                    <div className="border border-l-4 border-l-green-500 bg-green-50 p-3 rounded text-sm w-full md:w-3/4 flex justify-between cursor-pointer hover:shadow-md transition-shadow">
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <span className="font-semibold text-green-700">John Doe (Checkup)</span>
                                                <Badge variant="outline" className="text-[10px] h-5">Video</Badge>
                                            </div>
                                            <p className="text-xs text-muted-foreground mt-1">Patient ID: #P-12345</p>
                                        </div>
                                        <Button size="sm" variant="outline" className="h-8">Details</Button>
                                    </div>
                                </div>
                            </div>

                            {/* Empty Slot */}
                            <div className="flex gap-4 p-4 border-b last:border-0 hover:bg-muted/30 relative">
                                <div className="w-16 text-right font-medium text-muted-foreground text-sm pt-1">11:00 AM</div>
                                <div className="flex-1 opacity-50 flex items-center text-sm text-muted-foreground border border-dashed rounded p-3 h-16">
                                    Free Slot
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
