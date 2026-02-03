import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BadgeDollarSign, FileText, FlaskConical, User, Calendar, Clock, Download, AlertTriangle, CheckCircle, MinusCircle } from 'lucide-react';
import { LabReport } from '@/types/lab-report';

interface LabReportDetailProps {
  report: LabReport;
}

export function LabReportDetail({ report }: LabReportDetailProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'normal':
        return 'text-green-600 bg-green-100 border-green-200';
      case 'high':
        return 'text-red-600 bg-red-100 border-red-200';
      case 'low':
        return 'text-blue-600 bg-blue-100 border-blue-200';
      case 'critical':
        return 'text-red-700 bg-red-200 border-red-300';
      case 'borderline':
        return 'text-amber-600 bg-amber-100 border-amber-200';
      default:
        return 'text-gray-600 bg-gray-100 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Report Header */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <CardTitle className="text-2xl">{report.testType}</CardTitle>
                <Badge variant="outline" className={getStatusColor(report.status)}>
                  {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                </Badge>
              </div>
              <CardDescription className="mt-1">
                Patient: {report.patientName} (Age: {report.patientAge}, {report.patientGender}) | 
                Ordered by: {report.doctorName} on {report.testDate.toLocaleDateString()}
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Download PDF
              </Button>
              <Button variant="outline" size="sm">
                Share Report
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-muted/30 p-4 rounded-lg">
              <p className="text-sm text-muted-foreground">Lab Technician</p>
              <p className="font-medium">{report.labTechnician}</p>
            </div>
            <div className="bg-muted/30 p-4 rounded-lg">
              <p className="text-sm text-muted-foreground">Reviewed By</p>
              <p className="font-medium">{report.reviewedBy}</p>
            </div>
            <div className="bg-muted/30 p-4 rounded-lg">
              <p className="text-sm text-muted-foreground">Reviewed On</p>
              <p className="font-medium">{report.reviewedDate.toLocaleDateString()}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Test Results */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FlaskConical className="h-5 w-5" />
            Test Results
          </CardTitle>
          <CardDescription>Detailed results for each test parameter</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50 text-left">
                  <th className="p-3 font-medium text-muted-foreground">Test Name</th>
                  <th className="p-3 font-medium text-muted-foreground">Result</th>
                  <th className="p-3 font-medium text-muted-foreground">Unit</th>
                  <th className="p-3 font-medium text-muted-foreground">Reference Range</th>
                  <th className="p-3 font-medium text-muted-foreground">Status</th>
                </tr>
              </thead>
              <tbody>
                {report.results.map((result, index) => (
                  <tr key={index} className="border-b last:border-0 hover:bg-muted/20">
                    <td className="p-3 font-medium">{result.testName}</td>
                    <td className="p-3">
                      <span className="font-semibold">{result.value}</span>
                    </td>
                    <td className="p-3 text-muted-foreground">{result.unit}</td>
                    <td className="p-3 text-muted-foreground">{result.referenceRange}</td>
                    <td className="p-3">
                      <Badge 
                        variant="outline" 
                        className={`${getStatusColor(result.status)} capitalize`}
                      >
                        {result.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Clinical Notes */}
      <Card>
        <CardHeader>
          <CardTitle>Clinical Notes</CardTitle>
          <CardDescription>Interpretation and recommendations by the reviewing physician</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-muted/30 p-4 rounded-lg">
            <p>{report.notes}</p>
          </div>
        </CardContent>
      </Card>

      {/* Action Items */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span>All values within normal range. Continue current treatment plan.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Follow up in 3 months or as advised by physician.</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-amber-500" />
              Important Notes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
                <span>Please bring this report to your next appointment.</span>
              </li>
              <li className="flex items-start gap-2">
                <MinusCircle className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
                <span>If you experience any unusual symptoms, contact your healthcare provider immediately.</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}