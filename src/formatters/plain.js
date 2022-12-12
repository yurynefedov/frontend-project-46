import _ from 'lodash';

const stringify = (value) => {
  const flatData = _.isString(value) ? `'${value}'` : String(value);
  return _.isObject(value) ? '[complex value]' : flatData;
};

const renderPlain = (diffTree) => {
  const iter = (node, path) => {
    const lines = node.flatMap((element) => {
      const {
        key, value, initialValue, amendedValue, children, status,
      } = element;

      const currentPath = [...path, key];

      switch (status) {
        case 'nested':
          return iter(children, currentPath);
        case 'modified':
          return `Property '${currentPath.join('.')}' was updated. From ${stringify(initialValue)} to ${stringify(amendedValue)}`;
        case 'added':
          return `Property '${currentPath.join('.')}' was added with value: ${stringify(value)}`;
        case 'deleted':
          return `Property '${currentPath.join('.')}' was removed`;
        case 'unmodified':
          return [];
        default:
          throw new Error(`Invalid status '${status}' of property '${key}'`);
      }
    });
    return lines.join('\n');
  };
  return iter(diffTree, []);
};

export default renderPlain;
