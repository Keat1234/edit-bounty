import { Calendar, DollarSign, Video, Film, Check } from 'lucide-react';
import type { Bounty } from '../App';

interface BountyCardProps {
  bounty: Bounty;
  onClick: () => void;
  hasApplied?: boolean;
  isOwnBounty?: boolean;
}

export function BountyCard({ bounty, onClick, hasApplied, isOwnBounty }: BountyCardProps) {
  const typeColors = {
    'short-form': 'bg-pink-500/10 text-pink-400',
    'long-form': 'bg-purple-500/10 text-purple-400'
  };

  return (
    <div
      onClick={onClick}
      className="group relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700 rounded-xl p-6 cursor-pointer hover:border-cyan-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10 hover:-translate-y-1"
    >
      {/* Glow effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 to-blue-500/0 group-hover:from-cyan-500/5 group-hover:to-blue-500/5 rounded-xl transition-all duration-300"></div>
      
      <div className="relative">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <span className={`px-3 py-1 rounded-full text-xs flex items-center gap-1.5 ${typeColors[bounty.type]}`}>
            {bounty.type === 'short-form' ? <Video size={14} /> : <Film size={14} />}
            {bounty.type === 'short-form' ? 'Short-form' : 'Long-form'}
          </span>
          {hasApplied && (
            <span className="px-3 py-1 rounded-full text-xs bg-green-500/10 text-green-400 border border-green-500/20 flex items-center gap-1.5">
              <Check size={14} />
              Applied
            </span>
          )}
          {isOwnBounty && (
            <span className="px-3 py-1 rounded-full text-xs bg-blue-500/10 text-blue-400 border border-blue-500/20">
              Your Post
            </span>
          )}
        </div>

        {/* Title and Description */}
        <h3 className="text-slate-100 mb-2 group-hover:text-cyan-400 transition-colors">
          {bounty.title}
        </h3>
        <p className="text-slate-400 text-sm mb-4 line-clamp-2">
          {bounty.description}
        </p>

        {/* Creator */}
        <div className="text-sm text-slate-400 mb-4">
          by <span className="text-slate-300">{bounty.creator}</span>
        </div>

        {/* Footer Info */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-700/50">
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1.5 text-emerald-400">
              <DollarSign size={16} />
              <span>{bounty.reward}</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-400">
              <Calendar size={16} />
              <span className="text-xs">{bounty.deadline}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
