import { X, Youtube, Instagram, Award } from 'lucide-react';
import { SiTiktok } from 'react-icons/si';

interface EditorProfileModalProps {
  editorId: string;
  onClose: () => void;
}

// Mock editor data - in a real app this would fetch from a database
const mockEditorData = {
  name: 'Alex Johnson',
  experience: 'intermediate',
  portfolio: {
    tiktok: 'alexedits',
    instagram: 'alex.video.edits',
    youtube: 'alexcreations'
  },
  bio: 'Specializing in fast-paced short-form content with creative transitions and effects. 2+ years of experience editing for various content creators.',
  completedBounties: 12,
  rating: 4.8
};

export function EditorProfileModal({ editorId, onClose }: EditorProfileModalProps) {
  const editor = mockEditorData;

  const experienceLevels = {
    beginner: { color: 'text-green-400', label: 'Beginner' },
    intermediate: { color: 'text-yellow-400', label: 'Intermediate' },
    expert: { color: 'text-purple-400', label: 'Expert' }
  };

  const expLevel = experienceLevels[editor.experience as keyof typeof experienceLevels];

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-2xl shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 hover:bg-slate-700/50 rounded-lg transition-colors z-10"
        >
          <X size={24} className="text-slate-400 hover:text-slate-200" />
        </button>

        <div className="p-8">
          {/* Header */}
          <div className="mb-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-full flex items-center justify-center">
                <span className="text-cyan-400 text-2xl">{editor.name[0]}</span>
              </div>
              <div>
                <h2 className="text-slate-100 mb-1">{editor.name}</h2>
                <div className="flex items-center gap-2">
                  <span className={`${expLevel.color}`}>
                    {expLevel.label} Editor
                  </span>
                  <span className="text-slate-600">•</span>
                  <div className="flex items-center gap-1 text-yellow-400">
                    <Award size={16} />
                    <span>{editor.rating}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="p-4 bg-slate-800/50 border border-slate-700 rounded-lg">
                <div className="text-slate-400 text-sm mb-1">Completed Bounties</div>
                <div className="text-slate-100 text-2xl">{editor.completedBounties}</div>
              </div>
              <div className="p-4 bg-slate-800/50 border border-slate-700 rounded-lg">
                <div className="text-slate-400 text-sm mb-1">Experience</div>
                <div className={`text-2xl ${expLevel.color}`}>{expLevel.label}</div>
              </div>
            </div>
          </div>

          {/* Bio */}
          <div className="mb-6">
            <h3 className="text-slate-200 mb-3">About</h3>
            <p className="text-slate-400 leading-relaxed">
              {editor.bio}
            </p>
          </div>

          {/* Portfolio */}
          <div>
            <h3 className="text-slate-200 mb-3">Portfolio</h3>
            <div className="space-y-3">
              {editor.portfolio.tiktok && (
                <a
                  href={`https://tiktok.com/@${editor.portfolio.tiktok}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 bg-slate-800/50 border border-slate-700 rounded-lg hover:border-cyan-500/50 transition-colors group"
                >
                  <SiTiktok size={20} className="text-slate-400 group-hover:text-cyan-400 transition-colors" />
                  <div className="flex-1">
                    <div className="text-slate-400 text-xs">TikTok</div>
                    <div className="text-slate-200">@{editor.portfolio.tiktok}</div>
                  </div>
                </a>
              )}
              {editor.portfolio.instagram && (
                <a
                  href={`https://instagram.com/${editor.portfolio.instagram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 bg-slate-800/50 border border-slate-700 rounded-lg hover:border-cyan-500/50 transition-colors group"
                >
                  <Instagram size={20} className="text-slate-400 group-hover:text-cyan-400 transition-colors" />
                  <div className="flex-1">
                    <div className="text-slate-400 text-xs">Instagram</div>
                    <div className="text-slate-200">@{editor.portfolio.instagram}</div>
                  </div>
                </a>
              )}
              {editor.portfolio.youtube && (
                <a
                  href={`https://youtube.com/@${editor.portfolio.youtube}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 bg-slate-800/50 border border-slate-700 rounded-lg hover:border-cyan-500/50 transition-colors group"
                >
                  <Youtube size={20} className="text-slate-400 group-hover:text-cyan-400 transition-colors" />
                  <div className="flex-1">
                    <div className="text-slate-400 text-xs">YouTube</div>
                    <div className="text-slate-200">@{editor.portfolio.youtube}</div>
                  </div>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
