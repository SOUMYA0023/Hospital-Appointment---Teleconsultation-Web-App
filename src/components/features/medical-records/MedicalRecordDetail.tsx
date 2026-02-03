import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BadgeDollarSign, FileText, HeartPulse, Stethoscope, Syringe, Thermometer, User, Calendar, Clock, MapPin } from 'lucide-react';
import { MedicalRecord } from '@/types/medical-record';

interface MedicalRecordDetailProps {
  record: MedicalRecord;
}

export function MedicalRecordDetail({ record }: MedicalRecordDetailProps) {
  return (
    <div className="space-y-6">
      {/* Record Header */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <CardTitle className="text-2xl">{record.title}</CardTitle>
                <Badge variant="outline" className="capitalize">
                  {record.type.replace('-', ' ')}
                </Badge>
              </div>
              <CardDescription className="mt-1">
                Consultation with {record.doctorName} on {record.date.toLocaleDateString()}
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <FileText className="h-4 w-4 mr-2" />
                Download PDF
              </Button>
              <Button variant="outline" size="sm">
                <MapPin className="h-4 w-4 mr-2" />
                Print
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">{record.description}</p>
        </CardContent>
      </Card>

      {/* Vital Signs */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HeartPulse className="h-5 w-5" />
            Vital Signs
          </CardTitle>
          <CardDescription>Measurements taken during consultation</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-muted/30 p-4 rounded-lg">
              <p className="text-sm text-muted-foreground">Blood Pressure</p>
              <p className="font-medium">{record.vitalSigns.bloodPressure}</p>
            </div>
            <div className="bg-muted/30 p-4 rounded-lg">
              <p className="text-sm text-muted-foreground">Heart Rate</p>
              <p className="font-medium">{record.vitalSigns.heartRate}</p>
            </div>
            <div className="bg-muted/30 p-4 rounded-lg">
              <p className="text-sm text-muted-foreground">Temperature</p>
              <p className="font-medium">{record.vitalSigns.temperature}</p>
            </div>
            <div className="bg-muted/30 p-4 rounded-lg">
              <p className="text-sm text-muted-foreground">Oxygen Saturation</p>
              <p className="font-medium">{record.vitalSigns.oxygenSaturation}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Diagnosis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Stethoscope className="h-5 w-5" />
            Diagnosis
          </CardTitle>
          <CardDescription>Identified conditions and findings</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {record.diagnosis.map((diag, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium">{diag.name}</h4>
                    <p className="text-sm text-muted-foreground">{diag.code}</p>
                  </div>
                  <Badge variant="secondary">{diag.code}</Badge>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{diag.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Treatment Plan */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Syringe className="h-5 w-5" />
            Treatment Plan
          </CardTitle>
          <CardDescription>Recommended treatments and medications</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {record.treatmentPlan.medications.length > 0 && (
              <div>
                <h4 className="font-medium mb-3 flex items-center gap-2">
                  <BadgeDollarSign className="h-4 w-4" />
                  Medications
                </h4>
                <div className="space-y-3">
                  {record.treatmentPlan.medications.map((med, index) => (
                    <div key={index} className="flex justify-between items-center p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{med.name}</p>
                        <p className="text-sm text-muted-foreground">{med.dosage} • {med.frequency}</p>
                      </div>
                      <Badge variant="outline">{med.duration}</Badge>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {record.treatmentPlan.followUp && (
              <div>
                <h4 className="font-medium mb-3">Follow-up Instructions</h4>
                <div className="bg-muted/30 p-4 rounded-lg">
                  <p>{record.treatmentPlan.followUp}</p>
                </div>
              </div>
            )}

            {record.treatmentPlan.recommendations.length > 0 && (
              <div>
                <h4 className="font-medium mb-3">Recommendations</h4>
                <ul className="space-y-2">
                  {record.treatmentPlan.recommendations.map((rec, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Notes and Attachments */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {record.notes && (
          <Card>
            <CardHeader>
              <CardTitle>Notes</CardTitle>
              <CardDescription>Additional observations by the physician</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-muted/30 p-4 rounded-lg">
                <p>{record.notes}</p>
              </div>
            </CardContent>
          </Card>
        )}

        {record.attachments.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Attachments</CardTitle>
              <CardDescription>Related documents and reports</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {record.attachments.map((attachment, index) => (
                  <div key={index} className="flex items-center justify-between p-2 hover:bg-muted rounded">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{attachment}</span>
                    </div>
                    <Button variant="ghost" size="sm">View</Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}