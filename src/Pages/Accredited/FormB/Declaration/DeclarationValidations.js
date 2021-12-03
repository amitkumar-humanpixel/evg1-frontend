import { saveAccreditedDeclarationDetails, updateAccreditedSubFormFields } from '../../redux/AccreditedReduxActions';
import { setNextAccreditedItemUrl } from '../../../../helpers/AccreditedGoToNextStepHelper';

export const declarationValidations = async (
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

  if (!data?.isAgree && isNextClick) {
    validated = false;
    errors.isAgree = 'Please check declaration to continue!';
    dispatch(updateAccreditedSubFormFields('formB', 'otherDetails', 'error', errors));
  } else {
    dispatch(updateAccreditedSubFormFields('formB', 'otherDetails', 'error', undefined));
  }
  if (validated) {
    try {
      await dispatch(saveAccreditedDeclarationDetails(id, data, accreditionId, !isNextClick));
      if (isNextClick) {
        setNextAccreditedItemUrl(history, accreditionSideBar, accreditionId, step, subStep);
      }
    } catch (e) {
      /**/
    }
  }
};
