import {
  saveAccreditedAssignAccreditedDetails,
  updateAccreditedSubFormFields,
} from '../../redux/AccreditedReduxActions';
import { setNextAccreditedItemUrl } from '../../../../helpers/AccreditedGoToNextStepHelper';

export const accreditorAssignValidations = async (
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

  const finalData = {
    accreditorId: data?.accreditorId?.value ? parseInt(data?.accreditorId?.value, 10) : undefined,
  };

  if (!finalData?.accreditorId || finalData?.accreditorId?.toString()?.trim()?.length === 0) {
    validated = false;
    dispatch(updateAccreditedSubFormFields('formB', 'accreditorAssign', 'error', 'Please select accreditor!'));
  } else {
    dispatch(updateAccreditedSubFormFields('formB', 'accreditorAssign', 'error', undefined));
  }

  if (validated) {
    try {
      await dispatch(saveAccreditedAssignAccreditedDetails(id, finalData, accreditionId, isNextClick));
      if (isNextClick) setNextAccreditedItemUrl(history, accreditionSideBar, accreditionId, step, subStep);
      // history.push(`/accredited/formB/declaration/?id=${id}`);
    } catch (e) {
      /**/
    }
  }
};
