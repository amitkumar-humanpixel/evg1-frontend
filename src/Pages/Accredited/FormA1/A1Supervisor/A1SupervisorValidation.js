import {
  saveAccreditedA1SupervisorDetails,
  updateAccreditedSubFormDataArrayFields,
  updateAccreditedSubFormFields,
} from '../../redux/AccreditedReduxActions';
import { setNextAccreditedItemUrl } from '../../../../helpers/AccreditedGoToNextStepHelper';

export const a1SupervisorValidation = async (
  dispatch,
  history,
  data,
  id,
  sid,
  userId,
  isNextClick,
  accreditionSideBar,
  accreditionId,
  step,
  subStep,
) => {
  let validated = true;
  const error = {};
  const finalData = {
    userId: data?.userId,
    contactNumber: data?.contactNumber,
    categoryOfSupervisor: data?.categoryOfSupervisor,
    standardsDetail: data?.standardsDetail,
    isAgree: data?.isAgree,
  };

  if (isNextClick) {
    finalData.standardsDetail.forEach((detail, index) => {
      if (!detail?.status || detail?.status === 'none') {
        validated = false;
        dispatch(
          updateAccreditedSubFormDataArrayFields(
            'formA1',
            sid,
            index,
            'standardsDetail',
            'error',
            'Please read and change status to continue!',
          ),
        );
      } else if (
        detail?.status === 'true' &&
        detail?.isFileUploadAllowed &&
        (!detail.filePath || detail?.filePath?.length <= 0)
      ) {
        validated = false;
        dispatch(
          updateAccreditedSubFormDataArrayFields(
            'formA1',
            sid,
            index,
            'standardsDetail',
            'error',
            'Please attach relevant document!',
          ),
        );
      } else if (detail?.status !== 'true' && detail?.isFileUploadAllowed && detail?.filePath?.length > 0) {
        validated = false;
        dispatch(
          updateAccreditedSubFormDataArrayFields(
            'formA1',
            sid,
            index,
            'standardsDetail',
            'error',
            'Please change the status',
          ),
        );
      } else if (
        (detail?.status !== 'none' && !detail?.isFileUploadAllowed) ||
        (detail?.status !== 'none' && detail?.isFileUploadAllowed && detail?.filePath?.length > 0)
      ) {
        dispatch(updateAccreditedSubFormDataArrayFields('formA1', sid, index, 'standardsDetail', 'error', undefined));
      }
    });

    if (!data?.isAgree) {
      validated = false;
      error.isAgree = 'Please check declaration to continue! ';
      dispatch(updateAccreditedSubFormFields('formA1', `${sid}`, 'error', error));
    } else {
      error.isAgree = undefined;
      dispatch(updateAccreditedSubFormFields('formA1', `${sid}`, 'error', error));
    }
  } else {
    finalData.standardsDetail.forEach((detail, index) => {
      dispatch(updateAccreditedSubFormDataArrayFields('formA1', sid, index, 'standardsDetail', 'error', undefined));
    });

    dispatch(updateAccreditedSubFormFields('formA1', `${sid}`, 'error', undefined));
  }

  try {
    if (validated && data?.isAgree) {
      await dispatch(saveAccreditedA1SupervisorDetails(id, sid, finalData, accreditionId, isNextClick));
      if (isNextClick) setNextAccreditedItemUrl(history, accreditionSideBar, accreditionId, step, subStep);
    }
  } catch (e) {
    /**/
  }
};
