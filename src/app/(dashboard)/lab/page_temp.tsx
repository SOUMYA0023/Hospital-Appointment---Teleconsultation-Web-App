"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Search, FlaskConical, Upload, CheckCircle, Clock } from "lucide-react"
import { Input } from "@/components/ui/input"

export default function LabDashboard() {
    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight text-primary">Laboratory</h2>
                <div className="flex gap-2">
                    <Badge variant="secondary" className="text-sm px-3 py-1 bg-amber-100 text-amber-800">Pending: 5</Badge>
                </div>
            </div>

            {/* Search / Filter */}
            <Card>
                <CardContent className="p-4 flex gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="Scan Barcode or Search Patient ID..." className="pl-9" />
                    </div>
                    <Button variant="outline"><FlaskConical className="h-4 w-4 mr-2" /> All Tests</Button>
                </CardContent>
            </Card>

            <div className="grid gap-6">
                {/* Active Requests */}
                <Card className="shadow-md border-l-4 border-l-amber-500">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <div>
                            <CardTitle className="text-lg">Urgent: Blood Work</CardTitle>
                            <CardDescription>Patient: John Doe (#P-12345) • Ref: Dr. Smith</CardDescription>
                        </div>
                        <Badge className="bg-amber-500">High Priority</Badge>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center justify-between bg-muted/30 p-4 rounded-md">
                            <div className="flex gap-8 text-sm">
                                <div className="flex flex-col">
                                    <span className="text-muted-foreground">Test Type</span>
                                    <span className="font-medium">CBC, Lipid Profile</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-muted-foreground">Sample Collected</span>
                                    <span className="font-medium">10:30 AM (Today)</span>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <Button variant="outline" size="sm">Print Labels</Button>
                                <Button size="sm" className="gap-2"><Upload className="h-4 w-4" /> Upload Report</Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Standard Request */}
                <Card className="shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <div>
                            <CardTitle className="text-lg">Routine Checkup</CardTitle>
                            <CardDescription>Patient: Alice Johnson (#P-67890)</CardDescription>
                        </div>
                        <Badge variant="outline">Routine</Badge>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center justify-between p-4 rounded-md">
                            <div className="flex gap-8 text-sm">
                                <div className="flex flex-col">
                                    <span className="text-muted-foreground">Test Type</span>
                                    <span className="font-medium">Vitamin D, B12</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-muted-foreground">Requested By</span>
                                    <span className="font-medium">Dr. Wilson</span>
                                </div>
                            </div>
                            <Button size="sm" variant="secondary">Mark Collected</Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Completed Request */}
                <Card className="shadow-sm border-l-4 border-l-green-500 opacity-80">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <div>
                            <CardTitle className="text-lg">Completed</CardTitle>
                            <CardDescription>Patient: Bob Brown (#P-99999)</CardDescription>
                        </div>
                        <Badge variant="secondary" className="bg-green-100 text-green-800"><CheckCircle className="h-3 w-3 mr-1" /> Reported</Badge>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center justify-between p-4 rounded-md">
                            <span className="text-sm text-muted-foreground">Report uploaded at 09:15 AM</span>
                            <Button size="sm" variant="outline">View Report</Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
