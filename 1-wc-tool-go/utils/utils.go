package utils

import (
	"fmt"
	"strings"
)

// Metrics struct holds the counts for lines, bytes, characters, and words.
type Metrics struct {
	Lines int // Number of lines
	Bytes int // Number of bytes
	Chars int // Number of characters
	Words int // Number of words
}

// CalculateMetrics calculates the number of lines, bytes, characters, and words in the given content.
func CalculateMetrics(content string) Metrics {
	metrics := Metrics{
		Lines: strings.Count(content, "\n"), // Count the number of newline characters to get the number of lines
		Bytes: len([]byte(content)),         // Get the length of the byte slice to count bytes
		Chars: len([]rune(content)),         // Get the length of the rune slice to count characters (handles multi-byte characters)
		Words: len(strings.Fields(content)), // Use strings.Fields to split the content by whitespace and count the number of words
	}
	return metrics // Return the calculated metrics
}

// GenerateOutput generates a formatted output string based on the metrics and the provided options.
func GenerateOutput(metrics Metrics, options []string) string {
	output := "" // Initialize an empty string to build the output
	for _, option := range options {
		switch option {
		case "-l": // If the option is to count lines
			output += fmt.Sprintf("%8d", metrics.Lines) // Format the lines count and append to the output
		case "-w": // If the option is to count words
			output += fmt.Sprintf("%8d", metrics.Words) // Format the words count and append to the output
		case "-c": // If the option is to count bytes
			output += fmt.Sprintf("%8d", metrics.Bytes) // Format the bytes count and append to the output
		case "-m": // If the option is to count characters
			output += fmt.Sprintf("%8d", metrics.Chars) // Format the characters count and append to the output
		}
	}
	return output // Return the generated output string
}
