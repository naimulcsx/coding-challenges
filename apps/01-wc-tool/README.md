# WC Tool

This is a simple word count (wc) tool implemented in TypeScript. It provides functionality similar to the Unix `wc` command, allowing you to count lines, words, bytes, and characters in files or from standard input.

## Building the Application

To build the application, use the following command:

```bash
nx build wc-tool
```

The run the CLI, use the following command:

```bash
node dist/apps/01-wc-tool/main.js apps/01-wc-tool/tests/files/example1.txt
```

You can also pipe the output to the CLI:

```bash
cat apps/01-wc-tool/tests/files/example1.txt | node dist/apps/01-wc-tool/main.js
```

To run the tests, use the following command:

```bash
nx test wc-tool
```
