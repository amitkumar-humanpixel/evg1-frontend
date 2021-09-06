import { REGISTRAR_REDUX_CONSTANTS } from './RegistrarReduxConstants';

const registrarInitialReducer = {
  registrarList: {},
};

export const registrarReducer = (state = registrarInitialReducer, action) => {
  switch (action.type) {
    case REGISTRAR_REDUX_CONSTANTS.REGISTRAR_LIST:
      return {
        ...state,
        registrarList: action?.data,
      };

    default:
      return state;
  }
};
