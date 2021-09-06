import { LOGIN_REDUX_CONSTANTS } from './LoginReduxConstants';
import { LoginApiServices } from '../services/LoginApiServices';
import { displayErrors } from '../../../helpers/ErrorHelper';

export const onLoginCredentialValueChange = (name, value) => {
  return dispatch => {
    dispatch({
      type: LOGIN_REDUX_CONSTANTS.CREDENTIAL_CHANGE,
      name,
      value,
    });
  };
};

export const getLoggedUserDetails = email => {
  return async dispatch => {
    try {
      const response = await LoginApiServices.getLoggedUserDetails(email);
      if (response?.data?.status === 'SUCCESS') {
        dispatch({
          type: LOGIN_REDUX_CONSTANTS.GET_LOGGED_USER,
          data: response?.data?.data,
        });
      }
      return response?.data?.data;
    } catch (e) {
      displayErrors(e);
    }
    return false;
  };
};

export const changeUserAuthenticationStatus = status => {
  return dispatch => {
    dispatch({
      type: LOGIN_REDUX_CONSTANTS.AUTH_STATUS_CHANGE,
      status,
    });
  };
};
