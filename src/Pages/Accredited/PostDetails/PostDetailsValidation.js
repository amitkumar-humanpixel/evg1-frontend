import _ from 'lodash';
import { saveAccreditedPostDetails, updateAccreditedFields } from '../redux/AccreditedReduxActions';
import { MOBILE_NUMBER_REGEX, WEBSITE_URL } from '../../../constants/RegexConstants';
import { setNextAccreditedItemUrl } from '../../../helpers/AccreditedGoToNextStepHelper';

export const postDetailsValidation = async (
  dispatch,
  history,
  data,
  userId,
  isNextClick,
  accreditionSideBar,
  accreditionId,
  step,
  subStep,
) => {
  const errors = {};
  let validated = true;
  const finalData = {
    facilityId: data?.facilityId,
    college: data?.college?.value,
    address: data?.address,
    accreditationBody: data?.accreditationBody?.map(e => e?.value),
    accreditationEndDate: data?.accreditationEndDate,
    phone: data?.phone,
    totalNumberGPs: data?.totalNumberGPs,
    practiceWebsite: data?.practiceWebsite,
  };
  if (!finalData?.facilityId || finalData?.facilityId?.toString()?.trim()?.length === 0) {
    errors.facilityId = 'Please select facility Name!';
    validated = false;
  }
  if (!finalData?.college || finalData?.college?.toString()?.trim()?.length === 0) {
    errors.college = 'Please select college!';
    validated = false;
  }
  if (!finalData?.address || finalData?.address?.toString()?.trim()?.length === 0) {
    errors.address = 'Please enter address!';
    validated = false;
  }
  if (!finalData?.accreditationBody || _.isEmpty(finalData?.accreditationBody)) {
    errors.accreditationBody = 'Please select accreditation body!';
    validated = false;
  }
  if (!finalData?.accreditationEndDate || finalData?.accreditationEndDate?.toString()?.trim()?.length === 0) {
    errors.accreditationEndDate = 'Please select accreditation end date!';
    validated = false;
  }
  if (!finalData?.phone || finalData?.phone?.toString()?.trim()?.length === 0) {
    errors.phone = 'Please enter phone number!';
    validated = false;
  }
  if (finalData?.phone && !MOBILE_NUMBER_REGEX.test(finalData?.phone)) {
    errors.phone = 'Please enter valid phone number!';
    validated = false;
  }
  if (!finalData?.totalNumberGPs || finalData?.totalNumberGPs?.toString()?.trim()?.length === 0) {
    errors.totalNumberGPs = 'Please enter total no of GPS!';
    validated = false;
  }
  if (!finalData?.practiceWebsite || finalData?.practiceWebsite?.toString()?.trim()?.length === 0) {
    errors.practiceWebsite = 'Please enter practice website!';
    validated = false;
  }
  if (finalData.practiceWebsite && !WEBSITE_URL.test(finalData.practiceWebsite)) {
    errors.practiceWebsite = 'Please enter valid  practice website!';
    validated = false;
  }
  dispatch(updateAccreditedFields('postDetails', 'errors', errors));
  if (validated) {
    try {
      await dispatch(saveAccreditedPostDetails(finalData, accreditionId));
      if (isNextClick) setNextAccreditedItemUrl(history, accreditionSideBar, accreditionId, step, subStep);
    } catch (e) {
      /**/
    }
  }
};
