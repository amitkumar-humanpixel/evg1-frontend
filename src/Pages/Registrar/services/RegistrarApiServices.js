import ApiService from '../../../services/ApiServices';
import { REGISTRAR_URLS } from '../../../constants/URLConstants';

const RegistrarApiServices = {
  getRegistrarList: params => ApiService.getData(REGISTRAR_URLS.GET_REGISTRAR_LIST, { params }),
  uploadRegistrarCSVFile: (data, config) => ApiService.postData(REGISTRAR_URLS.UPLOAD_REGISTRAR_CSV, data, config),
};

export default RegistrarApiServices;
