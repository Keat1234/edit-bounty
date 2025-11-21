import { put, del } from '@vercel/blob';

/**
 * Upload raw footage file to Vercel Blob
 */
export async function uploadRawFootage(file: File): Promise<string> {
  const blob = await put(`raw/${Date.now()}-${file.name}`, file, {
    access: 'public',
  });
  
  return blob.url;
}

/**
 * Upload edited/submitted clip to Vercel Blob
 */
export async function uploadEditedClip(jobId: string, file: File): Promise<string> {
  const blob = await put(`submissions/${jobId}-${Date.now()}-${file.name}`, file, {
    access: 'public',
  });
  
  return blob.url;
}

/**
 * Delete a file from Vercel Blob
 */
export async function deleteFile(url: string): Promise<void> {
  try {
    await del(url);
  } catch (error) {
    console.error('Failed to delete file:', error);
  }
}

/**
 * Validate file before upload
 */
export function validateVideoFile(file: File): { valid: boolean; error?: string } {
  const MAX_SIZE = 2 * 1024 * 1024 * 1024; // 2GB
  const ALLOWED_TYPES = [
    'video/mp4',
    'video/quicktime',
    'video/x-msvideo',
    'video/x-matroska',
    'video/webm',
  ];
  
  if (file.size > MAX_SIZE) {
    return { valid: false, error: 'File size must be less than 2GB' };
  }
  
  if (!ALLOWED_TYPES.includes(file.type)) {
    return { valid: false, error: 'File type must be MP4, MOV, AVI, MKV, or WebM' };
  }
  
  return { valid: true };
}
