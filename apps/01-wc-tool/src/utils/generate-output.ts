import { Metrics } from './get-metrics';

// Function to generate the output string based on the options provided.
export const generateOutput = (metrics: Metrics, options: string[]): string => {
  let output = '';
  if (options.includes('-l'))
    output += metrics.lines.toString().padStart(8, ' '); // Add line count to output if -l option is present.
  if (options.includes('-w'))
    output += metrics.words.toString().padStart(8, ' '); // Add word count to output if -w option is present.

  // Handle the case where both -c and -m options are present.
  if (options.includes('-c') && options.includes('-m')) {
    if (options.indexOf('-c') > options.indexOf('-m')) {
      output += metrics.bytes.toString().padStart(8, ' ');
    } else {
      output += metrics.chars.toString().padStart(8, ' ');
    }
  } else if (options.includes('-c')) {
    output += metrics.bytes.toString().padStart(8, ' '); // Add byte count to output if -c option is present.
  } else if (options.includes('-m')) {
    output += metrics.chars.toString().padStart(8, ' '); // Add character count to output if -m option is present.
  }
  return output;
};
