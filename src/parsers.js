import yaml from 'js-yaml';
import fs from 'fs';
import path from 'path';

const getPathToFile = (filepath) => path.resolve(process.cwd(), filepath).trim();
const readFileData = (filepath) => fs.readFileSync(getPathToFile(filepath), 'utf-8');

const parseFileData = (filepath) => {
  const extention = path.extname(filepath).toLowerCase();
  switch (extention) {
    case '.json':
      return JSON.parse(readFileData(filepath));
    case '.yml':
    case '.yaml':
      return yaml.load(readFileData(filepath));
    default:
      throw new Error(`Sorry, the ${extention} extention is not supported`);
  }
};

export default parseFileData;
