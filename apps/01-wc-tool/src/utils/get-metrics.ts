export interface Metrics {
  lines: number;
  bytes: number;
  chars: number;
  words: number;
}

// Function to perform calculations on the content.
export const calculateMetrics = (content: string): Metrics => {
  const lines = content.split('\n').length - 1; // Count the number of lines.
  const bytes = Buffer.byteLength(content, 'utf-8'); // Count the number of bytes.
  const chars = Array.from(content).length; // Count the number of characters.
  const words = content
    .split('\n')
    .filter((el) => el.length > 0)
    .reduce((prev, curr) => prev + curr.split(' ').length, 0); // Count the number of words.
  return { lines, bytes, chars, words };
};
