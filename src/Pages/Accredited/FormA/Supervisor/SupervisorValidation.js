import {
  saveAccreditedSupervisorDetails,
  updateAccreditedSubFormArrayFields,
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
    contactNumber: e?.contactNumber,
    categoryOfSupervisor: e?.categoryOfSupervisor?.value,
  }));

  data?.forEach((supervisor, index) => {
    const errors = {};
    if (!supervisor?.userId || supervisor?.userId?.toString()?.trim()?.length === 0) {
      validated = false;
      errors.userId = 'Please select name!';
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

    dispatch(updateAccreditedSubFormArrayFields('formA', 'supervisors', index, 'errors', errors));
  });

  if (validated) {
    try {
      await dispatch(saveAccreditedSupervisorDetails(id, finalData, accreditionId));
      if (isNextClick) setNextAccreditedItemUrl(history, accreditionSideBar, accreditionId, step, subStep);
      // history.push(`/accredited/formA/registrar/?id=${id}`);
    } catch (e) {
      /**/
    }
  }
};
