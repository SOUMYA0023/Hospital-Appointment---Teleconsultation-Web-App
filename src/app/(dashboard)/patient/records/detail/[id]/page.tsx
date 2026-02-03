"use client";

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, FileText, Download, Eye, HeartPulse, Stethoscope, Syringe } from "lucide-react";
import { MedicalRecordDetail } from "@/components/features/medical-records/MedicalRecordDetail";
import { medicalRecordService } from "@/lib/medical-record-service";
import { MedicalRecord } from "@/types/medical-record";

export default function MedicalRecordDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [record, setRecord] = useState<MedicalRecord | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecord = async () => {
      try {
        const data = await medicalRecordService.getMedicalRecordById(id);
        if (data) {
          setRecord(data);
        }
      } catch (error) {
        console.error('Error fetching medical record:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchRecord();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!record) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center">
        <FileText className="h-16 w-16 text-muted-foreground mb-4" />
        <h3 className="text-xl font-semibold mb-2">Record Not Found</h3>
        <p className="text-muted-foreground mb-4">The medical record you're looking for doesn't exist or has been removed.</p>
        <Button onClick={() => window.history.back()}>Go Back</Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-primary">Medical Record</h2>
          <p className="text-muted-foreground">Detailed information from your consultation</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export PDF
          </Button>
        </div>
      </div>

      <MedicalRecordDetail record={record} />
    </div>
  );
}