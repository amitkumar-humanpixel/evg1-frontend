export const week = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export const practiceManagerStandardDetails = [
  {
    detail: 'Practice is accredited by AGPAL or QPA (not mandatory for ACRRM) – please attach certificate',
    attachment: true,
  },
  {
    detail: 'Supervisors hold practitioner medical indemnity insurance',
  },
  {
    detail: 'Practice holds separate medical indemnity insurance (not mandatory but recommended)',
  },
  {
    detail:
      'Registrars continue to be employed to the current National Terms and Conditions for Employment of Registrars – please attach employment contract template',
    attachment: true,
  },
  {
    detail:
      'Registrars medical indemnity and registration are checked at commencement/orientation to ensure they are up to date',
  },
  {
    detail:
      'Orientation is provided to each registrar at commencement - please attach the registrar specific orientation checklist/materials used by the practice.',
    attachment: true,
  },
  {
    detail: 'Practice agrees to review the learning plans of registrars on a regular basis, as required by EV.',
  },
  {
    detail:
      'Practice agrees to ensure regular, planned and protected teaching time is provided as per EV requirements.',
  },
  {
    detail:
      'Feedback is an essential part of training and can be either formal or informal. The\n' +
      'educational supervisor is primarily responsible for provision of feedback, but the whole\n' +
      'supervision team contribute to the monitoring of progress for the registrar. Practice\n' +
      'agrees to comply with the feedback requirements of EV',
  },
  {
    detail:
      'Practice will comply with the supervision requirements appropriate to the level of training and competency of registrars as required by EV. Arrangements outside of this standard will be discussed and agreed to with registrar and EV in advance.',
  },
  {
    detail: 'Practice will participate in and facilitate ECT, TA and Mini-CEX visits',
  },
  {
    detail: 'Practice agrees to registrar release time for attending required EV educational workshops',
  },
  {
    detail:
      'Workload and Patient numbers seen by registrars will comply with EV requirements for\n' +
      'their level of training and capacity. Registrars will see at least two patients per hour\n' +
      'and no more than four patients per hour, averaged over a month, except in times of\n' +
      'unusual clinical demand.',
  },
  {
    detail: 'The registrar will continue to be provided with:',
    list: [
      'A suitably equipped room to conduct consultations with adequate technology\n' +
        '(phone, internet & communication software)',
      'Access to up to date educational references & patient information material – online or hard copy',
      'Private space for teaching',
    ],
  },
  {
    detail:
      'Have there been changes to facilities or resources since last\n' +
      'accreditation/reaccreditation visit? If yes, please provide detail.',
  },
];

export const supervisorStandardDetails = [
  {
    detail: 'I am recognized as a Specialist GP by AHPRA ',
  },
  {
    detail:
      'I confirm that I am not currently under investigation or the subject of disciplinary proceedings\n' +
      'under any jurisdiction. A yes answer indicates that this is correct.',
  },
  {
    detail:
      'I confirm that I have not been removed from the register for conduct, health, or performance\n' +
      'reasons under any jurisdiction at any time in my career. A yes answer indicates that this is correct.',
  },
  {
    detail: 'I confirm that I am not subject to any conditions, limitations or restrictions from any jurisdiction.',
  },
  {
    detail: 'I have completed ongoing CPD as required by RACGP',
  },
  {
    detail: 'I have completed ongoing CPD as required by ACRRM ',
  },
  {
    detail: 'I have hospital clinical privileges',
    attachment: true,
  },
  {
    detail:
      'I will continue to attend EV continuing professional development aimed at improving performance\n' +
      'as a general practice educator, as required by EV and the RACGP/ACCRM. This will be in alignment\n' +
      'with the requirements for the category of supervision sought.',
  },
  {
    detail:
      'I agree to inform the Accreditation Coordinator at EV if there are changes to my medical registration that ' +
      'include any caution, undertaking, condition, reprimand, or if my medical registration is suspended or ' +
      'cancelled during any time that I am an accredited GP Supervisor. I am aware that should this occur, it may ' +
      'impact upon my accreditation as a GP Supervisor.',
  },
  {
    detail:
      'I have read and understood the application form and agree to train to the standards/requirements\n' +
      'in alignment with the supervisor category sought. I also understand that not meeting the\n' +
      'requirements will lead to suspension or loss of accreditation and the practice may be ineligible to\n' +
      'take registrars. ',
  },
  {
    detail:
      'I am aware that in becoming an accredited supervisor I will be required to abide by the conditions\n' +
      'of the Supervision and Training Agreement as agreed between EV and my practice. Please see your\n' +
      'Practice Manager to view a copy',
  },
];

export const finalChecklist = [
  'Application form completed and declaration signed by each supervisor',
  'Current practice accreditation certificate AGPAL or QPA (not mandatory for ACRRM)',
  'Copy of the registrar-specific orientation document',
  'Copy of a registrar employment contract template',
  'Each supervisor Copy of hospital letter confirming clinical privileging (if applicable)',
];

export const accreditedSteps = [
  {
    name: 'Post Details',
    completed: true,
    subSteps: [],
    url: 'postDetails',
    activeStepIndex: 0,
  },
  {
    name: 'Form A',
    completed: false,
    url: 'formA',
    activeStepIndex: 1,

    subSteps: [
      {
        subStepName: 'Practice Manager',
        completed: true,
        url: 'practiceManager',
        activeSubStepIndex: 0,
      },
      {
        subStepName: 'Standards',
        completed: true,
        url: 'standards',
        activeSubStepIndex: 1,
      },
      {
        subStepName: 'Supervisor',
        completed: false,
        url: 'supervisor',
        activeSubStepIndex: 2,
      },
      {
        subStepName: 'Registrar',
        completed: false,
        url: 'registrar',
        activeSubStepIndex: 3,
      },
    ],
  },
  {
    name: 'Form A1',
    completed: false,
    url: 'formA1',
    activeStepIndex: 2,

    subSteps: [
      {
        subStepName: 'Supervisor1',
        completed: false,
        url: 'supervisor1',
        activeSubStepIndex: 0,
      },
      {
        subStepName: 'Supervisor2',
        completed: false,
        url: 'supervisor2',
        activeSubStepIndex: 1,
      },
      {
        subStepName: 'Supervisor1',
        completed: false,
        url: 'supervisor1',
        activeSubStepIndex: 0,
      },
      {
        subStepName: 'Supervisor2',
        completed: false,
        url: 'supervisor2',
        activeSubStepIndex: 1,
      },
      {
        subStepName: 'Supervisor1',
        completed: false,
        url: 'supervisor1',
        activeSubStepIndex: 0,
      },
      {
        subStepName: 'Supervisor2',
        completed: false,
        url: 'supervisor2',
        activeSubStepIndex: 1,
      },
      {
        subStepName: 'Supervisor1',
        completed: false,
        url: 'supervisor1',
        activeSubStepIndex: 0,
      },
      {
        subStepName: 'Supervisor2',
        completed: false,
        url: 'supervisor2',
        activeSubStepIndex: 1,
      },
      {
        subStepName: 'Supervisor1',
        completed: false,
        url: 'supervisor1',
        activeSubStepIndex: 0,
      },
      {
        subStepName: 'Supervisor2',
        completed: false,
        url: 'supervisor2',
        activeSubStepIndex: 1,
      },
      {
        subStepName: 'Final Checklist',
        completed: false,
        url: 'finalCheckList',
        activeSubStepIndex: 2,
      },
    ],
  },
  {
    name: 'Form B',
    completed: false,
    url: 'formB',
    activeStepIndex: 3,

    subSteps: [
      {
        subStepName: 'Summary',
        completed: false,
        url: 'summary',
        activeSubStepIndex: 0,
      },
      {
        subStepName: 'Declaration',
        completed: false,
        url: 'declaration',
        activeSubStepIndex: 1,
      },
    ],
  },
];
