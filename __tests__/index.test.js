import path from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';
import expectedDataPlain from '../__fixtures__/test-data/plain-expected.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getPathToFixturesFiles = (filename) => path.join(__dirname, '..', '__fixtures__', 'files', filename);

const jsonFile1 = getPathToFixturesFiles('file1.json');
const jsonFile2 = getPathToFixturesFiles('file2.json');

const yamlFile1 = getPathToFixturesFiles('file1.yaml');
const yamlFile2 = getPathToFixturesFiles('file2.yaml');

test('Get difference of two plain json files', () => {
  const receivedData = genDiff(jsonFile1, jsonFile2);
  expect(receivedData).toEqual(expectedDataPlain);
});

test('Get difference of two plain yaml files', () => {
  const receivedData = genDiff(yamlFile1, yamlFile2);
  expect(receivedData).toEqual(expectedDataPlain);
});
