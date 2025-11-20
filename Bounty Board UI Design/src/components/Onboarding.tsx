import { useState } from 'react';
import { UserProfile } from '../App';
import { Video, Scissors } from 'lucide-react';
import { CreatorOnboarding } from './CreatorOnboarding';
import { EditorOnboarding } from './EditorOnboarding';

interface OnboardingProps {
  onComplete: (profile: UserProfile) => void;
}

export function Onboarding({ onComplete }: OnboardingProps) {
  const [selectedRole, setSelectedRole] = useState<'creator' | 'editor' | null>(null);

  if (selectedRole === 'creator') {
    return <CreatorOnboarding onComplete={onComplete} />;
  }

  if (selectedRole === 'editor') {
    return <EditorOnboarding onComplete={onComplete} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-3">
            Welcome to EditBounty
          </h1>
          <p className="text-slate-400 text-lg">
            Connect creators with talented video editors
          </p>
        </div>

        {/* Role Selection */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Creator Card */}
          <button
            onClick={() => setSelectedRole('creator')}
            className="group relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-2 border-slate-700 rounded-2xl p-8 text-left hover:border-purple-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20 hover:-translate-y-1"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-pink-500/0 group-hover:from-purple-500/5 group-hover:to-pink-500/5 rounded-2xl transition-all duration-300"></div>
            
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Video size={32} className="text-purple-400" />
              </div>
              
              <h2 className="text-slate-100 mb-3">I'm a Creator</h2>
              <p className="text-slate-400 mb-6">
                Post video editing jobs and find talented editors to bring your content to life
              </p>
              
              <ul className="space-y-2 text-sm text-slate-400">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
                  Post editing bounties
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
                  Review editor portfolios
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
                  Get your content edited fast
                </li>
              </ul>
            </div>
          </button>

          {/* Editor Card */}
          <button
            onClick={() => setSelectedRole('editor')}
            className="group relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-2 border-slate-700 rounded-2xl p-8 text-left hover:border-cyan-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20 hover:-translate-y-1"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 to-blue-500/0 group-hover:from-cyan-500/5 group-hover:to-blue-500/5 rounded-2xl transition-all duration-300"></div>
            
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Scissors size={32} className="text-cyan-400" />
              </div>
              
              <h2 className="text-slate-100 mb-3">I'm an Editor</h2>
              <p className="text-slate-400 mb-6">
                Find editing gigs, showcase your work, and earn money doing what you love
              </p>
              
              <ul className="space-y-2 text-sm text-slate-400">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full"></div>
                  Browse available bounties
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full"></div>
                  Showcase your portfolio
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full"></div>
                  Get paid for your skills
                </li>
              </ul>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
