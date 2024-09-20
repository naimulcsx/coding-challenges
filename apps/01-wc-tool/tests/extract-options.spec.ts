import { extractOptions } from '../src/utils/extract-options';

describe('extractOptions', () => {
  it('SHOULD return an empty array when there are 2 or fewer arguments', () => {
    expect(extractOptions([])).toEqual([]);
    expect(extractOptions(['node', 'script.js'])).toEqual([]);
  });

  it('SHOULD return an empty array when the third argument is not an option', () => {
    expect(extractOptions(['node', 'script.js', 'file.txt'])).toEqual([]);
  });

  it('SHOULD extract single options correctly', () => {
    expect(extractOptions(['node', 'script.js', '-l'])).toEqual(['-l']);
    expect(extractOptions(['node', 'script.js', '-w'])).toEqual(['-w']);
    expect(extractOptions(['node', 'script.js', '-c'])).toEqual(['-c']);
  });

  it('SHOULD extract multiple options from a single argument', () => {
    expect(extractOptions(['node', 'script.js', '-lwc'])).toEqual([
      '-l',
      '-w',
      '-c',
    ]);
  });

  it('SHOULD extract options from multiple arguments', () => {
    expect(extractOptions(['node', 'script.js', '-l', '-w', '-c'])).toEqual([
      '-l',
      '-w',
      '-c',
    ]);
  });

  it('should stop extracting options when encountering a non-option argument', () => {
    expect(
      extractOptions(['node', 'script.js', '-l', '-w', 'file.txt', '-c'])
    ).toEqual(['-l', '-w']);
  });

  it('SHOULD handle a mix of single and multiple options', () => {
    expect(extractOptions(['node', 'script.js', '-lw', '-c', '-m'])).toEqual([
      '-l',
      '-w',
      '-c',
      '-m',
    ]);
  });
});
