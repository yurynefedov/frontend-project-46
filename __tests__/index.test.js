import path from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';
import expectedData from '../__fixtures__/test-data/plain-json-expected.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getPathToFixturesFiles = (filename) => path.join(__dirname, '..', '__fixtures__', 'files', filename);

test('Get difference of two json files', () => {
  const file1 = getPathToFixturesFiles('file1.json');
  const file2 = getPathToFixturesFiles('file2.json');
  const receivedData = genDiff(file1, file2);

  expect(receivedData).toEqual(expectedData);
});
