const oktaConfig = {
  issuer: process.env.REACT_APP_ISSUER,
  clientId: process.env.REACT_APP_CLIENT_ID,
  appBaseUrl: process.env.REACT_APP_OCTA_BASE_URI,
  redirectUri: `${process.env.REACT_APP_OCTA_BASE_URI}/callback`,
  loginRedirectionUri: `${process.env.REACT_APP_OCTA_BASE_URI}/callback`,
  logoutRedirectUri: `${process.env.REACT_APP_OCTA_BASE_URI}/login`,
  scopes: ['openid', 'profile', 'email'],
  pkce: true,
  disableHttpsCheck: true,
};
export default oktaConfig;
