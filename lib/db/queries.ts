import { sql } from '@vercel/postgres';
import { Job } from '../types';

// Helper to generate unique IDs
const generateId = () => Math.random().toString(36).substring(7);

/**
 * Initialize a user in the database if they don't exist
 */
export async function ensureUser(whopUserId: string, userData: {
  username: string;
  email?: string;
  name?: string;
}) {
  const userId = `user_${whopUserId}`;
  
  await sql`
    INSERT INTO users (id, whop_user_id, username, email, name)
    VALUES (${userId}, ${whopUserId}, ${userData.username}, ${userData.email || null}, ${userData.name || null})
    ON CONFLICT (whop_user_id) DO UPDATE SET
      username = EXCLUDED.username,
      email = EXCLUDED.email,
      name = EXCLUDED.name,
      updated_at = CURRENT_TIMESTAMP
  `;
  
  return userId;
}

/**
 * Get all jobs or filter by status
 */
export async function getJobs(status?: Job['status']): Promise<Job[]> {
  const result = status
    ? await sql`SELECT * FROM jobs WHERE status = ${status} ORDER BY created_at DESC`
    : await sql`SELECT * FROM jobs ORDER BY created_at DESC`;
  
  return result.rows.map(row => ({
    id: row.id,
    creatorId: row.creator_id,
    editorId: row.editor_id,
    title: row.title,
    description: row.description,
    longDescription: row.long_description,
    bounty: parseFloat(row.bounty),
    status: row.status,
    type: row.type,
    deadline: row.deadline,
    requirements: row.requirements || [],
    videoUrl: row.raw_footage_url,
    submissionUrl: row.submission_url,
    createdAt: new Date(row.created_at).getTime(),
    applicants: [], // For backward compatibility
  }));
}

/**
 * Get a single job by ID
 */
export async function getJobById(id: string): Promise<Job | null> {
  const result = await sql`SELECT * FROM jobs WHERE id = ${id}`;
  
  if (result.rows.length === 0) return null;
  
  const row = result.rows[0];
  return {
    id: row.id,
    creatorId: row.creator_id,
    editorId: row.editor_id,
    title: row.title,
    description: row.description,
    longDescription: row.long_description,
    bounty: parseFloat(row.bounty),
    status: row.status,
    type: row.type,
    deadline: row.deadline,
    requirements: row.requirements || [],
    videoUrl: row.raw_footage_url,
    submissionUrl: row.submission_url,
    createdAt: new Date(row.created_at).getTime(),
    applicants: [],
  };
}

/**
 * Create a new job
 */
export async function createJob(data: {
  creatorId: string;
  title: string;
  description: string;
  bounty: number;
  videoUrl?: string;
  type?: 'short-form' | 'long-form';
  deadline?: string;
  requirements?: string[];
  longDescription?: string;
}): Promise<Job> {
  const id = `job_${generateId()}`;
  const requirementsJson = JSON.stringify(data.requirements || []);
  
  await sql`
    INSERT INTO jobs (
      id, creator_id, title, description, long_description, bounty, 
      type, deadline, requirements, raw_footage_url, status
    ) VALUES (
      ${id}, ${data.creatorId}, ${data.title}, ${data.description}, 
      ${data.longDescription || null}, ${data.bounty}, ${data.type || null}, 
      ${data.deadline || null}, ${requirementsJson}::jsonb, ${data.videoUrl || null}, 'OPEN'
    )
  `;
  
  // Update user's job count
  await sql`
    UPDATE users 
    SET total_jobs_created = total_jobs_created + 1,
        updated_at = CURRENT_TIMESTAMP
    WHERE id = ${data.creatorId}
  `;
  
  const job = await getJobById(id);
  return job!;
}

/**
 * Update job status and optionally set editor or submission URL
 */
export async function updateJobStatus(
  id: string,
  status: Job['status'],
  editorId?: string,
  submissionUrl?: string
): Promise<Job | null> {
  // Build dynamic update query
  const updates: string[] = [`status = '${status}'`, `updated_at = CURRENT_TIMESTAMP`];
  
  if (status === 'CLAIMED' && editorId) {
    updates.push(`editor_id = '${editorId}'`, `claimed_at = CURRENT_TIMESTAMP`);
  }
  
  if (status === 'SUBMITTED' && submissionUrl) {
    updates.push(`submission_url = '${submissionUrl}'`, `submitted_at = CURRENT_TIMESTAMP`);
  }
  
  if (status === 'APPROVED') {
    updates.push(`approved_at = CURRENT_TIMESTAMP`);
  }
  
  await sql.query(`
    UPDATE jobs 
    SET ${updates.join(', ')}
    WHERE id = '${id}'
  `);
  
  // If approved, update editor's stats
  if (status === 'APPROVED' && editorId) {
    const job = await getJobById(id);
    if (job) {
      await sql`
        UPDATE users 
        SET total_jobs_completed = total_jobs_completed + 1,
            total_earnings = total_earnings + ${job.bounty * 0.85},
            updated_at = CURRENT_TIMESTAMP
        WHERE id = ${editorId}
      `;
    }
  }
  
  return getJobById(id);
}

/**
 * Get jobs by creator
 */
export async function getJobsByCreator(creatorId: string): Promise<Job[]> {
  const result = await sql`
    SELECT * FROM jobs WHERE creator_id = ${creatorId} ORDER BY created_at DESC
  `;
  
  return result.rows.map(row => ({
    id: row.id,
    creatorId: row.creator_id,
    editorId: row.editor_id,
    title: row.title,
    description: row.description,
    longDescription: row.long_description,
    bounty: parseFloat(row.bounty),
    status: row.status,
    type: row.type,
    deadline: row.deadline,
    requirements: row.requirements || [],
    videoUrl: row.raw_footage_url,
    submissionUrl: row.submission_url,
    createdAt: new Date(row.created_at).getTime(),
    applicants: [],
  }));
}

/**
 * Get jobs by editor
 */
export async function getJobsByEditor(editorId: string): Promise<Job[]> {
  const result = await sql`
    SELECT * FROM jobs WHERE editor_id = ${editorId} ORDER BY created_at DESC
  `;
  
  return result.rows.map(row => ({
    id: row.id,
    creatorId: row.creator_id,
    editorId: row.editor_id,
    title: row.title,
    description: row.description,
    longDescription: row.long_description,
    bounty: parseFloat(row.bounty),
    status: row.status,
    type: row.type,
    deadline: row.deadline,
    requirements: row.requirements || [],
    videoUrl: row.raw_footage_url,
    submissionUrl: row.submission_url,
    createdAt: new Date(row.created_at).getTime(),
    applicants: [],
  }));
}
