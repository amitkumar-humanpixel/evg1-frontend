import { USER_REDUX_CONSTANTS } from './UserReduxConstants';

const userInitialReducer = {
  userList: {},
};

export const userReducer = (state = userInitialReducer, action) => {
  switch (action.type) {
    case USER_REDUX_CONSTANTS.USER_LIST:
      return {
        ...state,
        userList: action?.data,
      };

    default:
      return state;
  }
};
