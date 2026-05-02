import { NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import path from 'path';

export async function GET(
  request: Request,
  { params }: { params: { file: string[] } }
) {
  try {
    const filename = params.file.join('/');
    // Support UPLOAD_DIR for custom external paths, fallback to public/uploads
    const uploadsDir = process.env.UPLOAD_DIR || path.join(process.cwd(), "public", "uploads");
    const filePath = path.join(uploadsDir, filename);

    // Basic security check to prevent directory traversal
    if (!filePath.startsWith(uploadsDir)) {
      return new NextResponse('Forbidden', { status: 403 });
    }

    const fileBuffer = await readFile(filePath);
    
    // Determine content type based on extension
    const ext = path.extname(filename).toLowerCase();
    let contentType = 'application/octet-stream';
    
    switch (ext) {
      case '.png': contentType = 'image/png'; break;
      case '.jpg':
      case '.jpeg': contentType = 'image/jpeg'; break;
      case '.gif': contentType = 'image/gif'; break;
      case '.svg': contentType = 'image/svg+xml'; break;
      case '.webp': contentType = 'image/webp'; break;
    }

    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000, immutable', // Cache for 1 year
      },
    });
  } catch (error) {
    return new NextResponse('File not found', { status: 404 });
  }
}
