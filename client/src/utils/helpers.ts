/**
 * Trim the track name
 * @param name
 * @returns {string}
 */
export function trimTrackName(name: string): string {
  const trimmed = name
    .replace(/\[[^)]*\]/, '')
    .replace(' - Single', '')
    .replace(' - EP', '')
    .trim()
  if (trimmed === '') return name
  return trimmed
}
