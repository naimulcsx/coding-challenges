/**
 * Extracts options from the command line arguments.
 *
 * @param {string[]} args - The command line arguments.
 * @returns An array of single-character options.
 */
export function extractOptions(args: string[]) {
  if (args.length <= 2) return [];
  // Determine if the first argument (args[2]) is an option or a file.
  // Options start with a hyphen ("-"), while files do not.
  const hasOptions = (args[2] as string).startsWith('-');
  if (!hasOptions) return [];

  // If the first argument is an option, split it into individual options.
  // Remove the leading hyphen before splitting.
  let options = (args[2] as string).split('').splice(1);

  // Process additional arguments to extract more options.
  // Start from index 2 if the first argument is not an option,
  // otherwise start from index 3.
  let i = 3;
  while (i < args.length) {
    const arg = args[i] as string;
    // Stop processing if an argument does not start with a hyphen.
    if (!arg.startsWith('-')) break;
    // Split the argument into individual options and concatenate them.
    options = options.concat(arg.split('').splice(1));
    ++i;
  }

  // Return the collected options.
  return options.map((option) => '-' + option);
}
