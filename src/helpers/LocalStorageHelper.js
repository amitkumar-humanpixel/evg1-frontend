export const getAuthTokenFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem('okta-token-storage'));
};

export const clearAuthTokenFromLocalStorage = () => {
  localStorage.removeItem('okta-token-storage');
};

export const clearUserDetailsFromLocalStorage = () => {
  localStorage.removeItem('userDetails');
};
