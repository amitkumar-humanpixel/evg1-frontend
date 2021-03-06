import ApiService from '../../../services/ApiServices';
import { ACCREDITED_URLS } from '../../../constants/URLConstants';

export const AccreditedApiServices = {
  getPracticeManagerForPostDetails: id =>
    ApiService.getData(`${ACCREDITED_URLS.GET_PRACTICE_MANAGER_POST_DETAILS}${id}`),

  getAccreditedDetail: uid => ApiService.getData(`${ACCREDITED_URLS.GET_ACCREDITED_DETAILS}${uid}`),

  getAccreditedSteps: accreditationId =>
    ApiService.getData(`${ACCREDITED_URLS.GET_ACCREDITED_STEPPER}${accreditationId}`),
  uploadFormAFile: (id, data, config) =>
    ApiService.postData(`${ACCREDITED_URLS.UPLOAD_FORM_A__FILE}${id}`, data, config),
  uploadFormA1File: (id, data, sid, config) =>
    ApiService.postData(`${ACCREDITED_URLS.UPLOAD_FORM_A1__FILE}${id}/${sid}`, data, config),

  resubmitAccreditedForm: accreditationId =>
    ApiService.postData(`${ACCREDITED_URLS.RE_SUBMIT_ACCREDITED_FORM}${accreditationId}`),

  // re accredited checkbox list
  reAccreditedCheckbox: {
    getReAccreditedCheckListData: id => ApiService.getData(`${ACCREDITED_URLS.GET_RE_ACCREDITED_CHECKLIST_DATA}${id}`),
    saveReAccreditedAccreditedChecklistDetails: data =>
      ApiService.postData(`${ACCREDITED_URLS.SAVE_RE_ACCREDITED_CHECKLIST_DETAILS}`, data),
  },

  // post details
  getAccreditedPostDetails: id => ApiService.getData(`${ACCREDITED_URLS.POST_DETAILS_URL}/${id}`),
  saveAccreditedPostDetails: data => ApiService.postData(ACCREDITED_URLS.POST_DETAILS_URL, data),

  formAApiServices: {
    // practice manager
    getAccreditedPracticeManagerDetails: id =>
      ApiService.getData(`${ACCREDITED_URLS.FORM_A.GET_PRACTICE_MANAGER_DETAILS}${id}`),
    getPracticeManagers: facilityId =>
      ApiService.getData(`${ACCREDITED_URLS.FORM_A.GET_PRACTICE_MANAGERS}${facilityId}`),
    saveAccreditedPracticeManagerDetails: (id, data) =>
      ApiService.postData(`${ACCREDITED_URLS.FORM_A.SAVE_PRACTICE_MANAGER_DETAILS}${id}`, data),

    // standards
    getAccreditedStandardDetails: id => ApiService.getData(`${ACCREDITED_URLS.FORM_A.GET_STANDARD_DETAILS}${id}`),
    saveAccreditedStandardDetails: (id, data) =>
      ApiService.postData(`${ACCREDITED_URLS.FORM_A.SAVE_STANDARD_DETAILS}${id}`, data),
    downloadAccreditedStandardFile: fileName =>
      ApiService.request({
        url: `${ACCREDITED_URLS.DOWNLOAD_FILE}${fileName}`,
        method: 'GET',
        responseType: 'blob',
      }),
    deleteFormAStandardsFile: data =>
      ApiService.request({
        url: `${ACCREDITED_URLS.DELETE_FORM_A_FILE}`,
        data,
        method: 'delete',
      }),

    // supervisor
    getSupervisorData: id => ApiService.getData(`${ACCREDITED_URLS.FORM_A.GET_SUPERVISOR_DETAILS}${id}`),
    deleteSupervisorData: (id, userId) =>
      ApiService.deleteData(`${ACCREDITED_URLS.FORM_A.DELETE_SUPERVISOR}${id}/${userId}`),
    getSuperVisors: facilityId => ApiService.getData(`${ACCREDITED_URLS.FORM_A.GET_SUPERVISORS}${facilityId}`),
    saveAccreditedSupervisorDetails: (id, data) =>
      ApiService.postData(`${ACCREDITED_URLS.FORM_A.SAVE_SUPERVISOR_DETAILS}${id}`, data),

    // registrars
    getRegistrarData: id => ApiService.getData(`${ACCREDITED_URLS.FORM_A.GET_REGISTRAR_DETAILS}${id}`),
    getRegistrars: facilityId => ApiService.getData(`${ACCREDITED_URLS.FORM_A.GET_REGISTRARS}${facilityId}`),
    saveAccreditedRegistrarDetails: (id, data) =>
      ApiService.postData(`${ACCREDITED_URLS.FORM_A.SAVE_REGISTRAR_DETAILS}${id}`, data),
  },

  formA1ApiServices: {
    // A1supervisor
    getA1SuperVisorDetail: (id, sid) => ApiService.getData(`${ACCREDITED_URLS.FORM_A1.GET_A1_SUPERVISORS}${id}/${sid}`),
    getA1SuperVisorData: (id, sid) =>
      ApiService.getData(`${ACCREDITED_URLS.FORM_A1.GET_A1_SUPERVISOR_DATA}${id}/${sid}`),
    saveAccreditedA1SupervisorDetails: (id, data) =>
      ApiService.postData(`${ACCREDITED_URLS.FORM_A1.SAVE_A1_SUPERVISOR_DETAILS}${id}`, data),
    downloadA1SupervisorFile: fileName =>
      ApiService.request({
        url: `${ACCREDITED_URLS.DOWNLOAD_FILE}${fileName}`,
        method: 'GET',
        responseType: 'blob',
      }),
    deleteFormA1StandardsFile: data =>
      ApiService.request({
        url: `${ACCREDITED_URLS.DELETE_FORM_A1_FILE}`,
        data,
        method: 'delete',
      }),
    saveAccreditedA1SupervisorDetailsPartially: (id, data) =>
      ApiService.postData(`${ACCREDITED_URLS.FORM_A1.SAVE_A1_SUPERVISOR_DETAILS_PARTIALLY}${id}`, data),

    // final checklist
    getFinalCheckListData: id => ApiService.getData(`${ACCREDITED_URLS.FORM_A1.GET_FINAL_CHECKLIST_DATA}${id}`),
    saveAccreditedFinalChecklistDetails: (id, data) =>
      ApiService.postData(`${ACCREDITED_URLS.FORM_A1.SAVE_A1_FINAL_CHECKLIST_DETAILS}${id}`, data),
  },

  formBApiServices: {
    // summary
    getPracticeManagerForSummary: id =>
      ApiService.getData(`${ACCREDITED_URLS.FORM_B.GET_PRACTICE_MANAGER_SUMMARY}${id}`),
    getFormBSummaryData: id => ApiService.getData(`${ACCREDITED_URLS.FORM_B.GET_FORM_B_SUMMARY_DATA}${id}`),
    getFormBSupervisors: id => ApiService.getData(`${ACCREDITED_URLS.FORM_B.GET_FORM_B_SUPERVISORS}${id}`),
    getFormBAccreditor: id => ApiService.getData(`${ACCREDITED_URLS.FORM_B.GET_FORM_B_ACCREDITORS}${id}`),
    getFormBSelectedAccreditor: id =>
      ApiService.getData(`${ACCREDITED_URLS.FORM_B.GET_FORM_B_SELECTED_ACCREDITORS}${id}`),
    saveAccreditedSummaryDetailsPartially: (id, data) =>
      ApiService.postData(`${ACCREDITED_URLS.FORM_B.SAVE_SUMMARY_DETAILS_PARTIALLY}${id}`, data),
    saveAccreditedSummaryDetails: (id, data) =>
      ApiService.postData(`${ACCREDITED_URLS.FORM_B.SAVE_SUMMARY_DETAILS}${id}`, data),

    // assign Accreditor
    saveAccreditedAssignAccreditorDetails: (id, data) =>
      ApiService.postData(`${ACCREDITED_URLS.FORM_B.SAVE_ASSIGN_ACCREDITOR_DETAILS}${id}`, data),

    // declarations
    getFormBOtherDetails: id => ApiService.getData(`${ACCREDITED_URLS.FORM_B.GET_FORM_B_OTHER_DETAILS}${id}`),
    saveDeclarationDetails: (id, data) =>
      ApiService.postData(`${ACCREDITED_URLS.FORM_B.SAVE_DECLARATION_DETAILS}${id}`, data),
    saveDeclarationDetailsPartially: (id, data) =>
      ApiService.postData(`${ACCREDITED_URLS.FORM_B.SAVE_DECLARATION_DETAILS_PARTIALLY}${id}`, data),
  },
};
