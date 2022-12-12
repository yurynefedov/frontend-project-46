import yaml from 'js-yaml';

const parseFileData = (filedata, extention) => {
  switch (extention) {
    case '.json':
      return JSON.parse(filedata);
    case '.yml':
    case '.yaml':
      return yaml.load(filedata);
    default:
      throw new Error(`Sorry, the '${extention}' extention is not supported`);
  }
};

export default parseFileData;
