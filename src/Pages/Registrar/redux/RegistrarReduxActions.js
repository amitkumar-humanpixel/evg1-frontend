import {
  startGeneralLoaderOnRequest,
  stopGeneralLoaderOnSuccessOrFail,
} from '../../../components/GeneralLoader/redux/GeneralLoaderAction';
import { displayErrors } from '../../../helpers/ErrorHelper';
import RegistrarApiServices from '../services/RegistrarApiServices';
import { REGISTRAR_REDUX_CONSTANTS } from './RegistrarReduxConstants';
import { successNotification } from '../../../components/common/NotifyToaster';
import { downloadFile } from '../../../helpers/FileDownloaderHelper';

export const getRegistrarList = (params = { page: 1, limit: 15 }) => {
  return async dispatch => {
    try {
      startGeneralLoaderOnRequest('isRegistrarListLoader');
      const response = await RegistrarApiServices.getRegistrarList(params);
      if (response?.data?.status === 'SUCCESS') {
        stopGeneralLoaderOnSuccessOrFail('isRegistrarListLoader');
        dispatch({
          type: REGISTRAR_REDUX_CONSTANTS.REGISTRAR_LIST,
          data: response?.data?.data,
        });
      }
    } catch (e) {
      stopGeneralLoaderOnSuccessOrFail('isRegistrarListLoader');
      displayErrors(e);
    }
  };
};

export const uploadRegistrarCSVFile = (data, config) => {
  return async dispatch => {
    try {
      startGeneralLoaderOnRequest('isCSVUploadLoader');
      const response = await RegistrarApiServices.uploadRegistrarCSVFile(data, config);
      if (response?.data?.status === 'SUCCESS') {
        stopGeneralLoaderOnSuccessOrFail('isCSVUploadLoader');
        successNotification(
          `${response?.data?.message} Processed Data:${response?.data?.Data?.processed}` ||
            'CSV uploaded successfully.',
        );
        if (response?.data?.Data?.ErrorData?.length > 0) {
          downloadFile(response?.data?.Data?.ErrorData);
        }
        dispatch(getRegistrarList());
      }
    } catch (e) {
      stopGeneralLoaderOnSuccessOrFail('isCSVUploadLoader');
      displayErrors(e);
      throw Error();
    }
  };
};
