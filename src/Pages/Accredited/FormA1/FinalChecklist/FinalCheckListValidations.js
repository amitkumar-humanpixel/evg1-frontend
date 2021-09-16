import { saveAccreditedFinalCheckListDetails } from '../../redux/AccreditedReduxActions';
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
  // const errors = {};
  const validated = true;

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
