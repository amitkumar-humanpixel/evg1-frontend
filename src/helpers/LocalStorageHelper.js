export const AUTH_VARIABLES = {
  AUTH_TOKEN: null,
};

export const saveAuthTokenToLocalStorage = authToken => {
  localStorage.setItem('okta-token-storage', authToken);
  AUTH_VARIABLES.AUTH_TOKEN = authToken;
};

export const getAuthTokenFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem('okta-token-storage'));
};

export const clearAuthTokenFromLocalStorage = () => {
  AUTH_VARIABLES.AUTH_TOKEN = null;
  localStorage.removeItem('okta-token-storage');
};
