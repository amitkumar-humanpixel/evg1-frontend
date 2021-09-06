import ApiService from '../../../services/ApiServices';
import { LOGIN_URLS } from '../../../constants/URLConstants';

export const LoginApiServices = {
  getLoggedUserDetails: email => ApiService.getData(`${LOGIN_URLS.GET_LOGGED_USER_DETAILS}${email}`),
};
