import { useState } from 'react';
import { X, Edit2, Youtube, Instagram, Save } from 'lucide-react';
import { SiTiktok } from 'react-icons/si';
import { UserProfile } from '../App';

interface ProfileModalProps {
  profile: UserProfile;
  onClose: () => void;
  onUpdate: (profile: UserProfile) => void;
}

export function ProfileModal({ profile, onClose, onUpdate }: ProfileModalProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState(profile);

  const handleSave = () => {
    onUpdate(editedProfile);
    setIsEditing(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
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
          <div className="flex items-start justify-between mb-6 mr-12">
            <div>
              <h2 className="text-slate-100 mb-2">Your Profile</h2>
              <span className={`px-3 py-1 rounded-full text-xs ${
                profile.role === 'creator'
                  ? 'bg-purple-500/10 text-purple-400'
                  : 'bg-cyan-500/10 text-cyan-400'
              }`}>
                {profile.role === 'creator' ? 'Creator' : 'Editor'}
              </span>
            </div>
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-slate-300 hover:bg-slate-700 transition-colors"
              >
                <Edit2 size={16} />
                Edit Profile
              </button>
            )}
          </div>

          {/* Profile Content */}
          <div className="space-y-6">
            {/* Name */}
            <div>
              <label className="block text-sm text-slate-400 mb-2">Name</label>
              {isEditing ? (
                <input
                  type="text"
                  value={editedProfile.name}
                  onChange={(e) => setEditedProfile({ ...editedProfile, name: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                />
              ) : (
                <p className="text-slate-200">{profile.name}</p>
              )}
            </div>

            {/* Creator Fields */}
            {profile.role === 'creator' && (
              <>
                <div>
                  <label className="block text-sm text-slate-400 mb-3">Social Accounts</label>
                  <div className="space-y-3">
                    {isEditing ? (
                      <>
                        <div className="flex items-center gap-3">
                          <SiTiktok size={20} className="text-slate-400" />
                          <span className="text-slate-400">@</span>
                          <input
                            type="text"
                            value={editedProfile.socialAccounts?.tiktok || ''}
                            onChange={(e) => setEditedProfile({
                              ...editedProfile,
                              socialAccounts: { ...editedProfile.socialAccounts, tiktok: e.target.value }
                            })}
                            placeholder="username"
                            className="flex-1 px-4 py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                          />
                        </div>
                        <div className="flex items-center gap-3">
                          <Instagram size={20} className="text-slate-400" />
                          <span className="text-slate-400">@</span>
                          <input
                            type="text"
                            value={editedProfile.socialAccounts?.instagram || ''}
                            onChange={(e) => setEditedProfile({
                              ...editedProfile,
                              socialAccounts: { ...editedProfile.socialAccounts, instagram: e.target.value }
                            })}
                            placeholder="username"
                            className="flex-1 px-4 py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                          />
                        </div>
                        <div className="flex items-center gap-3">
                          <Youtube size={20} className="text-slate-400" />
                          <span className="text-slate-400">@</span>
                          <input
                            type="text"
                            value={editedProfile.socialAccounts?.youtube || ''}
                            onChange={(e) => setEditedProfile({
                              ...editedProfile,
                              socialAccounts: { ...editedProfile.socialAccounts, youtube: e.target.value }
                            })}
                            placeholder="channel"
                            className="flex-1 px-4 py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                          />
                        </div>
                      </>
                    ) : (
                      <>
                        {profile.socialAccounts?.tiktok && (
                          <div className="flex items-center gap-2 text-slate-300">
                            <SiTiktok size={18} />
                            <span>@{profile.socialAccounts.tiktok}</span>
                          </div>
                        )}
                        {profile.socialAccounts?.instagram && (
                          <div className="flex items-center gap-2 text-slate-300">
                            <Instagram size={18} />
                            <span>@{profile.socialAccounts.instagram}</span>
                          </div>
                        )}
                        {profile.socialAccounts?.youtube && (
                          <div className="flex items-center gap-2 text-slate-300">
                            <Youtube size={18} />
                            <span>@{profile.socialAccounts.youtube}</span>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-slate-400 mb-2">Editing Preference</label>
                  {isEditing ? (
                    <select
                      value={editedProfile.editingPreference || 'both'}
                      onChange={(e) => setEditedProfile({
                        ...editedProfile,
                        editingPreference: e.target.value as 'short-form' | 'long-form' | 'both'
                      })}
                      className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                    >
                      <option value="short-form">Short-form</option>
                      <option value="long-form">Long-form</option>
                      <option value="both">Both</option>
                    </select>
                  ) : (
                    <p className="text-slate-200 capitalize">{profile.editingPreference}</p>
                  )}
                </div>
              </>
            )}

            {/* Editor Fields */}
            {profile.role === 'editor' && (
              <>
                <div>
                  <label className="block text-sm text-slate-400 mb-2">Experience Level</label>
                  {isEditing ? (
                    <select
                      value={editedProfile.experience || 'beginner'}
                      onChange={(e) => setEditedProfile({
                        ...editedProfile,
                        experience: e.target.value as 'beginner' | 'intermediate' | 'expert'
                      })}
                      className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                    >
                      <option value="beginner">Beginner</option>
                      <option value="intermediate">Intermediate</option>
                      <option value="expert">Expert</option>
                    </select>
                  ) : (
                    <p className="text-slate-200 capitalize">{profile.experience}</p>
                  )}
                </div>

                {profile.portfolio && (
                  <div>
                    <label className="block text-sm text-slate-400 mb-3">Portfolio</label>
                    <div className="space-y-2">
                      {profile.portfolio.tiktok && (
                        <div className="flex items-center gap-2 text-slate-300">
                          <SiTiktok size={18} />
                          <span>@{profile.portfolio.tiktok}</span>
                        </div>
                      )}
                      {profile.portfolio.instagram && (
                        <div className="flex items-center gap-2 text-slate-300">
                          <Instagram size={18} />
                          <span>@{profile.portfolio.instagram}</span>
                        </div>
                      )}
                      {profile.portfolio.youtube && (
                        <div className="flex items-center gap-2 text-slate-300">
                          <Youtube size={18} />
                          <span>@{profile.portfolio.youtube}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {profile.uploadedWork && profile.uploadedWork.length > 0 && (
                  <div>
                    <label className="block text-sm text-slate-400 mb-3">Uploaded Work</label>
                    <div className="space-y-2">
                      {profile.uploadedWork.map((work, index) => (
                        <div key={index} className="p-3 bg-slate-800/50 border border-slate-700 rounded-lg text-slate-300 text-sm">
                          {work}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Action Buttons */}
          {isEditing && (
            <div className="flex gap-3 mt-6 pt-6 border-t border-slate-700">
              <button
                onClick={() => {
                  setEditedProfile(profile);
                  setIsEditing(false);
                }}
                className="flex-1 px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-slate-300 hover:bg-slate-700 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="flex-1 px-4 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white rounded-lg transition-all flex items-center justify-center gap-2"
              >
                <Save size={18} />
                Save Changes
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}