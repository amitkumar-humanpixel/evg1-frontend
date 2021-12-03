import { setNextAccreditedItemUrl } from '../../../../helpers/AccreditedGoToNextStepHelper';
import { saveAccreditedStandardDetails, updateAccreditedSubFormArrayFields } from '../../redux/AccreditedReduxActions';

export const standardValidation = async (
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
  const finalData = data;

  data?.forEach((condition, index) => {
    if (condition?.status === 'none') {
      validated = false;
      dispatch(
        updateAccreditedSubFormArrayFields(
          'formA',
          'standards',
          index,
          'error',
          'Please read and change status to continue!',
        ),
      );
    } else if (
      condition?.status === 'true' &&
      condition?.isFileUploadAllowed &&
      (!condition.filePath || condition?.filePath?.length <= 0)
    ) {
      validated = false;
      dispatch(
        updateAccreditedSubFormArrayFields('formA', 'standards', index, 'error', 'Please attach relevant document!'),
      );
    } else if (condition?.status !== 'true' && condition?.isFileUploadAllowed && condition?.filePath?.length > 0) {
      validated = false;
      dispatch(updateAccreditedSubFormArrayFields('formA', 'standards', index, 'error', 'Please change the status!'));
    } else if (condition?.status === 'true' && condition?.isFileUploadAllowed && condition?.filePath?.length > 0) {
      dispatch(updateAccreditedSubFormArrayFields('formA', 'standards', index, 'error', undefined));
    } else if (condition?.status !== 'none') {
      dispatch(updateAccreditedSubFormArrayFields('formA', 'standards', index, 'error', undefined));
    }
  });

  data?.forEach((condition, index) => {
    if (
      condition.isRemark &&
      condition?.status === 'true' &&
      (!condition?.remarks || condition?.remarks?.toString()?.trim()?.length <= 0)
    ) {
      validated = false;
      dispatch(updateAccreditedSubFormArrayFields('formA', 'standards', index, 'error', 'Please add detail!'));
    }
    if (
      condition.isRemark &&
      condition?.status === 'true' &&
      (condition?.remarks || condition?.remarks?.toString()?.trim()?.length > 0)
    ) {
      dispatch(updateAccreditedSubFormArrayFields('formA', 'standards', index, 'error', undefined));
    }
  });

  if (validated) {
    try {
      await dispatch(saveAccreditedStandardDetails(id, finalData, accreditionId, isNextClick));
      if (isNextClick) setNextAccreditedItemUrl(history, accreditionSideBar, accreditionId, step, subStep);
    } catch (e) {
      /**/
    }
  }
};
