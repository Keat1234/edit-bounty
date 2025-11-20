import { useState } from 'react';
import { Onboarding } from './components/Onboarding';
import { Dashboard } from './components/Dashboard';

export type UserRole = 'creator' | 'editor';

export interface SocialAccounts {
  tiktok?: string;
  instagram?: string;
  youtube?: string;
}

export interface UserProfile {
  id: string;
  role: UserRole;
  name: string;
  // Creator fields
  socialAccounts?: SocialAccounts;
  editingPreference?: 'short-form' | 'long-form' | 'both';
  // Editor fields
  experience?: 'beginner' | 'intermediate' | 'expert';
  portfolio?: SocialAccounts;
  uploadedWork?: string[]; // URLs to uploaded work
}

export interface Bounty {
  id: string;
  title: string;
  description: string;
  reward: number;
  date: string;
  status: 'open' | 'in-progress' | 'completed';
  type: 'short-form' | 'long-form';
  creator: string;
  creatorId: string;
  deadline: string;
  requirements: string[];
  longDescription: string;
  applicants?: string[]; // editor IDs
}

export interface BountyApplication {
  id: string;
  bountyId: string;
  editorId: string;
  editorName: string;
  status: 'pending' | 'accepted' | 'rejected';
  date: string;
}

export default function App() {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);

  const handleOnboardingComplete = (profile: UserProfile) => {
    setCurrentUser(profile);
    setHasCompletedOnboarding(true);
  };

  if (!hasCompletedOnboarding || !currentUser) {
    return <Onboarding onComplete={handleOnboardingComplete} />;
  }

  return (
    <Dashboard 
      currentUser={currentUser} 
      onUpdateProfile={setCurrentUser}
    />
  );
}
