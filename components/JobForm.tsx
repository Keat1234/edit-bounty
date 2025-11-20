'use client';

import { createJobAction } from '@/app/actions';

export default function JobForm({ creatorId }: { creatorId: string }) {
  return (
    <form action={createJobAction} className="space-y-4 bg-white p-6 rounded-lg shadow">
      <input type="hidden" name="creatorId" value={creatorId} />
      
      <div>
        <label className="block text-sm font-medium text-gray-700">Job Title</label>
        <input
          type="text"
          name="title"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2"
          placeholder="e.g. Edit my gameplay clip"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          name="description"
          required
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2"
          placeholder="Details about the edit..."
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Bounty ($)</label>
        <input
          type="number"
          name="bounty"
          required
          min="5"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2"
          placeholder="15"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Raw Footage URL</label>
        <input
          type="url"
          name="videoUrl"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2"
          placeholder="https://..."
        />
      </div>

      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Post Job
      </button>
    </form>
  );
}
