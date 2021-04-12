export default (obj) => {
  const newObj = {};
  Object.keys(obj).forEach((key) => {
    newObj[key.replace(/-/g, '_')] = obj[key];
  });

  return newObj;
};
