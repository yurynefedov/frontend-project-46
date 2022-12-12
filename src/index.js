import fs from 'fs';
import path from 'path';
import parseFileData from './parsers.js';
import buildDiffTree from './diff-tree.js';
import render from './formatters/index.js';

const getPathToFile = (filepath) => path.resolve(process.cwd(), filepath).trim();
const readFileData = (filepath) => fs.readFileSync(getPathToFile(filepath), 'utf-8');
const getExtention = (filepath) => path.extname(filepath).toLowerCase();

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const data1 = parseFileData(readFileData(filepath1), getExtention(filepath1));
  const data2 = parseFileData(readFileData(filepath2), getExtention(filepath2));
  const diffTree = buildDiffTree(data1, data2);

  return render(diffTree, format);
};

export default genDiff;
