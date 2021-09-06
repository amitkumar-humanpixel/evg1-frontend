import { saveAccreditedDeclarationDetails, updateAccreditedSubFormFields } from '../../redux/AccreditedReduxActions';
import { setNextAccreditedItemUrl } from '../../../../helpers/AccreditedGoToNextStepHelper';

export const declarationValidations = async (
  dispatch,
  history,
  data,
  id,
  userId,
  facilityId,
  isNextClick,
  accreditionSideBar,
  accreditionId,
  step,
  subStep,
) => {
  const errors = {};
  let validated = true;

  if (!data?.declarationStatus) {
    validated = false;
    errors.declarationStatus = 'Please check declaration to continue!';
    dispatch(updateAccreditedSubFormFields('formB', 'otherDetails', 'error', errors));
  }

  if (validated) {
    try {
      await dispatch(saveAccreditedDeclarationDetails(id, data, accreditionId));
      if (isNextClick) setNextAccreditedItemUrl(history, accreditionSideBar, accreditionId, step, subStep);
      // history.push(`/dashboard`);
    } catch (e) {
      /**/
    }
  }
};
