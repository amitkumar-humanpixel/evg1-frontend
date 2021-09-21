import moment from 'moment';
import {
  saveAccreditedPracticeManagerDetails,
  updateAccreditedSubFormDataArrayFields,
  updateAccreditedSubFormFields,
} from '../../redux/AccreditedReduxActions';
import { setNextAccreditedItemUrl } from '../../../../helpers/AccreditedGoToNextStepHelper';
import { MOBILE_NUMBER_REGEX, NUMBER_REGEX } from '../../../../constants/RegexConstants';

export const practiceManagerValidation = async (
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
  const errors = {};
  let validated = true;
  const finalData = {
    userId: data?.userId?.value ? parseInt(data?.userId?.value, 10) : undefined,
    email: data?.email,
    usualWorkingHours: data?.usualWorkingHours,
    contactNumber: data?.contactNumber,
    hours: data?.hours.map(hour => ({
      ...hour,
      hours: `${moment
        .duration(moment(hour?.finishTime, 'HH:mm').diff(moment(hour?.startTime, 'HH:mm')))
        .hours()}:${moment
        .duration(moment(hour?.finishTime, 'HH:mm').diff(moment(hour?.startTime, 'HH:mm')))
        .minutes()}`,
    })),
  };

  if (!finalData?.userId || finalData?.userId?.toString()?.trim()?.length === 0) {
    validated = false;
    errors.userId = 'Please select name!';
  }

  if (!finalData?.contactNumber || finalData?.contactNumber?.toString()?.trim()?.length === 0) {
    validated = false;
    errors.contactNumber = 'Please enter phone number!';
  }

  if (finalData?.contactNumber && !MOBILE_NUMBER_REGEX.test(finalData.contactNumber)) {
    validated = false;
    errors.contactNumber = 'Please enter valid phone number!';
  }

  if (!finalData?.usualWorkingHours?.days || finalData?.usualWorkingHours?.days?.toString()?.trim()?.length === 0) {
    validated = false;
    errors.usualWorkingHours = 'Please enter working days!';
  }

  if (finalData?.usualWorkingHours?.days && !NUMBER_REGEX.test(finalData?.usualWorkingHours?.days)) {
    validated = false;
    errors.usualWorkingHours = 'Please enter valid working days!';
  }

  finalData?.hours?.forEach((hour, index) => {
    if (hour?.isChecked === true && hour?.hours === '0:0') {
      validated = false;
      dispatch(
        updateAccreditedSubFormDataArrayFields(
          'formA',
          'practiceManager',
          index,
          'hours',
          'error',
          'Please select opening & closing hours!',
        ),
      );
    } else if (hour?.startTime > hour?.finishTime) {
      validated = false;
      dispatch(
        updateAccreditedSubFormDataArrayFields(
          'formA',
          'practiceManager',
          index,
          'hours',
          'error',
          'Close time must be greater than Start time!',
        ),
      );
    } else {
      dispatch(updateAccreditedSubFormDataArrayFields('formA', 'practiceManager', index, 'hours', 'error', undefined));
    }
  });

  dispatch(updateAccreditedSubFormFields('formA', 'practiceManager', 'errors', errors));

  if (validated) {
    try {
      await dispatch(saveAccreditedPracticeManagerDetails(id, finalData, accreditionId));
      if (isNextClick) setNextAccreditedItemUrl(history, accreditionSideBar, accreditionId, step, subStep);
    } catch (e) {
      /**/
    }
  }
};
