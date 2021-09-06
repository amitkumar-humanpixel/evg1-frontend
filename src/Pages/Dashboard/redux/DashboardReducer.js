import { DASHBOARD } from './DashboardReduxConstants';

const initialDashboard = {
  dashboard: {},
};

export const dashboard = (state = initialDashboard, action) => {
  switch (action?.type) {
    case DASHBOARD.GET_DASHBOARD_LIST:
      return {
        ...state,
        dashboard: action?.data,
      };

    default:
      return state;
  }
};
