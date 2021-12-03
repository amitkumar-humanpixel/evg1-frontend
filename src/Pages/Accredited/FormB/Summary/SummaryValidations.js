import { saveAccreditedSummaryDetails } from '../../redux/AccreditedReduxActions';
import { setNextAccreditedItemUrl } from '../../../../helpers/AccreditedGoToNextStepHelper';

export const summaryValidations = async (
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
  // const validated = true;
  const finalData = {
    accreditorId: data?.accreditorUserId ? parseInt(data?.accreditorUserId, 10) : undefined,
    classification: data?.classification?.value,
    dateOfVisit: data?.dateOfVisit,
    dateOfReportComplete: data?.dateOfReportComplete,
    assessment: [...data?.assessment],
    applications: [...data?.applications],
    practiceDetail: data?.practiceDetail,
    accreditationWithEV: data?.accreditationWithEV,
  };
  try {
    await dispatch(saveAccreditedSummaryDetails(id, finalData, accreditionId, !isNextClick));
    if (isNextClick) {
      setNextAccreditedItemUrl(history, accreditionSideBar, accreditionId, step, subStep);
    }
  } catch (e) {
    /**/
  }
};
