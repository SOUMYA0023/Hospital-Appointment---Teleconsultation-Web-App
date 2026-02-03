"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Upload, FileText, X } from "lucide-react"

export default function LabUploadPage() {
    return (
        <div className="flex flex-col gap-6 max-w-3xl mx-auto">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight text-primary">Upload Test Report</h2>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Report Details</CardTitle>
                    <CardDescription>Attach final PDF report and add remarks.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Patient Name</Label>
                            <Input value="John Doe" disabled />
                        </div>
                        <div className="space-y-2">
                            <Label>Test ID</Label>
                            <Input value="#TST-2024-001" disabled />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label>Parameters Analyzed</Label>
                        <Input value="Hemoglobin, RBC, WBC, Platelets" readOnly />
                    </div>

                    <div className="space-y-2">
                        <Label>Upload File (PDF)</Label>
                        <div className="border-2 border-dashed rounded-lg p-10 flex flex-col items-center justify-center text-center hover:bg-muted/50 transition-colors cursor-pointer">
                            <Upload className="h-10 w-10 text-muted-foreground mb-4" />
                            <p className="text-sm font-medium">Drag & drop or Click to Browse</p>
                            <p className="text-xs text-muted-foreground mt-1">Max file size: 5MB</p>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label>Technician Remarks</Label>
                        <Textarea placeholder="Enter any critical observations..." />
                    </div>

                    <div className="flex justify-end gap-3 pt-4">
                        <Button variant="outline">Cancel</Button>
                        <Button className="gap-2"><Upload className="h-4 w-4" /> Finalize & Send</Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
