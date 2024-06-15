package main

import (
	"ccwc/utils"
	"flag"
	"fmt"
	"io"
	"os"
)

func main() {
	// Define command line flags
	linesFlag := flag.Bool("l", false, "Count lines")
	wordsFlag := flag.Bool("w", false, "Count words")
	bytesFlag := flag.Bool("c", false, "Count bytes")
	charsFlag := flag.Bool("m", false, "Count characters")
	flag.Parse() // Parse the flags

	// If no options are provided, use default options (-l, -w, -c)
	if !*linesFlag && !*wordsFlag && !*bytesFlag && !*charsFlag {
		*linesFlag, *wordsFlag, *bytesFlag = true, true, true
	}

	// Collect the selected options into a slice
	var options []string
	if *linesFlag {
		options = append(options, "-l")
	}
	if *wordsFlag {
		options = append(options, "-w")
	}
	if *bytesFlag {
		options = append(options, "-c")
	}
	if *charsFlag {
		options = append(options, "-m")
	}

	// Get the non-flag arguments (file paths)
	args := flag.Args()

	// If no file arguments are provided, read from stdin
	if len(args) == 0 {
		content, err := io.ReadAll(os.Stdin) // Read all input from stdin
		if err != nil {
			fmt.Println("Error reading stdin:", err)
			return
		}
		metrics := utils.CalculateMetrics(string(content)) // Calculate metrics for the input
		output := utils.GenerateOutput(metrics, options)   // Generate output based on selected options
		fmt.Println(output)                                // Print the output
	} else {
		var totalMetrics utils.Metrics // Initialize a totalMetrics struct to accumulate totals

		// Iterate over each file path provided
		for i := 0; i < len(args); i++ {
			filePath := args[i]
			data, err := os.ReadFile(filePath) // Read the file content

			if err != nil { // Handle file read errors
				errorMessage := fmt.Sprintf("ccwc: %s: open: No such file or directory", filePath)
				fmt.Println(errorMessage)
				continue
			}

			content := string(data)
			metrics := utils.CalculateMetrics(content)       // Calculate metrics for the file content
			output := utils.GenerateOutput(metrics, options) // Generate output for the file
			output += " " + filePath                         // Append the file path to the output

			// Accumulate metrics for the total count
			totalMetrics.Lines += metrics.Lines
			totalMetrics.Words += metrics.Words
			totalMetrics.Bytes += metrics.Bytes
			totalMetrics.Chars += metrics.Chars

			fmt.Println(output) // Print the output for the file
		}

		// Generate and print the total output if more than one file was processed
		totalOutput := utils.GenerateOutput(totalMetrics, options) + " total"
		fmt.Println(totalOutput)
	}
}
