import { X, CheckCircle, XCircle, User } from 'lucide-react';
import { BountyApplication, Bounty, UserProfile } from '../App';
import { useState } from 'react';
import { EditorProfileModal } from './EditorProfileModal';

interface NotificationPanelProps {
  applications: BountyApplication[];
  bounties: Bounty[];
  currentUser: UserProfile;
  onClose: () => void;
  onApplicationResponse: (applicationId: string, accepted: boolean) => void;
}

export function NotificationPanel({
  applications,
  bounties,
  currentUser,
  onClose,
  onApplicationResponse
}: NotificationPanelProps) {
  const [viewingEditorId, setViewingEditorId] = useState<string | null>(null);

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-end p-4 pointer-events-none">
        <div className="pointer-events-auto w-full max-w-md bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-2xl shadow-2xl shadow-cyan-500/10 max-h-[80vh] flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-slate-700">
            <div>
              <h3 className="text-slate-100">Notifications</h3>
              <p className="text-slate-400 text-sm mt-1">
                {applications.length} {applications.length === 1 ? 'notification' : 'notifications'}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors"
            >
              <X size={20} className="text-slate-400" />
            </button>
          </div>

          {/* Notifications List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {applications.length === 0 ? (
              <div className="text-center py-8 text-slate-400">
                No new notifications
              </div>
            ) : (
              applications.map((application) => {
                const bounty = bounties.find(b => b.id === application.bountyId);
                if (!bounty) return null;

                return (
                  <div
                    key={application.id}
                    className="p-4 bg-slate-800/50 border border-slate-700 rounded-lg"
                  >
                    {currentUser.role === 'creator' ? (
                      // Notification for creators (editor applied)
                      <div>
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <User size={16} className="text-cyan-400" />
                              <span className="text-slate-200">{application.editorName}</span>
                            </div>
                            <p className="text-slate-400 text-sm">
                              Applied to: <span className="text-slate-300">{bounty.title}</span>
                            </p>
                            <p className="text-slate-500 text-xs mt-1">{application.date}</p>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <button
                            onClick={() => setViewingEditorId(application.editorId)}
                            className="flex-1 px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-slate-300 text-sm hover:bg-slate-700 transition-colors"
                          >
                            View Profile
                          </button>
                          <button
                            onClick={() => onApplicationResponse(application.id, true)}
                            className="px-3 py-2 bg-green-500/10 border border-green-500/50 rounded-lg text-green-400 text-sm hover:bg-green-500/20 transition-colors flex items-center gap-1"
                          >
                            <CheckCircle size={16} />
                            Accept
                          </button>
                          <button
                            onClick={() => onApplicationResponse(application.id, false)}
                            className="px-3 py-2 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400 text-sm hover:bg-red-500/20 transition-colors flex items-center gap-1"
                          >
                            <XCircle size={16} />
                            Decline
                          </button>
                        </div>
                      </div>
                    ) : (
                      // Notification for editors (application status)
                      <div>
                        <p className="text-slate-300 mb-2">
                          Your application to <span className="text-cyan-400">{bounty.title}</span>
                        </p>
                        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-lg text-sm ${
                          application.status === 'accepted'
                            ? 'bg-green-500/10 text-green-400 border border-green-500/50'
                            : application.status === 'rejected'
                            ? 'bg-red-500/10 text-red-400 border border-red-500/50'
                            : 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/50'
                        }`}>
                          {application.status === 'accepted' ? (
                            <>
                              <CheckCircle size={16} />
                              Accepted
                            </>
                          ) : application.status === 'rejected' ? (
                            <>
                              <XCircle size={16} />
                              Declined
                            </>
                          ) : (
                            'Pending'
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* Editor Profile Modal */}
      {viewingEditorId && (
        <EditorProfileModal
          editorId={viewingEditorId}
          onClose={() => setViewingEditorId(null)}
        />
      )}
    </>
  );
}
