import JobForm from '@/components/JobForm';
import JobCard from '@/components/JobCard';
import { getJobs } from '@/lib/store';
import Link from 'next/link';

export default async function CreatorPage() {
  const jobs = getJobs();
  const myJobs = jobs.filter(j => j.creatorId === 'creator-1'); // Mock ID

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Creator Dashboard</h1>
          <Link href="/" className="text-gray-600 hover:text-gray-900">← Back</Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <h2 className="text-xl font-semibold mb-4">Post a New Request</h2>
            <JobForm creatorId="creator-1" />
          </div>

          <div className="md:col-span-2">
            <h2 className="text-xl font-semibold mb-4">My Requests</h2>
            {myJobs.length === 0 ? (
              <p className="text-gray-500">No requests yet.</p>
            ) : (
              myJobs.map(job => (
                <JobCard 
                  key={job.id} 
                  job={job} 
                  userRole="CREATOR" 
                  currentUserId="creator-1" 
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
