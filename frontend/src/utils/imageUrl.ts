export function getAssetUrl(url: string | undefined | null): string {
  if (!url) return '';
  
  // If absolute external URL or data URI, return as-is
  if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('data:')) {
    return url;
  }

  // If uploaded asset stored in backend
  if (url.startsWith('/uploads/')) {
    const backendBase = (import.meta.env.VITE_API_URL || 'http://localhost:4000/api').replace(/\/api\/?$/, '');
    return `${backendBase}${url}`;
  }

  // Encode spaces for static asset paths (e.g. "/assets/Ruins of Hestia/...")
  return encodeURI(url);
}
