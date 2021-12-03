import _ from 'lodash';
import moment from 'moment';
import {
  saveAccreditedSupervisorDetails,
  updateAccreditedSubFormArrayFields,
  updateSupervisorTimings,
} from '../../redux/AccreditedReduxActions';
import { setNextAccreditedItemUrl } from '../../../../helpers/AccreditedGoToNextStepHelper';
import { MOBILE_NUMBER_REGEX } from '../../../../constants/RegexConstants';

export const supervisorValidation = async (
  dispatch,
  history,
  data,
  id,
  userId,
  isNextClick,
  accreditionSideBar,
  accreditionId,
  step,
  subStep,
) => {
  let validated = true;
  const finalData = data?.map(e => ({
    userId: e?.userId?.value ? parseInt(e?.userId?.value, 10) : undefined,
    college: e?.college?.map(college => college?.value),
    contactNumber: e?.contactNumber,
    categoryOfSupervisor: e?.categoryOfSupervisor?.value,
    hours: e?.hours?.map(hour => ({
      ...hour,
      hours: moment(
        `${moment.duration(moment(hour?.finishTime, 'HH:mm').diff(moment(hour?.startTime, 'HH:mm'))).hours()}:${moment
          .duration(moment(hour?.finishTime, 'HH:mm').diff(moment(hour?.startTime, 'HH:mm')))
          .minutes()}`,
        'HH:mm',
      ).format('HH:mm'),
    })),
  }));

  finalData?.forEach((supervisor, index) => {
    const errors = {};
    if (!supervisor?.userId || supervisor?.userId?.toString()?.trim()?.length === 0) {
      validated = false;
      errors.userId = 'Please select name!';
    }

    if (!supervisor?.college || _.isEmpty(supervisor?.college)) {
      errors.college = 'Please select college!';
      validated = false;
    }

    if (!supervisor?.categoryOfSupervisor || supervisor?.categoryOfSupervisor?.toString()?.trim()?.length === 0) {
      validated = false;
      errors.categoryOfSupervisor = 'Please select category!';
    }

    if (!supervisor.contactNumber || supervisor?.contactNumber?.toString()?.trim()?.length === 0) {
      validated = false;
      errors.contactNumber = 'Please enter contact number!';
    }

    if (supervisor.contactNumber && !MOBILE_NUMBER_REGEX.test(supervisor.contactNumber)) {
      validated = false;
      errors.contactNumber = 'Please enter valid contact number!';
    }

    supervisor?.hours?.forEach(hour => {
      if (hour?.isChecked === 'true' && hour?.hours === '00:00') {
        validated = false;
        dispatch(
          updateSupervisorTimings(index, 'hours', hour?.days, 'error', 'Please select opening & closing hours!'),
        );
      } else if (hour?.startTime > hour?.finishTime) {
        validated = false;
        dispatch(
          updateSupervisorTimings(index, 'hours', hour?.days, 'error', 'Close time must be greater than Start time!'),
        );
      } else {
        dispatch(updateSupervisorTimings(index, 'hours', hour?.days, 'error', undefined));
      }
    });

    dispatch(updateAccreditedSubFormArrayFields('formA', 'supervisors', index, 'errors', errors));
  });

  if (validated) {
    try {
      await dispatch(saveAccreditedSupervisorDetails(id, finalData, accreditionId, isNextClick));
      if (isNextClick) setNextAccreditedItemUrl(history, accreditionSideBar, accreditionId, step, subStep);
    } catch (e) {
      /**/
    }
  }
};
