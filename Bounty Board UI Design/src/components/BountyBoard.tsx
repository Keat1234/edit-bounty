import { useState } from 'react';
import { Bounty, UserProfile, BountyApplication } from '../App';
import { BountyCard } from './BountyCard';
import { BountyDetailModal } from './BountyDetailModal';
import { Search, SlidersHorizontal, Plus } from 'lucide-react';
import { CreateBountyModal } from './CreateBountyModal';

interface BountyBoardProps {
  bounties: Bounty[];
  currentUser: UserProfile;
  onApplyToBounty: (bountyId: string) => void;
  applications: BountyApplication[];
}

export function BountyBoard({ bounties, currentUser, onApplyToBounty, applications }: BountyBoardProps) {
  const [selectedBounty, setSelectedBounty] = useState<Bounty | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'short-form' | 'long-form'>('all');
  const [showCreateBounty, setShowCreateBounty] = useState(false);

  const filteredBounties = bounties.filter(bounty => {
    const matchesSearch = bounty.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bounty.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterType === 'all' || bounty.type === filterType;
    return matchesSearch && matchesFilter && bounty.status === 'open';
  });

  const hasApplied = (bountyId: string) => {
    return applications.some(app => app.bountyId === bountyId && app.editorId === currentUser.id);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Search and Filters */}
      <div className="mb-8">
        <div className="flex gap-3 mb-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input
              type="text"
              placeholder="Search bounties..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50"
            />
          </div>
          
          {currentUser.role === 'creator' && (
            <button
              onClick={() => setShowCreateBounty(true)}
              className="px-4 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white rounded-lg transition-all flex items-center gap-2"
            >
              <Plus size={20} />
              Post Bounty
            </button>
          )}
        </div>

        {/* Type Filter */}
        <div className="flex gap-2">
          <button
            onClick={() => setFilterType('all')}
            className={`px-4 py-2 rounded-lg text-sm transition-colors ${
              filterType === 'all'
                ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/50'
                : 'bg-slate-800/50 text-slate-400 border border-slate-700 hover:bg-slate-800'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilterType('short-form')}
            className={`px-4 py-2 rounded-lg text-sm transition-colors ${
              filterType === 'short-form'
                ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/50'
                : 'bg-slate-800/50 text-slate-400 border border-slate-700 hover:bg-slate-800'
            }`}
          >
            Short-form
          </button>
          <button
            onClick={() => setFilterType('long-form')}
            className={`px-4 py-2 rounded-lg text-sm transition-colors ${
              filterType === 'long-form'
                ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/50'
                : 'bg-slate-800/50 text-slate-400 border border-slate-700 hover:bg-slate-800'
            }`}
          >
            Long-form
          </button>
        </div>
      </div>

      {/* Active Bounties Count */}
      <div className="mb-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-lg border border-cyan-500/20">
          <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
          <span className="text-cyan-400 text-sm">{filteredBounties.length} Active Bounties</span>
        </div>
      </div>

      {/* Bounty Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBounties.map((bounty) => (
          <BountyCard
            key={bounty.id}
            bounty={bounty}
            onClick={() => setSelectedBounty(bounty)}
            hasApplied={hasApplied(bounty.id)}
            isOwnBounty={currentUser.role === 'creator' && bounty.creatorId === currentUser.id}
          />
        ))}
      </div>

      {filteredBounties.length === 0 && (
        <div className="text-center py-16">
          <p className="text-slate-400">No bounties found matching your criteria.</p>
        </div>
      )}

      {/* Bounty Detail Modal */}
      {selectedBounty && (
        <BountyDetailModal
          bounty={selectedBounty}
          currentUser={currentUser}
          onClose={() => setSelectedBounty(null)}
          onApply={onApplyToBounty}
          hasApplied={hasApplied(selectedBounty.id)}
        />
      )}

      {/* Create Bounty Modal */}
      {showCreateBounty && (
        <CreateBountyModal
          onClose={() => setShowCreateBounty(false)}
          creatorId={currentUser.id}
          creatorName={currentUser.name}
        />
      )}
    </div>
  );
}
