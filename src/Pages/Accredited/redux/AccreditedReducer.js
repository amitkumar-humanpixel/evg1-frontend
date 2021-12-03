import _ from 'lodash';
import moment from 'moment';
import { ACCREDITED_REDUX_CONSTANTS } from './AccreditedReduxConstants';

const hoursTableData = [
  {
    days: 'Sunday',
    hours: '00:00',
    startTime: '00:00',
    finishTime: '00:00',
    isChecked: 'none',
  },
  {
    days: 'Monday',
    hours: '00:00',
    startTime: '08:00',
    finishTime: '17:00',
    isChecked: 'none',
  },
  {
    days: 'Tuesday',
    hours: '00:00',
    startTime: '08:00',
    finishTime: '17:00',
    isChecked: 'none',
  },
  {
    days: 'Wednesday',
    hours: '00:00',
    startTime: '08:00',
    finishTime: '17:00',
    isChecked: 'none',
  },
  {
    days: 'Thursday',
    hours: '00:00',
    startTime: '08:00',
    finishTime: '17:00',
    isChecked: 'none',
  },
  {
    days: 'Friday',
    hours: '00:00',
    startTime: '08:00',
    finishTime: '17:00',
    isChecked: 'none',
  },
  {
    days: 'Saturday',
    hours: '00:00',
    startTime: '00:00',
    finishTime: '00:00',
    isChecked: 'none',
  },
];

const finalCheckListConstant = [
  { title: 'Application form completed and declaration signed by each supervisor', status: 'none' },
  {
    title: 'Current practice accreditation certificate AGPAL or QPA (not mandatory for ACRRM)',
    status: 'none',
  },
  { title: 'Copy of the registrar-specific orientation document', status: 'none' },
  { title: 'Copy of a registrar employment contract template', status: 'none' },
  {
    title: 'Each supervisor Copy of hospital letter confirming clinical privileging (if applicable)',
    status: 'none',
  },
];

const summaryAssessment = [
  {
    title: 'Desktop',
    status: 'none',
  },
  {
    title: 'Short meeting',
    status: 'none',
  },
  {
    title: 'full zoom meeting',
    status: 'none',
  },
  {
    title: 'In person visit to practice',
    status: 'none',
  },
  {
    title: 'Other',
    status: 'none',
  },
];

const initialAccreditedReducer = {
  accreditedDetails: {},
  accreditedStepper: {},

  reaccreditationChecklist: {
    reaccreditationChecklist: [...finalCheckListConstant],
  },

  postDetails: {},
  postDetailsCopy: {},
  formA: {
    practiceManagerList: [],
    supervisorList: [],
    registrarList: [],
    practiceManager: {
      hours: [...hoursTableData],
    },
    practiceManagerCopy: {
      hours: [...hoursTableData],
    },
    standards: [],
    standardsCopy: [],
    supervisors: [
      {
        userId: [],
        categoryOfSupervisor: [],
        contactNumber: '',
        email: '',
        hours: [...hoursTableData],
      },
    ],
    supervisorsCopy: [
      {
        userId: [],
        categoryOfSupervisor: [],
        contactNumber: '',
        email: '',
        hours: [...hoursTableData],
      },
    ],
    registrars: [
      {
        placementId: [],
        note: '',
        hoursDetails: [...hoursTableData],
        onCall: [...hoursTableData],
        note1: '',
        note2: '',
      },
    ],
    registrarsCopy: [
      {
        placementId: [],
        note: '',
        hoursDetails: [...hoursTableData],
        onCall: [...hoursTableData],
        note1: '',
        note2: '',
      },
    ],
  },
  formA1: {
    finalCheckList: {
      recommendation: '',
      actioned: '',
    },
    finalCheckListCopy: {
      recommendation: '',
      actioned: '',
    },
  },
  previousRecommendations: {},
  previousRecommendationsCopy: {},
  formB: {
    accreditorAssign: {
      accreditorId: [],
      accreditorNameList: [],
    },
    accreditorAssignCopy: {
      accreditorId: [],
      accreditorNameList: [],
    },
    summary: {
      classification: '',
      dateOfVisit: '',
      dateOfReportComplete: '',
      assessment: [...summaryAssessment],
      applications: [],
      practiceDetail: '',
      accreditationWithEV: false,
    },
    summaryCopy: {
      classification: '',
      dateOfVisit: '',
      dateOfReportComplete: '',
      assessment: [...summaryAssessment],
      applications: [],
      practiceDetail: '',
      accreditationWithEV: false,
    },
    otherDetails: {
      previousIssues: '',
      summery: '',
      recomendationPanel: '',
      reviewedBy: '',
      isAgree: false,
    },
    otherDetailsCopy: {
      previousIssues: '',
      summery: '',
      recomendationPanel: '',
      reviewedBy: '',
      isAgree: false,
    },
  },
};

export const accreditedReducer = (state = initialAccreditedReducer, action) => {
  switch (action.type) {
    case ACCREDITED_REDUX_CONSTANTS.CHANGE_ACCREDITION_DETAIL_AND_STEPPER_ID: {
      return {
        ...state,
        accreditedDetails: {
          ...state?.accreditedDetails,
          facilityId: action?.facilityId,
          userId: action?.userId,
        },
        accreditedStepper: {
          ...state?.accreditedStepper,
          accreditionId: action?.accreditionId,
        },
      };
    }

    case ACCREDITED_REDUX_CONSTANTS.CHANGE_ACCREDITION_DETAIL_STEPPER_ID: {
      return {
        ...state,
        accreditedStepper: {
          ...state?.accreditedStepper,
          accreditionId: action?.accreditionId,
        },
      };
    }

    case ACCREDITED_REDUX_CONSTANTS.GET_ACCREDITED_STEPPER: {
      const stepper = {
        ...action?.data,
        accreditionSideBar: action?.data?.accreditionSideBar?.map((step, index) => ({
          ...step,
          activeStepIndex: index,
          url: _.camelCase(step?.name),
          isEditable: step?.isEditable,
          subSteps: step?.subSteps?.map((subStep, subIndex) => ({
            ...subStep,
            activeSubStepIndex: subIndex,
            url: _.camelCase(subStep?.stepName),
            isEditable: subStep?.isEditable,
          })),
        })),
      };

      return {
        ...state,
        accreditedStepper: stepper,
        accreditedDetails: {
          ...state?.accreditedDetails,
          facilityId: action?.data?.facilityId,
        },
      };
    }

    case ACCREDITED_REDUX_CONSTANTS.UPDATE_FORM_FIELDS:
      return {
        ...state,
        [action.formName]: {
          ...state?.[action.formName],
          [action.fieldName]: action.fieldValue,
        },
      };

    case ACCREDITED_REDUX_CONSTANTS.UPDATE_SUB_FORM_FIELDS:
      return {
        ...state,
        [action.formName]: {
          ...state?.[action.formName],
          [action.subFormName]: {
            ...state?.[action.formName]?.[action.subFormName],
            [action.fieldName]: action.fieldValue,
          },
        },
      };

    case ACCREDITED_REDUX_CONSTANTS.UPDATE_SUB_FORM_ARRAY_FIELDS: {
      let finalArray = state[action?.formName][action?.subFormName];
      finalArray = finalArray?.map((detail, index) => {
        if (index === action?.UID) {
          return {
            ...detail,
            [action?.fieldName]: action?.fieldValue,
          };
        }
        return detail;
      });

      return {
        ...state,
        [action.formName]: {
          ...state?.[action.formName],
          [action.subFormName]: finalArray,
        },
      };
    }

    case ACCREDITED_REDUX_CONSTANTS.UPDATE_SUB_FORM_DATA_ARRAY_FIELDS: {
      let finalArray = state[action?.formName][action?.subFormName][action?.subFormField];
      finalArray = finalArray?.map((detail, index) => {
        if (index === action?.UID) {
          return {
            ...detail,
            [action?.fieldName]: action?.fieldValue,
          };
        }
        return detail;
      });

      return {
        ...state,
        [action.formName]: {
          ...state?.[action.formName],
          [action.subFormName]: {
            ...state?.[action.formName]?.[action.subFormName],
            [action?.subFormField]: finalArray,
          },
        },
      };
    }

    // *** PostDetails ***

    case ACCREDITED_REDUX_CONSTANTS.POST_DETAILS.GET_PRACTICE_MANAGERS_POST_DETAILS: {
      const postDetails = {
        ...state?.postDetails,
        address: `${action?.data?.address} ${action?.data?.suburb} ${action?.data?.postalCode}`,
        facilityName: action?.data?.practiceName,
        facilityId: action?.data?.facilityId,
      };
      return {
        ...state,
        postDetails,
        postDetailsCopy: postDetails,
      };
    }

    case ACCREDITED_REDUX_CONSTANTS.POST_DETAILS.GET_POST_DETAILS: {
      const {
        facilityId,
        facilityName,
        accreditationBody,
        college,
        address,
        accreditationEndDate,
        phone,
        practiceWebsite,
        totalNumberGPs,
      } = action?.data ?? {};

      const postDetails = {
        ...action?.data,
        facilityId,
        facilityName,
        accreditationBody: accreditationBody
          ? accreditationBody?.map(e => ({
              label: _.upperCase(e),
              value: e,
              name: 'accreditationBody',
            }))
          : [],
        college: college
          ? college?.map(e => ({
              label: _.upperCase(e),
              value: e,
              name: 'college',
            }))
          : [],
        address: address || '',
        accreditationEndDate,
        phone: phone || '',
        practiceWebsite: practiceWebsite || '',
        totalNumberGPs: totalNumberGPs || '',
      };
      return {
        ...state,
        postDetails,
        postDetailsCopy: postDetails,
      };
    }

    case ACCREDITED_REDUX_CONSTANTS.POST_DETAILS.UPDATE_POST_DETAILS_COPY_DATA:
      return {
        ...state,
        postDetailsCopy: state?.postDetails,
      };

    // *** Form A ***

    // practice manager

    case ACCREDITED_REDUX_CONSTANTS.FORM_A.GET_PRACTICE_MANAGER_DETAILS: {
      const { userId, contactNumber, usualWorkingHours, hours, name, email } = action?.data;

      const practiceManager = {
        ...action?.data,
        userId: userId ? { label: name, value: userId, name: 'userId' } : [],
        contactNumber: contactNumber || '',
        usualWorkingHours: !_.isEmpty(usualWorkingHours) ? usualWorkingHours : { days: '' },
        hours: !_.isEmpty(hours) ? hours : [...hoursTableData],
        name: name || '',
        email: email || '',
      };
      return {
        ...state,
        formA: {
          ...state.formA,
          practiceManager,
          practiceManagerCopy: practiceManager,
        },
      };
    }

    case ACCREDITED_REDUX_CONSTANTS.FORM_A.GET_PRACTICE_MANAGERS:
      return {
        ...state,
        formA: {
          ...state?.formA,
          practiceManagerList: action?.data,
        },
      };

    case ACCREDITED_REDUX_CONSTANTS.FORM_A.UPDATE_PRACTICE_MANAGER_TIMING: {
      let { hours } = state.formA.practiceManager;
      hours = hours.map(hour => {
        if (hour?.days === action?.day) {
          return {
            ...hour,
            [action.fieldName]: action.fieldValue,
          };
        }
        return hour;
      });
      hours = hours?.map(hour => ({
        ...hour,
        hours:
          hour?.startTime < hour?.finishTime
            ? moment(
                `${moment
                  .duration(moment(hour?.finishTime, 'HH:mm').diff(moment(hour?.startTime, 'HH:mm')))
                  .hours()}:${moment
                  .duration(moment(hour?.finishTime, 'HH:mm').diff(moment(hour?.startTime, 'HH:mm')))
                  .minutes()}`,
                'HH:mm',
              ).format('HH:mm')
            : '00:00',
      }));
      return {
        ...state,
        formA: {
          ...state.formA,
          practiceManager: {
            ...state.formA.practiceManager,
            hours,
          },
        },
      };
    }

    case ACCREDITED_REDUX_CONSTANTS.FORM_A.UPDATE_PRACTICE_MANAGER_COPY_DATA:
      return {
        ...state,
        formA: {
          ...state.formA,
          practiceManagerCopy: state.formA.practiceManager,
        },
      };

    // standards
    case ACCREDITED_REDUX_CONSTANTS.FORM_A.GET_STANDARD_DETAILS: {
      return {
        ...state,
        formA: {
          ...state.formA,
          standards: !_.isEmpty(action?.data) ? action?.data : [],
          standardsCopy: !_.isEmpty(action?.data) ? action?.data : [],
        },
      };
    }

    case ACCREDITED_REDUX_CONSTANTS.FORM_A.UPDATE_STANDARD_COPY_DATA:
      return {
        ...state,
        formA: {
          ...state.formA,
          standardsCopy: state.formA.standards,
        },
      };

    // supervisors
    case ACCREDITED_REDUX_CONSTANTS.FORM_A.GET_SUPERVISOR_DATA: {
      const supervisors = !_.isEmpty(action?.data)
        ? action?.data?.map(supervisor => ({
            userId:
              supervisor?.userId && supervisor?.username
                ? {
                    label: supervisor?.username,
                    value: supervisor?.userId,
                    name: 'userId',
                  }
                : [],
            categoryOfSupervisor: supervisor?.categoryOfSupervisor
              ? {
                  label: _.capitalize(supervisor?.categoryOfSupervisor),
                  value: _.upperCase(supervisor?.categoryOfSupervisor),
                  name: 'categoryOfSupervisor',
                }
              : [],
            contactNumber: supervisor?.contactNumber || '',
            email: supervisor?.email || '',
            college: supervisor?.college?.map(college => ({
              label: _.upperCase(college),
              value: college,
              name: 'college',
            })),
            hours: !_.isEmpty(supervisor?.hours) ? supervisor?.hours : [...hoursTableData],
          }))
        : [
            {
              userId: [],
              categoryOfSupervisor: [],
              contactNumber: '',
              email: '',
              college: [],
              hours: [...hoursTableData],
            },
          ];

      return {
        ...state,
        formA: {
          ...state?.formA,
          supervisors: [...supervisors],
          supervisorsCopy: [...supervisors],
        },
      };
    }
    case ACCREDITED_REDUX_CONSTANTS.FORM_A.GET_SUPERVISORS:
      return {
        ...state,
        formA: {
          ...state?.formA,
          supervisorList: action?.data,
        },
      };

    case ACCREDITED_REDUX_CONSTANTS.FORM_A.ADD_SUPERVISOR:
      return {
        ...state,
        formA: {
          ...state?.formA,
          supervisors: [
            ...state?.formA?.supervisors,
            {
              userId: [],
              categoryOfSupervisor: [],
              contactNumber: '',
              email: '',
              hours: [...hoursTableData],
            },
          ],
        },
      };

    case ACCREDITED_REDUX_CONSTANTS.FORM_A.UPDATE_SUPERVISOR_TIMINGS: {
      let finalArray = state?.formA?.supervisors;
      finalArray = finalArray?.map((supervisor, index) => {
        if (index === action?.index) {
          return {
            ...supervisor,
            [action?.fieldFor]: supervisor?.[action?.fieldFor]?.map(hour => {
              if (hour?.days === action?.day) {
                return {
                  ...hour,
                  [action.fieldName]: action.fieldValue,
                };
              }
              return hour;
            }),
          };
        }
        return supervisor;
      });
      finalArray = finalArray?.map((supervisor, index) => {
        if (index === action?.index) {
          return {
            ...supervisor,
            [action?.fieldFor]: supervisor?.[action?.fieldFor]?.map(hour => ({
              ...hour,
              hours:
                hour?.startTime < hour?.finishTime
                  ? moment(
                      `${moment
                        .duration(moment(hour?.finishTime, 'HH:mm').diff(moment(hour?.startTime, 'HH:mm')))
                        .hours()}:${moment
                        .duration(moment(hour?.finishTime, 'HH:mm').diff(moment(hour?.startTime, 'HH:mm')))
                        .minutes()}`,
                      'HH:mm',
                    ).format('HH:mm')
                  : '00:00',
            })),
          };
        }
        return supervisor;
      });

      return {
        ...state,
        formA: {
          ...state?.formA,
          supervisors: finalArray,
        },
      };
    }

    case ACCREDITED_REDUX_CONSTANTS.FORM_A.DELETE_SUPERVISOR: {
      const supervisors = state?.formA?.supervisors.filter((supervisor, index) => index !== action?.index);
      return {
        ...state,
        formA: {
          ...state?.formA,
          supervisors,
        },
      };
    }

    case ACCREDITED_REDUX_CONSTANTS.FORM_A.UPDATE_SUPERVISOR_COPY_DATA:
      return {
        ...state,
        formA: {
          ...state.formA,
          supervisorsCopy: state.formA.supervisors,
        },
      };

    // registrar

    case ACCREDITED_REDUX_CONSTANTS.FORM_A.GET_REGISTRAR_DATA: {
      const registrars = !_.isEmpty(action?.data)
        ? action?.data?.map(registrar => ({
            placementId:
              registrar?.name && registrar?.placementId
                ? {
                    label: registrar?.name,
                    value: registrar?.placementId,
                    name: 'placementId',
                  }
                : [],
            note: registrar?.note || '',
            hoursDetails: !_.isEmpty(registrar?.hoursDetails) ? registrar?.hoursDetails : [...hoursTableData],
            onCall: !_.isEmpty(registrar?.onCall) ? registrar?.onCall : [...hoursTableData],
            note1: registrar?.note1 || '',
            note2: registrar?.note2 || '',
          }))
        : [
            {
              placementId: [],
              note: '',
              hoursDetails: [...hoursTableData],
              onCall: [...hoursTableData],
              note1: '',
              note2: '',
            },
          ];

      return {
        ...state,
        formA: {
          ...state?.formA,
          registrars: [...registrars],
          registrarsCopy: [...registrars],
        },
      };
    }

    case ACCREDITED_REDUX_CONSTANTS.FORM_A.UPDATE_REGISTRAR_TIMING: {
      let finalArray = state?.formA?.registrars;
      finalArray = finalArray?.map((registrar, index) => {
        if (index === action?.index) {
          return {
            ...registrar,
            [action?.fieldFor]: registrar?.[action?.fieldFor]?.map(hour => {
              if (hour?.days === action?.day) {
                return {
                  ...hour,
                  [action.fieldName]: action.fieldValue,
                };
              }
              return hour;
            }),
          };
        }
        return registrar;
      });
      finalArray = finalArray?.map((registrar, index) => {
        if (index === action?.index) {
          return {
            ...registrar,
            [action?.fieldFor]: registrar?.[action?.fieldFor]?.map(hour => ({
              ...hour,
              hours:
                hour?.startTime < hour?.finishTime
                  ? moment(
                      `${moment
                        .duration(moment(hour?.finishTime, 'HH:mm').diff(moment(hour?.startTime, 'HH:mm')))
                        .hours()}:${moment
                        .duration(moment(hour?.finishTime, 'HH:mm').diff(moment(hour?.startTime, 'HH:mm')))
                        .minutes()}`,
                      'HH:mm',
                    ).format('HH:mm')
                  : '00:00',
            })),
          };
        }
        return registrar;
      });

      return {
        ...state,
        formA: {
          ...state?.formA,
          registrars: finalArray,
        },
      };
    }

    case ACCREDITED_REDUX_CONSTANTS.FORM_A.GET_REGISTRARS: {
      const registrarList = action?.data?.map(e => ({
        label: e?.name,
        value: e?.placementId,
        name: 'placementId',
      }));
      return {
        ...state,
        formA: {
          ...state?.formA,
          registrarList,
        },
      };
    }

    case ACCREDITED_REDUX_CONSTANTS.FORM_A.ADD_REGISTRAR:
      return {
        ...state,
        formA: {
          ...state?.formA,
          registrars: [
            ...state?.formA?.registrars,
            {
              placementId: [],
              note: '',
              hoursDetails: [...hoursTableData],
              onCall: [...hoursTableData],
            },
          ],
        },
      };

    case ACCREDITED_REDUX_CONSTANTS.FORM_A.DELETE_REGISTRAR: {
      const registrars = state?.formA?.registrars.filter((registrar, index) => index !== action?.index);
      return {
        ...state,
        formA: {
          ...state?.formA,
          registrars,
        },
      };
    }

    case ACCREDITED_REDUX_CONSTANTS.FORM_A.UPDATE_REGISTRAR_COPY_DATA:
      return {
        ...state,
        formA: {
          ...state.formA,
          registrarsCopy: state.formA.registrars,
        },
      };

    // *** Form A1 ***

    // A1 supervisor
    case ACCREDITED_REDUX_CONSTANTS.FORM_A1.GET_A1_SUPERVISOR_DETAIL: {
      const a1SupervisorData = {
        ...state?.formA1?.[action?.data?.userId],
        userId: action?.data?.userId,
        username: action?.data?.username ? action?.data?.username : '',
        email: action?.data?.email ? action?.data?.email : '',
        contactNumber: action?.data?.contactNumber ? action?.data?.contactNumber : '',
        categoryOfSupervisor: _.capitalize(action?.data?.categoryOfSupervisor),
        college: action?.data?.college?.map(college => ({
          label: _.upperCase(college),
          value: college,
          name: 'college',
        })),
        standardsDetail: [],
      };
      return {
        ...state,
        formA1: {
          ...state.formA1,
          [action?.data?.userId]: a1SupervisorData,
          [`${[action?.data?.userId]}copy`]: a1SupervisorData,
        },
      };
    }

    case ACCREDITED_REDUX_CONSTANTS.FORM_A1.GET_A1_SUPERVISOR_DATA: {
      const a1SupervisorData = {
        ...state?.formA1?.[action?.data?.userId],
        // hours: !_.isEmpty(action?.data?.hours) ? action?.data?.hours : [...hoursTableData],
        standardsDetail: !_.isEmpty(action?.data?.standardsDetail) ? action?.data?.standardsDetail : [],
        isAgree: action?.data?.isAgree,
      };
      return {
        ...state,
        formA1: {
          ...state.formA1,
          [action?.data?.userId]: a1SupervisorData,
          [`${[action?.data?.userId]}copy`]: a1SupervisorData,
        },
      };
    }

    case ACCREDITED_REDUX_CONSTANTS.FORM_A1.UPDATE_A1_SUPERVISOR_COPY_DATA: {
      return {
        ...state,
        formA1: {
          ...state.formA1,
          [`${[action?.data?.sid]}copy`]: state.formA1[action.data.sid],
        },
      };
    }

    // *** Previous Recommendations ***

    case ACCREDITED_REDUX_CONSTANTS.PREVIOUS_RECOMMENDATIONS.GET_PREVIOUS_RECOMMENDATIONS_DETAILS: {
      const previousRecommendationsData = {
        recommendation: action?.data?.addressRecommendation?.recommendation || '',
        actioned: action?.data?.addressRecommendation?.actioned || '',
      };
      return {
        ...state,
        previousRecommendations: previousRecommendationsData,
        previousRecommendationsCopy: previousRecommendationsData,
      };
    }

    case ACCREDITED_REDUX_CONSTANTS.PREVIOUS_RECOMMENDATIONS.UPDATE_PREVIOUS_RECOMMENDATIONS_COPY_DATA:
      return {
        ...state,
        previousRecommendationsCopy: state.previousRecommendations,
      };

    // *** Form B ***

    // summary

    case ACCREDITED_REDUX_CONSTANTS.FORM_B.GET_PRACTICE_MANAGERS_SUMMARY: {
      return {
        ...state,
        formB: {
          ...state?.formB,
          summary: {
            ...state?.formB?.summary,
            address: `${action?.data?.address} ${action?.data?.suburb} ${action?.data?.postalCode}`,
            facilityName: action?.data?.practiceName,
            facilityId: action?.data?.facilityId,
          },
        },
      };
    }

    case ACCREDITED_REDUX_CONSTANTS.FORM_B.GET_FORM_B_SUMMARY_DATA: {
      const summary = {
        ...state.formB.summary,
        accreditorName: action?.data?.accreditorDetails?.name,
        accreditorUserId: action?.data?.accreditorDetails?.userId,
        classification: action?.data?.classification
          ? {
              label: _.capitalize(action?.data?.classification),
              value: action?.data?.classification,
              name: 'classification',
            }
          : [],
        dateOfVisit: action?.data?.dateOfVisit || '',
        dateOfReportComplete: action?.data?.dateOfReportComplete || '',
        assessment: !_.isEmpty(action?.data?.assessment) ? [...action?.data?.assessment] : [...summaryAssessment],
        applications: action?.data?.applications,
        practiceDetail: action?.data?.practiceDetail || '',
        accreditationWithEV: action?.data?.accreditationWithEV ?? false,
      };
      return {
        ...state,
        formB: {
          ...state.formB,
          summary,
          summaryCopy: summary,
        },
      };
    }

    case ACCREDITED_REDUX_CONSTANTS.FORM_B.UPDATE_FORM_B_SUMMARY_COPY_DATA:
      return {
        ...state,
        formB: {
          ...state.formB,
          summaryCopy: state.formB.summary,
        },
      };

    // assign accreditors

    case ACCREDITED_REDUX_CONSTANTS.FORM_B.GET_FORM_B_ACCREDITORS: {
      const finalAccreditorList = !_.isEmpty(action?.data)
        ? action.data?.map(accreditor => ({
            label: `${accreditor?.firstName} ${accreditor?.lastName}`,
            value: accreditor?.userId,
            name: 'accreditorId',
          }))
        : [];
      return {
        ...state,
        formB: {
          ...state.formB,
          accreditorAssign: {
            ...state?.formB?.accreditorAssign,
            accreditorNameList: finalAccreditorList,
          },
        },
      };
    }

    case ACCREDITED_REDUX_CONSTANTS.FORM_B.GET_FORM_B_SELECTED_ACCREDITORS: {
      const accreditorId = !_.isEmpty(action?.data)
        ? {
            label: `${action?.data?.firstName} ${action?.data?.lastName}`,
            value: action?.data?.userId,
            name: 'accreditorId',
          }
        : [];
      const accreditorAssignData = {
        ...state?.formB?.accreditorAssign,
        accreditorId,
      };
      return {
        ...state,
        formB: {
          ...state.formB,
          accreditorAssign: accreditorAssignData,
          accreditorAssignCopy: accreditorAssignData,
        },
      };
    }

    case ACCREDITED_REDUX_CONSTANTS.FORM_B.UPDATE_FORM_B_ACCREDITORS_COPY_DATA:
      return {
        ...state,
        formB: {
          ...state.formB,
          accreditorAssignCopy: state.formB.accreditorAssign,
        },
      };

    case ACCREDITED_REDUX_CONSTANTS.FORM_B.GET_FORM_B_OTHER_DETAILS: {
      const otherDetailsData = {
        previousIssues: action?.data?.previousIssues || '',
        summery: action?.data?.summery || '',
        recomendationPanel: action?.data?.recomendationPanel || '',
        reviewedBy: action?.data?.reviewedBy || '',
        isAgree: action?.data?.isAgree ?? false,
      };
      return {
        ...state,
        formB: {
          ...state.formB,
          otherDetails: otherDetailsData,
          otherDetailsCopy: otherDetailsData,
        },
      };
    }

    case ACCREDITED_REDUX_CONSTANTS.FORM_B.UPDATE_FORM_B_OTHER_DETAILS_COPY_DATA:
      return {
        ...state,
        formB: {
          ...state.formB,
          otherDetailsCopy: state.formB.otherDetails,
        },
      };

    case ACCREDITED_REDUX_CONSTANTS.RESET_ACCREDITED_DATA: {
      return {
        ...state,
        accreditedDetails: {
          ...state?.accreditedDetails,
        },
        accreditedStepper: {
          ...state?.accreditedStepper,
        },
        postDetails: {
          ...initialAccreditedReducer?.postDetails,
        },
        formA: {
          ...initialAccreditedReducer?.formA,
        },
        formA1: {
          ...initialAccreditedReducer?.formA1,
        },
        formB: {
          ...initialAccreditedReducer?.formB,
        },
      };
    }

    default:
      return state;
  }
};
