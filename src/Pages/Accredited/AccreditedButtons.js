import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../components/Button/Button';
import { postDetailsValidation } from './PostDetails/PostDetailsValidation';
import { practiceManagerValidation } from './FormA/PracticeManager/PracticeManagerValidation';
import { standardValidation } from './FormA/Standards/StandardValidation';
import { useQueryParams } from '../../hooks/GetQueryParamHook';
import { supervisorValidation } from './FormA/Supervisor/SupervisorValidation';
import { registrarValidation } from './FormA/Registrar/RegistrarValidation';
import { a1SupervisorValidation } from './FormA1/A1Supervisor/A1SupervisorValidation';
import { summaryValidations } from './FormB/Summary/SummaryValidations';
import { declarationValidations } from './FormB/Declaration/DeclarationValidations';
import { accreditorAssignValidations } from './FormB/AccreditorAssign/AccreditorAssignValidation';
import { resetAccredited, resubmitAccreditedForm } from './redux/AccreditedReduxActions';
import { ReaccreditationChecklistValidations } from './ReaccreditationChecklist/ReaccreditationChecklistValidations';
import { PreviousRecommendationsValidation } from './PreviousRecommendations/PreviousRecommendationsValidation';

const AccreditedButtons = () => {
  const { step, subStep } = useParams();
  const { id, sid } = useQueryParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const [supervisorList, setSupervisorList] = useState();

  const { role } = useSelector(({ loginReducer }) => loginReducer?.loggedUserDetails ?? {});

  const { accreditionId, accreditionSideBar, facilityId } = useSelector(
    ({ accreditedReducer }) => accreditedReducer?.accreditedStepper ?? {},
  );

  const { userId } = useSelector(({ accreditedReducer }) => accreditedReducer?.accreditedDetails ?? {});

  const postDetails = useSelector(({ accreditedReducer }) => accreditedReducer?.postDetails ?? {});

  const { practiceManager, standards, supervisors, registrars } = useSelector(
    ({ accreditedReducer }) => accreditedReducer?.formA ?? {},
  );
  const a1SupervisorDetails = useSelector(({ accreditedReducer }) => accreditedReducer?.formA1?.[`${sid}`] ?? {});
  const finalCheckListDetails = useSelector(
    ({ accreditedReducer }) => accreditedReducer?.reaccreditationChecklist ?? {},
  );

  const previousRecommendationsDetails = useSelector(
    ({ accreditedReducer }) => accreditedReducer?.previousRecommendations ?? {},
  );

  const { summary, otherDetails, accreditorAssign } = useSelector(
    ({ accreditedReducer }) => accreditedReducer?.formB ?? {},
  );

  useEffect(() => {
    const finalSupervisors = accreditionSideBar?.find(e => e?.url === 'formA1')?.subSteps?.map(e => e?.url);
    setSupervisorList(finalSupervisors);
  }, [accreditionSideBar]);

  const onClickSave = useCallback(
    async isNextClick => {
      if (!['postDetails', 'reaccreditationChecklist', 'previousRecommendations'].includes(step)) {
        switch (subStep) {
          case 'practiceManager':
            await practiceManagerValidation(
              dispatch,
              history,
              practiceManager,
              id,
              userId,
              isNextClick,
              accreditionSideBar,
              accreditionId,
              step,
              subStep,
            );

            break;
          case 'standards':
            await standardValidation(
              dispatch,
              history,
              standards,
              id,
              userId,
              isNextClick,
              accreditionSideBar,
              accreditionId,
              step,
              subStep,
            );
            break;
          case 'supervisor':
            await supervisorValidation(
              dispatch,
              history,
              supervisors,
              id,
              userId,
              isNextClick,
              accreditionSideBar,
              accreditionId,
              step,
              subStep,
            );
            break;
          case 'registrar':
            await registrarValidation(
              dispatch,
              history,
              registrars,
              id,
              userId,
              isNextClick,
              accreditionSideBar,
              accreditionId,
              step,
              subStep,
            );
            break;
          case supervisorList?.find(e => e === subStep):
            await a1SupervisorValidation(
              dispatch,
              history,
              a1SupervisorDetails,
              id,
              sid,
              userId,
              isNextClick,
              accreditionSideBar,
              accreditionId,
              step,
              subStep,
            );

            break;

          case 'summary':
            await summaryValidations(
              dispatch,
              history,
              summary,
              id,
              userId,
              isNextClick,
              accreditionSideBar,
              accreditionId,
              step,
              subStep,
            );
            break;

          case 'assignAccreditor':
            await accreditorAssignValidations(
              dispatch,
              history,
              accreditorAssign,
              id,
              userId,
              isNextClick,
              accreditionSideBar,
              accreditionId,
              step,
              subStep,
            );
            break;

          case 'declaration':
            await declarationValidations(
              dispatch,
              history,
              otherDetails,
              id,
              userId,
              isNextClick,
              accreditionSideBar,
              accreditionId,
              step,
              subStep,
            );
            break;

          default:
            break;
        }
      } else if (step === 'postDetails') {
        await postDetailsValidation(
          dispatch,
          history,
          postDetails,
          id,
          userId,
          isNextClick,
          accreditionSideBar,
          accreditionId,
          step,
          subStep,
        );
      } else if (step === 'previousRecommendations') {
        await PreviousRecommendationsValidation(
          dispatch,
          history,
          previousRecommendationsDetails,
          id,
          userId,
          isNextClick,
          accreditionSideBar,
          accreditionId,
          step,
          subStep,
        );
      } else if (step === 'reaccreditationChecklist') {
        await ReaccreditationChecklistValidations(
          dispatch,
          history,
          finalCheckListDetails,
          userId,
          facilityId,
          isNextClick,
          accreditionSideBar,
          accreditionId,
          step,
          subStep,
          facilityId,
        );
      }
    },
    [
      step,
      subStep,
      postDetails,
      practiceManager,
      standards,
      supervisors,
      registrars,
      a1SupervisorDetails,
      finalCheckListDetails,
      previousRecommendationsDetails,
      accreditionSideBar,
      accreditionId,
      summary,
      accreditorAssign,
      otherDetails,
      id,
      userId,
      supervisorList,
      facilityId,
    ],
  );

  const onClickCancel = useCallback(() => {
    try {
      dispatch(resetAccredited());
      history.push('/dashboard');
    } catch (e) {
      /**/
    }
  }, []);

  const onClickResubmit = useCallback(() => {
    try {
      const response = dispatch(resubmitAccreditedForm(id));
      if (response) {
        history.push('/dashboard');
      }
    } catch (e) {
      /**/
    }
  }, [id]);

  const isLastStep = useMemo(() => {
    const currentStep = accreditionSideBar?.find(e => e?.url === step);
    if (currentStep?.subSteps?.length > 0) {
      const currentSubStep = currentStep?.subSteps?.find(e => e?.url === subStep);
      if (
        currentStep?.activeStepIndex === accreditionSideBar?.length - 1 &&
        currentSubStep?.activeSubStepIndex === currentStep?.subSteps?.length - 1
      )
        return true;
      if (currentStep?.url === 'formA1') return true;
    } else if (currentStep?.activeStepIndex === accreditionSideBar?.length - 1) return true;
    return false;
  }, [step, subStep, accreditionSideBar]);

  const getAccreditedRightSideButtons = useMemo(() => {
    if (role === 'Supervisor' && step === 'formA1') {
      return (
        <>
          <Button buttonType="outlined-primary" title="Save" onClick={() => onClickSave(false)} />
          <Button buttonType="primary" title="Submit" onClick={() => onClickSave(true)} />
        </>
      );
    }
    if (['Accreditation_Support_Coordinator', 'Super_Admin'].includes(role) && step === 'previousRecommendations') {
      return (
        <>
          <Button buttonType="outlined-primary" title="Re-Submit" onClick={onClickResubmit} />
          <Button buttonType="primary" title="Save" onClick={() => onClickSave(false)} />
        </>
      );
    }
    if (isLastStep) {
      return <Button buttonType="primary" title="Submit" onClick={() => onClickSave(true)} />;
    }
    if (step === 'reaccreditationChecklist') {
      return <Button buttonType="primary" title="Next" onClick={() => onClickSave(true)} />;
    }
    return (
      <>
        <Button buttonType="outlined-primary" title="Save" onClick={() => onClickSave(false)} />
        <Button buttonType="primary" title="Next" onClick={() => onClickSave(true)} />
      </>
    );
  }, [step, subStep, isLastStep, role, onClickSave, onClickResubmit]);

  return (
    <div className="accredited-button-row">
      <Button buttonType="outlined-active" title="Cancel" onClick={onClickCancel} />
      <div>{getAccreditedRightSideButtons}</div>
    </div>
  );
};

export default AccreditedButtons;
