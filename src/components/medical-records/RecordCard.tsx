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
  Eye,
  Clock
} from 'lucide-react';
import { MedicalRecord } from '@/types/medical-record';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface RecordCardProps {
  record: MedicalRecord;
  className?: string;
  onView?: (id: string) => void;
  onDownload?: (id: string) => void;
}

export function RecordCard({ record, className, onView, onDownload }: RecordCardProps) {
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'consultation': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'follow-up': return 'bg-green-100 text-green-800 border-green-200';
      case 'emergency': return 'bg-red-100 text-red-800 border-red-200';
      case 'surgery': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'lab-result': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'discharge': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getDiagnosisSeverity = (diagnosis: any) => {
    if (diagnosis.code.startsWith('I') || diagnosis.code.startsWith('C')) {
      return 'destructive';
    }
    return 'default';
  };

  return (
    <Card className={cn(
      "hover:shadow-md transition-all duration-300 hover:-translate-y-0.5",
      className
    )}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
              <FileText className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-lg">{record.title}</CardTitle>
              <div className="flex items-center gap-2 mt-1">
                <Badge className={cn("text-xs", getTypeColor(record.type))}>
                  {record.type.replace('-', ' ').toUpperCase()}
                </Badge>
                <span className="text-xs text-muted-foreground">
                  {format(new Date(record.date), 'MMM d, yyyy')}
                </span>
              </div>
            </div>
          </div>
          <Badge variant="secondary" className="text-xs">
            Dr. {record.doctorName}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="space-y-3">
          {/* Description */}
          <p className="text-muted-foreground text-sm line-clamp-2">
            {record.description}
          </p>

          {/* Vital Signs Summary */}
          {record.vitalSigns && (
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="flex items-center gap-1">
                <Heart className="h-3 w-3 text-red-500" />
                <span className="text-muted-foreground">BP:</span>
                <span>{record.vitalSigns.bloodPressure}</span>
              </div>
              <div className="flex items-center gap-1">
                <Activity className="h-3 w-3 text-green-500" />
                <span className="text-muted-foreground">HR:</span>
                <span>{record.vitalSigns.heartRate}</span>
              </div>
            </div>
          )}

          {/* Diagnosis Summary */}
          {record.diagnosis && record.diagnosis.length > 0 && (
            <div>
              <p className="text-xs font-medium text-muted-foreground mb-1">Diagnosis:</p>
              <div className="flex flex-wrap gap-1">
                {record.diagnosis.slice(0, 2).map((diag, index) => (
                  <Badge 
                    key={index} 
                    variant={getDiagnosisSeverity(diag) as any}
                    className="text-xs"
                  >
                    {diag.code}
                  </Badge>
                ))}
                {record.diagnosis.length > 2 && (
                  <Badge variant="outline" className="text-xs">
                    +{record.diagnosis.length - 2} more
                  </Badge>
                )}
              </div>
            </div>
          )}

          {/* Treatment Summary */}
          {record.treatmentPlan && (
            <div>
              <p className="text-xs font-medium text-muted-foreground mb-1">Treatment:</p>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                <span>
                  {record.treatmentPlan.medications.length > 0 
                    ? `${record.treatmentPlan.medications.length} medications` 
                    : 'No medications'}
                </span>
                <span>•</span>
                <span>
                  {record.treatmentPlan.procedures.length > 0 
                    ? `${record.treatmentPlan.procedures.length} procedures` 
                    : 'No procedures'}
                </span>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-2 pt-2">
            {onView && (
              <Button 
                variant="outline" 
                size="sm" 
                className="flex-1 text-xs"
                onClick={() => onView(record.id)}
              >
                <Eye className="h-3 w-3 mr-1" />
                View Details
              </Button>
            )}
            {onDownload && (
              <Button 
                variant="outline" 
                size="sm" 
                className="text-xs"
                onClick={() => onDownload(record.id)}
              >
                <Download className="h-3 w-3 mr-1" />
                Download
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Loading skeleton for record card
export function RecordCardSkeleton() {
  return (
    <Card className="animate-pulse">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-muted"></div>
          <div className="flex-1 space-y-2">
            <div className="h-4 w-3/4 bg-muted rounded"></div>
            <div className="h-3 w-1/2 bg-muted rounded"></div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-3">
          <div className="h-3 w-full bg-muted rounded"></div>
          <div className="h-3 w-5/6 bg-muted rounded"></div>
          <div className="flex gap-2">
            <div className="h-8 w-20 bg-muted rounded"></div>
            <div className="h-8 w-20 bg-muted rounded"></div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}