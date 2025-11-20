'use client';

import { X, DollarSign, Calendar, Clock, User, Tag, Video, Film } from 'lucide-react';
import type { Job } from '@/lib/types';
import { claimJobAction } from '@/app/actions';
import { useState } from 'react';

interface BountyDetailModalProps {
  bounty: Job;
  userRole: 'CREATOR' | 'EDITOR';
  currentUserId: string;
  onClose: () => void;
  onApply?: (bountyId: string) => void;
}

export function BountyDetailModal({ bounty, userRole, currentUserId, onClose, onApply }: BountyDetailModalProps) {
  const [isApplying, setIsApplying] = useState(false);
  const isOwnBounty = userRole === 'CREATOR' && bounty.creatorId === currentUserId;
  const canApply = userRole === 'EDITOR' && !isOwnBounty && bounty.status === 'OPEN';

  const handleApply = async () => {
    if (!canApply) return;
    setIsApplying(true);
    try {
      await claimJobAction(bounty.id, currentUserId);
      onApply?.(bounty.id);
      onClose();
    } catch (error) {
      console.error('Error applying:', error);
    } finally {
      setIsApplying(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in">
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
              <span className={`px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 ${
                bounty.type === 'short-form' 
                  ? 'bg-pink-500/10 text-white border border-pink-500/30' 
                  : 'bg-purple-500/10 text-white border border-purple-500/30'
              }`}>
                {bounty.type === 'short-form' ? <Video size={14} /> : <Film size={14} />}
                {bounty.type === 'short-form' ? 'Short-form' : 'Long-form'}
              </span>
              {bounty.status === 'CLAIMED' && bounty.editorId === currentUserId && (
                <span className="px-3 py-1.5 rounded-full text-xs font-bold bg-yellow-500/10 text-white border border-yellow-500/30">
                  You claimed this
                </span>
              )}
            </div>
            <h2 className="text-3xl font-bold text-white mb-3">
              {bounty.title}
            </h2>
            <p className="text-lg text-slate-300">
              {bounty.description}
            </p>
          </div>

          {/* Reward Highlight */}
          <div className="mb-6 p-6 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border border-emerald-500/20 rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-300 text-sm font-medium mb-1">Bounty Reward</p>
                <div className="flex items-center gap-2">
                  <DollarSign size={32} className="text-white" />
                  <span className="text-4xl font-bold text-white">{bounty.bounty}</span>
                </div>
              </div>
              {canApply && (
                <button
                  onClick={handleApply}
                  disabled={isApplying}
                  className="px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/25 disabled:opacity-50"
                >
                  {isApplying ? 'Claiming...' : 'Claim Bounty'}
                </button>
              )}
            </div>
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="p-4 bg-slate-800/50 border border-slate-700 rounded-lg">
              <div className="flex items-center gap-2 text-slate-300 mb-2">
                <User size={18} className="text-white" />
                <span className="text-sm font-semibold">Creator</span>
              </div>
              <p className="text-white font-medium">creator-{bounty.creatorId.split('-')[1]}</p>
            </div>
            <div className="p-4 bg-slate-800/50 border border-slate-700 rounded-lg">
              <div className="flex items-center gap-2 text-slate-300 mb-2">
                <Calendar size={18} className="text-white" />
                <span className="text-sm font-semibold">Posted</span>
              </div>
              <p className="text-white font-medium">{new Date(bounty.createdAt).toLocaleDateString()}</p>
            </div>
            {bounty.deadline && (
              <div className="p-4 bg-slate-800/50 border border-slate-700 rounded-lg">
                <div className="flex items-center gap-2 text-slate-300 mb-2">
                  <Clock size={18} className="text-white" />
                  <span className="text-sm font-semibold">Deadline</span>
                </div>
                <p className="text-white font-medium">{bounty.deadline}</p>
              </div>
            )}
            <div className="p-4 bg-slate-800/50 border border-slate-700 rounded-lg">
              <div className="flex items-center gap-2 text-slate-300 mb-2">
                <Tag size={18} className="text-white" />
                <span className="text-sm font-semibold">Status</span>
              </div>
              <p className="text-white font-medium">{bounty.status}</p>
            </div>
          </div>

          {/* Description */}
          {bounty.longDescription && (
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-white mb-3">Full Description</h3>
              <p className="text-slate-300 leading-relaxed">
                {bounty.longDescription}
              </p>
            </div>
          )}

          {/* Raw Footage Link */}
          {bounty.videoUrl && (
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-white mb-3">Raw Footage</h3>
              <a 
                href={bounty.videoUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-cyan-400 hover:bg-slate-800 hover:border-cyan-500/50 transition-all"
              >
                <Video size={18} />
                <span>View Raw Footage</span>
              </a>
            </div>
          )}

          {/* Requirements */}
          {bounty.requirements && bounty.requirements.length > 0 && (
            <div>
              <h3 className="text-xl font-semibold text-white mb-3">Requirements</h3>
              <div className="flex flex-wrap gap-2">
                {bounty.requirements.map((req, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-cyan-500/10 border border-cyan-500/20 rounded-lg text-white text-sm font-medium"
                  >
                    {req}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
