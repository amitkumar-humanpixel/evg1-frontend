import {
  saveAccreditedA1SupervisorDetails,
  saveAccreditedA1SupervisorDetailsPartially,
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
  const attachments = ['I have hospital clinical privileges'];
  const finalData = {
    userId: data?.userId,
    contactNumber: data?.contactNumber,
    categoryOfSupervisor: data?.categoryOfSupervisor,
    // hours: data?.hours?.map(hour => ({
    //   ...hour,
    //   hours: `${moment
    //     .duration(moment(hour?.finishTime, 'HH:mm').diff(moment(hour?.startTime, 'HH:mm')))
    //     .hours()}:${moment
    //     .duration(moment(hour?.finishTime, 'HH:mm').diff(moment(hour?.startTime, 'HH:mm')))
    //     .minutes()}`,
    // })),
    standardsDetail: data?.standardsDetail?.map(standardDetail => ({
      status: standardDetail?.status,
      title: standardDetail?.title,
      filePath: standardDetail?.filePath,
    })),
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
      } else if (detail?.status === 'true' && attachments.includes(detail?.title) && detail?.filePath?.length <= 0) {
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
      } else if (detail?.status !== 'true' && attachments.includes(detail?.title) && detail?.filePath?.length > 0) {
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
        (detail?.status !== 'none' && !attachments.includes(detail?.title)) ||
        (detail?.status !== 'none' && attachments.includes(detail?.title) && detail?.filePath?.length > 0)
      ) {
        dispatch(updateAccreditedSubFormDataArrayFields('formA1', sid, index, 'standardsDetail', 'error', undefined));
      }
    });

    // finalData?.hours?.forEach(hour => {
    //   if (hour?.isChecked === 'true' && hour?.hours === '0:0') {
    //     validated = false;
    //     dispatch(
    //       updateA1SupervisorTimings(
    //         `${sid}`,
    //         hour?.days,
    //         'error',
    //         'Please select opening & closing hours!'
    //       )
    //     );
    //   } else if (hour?.startTime > hour?.finishTime) {
    //     validated = false;
    //     dispatch(
    //       updateA1SupervisorTimings(
    //         `${sid}`,
    //         hour?.days,
    //         'error',
    //         'Close time must be greater than Start time!'
    //       )
    //     );
    //   } else {
    //     dispatch(updateA1SupervisorTimings(`${sid}`, hour?.days, 'error', undefined));
    //   }
    // });

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

    // finalData?.hours?.forEach(hour => {
    //   dispatch(updateA1SupervisorTimings(`${sid}`, hour?.days, 'error', undefined));
    // });

    dispatch(updateAccreditedSubFormFields('formA1', `${sid}`, 'error', undefined));
  }

  try {
    if (validated && isNextClick && data?.isAgree) {
      await dispatch(saveAccreditedA1SupervisorDetails(id, finalData, accreditionId));
      setNextAccreditedItemUrl(history, accreditionSideBar, accreditionId, step, subStep);
    }
    if (!isNextClick) await dispatch(saveAccreditedA1SupervisorDetailsPartially(id, finalData));
  } catch (e) {
    /**/
  }
};
