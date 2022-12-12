import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getPathToFixturesFiles = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFileData = (filename) => fs.readFileSync(getPathToFixturesFiles(filename), 'utf-8');

const testData1 = ['json', 'yaml'];

const testData2 = [
  ['json', 'stylish'],
  ['json', 'plain'],
  ['json', 'json'],
  ['yaml', 'stylish'],
  ['yaml', 'plain'],
  ['yaml', 'json'],
];

test.each(testData1)('Get difference of two %s files, default format', (extension) => {
  const path1 = getPathToFixturesFiles(`before.${extension}`);
  const path2 = getPathToFixturesFiles(`after.${extension}`);

  const receivedData = genDiff(path1, path2);
  const expectedData = readFileData('stylish.txt');

  expect(receivedData).toBe(expectedData);
});

test.each(testData2)('Get difference of two %s files, %s format', (extension, outputFormat) => {
  const path1 = getPathToFixturesFiles(`before.${extension}`);
  const path2 = getPathToFixturesFiles(`after.${extension}`);

  const receivedData = genDiff(path1, path2, outputFormat);
  const expectedData = readFileData(`${outputFormat}.txt`);

  expect(receivedData).toBe(expectedData);
});
