export const replaceHiddenCharacters = string => {
  return string?.toString()?.replace(/[\u200c\u200b]/g, '');
};

export const validateEmail = emailAddress => {
  return /.+@.+\.[A-Za-z]+$/.test(emailAddress);
};
