import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getPathToFixturesFiles = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFileData = (filename) => fs.readFileSync(getPathToFixturesFiles(filename), 'utf-8');

const testData = [
  ['json', 'stylish'],
  ['json', 'plain'],
  ['json', 'json'],
  ['yaml', 'stylish'],
  ['yaml', 'plain'],
  ['yaml', 'json'],
];

test.each(testData)('Get difference of two %s files, %s format', (extension, outputFormat) => {
  const path1 = getPathToFixturesFiles(`before.${extension}`);
  const path2 = getPathToFixturesFiles(`after.${extension}`);

  // Checking default output format (function call without output format as an argument)
  expect(genDiff(path1, path2)).toBe(readFileData('stylish.txt'));
  // Checking generation of correct json file at reverse conversion
  expect(() => JSON.parse(genDiff(path1, path2, 'json'))).not.toThrow();
  // Checking available output formats
  expect(genDiff(path1, path2, outputFormat)).toBe(readFileData(`${outputFormat}.txt`));
});
