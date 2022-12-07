import renderStylish from './stylish.js';
import renderPlain from './plain.js';
import renderJSON from './json.js';

const render = (diffTree, format) => {
  switch (format) {
    case 'stylish':
      return renderStylish(diffTree);
    case 'plain':
      return renderPlain(diffTree);
    case 'json':
      return renderJSON(diffTree);
    default:
      throw new Error(`Sorry, the '${format}' format is not supported`);
  }
};

export default render;
