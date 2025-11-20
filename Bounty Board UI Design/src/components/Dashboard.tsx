import { useState } from 'react';
import { UserProfile, Bounty, BountyApplication } from '../App';
import { BountyBoard } from './BountyBoard';
import { NotificationPanel } from './NotificationPanel';
import { ProfileModal } from './ProfileModal';
import { Bell, User, RefreshCw } from 'lucide-react';

interface DashboardProps {
  currentUser: UserProfile;
  onUpdateProfile: (profile: UserProfile) => void;
}

// Mock data for bounties
const mockBounties: Bounty[] = [
  {
    id: '1',
    title: 'Edit my 2-min TikTok gameplay montage',
    description: 'Need fast-paced cuts with trending transitions and text overlays.',
    reward: 25,
    date: '11/19/2025',
    status: 'open',
    type: 'short-form',
    creator: 'GameMaster_Pro',
    creatorId: 'creator-1',
    deadline: '11/25/2025',
    requirements: ['Premiere Pro', 'After Effects', 'Captions'],
    longDescription: 'I need a high-energy edit for my gaming TikTok. The raw footage is 15 minutes of gameplay highlights that needs to be cut down to a 2-minute montage with smooth transitions, captions for key moments, and trending sound effects. Looking for someone who understands TikTok editing style.',
    applicants: []
  },
  {
    id: '2',
    title: 'YouTube vlog edit - 10 min video',
    description: 'Weekly travel vlog needing color correction and smooth cuts.',
    reward: 80,
    date: '11/18/2025',
    status: 'open',
    type: 'long-form',
    creator: 'TravelWithSarah',
    creatorId: 'creator-2',
    deadline: '11/28/2025',
    requirements: ['Final Cut Pro', 'Color Grading', 'Audio Mixing'],
    longDescription: 'Looking for a reliable editor for my weekly travel vlogs. This week\'s footage is from Bali - about 2 hours of raw footage that needs to be cut into a 10-minute engaging story. Need someone who can do color grading, add background music, and create a cohesive narrative flow.',
    applicants: []
  },
  {
    id: '3',
    title: 'Instagram Reel - Product showcase',
    description: '30-second reel for skincare product with trending audio.',
    reward: 35,
    date: '11/20/2025',
    status: 'open',
    type: 'short-form',
    creator: 'BeautyByEmma',
    creatorId: 'creator-3',
    deadline: '11/22/2025',
    requirements: ['Premiere Pro', 'Motion Graphics', 'Color Grading'],
    longDescription: 'Need a polished 30-second Instagram Reel showcasing our new skincare line. Raw footage includes product shots and lifestyle b-roll. Looking for someone who can match trending Reels aesthetics with smooth transitions, text animations, and proper color grading to make the products pop.',
    applicants: []
  },
  {
    id: '4',
    title: 'YouTube Short from stream highlight',
    description: 'Turn a funny gaming moment into a viral Short.',
    reward: 20,
    date: '11/19/2025',
    status: 'open',
    type: 'short-form',
    creator: 'StreamerKing',
    creatorId: 'creator-4',
    deadline: '11/23/2025',
    requirements: ['Any editing software', 'Subtitles', 'Sound design'],
    longDescription: 'I have a 5-minute Twitch clip that has a hilarious 45-second moment that would be perfect as a YouTube Short. Need someone to cut it down, add engaging captions, zoom effects on reactions, and maybe add some sound effects to enhance the comedy. Quick turnaround needed!',
    applicants: []
  }
];

export function Dashboard({ currentUser, onUpdateProfile }: DashboardProps) {
  const [bounties] = useState<Bounty[]>(mockBounties);
  const [applications, setApplications] = useState<BountyApplication[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  const handleApplyToBounty = (bountyId: string) => {
    const newApplication: BountyApplication = {
      id: `app-${Date.now()}`,
      bountyId,
      editorId: currentUser.id,
      editorName: currentUser.name,
      status: 'pending',
      date: new Date().toLocaleDateString(),
    };
    setApplications([...applications, newApplication]);
    setUnreadCount(prev => prev + 1);
  };

  const handleApplicationResponse = (applicationId: string, accepted: boolean) => {
    setApplications(applications.map(app =>
      app.id === applicationId
        ? { ...app, status: accepted ? 'accepted' : 'rejected' }
        : app
    ));
  };

  const handleRoleSwitch = () => {
    const newRole = currentUser.role === 'creator' ? 'editor' : 'creator';
    onUpdateProfile({
      ...currentUser,
      role: newRole,
    });
  };

  // Filter applications for current user
  const relevantApplications = currentUser.role === 'creator'
    ? applications.filter(app => {
        const bounty = bounties.find(b => b.id === app.bountyId);
        return bounty?.creatorId === currentUser.id;
      })
    : applications.filter(app => app.editorId === currentUser.id);

  const pendingApplications = relevantApplications.filter(app => app.status === 'pending');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Header */}
      <div className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                EditBounty
              </h1>
              <p className="text-slate-400 text-sm mt-1">
                {currentUser.role === 'creator' ? 'Find talented editors' : 'Discover editing opportunities'}
              </p>
            </div>

            <div className="flex items-center gap-3">
              {/* Role Switcher */}
              <button
                onClick={handleRoleSwitch}
                className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-slate-300 hover:bg-slate-800 transition-colors"
              >
                <RefreshCw size={16} />
                <span className="text-sm">
                  Switch to {currentUser.role === 'creator' ? 'Editor' : 'Creator'}
                </span>
              </button>

              {/* Notifications */}
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 bg-slate-800/50 border border-slate-700 rounded-lg text-slate-300 hover:bg-slate-800 transition-colors"
              >
                <Bell size={20} />
                {pendingApplications.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">
                    {pendingApplications.length}
                  </span>
                )}
              </button>

              {/* Profile */}
              <button
                onClick={() => setShowProfile(true)}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-lg text-cyan-400 hover:from-cyan-500/20 hover:to-blue-500/20 transition-colors"
              >
                <User size={20} />
                <span>{currentUser.name}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <BountyBoard
        bounties={bounties}
        currentUser={currentUser}
        onApplyToBounty={handleApplyToBounty}
        applications={applications}
      />

      {/* Notification Panel */}
      {showNotifications && (
        <NotificationPanel
          applications={pendingApplications}
          bounties={bounties}
          currentUser={currentUser}
          onClose={() => setShowNotifications(false)}
          onApplicationResponse={handleApplicationResponse}
        />
      )}

      {/* Profile Modal */}
      {showProfile && (
        <ProfileModal
          profile={currentUser}
          onClose={() => setShowProfile(false)}
          onUpdate={onUpdateProfile}
        />
      )}
    </div>
  );
}
