import { useState } from 'react';
import { UserProfile } from '../App';
import { ArrowLeft, Upload, Youtube, Instagram } from 'lucide-react';
import { SiTiktok } from 'react-icons/si';

interface EditorOnboardingProps {
  onComplete: (profile: UserProfile) => void;
}

export function EditorOnboarding({ onComplete }: EditorOnboardingProps) {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [experience, setExperience] = useState<'beginner' | 'intermediate' | 'expert' | null>(null);
  const [portfolioType, setPortfolioType] = useState<'social' | 'upload' | null>(null);
  const [tiktok, setTiktok] = useState('');
  const [instagram, setInstagram] = useState('');
  const [youtube, setYoutube] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);

  const handleComplete = () => {
    const profile: UserProfile = {
      id: `editor-${Date.now()}`,
      role: 'editor',
      name,
      experience: experience || 'beginner',
      portfolio: portfolioType === 'social' ? {
        tiktok: tiktok || undefined,
        instagram: instagram || undefined,
        youtube: youtube || undefined,
      } : undefined,
      uploadedWork: portfolioType === 'upload' ? uploadedFiles : undefined,
    };
    onComplete(profile);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    // In a real app, this would upload to a server
    if (e.target.files) {
      const fileNames = Array.from(e.target.files).map(f => f.name);
      setUploadedFiles([...uploadedFiles, ...fileNames]);
    }
  };

  const canContinuePortfolio = () => {
    if (portfolioType === 'social') {
      return tiktok || instagram || youtube;
    }
    if (portfolioType === 'upload') {
      return uploadedFiles.length > 0;
    }
    return false;
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
              className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-300"
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
                className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 mb-6"
                autoFocus
              />

              <button
                onClick={() => setStep(2)}
                disabled={!name.trim()}
                className="w-full px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continue
              </button>
            </div>
          )}

          {/* Step 2: Experience */}
          {step === 2 && (
            <div>
              <button
                onClick={() => setStep(1)}
                className="mb-4 text-slate-400 hover:text-slate-200 flex items-center gap-2"
              >
                <ArrowLeft size={20} />
                Back
              </button>

              <h2 className="text-slate-100 mb-2">How much experience do you have?</h2>
              <p className="text-slate-400 mb-6">This helps creators find the right editor</p>
              
              <div className="space-y-3 mb-6">
                <button
                  onClick={() => setExperience('beginner')}
                  className={`w-full p-4 border-2 rounded-lg text-left transition-all ${
                    experience === 'beginner'
                      ? 'border-cyan-500 bg-cyan-500/10'
                      : 'border-slate-700 bg-slate-800/50 hover:border-slate-600'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-slate-100 mb-1">Beginner</div>
                      <div className="text-sm text-slate-400">Less than 1 year of editing experience</div>
                    </div>
                    <div className={`w-5 h-5 rounded-full border-2 ${
                      experience === 'beginner'
                        ? 'border-cyan-500 bg-cyan-500'
                        : 'border-slate-600'
                    }`}>
                      {experience === 'beginner' && (
                        <div className="w-full h-full flex items-center justify-center text-white text-xs">✓</div>
                      )}
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => setExperience('intermediate')}
                  className={`w-full p-4 border-2 rounded-lg text-left transition-all ${
                    experience === 'intermediate'
                      ? 'border-cyan-500 bg-cyan-500/10'
                      : 'border-slate-700 bg-slate-800/50 hover:border-slate-600'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-slate-100 mb-1">Intermediate</div>
                      <div className="text-sm text-slate-400">1-3 years of editing experience</div>
                    </div>
                    <div className={`w-5 h-5 rounded-full border-2 ${
                      experience === 'intermediate'
                        ? 'border-cyan-500 bg-cyan-500'
                        : 'border-slate-600'
                    }`}>
                      {experience === 'intermediate' && (
                        <div className="w-full h-full flex items-center justify-center text-white text-xs">✓</div>
                      )}
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => setExperience('expert')}
                  className={`w-full p-4 border-2 rounded-lg text-left transition-all ${
                    experience === 'expert'
                      ? 'border-cyan-500 bg-cyan-500/10'
                      : 'border-slate-700 bg-slate-800/50 hover:border-slate-600'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-slate-100 mb-1">Expert</div>
                      <div className="text-sm text-slate-400">3+ years of professional editing</div>
                    </div>
                    <div className={`w-5 h-5 rounded-full border-2 ${
                      experience === 'expert'
                        ? 'border-cyan-500 bg-cyan-500'
                        : 'border-slate-600'
                    }`}>
                      {experience === 'expert' && (
                        <div className="w-full h-full flex items-center justify-center text-white text-xs">✓</div>
                      )}
                    </div>
                  </div>
                </button>
              </div>

              <button
                onClick={() => setStep(3)}
                disabled={!experience}
                className="w-full px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continue
              </button>
            </div>
          )}

          {/* Step 3: Portfolio */}
          {step === 3 && (
            <div>
              <button
                onClick={() => setStep(2)}
                className="mb-4 text-slate-400 hover:text-slate-200 flex items-center gap-2"
              >
                <ArrowLeft size={20} />
                Back
              </button>

              <h2 className="text-slate-100 mb-2">Show us your work</h2>
              <p className="text-slate-400 mb-6">Share examples of your editing to attract creators</p>

              {!portfolioType && (
                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  <button
                    onClick={() => setPortfolioType('social')}
                    className="p-6 border-2 border-slate-700 bg-slate-800/50 rounded-lg hover:border-cyan-500/50 transition-all text-center"
                  >
                    <div className="w-12 h-12 bg-cyan-500/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <Instagram size={24} className="text-cyan-400" />
                    </div>
                    <div className="text-slate-100 mb-2">Social Media</div>
                    <div className="text-sm text-slate-400">Share your social handles</div>
                  </button>

                  <button
                    onClick={() => setPortfolioType('upload')}
                    className="p-6 border-2 border-slate-700 bg-slate-800/50 rounded-lg hover:border-cyan-500/50 transition-all text-center"
                  >
                    <div className="w-12 h-12 bg-cyan-500/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <Upload size={24} className="text-cyan-400" />
                    </div>
                    <div className="text-slate-100 mb-2">Upload Files</div>
                    <div className="text-sm text-slate-400">Upload portfolio videos</div>
                  </button>
                </div>
              )}

              {portfolioType === 'social' && (
                <div>
                  <button
                    onClick={() => setPortfolioType(null)}
                    className="mb-4 text-sm text-cyan-400 hover:text-cyan-300"
                  >
                    ← Choose different option
                  </button>

                  <div className="space-y-4 mb-6">
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
                          className="flex-1 px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50"
                        />
                      </div>
                    </div>

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
                          className="flex-1 px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50"
                        />
                      </div>
                    </div>

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
                          className="flex-1 px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {portfolioType === 'upload' && (
                <div>
                  <button
                    onClick={() => setPortfolioType(null)}
                    className="mb-4 text-sm text-cyan-400 hover:text-cyan-300"
                  >
                    ← Choose different option
                  </button>

                  <div className="mb-6">
                    <label className="block w-full p-8 border-2 border-dashed border-slate-700 rounded-lg hover:border-cyan-500/50 transition-all cursor-pointer text-center">
                      <Upload size={32} className="text-slate-400 mx-auto mb-3" />
                      <div className="text-slate-300 mb-1">Click to upload videos</div>
                      <div className="text-sm text-slate-400">MP4, MOV up to 100MB</div>
                      <input
                        type="file"
                        multiple
                        accept="video/*"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                    </label>

                    {uploadedFiles.length > 0 && (
                      <div className="mt-4 space-y-2">
                        {uploadedFiles.map((file, index) => (
                          <div key={index} className="flex items-center gap-2 p-3 bg-slate-800/50 border border-slate-700 rounded-lg">
                            <div className="w-8 h-8 bg-cyan-500/10 rounded flex items-center justify-center">
                              <Upload size={16} className="text-cyan-400" />
                            </div>
                            <span className="text-slate-300 text-sm flex-1">{file}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {portfolioType && (
                <button
                  onClick={handleComplete}
                  disabled={!canContinuePortfolio()}
                  className="w-full px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Complete Setup
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
