import { setNextAccreditedItemUrl } from '../../../helpers/AccreditedGoToNextStepHelper';
import { saveReAccreditedCheckList } from '../redux/AccreditedReduxActions';

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

  const finalData = {
    facilityId,
    reaccreditationChecklist: data?.map(e => ({ ...e, status: 'true' })),
  };

  if (validated) {
    try {
      await dispatch(saveReAccreditedCheckList(finalData, accreditionId));
      if (isNextClick) setNextAccreditedItemUrl(history, accreditionSideBar, accreditionId, step, subStep);
      // history.push(`/accredited/formB/?id=${id}`);
    } catch (e) {
      /**/
    }
  }
};
