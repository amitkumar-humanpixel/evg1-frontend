export const setNextAccreditedItemUrl = (history, accreditionSideBar, accreditionId, step, subStep) => {
  const activeStep = accreditionSideBar?.find(e => e?.url === step);
  const activeSubStep = activeStep?.subSteps?.find(e => e?.url === subStep);
  if (activeStep?.activeStepIndex < accreditionSideBar?.length) {
    if (activeStep?.subSteps?.length > 0 && activeSubStep?.activeSubStepIndex < activeStep?.subSteps?.length - 1) {
      const nextSubStep = activeStep?.subSteps?.[activeSubStep?.activeSubStepIndex + 1];
      history.push(
        `/accredited/${step}/${nextSubStep?.url}/?id=${accreditionId}${
          nextSubStep?.userId ? `&sid=${nextSubStep?.userId}` : ''
        }`,
      );
    } else if (activeStep?.activeStepIndex + 1 < accreditionSideBar?.length) {
      const nextStep = accreditionSideBar?.[activeStep?.activeStepIndex + 1];
      const nextSubStep = nextStep?.subSteps?.[0];
      history.push(
        `/accredited/${nextStep?.url}/${nextSubStep?.url}/?id=${accreditionId}${
          nextSubStep?.userId ? `&sid=${nextSubStep?.userId}` : ''
        }`,
      );
    } else {
      history.push(`/dashboard`);
    }
  } else {
    history.push(`/dashboard`);
  }
};
