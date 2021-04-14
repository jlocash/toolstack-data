const toCamelCase = (s, delim) => {
  let index = s.indexOf(delim);
  let result = s;
  while (index >= 0) {
    result = (
      result.substr(0, index)
      + result.charAt(index + 1).toUpperCase()
      + result.substr(index + 2, result.length)
    );
    index = result.indexOf(delim);
  }

  return result;
};

export default (obj) => {
  const newObj = {};
  Object.keys(obj).forEach((key) => {
    // newObj[key.replace(/-/g, '_')] = obj[key];
    newObj[toCamelCase(key, '-')] = obj[key];
  });

  return newObj;
};
