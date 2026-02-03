"use client";

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, Download, Eye, FlaskConical, AlertTriangle, CheckCircle, MinusCircle } from "lucide-react";
import { LabReportDetail } from "@/components/features/lab-reports/LabReportDetail";
import { labReportService } from "@/lib/lab-report-service";
import { LabReport } from "@/types/lab-report";

export default function LabReportDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [report, setReport] = useState<LabReport | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const data = await labReportService.getLabReportById(id);
        if (data) {
          setReport(data);
        }
      } catch (error) {
        console.error('Error fetching lab report:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchReport();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!report) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center">
        <FileText className="h-16 w-16 text-muted-foreground mb-4" />
        <h3 className="text-xl font-semibold mb-2">Lab Report Not Found</h3>
        <p className="text-muted-foreground mb-4">The lab report you're looking for doesn't exist or has been removed.</p>
        <Button onClick={() => window.history.back()}>Go Back</Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-primary">Lab Report</h2>
          <p className="text-muted-foreground">Detailed results from your recent tests</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export PDF
          </Button>
        </div>
      </div>

      <LabReportDetail report={report} />
    </div>
  );
}