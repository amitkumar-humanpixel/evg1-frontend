import ApiService from '../../../services/ApiServices';
import { ADD_SUPERVISOR } from '../../../constants/URLConstants';

export const addSupervisorApiServices = {
  addNewSupervisorDetails: (userId, data) =>
    ApiService.postData(`${ADD_SUPERVISOR.ADD_NEW_SUPERVISOR_DETAILS}${userId}`, data),
};
