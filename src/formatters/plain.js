import _ from 'lodash';

const normalizeData = (value) => {
  const flatData = _.isString(value) ? `'${value}'` : value;
  return _.isObject(value) ? '[complex value]' : flatData;
};

const renderPlain = (diffTree) => {
  const iter = (node, path) => {
    const lines = node.flatMap((element) => {
      const {
        key,
        value,
        initialValue,
        amendedValue,
        children,
        status,
      } = element;

      const currentPath = path === '' ? `${key}` : `${path}.${key}`;

      switch (status) {
        case 'nested':
          return iter(children, currentPath);
        case 'modified':
          return `Property '${currentPath}' was updated. From ${normalizeData(initialValue)} to ${normalizeData(amendedValue)}`;
        case 'added':
          return `Property '${currentPath}' was added with value: ${normalizeData(value)}`;
        case 'deleted':
          return `Property '${currentPath}' was removed`;
        case 'unmodified':
          return [];
        default:
          throw new Error(`Invalid status '${status}' of property '${key}'`);
      }
    });
    return lines.join('\n');
  };
  return iter(diffTree, '');
};

export default renderPlain;
