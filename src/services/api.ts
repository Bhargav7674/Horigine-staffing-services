export const API_BASE_URL = import.meta.env.DEV
  ? "/api/v1"
  : "https://horizon-staffing.onrender.com/api/v1";

export function buildApiUrl(path: string): string {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${API_BASE_URL}${normalizedPath}`;
}
