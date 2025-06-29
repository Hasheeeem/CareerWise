export interface User {
  id: string;
  email: string;
  full_name: string;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

export interface UserProfile {
  id: string;
  user_id: string;
  full_name: string;
  email: string;
  phone?: string;
  location?: string;
  bio?: string;
  skills: string[];
  experience_level: 'entry' | 'mid' | 'senior' | 'executive';
  industry_interests: string[];
  career_goals: string[];
  education: Education[];
  work_experience: WorkExperience[];
  created_at: string;
  updated_at: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field_of_study: string;
  start_date: string;
  end_date?: string;
  gpa?: number;
  description?: string;
}

export interface WorkExperience {
  id: string;
  company: string;
  position: string;
  location?: string;
  start_date: string;
  end_date?: string;
  current: boolean;
  description: string;
  achievements: string[];
}

export interface Resume {
  id: string;
  user_id: string;
  title: string;
  template_id: string;
  content: ResumeContent;
  ats_score?: number;
  created_at: string;
  updated_at: string;
}

export interface ResumeContent {
  personal_info: PersonalInfo;
  summary: string;
  experience: WorkExperience[];
  education: Education[];
  skills: string[];
  certifications: Certification[];
  projects: Project[];
}

export interface PersonalInfo {
  full_name: string;
  email: string;
  phone: string;
  location: string;
  linkedin?: string;
  portfolio?: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  expiry_date?: string;
  credential_id?: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  url?: string;
  github?: string;
  start_date: string;
  end_date?: string;
}

export interface Assessment {
  id: string;
  user_id: string;
  type: 'personality' | 'skills' | 'interests' | 'values';
  title: string;
  questions: AssessmentQuestion[];
  results?: AssessmentResult;
  completed_at?: string;
  created_at: string;
}

export interface AssessmentQuestion {
  id: string;
  question: string;
  type: 'multiple_choice' | 'scale' | 'text';
  options?: string[];
  required: boolean;
}

export interface AssessmentResult {
  scores: Record<string, number>;
  recommendations: string[];
  career_matches: CareerMatch[];
}

export interface CareerMatch {
  title: string;
  match_percentage: number;
  description: string;
  required_skills: string[];
  salary_range: {
    min: number;
    max: number;
  };
  growth_outlook: string;
}

export interface InterviewSession {
  id: string;
  user_id: string;
  type: 'behavioral' | 'technical' | 'case_study';
  questions: InterviewQuestion[];
  responses: InterviewResponse[];
  feedback?: InterviewFeedback;
  duration: number;
  completed_at?: string;
  created_at: string;
}

export interface InterviewQuestion {
  id: string;
  question: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  tips?: string[];
}

export interface InterviewResponse {
  question_id: string;
  response: string;
  time_taken: number;
  confidence_level?: number;
}

export interface InterviewFeedback {
  overall_score: number;
  strengths: string[];
  areas_for_improvement: string[];
  specific_feedback: Record<string, string>;
}

export interface LearningPath {
  id: string;
  user_id: string;
  title: string;
  description: string;
  target_role: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimated_duration: string;
  modules: LearningModule[];
  progress: number;
  created_at: string;
}

export interface LearningModule {
  id: string;
  title: string;
  description: string;
  type: 'course' | 'article' | 'video' | 'practice';
  url?: string;
  duration: string;
  completed: boolean;
  order: number;
}

export interface JobRecommendation {
  id: string;
  title: string;
  company: string;
  location: string;
  salary_range?: {
    min: number;
    max: number;
  };
  match_score: number;
  required_skills: string[];
  description: string;
  url?: string;
  posted_date: string;
}