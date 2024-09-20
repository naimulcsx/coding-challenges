import { existsSync, readFileSync } from 'fs';
import { Metrics, calculateMetrics } from './utils/get-metrics';
import { extractOptions } from './utils/extract-options';
import { generateOutput } from './utils/generate-output';

export function myWC(args: string[]) {
  const defaultOptions = ['-l', '-w', '-c']; // Default options if none are provided.
  const allowedOptions = [
    '-l', // Count lines in the input.
    '-w', // Count words in the input.
    '-c', // Count bytes in the input.
    '-m', // Count characters in the input. This option is equivalent to -c in most locales.
  ];

  /**
   * If no file arguments are provided, the program will read from stdin
   * and process it as the input source.
   */
  if (args.length === 2) {
    // Code to handle reading from stdin.
    let content = '';
    process.stdin.on('data', (chunk) => (content += chunk.toString())); // Read data from stdin.
    process.stdin.on('end', () => {
      const metrics = calculateMetrics(content); // Calculate metrics.
      const output = generateOutput(metrics, defaultOptions); // Generate output using default options.
      process.stdout.write(output + '\n'); // Write output to stdout.
    });
  } else {
    // Extract options from the command line arguments.
    let options = extractOptions(args);
    if (options.length === 0) {
      options = defaultOptions; // Use default options if none are provided.
    }

    // Validate options against allowed options.
    for (const option of options) {
      if (!allowedOptions.includes(option)) {
        process.stdout.write(
          `ccwc: illegal option -- ${option.substring(1)}\n`
        );
        process.stdout.write(`usage: ccwc [-clmw] [file ...]\n`);
        process.stdout.end();
        return;
      }
    }

    // Initialize a metrics object to store the total counts for aggregation.
    const total: Metrics = {
      lines: 0,
      bytes: 0,
      chars: 0,
      words: 0,
    };

    let totalFiles = 0; // Counter for the number of processed files.

    // Iterate over the arguments to process files.
    for (let i = 2; i < args.length; ++i) {
      const value = args[i] as string;
      // Skip options (arguments that start with a hyphen).
      if (value.startsWith('-')) continue;
      totalFiles++;

      const path = value;
      // Check if the file exists.
      if (existsSync(path)) {
        // Read the content of the file.
        const content = readFileSync(path, 'utf-8');
        const metrics = calculateMetrics(content); // Calculate metrics for the file.
        let output = generateOutput(metrics, options); // Generate output for the file.

        // Aggregate metrics for the total count.
        total.bytes += metrics.bytes;
        total.chars += metrics.chars;
        total.lines += metrics.lines;
        total.words += metrics.words;

        output += ` ${path}\n`; // Add the file path to the output.
        process.stdout.write(output); // Write output to stdout.
      } else {
        // Output an error message if the file does not exist.
        process.stdout.write(
          `ccwc: ${args[i]}: open: No such file or directory\n`
        );
      }
    }

    // If more than one file was processed, print the total aggregated metrics.
    if (totalFiles > 1) {
      const totalOutput = generateOutput(total, options);
      process.stdout.write(totalOutput + '\n'); // Write output to stdout.
    }
    process.stdout.end();
  }
}

myWC(process.argv);
