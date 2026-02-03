'use client';

import React, { useState } from 'react';
import { StatCard } from '@/components/ui/StatCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  FlaskConical, 
  FileText, 
  Clock, 
  CheckCircle,
  TrendingUp,
  Upload,
  AlertCircle
} from 'lucide-react';

// Mock data
const mockTestRequests = [
  { id: 'test-001', patient: 'John Doe', test: 'Complete Blood Count', priority: 'routine', status: 'pending', requested: '2024-01-15' },
  { id: 'test-002', patient: 'Jane Smith', test: 'Lipid Panel', priority: 'urgent', status: 'in-progress', requested: '2024-01-15' },
  { id: 'test-003', patient: 'Robert Johnson', test: 'Thyroid Function', priority: 'routine', status: 'completed', requested: '2024-01-14' }
];

const mockPendingReviews = [
  { id: 'review-001', patient: 'Emily Davis', test: 'Blood Chemistry', completed: '2024-01-15', reviewer: 'Dr. Sarah Smith' },
  { id: 'review-002', patient: 'Michael Brown', test: 'Urinalysis', completed: '2024-01-15', reviewer: 'Dr. James Wilson' }
];

export default function LabDashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'requests' | 'reports'>('overview');

  const stats = [
    {
      title: "Pending Tests",
      value: "12",
      description: "8 routine, 4 urgent",
      icon: <FlaskConical className="h-5 w-5 text-blue-500" />,
      trend: { value: 3, isPositive: false, label: "from yesterday" }
    },
    {
      title: "Completed Today",
      value: "28",
      description: "+15% from average",
      icon: <CheckCircle className="h-5 w-5 text-green-500" />,
      trend: { value: 15, isPositive: true, label: "increase" }
    },
    {
      title: "Pending Review",
      value: "5",
      description: "Awaiting physician review",
      icon: <FileText className="h-5 w-5 text-amber-500" />,
      trend: { value: 2, isPositive: false, label: "pending" }
    },
    {
      title: "Equipment Status",
      value: "100%",
      description: "All systems operational",
      icon: <TrendingUp className="h-5 w-5 text-purple-500" />,
      trend: { value: 0, isPositive: true, label: "uptime" }
    }
  ];

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'pending': return 'secondary';
      case 'in-progress': return 'default';
      case 'completed': return 'default';
      default: return 'secondary';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800 border-red-200';
      case 'stat': return 'bg-red-100 text-red-800 border-red-200';
      case 'routine': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Laboratory Dashboard</h1>
        <p className="text-muted-foreground mt-1">Manage lab tests and reports</p>
      </div>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-3">
        <Button className="gap-2">
          <Upload className="h-4 w-4" />
          Upload Report
        </Button>
        <Button variant="outline" className="gap-2">
          <FlaskConical className="h-4 w-4" />
          New Test Request
        </Button>
        <Button variant="outline" className="gap-2">
          <FileText className="h-4 w-4" />
          Review Reports
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <StatCard
            key={index}
            title={stat.title}
            value={stat.value}
            description={stat.description}
            icon={stat.icon}
            trend={stat.trend}
          />
        ))}
      </div>

      {/* Tab Navigation */}
      <div className="border-b">
        <nav className="-mb-px flex space-x-8">
          {(['overview', 'requests', 'reports'] as const).map((tab) => (
            <button
              key={tab}
              className={`
                whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
                ${activeTab === tab
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground hover:border-muted'
                }
              `}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-4">Test Requests</h2>
                <div className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <FlaskConical className="h-5 w-5" />
                        Active Test Requests
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {mockTestRequests.map((request) => (
                          <div key={request.id} className="flex items-center justify-between p-3 border rounded-lg">
                            <div>
                              <p className="font-medium">{request.patient}</p>
                              <p className="text-sm text-muted-foreground">{request.test}</p>
                              <div className="flex items-center gap-2 mt-1">
                                <Badge variant={getStatusVariant(request.status) as any} className="text-xs">
                                  {request.status}
                                </Badge>
                                <Badge className={getPriorityColor(request.priority) + ' text-xs'}>
                                  {request.priority}
                                </Badge>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-sm text-muted-foreground">
                                Requested: {new Date(request.requested).toLocaleDateString()}
                              </p>
                              <Button size="sm" className="mt-2">
                                {request.status === 'pending' ? 'Start Test' : 'View Details'}
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertCircle className="h-5 w-5" />
                    Pending Reviews
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockPendingReviews.map((review) => (
                      <div key={review.id} className="p-3 border rounded-lg">
                        <p className="font-medium text-sm">{review.patient}</p>
                        <p className="text-xs text-muted-foreground">{review.test}</p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs text-muted-foreground">
                            Completed: {new Date(review.completed).toLocaleDateString()}
                          </span>
                          <Button size="sm" variant="outline">
                            Review
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button variant="outline" className="w-full justify-start gap-2">
                    <Upload className="h-4 w-4" /> Upload Report
                  </Button>
                  <Button variant="outline" className="w-full justify-start gap-2">
                    <FlaskConical className="h-4 w-4" /> New Test
                  </Button>
                  <Button variant="outline" className="w-full justify-start gap-2">
                    <FileText className="h-4 w-4" /> Quality Control
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
        
        {activeTab === 'requests' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Test Requests Management</h2>
              <Button variant="outline">Filter Requests</Button>
            </div>
            
            <Card>
              <CardContent className="py-12 text-center">
                <FlaskConical className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">Test Request Management</h3>
                <p className="text-muted-foreground mb-4">
                  Comprehensive test request management system coming soon.
                </p>
                <Button>View All Requests</Button>
              </CardContent>
            </Card>
          </div>
        )}
        
        {activeTab === 'reports' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Report Management</h2>
              <Button>Upload New Report</Button>
            </div>
            
            <Card>
              <CardContent className="py-12 text-center">
                <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">Lab Report Management</h3>
                <p className="text-muted-foreground mb-4">
                  Comprehensive lab report management system coming soon.
                </p>
                <Button>View All Reports</Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}