import {
  startGeneralLoaderOnRequest,
  stopGeneralLoaderOnSuccessOrFail,
} from '../../../components/GeneralLoader/redux/GeneralLoaderAction';
import { displayErrors } from '../../../helpers/ErrorHelper';
import { USER_REDUX_CONSTANTS } from './UserReduxConstants';
import UserApiServices from '../services/UserApiServices';
import { successNotification } from '../../../components/common/NotifyToaster';
import { downloadFile } from '../../../helpers/FileDownloaderHelper';

export const getUserList = (params = { page: 1, limit: 15 }) => {
  return async dispatch => {
    try {
      startGeneralLoaderOnRequest('isUserListLoader');
      const response = await UserApiServices.getUserList(params);
      if (response?.data?.status === 'SUCCESS') {
        stopGeneralLoaderOnSuccessOrFail('isUserListLoader');
        dispatch({
          type: USER_REDUX_CONSTANTS.USER_LIST,
          data: response?.data?.data,
        });
      }
    } catch (e) {
      stopGeneralLoaderOnSuccessOrFail('isUserListLoader');
      displayErrors(e);
    }
  };
};

export const uploadUserCSVFile = (data, config) => {
  return async dispatch => {
    try {
      startGeneralLoaderOnRequest('isCSVUploadLoader');
      const response = await UserApiServices.uploadUserCSVFile(data, config);
      if (response?.data?.status === 'SUCCESS') {
        stopGeneralLoaderOnSuccessOrFail('isCSVUploadLoader');
        successNotification(
          `${response?.data?.message} Processed Data:${response?.data?.Data?.processed}` ||
            'CSV uploaded successfully.',
        );
        if (response?.data?.Data?.ErrorData?.length > 0) {
          downloadFile(response?.data?.Data?.ErrorData);
        }
        dispatch(getUserList());
      }
    } catch (e) {
      stopGeneralLoaderOnSuccessOrFail('isCSVUploadLoader');
      displayErrors(e);
      throw Error();
    }
  };
};
