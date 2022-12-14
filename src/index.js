import fs from 'fs';
import path from 'path';
import parseData from './parsers.js';
import buildDiffTree from './diff-tree.js';
import render from './formatters/index.js';

const getPathToFile = (filepath) => path.resolve(process.cwd(), filepath).trim();
const readFileData = (filepath) => fs.readFileSync(getPathToFile(filepath), 'utf-8');
const getDataFormat = (filepath) => path.extname(filepath).toLowerCase().slice(1);

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const data1 = parseData(readFileData(filepath1), getDataFormat(filepath1));
  const data2 = parseData(readFileData(filepath2), getDataFormat(filepath2));
  const diffTree = buildDiffTree(data1, data2);

  return render(diffTree, format);
};

export default genDiff;
