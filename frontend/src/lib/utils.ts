import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(new Date(date));
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
}

export function generateId(): string {
  return Math.random().toString(36).substr(2, 9);
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

export function calculateATSScore(resume: any): number {
  // Basic ATS scoring algorithm
  let score = 0;
  
  // Check for contact information (20 points)
  if (resume.personal_info?.email) score += 5;
  if (resume.personal_info?.phone) score += 5;
  if (resume.personal_info?.location) score += 5;
  if (resume.personal_info?.linkedin) score += 5;
  
  // Check for summary/objective (15 points)
  if (resume.summary && resume.summary.length > 50) score += 15;
  
  // Check for work experience (25 points)
  if (resume.experience && resume.experience.length > 0) {
    score += Math.min(resume.experience.length * 5, 25);
  }
  
  // Check for education (15 points)
  if (resume.education && resume.education.length > 0) {
    score += Math.min(resume.education.length * 7, 15);
  }
  
  // Check for skills (15 points)
  if (resume.skills && resume.skills.length > 0) {
    score += Math.min(resume.skills.length * 2, 15);
  }
  
  // Check for projects/certifications (10 points)
  if (resume.projects && resume.projects.length > 0) score += 5;
  if (resume.certifications && resume.certifications.length > 0) score += 5;
  
  return Math.min(score, 100);
}