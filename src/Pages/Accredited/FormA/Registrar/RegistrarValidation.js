import moment from 'moment';
import {
  saveAccreditedRegistrarDetails,
  updateAccreditedSubFormArrayFields,
  updateRegistrarTimings,
} from '../../redux/AccreditedReduxActions';
import { setNextAccreditedItemUrl } from '../../../../helpers/AccreditedGoToNextStepHelper';

export const registrarValidation = async (
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

  const finalData = data?.map(e => ({
    placementId: e?.placementId?.value ? parseInt(e?.placementId?.value, 10) : undefined,
    note: e?.note,
    hoursDetails: e?.hoursDetails.map(hour => ({
      ...hour,
      hours: moment(
        `${moment.duration(moment(hour?.finishTime, 'HH:mm').diff(moment(hour?.startTime, 'HH:mm'))).hours()}:${moment
          .duration(moment(hour?.finishTime, 'HH:mm').diff(moment(hour?.startTime, 'HH:mm')))
          .minutes()}`,
        'HH:mm',
      ).format('HH:mm'),
    })),
    onCall: e?.onCall.map(hour => ({
      ...hour,
      hours: moment(
        `${moment.duration(moment(hour?.finishTime, 'HH:mm').diff(moment(hour?.startTime, 'HH:mm'))).hours()}:${moment
          .duration(moment(hour?.finishTime, 'HH:mm').diff(moment(hour?.startTime, 'HH:mm')))
          .minutes()}`,
        'HH:mm',
      ).format('HH:mm'),
    })),
    note1: e?.note1,
    note2: e?.note2,
  }));

  finalData?.forEach((registrar, index) => {
    if (!registrar?.placementId || registrar?.placementId?.value?.toString()?.trim()?.length === 0) {
      validated = false;
      errors.placementId = 'Please select name!';
      dispatch(updateAccreditedSubFormArrayFields('formA', 'registrars', index, 'errors', errors));
    } else {
      errors.placementId = undefined;
      dispatch(updateAccreditedSubFormArrayFields('formA', 'registrars', index, 'errors', errors));
    }

    registrar?.hoursDetails?.forEach(hour => {
      if (hour?.isChecked === 'true' && hour?.hours === '00:00') {
        validated = false;
        dispatch(
          updateRegistrarTimings(index, 'hoursDetails', hour?.days, 'error', 'Please select opening & closing hours!'),
        );
      } else if (hour?.startTime > hour?.finishTime) {
        validated = false;
        dispatch(
          updateRegistrarTimings(
            index,
            'hoursDetails',
            hour?.days,
            'error',
            'Close time must be greater than Start time!',
          ),
        );
      } else {
        dispatch(updateRegistrarTimings(index, 'hoursDetails', hour?.days, 'error', undefined));
      }
    });
    registrar?.onCall?.forEach(hour => {
      if (hour?.isChecked === 'true' && hour?.hours === '00:00') {
        validated = false;
        dispatch(
          updateRegistrarTimings(index, 'onCall', hour?.days, 'error', 'Please select opening & closing hours!'),
        );
      } else if (hour?.startTime > hour?.finishTime) {
        validated = false;
        dispatch(
          updateRegistrarTimings(index, 'onCall', hour?.days, 'error', 'Close time must be greater than Start time!'),
        );
      } else {
        dispatch(updateRegistrarTimings(index, 'onCall', hour?.days, 'error', undefined));
      }
    });
  });

  if (validated) {
    try {
      await dispatch(saveAccreditedRegistrarDetails(id, finalData, accreditionId, isNextClick));
      if (isNextClick) setNextAccreditedItemUrl(history, accreditionSideBar, accreditionId, step, subStep);
    } catch (e) {
      /**/
    }
  }
};
