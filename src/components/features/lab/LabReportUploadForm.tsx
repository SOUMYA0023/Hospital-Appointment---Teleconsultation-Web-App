'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { 
  FileText, 
  Upload, 
  X, 
  CheckCircle, 
  AlertCircle,
  Clock,
  FileSearch
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { isValidFileType, isValidFileSize } from '@/lib/security-utils';

interface LabResult {
  testName: string;
  value: string;
  unit: string;
  referenceRange: string;
  status: 'normal' | 'high' | 'low' | 'critical' | 'borderline';
}

interface LabReportUploadFormProps {
  onSubmit: (data: {
    patientId: string;
    patientName: string;
    testType: string;
    testDate: string;
    results: LabResult[];
    notes: string;
    file?: File;
  }) => void;
  onCancel: () => void;
  isSubmitting?: boolean;
  patients?: Array<{ id: string; name: string }>;
}

export default function LabReportUploadForm({
  onSubmit,
  onCancel,
  isSubmitting = false,
  patients = []
}: LabReportUploadFormProps) {
  const [step, setStep] = useState(1);
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    patientId: '',
    testType: '',
    testDate: '',
    notes: '',
    results: [] as LabResult[]
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [newResult, setNewResult] = useState<Omit<LabResult, 'status'>>({
    testName: '',
    value: '',
    unit: '',
    referenceRange: ''
  });

  const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
  const ALLOWED_FILE_TYPES = ['pdf', 'jpg', 'jpeg', 'png'];

  const validateStep1 = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.patientId) {
      newErrors.patientId = 'Patient selection is required';
    }
    
    if (!formData.testType.trim()) {
      newErrors.testType = 'Test type is required';
    }
    
    if (!formData.testDate) {
      newErrors.testDate = 'Test date is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors: Record<string, string> = {};
    
    if (formData.results.length === 0) {
      newErrors.results = 'At least one test result is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    let isValid = false;
    
    switch (step) {
      case 1:
        isValid = validateStep1();
        break;
      case 2:
        isValid = validateStep2();
        break;
      default:
        isValid = true;
    }
    
    if (isValid && step < 3) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const selectedPatient = patients.find(p => p.id === formData.patientId);
    onSubmit({
      ...formData,
      patientName: selectedPatient?.name || '',
      file: file || undefined
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    // Validate file type
    if (!isValidFileType(selectedFile.name, ALLOWED_FILE_TYPES)) {
      setErrors(prev => ({ ...prev, file: 'Invalid file type. Please upload PDF, JPG, JPEG, or PNG files only.' }));
      return;
    }

    // Validate file size
    if (!isValidFileSize(selectedFile.size, MAX_FILE_SIZE)) {
      setErrors(prev => ({ ...prev, file: 'File size exceeds 10MB limit.' }));
      return;
    }

    setFile(selectedFile);
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors.file;
      return newErrors;
    });

    // Create preview URL for images
    if (selectedFile.type.startsWith('image/')) {
      const url = URL.createObjectURL(selectedFile);
      setPreviewUrl(url);
    }
  };

  const removeFile = () => {
    setFile(null);
    setPreviewUrl(null);
    if (errors.file) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.file;
        return newErrors;
      });
    }
  };

  const addResult = () => {
    if (!newResult.testName.trim() || !newResult.value.trim()) {
      setErrors(prev => ({ ...prev, resultFields: 'Test name and value are required' }));
      return;
    }

    const status = determineResultStatus(newResult.value, newResult.referenceRange);
    
    setFormData(prev => ({
      ...prev,
      results: [...prev.results, { ...newResult, status }]
    }));
    
    setNewResult({
      testName: '',
      value: '',
      unit: '',
      referenceRange: ''
    });
    
    if (errors.resultFields) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.resultFields;
        return newErrors;
      });
    }
  };

  const removeResult = (index: number) => {
    setFormData(prev => ({
      ...prev,
      results: prev.results.filter((_, i) => i !== index)
    }));
  };

  const determineResultStatus = (value: string, referenceRange: string): LabResult['status'] => {
    // Simple logic to determine status based on reference range
    // In a real application, this would be more sophisticated
    const numValue = parseFloat(value);
    if (isNaN(numValue)) return 'normal';
    
    // Parse reference range (e.g., "70-100" or "<140")
    if (referenceRange.includes('-')) {
      const [min, max] = referenceRange.split('-').map(Number);
      if (numValue < min) return 'low';
      if (numValue > max) return 'high';
      return 'normal';
    } else if (referenceRange.startsWith('<')) {
      const max = parseFloat(referenceRange.substring(1));
      return numValue <= max ? 'normal' : 'high';
    } else if (referenceRange.startsWith('>')) {
      const min = parseFloat(referenceRange.substring(1));
      return numValue >= min ? 'normal' : 'low';
    }
    
    return 'normal';
  };

  const getProgressPercentage = () => {
    return (step / 3) * 100;
  };

  const commonTests = [
    'Complete Blood Count (CBC)',
    'Basic Metabolic Panel (BMP)',
    'Comprehensive Metabolic Panel (CMP)',
    'Lipid Panel',
    'Thyroid Function Test',
    'Liver Function Test',
    'Kidney Function Test',
    'Urinalysis',
    'Blood Glucose',
    'HbA1c'
  ];

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6">
        <div className="flex justify-between text-sm text-muted-foreground mb-2">
          <span>Step {step} of 3</span>
          <span>{Math.round(getProgressPercentage())}% Complete</span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div 
            className="bg-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${getProgressPercentage()}%` }}
          ></div>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        {step === 1 && (
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>
                Select patient and provide test details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="patientId">Select Patient *</Label>
                <Select
                  value={formData.patientId}
                  onValueChange={(value) => {
                    setFormData(prev => ({ ...prev, patientId: value }));
                    if (errors.patientId) {
                      setErrors(prev => {
                        const newErrors = { ...prev };
                        delete newErrors.patientId;
                        return newErrors;
                      });
                    }
                  }}
                >
                  <SelectTrigger className={errors.patientId ? 'border-destructive' : ''}>
                    <SelectValue placeholder="Select a patient" />
                  </SelectTrigger>
                  <SelectContent>
                    {patients.map(patient => (
                      <SelectItem key={patient.id} value={patient.id}>
                        {patient.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.patientId && <p className="text-destructive text-sm mt-1">{errors.patientId}</p>}
              </div>
              
              <div>
                <Label htmlFor="testType">Test Type *</Label>
                <Select
                  value={formData.testType}
                  onValueChange={(value) => {
                    setFormData(prev => ({ ...prev, testType: value }));
                    if (errors.testType) {
                      setErrors(prev => {
                        const newErrors = { ...prev };
                        delete newErrors.testType;
                        return newErrors;
                      });
                    }
                  }}
                >
                  <SelectTrigger className={errors.testType ? 'border-destructive' : ''}>
                    <SelectValue placeholder="Select or type test type" />
                  </SelectTrigger>
                  <SelectContent>
                    {commonTests.map(test => (
                      <SelectItem key={test} value={test}>{test}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.testType && <p className="text-destructive text-sm mt-1">{errors.testType}</p>}
              </div>
              
              <div>
                <Label htmlFor="testDate">Test Date *</Label>
                <Input
                  id="testDate"
                  type="date"
                  value={formData.testDate}
                  onChange={(e) => {
                    setFormData(prev => ({ ...prev, testDate: e.target.value }));
                    if (errors.testDate) {
                      setErrors(prev => {
                        const newErrors = { ...prev };
                        delete newErrors.testDate;
                        return newErrors;
                      });
                    }
                  }}
                  className={errors.testDate ? 'border-destructive' : ''}
                />
                {errors.testDate && <p className="text-destructive text-sm mt-1">{errors.testDate}</p>}
              </div>
            </CardContent>
          </Card>
        )}

        {step === 2 && (
          <Card>
            <CardHeader>
              <CardTitle>Test Results</CardTitle>
              <CardDescription>
                Add individual test results and their values
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-medium">Add New Result</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="testName">Test Name *</Label>
                    <Input
                      id="testName"
                      value={newResult.testName}
                      onChange={(e) => setNewResult(prev => ({ ...prev, testName: e.target.value }))}
                      placeholder="e.g., Hemoglobin"
                    />
                  </div>
                  <div>
                    <Label htmlFor="value">Value *</Label>
                    <Input
                      id="value"
                      value={newResult.value}
                      onChange={(e) => setNewResult(prev => ({ ...prev, value: e.target.value }))}
                      placeholder="e.g., 14.2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="unit">Unit</Label>
                    <Input
                      id="unit"
                      value={newResult.unit}
                      onChange={(e) => setNewResult(prev => ({ ...prev, unit: e.target.value }))}
                      placeholder="e.g., g/dL"
                    />
                  </div>
                  <div>
                    <Label htmlFor="referenceRange">Reference Range</Label>
                    <Input
                      id="referenceRange"
                      value={newResult.referenceRange}
                      onChange={(e) => setNewResult(prev => ({ ...prev, referenceRange: e.target.value }))}
                      placeholder="e.g., 12.0-16.0"
                    />
                  </div>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  onClick={addResult}
                  className="w-full md:w-auto"
                >
                  Add Result
                </Button>
                {errors.resultFields && <p className="text-destructive text-sm">{errors.resultFields}</p>}
              </div>

              {formData.results.length > 0 && (
                <div className="space-y-3">
                  <h3 className="font-medium">Added Results</h3>
                  {formData.results.map((result, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{result.testName}</span>
                          <Badge 
                            variant={result.status === 'normal' ? 'default' : 'destructive'}
                            className={cn(
                              result.status === 'high' && 'bg-red-100 text-red-800',
                              result.status === 'low' && 'bg-blue-100 text-blue-800',
                              result.status === 'critical' && 'bg-destructive text-destructive-foreground'
                            )}
                          >
                            {result.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {result.value} {result.unit} (Range: {result.referenceRange})
                        </p>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeResult(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {step === 3 && (
          <Card>
            <CardHeader>
              <CardTitle>Additional Information</CardTitle>
              <CardDescription>
                Add notes and upload supporting documents
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                  placeholder="Add any additional notes or observations..."
                  rows={4}
                />
              </div>

              <div>
                <Label>Upload Report File (Optional)</Label>
                <div className="mt-2">
                  <Input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={handleFileChange}
                    className="hidden"
                    id="file-upload"
                  />
                  <label
                    htmlFor="file-upload"
                    className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-muted/50 transition-colors"
                  >
                    <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">
                      {file ? file.name : 'Click to upload or drag and drop'}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      PDF, JPG, PNG up to 10MB
                    </p>
                  </label>
                </div>
                
                {previewUrl && (
                  <div className="mt-4 relative">
                    <img 
                      src={previewUrl} 
                      alt="Preview" 
                      className="max-h-48 rounded-lg border"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2"
                      onClick={removeFile}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                )}
                
                {errors.file && <p className="text-destructive text-sm mt-2">{errors.file}</p>}
              </div>
            </CardContent>
          </Card>
        )}

        <div className="flex justify-between mt-6">
          <Button
            type="button"
            variant="outline"
            onClick={step === 1 ? onCancel : handleBack}
            disabled={isSubmitting}
          >
            {step === 1 ? 'Cancel' : 'Back'}
          </Button>
          <div className="space-x-2">
            {step < 3 && (
              <Button
                type="button"
                variant="outline"
                onClick={handleNext}
              >
                Next
              </Button>
            )}
            {step === 3 && (
              <Button
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Clock className="h-4 w-4 mr-2 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <FileText className="h-4 w-4 mr-2" />
                    Upload Report
                  </>
                )}
              </Button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}