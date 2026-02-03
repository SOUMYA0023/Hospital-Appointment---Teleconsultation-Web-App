"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Filter, MoreHorizontal } from "lucide-react"

export default function DoctorPatientsPage() {
    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight text-primary">My Patients</h2>
                <Button>+ Add New Patient</Button>
            </div>

            <Card>
                <CardHeader>
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input placeholder="Search by name, ID, or phone..." className="pl-9" />
                        </div>
                        <div className="flex gap-2">
                            <Button variant="outline" className="gap-2"><Filter className="h-4 w-4" /> Filters</Button>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="rounded-md border">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b bg-muted/50 text-left hover:bg-muted/50">
                                    <th className="p-4 font-medium text-muted-foreground w-[100px]">ID</th>
                                    <th className="p-4 font-medium text-muted-foreground">Name</th>
                                    <th className="p-4 font-medium text-muted-foreground">Last Visit</th>
                                    <th className="p-4 font-medium text-muted-foreground">Condition</th>
                                    <th className="p-4 font-medium text-muted-foreground">Status</th>
                                    <th className="p-4 font-medium text-muted-foreground text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[1, 2, 3].map((i) => (
                                    <tr key={i} className="border-b last:border-0 hover:bg-muted/20 transition-colors">
                                        <td className="p-4 font-medium">#P-400{i}</td>
                                        <td className="p-4 font-medium">Alice Johnson</td>
                                        <td className="p-4 text-muted-foreground">Oct 10, 2024</td>
                                        <td className="p-4">Hypertension</td>
                                        <td className="p-4">
                                            <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-green-100 text-green-800">
                                                Active
                                            </span>
                                        </td>
                                        <td className="p-4 text-right">
                                            <Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
