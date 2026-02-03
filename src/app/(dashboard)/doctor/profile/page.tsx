"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function ProfilePage() {
    return (
        <div className="max-w-4xl mx-auto flex flex-col gap-6">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight text-primary">My Profile</h2>
                <Button>Edit Profile</Button>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
                <Card className="md:col-span-1">
                    <CardContent className="pt-6 flex flex-col items-center text-center">
                        <Avatar className="h-24 w-24 mb-4">
                            <AvatarFallback className="text-2xl bg-primary/10 text-primary">SS</AvatarFallback>
                        </Avatar>
                        <h3 className="font-bold text-xl">Dr. Sarah Smith</h3>
                        <p className="text-muted-foreground text-sm">Doctor ID: #D-789012</p>
                        <div className="mt-4 w-full space-y-2">
                            <div className="bg-muted/50 p-2 rounded text-sm">
                                <p className="font-semibold">Specialization</p>
                                <p>Cardiologist</p>
                            </div>
                            <div className="bg-muted/50 p-2 rounded text-sm">
                                <p className="font-semibold">Years Exp</p>
                                <p>12 Years</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="md:col-span-2">
                    <CardHeader>
                        <CardTitle>Personal Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Full Name</Label>
                                <Input defaultValue="Dr. Sarah Smith" readOnly />
                            </div>
                            <div className="space-y-2">
                                <Label>Email</Label>
                                <Input defaultValue="sarah.smith@hospital.com" readOnly />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label>Phone</Label>
                            <Input defaultValue="+1 (555) 987-6543" readOnly />
                        </div>
                        <div className="space-y-2">
                            <Label>Department</Label>
                            <Input defaultValue="Cardiology Department, Floor 3" readOnly />
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
