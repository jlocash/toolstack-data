export const uuidToPath = (uuid, prefix = '/vm/') => {
  return `${prefix}${uuid.replace(/-/g, '_')}`;
};

export const pathToUuid = (path, prefix = '/vm/') => {
  return path.replace(prefix, '').replace(/_/g, '-');
};
