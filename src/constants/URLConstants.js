export const BASE_URL = process.env.REACT_APP_BASE_URL;

export const LOGIN_URLS = {
  GET_LOGGED_USER_DETAILS: `${BASE_URL}user/`,
};

export const ADD_SUPERVISOR = {
  ADD_NEW_SUPERVISOR_DETAILS: `${BASE_URL}SupervisorRegistrationForm/submitDetail/`,
};

export const DASHBOARD_URLS = {
  GET_DASHBOARD_LIST: `${BASE_URL}dashboard/`,
  GET_DASHBOARD_TABS_STATUS: `${BASE_URL}dashboard/status/`,
};

export const FACILITY_URLS = {
  GET_FACILITY_LIST: `${BASE_URL}facility`,
  GET_FACILITY_USER_LIST: `${BASE_URL}facility-staff/facility/`,
  UPLOAD_FACILITY_CSV: `${BASE_URL}facility/upload`,
  UPLOAD_FACILITY_STAFF_CSV: `${BASE_URL}facility-staff/upload`,
};

export const USER_URLS = {
  GET_USER_LIST: `${BASE_URL}user`,
  UPLOAD_USER_CSV: `${BASE_URL}user/upload`,
};

export const REGISTRAR_URLS = {
  GET_REGISTRAR_LIST: `${BASE_URL}facility-registrar`,
  UPLOAD_REGISTRAR_CSV: `${BASE_URL}facility-registrar/upload`,
};

export const ACCREDITED_URLS = {
  GET_ACCREDITED_DETAILS: `${BASE_URL}accredited/`,
  GET_ACCREDITED_STEPPER: `${BASE_URL}accredited/accreditionSideBar/`,
  UPLOAD_FILE: `${BASE_URL}fileUploader/file`,
  DELETE_FILE: `${BASE_URL}fileUploader/file/`,

  RE_SUBMIT_ACCREDITED_FORM: `${BASE_URL}formA1/resubmitForm/`,

  // post details
  GET_PRACTICE_MANAGER_POST_DETAILS: `${BASE_URL}facility/`,
  POST_DETAILS_URL: `${BASE_URL}accredited/post-detail`,

  FORM_A: {
    // practice manager
    GET_PRACTICE_MANAGER_DETAILS: `${BASE_URL}formA/practice-manager/`,
    GET_PRACTICE_MANAGERS: `${BASE_URL}formA/practiceManagers/`,
    SAVE_PRACTICE_MANAGER_DETAILS: `${BASE_URL}formA/submitPracticeManagerDetails/`,

    // standards
    GET_STANDARD_DETAILS: `${BASE_URL}formA/standards-details/`,
    SAVE_STANDARD_DETAILS: `${BASE_URL}formA/submitPracticeStandards/`,

    // supervisor
    GET_SUPERVISOR_DETAILS: `${BASE_URL}formA/supervisors-details/`,
    GET_SUPERVISORS: `${BASE_URL}formA/supervisors/`,
    DELETE_SUPERVISOR: `${BASE_URL}formA/deleteSupervisor/`,
    SAVE_SUPERVISOR_DETAILS: `${BASE_URL}formA/submitSupervisors/`,

    // registrars
    GET_REGISTRAR_DETAILS: `${BASE_URL}formA/registrar-details/`,
    GET_REGISTRARS: `${BASE_URL}formA/registrars/`,
    SAVE_REGISTRAR_DETAILS: `${BASE_URL}formA/submitRegistrarDetails/`,
  },

  FORM_A1: {
    // A1Supervisors
    GET_A1_SUPERVISOR_DATA: `${BASE_URL}formA1/getSupervisorDetail/`,
    GET_A1_SUPERVISORS: `${BASE_URL}formA1/supervisors/`,
    SAVE_A1_SUPERVISOR_DETAILS: `${BASE_URL}formA1/submitSupervisorDetail/`,
    SAVE_A1_SUPERVISOR_DETAILS_PARTIALLY: `${BASE_URL}formA1/submitTempSupervisorDetail/`,

    // Final Checklist
    GET_FINAL_CHECKLIST_DATA: `${BASE_URL}formA1/finalCheckList/`,
    SAVE_A1_FINAL_CHECKLIST_DETAILS: `${BASE_URL}formA1/submitFinalCheckList/`,
  },

  FORM_B: {
    // summary
    GET_PRACTICE_MANAGER_SUMMARY: `${BASE_URL}facility/`,
    GET_FORM_B_SUMMARY_DATA: `${BASE_URL}formB/getSummary/`,
    GET_FORM_B_SUPERVISORS: `${BASE_URL}formB/supervisors/`,
    GET_FORM_B_ACCREDITORS: `${BASE_URL}formB/accreditor/`,
    GET_FORM_B_SELECTED_ACCREDITORS: `${BASE_URL}formB/getAccreditor/`,
    SAVE_SUMMARY_DETAILS: `${BASE_URL}formB/submitSummary/`,

    // assign accreditor
    SAVE_ASSIGN_ACCREDITOR_DETAILS: `${BASE_URL}formB/submitAssignedAccriditor/`,

    // declaration
    GET_FORM_B_OTHER_DETAILS: `${BASE_URL}formB/getOtherDetails/`,
    SAVE_DECLARATION_DETAILS: `${BASE_URL}formB/submitOtherDetails/`,
  },
};
