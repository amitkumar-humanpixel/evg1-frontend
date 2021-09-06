import ApiService from '../../../services/ApiServices';
import { USER_URLS } from '../../../constants/URLConstants';

const UserApiServices = {
  getUserList: params => ApiService.getData(USER_URLS.GET_USER_LIST, { params }),
  uploadUserCSVFile: (data, config) => ApiService.postData(USER_URLS.UPLOAD_USER_CSV, data, config),
};

export default UserApiServices;
