import _ from 'lodash';
import moment from 'moment';
import { ACCREDITED_REDUX_CONSTANTS } from './AccreditedReduxConstants';

const hoursTableData = [
  {
    days: 'Sunday',
    hours: '00',
    startTime: '00',
    finishTime: '00',
    isChecked: false,
  },
  {
    days: 'Monday',
    hours: '00',
    startTime: '00',
    finishTime: '00',
    isChecked: false,
  },
  {
    days: 'Tuesday',
    hours: '00',
    startTime: '00',
    finishTime: '00',
    isChecked: false,
  },
  {
    days: 'Wednesday',
    hours: '00',
    startTime: '00',
    finishTime: '00',
    isChecked: false,
  },
  {
    days: 'Thursday',
    hours: '00',
    startTime: '00',
    finishTime: '00',
    isChecked: false,
  },
  {
    days: 'Friday',
    hours: '00',
    startTime: '00',
    finishTime: '00',
    isChecked: false,
  },
  {
    days: 'Saturday',
    hours: '00',
    startTime: '00',
    finishTime: '00',
    isChecked: false,
  },
];

const formAStandardsConstant = [
  {
    status: 'none',
    title: 'Practice is accredited by AGPAL or QPA (not mandatory for ACRRM) – please attach certificate',
  },
  {
    status: 'none',
    title: 'Supervisors hold practitioner medical indemnity insurance',
  },
  {
    status: 'none',
    title: 'Practice holds separate medical indemnity insurance (not mandatory but recommended)',
  },
  {
    status: 'none',
    title:
      'Registrars continue to be employed to the current National Terms and Conditions for Employment of Registrars – please attach employment contract template',
  },
  {
    status: 'none',
    title:
      'Registrars medical indemnity and registration are checked at commencement/orientation to ensure they are up to date',
  },
  {
    status: 'none',
    title:
      'Orientation is provided to each registrar at commencement - please attach the registrar specific orientation checklist/materials used by the practice.',
  },
  {
    status: 'none',
    title: 'Practice agrees to review the learning plans of registrars on a regular basis, as required by EV.',
  },
  {
    status: 'none',
    title: 'Practice agrees to ensure regular, planned and protected teaching time is provided as per EV requirements.',
  },
  {
    status: 'none',
    title:
      'Feedback is an essential part of training and can be either formal or informal. The\n' +
      'educational supervisor is primarily responsible for provision of feedback, but the whole\n' +
      'supervision team contribute to the monitoring of progress for the registrar. Practice\n' +
      'agrees to comply with the feedback requirements of EV',
  },
  {
    status: 'none',
    title:
      'Practice will comply with the supervision requirements appropriate to the level of training and competency of registrars as required by EV. Arrangements outside of this standard will be discussed and agreed to with registrar and EV in advance.',
  },
  {
    status: 'none',
    title: 'Practice will participate in and facilitate ECT, TA and Mini-CEX visits',
  },
  {
    status: 'none',
    title: 'Practice agrees to registrar release time for attending required EV educational workshops',
  },
  {
    status: 'none',
    title:
      'Workload and Patient numbers seen by registrars will comply with EV requirements for\n' +
      'their level of training and capacity. Registrars will see at least two patients per hour\n' +
      'and no more than four patients per hour, averaged over a month, except in times of\n' +
      'unusual clinical demand.',
  },
  {
    status: 'none',
    title: 'The registrar will continue to be provided with:',
    list: [
      'A suitably equipped room to conduct consultations with adequate technology\n' +
        '(phone, internet & communication software)',
      'Access to up to date educational references & patient information material – online or hard copy',
      'Private space for teaching',
    ],
  },
  {
    status: 'none',
    title:
      'Have there been changes to facilities or resources since last\n' +
      'accreditation/reaccreditation visit? If yes, please provide detail.',
  },
];

const supervisorStandardDetails = [
  {
    status: false,
    title: 'I am recognized as a Specialist GP by AHPRA ',
  },
  {
    status: false,
    title:
      'I confirm that I am not currently under investigation or the subject of disciplinary proceedings\n' +
      'under any jurisdiction. A yes answer indicates that this is correct.',
  },
  {
    status: false,
    title:
      'I confirm that I have not been removed from the register for conduct, health, or performance\n' +
      'reasons under any jurisdiction at any time in my career. A yes answer indicates that this is correct.',
  },
  {
    status: false,
    title: 'I confirm that I am not subject to any conditions, limitations or restrictions from any jurisdiction.',
  },
  {
    status: false,
    title: 'I have completed ongoing CPD as required by RACGP',
  },
  {
    status: false,
    title: 'I have completed ongoing CPD as required by ACRRM ',
  },
  {
    status: false,
    title: 'I have hospital clinical privileges',
  },
  {
    status: false,
    title:
      'I will continue to attend EV continuing professional development aimed at improving performance\n' +
      'as a general practice educator, as required by EV and the RACGP/ACCRM. This will be in alignment\n' +
      'with the requirements for the category of supervision sought.',
  },
  {
    status: false,
    title:
      'I agree to inform the Accreditation Coordinator at EV if there are changes to my medical registration that ' +
      'include any caution, undertaking, condition, reprimand, or if my medical registration is suspended or ' +
      'cancelled during any time that I am an accredited GP Supervisor. I am aware that should this occur, it may ' +
      'impact upon my accreditation as a GP Supervisor.',
  },
  {
    status: false,
    title:
      'I have read and understood the application form and agree to train to the standards/requirements\n' +
      'in alignment with the supervisor category sought. I also understand that not meeting the\n' +
      'requirements will lead to suspension or loss of accreditation and the practice may be ineligible to\n' +
      'take registrars. ',
  },
  {
    status: false,
    title:
      'I am aware that in becoming an accredited supervisor I will be required to abide by the conditions\n' +
      'of the Supervision and Training Agreement as agreed between EV and my practice. Please see your\n' +
      'Practice Manager to view a copy',
  },
];

const finalCheckListConstant = [
  { title: 'Application form completed and declaration signed by each supervisor', status: false },
  {
    title: 'Current practice accreditation certificate AGPAL or QPA (not mandatory for ACRRM)',
    status: false,
  },
  { title: 'Copy of the registrar-specific orientation document', status: false },
  { title: 'Copy of a registrar employment contract template', status: false },
  {
    title: 'Each supervisor Copy of hospital letter confirming clinical privileging (if applicable)',
    status: false,
  },
];

const summaryAssessment = [
  {
    title: 'Desktop',
    status: false,
  },
  {
    title: 'Short meeting',
    status: false,
  },
  {
    title: 'full zoom meeting',
    status: false,
  },
  {
    title: 'In person visit to practice',
    status: false,
  },
  {
    title: 'Other',
    status: false,
  },
];

const initialAccreditedReducer = {
  accreditedDetails: {},
  accreditedStepper: {},

  postDetails: {},
  formA: {
    practiceManagerList: [],
    supervisorList: [],
    registrarList: [],
    practiceManager: {
      hours: [...hoursTableData],
    },
    standards: [...formAStandardsConstant],
    supervisors: [
      {
        userId: [],
        categoryOfSupervisor: [],
        contactNumber: '',
        email: '',
      },
    ],
    registrars: [
      {
        placementId: [],
        note: '',
        hoursDetails: [...hoursTableData],
        onCall: [...hoursTableData],
      },
    ],
  },
  formA1: {
    finalCheckList: {
      recommendation: '',
      actioned: '',
      finalCheckLists: [...finalCheckListConstant],
    },
  },
  formB: {
    accreditorAssign: {
      accreditorId: [],
      accreditorNameList: [],
    },
    summary: {
      classification: '',
      dateOfVisit: '',
      dateOfReportComplete: '',
      assessment: [...summaryAssessment],
      applications: [],
      shadyOaksPractice: '',
      accreditationWithEV: false,
    },
    otherDetails: {
      previousIssues: '',
      summery: '',
      recomendationPanel: '',
      reviewedBy: '',
    },
  },
};

export const accreditedReducer = (state = initialAccreditedReducer, action) => {
  switch (action.type) {
    case ACCREDITED_REDUX_CONSTANTS.GET_ACCREDITED_DETAILS: {
      const isMulti = action?.data?.length > 1;
      return {
        ...state,
        accreditedDetails: {
          ...state?.accreditedDetails,
          facilityId: !isMulti ? action?.data?.facilityId : undefined,
          userId: !isMulti ? action?.data?.userId : undefined,
          // userId: !isMulti ? action?.data?.userId : undefined,
        },
        accreditedStepper: {
          ...state?.accreditedStepper,
          accreditionId: !isMulti ? action?.data?.accreditionId : undefined,
        },
      };
    }

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
      const { facilityId } = state.accreditedDetails;
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
          facilityId: !facilityId ? action?.data?.facilityId : facilityId,
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
      return {
        ...state,
        postDetails: {
          ...state?.postDetails,
          address: `${action?.data?.address} ${action?.data?.suburb} ${action?.data?.postalCode}`,
          facilityName: action?.data?.practiceName,
          facilityId: action?.data?.facilityId,
        },
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
          ? {
              label: _.upperCase(college),
              value: college,
              name: 'college',
            }
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
      };
    }

    // *** Form A ***

    // practice manager

    case ACCREDITED_REDUX_CONSTANTS.FORM_A.GET_PRACTICE_MANAGER_DETAILS: {
      const { userId, contactNumber, usualWorkingHours, hours, name, email } = action?.data;

      const practiceManager = {
        ...action?.data,
        userId: userId ? { label: name, value: userId, name: 'userId' } : [],
        contactNumber: contactNumber || '',
        usualWorkingHours: !_.isEmpty(usualWorkingHours) ? usualWorkingHours : { days: '', hours: '00:00' },
        hours: !_.isEmpty(hours) ? hours : [...hoursTableData],
        name: name || '',
        email: email || '',
      };
      return {
        ...state,
        formA: {
          ...state.formA,
          practiceManager,
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

    // standards
    case ACCREDITED_REDUX_CONSTANTS.FORM_A.GET_STANDARD_DETAILS: {
      return {
        ...state,
        formA: {
          ...state.formA,
          standards: !_.isEmpty(action?.data)
            ? action?.data?.map(e =>
                e?.title === 'The registrar will continue to be provided with:'
                  ? {
                      ...e,
                      list: [
                        'A suitably equipped room to conduct consultations with adequate technology\n' +
                          '(phone, internet & communication software)',
                        'Access to up to date educational references & patient information material – online or hard copy',
                        'Private space for teaching',
                      ],
                    }
                  : e,
              )
            : [...formAStandardsConstant],
        },
      };
    }

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
          }))
        : [
            {
              userId: [],
              categoryOfSupervisor: [],
              contactNumber: '',
              email: '',
            },
          ];

      return {
        ...state,
        formA: {
          ...state?.formA,
          supervisors: [...supervisors],
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
            },
          ],
        },
      };

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
          }))
        : [
            {
              placementId: [],
              note: '',
              hoursDetails: [...hoursTableData],
              onCall: [...hoursTableData],
            },
          ];

      return {
        ...state,
        formA: {
          ...state?.formA,
          registrars: [...registrars],
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

    // *** Form A1 ***

    // A1 supervisor
    case ACCREDITED_REDUX_CONSTANTS.FORM_A1.GET_A1_SUPERVISOR_DETAIL:
      return {
        ...state,
        formA1: {
          ...state.formA1,
          [action?.data?.userId]: {
            ...state?.formA1?.[action?.data?.userId],
            userId: action?.data?.userId,
            username: action?.data?.username ? action?.data?.username : '',
            email: action?.data?.email ? action?.data?.email : '',
            contactNumber: action?.data?.contactNumber ? action?.data?.contactNumber : '',
            categoryOfSupervisor: _.capitalize(action?.data?.categoryOfSupervisor),
            hours: [...hoursTableData],
            standardsDetail: [...supervisorStandardDetails],
          },
        },
      };

    case ACCREDITED_REDUX_CONSTANTS.FORM_A1.GET_A1_SUPERVISOR_DATA:
      return {
        ...state,
        formA1: {
          ...state.formA1,
          [action?.data?.userId]: {
            ...state?.formA1?.[action?.data?.userId],
            hours: !_.isEmpty(action?.data?.hours) ? action?.data?.hours : [...hoursTableData],
            standardsDetail: !_.isEmpty(action?.data?.standardsDetail)
              ? action?.data?.standardsDetail
              : [...supervisorStandardDetails],
          },
        },
      };

    case ACCREDITED_REDUX_CONSTANTS.FORM_A1.UPDATE_A1_SUPERVISOR_TIMING: {
      let { hours } = state.formA1?.[action.subFormName];
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
        formA1: {
          ...state.formA1,
          [action?.subFormName]: {
            ...state.formA1?.[action?.subFormName],
            hours,
          },
        },
      };
    }

    // final checklist

    case ACCREDITED_REDUX_CONSTANTS.FORM_A1.GET_FINAL_CHECKLIST_DATA: {
      return {
        ...state,
        formA1: {
          ...state.formA1,
          finalCheckList: {
            ...state.formA1.finalCheckList,
            recommendation: action?.data?.addressRecommendation?.recommendation || '',
            actioned: action?.data?.addressRecommendation?.actioned || '',
            finalCheckLists: !_.isEmpty(action?.data?.finalCheckList)
              ? action?.data?.finalCheckList
              : [...finalCheckListConstant],
          },
        },
      };
    }

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
        shadyOaksPractice: action?.data?.shadyOaksPractice || '',
        accreditationWithEV: action?.data?.accreditationWithEV ?? false,
      };
      return {
        ...state,
        formB: {
          ...state.formB,
          summary,
        },
      };
    }

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
      return {
        ...state,
        formB: {
          ...state.formB,
          accreditorAssign: {
            ...state?.formB?.accreditorAssign,
            accreditorId,
          },
        },
      };
    }

    case ACCREDITED_REDUX_CONSTANTS.FORM_B.GET_FORM_B_OTHER_DETAILS:
      return {
        ...state,
        formB: {
          ...state.formB,
          otherDetails: {
            previousIssues: action?.data?.previousIssues || '',
            summery: action?.data?.summery || '',
            recomendationPanel: action?.data?.recomendationPanel || '',
            reviewedBy: action?.data?.reviewedBy || '',
          },
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
