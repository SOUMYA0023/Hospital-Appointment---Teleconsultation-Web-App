"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Search, FlaskConical, CheckCircle, Clock, AlertTriangle, Eye } from "lucide-react"
import { Input } from "@/components/ui/input"

export default function LabRequestsPage() {
    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-primary">Test Requests</h2>
                    <p className="text-muted-foreground">Manage incoming test requests from doctors.</p>
                </div>
                <Button className="gap-2">
                    <FlaskConical className="h-4 w-4" /> Bulk Process
                </Button>
            </div>

            {/* Search / Filter */}
            <Card>
                <CardContent className="p-4 flex flex-col sm:flex-row gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="Search by patient ID, test type, or doctor..." className="pl-9" />
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline">All Status</Button>
                        <Button variant="outline">All Types</Button>
                    </div>
                </CardContent>
            </Card>

            <div className="grid gap-6">
                {/* Urgent Request */}
                <Card className="shadow-md border-l-4 border-l-red-500">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <div>
                            <CardTitle className="text-lg">Critical: Cardiac Enzymes</CardTitle>
                            <CardDescription>Patient: Robert Downey (#P-2001) • Ref: Dr. Wilson</CardDescription>
                        </div>
                        <Badge className="bg-red-500 hover:bg-red-500">Critical</Badge>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center justify-between bg-red-50 p-4 rounded-md border border-red-200">
                            <div className="flex gap-8 text-sm">
                                <div className="flex flex-col">
                                    <span className="text-muted-foreground">Test Type</span>
                                    <span className="font-medium">Troponin T, CK-MB, LDH</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-muted-foreground">Requested</span>
                                    <span className="font-medium">08:15 AM (Today)</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-muted-foreground">Priority</span>
                                    <span className="font-medium">Stat (Immediate)</span>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <Button variant="outline" size="sm">View Order</Button>
                                <Button size="sm" className="gap-2 bg-red-600 hover:bg-red-700">
                                    <AlertTriangle className="h-4 w-4" /> Acknowledge
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* High Priority Request */}
                <Card className="shadow-md border-l-4 border-l-amber-500">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <div>
                            <CardTitle className="text-lg">High Priority: Blood Culture</CardTitle>
                            <CardDescription>Patient: Jennifer Lawrence (#P-2002) • Ref: Dr. Smith</CardDescription>
                        </div>
                        <Badge className="bg-amber-500">High Priority</Badge>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center justify-between bg-amber-50 p-4 rounded-md border border-amber-200">
                            <div className="flex gap-8 text-sm">
                                <div className="flex flex-col">
                                    <span className="text-muted-foreground">Test Type</span>
                                    <span className="font-medium">Blood Culture & Sensitivity</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-muted-foreground">Requested</span>
                                    <span className="font-medium">08:45 AM (Today)</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-muted-foreground">Priority</span>
                                    <span className="font-medium">High</span>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <Button variant="outline" size="sm">View Order</Button>
                                <Button size="sm" className="gap-2 bg-amber-600 hover:bg-amber-700">
                                    <CheckCircle className="h-4 w-4" /> Mark Processing
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Standard Request */}
                <Card className="shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <div>
                            <CardTitle className="text-lg">Routine: Lipid Panel</CardTitle>
                            <CardDescription>Patient: Chris Evans (#P-2003) • Ref: Dr. Johnson</CardDescription>
                        </div>
                        <Badge variant="outline">Routine</Badge>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center justify-between p-4 rounded-md bg-muted/30">
                            <div className="flex gap-8 text-sm">
                                <div className="flex flex-col">
                                    <span className="text-muted-foreground">Test Type</span>
                                    <span className="font-medium">Cholesterol, Triglycerides, HDL/LDL</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-muted-foreground">Requested</span>
                                    <span className="font-medium">09:15 AM (Today)</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-muted-foreground">Priority</span>
                                    <span className="font-medium">Standard</span>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <Button variant="outline" size="sm">View Order</Button>
                                <Button size="sm" variant="secondary">Process</Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Pending Request */}
                <Card className="shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <div>
                            <CardTitle className="text-lg">Pending: Thyroid Function</CardTitle>
                            <CardDescription>Patient: Scarlett Johansson (#P-2004) • Ref: Dr. Davis</CardDescription>
                        </div>
                        <Badge variant="outline" className="bg-muted text-muted-foreground">Pending</Badge>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center justify-between p-4 rounded-md">
                            <div className="flex gap-8 text-sm">
                                <div className="flex flex-col">
                                    <span className="text-muted-foreground">Test Type</span>
                                    <span className="font-medium">TSH, T3, T4</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-muted-foreground">Requested</span>
                                    <span className="font-medium">Yesterday, 04:30 PM</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-muted-foreground">Priority</span>
                                    <span className="font-medium">Standard</span>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <Button variant="outline" size="sm" className="gap-2">
                                    <Eye className="h-4 w-4" /> Review
                                </Button>
                                <Button size="sm" variant="secondary">Process</Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}