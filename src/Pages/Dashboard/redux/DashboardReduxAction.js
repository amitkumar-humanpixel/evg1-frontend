import {
  startGeneralLoaderOnRequest,
  stopGeneralLoaderOnSuccessOrFail,
} from '../../../components/GeneralLoader/redux/GeneralLoaderAction';
import DashboardApiServices from '../services/DashboardApiServices';
import { displayErrors } from '../../../helpers/ErrorHelper';
import { DASHBOARD } from './DashboardReduxConstants';

export const getDashboardList = (params = { page: 1, limit: 15 }) => {
  return async dispatch => {
    try {
      startGeneralLoaderOnRequest('isDashboardLoader');
      const response = await DashboardApiServices.getDashboardDetails(params);
      if (response?.data?.status === 'SUCCESS') {
        stopGeneralLoaderOnSuccessOrFail('isDashboardLoader');
        dispatch({
          type: DASHBOARD.GET_DASHBOARD_LIST,
          data: response?.data?.data,
        });
      }
    } catch (e) {
      stopGeneralLoaderOnSuccessOrFail('isDashboardLoader');
      displayErrors(e);
    }
  };
};

export const getDashboardTabs = params => {
  return async () => {
    try {
      startGeneralLoaderOnRequest('isDashboardLoader');
      const response = await DashboardApiServices.getDashboardTabs(params);
      if (response?.data?.status === 'SUCCESS') {
        stopGeneralLoaderOnSuccessOrFail('isDashboardLoader');
        return response?.data?.data ?? [];
      }
    } catch (e) {
      stopGeneralLoaderOnSuccessOrFail('isDashboardLoader');
      displayErrors(e);
      return [];
    }
    return [];
  };
};
