import ApiService from '../../../services/ApiServices';
import { DASHBOARD_URLS } from '../../../constants/URLConstants';

const DashboardApiServices = {
  getDashboardDetails: params => ApiService.getData(DASHBOARD_URLS.GET_DASHBOARD_LIST, { params }),
  getDashboardTabs: params => ApiService.getData(DASHBOARD_URLS.GET_DASHBOARD_TABS_STATUS, { params }),
};

export default DashboardApiServices;
