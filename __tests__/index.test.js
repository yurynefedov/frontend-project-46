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

  expect(genDiff(path1, path2)).toBe(readFileData('stylish.txt'));
  expect(genDiff(path1, path2, outputFormat)).toBe(readFileData(`${outputFormat}.txt`));
});
