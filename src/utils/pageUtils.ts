// Clamp page number between 1 and max
export function clampPage(page: number, maxPages: number): number {
  return Math.max(1, Math.min(page, maxPages));
}

// Parse page from URL query param
export function getPageFromQuery(
  query: string | string[] | null | undefined,
  maxPages: number
): number {
  const value = Array.isArray(query) ? query[0] : query;
  const page = value ? Number.parseInt(value, 10) : 1;
  return clampPage(Number.isNaN(page) ? 1 : page, maxPages);
}

// Format page range for display
export function formatPageRange(current: number, total: number): string {
  return `${current} / ${total}`;
}
