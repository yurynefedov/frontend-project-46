const stylish = (diffTree) => {
  const result = [];
  diffTree.forEach((data) => {
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

export default stylish;
