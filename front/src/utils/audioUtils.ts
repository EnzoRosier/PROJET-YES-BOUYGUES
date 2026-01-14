// Utility to resolve a playable audio file based on browser support
export const extToMime: Record<string, string> = {
  mp3: 'audio/mpeg',
  m4a: 'audio/mp4',
  mp4: 'audio/mp4',
  ogg: 'audio/ogg',
  wav: 'audio/wav',
  webm: 'audio/webm',
};

export function resolvePlayableAudioPath(originalPath: string): string | null {
  if (typeof document === 'undefined') return originalPath; // SSR guard
  try {
    const audioTest = document.createElement('audio');
    if (!audioTest.canPlayType) return originalPath;

    // Determine base path (without extension) and current ext
    const match = originalPath.match(/(.+?)((?:\.[^./\\]+)?)$/);
    const base = match ? match[1] : originalPath;
    const currentExt = (match && match[2]) ? match[2].replace(/^\./, '').toLowerCase() : '';

    // Order of preference: original ext first (if present), then common fallbacks
    const tried: string[] = [];
    const candidates: string[] = [];

    if (currentExt) candidates.push(`${base}.${currentExt}`);

    const fallbacks = ['mp3','m4a','ogg','wav','webm','mp4'];
    for (const f of fallbacks) {
      const p = `${base}.${f}`;
      if (!candidates.includes(p)) candidates.push(p);
    }

    for (const p of candidates) {
      const ext = p.split('.').pop() || '';
      const mime = extToMime[ext] || `audio/${ext}`;
      tried.push(`${p} (${mime})`);
      const can = audioTest.canPlayType(mime);
      if (can === 'probably' || can === 'maybe') {
        return p;
      }
    }

    // If nothing reported as playable, return null to allow fallback (speechSynthesis)
    console.warn('No playable audio codec detected for', originalPath, 'tried:', tried.join(', '));
    return null;
  } catch (err) {
    console.error('Failed to resolve playable audio path:', err);
    return originalPath;
  }
}

// Return candidate paths (original ext first, then fallbacks)
export function getCandidateAudioPaths(originalPath: string): string[] {
  const match = originalPath.match(/(.+?)((?:\.[^./\\]+)?)$/);
  const base = match ? match[1] : originalPath;
  const currentExt = (match && match[2]) ? match[2].replace(/^\./, '').toLowerCase() : '';
  const candidates: string[] = [];
  if (currentExt) candidates.push(`${base}.${currentExt}`);
  const fallbacks = ['mp3','m4a','ogg','wav','webm','mp4'];
  for (const f of fallbacks) {
    const p = `${base}.${f}`;
    if (!candidates.includes(p)) candidates.push(p);
  }
  return candidates;
}

// Asynchronously probe candidates by creating an audio element and waiting for 'canplay'/'error' or timeout
export async function findPlayableAudio(originalPath: string, timeoutMs = 2500): Promise<string | null> {
  if (typeof document === 'undefined') return null;
  try {
    const audioTest = document.createElement('audio');
    const candidates = getCandidateAudioPaths(originalPath);

    for (const p of candidates) {
      // Quick canPlayType check first to skip obviously unsupported mime types
      const ext = (p.split('.').pop() || '').toLowerCase();
      const mime = extToMime[ext] || `audio/${ext}`;
      const can = audioTest.canPlayType ? audioTest.canPlayType(mime) : '';
      if (can !== 'probably' && can !== 'maybe') {
        // skip this candidate
        continue;
      }

      // Probe the resource by setting src and waiting briefly for canplay or error
      let resolved = false;
      const probe = new Promise<boolean>((resolve) => {
        const a = document.createElement('audio');
        const onCan = () => { cleanup(); resolve(true); };
        const onErr = () => { cleanup(); resolve(false); };
        const cleanup = () => {
          a.removeEventListener('canplay', onCan);
          a.removeEventListener('canplaythrough', onCan);
          a.removeEventListener('error', onErr);
        };
        a.addEventListener('canplay', onCan);
        a.addEventListener('canplaythrough', onCan);
        a.addEventListener('error', onErr);
        try {
          a.src = p;
          // Start loading
          a.load();
        } catch (e) {
          cleanup();
          resolve(false);
        }
        // Timeout fallback
        setTimeout(() => { cleanup(); resolve(false); }, timeoutMs);
      });

      try {
        resolved = await probe;
      } catch (err) {
        resolved = false;
      }

      if (resolved) {
        return p;
      }
    }

    console.warn('No playable audio found for', originalPath, 'after probing candidates');
    return null;
  } catch (err) {
    console.error('Error during audio probing:', err);
    return null;
  }
}
