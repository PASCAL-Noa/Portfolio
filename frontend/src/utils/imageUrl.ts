export function getAssetUrl(url: string | undefined | null): string {
  if (!url) return '';
  
  // If absolute external URL or data URI, return as-is
  if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('data:')) {
    return url;
  }

  // If uploaded asset stored in backend
  if (url.startsWith('/uploads/')) {
    if (typeof window !== 'undefined') {
      // In production (not localhost), use relative /uploads path directly
      if (window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
        return url;
      }
    }
    const backendBase = (import.meta.env.VITE_API_URL || 'http://localhost:4000/api').replace(/\/api\/?$/, '');
    return `${backendBase}${url}`;
  }

  // Ensure leading slash for local assets
  const normalized = url.startsWith('/') ? url : `/${url}`;

  // Encode spaces for static asset paths (e.g. "/assets/Ruins of Hestia/...")
  return encodeURI(normalized);
}
