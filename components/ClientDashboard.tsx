'use client';

import { useState } from 'react';
import { Job } from '@/lib/types';
import BountyCard from '@/components/JobCard';
import { BountyDetailModal } from '@/components/BountyDetailModal';
import { CreateBountyModal } from '@/components/CreateBountyModal';
import { Bell, User, RefreshCw, TrendingUp, Briefcase, DollarSign } from "lucide-react";
import Link from "next/link";

interface ClientDashboardProps {
  displayName: string;
  role: string;
  devToken?: string;
  allJobs: Job[];
  openJobs: Job[];
  myCreatorJobs: Job[];
  myEditorJobs: Job[];
  completedJobs: Job[];
}

export default function ClientDashboard({
  displayName,
  role,
  devToken,
  allJobs,
  openJobs,
  myCreatorJobs,
  myEditorJobs,
  completedJobs
}: ClientDashboardProps) {
  const [selectedBounty, setSelectedBounty] = useState<Job | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const userRole = role === 'creator' ? 'CREATOR' : 'EDITOR';
  const activeJobs = userRole === 'CREATOR' ? myCreatorJobs : myEditorJobs;
  const relevantJobs = userRole === 'CREATOR' ? myCreatorJobs : openJobs;
  const totalEarnings = userRole === 'CREATOR' 
    ? myCreatorJobs.reduce((sum, j) => sum + j.bounty, 0)
    : myEditorJobs.reduce((sum, j) => sum + j.bounty, 0);

  const buildUrl = (newRole: string) => {
    const params = new URLSearchParams();
    params.set('role', newRole);
    if (devToken) {
      params.set('whop-dev-user-token', devToken);
    }
    return `?${params.toString()}`;
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        {/* Header */}
        <div className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-white px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 inline-block">
                  EditBounty
                </h1>
                <p className="text-slate-300 text-sm mt-2 font-medium">
                  {userRole === 'CREATOR' ? 'Find talented editors' : 'Discover editing opportunities'}
                </p>
              </div>

              <div className="flex items-center gap-3">
                {/* Role Switcher */}
                <Link
                  href={buildUrl(role === 'creator' ? 'editor' : 'creator')}
                  className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 border border-slate-700 rounded-lg hover:bg-slate-800 hover:border-slate-600 transition-colors"
                >
                  <RefreshCw size={16} className="text-white" />
                  <span className="text-sm font-medium text-white">
                    Switch to {userRole === 'CREATOR' ? 'Editor' : 'Creator'}
                  </span>
                </Link>

                {/* Notifications */}
                <button className="relative p-2.5 bg-slate-800/50 border border-slate-700 rounded-lg hover:bg-slate-800 hover:border-slate-600 transition-colors">
                  <Bell size={20} className="text-white" />
                  {activeJobs.filter(j => j.status === 'SUBMITTED' || j.status === 'CLAIMED').length > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 min-w-[20px] h-5 px-1.5 bg-red-500 rounded-full text-white text-xs font-bold flex items-center justify-center">
                      {activeJobs.filter(j => j.status === 'SUBMITTED' || j.status === 'CLAIMED').length}
                    </span>
                  )}
                </button>

                {/* Profile */}
                <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-lg">
                  <User size={20} className="text-white" />
                  <span className="font-medium text-white">{displayName}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Stat Card 1 */}
            <div className="relative group overflow-hidden rounded-xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 p-6 hover:border-cyan-500/30 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 to-blue-500/0 group-hover:from-cyan-500/5 group-hover:to-blue-500/5 transition-all duration-300" />
              <div className="relative flex items-start justify-between">
                <div>
                  <p className="text-slate-400 text-sm font-medium mb-1">{userRole === 'CREATOR' ? 'My Requests' : 'Active Jobs'}</p>
                  <p className="text-4xl font-bold text-white">{activeJobs.length}</p>
                </div>
                <div className="p-3 rounded-lg bg-cyan-500/10 border border-cyan-500/20">
                  <Briefcase size={24} className="text-white" />
                </div>
              </div>
            </div>

            {/* Stat Card 2 */}
            <div className="relative group overflow-hidden rounded-xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 p-6 hover:border-emerald-500/30 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/0 to-green-500/0 group-hover:from-emerald-500/5 group-hover:to-green-500/5 transition-all duration-300" />
              <div className="relative flex items-start justify-between">
                <div>
                  <p className="text-slate-400 text-sm font-medium mb-1">{userRole === 'CREATOR' ? 'Total Spent' : 'Potential Earnings'}</p>
                  <p className="text-4xl font-bold text-white">${totalEarnings}</p>
                </div>
                <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                  <DollarSign size={24} className="text-white" />
                </div>
              </div>
            </div>

            {/* Stat Card 3 */}
            <div className="relative group overflow-hidden rounded-xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 p-6 hover:border-purple-500/30 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-pink-500/0 group-hover:from-purple-500/5 group-hover:to-pink-500/5 transition-all duration-300" />
              <div className="relative flex items-start justify-between">
                <div>
                  <p className="text-slate-400 text-sm font-medium mb-1">Completed</p>
                  <p className="text-4xl font-bold text-white">{completedJobs.length}</p>
                </div>
                <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                  <TrendingUp size={24} className="text-white" />
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          {userRole === 'CREATOR' && (
            <div className="mb-8">
              <button 
                onClick={() => setShowCreateModal(true)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold transition-all duration-200 shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40"
              >
                <span>+ Create New Bounty</span>
              </button>
            </div>
          )}

          {/* Bounty Board */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">
                {userRole === 'CREATOR' ? 'Your Bounties' : 'Available Bounties'}
              </h2>
              <div className="flex items-center gap-2 text-slate-400 text-sm font-medium">
                <span>{relevantJobs.length} bounties</span>
              </div>
            </div>

            {/* Active Jobs Section */}
            {activeJobs.length > 0 && userRole === 'EDITOR' && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-white mb-4">My Active Jobs</h3>
                <div className="grid grid-cols-1 gap-4">
                  {activeJobs.map(job => (
                    <BountyCard 
                      key={job.id} 
                      job={job} 
                      userRole={userRole} 
                      currentUserId={userRole === 'CREATOR' ? 'creator-1' : 'editor-1'}
                      onOpenDetail={setSelectedBounty}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Main Bounty List */}
            {relevantJobs.length === 0 ? (
              <div className="relative rounded-xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 p-12 text-center">
                <div className="text-6xl mb-4">🎬</div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {userRole === 'CREATOR' ? 'No bounties yet' : 'No available bounties'}
                </h3>
                <p className="text-slate-400">
                  {userRole === 'CREATOR' 
                    ? 'Create your first editing bounty to get started.' 
                    : 'Check back soon for new editing opportunities.'}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {relevantJobs.map(job => (
                  <BountyCard 
                    key={job.id} 
                    job={job} 
                    userRole={userRole} 
                    currentUserId={userRole === 'CREATOR' ? 'creator-1' : 'editor-1'}
                    onOpenDetail={setSelectedBounty}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modals */}
      {selectedBounty && (
        <BountyDetailModal
          bounty={selectedBounty}
          userRole={userRole}
          currentUserId={userRole === 'CREATOR' ? 'creator-1' : 'editor-1'}
          onClose={() => setSelectedBounty(null)}
          onApply={() => {/* Refresh handled by server action */}}
        />
      )}

      {showCreateModal && (
        <CreateBountyModal
          onClose={() => setShowCreateModal(false)}
          onSuccess={() => {
            setShowCreateModal(false);
            // Refresh will happen via server action
          }}
        />
      )}
    </>
  );
}
