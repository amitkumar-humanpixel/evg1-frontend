import { ADD_SUPERVISOR_REDUX_CONSTANTS } from './AddSupervisorReduxConstants';
import { addSupervisorApiServices } from '../services/AddSupervisorApiServices';
import { successNotification } from '../../../components/common/NotifyToaster';
import { displayErrors } from '../../../helpers/ErrorHelper';
import {
  startGeneralLoaderOnRequest,
  stopGeneralLoaderOnSuccessOrFail,
} from '../../../components/GeneralLoader/redux/GeneralLoaderAction';

export const updateAddSupervisorDetails = (name, value) => {
  return dispatch => {
    dispatch({
      type: ADD_SUPERVISOR_REDUX_CONSTANTS.UPDATE_ADD_SUPERVISOR_FORM_FIELDS,
      name,
      value,
    });
  };
};

export const resetAddSupervisorData = () => {
  return dispatch => {
    dispatch({
      type: ADD_SUPERVISOR_REDUX_CONSTANTS.RESET_ADD_SUPERVISOR_DETAILS,
    });
  };
};

export const AddNewSupervisorDetails = (userId, data) => {
  return async () => {
    try {
      startGeneralLoaderOnRequest('addNewSupervisorLoader');
      const response = await addSupervisorApiServices.addNewSupervisorDetails(userId, data);
      if (response?.data?.status === 'SUCCESS') {
        successNotification(response?.data?.message ?? 'Supervisor added successfully.');
        stopGeneralLoaderOnSuccessOrFail('addNewSupervisorLoader');
      }
    } catch (e) {
      stopGeneralLoaderOnSuccessOrFail('addNewSupervisorLoader');
      displayErrors(e);
    }
  };
};
