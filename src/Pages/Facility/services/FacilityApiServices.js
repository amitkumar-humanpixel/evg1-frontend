import ApiService from '../../../services/ApiServices';
import { FACILITY_URLS } from '../../../constants/URLConstants';

const FacilityApiServices = {
  getFacilityList: params => ApiService.getData(FACILITY_URLS.GET_FACILITY_LIST, { params }),
  getFacilityUserList: facilityId => ApiService.getData(`${FACILITY_URLS.GET_FACILITY_USER_LIST}${facilityId}`),
  uploadFacilityCSVFile: (data, config) => ApiService.postData(FACILITY_URLS.UPLOAD_FACILITY_CSV, data, config),
  uploadFacilityStaffCSVFile: (data, config) =>
    ApiService.postData(FACILITY_URLS.UPLOAD_FACILITY_STAFF_CSV, data, config),
};

export default FacilityApiServices;
