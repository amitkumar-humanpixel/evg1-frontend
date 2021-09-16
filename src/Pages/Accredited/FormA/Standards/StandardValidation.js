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
  const finalData = data?.map(e => ({
    attachment: e?.attachment,
    status: e?.status,
    title: e?.title,
    filePath: e?.filePath,
    remarks: e?.remarks,
  }));
  const attachments = [
    'Orientation is provided to each registrar at commencement - please attach the registrar specific orientation checklist/materials used by the practice.',
    'Practice is accredited by AGPAL or QPA (not mandatory for ACRRM) – please attach certificate',
    'Registrars continue to be employed to the current National Terms and Conditions for Employment of Registrars – please attach employment contract template',
  ];

  data?.forEach((condition, index) => {
    if (condition?.status === 'true' && attachments.includes(condition?.title) && !condition?.filePath) {
      validated = false;
      dispatch(
        updateAccreditedSubFormArrayFields('formA', 'standards', index, 'error', 'Please attach relevant document!'),
      );
    } else if (condition?.status !== 'true' && attachments?.includes(condition.title) && condition?.filePath) {
      validated = false;
      dispatch(updateAccreditedSubFormArrayFields('formA', 'standards', index, 'error', 'Please change the status!'));
    }
  });

  data?.forEach((condition, index) => {
    if (
      condition?.title ===
        'Have there been changes to facilities or resources since last\n' +
          'accreditation/reaccreditation visit? If yes, please provide detail.' &&
      condition?.status === 'true' &&
      (!condition?.remarks || condition?.remarks?.toString()?.trim()?.length <= 0)
    ) {
      validated = false;
      dispatch(updateAccreditedSubFormArrayFields('formA', 'standards', index, 'error', 'Please add detail!'));
    }
  });

  if (validated) {
    try {
      await dispatch(saveAccreditedStandardDetails(id, finalData, accreditionId));
      if (isNextClick) setNextAccreditedItemUrl(history, accreditionSideBar, accreditionId, step, subStep);
    } catch (e) {
      /**/
    }
  }
};
