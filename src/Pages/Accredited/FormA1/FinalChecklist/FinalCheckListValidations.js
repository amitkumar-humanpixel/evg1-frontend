import {
  saveAccreditedFinalCheckListDetails,
  updateAccreditedSubFormDataArrayFields,
  updateAccreditedSubFormFields,
} from '../../redux/AccreditedReduxActions';
import { setNextAccreditedItemUrl } from '../../../../helpers/AccreditedGoToNextStepHelper';

export const finalCheckListValidations = async (
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
  const errors = {};

  data?.finalCheckLists?.forEach((point, index) => {
    if (!point?.status || point?.status === 'none') {
      validated = false;
      dispatch(
        updateAccreditedSubFormDataArrayFields(
          'formA1',
          'finalCheckList',
          index,
          'finalCheckLists',
          'error',
          'Please select suitable status for this point',
        ),
      );
    } else {
      dispatch(
        updateAccreditedSubFormDataArrayFields(
          'formA1',
          'finalCheckList',
          index,
          'finalCheckLists',
          'error',
          undefined,
        ),
      );
    }
  });
  if (data?.actioned?.toString()?.trim()?.length <= 0) {
    validated = false;
    errors.actioned = 'Please enter relevant explanation';
  }
  if (data?.recommendation?.toString()?.trim()?.length <= 0) {
    validated = false;
    errors.recommendation = 'Please enter recommendation/s';
  }
  if (!validated) {
    dispatch(updateAccreditedSubFormFields('formA1', 'finalCheckList', 'errors', errors));
  }
  if (validated) {
    try {
      await dispatch(saveAccreditedFinalCheckListDetails(id, data, accreditionId));
      if (isNextClick) setNextAccreditedItemUrl(history, accreditionSideBar, accreditionId, step, subStep);
      // history.push(`/accredited/formB/?id=${id}`);
    } catch (e) {
      /**/
    }
  }
};
