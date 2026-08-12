import { readFile } from 'node:fs/promises';
import { isAbsolute, normalize, resolve, sep } from 'node:path';
import { NextResponse } from 'next/server';
import { currentSession } from '@/lib/auth';

/**
 * Serves prototype QA screenshots.
 *
 * Two things matter here: the request must be authenticated, and the path
 * must be confined to the artifacts directory. A screenshot endpoint that
 * accepts an arbitrary path is a file-read primitive, so the resolved path is
 * checked against the root rather than the raw string being pattern-matched.
 */
const ARTIFACT_ROOT = resolve(process.cwd(), '..', '..', 'artifacts', 'prototypes');

export async function GET(request: Request): Promise<NextResponse> {
  if (!(await currentSession())) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  const requested = new URL(request.url).searchParams.get('path') ?? '';
  if (requested.length === 0 || isAbsolute(requested)) {
    return NextResponse.json({ error: 'bad path' }, { status: 400 });
  }

  const resolved = resolve(process.cwd(), '..', '..', normalize(requested));
  if (!resolved.startsWith(ARTIFACT_ROOT + sep)) {
    return NextResponse.json({ error: 'outside the artifact directory' }, { status: 400 });
  }

  try {
    const file = await readFile(resolved);
    return new NextResponse(new Uint8Array(file), {
      headers: { 'content-type': 'image/png', 'cache-control': 'private, max-age=60' },
    });
  } catch {
    return NextResponse.json({ error: 'not found' }, { status: 404 });
  }
}
