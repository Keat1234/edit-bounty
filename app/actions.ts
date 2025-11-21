'use server';

import { createJob, getJobs, updateJobStatus } from '@/lib/store';
import { Job } from '@/lib/types';
import { revalidatePath } from 'next/cache';

export async function getJobsAction() {
  return await getJobs();
}

export async function createJobAction(data: {
  creatorId: string;
  title: string;
  description: string;
  bounty: number;
  videoUrl: string;
  type?: 'short-form' | 'long-form';
  deadline?: string;
  requirements?: string[];
  longDescription?: string;
}) {
  await createJob({
    ...data,
    editorId: null,
    status: 'OPEN',
    submissionUrl: null,
    createdAt: Date.now(),
    applicants: [],
  });
  
  revalidatePath('/');
  revalidatePath('/creator');
  revalidatePath('/editor');
}

export async function claimJobAction(jobId: string, editorId: string) {
  await updateJobStatus(jobId, 'CLAIMED', editorId);
  revalidatePath('/');
  revalidatePath('/editor');
}

export async function submitJobAction(jobId: string, submissionUrl: string) {
  await updateJobStatus(jobId, 'SUBMITTED', undefined, submissionUrl);
  revalidatePath('/');
  revalidatePath('/editor');
  revalidatePath('/creator');
}

export async function approveJobAction(jobId: string) {
  await updateJobStatus(jobId, 'APPROVED');
  revalidatePath('/');
  revalidatePath('/creator');
}
