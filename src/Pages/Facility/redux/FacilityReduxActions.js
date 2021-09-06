import FacilityApiServices from '../services/FacilityApiServices';
import { FACILITY_REDUX_CONSTANTS } from './FacilityReduxConstants';
import { displayErrors } from '../../../helpers/ErrorHelper';
import {
  startGeneralLoaderOnRequest,
  stopGeneralLoaderOnSuccessOrFail,
} from '../../../components/GeneralLoader/redux/GeneralLoaderAction';
import { successNotification } from '../../../components/common/NotifyToaster';
import { downloadFile } from '../../../helpers/FileDownloaderHelper';

export const getFacilityList = (params = { page: 1, limit: 15 }) => {
  return async dispatch => {
    try {
      startGeneralLoaderOnRequest('isFacilityListLoader');
      const response = await FacilityApiServices.getFacilityList(params);
      if (response?.data?.status === 'SUCCESS') {
        stopGeneralLoaderOnSuccessOrFail('isFacilityListLoader');
        dispatch({
          type: FACILITY_REDUX_CONSTANTS.FACILITY_LIST,
          data: response?.data?.data,
        });
      }
    } catch (e) {
      stopGeneralLoaderOnSuccessOrFail('isFacilityListLoader');
      displayErrors(e);
    }
  };
};

export const getFacilityUsers = facilityId => {
  return async dispatch => {
    try {
      startGeneralLoaderOnRequest('isFacilityUserLoader');
      const response = await FacilityApiServices.getFacilityUserList(facilityId);
      if (response?.data?.status === 'SUCCESS') {
        stopGeneralLoaderOnSuccessOrFail('isFacilityUserLoader');
        dispatch({
          type: FACILITY_REDUX_CONSTANTS.FACILITY_USER_LIST,
          data: response?.data?.data,
        });
      }
    } catch (e) {
      stopGeneralLoaderOnSuccessOrFail('isFacilityUserLoader');
      displayErrors(e);
    }
  };
};

export const resetFacilityUsers = () => {
  return dispatch => {
    dispatch({
      type: FACILITY_REDUX_CONSTANTS.FACILITY_USER_LIST,
      data: {},
    });
  };
};

export const uploadFacilityCSVFile = (data, config) => {
  return async dispatch => {
    try {
      startGeneralLoaderOnRequest('isCSVUploadLoader');
      const response = await FacilityApiServices.uploadFacilityCSVFile(data, config);
      if (response?.data?.status === 'SUCCESS') {
        stopGeneralLoaderOnSuccessOrFail('isCSVUploadLoader');
        successNotification(
          `${response?.data?.message} Processed Data:${response?.data?.Data?.processed}` ||
            'CSV uploaded successfully.',
        );
        if (response?.data?.Data?.ErrorData?.length > 0) {
          downloadFile(response?.data?.Data?.ErrorData);
        }
        dispatch(getFacilityList());
      }
    } catch (e) {
      stopGeneralLoaderOnSuccessOrFail('isCSVUploadLoader');
      displayErrors(e);
      throw Error();
    }
  };
};

export const uploadFacilityStaffCSVFile = (data, config) => {
  return async dispatch => {
    try {
      startGeneralLoaderOnRequest('isCSVUploadLoader');
      const response = await FacilityApiServices.uploadFacilityStaffCSVFile(data, config);
      if (response?.data?.status === 'SUCCESS') {
        stopGeneralLoaderOnSuccessOrFail('isCSVUploadLoader');
        successNotification(
          `${response?.data?.message} Processed Data:${response?.data?.Data?.processed}` ||
            'CSV uploaded successfully.',
        );
        if (response?.data?.Data?.ErrorData?.length > 0) {
          downloadFile(response?.data?.Data?.ErrorData);
        }
        dispatch(getFacilityList());
      }
    } catch (e) {
      stopGeneralLoaderOnSuccessOrFail('isCSVUploadLoader');
      displayErrors(e);
      throw Error();
    }
  };
};
