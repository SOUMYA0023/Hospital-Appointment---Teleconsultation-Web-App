"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Users, Clock, UserPlus, FileText } from "lucide-react"

export default function ReceptionistDashboard() {
    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight text-primary">Front Desk</h2>
                <Button className="gap-2">
                    <UserPlus className="h-4 w-4" /> New Registration
                </Button>
            </div>

            {/* Quick Stats */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card className="shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Waiting Queue</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">12</div>
                        <p className="text-xs text-muted-foreground">Avg wait time: 15m</p>
                    </CardContent>
                </Card>

                <Card className="shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Doctors Active</CardTitle>
                        <UserPlus className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">5</div>
                        <p className="text-xs text-muted-foreground">All departments online</p>
                    </CardContent>
                </Card>
            </div>

            {/* Live Queue */}
            <Card className="shadow-md">
                <CardHeader>
                    <CardTitle>Live Patient Queue</CardTitle>
                    <CardDescription>Real-time status of waiting patients.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="rounded-md border">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b bg-muted/50 text-left">
                                    <th className="p-4 font-medium text-muted-foreground w-[80px]">Token</th>
                                    <th className="p-4 font-medium text-muted-foreground">Patient Name</th>
                                    <th className="p-4 font-medium text-muted-foreground">Department</th>
                                    <th className="p-4 font-medium text-muted-foreground">Time In</th>
                                    <th className="p-4 font-medium text-muted-foreground">Status</th>
                                    <th className="p-4 font-medium text-muted-foreground text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b last:border-0 hover:bg-muted/20">
                                    <td className="p-4 font-bold text-center bg-muted/20">A-12</td>
                                    <td className="p-4 font-medium">James Bond</td>
                                    <td className="p-4">Cardiology</td>
                                    <td className="p-4 text-muted-foreground">09:45 AM</td>
                                    <td className="p-4">
                                        <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Waiting</Badge>
                                    </td>
                                    <td className="p-4 text-right">
                                        <Button size="sm" variant="outline">Assign Slot</Button>
                                    </td>
                                </tr>
                                <tr className="border-b last:border-0 hover:bg-muted/20">
                                    <td className="p-4 font-bold text-center bg-muted/20">A-13</td>
                                    <td className="p-4 font-medium">Sarah Connor</td>
                                    <td className="p-4">Dermatology</td>
                                    <td className="p-4 text-muted-foreground">09:50 AM</td>
                                    <td className="p-4">
                                        <Badge variant="outline">Checked In</Badge>
                                    </td>
                                    <td className="p-4 text-right">
                                        <Button size="sm" variant="outline">Assign Slot</Button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
