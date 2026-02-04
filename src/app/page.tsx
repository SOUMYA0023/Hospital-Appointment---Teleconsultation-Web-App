"use client";

import React, { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Activity,
  Bell,
  Calendar,
  ChevronDown,
  ClipboardList,
  FileHeart,
  FileText,
  HeartPulse,
  LineChart,
  Lock,
  MessageSquare,
  Menu,
  Phone,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Users,
  Video,
  X
} from "lucide-react";

const createIllustration = (accent: string, soft: string) =>
  `data:image/svg+xml,${encodeURIComponent(`
  <svg xmlns="http://www.w3.org/2000/svg" width="480" height="320" viewBox="0 0 480 320">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="${accent}" stop-opacity="0.95"/>
        <stop offset="100%" stop-color="${soft}" stop-opacity="0.85"/>
      </linearGradient>
    </defs>
    <rect width="480" height="320" rx="32" fill="url(#g)"/>
    <circle cx="380" cy="80" r="60" fill="white" fill-opacity="0.28"/>
    <circle cx="120" cy="250" r="90" fill="white" fill-opacity="0.2"/>
    <rect x="70" y="70" width="150" height="14" rx="7" fill="white" fill-opacity="0.45"/>
    <rect x="70" y="95" width="200" height="14" rx="7" fill="white" fill-opacity="0.35"/>
    <rect x="70" y="120" width="120" height="14" rx="7" fill="white" fill-opacity="0.3"/>
    <path d="M240 90 v140" stroke="white" stroke-width="18" stroke-linecap="round"/>
    <path d="M170 160 h140" stroke="white" stroke-width="18" stroke-linecap="round"/>
  </svg>
`)}`;

const heroPattern = `data:image/svg+xml,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 120 120">
  <rect width="120" height="120" fill="none"/>
  <circle cx="60" cy="60" r="40" fill="#ffffff" fill-opacity="0.1"/>
  <path d="M60 38 v16" stroke="#ffffff" stroke-opacity="0.4" stroke-width="4" stroke-linecap="round"/>
  <path d="M52 46 h16" stroke="#ffffff" stroke-opacity="0.4" stroke-width="4" stroke-linecap="round"/>
</svg>
`)}`;

const navLinks = [
  { label: "Overview", href: "#overview" },
  { label: "Appointments", href: "#appointments" },
  { label: "Records", href: "#records" },
  { label: "Chat", href: "#chat" },
  { label: "Profile", href: "#profile" }
];

const featureCards = [
  {
    title: "Video Consultation",
    description: "Instant HD visits with verified specialists and AI-ready notes.",
    icon: Video,
    accent: "text-sky-600",
    image: createIllustration("#0ea5e9", "#38bdf8")
  },
  {
    title: "Find Doctors",
    description: "Browse top-rated doctors by specialty, location, and availability.",
    icon: Stethoscope,
    accent: "text-emerald-600",
    image: createIllustration("#10b981", "#34d399")
  },
  {
    title: "Lab Reports",
    description: "Secure access to diagnostics with critical flags and trends.",
    icon: ClipboardList,
    accent: "text-amber-600",
    image: createIllustration("#f59e0b", "#fbbf24")
  },
  {
    title: "Prescriptions",
    description: "Digital prescriptions with refill reminders and pharmacy sync.",
    icon: FileText,
    accent: "text-indigo-600",
    image: createIllustration("#6366f1", "#818cf8")
  },
  {
    title: "Health Records",
    description: "Unified timeline of visits, medications, and lab histories.",
    icon: FileHeart,
    accent: "text-rose-600",
    image: createIllustration("#f43f5e", "#fb7185")
  },
  {
    title: "Remote Monitoring",
    description: "Vitals tracking with smart alerts for proactive care.",
    icon: HeartPulse,
    accent: "text-cyan-600",
    image: createIllustration("#06b6d4", "#22d3ee")
  }
];

const statCards = [
  {
    label: "Upcoming Appointments",
    value: "3",
    detail: "Next 7 days",
    icon: Calendar,
    tone: "bg-sky-500/10 text-sky-600"
  },
  {
    label: "Medical Records",
    value: "24",
    detail: "Updated weekly",
    icon: FileText,
    tone: "bg-emerald-500/10 text-emerald-600"
  },
  {
    label: "Unread Messages",
    value: "5",
    detail: "Doctor replies",
    icon: MessageSquare,
    tone: "bg-amber-500/10 text-amber-600"
  },
  {
    label: "Health Score",
    value: "86",
    detail: "Excellent",
    icon: LineChart,
    tone: "bg-indigo-500/10 text-indigo-600"
  }
];

const chatList = [
  {
    name: "Dr. Sarah Smith",
    role: "Cardiology",
    message: "Your ECG results look stable.",
    time: "2m",
    status: "online"
  },
  {
    name: "Dr. James Wilson",
    role: "Dermatology",
    message: "Reminder: follow-up on Friday.",
    time: "1h",
    status: "offline"
  },
  {
    name: "Care Team",
    role: "Health Concierge",
    message: "We have updated your care plan.",
    time: "Yesterday",
    status: "online"
  }
];

const chatMessages = [
  {
    sender: "doctor",
    text: "Hi Anya, I reviewed your labs. Everything looks on track.",
    time: "09:42"
  },
  {
    sender: "patient",
    text: "Great! Can I resume workouts this week?",
    time: "09:43"
  },
  {
    sender: "doctor",
    text: "Yes, start with low-impact cardio and stay hydrated.",
    time: "09:44"
  }
];

export default function HospitalApp() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const profileInitials = useMemo(() => "AR", []);

  return (
    <div className="min-h-screen bg-slate-50 text-foreground">
      <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <HeartPulse className="h-6 w-6" />
            </div>
            <div>
              <p className="text-lg font-semibold">MediCare</p>
              <p className="text-xs text-muted-foreground">Hospital Platform</p>
            </div>
          </div>

          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-muted-foreground">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-rose-500" />
            </Button>
            <div className="relative">
              <Button
                variant="ghost"
                className="flex items-center gap-2"
                onClick={() => setIsProfileOpen((prev) => !prev)}
              >
                <Avatar className="h-9 w-9">
                  <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
                    {profileInitials}
                  </AvatarFallback>
                </Avatar>
                <div className="text-left">
                  <p className="text-sm font-medium leading-none">Anya Rao</p>
                  <p className="text-xs text-muted-foreground">Patient</p>
                </div>
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              </Button>
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-52 rounded-xl border bg-white shadow-lg">
                  <div className="p-3 text-sm">
                    <p className="font-medium">Signed in</p>
                    <p className="text-xs text-muted-foreground">anya.rao@medicare.com</p>
                  </div>
                  <div className="border-t p-2 text-sm">
                    <button className="w-full rounded-lg px-3 py-2 text-left hover:bg-muted/50">Profile</button>
                    <button className="w-full rounded-lg px-3 py-2 text-left hover:bg-muted/50">Settings</button>
                    <button className="w-full rounded-lg px-3 py-2 text-left text-rose-600 hover:bg-rose-50">
                      Sign out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen((prev) => !prev)}>
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden border-t bg-white/95">
            <div className="container py-4 space-y-3 text-sm">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="block rounded-lg px-3 py-2 font-medium text-muted-foreground hover:bg-muted/50"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <div className="flex items-center gap-3 px-3 pt-3 border-t">
                <Avatar className="h-9 w-9">
                  <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
                    {profileInitials}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">Anya Rao</p>
                  <p className="text-xs text-muted-foreground">anya.rao@medicare.com</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      <section
        id="overview"
        className="relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-sky-50 via-white to-indigo-50" />
        <div
          className="absolute inset-0 opacity-30"
          style={{ backgroundImage: `url("${heroPattern}")` }}
        />
        <div className="absolute -top-20 -right-24 h-72 w-72 rounded-full bg-sky-200/40 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-56 w-56 rounded-full bg-indigo-200/40 blur-3xl" />

        <div className="container relative grid gap-12 py-16 lg:grid-cols-2 lg:py-24">
          <div className="space-y-6 fade-in">
            <Badge className="w-fit bg-primary/10 text-primary" variant="secondary">
              Trusted digital care platform
            </Badge>
            <h1 className="text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
              Manage your care journey with a modern hospital command center.
            </h1>
            <p className="text-lg text-muted-foreground">
              Book appointments, consult specialists, and track your health records in one secure, always-on workspace.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button className="h-11 px-6">Book Appointment</Button>
              <Button variant="outline" className="h-11 px-6">
                Start Consultation
              </Button>
            </div>
            <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-primary" />
                HIPAA-grade security
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-primary" />
                24/7 care coordination
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-primary" />
                1200+ specialists
              </div>
            </div>
          </div>

          <div className="grid gap-6 slide-up">
            <Card className="overflow-hidden border-0 shadow-xl">
              <div className="relative">
                <img
                  src={createIllustration("#38bdf8", "#0ea5e9")}
                  alt="Care dashboard"
                  className="h-44 w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-slate-900/0" />
              </div>
              <CardContent className="space-y-4 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Next consultation</p>
                    <p className="text-xl font-semibold">Cardiology Review</p>
                  </div>
                  <Badge className="bg-emerald-100 text-emerald-700">In 45 min</Badge>
                </div>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="rounded-xl border bg-muted/40 p-3">
                    <p className="text-xs text-muted-foreground">Doctor</p>
                    <p className="font-medium">Dr. Sarah Smith</p>
                  </div>
                  <div className="rounded-xl border bg-muted/40 p-3">
                    <p className="text-xs text-muted-foreground">Location</p>
                    <p className="font-medium">Teleconsultation</p>
                  </div>
                </div>
                <Button className="w-full">Join Video Session</Button>
              </CardContent>
            </Card>

            <Card className="border-0 bg-white/70 shadow-lg">
              <CardContent className="flex items-center justify-between gap-4 p-6">
                <div>
                  <p className="text-sm text-muted-foreground">Care coordination</p>
                  <p className="text-lg font-semibold">Your team is online</p>
                  <p className="text-sm text-muted-foreground">3 specialists active now</p>
                </div>
                <div className="flex -space-x-2">
                  {["AR", "DS", "JW"].map((initials) => (
                    <Avatar key={initials} className="h-10 w-10 border-2 border-white">
                      <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
                        {initials}
                      </AvatarFallback>
                    </Avatar>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="container space-y-10">
          <div className="text-center space-y-3">
            <p className="text-sm font-semibold text-primary uppercase tracking-[0.2em]">Core features</p>
            <h2 className="text-3xl font-semibold">Everything you need for modern healthcare delivery</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A unified platform that keeps patients, clinicians, and care teams aligned in real time.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featureCards.map((feature) => {
              const Icon = feature.icon;
              return (
                <Card
                  key={feature.title}
                  className="group overflow-hidden border-0 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="relative">
                    <img
                      src={feature.image}
                      alt={feature.title}
                      className="h-32 w-full object-cover"
                    />
                    <div className="absolute left-4 top-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/90 shadow-lg">
                      <Icon className={`h-6 w-6 ${feature.accent}`} />
                    </div>
                  </div>
                  <CardContent className="space-y-2 p-5">
                    <p className="text-lg font-semibold">{feature.title}</p>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section id="appointments" className="bg-slate-50 py-16">
        <div className="container space-y-10">
          <div className="flex flex-col gap-3 text-left md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold text-primary uppercase tracking-[0.2em]">Care summary</p>
              <h2 className="text-3xl font-semibold">Appointments and health overview</h2>
              <p className="text-muted-foreground">Stay on top of visits, results, and patient communications.</p>
            </div>
            <Button variant="outline" className="w-fit">View All Appointments</Button>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            <div className="grid gap-4 sm:grid-cols-2 lg:col-span-2">
              {statCards.map((stat) => {
                const Icon = stat.icon;
                return (
                  <Card key={stat.label} className="border-0 shadow-sm">
                    <CardContent className="flex items-center justify-between p-5">
                      <div>
                        <p className="text-sm text-muted-foreground">{stat.label}</p>
                        <p className="text-2xl font-semibold">{stat.value}</p>
                        <p className="text-xs text-muted-foreground">{stat.detail}</p>
                      </div>
                      <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${stat.tone}`}>
                        <Icon className="h-5 w-5" />
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle>Upcoming visits</CardTitle>
                <CardDescription>Next appointments scheduled</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                {[
                  { title: "Cardiology Review", time: "Today, 4:30 PM", type: "Video" },
                  { title: "Dermatology Check", time: "Fri, 10:00 AM", type: "In-person" },
                  { title: "Lab Follow-up", time: "Mon, 2:15 PM", type: "Video" }
                ].map((appointment) => (
                  <div
                    key={appointment.title}
                    className="flex items-center justify-between rounded-xl border bg-white p-3"
                  >
                    <div>
                      <p className="font-medium">{appointment.title}</p>
                      <p className="text-xs text-muted-foreground">{appointment.time}</p>
                    </div>
                    <Badge variant="secondary">{appointment.type}</Badge>
                  </div>
                ))}
                <Button className="w-full">Manage Schedule</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="records" className="bg-white py-16">
        <div className="container space-y-10">
          <div className="text-center space-y-3">
            <p className="text-sm font-semibold text-primary uppercase tracking-[0.2em]">Records & reports</p>
            <h2 className="text-3xl font-semibold">Always-on access to your medical history</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Every report, prescription, and vital trend is organized and instantly shareable.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Health Record Timeline</CardTitle>
                <CardDescription>Recent consultations and lab updates</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { title: "Comprehensive Blood Panel", time: "Oct 12, 2024", status: "Normal" },
                  { title: "Cardiology Follow-up", time: "Sep 29, 2024", status: "Reviewed" },
                  { title: "Teleconsultation Notes", time: "Sep 15, 2024", status: "Shared" }
                ].map((record) => (
                  <div key={record.title} className="flex items-center justify-between rounded-xl border p-4">
                    <div>
                      <p className="font-medium">{record.title}</p>
                      <p className="text-xs text-muted-foreground">{record.time}</p>
                    </div>
                    <Badge variant="outline">{record.status}</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Lab Insights</CardTitle>
                <CardDescription>Critical values and trend highlights</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="rounded-xl border bg-slate-50 p-4">
                  <div className="flex items-center justify-between">
                    <p className="font-medium">Cholesterol</p>
                    <Badge className="bg-amber-100 text-amber-700">Borderline</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">LDL trend stable, recommend diet review.</p>
                </div>
                <div className="rounded-xl border bg-slate-50 p-4">
                  <div className="flex items-center justify-between">
                    <p className="font-medium">Blood Pressure</p>
                    <Badge className="bg-emerald-100 text-emerald-700">Normal</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">Average 118/78 across the last 5 readings.</p>
                </div>
                <div className="rounded-xl border bg-slate-50 p-4">
                  <div className="flex items-center justify-between">
                    <p className="font-medium">Vitamin D</p>
                    <Badge className="bg-rose-100 text-rose-700">Low</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">Supplement plan sent to your inbox.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="chat" className="bg-slate-50 py-16">
        <div className="container space-y-10">
          <div className="text-center space-y-3">
            <p className="text-sm font-semibold text-primary uppercase tracking-[0.2em]">Live chat</p>
            <h2 className="text-3xl font-semibold">Secure messaging with your care team</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Keep conversations organized with patient history, quick actions, and encrypted messaging.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            <Card className="border-0 shadow-lg lg:col-span-1">
              <CardHeader>
                <CardTitle>Conversations</CardTitle>
                <CardDescription>Recent care team updates</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {chatList.map((chat) => (
                  <div
                    key={chat.name}
                    className="flex items-center gap-3 rounded-xl border bg-white p-3"
                  >
                    <div className="relative">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
                          {chat.name.split(" ").map((part) => part[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <span
                        className={`absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full border-2 border-white ${
                          chat.status === "online" ? "bg-emerald-500" : "bg-slate-300"
                        }`}
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{chat.name}</p>
                      <p className="text-xs text-muted-foreground">{chat.message}</p>
                    </div>
                    <span className="text-xs text-muted-foreground">{chat.time}</span>
                  </div>
                ))}
                <Button variant="outline" className="w-full">View all</Button>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg lg:col-span-2">
              <CardHeader className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                <div>
                  <CardTitle>Dr. Sarah Smith</CardTitle>
                  <CardDescription>Cardiology • Online now</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon">
                    <Phone className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Video className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3 rounded-2xl bg-slate-50 p-4">
                  {chatMessages.map((message) => (
                    <div
                      key={message.text}
                      className={`flex ${message.sender === "patient" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[70%] rounded-2xl px-4 py-2 text-sm shadow-sm ${
                          message.sender === "patient"
                            ? "bg-primary text-primary-foreground"
                            : "bg-white text-foreground"
                        }`}
                      >
                        <p>{message.text}</p>
                        <span className="mt-1 block text-[10px] opacity-70">{message.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input placeholder="Type a secure message" />
                  <Button>Send</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="profile" className="bg-white py-16">
        <div className="container grid gap-8 lg:grid-cols-2 lg:items-center">
          <div className="space-y-5">
            <p className="text-sm font-semibold text-primary uppercase tracking-[0.2em]">Trust & security</p>
            <h2 className="text-3xl font-semibold">Built for compliant, patient-first care</h2>
            <p className="text-muted-foreground">
              Our platform is designed with enterprise-grade security, privacy safeguards, and transparent medical data
              practices to protect every interaction.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                {
                  title: "HIPAA & SOC 2",
                  description: "Compliant infrastructure and audit-ready controls.",
                  icon: ShieldCheck
                },
                {
                  title: "Encrypted Data",
                  description: "End-to-end encryption for files, chats, and calls.",
                  icon: Lock
                },
                {
                  title: "Care Coordination",
                  description: "Assigned care managers and unified specialist teams.",
                  icon: Users
                },
                {
                  title: "Real-time Monitoring",
                  description: "Vitals tracking with alerts and smart thresholds.",
                  icon: Activity
                }
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <Card key={item.title} className="border-0 bg-slate-50 shadow-sm">
                    <CardContent className="space-y-2 p-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <Icon className="h-5 w-5" />
                      </div>
                      <p className="font-semibold">{item.title}</p>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          <div className="grid gap-6">
            <Card className="border-0 shadow-xl">
              <div className="relative">
                <img
                  src={createIllustration("#6366f1", "#a5b4fc")}
                  alt="Patient profile"
                  className="h-40 w-full rounded-t-2xl object-cover"
                />
                <div className="absolute bottom-4 left-4 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-indigo-700">
                  Profile Snapshot
                </div>
              </div>
              <CardContent className="space-y-4 p-6">
                <div className="flex items-center gap-4">
                  <Avatar className="h-14 w-14">
                    <AvatarFallback className="bg-primary/10 text-primary font-semibold">AR</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-lg font-semibold">Anya Rao</p>
                    <p className="text-sm text-muted-foreground">Premium Care Plan</p>
                  </div>
                  <Badge className="ml-auto bg-emerald-100 text-emerald-700">Active</Badge>
                </div>
                <div className="grid gap-3 md:grid-cols-2 text-sm">
                  <div className="rounded-xl border bg-slate-50 p-3">
                    <p className="text-xs text-muted-foreground">Primary Doctor</p>
                    <p className="font-medium">Dr. Sarah Smith</p>
                  </div>
                  <div className="rounded-xl border bg-slate-50 p-3">
                    <p className="text-xs text-muted-foreground">Next Review</p>
                    <p className="font-medium">Nov 8, 2024</p>
                  </div>
                  <div className="rounded-xl border bg-slate-50 p-3">
                    <p className="text-xs text-muted-foreground">Coverage</p>
                    <p className="font-medium">Gold Plus</p>
                  </div>
                  <div className="rounded-xl border bg-slate-50 p-3">
                    <p className="text-xs text-muted-foreground">Care Manager</p>
                    <p className="font-medium">Lena Patel</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Button className="flex-1">Update Profile</Button>
                  <Button variant="outline" className="flex-1">Download Records</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <footer className="bg-slate-900 text-slate-200">
        <div className="container grid gap-8 py-12 md:grid-cols-4">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10">
                <HeartPulse className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-base font-semibold">MediCare</p>
                <p className="text-xs text-slate-400">Hospital Platform</p>
              </div>
            </div>
            <p className="text-sm text-slate-400">
              Powering modern hospitals with secure teleconsultation, scheduling, and patient engagement tools.
            </p>
          </div>
          <div className="space-y-2 text-sm">
            <p className="font-semibold text-white">Platform</p>
            <p className="text-slate-400">Overview</p>
            <p className="text-slate-400">Appointments</p>
            <p className="text-slate-400">Teleconsultation</p>
            <p className="text-slate-400">Lab Reports</p>
          </div>
          <div className="space-y-2 text-sm">
            <p className="font-semibold text-white">Resources</p>
            <p className="text-slate-400">Security</p>
            <p className="text-slate-400">Compliance</p>
            <p className="text-slate-400">Support</p>
            <p className="text-slate-400">Developers</p>
          </div>
          <div className="space-y-3 text-sm">
            <p className="font-semibold text-white">Stay updated</p>
            <p className="text-slate-400">Monthly insights for care teams and patients.</p>
            <div className="flex gap-2">
              <Input
                placeholder="Email address"
                className="bg-white/10 text-white placeholder:text-slate-400"
              />
              <Button>Subscribe</Button>
            </div>
          </div>
        </div>
        <div className="border-t border-white/10 py-4 text-center text-xs text-slate-500">
          © 2026 MediCare. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
