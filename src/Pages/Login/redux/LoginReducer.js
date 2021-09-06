import { LOGIN_REDUX_CONSTANTS } from './LoginReduxConstants';

const initialLoginState = {
  userName: '',
  password: '',
  authStatus: false,
  loggedUserDetails: {},
};

export const loginReducer = (state = initialLoginState, action) => {
  switch (action.type) {
    case LOGIN_REDUX_CONSTANTS.CREDENTIAL_CHANGE:
      return {
        ...state,
        [action.name]: action.value,
      };

    case LOGIN_REDUX_CONSTANTS.AUTH_STATUS_CHANGE:
      return {
        ...state,
        authStatus: action.status,
      };

    case LOGIN_REDUX_CONSTANTS.GET_LOGGED_USER:
      return {
        ...state,
        loggedUserDetails: action?.data,
      };
    default:
      return state;
  }
};
