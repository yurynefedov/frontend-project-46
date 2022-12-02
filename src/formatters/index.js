import stylish from './stylish.js';

const render = (diffTree, format) => {
  switch (format) {
    case 'stylish':
      return stylish(diffTree);
    default:
      throw new Error(`Sorry, the '${format}' format is not supported`);
  }
};

export default render;
