import { ADD_SUPERVISOR_REDUX_CONSTANTS } from './AddSupervisorReduxConstants';

const addSupervisorInitialReducer = {
  firstName: '',
  lastName: '',
  email: '',
  errors: {},
};

export const addSupervisorReducer = (state = addSupervisorInitialReducer, action) => {
  switch (action?.type) {
    case ADD_SUPERVISOR_REDUX_CONSTANTS.UPDATE_ADD_SUPERVISOR_FORM_FIELDS:
      return {
        ...state,
        [action?.name]: action?.value,
      };
    case ADD_SUPERVISOR_REDUX_CONSTANTS.RESET_ADD_SUPERVISOR_DETAILS:
      return {
        ...state,
        firstName: '',
        lastName: '',
        email: '',
        errors: {},
      };
    default:
      return state;
  }
};
