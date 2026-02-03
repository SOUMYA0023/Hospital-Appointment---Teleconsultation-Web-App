/**
 * Security utilities for the hospital web application
 * Contains functions for input sanitization, validation, and other security-related operations
 */

// Sanitize user input to prevent XSS attacks
export function sanitizeInput(input: string): string {
  if (typeof input !== 'string') {
    return '';
  }
  
  // Remove potentially dangerous characters/entities
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

// Validate email format
export function isValidEmail(email: string): boolean {
  if (typeof email !== 'string') {
    return false;
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Validate phone number format (basic validation)
export function isValidPhone(phone: string): boolean {
  if (typeof phone !== 'string') {
    return false;
  }
  
  // Remove all non-digits
  const cleanedPhone = phone.replace(/\D/g, '');
  
  // Check if it's a valid US phone number (10 digits) or international
  return cleanedPhone.length >= 10 && cleanedPhone.length <= 15;
}

// Validate date format
export function isValidDate(dateString: string): boolean {
  if (typeof dateString !== 'string') {
    return false;
  }
  
  const date = new Date(dateString);
  return date instanceof Date && !isNaN(date.getTime());
}

// Validate patient ID format (could be numeric or alphanumeric)
export function isValidPatientId(id: string): boolean {
  if (typeof id !== 'string') {
    return false;
  }
  
  // Patient ID should be alphanumeric and 6-12 characters long
  const patientIdRegex = /^[a-zA-Z0-9]{6,12}$/;
  return patientIdRegex.test(id);
}

// Validate doctor ID format
export function isValidDoctorId(id: string): boolean {
  if (typeof id !== 'string') {
    return false;
  }
  
  // Doctor ID should be alphanumeric and 6-12 characters long
  const doctorIdRegex = /^[a-zA-Z0-9]{6,12}$/;
  return doctorIdRegex.test(id);
}

// Validate appointment ID format
export function isValidAppointmentId(id: string): boolean {
  if (typeof id !== 'string') {
    return false;
  }
  
  // Appointment ID should be alphanumeric with 'apt-' prefix
  const appointmentIdRegex = /^apt-[a-zA-Z0-9]{1,10}$/;
  return appointmentIdRegex.test(id);
}

// Sanitize HTML content (basic implementation)
export function sanitizeHtml(html: string): string {
  if (typeof html !== 'string') {
    return '';
  }
  
  // Remove script tags and event handlers
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
    .replace(/on\w+="[^"]*"/gi, '')
    .replace(/javascript:/gi, '');
}

// Validate file type for uploads
export function isValidFileType(fileName: string, allowedTypes: string[]): boolean {
  if (typeof fileName !== 'string' || !Array.isArray(allowedTypes)) {
    return false;
  }
  
  const fileExtension = fileName.toLowerCase().split('.').pop();
  if (!fileExtension) {
    return false;
  }
  
  return allowedTypes.some(type => 
    type.toLowerCase() === fileExtension || 
    type.toLowerCase() === `.${fileExtension}`
  );
}

// Validate file size (in bytes)
export function isValidFileSize(fileSize: number, maxSize: number): boolean {
  if (typeof fileSize !== 'number' || typeof maxSize !== 'number') {
    return false;
  }
  
  return fileSize > 0 && fileSize <= maxSize;
}

// Generate a secure token (for temporary access, password reset, etc.)
export function generateSecureToken(length: number = 32): string {
  if (typeof length !== 'number' || length < 8 || length > 128) {
    throw new Error('Invalid token length. Must be between 8 and 128 characters.');
  }
  
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  const crypto = typeof window !== 'undefined' ? window.crypto : require('crypto');
  
  // Use crypto for better randomness
  const array = new Uint8Array(length);
  crypto.getRandomValues(array);
  
  for (let i = 0; i < length; i++) {
    result += chars[array[i] % chars.length];
  }
  
  return result;
}

// Hash sensitive data (client-side only, not for passwords)
export function hashSensitiveData(data: string): string {
  if (typeof data !== 'string') {
    return '';
  }
  
  // Simple hash function for non-sensitive data obfuscation
  // Note: This is not cryptographically secure and should not be used for passwords
  let hash = 0;
  for (let i = 0; i < data.length; i++) {
    const char = data.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0; // Convert to 32bit integer
  }
  
  return Math.abs(hash).toString(16);
}

// Validate role to ensure it's one of the allowed roles
export function isValidRole(role: string): boolean {
  const allowedRoles = ['patient', 'doctor', 'receptionist', 'lab_technician'];
  return allowedRoles.includes(role);
}