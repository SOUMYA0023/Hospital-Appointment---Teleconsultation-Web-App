"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { FileText, Download, Eye, FlaskConical } from "lucide-react"

export default function MedicalRecordsPage() {
    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-primary">Medical Records</h2>
                    <p className="text-muted-foreground">View and download your medical history and lab reports.</p>
                </div>
                <Button variant="outline">Request Records</Button>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                {/* Lab Reports Section */}
                <Card>
                    <CardHeader>
                        <div className="flex items-center gap-2">
                            <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                                <FlaskConical className="h-5 w-5" />
                            </div>
                            <div>
                                <CardTitle>Lab Reports</CardTitle>
                                <CardDescription>Recent test results from the laboratory.</CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {[1, 2].map((i) => (
                            <div key={i} className="flex items-center justify-between p-3 border rounded-md hover:bg-muted/50 transition-colors">
                                <div className="flex items-center gap-3">
                                    <FileText className="h-8 w-8 text-muted-foreground/50" />
                                    <div>
                                        <p className="font-medium text-sm">Complete Blood Count (CBC)</p>
                                        <p className="text-xs text-muted-foreground">Sept 28, 2024</p>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <Button size="icon" variant="ghost"><Eye className="h-4 w-4" /></Button>
                                    <Button size="icon" variant="ghost"><Download className="h-4 w-4" /></Button>
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>

                {/* Prescriptions Section */}
                <Card>
                    <CardHeader>
                        <div className="flex items-center gap-2">
                            <div className="p-2 bg-green-100 rounded-lg text-green-600">
                                <FileText className="h-5 w-5" />
                            </div>
                            <div>
                                <CardTitle>Prescriptions</CardTitle>
                                <CardDescription>Digital prescriptions from your doctors.</CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between p-3 border rounded-md hover:bg-muted/50 transition-colors">
                            <div className="flex items-center gap-3">
                                <FileText className="h-8 w-8 text-muted-foreground/50" />
                                <div>
                                    <p className="font-medium text-sm">Cardiology Consultation</p>
                                    <p className="text-xs text-muted-foreground">Dr. Sarah Smith • Sept 15, 2024</p>
                                </div>
                            </div>
                            <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">Active</Badge>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
