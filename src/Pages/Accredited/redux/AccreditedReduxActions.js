import { ACCREDITED_REDUX_CONSTANTS } from './AccreditedReduxConstants';
import { AccreditedApiServices } from '../services/AccreditedApiServices';
import { successNotification } from '../../../components/common/NotifyToaster';
import { displayErrors } from '../../../helpers/ErrorHelper';
import {
  startGeneralLoaderOnRequest,
  stopGeneralLoaderOnSuccessOrFail,
} from '../../../components/GeneralLoader/redux/GeneralLoaderAction';
import { updateAddSupervisorDetails } from '../../AddSupervisor/redux/AddSupervisorReduxActions';

export const changeAccreditionIdAndFacilityIdForAccreditionRedirection = (facilityId, userId, accreditionId) => {
  return dispatch => {
    dispatch({
      type: ACCREDITED_REDUX_CONSTANTS.CHANGE_ACCREDITION_DETAIL_AND_STEPPER_ID,
      facilityId,
      userId,
      accreditionId,
    });
  };
};

export const changeAccreditionIdForAccreditionRedirection = accreditionId => {
  return dispatch => {
    dispatch({
      type: ACCREDITED_REDUX_CONSTANTS.CHANGE_ACCREDITION_DETAIL_STEPPER_ID,
      accreditionId,
    });
  };
};

export const getAccreditedSteps = accreditationId => {
  return async dispatch => {
    try {
      startGeneralLoaderOnRequest('accreditedLoader');
      const response = await AccreditedApiServices.getAccreditedSteps(accreditationId);
      if (response?.data?.status === 'SUCCESS') {
        dispatch({
          type: ACCREDITED_REDUX_CONSTANTS.GET_ACCREDITED_STEPPER,
          data: response?.data?.data,
        });
        dispatch(updateAddSupervisorDetails('practiceName', response?.data?.data?.accreditionName));
        stopGeneralLoaderOnSuccessOrFail('accreditedLoader');
      }
    } catch (e) {
      stopGeneralLoaderOnSuccessOrFail('accreditedLoader');
      displayErrors(e);
    }
  };
};

export const updateAccreditedFields = (formName, fieldName, fieldValue) => {
  return dispatch => {
    dispatch({
      type: ACCREDITED_REDUX_CONSTANTS.UPDATE_FORM_FIELDS,
      formName,
      fieldName,
      fieldValue,
    });
  };
};

export const updateAccreditedSubFormFields = (formName, subFormName, fieldName, fieldValue) => {
  return dispatch => {
    dispatch({
      type: ACCREDITED_REDUX_CONSTANTS.UPDATE_SUB_FORM_FIELDS,
      formName,
      subFormName,
      fieldName,
      fieldValue,
    });
  };
};

export const updateAccreditedSubFormArrayFields = (formName, subFormName, UID, fieldName, fieldValue) => {
  return dispatch => {
    dispatch({
      type: ACCREDITED_REDUX_CONSTANTS.UPDATE_SUB_FORM_ARRAY_FIELDS,
      formName,
      subFormName,
      UID,
      fieldName,
      fieldValue,
    });
  };
};

export const updateAccreditedSubFormDataArrayFields = (
  formName,
  subFormName,
  UID,
  subFormField,
  fieldName,
  fieldValue,
) => {
  return dispatch => {
    dispatch({
      type: ACCREDITED_REDUX_CONSTANTS.UPDATE_SUB_FORM_DATA_ARRAY_FIELDS,
      formName,
      subFormName,
      UID,
      subFormField,
      fieldName,
      fieldValue,
    });
  };
};

export const uploadAccreditedFormAFile = (existFiles, data, config, formName, subFormName, index, id) => {
  return async dispatch => {
    try {
      const response = await AccreditedApiServices.uploadFormAFile(id, data, config);
      if (response?.data?.status === 'SUCCESS' && response?.data?.data) {
        successNotification(response?.data?.message || 'file uploaded successfully');
        const fileData = [...existFiles, ...response?.data?.data?.filePath];
        if (formName === 'formA') {
          dispatch(updateAccreditedSubFormArrayFields(formName, subFormName, index, 'filePath', fileData));
          dispatch(updateAccreditedSubFormArrayFields(formName, subFormName, index, '_id', response?.data?.data?._id));
        }
      }
    } catch (e) {
      displayErrors(e);
      throw Error();
    }
  };
};
export const uploadAccreditedFormA1File = (
  existFiles,
  data,
  config,
  formName,
  subFormName,
  index,
  subFormField,
  id,
) => {
  return async dispatch => {
    try {
      const response = await AccreditedApiServices.uploadFormA1File(id, data, subFormName, config);
      if (response?.data?.status === 'SUCCESS' && response?.data?.data) {
        successNotification(response?.data?.message || 'file uploaded successfully');
        const fileData = [...existFiles, ...response?.data?.data?.filePath];
        if (formName === 'formA1') {
          dispatch(
            updateAccreditedSubFormDataArrayFields(formName, subFormName, index, subFormField, 'filePath', fileData),
          );
          dispatch(
            updateAccreditedSubFormDataArrayFields(
              formName,
              subFormName,
              index,
              subFormField,
              '_id',
              response?.data?.data?._id,
            ),
          );
        }
      }
    } catch (e) {
      displayErrors(e);
      throw Error();
    }
  };
};

// reAccredited checkbox

// export const getReAccreditedCheckList = id => {
//   return async dispatch => {
//     try {
//       const response = await AccreditedApiServices.reAccreditedCheckbox.getReAccreditedCheckListData(id);
//       if (response?.data?.status === 'SUCCESS') {
//         dispatch({
//           type: ACCREDITED_REDUX_CONSTANTS.RE_ACCREDITED_CHECKBOX.GET_RE_ACCREDITED_CHECKBOX_DETAILS,
//           data: response?.data?.data,
//         });
//       }
//     } catch (e) {
//       displayErrors(e);
//     }
//   };
// };
// unused

export const saveReAccreditedCheckList = (data, accreditationId) => {
  return async dispatch => {
    try {
      const response = await AccreditedApiServices.reAccreditedCheckbox.saveReAccreditedAccreditedChecklistDetails(
        data,
      );
      if (response?.data?.status === 'SUCCESS') {
        successNotification(response?.data?.message || 'Re-Accreditation checklist updated successfully');
        dispatch(getAccreditedSteps(accreditationId));
      }
    } catch (e) {
      displayErrors(e);
      throw Error();
    }
  };
};

// post details

export const getPracticeManagersForPostDetails = id => {
  return async dispatch => {
    try {
      const response = await AccreditedApiServices.getPracticeManagerForPostDetails(id);
      if (response?.data?.status === 'SUCCESS') {
        dispatch({
          type: ACCREDITED_REDUX_CONSTANTS.POST_DETAILS.GET_PRACTICE_MANAGERS_POST_DETAILS,
          data: response?.data?.data,
        });
      }
    } catch (e) {
      displayErrors(e);
    }
  };
};

export const getPostDetails = id => {
  return async dispatch => {
    try {
      const response = await AccreditedApiServices.getAccreditedPostDetails(id);
      if (response?.data?.status === 'SUCCESS') {
        dispatch({
          type: ACCREDITED_REDUX_CONSTANTS.POST_DETAILS.GET_POST_DETAILS,
          data: response?.data?.data,
        });
      }
    } catch (e) {
      displayErrors(e);
    }
  };
};

export const saveAccreditedPostDetails = (data, accreditationId, isNextClick) => {
  return async dispatch => {
    try {
      const response = await AccreditedApiServices.saveAccreditedPostDetails(data);
      if (response?.data?.status === 'SUCCESS') {
        successNotification('Post details updated successfully');
        if (isNextClick) dispatch(getAccreditedSteps(accreditationId));
        else {
          dispatch({
            type: ACCREDITED_REDUX_CONSTANTS.POST_DETAILS.UPDATE_POST_DETAILS_COPY_DATA,
          });
        }
      }
    } catch (e) {
      displayErrors(e);
      throw Error();
    }
    return false;
  };
};

// form A

// form A => practice manager
export const getPracticeManagerDetails = id => {
  return async dispatch => {
    try {
      const response = await AccreditedApiServices.formAApiServices.getAccreditedPracticeManagerDetails(id);
      if (response?.data?.status === 'SUCCESS') {
        dispatch({
          type: ACCREDITED_REDUX_CONSTANTS.FORM_A.GET_PRACTICE_MANAGER_DETAILS,
          data: response?.data?.data,
        });
      }
    } catch (e) {
      displayErrors(e);
    }
  };
};

export const getPracticeManagersList = facilityId => {
  return async dispatch => {
    try {
      const response = await AccreditedApiServices.formAApiServices.getPracticeManagers(facilityId);
      if (response?.data?.status === 'SUCCESS') {
        dispatch({
          type: ACCREDITED_REDUX_CONSTANTS.FORM_A.GET_PRACTICE_MANAGERS,
          data: response?.data?.data,
        });
      }
    } catch (e) {
      displayErrors(e);
    }
  };
};

export const updatePracticeManagerTimings = (day, fieldName, fieldValue) => {
  return dispatch => {
    dispatch({
      type: ACCREDITED_REDUX_CONSTANTS.FORM_A.UPDATE_PRACTICE_MANAGER_TIMING,
      day,
      fieldName,
      fieldValue,
    });
  };
};

export const saveAccreditedPracticeManagerDetails = (id, data, accreditationId, isNextClick) => {
  return async dispatch => {
    try {
      const response = await AccreditedApiServices.formAApiServices.saveAccreditedPracticeManagerDetails(id, data);
      if (response?.data?.status === 'SUCCESS') {
        successNotification('Practice manager details updated successfully');
        if (isNextClick) dispatch(getAccreditedSteps(accreditationId));
        else {
          dispatch({
            type: ACCREDITED_REDUX_CONSTANTS.FORM_A.UPDATE_PRACTICE_MANAGER_COPY_DATA,
          });
        }
      }
    } catch (e) {
      displayErrors(e);
      throw Error();
    }
  };
};

// standard

export const getFormAStandardDetails = id => {
  return async dispatch => {
    try {
      const response = await AccreditedApiServices.formAApiServices.getAccreditedStandardDetails(id);
      if (response?.data?.status === 'SUCCESS') {
        dispatch({
          type: ACCREDITED_REDUX_CONSTANTS.FORM_A.GET_STANDARD_DETAILS,
          data: response?.data?.data,
        });
      }
    } catch (e) {
      displayErrors(e);
    }
  };
};

export const saveAccreditedStandardDetails = (id, data, accreditationId, isNextClick) => {
  return async dispatch => {
    try {
      const response = await AccreditedApiServices.formAApiServices.saveAccreditedStandardDetails(id, data);
      if (response?.data?.status === 'SUCCESS') {
        successNotification(response?.data?.message || 'Standard details updated successfully');
        if (isNextClick) dispatch(getAccreditedSteps(accreditationId));
        else {
          dispatch({
            type: ACCREDITED_REDUX_CONSTANTS.FORM_A.UPDATE_STANDARD_COPY_DATA,
          });
        }
      }
    } catch (e) {
      displayErrors(e);
      throw Error();
    }
  };
};

export const downloadFileFromStandards = async fileName => {
  try {
    const response = await AccreditedApiServices.formAApiServices.downloadAccreditedStandardFile(fileName);
    if (response) {
      return response;
    }
  } catch (e) {
    displayErrors(e);
    return false;
  }
  return false;
};

export const deleteFileFromStandards = (index, data, files) => {
  return async dispatch => {
    try {
      const response = await AccreditedApiServices.formAApiServices.deleteFormAStandardsFile(data);
      if (response?.data?.status === 'SUCCESS') {
        successNotification(response?.data?.message ?? 'File deleted successfully');
        dispatch(updateAccreditedSubFormArrayFields('formA', 'standards', index, 'filePath', files));
      }
    } catch (e) {
      displayErrors(e);
    }
  };
};

// supervisor
export const getSupervisorData = id => {
  return async dispatch => {
    try {
      const response = await AccreditedApiServices.formAApiServices.getSupervisorData(id);
      if (response?.data?.status === 'SUCCESS') {
        dispatch({
          type: ACCREDITED_REDUX_CONSTANTS.FORM_A.GET_SUPERVISOR_DATA,
          data: response?.data?.data,
        });
      }
    } catch (e) {
      displayErrors(e);
    }
  };
};

export const getSupervisorList = facilityId => {
  return async dispatch => {
    try {
      const response = await AccreditedApiServices.formAApiServices.getSuperVisors(facilityId);
      if (response?.data?.status === 'SUCCESS') {
        dispatch({
          type: ACCREDITED_REDUX_CONSTANTS.FORM_A.GET_SUPERVISORS,
          data: response?.data?.data,
        });
      }
    } catch (e) {
      displayErrors(e);
    }
  };
};

export const deleteSupervisorDetail = (id, userId) => {
  return async () => {
    try {
      startGeneralLoaderOnRequest('deleteSupervisorButtonLoader');
      const response = await AccreditedApiServices.formAApiServices.deleteSupervisorData(id, userId);
      if (response?.data?.status === 'SUCCESS') {
        stopGeneralLoaderOnSuccessOrFail('deleteSupervisorButtonLoader');
        return true;
      }
    } catch (e) {
      stopGeneralLoaderOnSuccessOrFail('deleteSupervisorButtonLoader');
      displayErrors(e);
    }
    return false;
  };
};

export const addNewSupervisor = () => {
  return dispatch => {
    dispatch({
      type: ACCREDITED_REDUX_CONSTANTS.FORM_A.ADD_SUPERVISOR,
    });
  };
};

export const updateSupervisorTimings = (index, fieldFor, day, fieldName, fieldValue) => {
  return dispatch => {
    dispatch({
      type: ACCREDITED_REDUX_CONSTANTS.FORM_A.UPDATE_SUPERVISOR_TIMINGS,
      index,
      fieldFor,
      day,
      fieldName,
      fieldValue,
    });
  };
};

export const deleteSupervisorFromList = index => {
  return dispatch => {
    dispatch({
      type: ACCREDITED_REDUX_CONSTANTS.FORM_A.DELETE_SUPERVISOR,
      index,
    });
  };
};

export const saveAccreditedSupervisorDetails = (id, data, accreditationId, isNextClick) => {
  return async dispatch => {
    try {
      const response = await AccreditedApiServices.formAApiServices.saveAccreditedSupervisorDetails(id, data);
      if (response?.data?.status === 'SUCCESS') {
        successNotification(response?.data?.message || 'Supervisor details updated successfully.');
        if (isNextClick) dispatch(getAccreditedSteps(accreditationId));
        else {
          dispatch({
            type: ACCREDITED_REDUX_CONSTANTS.FORM_A.UPDATE_SUPERVISOR_COPY_DATA,
          });
        }
      }
    } catch (e) {
      displayErrors(e);
      throw Error();
    }
  };
};

// registrar

export const getRegistrarData = id => {
  return async dispatch => {
    try {
      const response = await AccreditedApiServices.formAApiServices.getRegistrarData(id);
      if (response?.data?.status === 'SUCCESS') {
        dispatch({
          type: ACCREDITED_REDUX_CONSTANTS.FORM_A.GET_REGISTRAR_DATA,
          data: response?.data?.data,
        });
      }
    } catch (e) {
      displayErrors(e);
    }
  };
};

export const updateRegistrarTimings = (index, fieldFor, day, fieldName, fieldValue) => {
  return dispatch => {
    dispatch({
      type: ACCREDITED_REDUX_CONSTANTS.FORM_A.UPDATE_REGISTRAR_TIMING,
      index,
      fieldFor,
      day,
      fieldName,
      fieldValue,
    });
  };
};

export const getRegistrarsList = facilityId => {
  return async dispatch => {
    try {
      const response = await AccreditedApiServices.formAApiServices.getRegistrars(facilityId);
      if (response?.data?.status === 'SUCCESS') {
        dispatch({
          type: ACCREDITED_REDUX_CONSTANTS.FORM_A.GET_REGISTRARS,
          data: response?.data?.data,
        });
      }
    } catch (e) {
      displayErrors(e);
    }
  };
};

export const saveAccreditedRegistrarDetails = (id, data, accreditationId, isNextClick) => {
  return async dispatch => {
    try {
      const response = await AccreditedApiServices.formAApiServices.saveAccreditedRegistrarDetails(id, data);
      if (response?.data?.status === 'SUCCESS') {
        successNotification(response?.data?.message || 'Registrar details updated successfully');
        if (isNextClick) dispatch(getAccreditedSteps(accreditationId));
        else {
          dispatch({
            type: ACCREDITED_REDUX_CONSTANTS.FORM_A.UPDATE_REGISTRAR_COPY_DATA,
          });
        }
      }
    } catch (e) {
      displayErrors(e);
      throw Error();
    }
  };
};

export const addNewRegistrar = () => {
  return dispatch => {
    dispatch({
      type: ACCREDITED_REDUX_CONSTANTS.FORM_A.ADD_REGISTRAR,
    });
  };
};

export const deleteRegistrarFromList = index => {
  return dispatch => {
    dispatch({
      type: ACCREDITED_REDUX_CONSTANTS.FORM_A.DELETE_REGISTRAR,
      index,
    });
  };
};

// Form A1

// A1 supervisors

export const getA1SupervisorData = (id, sid) => {
  return async dispatch => {
    try {
      const response = await AccreditedApiServices.formA1ApiServices.getA1SuperVisorData(id, sid);
      if (response?.data?.status === 'SUCCESS') {
        dispatch({
          type: ACCREDITED_REDUX_CONSTANTS.FORM_A1.GET_A1_SUPERVISOR_DATA,
          data: response?.data?.data,
        });
      }
    } catch (e) {
      displayErrors(e);
    }
  };
};

export const getFormA1SupervisorDetails = (id, sid) => {
  return async dispatch => {
    try {
      const response = await AccreditedApiServices.formA1ApiServices.getA1SuperVisorDetail(id, sid);
      if (response?.data?.status === 'SUCCESS') {
        dispatch({
          type: ACCREDITED_REDUX_CONSTANTS.FORM_A1.GET_A1_SUPERVISOR_DETAIL,
          data: response?.data?.data,
        });
        dispatch(getA1SupervisorData(id, sid));
      }
    } catch (e) {
      displayErrors(e);
    }
  };
};

export const saveAccreditedA1SupervisorDetails = (id, sid, data, accreditationId, isNextClick) => {
  return async dispatch => {
    try {
      let response;
      if (isNextClick) {
        response = await AccreditedApiServices.formA1ApiServices.saveAccreditedA1SupervisorDetails(id, data);
      } else {
        response = await AccreditedApiServices.formA1ApiServices.saveAccreditedA1SupervisorDetailsPartially(id, data);
      }
      if (response?.data?.status === 'SUCCESS') {
        successNotification(response?.data?.message || 'Supervisor details updated successfully');
        if (isNextClick) dispatch(getAccreditedSteps(accreditationId));
        else {
          dispatch({
            type: ACCREDITED_REDUX_CONSTANTS.FORM_A1.UPDATE_A1_SUPERVISOR_COPY_DATA,
            data: { sid },
          });
        }
      }
    } catch (e) {
      displayErrors(e);
      throw Error();
    }
  };
};

export const downloadFileFromA1Supervisor = async fileName => {
  try {
    const response = await AccreditedApiServices.formA1ApiServices.downloadA1SupervisorFile(fileName);
    if (response) {
      return response;
    }
  } catch (e) {
    displayErrors(e);
    return false;
  }
  return false;
};

export const deleteFileFromA1Standards = (index, data, files, sid) => {
  return async dispatch => {
    try {
      const response = await AccreditedApiServices.formA1ApiServices.deleteFormA1StandardsFile(data);
      if (response?.data?.status === 'SUCCESS') {
        successNotification(response?.data?.message ?? 'File deleted successfully');
        dispatch(
          updateAccreditedSubFormDataArrayFields('formA1', `${sid}`, index, 'standardsDetail', 'filePath', files),
        );
      }
    } catch (e) {
      displayErrors(e);
    }
  };
};

// previous recommendations

export const getPreviousRecommendationsData = id => {
  return async dispatch => {
    try {
      const response = await AccreditedApiServices.formA1ApiServices.getFinalCheckListData(id);
      if (response?.data?.status === 'SUCCESS') {
        dispatch({
          type: ACCREDITED_REDUX_CONSTANTS.PREVIOUS_RECOMMENDATIONS.GET_PREVIOUS_RECOMMENDATIONS_DETAILS,
          data: response?.data?.data,
        });
      }
    } catch (e) {
      displayErrors(e);
    }
  };
};

export const savePreviousRecommendationsData = (id, data) => {
  return async dispatch => {
    try {
      const response = await AccreditedApiServices.formA1ApiServices.saveAccreditedFinalChecklistDetails(id, data);
      if (response?.data?.status === 'SUCCESS') {
        successNotification(response?.data?.message || 'Previous recommendations updated successfully');
        dispatch({
          type: ACCREDITED_REDUX_CONSTANTS.PREVIOUS_RECOMMENDATIONS.UPDATE_PREVIOUS_RECOMMENDATIONS_COPY_DATA,
        });
      }
    } catch (e) {
      displayErrors(e);
      throw Error();
    }
  };
};

// *** Form B ***

// summary

export const getFacilityDetailsForSummary = id => {
  return async dispatch => {
    try {
      const response = await AccreditedApiServices.formBApiServices.getPracticeManagerForSummary(id);
      if (response?.data?.status === 'SUCCESS') {
        dispatch({
          type: ACCREDITED_REDUX_CONSTANTS.FORM_B.GET_PRACTICE_MANAGERS_SUMMARY,
          data: response?.data?.data,
        });
      }
    } catch (e) {
      displayErrors(e);
    }
  };
};

export const getSummaryData = id => {
  return async dispatch => {
    try {
      const response = await AccreditedApiServices.formBApiServices.getFormBSummaryData(id);
      if (response?.data?.status === 'SUCCESS') {
        dispatch({
          type: ACCREDITED_REDUX_CONSTANTS.FORM_B.GET_FORM_B_SUMMARY_DATA,
          data: response?.data?.data,
        });
      }
    } catch (e) {
      displayErrors(e);
    }
  };
};

// assign Accreditors

export const getFormBAccreditors = id => {
  return async dispatch => {
    try {
      const response = await AccreditedApiServices.formBApiServices.getFormBAccreditor(id);
      if (response?.data?.status === 'SUCCESS') {
        dispatch({
          type: ACCREDITED_REDUX_CONSTANTS.FORM_B.GET_FORM_B_ACCREDITORS,
          data: response?.data?.data,
        });
      }
    } catch (e) {
      displayErrors(e);
    }
  };
};

export const getFormBSelectedAccreditor = id => {
  return async dispatch => {
    try {
      const response = await AccreditedApiServices.formBApiServices.getFormBSelectedAccreditor(id);
      if (response?.data?.status === 'SUCCESS') {
        dispatch({
          type: ACCREDITED_REDUX_CONSTANTS.FORM_B.GET_FORM_B_SELECTED_ACCREDITORS,
          data: response?.data?.data,
        });
      }
    } catch (e) {
      displayErrors(e);
    }
  };
};

export const saveAccreditedAssignAccreditedDetails = (id, data, accreditationId, isNextClick) => {
  return async dispatch => {
    try {
      const response = await AccreditedApiServices.formBApiServices.saveAccreditedAssignAccreditorDetails(id, data);
      if (response?.data?.status === 'SUCCESS') {
        successNotification(response?.data?.message || 'Details updated successfully');
        if (isNextClick) dispatch(getAccreditedSteps(accreditationId));
        else {
          dispatch({
            type: ACCREDITED_REDUX_CONSTANTS.FORM_B.UPDATE_FORM_B_ACCREDITORS_COPY_DATA,
          });
        }
      }
    } catch (e) {
      displayErrors(e);
      throw Error();
    }
  };
};

export const saveAccreditedSummaryDetails = (id, data, accreditationId, isPartiallySave = false) => {
  return async dispatch => {
    try {
      let response;
      if (isPartiallySave) {
        response = await AccreditedApiServices.formBApiServices.saveAccreditedSummaryDetailsPartially(id, data);
      } else {
        response = await AccreditedApiServices.formBApiServices.saveAccreditedSummaryDetails(id, data);
      }

      if (response?.data?.status === 'SUCCESS') {
        successNotification(response?.data?.message || 'Summary details updated successfully');
        if (!isPartiallySave) {
          dispatch(getAccreditedSteps(accreditationId));
        } else {
          dispatch({
            type: ACCREDITED_REDUX_CONSTANTS.FORM_B.UPDATE_FORM_B_SUMMARY_COPY_DATA,
          });
        }
      }
    } catch (e) {
      displayErrors(e);
      throw Error();
    }
  };
};

// declaration

export const getFormBOtherDetails = id => {
  return async dispatch => {
    try {
      const response = await AccreditedApiServices.formBApiServices.getFormBOtherDetails(id);
      if (response?.data?.status === 'SUCCESS') {
        dispatch({
          type: ACCREDITED_REDUX_CONSTANTS.FORM_B.GET_FORM_B_OTHER_DETAILS,
          data: response?.data?.data,
        });
      }
    } catch (e) {
      displayErrors(e);
    }
  };
};

export const saveAccreditedDeclarationDetails = (id, data, accreditationId, isPartiallySave = false) => {
  return async dispatch => {
    try {
      let response;
      if (isPartiallySave) {
        response = await AccreditedApiServices.formBApiServices.saveDeclarationDetailsPartially(id, data);
      } else {
        response = await AccreditedApiServices.formBApiServices.saveDeclarationDetails(id, data);
      }

      if (response?.data?.status === 'SUCCESS') {
        successNotification(response?.data?.message || 'Other details updated successfully');
        if (!isPartiallySave) {
          dispatch(getAccreditedSteps(accreditationId));
        } else {
          dispatch({
            type: ACCREDITED_REDUX_CONSTANTS.FORM_B.UPDATE_FORM_B_OTHER_DETAILS_COPY_DATA,
          });
        }
      }
    } catch (e) {
      displayErrors(e);
      throw Error();
    }
  };
};

export const resetAccredited = () => {
  return dispatch => {
    dispatch({
      type: ACCREDITED_REDUX_CONSTANTS.RESET_ACCREDITED_DATA,
    });
  };
};

export const resubmitAccreditedForm = id => {
  return async () => {
    try {
      const response = await AccreditedApiServices.resubmitAccreditedForm(id);
      if (response?.data?.status === 'SUCCESS') {
        successNotification(response?.data?.message ?? 'Accredited re-submitted successfully');
        return true;
      }
    } catch (e) {
      displayErrors(e);
    }
    return false;
  };
};
