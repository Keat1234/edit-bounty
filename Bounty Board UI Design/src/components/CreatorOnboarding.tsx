import { useState } from 'react';
import { UserProfile } from '../App';
import { ArrowLeft, Youtube, Instagram } from 'lucide-react';
import { SiTiktok } from 'react-icons/si';

interface CreatorOnboardingProps {
  onComplete: (profile: UserProfile) => void;
}

export function CreatorOnboarding({ onComplete }: CreatorOnboardingProps) {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [tiktok, setTiktok] = useState('');
  const [instagram, setInstagram] = useState('');
  const [youtube, setYoutube] = useState('');
  const [editingPreference, setEditingPreference] = useState<'short-form' | 'long-form' | 'both' | null>(null);

  const handleComplete = () => {
    const profile: UserProfile = {
      id: `creator-${Date.now()}`,
      role: 'creator',
      name,
      socialAccounts: {
        tiktok: tiktok || undefined,
        instagram: instagram || undefined,
        youtube: youtube || undefined,
      },
      editingPreference: editingPreference || 'both',
    };
    onComplete(profile);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-400">Step {step} of 3</span>
            <span className="text-sm text-slate-400">{Math.round((step / 3) * 100)}%</span>
          </div>
          <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300"
              style={{ width: `${(step / 3) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700 rounded-2xl p-8">
          {/* Step 1: Name */}
          {step === 1 && (
            <div>
              <h2 className="text-slate-100 mb-2">What's your name?</h2>
              <p className="text-slate-400 mb-6">This will be displayed on your profile</p>
              
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 mb-6"
                autoFocus
              />

              <button
                onClick={() => setStep(2)}
                disabled={!name.trim()}
                className="w-full px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continue
              </button>
            </div>
          )}

          {/* Step 2: Social Accounts */}
          {step === 2 && (
            <div>
              <button
                onClick={() => setStep(1)}
                className="mb-4 text-slate-400 hover:text-slate-200 flex items-center gap-2"
              >
                <ArrowLeft size={20} />
                Back
              </button>

              <h2 className="text-slate-100 mb-2">Connect your accounts</h2>
              <p className="text-slate-400 mb-6">Add at least one social media handle</p>
              
              <div className="space-y-4 mb-6">
                {/* TikTok */}
                <div>
                  <label className="block text-sm text-slate-300 mb-2 flex items-center gap-2">
                    <SiTiktok size={18} />
                    TikTok
                  </label>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400">@</span>
                    <input
                      type="text"
                      value={tiktok}
                      onChange={(e) => setTiktok(e.target.value)}
                      placeholder="username"
                      className="flex-1 px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50"
                    />
                  </div>
                </div>

                {/* Instagram */}
                <div>
                  <label className="block text-sm text-slate-300 mb-2 flex items-center gap-2">
                    <Instagram size={18} />
                    Instagram
                  </label>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400">@</span>
                    <input
                      type="text"
                      value={instagram}
                      onChange={(e) => setInstagram(e.target.value)}
                      placeholder="username"
                      className="flex-1 px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50"
                    />
                  </div>
                </div>

                {/* YouTube */}
                <div>
                  <label className="block text-sm text-slate-300 mb-2 flex items-center gap-2">
                    <Youtube size={18} />
                    YouTube
                  </label>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400">@</span>
                    <input
                      type="text"
                      value={youtube}
                      onChange={(e) => setYoutube(e.target.value)}
                      placeholder="channel"
                      className="flex-1 px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50"
                    />
                  </div>
                </div>
              </div>

              <button
                onClick={() => setStep(3)}
                disabled={!tiktok && !instagram && !youtube}
                className="w-full px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continue
              </button>
            </div>
          )}

          {/* Step 3: Editing Preference */}
          {step === 3 && (
            <div>
              <button
                onClick={() => setStep(2)}
                className="mb-4 text-slate-400 hover:text-slate-200 flex items-center gap-2"
              >
                <ArrowLeft size={20} />
                Back
              </button>

              <h2 className="text-slate-100 mb-2">What type of editing do you need?</h2>
              <p className="text-slate-400 mb-6">Choose the format that matches your content</p>
              
              <div className="space-y-3 mb-6">
                <button
                  onClick={() => setEditingPreference('short-form')}
                  className={`w-full p-4 border-2 rounded-lg text-left transition-all ${
                    editingPreference === 'short-form'
                      ? 'border-purple-500 bg-purple-500/10'
                      : 'border-slate-700 bg-slate-800/50 hover:border-slate-600'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-slate-100 mb-1">Short-form content</div>
                      <div className="text-sm text-slate-400">TikToks, Reels, Shorts (under 60s)</div>
                    </div>
                    <div className={`w-5 h-5 rounded-full border-2 ${
                      editingPreference === 'short-form'
                        ? 'border-purple-500 bg-purple-500'
                        : 'border-slate-600'
                    }`}>
                      {editingPreference === 'short-form' && (
                        <div className="w-full h-full flex items-center justify-center text-white text-xs">✓</div>
                      )}
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => setEditingPreference('long-form')}
                  className={`w-full p-4 border-2 rounded-lg text-left transition-all ${
                    editingPreference === 'long-form'
                      ? 'border-purple-500 bg-purple-500/10'
                      : 'border-slate-700 bg-slate-800/50 hover:border-slate-600'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-slate-100 mb-1">Long-form content</div>
                      <div className="text-sm text-slate-400">YouTube videos, vlogs (over 1 min)</div>
                    </div>
                    <div className={`w-5 h-5 rounded-full border-2 ${
                      editingPreference === 'long-form'
                        ? 'border-purple-500 bg-purple-500'
                        : 'border-slate-600'
                    }`}>
                      {editingPreference === 'long-form' && (
                        <div className="w-full h-full flex items-center justify-center text-white text-xs">✓</div>
                      )}
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => setEditingPreference('both')}
                  className={`w-full p-4 border-2 rounded-lg text-left transition-all ${
                    editingPreference === 'both'
                      ? 'border-purple-500 bg-purple-500/10'
                      : 'border-slate-700 bg-slate-800/50 hover:border-slate-600'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-slate-100 mb-1">Both</div>
                      <div className="text-sm text-slate-400">I need both short and long-form editing</div>
                    </div>
                    <div className={`w-5 h-5 rounded-full border-2 ${
                      editingPreference === 'both'
                        ? 'border-purple-500 bg-purple-500'
                        : 'border-slate-600'
                    }`}>
                      {editingPreference === 'both' && (
                        <div className="w-full h-full flex items-center justify-center text-white text-xs">✓</div>
                      )}
                    </div>
                  </div>
                </button>
              </div>

              <button
                onClick={handleComplete}
                disabled={!editingPreference}
                className="w-full px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Complete Setup
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
