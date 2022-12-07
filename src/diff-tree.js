import _ from 'lodash';

const getSortedKeys = (data1, data2) => {
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);
  const sortedKeys = _.sortBy(_.union(keys1, keys2));

  return sortedKeys;
};

const buildDiffTree = (data1, data2) => {
  const keys = getSortedKeys(data1, data2);
  const diffTree = keys.map((key) => {
    const initialValue = data1[key];
    const amendedValue = data2[key];

    switch (true) {
      case _.isObject(initialValue) && _.isObject(amendedValue):
        return { key, children: buildDiffTree(initialValue, amendedValue), status: 'nested' };
      case !_.has(data1, key) && _.has(data2, key):
        return { key, value: data2[key], status: 'added' };
      case _.has(data1, key) && !_.has(data2, key):
        return { key, value: data1[key], status: 'deleted' };
      case _.has(data1, key) && _.has(data2, key):
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
  return diffTree;
};

export default buildDiffTree;
