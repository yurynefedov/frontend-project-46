import path from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';
import expectedData from '../__fixtures__/test-data/expected.js';
import expectedDataStylish from '../__fixtures__/test-data/nested/expected-stylish.js';
import expectedDataPlain from '../__fixtures__/test-data/nested/expected-plain.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getPathToFixturesFiles = (filename) => path.join(__dirname, '..', '__fixtures__', 'files', filename);

const jsonFile1 = getPathToFixturesFiles('file1.json');
const jsonFile2 = getPathToFixturesFiles('file2.json');

const yamlFile1 = getPathToFixturesFiles('file1.yaml');
const yamlFile2 = getPathToFixturesFiles('file2.yaml');

const jsonNested1 = getPathToFixturesFiles('nested1.json');
const jsonNested2 = getPathToFixturesFiles('nested2.json');

const yamlNested1 = getPathToFixturesFiles('nested1.yaml');
const yamlNested2 = getPathToFixturesFiles('nested2.yaml');

test('Get difference of two plain json files', () => {
  const receivedData = genDiff(jsonFile1, jsonFile2);
  expect(receivedData).toEqual(expectedData);
});

test('Get difference of two plain yaml files', () => {
  const receivedData = genDiff(yamlFile1, yamlFile2);
  expect(receivedData).toEqual(expectedData);
});

test('Get difference of two nested json files, stylish format', () => {
  const receivedData = genDiff(jsonNested1, jsonNested2, 'stylish');
  expect(receivedData).toEqual(expectedDataStylish);
});

test('Get difference of two nested yaml files, stylish format', () => {
  const receivedData = genDiff(yamlNested1, yamlNested2, 'stylish');
  expect(receivedData).toEqual(expectedDataStylish);
});

test('Get difference of two nested json files, plain format', () => {
  const receivedData = genDiff(jsonNested1, jsonNested2, 'plain');
  expect(receivedData).toEqual(expectedDataPlain);
});

test('Get difference of two nested yaml files, plain format', () => {
  const receivedData = genDiff(yamlNested1, yamlNested2, 'plain');
  expect(receivedData).toEqual(expectedDataPlain);
});
