import { NextRequest, NextResponse } from 'next/server';
import { uploadRawFootage, uploadEditedClip, validateVideoFile } from '@/lib/storage';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const type = formData.get('type') as string; // 'raw' or 'submission'
    const jobId = formData.get('jobId') as string | null;
    
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }
    
    // Validate file
    const validation = validateVideoFile(file);
    if (!validation.valid) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }
    
    // Upload based on type
    let url: string;
    if (type === 'submission' && jobId) {
      url = await uploadEditedClip(jobId, file);
    } else {
      url = await uploadRawFootage(file);
    }
    
    return NextResponse.json({ url });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Failed to upload file' },
      { status: 500 }
    );
  }
}

export const config = {
  api: {
    bodyParser: false, // Disable body parsing, we'll use formData
  },
};
