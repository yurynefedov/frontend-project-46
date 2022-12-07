import parseFileData from './parsers.js';
import buildDiffTree from './diff-tree.js';
import render from './formatters/index.js';

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const data1 = parseFileData(filepath1);
  const data2 = parseFileData(filepath2);
  const diffTree = buildDiffTree(data1, data2);

  return render(diffTree, format);
};

export default genDiff;
