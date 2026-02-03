import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar, 
  Clock, 
  Video, 
  Phone, 
  User, 
  MapPin,
  MoreVertical
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

interface AppointmentCardProps {
  id: string;
  patientName: string;
  doctorName: string;
  department: string;
  date: Date;
  startTime: string;
  endTime: string;
  type: 'in-person' | 'teleconsultation';
  status: 'scheduled' | 'confirmed' | 'completed' | 'cancelled' | 'no-show';
  notes?: string;
  className?: string;
  onReschedule?: (id: string) => void;
  onCancel?: (id: string) => void;
  onJoin?: (id: string) => void;
  onViewDetails?: (id: string) => void;
}

export function AppointmentCard({
  id,
  patientName,
  doctorName,
  department,
  date,
  startTime,
  endTime,
  type,
  status,
  notes,
  className,
  onReschedule,
  onCancel,
  onJoin,
  onViewDetails
}: AppointmentCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'confirmed': return 'bg-green-100 text-green-800 border-green-200';
      case 'completed': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'cancelled': return 'bg-red-100 text-red-800 border-red-200';
      case 'no-show': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTypeIcon = () => {
    return type === 'teleconsultation' ? (
      <Video className="h-4 w-4 text-blue-500" />
    ) : (
      <MapPin className="h-4 w-4 text-green-500" />
    );
  };

  const getTypeLabel = () => {
    return type === 'teleconsultation' ? 'Video Call' : 'In-Person';
  };

  const isUpcoming = new Date(date) > new Date() || 
    (new Date(date).toDateString() === new Date().toDateString() && 
     startTime > new Date().toLocaleTimeString('en-US', { hour12: false }));

  const isToday = new Date(date).toDateString() === new Date().toDateString();

  return (
    <Card className={cn(
      "hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 border-l-4",
      status === 'scheduled' && "border-l-blue-500",
      status === 'confirmed' && "border-l-green-500",
      status === 'completed' && "border-l-gray-500",
      status === 'cancelled' && "border-l-red-500",
      status === 'no-show' && "border-l-yellow-500",
      className
    )}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">{patientName}</h3>
              <p className="text-sm text-muted-foreground">with {doctorName}</p>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="secondary" className="text-xs">
                  {department}
                </Badge>
                {isToday && (
                  <Badge variant="default" className="bg-orange-100 text-orange-800 border-orange-200 text-xs">
                    Today
                  </Badge>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge className={cn("text-xs", getStatusColor(status))}>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </Badge>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="space-y-3">
          {/* Date and Time */}
          <div className="flex items-center gap-3 text-sm">
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>{format(date, 'MMM d, yyyy')}</span>
            </div>
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>{startTime} - {endTime}</span>
            </div>
          </div>

          {/* Type and Location */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              {getTypeIcon()}
              <span className="text-sm text-muted-foreground">{getTypeLabel()}</span>
            </div>
          </div>

          {/* Notes */}
          {notes && (
            <div className="pt-2 border-t">
              <p className="text-sm text-muted-foreground">{notes}</p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-2 pt-3">
            {status !== 'cancelled' && status !== 'completed' && status !== 'no-show' && (
              <>
                {onReschedule && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => onReschedule(id)}
                    className="text-xs"
                  >
                    Reschedule
                  </Button>
                )}
                {onCancel && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => onCancel(id)}
                    className="text-xs text-destructive hover:text-destructive"
                  >
                    Cancel
                  </Button>
                )}
                {isUpcoming && onJoin && (
                  <Button 
                    size="sm" 
                    onClick={() => onJoin(id)}
                    className="text-xs bg-primary hover:bg-primary/90"
                  >
                    {type === 'teleconsultation' ? 'Join Call' : 'Get Directions'}
                  </Button>
                )}
              </>
            )}
            {onViewDetails && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => onViewDetails(id)}
                className="text-xs"
              >
                View Details
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Loading skeleton for appointment card
export function AppointmentCardSkeleton() {
  return (
    <Card className="animate-pulse">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-full bg-muted"></div>
          <div className="flex-1 space-y-2">
            <div className="h-4 w-3/4 bg-muted rounded"></div>
            <div className="h-3 w-1/2 bg-muted rounded"></div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-3">
          <div className="flex gap-4">
            <div className="h-3 w-24 bg-muted rounded"></div>
            <div className="h-3 w-20 bg-muted rounded"></div>
          </div>
          <div className="h-3 w-32 bg-muted rounded"></div>
          <div className="flex gap-2 pt-3">
            <div className="h-8 w-20 bg-muted rounded"></div>
            <div className="h-8 w-20 bg-muted rounded"></div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}