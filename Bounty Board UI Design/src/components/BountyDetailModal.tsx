import { X, DollarSign, Calendar, Clock, User, Tag, Video, Film } from 'lucide-react';
import type { Bounty, UserProfile } from '../App';

interface BountyDetailModalProps {
  bounty: Bounty;
  currentUser: UserProfile;
  onClose: () => void;
  onApply: (bountyId: string) => void;
  hasApplied: boolean;
}

export function BountyDetailModal({ bounty, currentUser, onClose, onApply, hasApplied }: BountyDetailModalProps) {
  const isOwnBounty = currentUser.role === 'creator' && bounty.creatorId === currentUser.id;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-2xl shadow-2xl shadow-cyan-500/10">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 hover:bg-slate-700/50 rounded-lg transition-colors z-10"
        >
          <X size={24} className="text-slate-400 hover:text-slate-200" />
        </button>

        {/* Content */}
        <div className="p-8">
          {/* Header */}
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-4">
              <span className={`px-3 py-1 rounded-full text-xs flex items-center gap-1.5 ${
                bounty.type === 'short-form' 
                  ? 'bg-pink-500/10 text-pink-400' 
                  : 'bg-purple-500/10 text-purple-400'
              }`}>
                {bounty.type === 'short-form' ? <Video size={14} /> : <Film size={14} />}
                {bounty.type === 'short-form' ? 'Short-form' : 'Long-form'}
              </span>
              {hasApplied && (
                <span className="px-3 py-1 rounded-full text-xs bg-green-500/10 text-green-400 border border-green-500/20">
                  Application Submitted
                </span>
              )}
            </div>
            <h2 className="text-slate-100 mb-3">
              {bounty.title}
            </h2>
            <p className="text-slate-400">
              {bounty.description}
            </p>
          </div>

          {/* Reward Highlight */}
          <div className="mb-6 p-6 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border border-emerald-500/20 rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm mb-1">Bounty Reward</p>
                <div className="flex items-center gap-2">
                  <DollarSign size={28} className="text-emerald-400" />
                  <span className="text-emerald-400">{bounty.reward}</span>
                </div>
              </div>
              {currentUser.role === 'editor' && !isOwnBounty && (
                <button
                  onClick={() => {
                    onApply(bounty.id);
                    onClose();
                  }}
                  disabled={hasApplied}
                  className={`px-6 py-3 rounded-lg transition-all duration-300 ${
                    hasApplied
                      ? 'bg-slate-700 text-slate-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white hover:shadow-lg hover:shadow-cyan-500/25'
                  }`}
                >
                  {hasApplied ? 'Applied' : 'Apply to Bounty'}
                </button>
              )}
            </div>
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="p-4 bg-slate-800/50 border border-slate-700 rounded-lg">
              <div className="flex items-center gap-2 text-slate-400 mb-2">
                <User size={18} />
                <span className="text-sm">Creator</span>
              </div>
              <p className="text-slate-200">{bounty.creator}</p>
            </div>
            <div className="p-4 bg-slate-800/50 border border-slate-700 rounded-lg">
              <div className="flex items-center gap-2 text-slate-400 mb-2">
                <Calendar size={18} />
                <span className="text-sm">Posted</span>
              </div>
              <p className="text-slate-200">{bounty.date}</p>
            </div>
            <div className="p-4 bg-slate-800/50 border border-slate-700 rounded-lg">
              <div className="flex items-center gap-2 text-slate-400 mb-2">
                <Clock size={18} />
                <span className="text-sm">Deadline</span>
              </div>
              <p className="text-slate-200">{bounty.deadline}</p>
            </div>
            <div className="p-4 bg-slate-800/50 border border-slate-700 rounded-lg">
              <div className="flex items-center gap-2 text-slate-400 mb-2">
                <Tag size={18} />
                <span className="text-sm">Type</span>
              </div>
              <p className="text-slate-200">{bounty.type === 'short-form' ? 'Short-form' : 'Long-form'}</p>
            </div>
          </div>

          {/* Description */}
          <div className="mb-6">
            <h3 className="text-slate-200 mb-3">Full Description</h3>
            <p className="text-slate-400 leading-relaxed">
              {bounty.longDescription}
            </p>
          </div>

          {/* Requirements */}
          <div>
            <h3 className="text-slate-200 mb-3">Requirements</h3>
            <div className="flex flex-wrap gap-2">
              {bounty.requirements.map((req, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-slate-300 text-sm"
                >
                  {req}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
