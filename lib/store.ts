import { Job } from './types';
import fs from 'fs';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'jobs.json');

// Initial mock data
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

// In-memory cache for Vercel/Serverless environments where filesystem is read-only
let memoryJobs: Job[] = [...INITIAL_JOBS];

const readJobs = (): Job[] => {
  try {
    if (fs.existsSync(DB_PATH)) {
      const data = fs.readFileSync(DB_PATH, 'utf-8');
      memoryJobs = JSON.parse(data);
      return memoryJobs;
    }
  } catch (error) {
    // Ignore file read errors and return memory/initial data
  }
  return memoryJobs;
};

const writeJobs = (jobs: Job[]) => {
  memoryJobs = jobs; // Always update memory
  try {
    fs.writeFileSync(DB_PATH, JSON.stringify(jobs, null, 2));
  } catch (error) {
    // Ignore file write errors in read-only environments (Vercel)
    console.warn('Could not write to file system (expected in Vercel), using in-memory storage');
  }
};

// Try to initialize DB file if possible, but don't crash if not
try {
  if (!fs.existsSync(DB_PATH)) {
    writeJobs(INITIAL_JOBS);
  }
} catch (e) {
  // Ignore init errors
}

export const getJobs = () => readJobs();

export const getJobById = (id: string) => readJobs().find((j) => j.id === id);

export const createJob = (job: Omit<Job, 'id'>) => {
  const jobs = readJobs();
  const newJob: Job = {
    ...job,
    id: Math.random().toString(36).substring(7),
  };
  jobs.push(newJob);
  writeJobs(jobs);
  return newJob;
};

export const updateJobStatus = (id: string, status: Job['status'], editorId?: string, submissionUrl?: string) => {
  const jobs = readJobs();
  const jobIndex = jobs.findIndex((j) => j.id === id);
  if (jobIndex === -1) return null;

  const job = jobs[jobIndex];
  job.status = status;
  if (editorId !== undefined) job.editorId = editorId;
  if (submissionUrl !== undefined) job.submissionUrl = submissionUrl;
  
  jobs[jobIndex] = job;
  writeJobs(jobs);
  return job;
};
