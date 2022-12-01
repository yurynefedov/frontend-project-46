import _ from 'lodash';
import parseFileData from './parsers.js';

const getDiffData = (filepath1, filepath2) => {
  const data1 = parseFileData(filepath1);
  const data2 = parseFileData(filepath2);

  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);

  const keys = _.sortBy(_.union(keys1, keys2));

  const diffData = keys.map((key) => {
    const initialValue = data1[key];
    const amendedValue = data2[key];

    switch (true) {
      case (!_.has(data1, key) && _.has(data2, key)):

        return { key, value: data2[key], status: 'added' };

      case (_.has(data1, key) && !_.has(data2, key)):

        return { key, value: data1[key], status: 'deleted' };

      case (_.has(data1, key) && _.has(data2, key)):

        if (initialValue === amendedValue) {
          return { key, value: initialValue, status: 'unmodified' };
        }

        return {
          key, initialValue, amendedValue, status: 'modified',
        };

      default:
        throw new Error(`Unknown state of property '${key}'`);
    }
  });

  return diffData;
};

const genDiff = (filepath1, filepath2) => {
  const diffData = getDiffData(filepath1, filepath2);

  const result = [];
  diffData.forEach((data) => {
    const {
      key,
      value,
      initialValue,
      amendedValue,
      status,
    } = data;

    switch (status) {
      case 'added':
        result.push(`  + ${key}: ${value}`);
        break;
      case 'deleted':
        result.push(`  - ${key}: ${value}`);
        break;
      case 'unmodified':
        result.push(`    ${key}: ${value}`);
        break;
      case 'modified':
        result.push(`  - ${key}: ${initialValue}`);
        result.push(`  + ${key}: ${amendedValue}`);
        break;
      default:
        throw new Error(`Unknown status for property '${key}'`);
    }
  });

  return `{\n${result.join('\n')}\n}`;
};

export default genDiff;
