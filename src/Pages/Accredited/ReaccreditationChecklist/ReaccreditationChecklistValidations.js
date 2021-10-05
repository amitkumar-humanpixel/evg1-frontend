import { saveReAccreditedCheckList, updateAccreditedSubFormArrayFields } from '../redux/AccreditedReduxActions';
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
  let validated = true;

  const finalData = {
    facilityId,
    reaccreditationChecklist: data?.reaccreditationChecklist,
  };

  finalData?.reaccreditationChecklist?.forEach((point, index) => {
    if (!point?.status || point?.status === 'none') {
      validated = false;
      dispatch(
        updateAccreditedSubFormArrayFields(
          'reaccreditationChecklist',
          'reaccreditationChecklist',
          index,
          'error',
          'Please select suitable status for this point',
        ),
      );
    } else {
      dispatch(
        updateAccreditedSubFormArrayFields(
          'reaccreditationChecklist',
          'reaccreditationChecklist',
          index,
          'error',
          undefined,
        ),
      );
    }
  });

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
