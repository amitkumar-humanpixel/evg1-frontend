import { savePreviousRecommendationsData, updateAccreditedFields } from '../redux/AccreditedReduxActions';
import { setNextAccreditedItemUrl } from '../../../helpers/AccreditedGoToNextStepHelper';

export const PreviousRecommendationsValidation = async (
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

  const finalData = {
    actioned: data?.actioned,
    recommendation: data?.recommendation,
  };

  if (finalData?.actioned?.toString()?.trim()?.length <= 0) {
    validated = false;
    errors.actioned = 'Please enter relevant explanation';
  }
  dispatch(updateAccreditedFields('previousRecommendations', 'errors', errors));

  if (validated) {
    try {
      await dispatch(savePreviousRecommendationsData(id, finalData, accreditionId));
      if (isNextClick) setNextAccreditedItemUrl(history, accreditionSideBar, accreditionId, step, subStep);
      // history.push(`/accredited/formB/?id=${id}`);
    } catch (e) {
      /**/
    }
  }
};
