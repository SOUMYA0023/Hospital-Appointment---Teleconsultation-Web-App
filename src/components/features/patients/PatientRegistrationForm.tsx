'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { 
  User, 
  Mail, 
  Phone, 
  Calendar, 
  Heart, 
  Droplets, 
  MapPin,
  Shield,
  FileText,
  AlertTriangle,
  BadgeCheck
} from 'lucide-react';
import { patientService } from '@/lib/patient-service';
import { Patient } from '@/types/appointment';

interface PatientRegistrationFormProps {
  onSuccess?: (patient: Patient) => void;
}

export function PatientRegistrationForm({ onSuccess }: PatientRegistrationFormProps) {
  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    gender: '',
    bloodType: '',
    address: '',
    emergencyContactName: '',
    emergencyContactPhone: '',
    emergencyContactRelationship: '',
    allergies: '',
    medicalHistory: '',
    insuranceProvider: '',
    policyNumber: '',
    consentGiven: false
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when field is updated
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const validateStep = (currentStep: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (currentStep === 1) {
      if (!formData.name.trim()) newErrors.name = 'Name is required';
      if (!formData.email.trim()) newErrors.email = 'Email is required';
      else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
      if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
      if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
      if (!formData.gender) newErrors.gender = 'Gender is required';
    } else if (currentStep === 2) {
      if (!formData.address.trim()) newErrors.address = 'Address is required';
      if (!formData.emergencyContactName.trim()) newErrors.emergencyContactName = 'Emergency contact name is required';
      if (!formData.emergencyContactPhone.trim()) newErrors.emergencyContactPhone = 'Emergency contact phone is required';
      if (!formData.emergencyContactRelationship.trim()) newErrors.emergencyContactRelationship = 'Relationship is required';
    } else if (currentStep === 3) {
      if (!formData.consentGiven) newErrors.consentGiven = 'You must give consent to register';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateStep(3)) return;

    setLoading(true);
    try {
      const patientData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        dateOfBirth: new Date(formData.dateOfBirth),
        gender: formData.gender as 'male' | 'female' | 'other',
        bloodType: formData.bloodType,
        medicalHistory: formData.medicalHistory ? formData.medicalHistory.split(',').map(item => item.trim()) : []
      };

      const newPatient = await patientService.registerPatient(patientData);
      
      if (onSuccess) {
        onSuccess(newPatient);
      }
    } catch (error) {
      console.error('Registration error:', error);
    } finally {
      setLoading(false);
    }
  };

  const nextStep = () => {
    if (validateStep(step)) {
      setStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    setStep(prev => prev - 1);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <div className={`h-8 w-8 rounded-full flex items-center justify-center ${step === 1 ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
          1
        </div>
        <div className={`h-1 flex-1 ${step > 1 ? 'bg-primary' : 'bg-muted'}`}></div>
        <div className={`h-8 w-8 rounded-full flex items-center justify-center ${step === 2 ? 'bg-primary text-primary-foreground' : step > 2 ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
          2
        </div>
        <div className={`h-1 flex-1 ${step > 2 ? 'bg-primary' : 'bg-muted'}`}></div>
        <div className={`h-8 w-8 rounded-full flex items-center justify-center ${step === 3 ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
          3
        </div>
      </div>

      {step === 1 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Personal Information
            </CardTitle>
            <CardDescription>Provide your basic personal details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="name"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    className={`pl-10 ${errors.name ? 'border-red-500' : ''}`}
                  />
                </div>
                {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="john.doe@example.com"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    className={`pl-10 ${errors.email ? 'border-red-500' : ''}`}
                  />
                </div>
                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="phone"
                    placeholder="+1 (555) 000-0000"
                    value={formData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    className={`pl-10 ${errors.phone ? 'border-red-500' : ''}`}
                  />
                </div>
                {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="dateOfBirth"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => handleChange('dateOfBirth', e.target.value)}
                    className={`pl-10 ${errors.dateOfBirth ? 'border-red-500' : ''}`}
                  />
                </div>
                {errors.dateOfBirth && <p className="text-red-500 text-sm">{errors.dateOfBirth}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Gender *</Label>
                <RadioGroup value={formData.gender} onValueChange={(value) => handleChange('gender', value)} className="flex gap-4 mt-2">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="male" id="male" />
                    <Label htmlFor="male">Male</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="female" id="female" />
                    <Label htmlFor="female">Female</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="other" id="other" />
                    <Label htmlFor="other">Other</Label>
                  </div>
                </RadioGroup>
                {errors.gender && <p className="text-red-500 text-sm">{errors.gender}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="bloodType">Blood Type</Label>
                <div className="relative">
                  <Droplets className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Select value={formData.bloodType} onValueChange={(value) => handleChange('bloodType', value)}>
                    <SelectTrigger id="bloodType" className="pl-10">
                      <SelectValue placeholder="Select Blood Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="A+">A+</SelectItem>
                      <SelectItem value="A-">A-</SelectItem>
                      <SelectItem value="B+">B+</SelectItem>
                      <SelectItem value="B-">B-</SelectItem>
                      <SelectItem value="AB+">AB+</SelectItem>
                      <SelectItem value="AB-">AB-</SelectItem>
                      <SelectItem value="O+">O+</SelectItem>
                      <SelectItem value="O-">O-</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Address *</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="address"
                  placeholder="123 Main Street, City, State, ZIP"
                  value={formData.address}
                  onChange={(e) => handleChange('address', e.target.value)}
                  className={`pl-10 ${errors.address ? 'border-red-500' : ''}`}
                />
              </div>
              {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
            </div>
          </CardContent>
        </Card>
      )}

      {step === 2 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Emergency Contact & Medical Info
            </CardTitle>
            <CardDescription>Provide emergency contact and medical history details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="emergencyContactName">Emergency Contact Name *</Label>
                <Input
                  id="emergencyContactName"
                  placeholder="Jane Doe"
                  value={formData.emergencyContactName}
                  onChange={(e) => handleChange('emergencyContactName', e.target.value)}
                  className={errors.emergencyContactName ? 'border-red-500' : ''}
                />
                {errors.emergencyContactName && <p className="text-red-500 text-sm">{errors.emergencyContactName}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="emergencyContactRelationship">Relationship *</Label>
                <Select 
                  value={formData.emergencyContactRelationship} 
                  onValueChange={(value) => handleChange('emergencyContactRelationship', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Relationship" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="spouse">Spouse</SelectItem>
                    <SelectItem value="parent">Parent</SelectItem>
                    <SelectItem value="child">Child</SelectItem>
                    <SelectItem value="sibling">Sibling</SelectItem>
                    <SelectItem value="friend">Friend</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                {errors.emergencyContactRelationship && <p className="text-red-500 text-sm">{errors.emergencyContactRelationship}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="emergencyContactPhone">Contact Phone *</Label>
                <Input
                  id="emergencyContactPhone"
                  placeholder="+1 (555) 000-0000"
                  value={formData.emergencyContactPhone}
                  onChange={(e) => handleChange('emergencyContactPhone', e.target.value)}
                  className={errors.emergencyContactPhone ? 'border-red-500' : ''}
                />
                {errors.emergencyContactPhone && <p className="text-red-500 text-sm">{errors.emergencyContactPhone}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="allergies">Known Allergies</Label>
              <Textarea
                id="allergies"
                placeholder="List any known allergies (e.g., Penicillin, Peanuts, Latex)"
                value={formData.allergies}
                onChange={(e) => handleChange('allergies', e.target.value)}
                rows={2}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="medicalHistory">Medical History</Label>
              <Textarea
                id="medicalHistory"
                placeholder="List any significant medical conditions, surgeries, or chronic illnesses"
                value={formData.medicalHistory}
                onChange={(e) => handleChange('medicalHistory', e.target.value)}
                rows={3}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="insuranceProvider">Insurance Provider</Label>
                <Input
                  id="insuranceProvider"
                  placeholder="e.g., Blue Cross Blue Shield"
                  value={formData.insuranceProvider}
                  onChange={(e) => handleChange('insuranceProvider', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="policyNumber">Policy Number</Label>
                <Input
                  id="policyNumber"
                  placeholder="Policy number"
                  value={formData.policyNumber}
                  onChange={(e) => handleChange('policyNumber', e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {step === 3 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BadgeCheck className="h-5 w-5" />
              Review & Consent
            </CardTitle>
            <CardDescription>Review your information and provide consent</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-muted/30 p-4 rounded-lg">
              <h4 className="font-medium mb-2">Information Summary</h4>
              <div className="text-sm space-y-1">
                <p><span className="font-medium">Name:</span> {formData.name}</p>
                <p><span className="font-medium">Email:</span> {formData.email}</p>
                <p><span className="font-medium">DOB:</span> {formData.dateOfBirth}</p>
                <p><span className="font-medium">Gender:</span> {formData.gender}</p>
                <p><span className="font-medium">Blood Type:</span> {formData.bloodType || 'Not specified'}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-2">
                <Checkbox 
                  id="consent"
                  checked={formData.consentGiven}
                  onCheckedChange={(checked) => handleChange('consentGiven', Boolean(checked))}
                />
                <div>
                  <Label htmlFor="consent" className="text-sm font-medium">
                    I consent to the collection and use of my personal and medical information as described in the Privacy Policy
                  </Label>
                  <p className="text-xs text-muted-foreground mt-1">
                    Your information will be kept confidential and used only for medical purposes
                  </p>
                </div>
              </div>
              {errors.consentGiven && <p className="text-red-500 text-sm">{errors.consentGiven}</p>}
            </div>

            <div className="flex items-center gap-2 p-3 bg-amber-50 border border-amber-200 rounded-lg">
              <AlertTriangle className="h-5 w-5 text-amber-600 flex-shrink-0" />
              <p className="text-sm text-amber-700">
                By registering, you confirm that all information provided is accurate and complete. 
                Providing false information may affect your care.
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="flex justify-between">
        {step > 1 && (
          <Button variant="outline" onClick={prevStep} disabled={loading}>
            Back
          </Button>
        )}
        <div className="flex gap-2 ml-auto">
          {step < 3 ? (
            <Button onClick={nextStep} disabled={loading}>
              Continue
            </Button>
          ) : (
            <Button onClick={handleSubmit} disabled={loading}>
              {loading ? 'Registering...' : 'Complete Registration'}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}