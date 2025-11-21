import { Job } from './types';
import * as db from './db/queries';

// Check if we have database connection
const USE_DATABASE = !!process.env.POSTGRES_URL;

// In-memory fallback for local development without database
const INITIAL_JOBS: Job[] = [
  {
    id: '1',
    creatorId: 'creator-1',
    editorId: null,
    title: 'Edit my 2-min TikTok gameplay montage',
    description: 'Need fast-paced cuts with trending transitions and text overlays.',
    bounty: 25,
    status: 'OPEN',
    videoUrl: 'https://example.com/raw-footage-1.mp4',
    submissionUrl: null,
    createdAt: Date.now() - 100000,
    type: 'short-form',
    deadline: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000).toLocaleDateString(),
    requirements: ['Premiere Pro', 'After Effects', 'Captions'],
    longDescription: 'I need a high-energy edit for my gaming TikTok. The raw footage is 15 minutes of gameplay highlights that needs to be cut down to a 2-minute montage with smooth transitions, captions for key moments, and trending sound effects.',
    applicants: []
  },
  {
    id: '2',
    creatorId: 'creator-1',
    editorId: 'editor-1',
    title: 'YouTube vlog edit - 10 min video',
    description: 'Weekly travel vlog needing color correction and smooth cuts.',
    bounty: 80,
    status: 'CLAIMED',
    videoUrl: 'https://example.com/raw-footage-2.mp4',
    submissionUrl: null,
    createdAt: Date.now() - 200000,
    type: 'long-form',
    deadline: new Date(Date.now() + 9 * 24 * 60 * 60 * 1000).toLocaleDateString(),
    requirements: ['Final Cut Pro', 'Color Grading', 'Audio Mixing'],
    longDescription: 'Looking for a reliable editor for my weekly travel vlogs. This week\'s footage is from Bali - about 2 hours of raw footage that needs to be cut into a 10-minute engaging story.',
    applicants: []
  },
  {
    id: '3',
    creatorId: 'creator-2',
    editorId: null,
    title: 'Instagram Reel - Product showcase',
    description: '30-second reel for skincare product with trending audio.',
    bounty: 35,
    status: 'OPEN',
    videoUrl: 'https://example.com/raw-footage-3.mp4',
    submissionUrl: null,
    createdAt: Date.now() - 150000,
    type: 'short-form',
    deadline: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString(),
    requirements: ['Premiere Pro', 'Motion Graphics', 'Color Grading'],
    longDescription: 'Need a polished 30-second Instagram Reel showcasing our new skincare line. Raw footage includes product shots and lifestyle b-roll.',
    applicants: []
  },
  {
    id: '4',
    creatorId: 'creator-3',
    editorId: null,
    title: 'YouTube Short from stream highlight',
    description: 'Turn a funny gaming moment into a viral Short.',
    bounty: 20,
    status: 'OPEN',
    videoUrl: 'https://example.com/raw-footage-4.mp4',
    submissionUrl: null,
    createdAt: Date.now() - 50000,
    type: 'short-form',
    deadline: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toLocaleDateString(),
    requirements: ['Any editing software', 'Subtitles', 'Sound design'],
    longDescription: 'I have a 5-minute Twitch clip that has a hilarious 45-second moment that would be perfect as a YouTube Short. Need someone to cut it down, add engaging captions, zoom effects on reactions.',
    applicants: []
  },
];

let memoryJobs: Job[] = [...INITIAL_JOBS];

// Public API functions that route to either database or memory
export const getJobs = async (): Promise<Job[]> => {
  if (USE_DATABASE) {
    try {
      return await db.getJobs();
    } catch (error) {
      console.error('Database error, falling back to memory:', error);
      return memoryJobs;
    }
  }
  return memoryJobs;
};

export const getJobById = async (id: string): Promise<Job | undefined> => {
  if (USE_DATABASE) {
    try {
      const job = await db.getJobById(id);
      return job || undefined;
    } catch (error) {
      console.error('Database error, falling back to memory:', error);
      return memoryJobs.find(j => j.id === id);
    }
  }
  return memoryJobs.find(j => j.id === id);
};

export const createJob = async (job: Omit<Job, 'id'>): Promise<Job> => {
  if (USE_DATABASE) {
    try {
      return await db.createJob({
        creatorId: job.creatorId,
        title: job.title,
        description: job.description,
        bounty: job.bounty,
        videoUrl: job.videoUrl || undefined,
        type: job.type,
        deadline: job.deadline,
        requirements: job.requirements,
        longDescription: job.longDescription,
      });
    } catch (error) {
      console.error('Database error, falling back to memory:', error);
      // Fallback to memory
      const newJob: Job = {
        ...job,
        id: Math.random().toString(36).substring(7),
      };
      memoryJobs.push(newJob);
      return newJob;
    }
  }
  
  // Memory fallback
  const newJob: Job = {
    ...job,
    id: Math.random().toString(36).substring(7),
  };
  memoryJobs.push(newJob);
  return newJob;
};

export const updateJobStatus = async (
  id: string,
  status: Job['status'],
  editorId?: string,
  submissionUrl?: string
): Promise<Job | null> => {
  if (USE_DATABASE) {
    try {
      return await db.updateJobStatus(id, status, editorId, submissionUrl);
    } catch (error) {
      console.error('Database error, falling back to memory:', error);
      // Fallback to memory
      const jobIndex = memoryJobs.findIndex(j => j.id === id);
      if (jobIndex === -1) return null;
      
      const job = memoryJobs[jobIndex];
      job.status = status;
      if (editorId !== undefined) job.editorId = editorId;
      if (submissionUrl !== undefined) job.submissionUrl = submissionUrl;
      
      memoryJobs[jobIndex] = job;
      return job;
    }
  }
  
  // Memory fallback
  const jobIndex = memoryJobs.findIndex(j => j.id === id);
  if (jobIndex === -1) return null;
  
  const job = memoryJobs[jobIndex];
  job.status = status;
  if (editorId !== undefined) job.editorId = editorId;
  if (submissionUrl !== undefined) job.submissionUrl = submissionUrl;
  
  memoryJobs[jobIndex] = job;
  return job;
};
