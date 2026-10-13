export type ProjectStatus = 'BUILDING' | 'COMPLETED' | 'OPEN_SOURCE' | 'ARCHIVED';

export type SubmissionStatus = 'PENDING' | 'APPROVED' | 'DECLINED';

export type AdminRole = 'ADMIN' | 'SUPER_ADMIN';

export interface Admin {
  id: string;
  email: string;
  passwordHash: string;
  name: string;
  role: AdminRole;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  lastLoginAt?: string;
}

export type AdminSafe = Omit<Admin, 'passwordHash'>;

export type CollaborationRole =
  | 'Frontend Developer'
  | 'Backend Developer'
  | 'Mobile Developer'
  | 'AI/ML Developer'
  | 'UI/UX Designer'
  | 'Hardware / IoT Developer'
  | 'Tester'
  | 'Other';

export type AvailabilityStatus =
  | 'OPEN TO CONNECT'
  | 'OPEN FOR COLLABORATION'
  | 'CURRENTLY BUILDING'
  | 'NOT CURRENTLY AVAILABLE';

export interface Project {
  id: string;
  slug: string;
  title: string;
  tagline?: string;
  description: string;
  category: string;
  technologies: string[];
  imageUrl: string;
  demoVideoUrl?: string;
  githubUrl?: string;
  liveDemoUrl?: string;
  problemSolved?: string;
  howItWorks?: string;
  status: ProjectStatus;
  submissionStatus: SubmissionStatus;
  collaborationOpen: boolean;
  lookingFor: CollaborationRole[];
  creatorName: string;
  creatorUsername: string;
  creatorRole: string;
  creatorAvatar?: string;
  creatorEmail: string; // kept private
  creatorWhatsApp?: string; // kept private unless allowed
  allowWhatsAppContact: boolean;
  creatorLinkedIn?: string;
  creatorGitHub?: string;
  creatorWebsite?: string;
  adminNotes?: string;
  createdAt: string;
  updatedAt: string;
  reviewedAt?: string;
  reviewedById?: string;
}

export interface Developer {
  id: string;
  username: string;
  name: string;
  role: string;
  bio: string;
  avatarUrl?: string;
  skills: string[];
  availability: AvailabilityStatus;
  collaborationPreference: string;
  featuredProjectSlugs: string[];
  githubUrl?: string;
  linkedInUrl?: string;
  portfolioUrl?: string;
  whatsApp?: string;
  allowWhatsAppContact: boolean;
  location?: string;
  joinedAt: string;
}

export interface SubmissionPayload {
  creatorName: string;
  creatorEmail: string;
  creatorAvatarUrl?: string;
  creatorWhatsApp?: string;
  allowWhatsAppContact: boolean;
  projectTitle: string;
  projectDescription: string;
  category: string;
  technologies: string[];
  imageUrl?: string;
  problemSolved?: string;
  howItWorks?: string;
  githubUrl?: string;
  liveDemoUrl?: string;
  demoVideoUrl?: string;
  creatorLinkedIn?: string;
  creatorWebsite?: string;
  projectStatus: ProjectStatus;
  collaborationOpen: boolean;
  lookingFor: CollaborationRole[];
}
