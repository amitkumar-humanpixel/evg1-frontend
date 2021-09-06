export const fileNamePrefix = fileName => {
  const file = fileName.split('.');
  return file[0];
};

export const fileNameExtension = fileName => {
  const file = fileName.split('.');
  return file[1];
};
