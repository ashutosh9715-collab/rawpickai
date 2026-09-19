/**
 * Splits article HTML into N+1 chunks at H2 boundaries.
 * Used to inject inline UI elements (quiz callouts, read-next cards) mid-article
 * without breaking element structure.
 *
 * @param html  Rendered article HTML
 * @param ratios  Fractional positions where to split (0..1). E.g. [0.55, 0.75]
 *                will return 3 chunks: [0..55%], [55..75%], [75..100%].
 *                If there aren't enough H2s to split at all positions, falls back
 *                to returning the full HTML as the first chunk and empty strings
 *                for the rest.
 * @returns  Array of HTML strings, length = ratios.length + 1
 */
export function splitHtmlAtH2(html: string, ratios: number[]): string[] {
  const positions: number[] = [];
  const regex = /<h2\b[^>]*>/gi;
  let match;
  while ((match = regex.exec(html)) !== null) {
    positions.push(match.index);
  }

  // Need at least one H2 per requested split, plus one before the first split
  // (otherwise the first chunk would be empty), so minimum is ratios.length + 2.
  if (positions.length < ratios.length + 2) {
    return [html, ...ratios.map(() => "")];
  }

  // Compute split indices, ensuring strict ordering with no duplicates.
  const splitIdxs: number[] = [];
  for (const ratio of ratios) {
    let idx = Math.floor(positions.length * ratio);
    // Avoid landing on the same H2 as a previous split
    while (splitIdxs.includes(idx) && idx < positions.length - 1) idx++;
    splitIdxs.push(idx);
  }

  const chunks: string[] = [];
  let prevPos = 0;
  for (const idx of splitIdxs) {
    const pos = positions[idx];
    chunks.push(html.slice(prevPos, pos));
    prevPos = pos;
  }
  chunks.push(html.slice(prevPos));
  return chunks;
}
