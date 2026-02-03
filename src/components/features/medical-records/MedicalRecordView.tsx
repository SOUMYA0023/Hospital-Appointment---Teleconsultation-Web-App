'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  FileText, 
  Calendar, 
  User, 
  Heart, 
  Activity,
  Download,
  Printer,
  AlertTriangle
} from 'lucide-react';
import { MedicalRecord } from '@/types/medical-record';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface MedicalRecordViewProps {
  record: MedicalRecord;
  onDownload?: () => void;
  onPrint?: () => void;
  className?: string;
}

export default function MedicalRecordView({
  record,
  onDownload,
  onPrint,
  className
}: MedicalRecordViewProps) {
  const getVitalStatusColor = (value: string, normalRange?: string) => {
    // Simple logic for vital sign status - would be more sophisticated in real app
    if (!normalRange) return 'default';
    if (value.includes('high') || value.includes('low')) return 'destructive';
    return 'default';
  };

  const getDiagnosisSeverity = (diagnosis: any) => {
    if (diagnosis.code.startsWith('I') || diagnosis.code.startsWith('C')) {
      return 'destructive'; // Critical conditions
    }
    return 'default';
  };

  return (
    <div className={cn("space-y-6", className)}>
      {/* Header Section */}
      <Card>
        <CardHeader className="border-b">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-xl">{record.title}</CardTitle>
                  <p className="text-sm text-muted-foreground capitalize">{record.type.replace('-', ' ')}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>{format(new Date(record.date), 'PPP')}</span>
                </div>
                <div className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  <span>Dr. {record.doctorName}</span>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              {onDownload && (
                <Button variant="outline" size="sm" onClick={onDownload}>
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              )}
              {onPrint && (
                <Button variant="outline" size="sm" onClick={onPrint}>
                  <Printer className="h-4 w-4 mr-2" />
                  Print
                </Button>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <p className="text-muted-foreground">{record.description}</p>
        </CardContent>
      </Card>

      {/* Vital Signs */}
      {record.vitalSigns && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-red-500" />
              Vital Signs
            </CardTitle>
            <CardDescription>Current health measurements</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              <div className="space-y-1">
                <p className="text-sm font-medium">Blood Pressure</p>
                <Badge variant={getVitalStatusColor(record.vitalSigns.bloodPressure)}>
                  {record.vitalSigns.bloodPressure}
                </Badge>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium">Heart Rate</p>
                <Badge variant={getVitalStatusColor(record.vitalSigns.heartRate)}>
                  {record.vitalSigns.heartRate}
                </Badge>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium">Temperature</p>
                <Badge variant={getVitalStatusColor(record.vitalSigns.temperature)}>
                  {record.vitalSigns.temperature}
                </Badge>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium">Respiratory Rate</p>
                <Badge variant={getVitalStatusColor(record.vitalSigns.respiratoryRate)}>
                  {record.vitalSigns.respiratoryRate}
                </Badge>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium">Oxygen Saturation</p>
                <Badge variant={getVitalStatusColor(record.vitalSigns.oxygenSaturation)}>
                  {record.vitalSigns.oxygenSaturation}
                </Badge>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium">Height</p>
                <Badge variant="outline">
                  {record.vitalSigns.height}
                </Badge>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium">Weight</p>
                <Badge variant="outline">
                  {record.vitalSigns.weight}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Diagnosis */}
      {record.diagnosis && record.diagnosis.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Diagnosis</CardTitle>
            <CardDescription>Medical conditions identified</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {record.diagnosis.map((diag, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant={getDiagnosisSeverity(diag)}>
                          {diag.code}
                        </Badge>
                        <h3 className="font-medium">{diag.name}</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">{diag.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Treatment Plan */}
      {record.treatmentPlan && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-green-500" />
              Treatment Plan
            </CardTitle>
            <CardDescription>Recommended course of treatment</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Medications */}
              {record.treatmentPlan.medications && record.treatmentPlan.medications.length > 0 && (
                <div>
                  <h4 className="font-medium mb-3">Medications</h4>
                  <div className="space-y-2">
                    {record.treatmentPlan.medications.map((med, index) => (
                      <div key={index} className="p-3 bg-muted/50 rounded-lg">
                        <div className="font-medium">{med.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {med.dosage} • {med.frequency} • {med.duration}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Procedures */}
              {record.treatmentPlan.procedures && record.treatmentPlan.procedures.length > 0 && (
                <div>
                  <h4 className="font-medium mb-3">Procedures</h4>
                  <div className="space-y-2">
                    {record.treatmentPlan.procedures.map((proc, index) => (
                      <div key={index} className="p-3 bg-muted/50 rounded-lg">
                        <div className="font-medium">{proc.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {format(new Date(proc.date), 'PPP')}
                        </div>
                        {proc.notes && (
                          <p className="text-sm mt-1">{proc.notes}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Follow-up */}
              {record.treatmentPlan.followUp && (
                <div>
                  <h4 className="font-medium mb-2">Follow-up</h4>
                  <p className="text-muted-foreground">{record.treatmentPlan.followUp}</p>
                </div>
              )}

              {/* Recommendations */}
              {record.treatmentPlan.recommendations && record.treatmentPlan.recommendations.length > 0 && (
                <div>
                  <h4 className="font-medium mb-2">Recommendations</h4>
                  <ul className="space-y-1">
                    {record.treatmentPlan.recommendations.map((rec, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-green-500 mt-1">•</span>
                        <span className="text-muted-foreground">{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Notes */}
      {record.notes && (
        <Card>
          <CardHeader>
            <CardTitle>Additional Notes</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground whitespace-pre-wrap">{record.notes}</p>
          </CardContent>
        </Card>
      )}

      {/* Attachments */}
      {record.attachments && record.attachments.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Attachments</CardTitle>
            <CardDescription>Related documents and files</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {record.attachments.map((attachment, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{attachment}</span>
                  </div>
                  <Button variant="ghost" size="sm">
                    View
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}