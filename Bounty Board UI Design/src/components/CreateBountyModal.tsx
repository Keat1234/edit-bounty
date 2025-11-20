import { useState } from 'react';
import { X } from 'lucide-react';

interface CreateBountyModalProps {
  onClose: () => void;
  creatorId: string;
  creatorName: string;
}

export function CreateBountyModal({ onClose, creatorId, creatorName }: CreateBountyModalProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [longDescription, setLongDescription] = useState('');
  const [reward, setReward] = useState('');
  const [deadline, setDeadline] = useState('');
  const [type, setType] = useState<'short-form' | 'long-form'>('short-form');
  const [requirements, setRequirements] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would save to a database
    console.log('Creating bounty:', {
      title,
      description,
      longDescription,
      reward: Number(reward),
      deadline,
      type,
      requirements: requirements.split(',').map(r => r.trim()),
      creatorId,
      creatorName
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-2xl shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 hover:bg-slate-700/50 rounded-lg transition-colors z-10"
        >
          <X size={24} className="text-slate-400 hover:text-slate-200" />
        </button>

        <form onSubmit={handleSubmit} className="p-8">
          <h2 className="text-slate-100 mb-6">Post a Bounty</h2>

          <div className="space-y-5">
            {/* Title */}
            <div>
              <label className="block text-sm text-slate-300 mb-2">Title *</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Edit my 2-min TikTok gameplay montage"
                className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                required
              />
            </div>

            {/* Short Description */}
            <div>
              <label className="block text-sm text-slate-300 mb-2">Short Description *</label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Quick summary of what you need"
                className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                required
              />
            </div>

            {/* Long Description */}
            <div>
              <label className="block text-sm text-slate-300 mb-2">Full Description *</label>
              <textarea
                value={longDescription}
                onChange={(e) => setLongDescription(e.target.value)}
                placeholder="Detailed description of your editing needs..."
                rows={4}
                className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 resize-none"
                required
              />
            </div>

            {/* Type */}
            <div>
              <label className="block text-sm text-slate-300 mb-2">Content Type *</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setType('short-form')}
                  className={`p-4 border-2 rounded-lg text-left transition-all ${
                    type === 'short-form'
                      ? 'border-purple-500 bg-purple-500/10'
                      : 'border-slate-700 bg-slate-800/50 hover:border-slate-600'
                  }`}
                >
                  <div className="text-slate-100 mb-1">Short-form</div>
                  <div className="text-xs text-slate-400">TikToks, Reels, Shorts</div>
                </button>
                <button
                  type="button"
                  onClick={() => setType('long-form')}
                  className={`p-4 border-2 rounded-lg text-left transition-all ${
                    type === 'long-form'
                      ? 'border-purple-500 bg-purple-500/10'
                      : 'border-slate-700 bg-slate-800/50 hover:border-slate-600'
                  }`}
                >
                  <div className="text-slate-100 mb-1">Long-form</div>
                  <div className="text-xs text-slate-400">YouTube videos, vlogs</div>
                </button>
              </div>
            </div>

            {/* Reward */}
            <div>
              <label className="block text-sm text-slate-300 mb-2">Reward ($) *</label>
              <input
                type="number"
                value={reward}
                onChange={(e) => setReward(e.target.value)}
                placeholder="e.g., 50"
                min="1"
                className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                required
              />
            </div>

            {/* Deadline */}
            <div>
              <label className="block text-sm text-slate-300 mb-2">Deadline *</label>
              <input
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                required
              />
            </div>

            {/* Requirements */}
            <div>
              <label className="block text-sm text-slate-300 mb-2">
                Requirements
                <span className="text-slate-500 ml-2">(comma separated)</span>
              </label>
              <input
                type="text"
                value={requirements}
                onChange={(e) => setRequirements(e.target.value)}
                placeholder="e.g., Premiere Pro, After Effects, Captions"
                className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex gap-3 mt-6 pt-6 border-t border-slate-700">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-slate-300 hover:bg-slate-700 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-lg transition-all"
            >
              Post Bounty
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
