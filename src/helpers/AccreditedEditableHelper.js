import _ from 'lodash';

export const AccreditedEditableHelper = (sideBar, stepName, subStepName) => {
  if (stepName && !_.isEmpty(sideBar)) {
    const currentStep = sideBar?.find(e => e?.url === stepName);
    if (['postDetails', 'reaccreditationChecklist', 'previousRecommendations'].includes(currentStep?.url)) {
      return currentStep?.isEditable;
    }
    if (
      !['postDetails', 'reaccreditationChecklist', 'previousRecommendations'].includes(currentStep?.url) &&
      subStepName
    ) {
      if (currentStep?.subSteps?.length > 0) {
        return currentStep?.subSteps?.find(subStep => subStep?.url === subStepName)?.isEditable;
      }
    }
    return false;
  }
  return false;
};
