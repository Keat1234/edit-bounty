import JobCard from '@/components/JobCard';
import { getJobs } from '@/lib/store';
import Link from 'next/link';

export default async function EditorPage() {
  const jobs = getJobs();
  const availableJobs = jobs.filter(j => j.status === 'OPEN');
  const myJobs = jobs.filter(j => j.editorId === 'editor-1'); // Mock ID

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Editor Dashboard</h1>
          <Link href="/" className="text-gray-600 hover:text-gray-900">← Back</Link>
        </div>

        <div className="space-y-8">
          <div>
            <h2 className="text-xl font-semibold mb-4">My Active Jobs</h2>
            {myJobs.length === 0 ? (
              <p className="text-gray-500">You haven't claimed any jobs yet.</p>
            ) : (
              myJobs.map(job => (
                <JobCard 
                  key={job.id} 
                  job={job} 
                  userRole="EDITOR" 
                  currentUserId="editor-1" 
                />
              ))
            )}
          </div>

          <hr className="border-gray-200" />

          <div>
            <h2 className="text-xl font-semibold mb-4">Available Bounties</h2>
            {availableJobs.length === 0 ? (
              <p className="text-gray-500">No jobs available right now.</p>
            ) : (
              availableJobs.map(job => (
                <JobCard 
                  key={job.id} 
                  job={job} 
                  userRole="EDITOR" 
                  currentUserId="editor-1" 
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
