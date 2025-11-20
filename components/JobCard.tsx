'use client';

import { Job } from '@/lib/types';
import { claimJobAction, approveJobAction } from '@/app/actions';
import { useState } from 'react';
import SubmissionForm from './SubmissionForm';
import { Calendar, DollarSign, Clock } from 'lucide-react';

interface BountyCardProps {
  job: Job;
  userRole: 'CREATOR' | 'EDITOR';
  currentUserId: string;
  onOpenDetail: (job: Job) => void;
}

export default function BountyCard({ job, userRole, currentUserId, onOpenDetail }: BountyCardProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleClaim = async (e: React.MouseEvent) => {
    e.stopPropagation();
    await claimJobAction(job.id, currentUserId);
  };

  const handleApprove = async (e: React.MouseEvent) => {
    e.stopPropagation();
    await approveJobAction(job.id);
  };

  const getStatusColor = (status: string) => {
   switch (status) {
      case 'OPEN':
        return 'from-emerald-500/20 to-green-500/20 border-emerald-500/50 text-white bg-emerald-500/10';
      case 'CLAIMED':
        return 'from-yellow-500/20 to-orange-500/20 border-yellow-500/50 text-white bg-yellow-500/10';
      case 'SUBMITTED':
        return 'from-blue-500/20 to-cyan-500/20 border-blue-500/50 text-white bg-blue-500/10';
      case 'APPROVED':
        return 'from-purple-500/20 to-pink-500/20 border-purple-500/50 text-white bg-purple-500/10';
      default:
        return 'from-slate-500/20 to-slate-600/20 border-slate-500/50 text-white bg-slate-500/10';
    }
  };

  const getTypeIcon = (type?: string) => {
    return type === 'short-form' ? '⚡' : '🎬';
  };

  return (
    <div 
      onClick={() => onOpenDetail(job)}
      className="group relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 rounded-xl overflow-hidden transition-all duration-300 hover:border-cyan-500/50 backdrop-blur-sm shadow-lg hover:shadow-2xl hover:shadow-cyan-500/10 cursor-pointer"
    >
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 to-blue-500/0 group-hover:from-cyan-500/5 group-hover:to-blue-500/5 transition-all duration-300 pointer-events-none" />

      <div className="relative p-6">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">{getTypeIcon(job.type)}</span>
              <h3 className="text-xl font-semibold text-white group-hover:text-cyan-400 transition-colors line-clamp-1">
                {job.title}
              </h3>
            </div>
            <p className="text-slate-300 text-sm line-clamp-2">{job.description}</p>
          </div>

          {/* Status Badge */}
          <div className={`px-3 py-1.5 rounded-lg bg-gradient-to-r ${getStatusColor  (job.status)} border text-xs font-bold backdrop-blur-sm shrink-0`}>
            {job.status}
          </div>
        </div>

        {/* Metadata */}
        <div className="flex flex-wrap items-center gap-4 text-sm mb-4">
          <div className="flex items-center gap-1.5">
            <DollarSign size={16} className="shrink-0 text-emerald-400" />
            <span className="font-bold text-white">${job.bounty}</span>
          </div>

          {job.deadline && (
            <div className="flex items-center gap-1.5">
              <Calendar size={16} className="shrink-0 text-slate-400" />
              <span className="font-medium text-white">{job.deadline}</span>
            </div>
          )}

          <div className="flex items-center gap-1.5">
            <Clock size={16} className="shrink-0 text-slate-400" />
            <span className="font-medium text-slate-300">{new Date(job.createdAt).toLocaleDateString()}</span>
          </div>

          {job.type && (
            <div className="px-2 py-0.5 rounded bg-slate-700/50 border border-slate-600/50 text-white text-xs font-semibold">
              {job.type}
            </div>
          )}
        </div>

        {/* Requirements Preview */}
        {job.requirements && job.requirements.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {job.requirements.slice(0, 3).map((req, idx) => (
              <span 
                key={idx} 
                className="px-2 py-1 rounded-md bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-medium"
              >
                {req}
              </span>
            ))}
            {job.requirements.length > 3 && (
              <span className="px-2 py-1 text-slate-400 text-xs font-medium">
                +{job.requirements.length - 3} more
              </span>
            )}
          </div>
        )}

        {/* Quick Actions */}
        <div className="flex items-center gap-3 pt-4 border-t border-slate-700/50" onClick={(e) => e.stopPropagation()}>
          {/* Editor Actions */}
          {userRole === 'EDITOR' && job.status === 'OPEN' && (
            <button
              onClick={handleClaim}
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white font-semibold transition-all duration-200 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 text-sm"
            >
              Claim Bounty
            </button>
          )}

          {userRole === 'EDITOR' && job.status === 'CLAIMED' && job.editorId === currentUserId && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsSubmitting(!isSubmitting);
              }}
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-400 hover:to-purple-400 text-white font-semibold transition-all duration-200 text-sm"
            >
              {isSubmitting ? 'Cancel' : 'Submit Work'}
            </button>
          )}

           {/* Creator Actions */}
          {userRole === 'CREATOR' && job.status === 'SUBMITTED' && job.creatorId === currentUserId && (
            <div className="flex flex-col gap-2 flex-1">
              {job.submissionUrl && (
                <a 
                  href={job.submissionUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-cyan-400 hover:text-cyan-300 text-sm font-medium"
                  onClick={(e) => e.stopPropagation()}
                >
                  → View Submission
                </a>
              )}
              <button
                onClick={handleApprove}
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-400 hover:to-green-400 text-white font-semibold transition-all duration-200 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 text-sm"
              >
                Approve & Pay
              </button>
            </div>
          )}
          
          {job.status === 'APPROVED' && (
            <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm">
              <span>✓</span>
              <span>Completed</span>
            </div>
          )}
        </div>

        {/* Submission Form */}
        {isSubmitting && userRole === 'EDITOR' && (
          <div className="mt-4 pt-4 border-t border-slate-700/50 animate-in" onClick={(e) => e.stopPropagation()}>
            <SubmissionForm jobId={job.id} onSuccess={() => setIsSubmitting(false)} />
          </div>
        )}
      </div>
    </div>
  );
}
