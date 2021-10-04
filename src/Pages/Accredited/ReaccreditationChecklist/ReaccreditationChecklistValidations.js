import { setNextAccreditedItemUrl } from '../../../helpers/AccreditedGoToNextStepHelper';

export const ReaccreditationChecklistValidations = async (
  dispatch,
  history,
  data,
  userId,
  facilityId,
  isNextClick,
  accreditionSideBar,
  accreditionId,
  step,
  subStep,
) => {
  const validated = true;

  if (validated) {
    try {
      if (isNextClick) setNextAccreditedItemUrl(history, accreditionSideBar, accreditionId, step, subStep);
      // history.push(`/accredited/formB/?id=${id}`);
    } catch (e) {
      /**/
    }
  }
};
