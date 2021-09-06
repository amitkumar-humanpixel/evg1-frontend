import { FACILITY_REDUX_CONSTANTS } from './FacilityReduxConstants';

const facilityInitialReducer = {
  facilityList: {},
  facilityUserList: {},
};

export const facilityReducer = (state = facilityInitialReducer, action) => {
  switch (action.type) {
    case FACILITY_REDUX_CONSTANTS.FACILITY_LIST:
      return {
        ...state,
        facilityList: action?.data,
      };

    case FACILITY_REDUX_CONSTANTS.FACILITY_USER_LIST:
      return {
        ...state,
        facilityUserList: action?.data,
      };

    default:
      return state;
  }
};
