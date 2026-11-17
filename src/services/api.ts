export const API_BASE_URL = "https://api.horigineitsolutions.com/api/v1";

export function buildApiUrl(path: string): string {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  const [routePart, queryPart] = normalizedPath.split("?");
  const normalizedRoute = routePart === "/jobs" ? "/jobs/" : routePart;
  const suffix = queryPart ? `?${queryPart}` : "";

  return `${API_BASE_URL}${normalizedRoute}${suffix}`;
}
