export interface Job {
  id: string;
  creatorId: string;
  editorId: string | null;
  title: string;
  description: string;
  bounty: number;
  status: 'OPEN' | 'CLAIMED' | 'SUBMITTED' | 'APPROVED';
  videoUrl: string;
  submissionUrl: string | null;
  createdAt: number;
  // New fields from bounty board design
  type?: 'short-form' | 'long-form';
  deadline?: string;
  requirements?: string[];
  longDescription?: string;
  applicants?: string[];
}

export interface User {
  id: string;
  name: string;
  role: 'CREATOR' | 'EDITOR';
}
