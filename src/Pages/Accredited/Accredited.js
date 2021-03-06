import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useWindowHeight } from '../../hooks/useWindowHeight';
import { useWindowWidth } from '../../hooks/useWindowWidth';
import { getStepComponent } from '../../helpers/AccreditedCompoenentHelper';
import { useOnClickOutside } from '../../hooks/UserClickOutsideHook';
import AccreditedStepper from './AccreditedStepper/AccreditedStepper';
import AccreditedButtons from './AccreditedButtons';
import { changeAccreditionIdForAccreditionRedirection, getAccreditedSteps } from './redux/AccreditedReduxActions';
import Loader from '../../components/Loader/Loader';
import { AccreditedEditableHelper } from '../../helpers/AccreditedEditableHelper';
import { useQueryParams } from '../../hooks/GetQueryParamHook';
import { startGeneralLoaderOnRequest } from '../../components/GeneralLoader/redux/GeneralLoaderAction';

const Accredited = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { step, subStep } = useParams();
  const { id } = useQueryParams();
  const accreditedRef = useRef();

  const { accreditionId, accreditionSideBar } = useSelector(
    ({ accreditedReducer }) => accreditedReducer?.accreditedStepper ?? {},
  );

  const isEditable = useMemo(() => {
    return AccreditedEditableHelper(accreditionSideBar, step, subStep);
  }, [step, subStep, accreditionSideBar]);

  const { accreditedLoader } = useSelector(({ generalLoaderReducer }) => generalLoaderReducer ?? false);

  const accreditedContentContainerHeight = useWindowWidth() > 1024 ? useWindowHeight() - 75 : useWindowHeight() - 55;

  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [activeSubStepIndex, setActiveSubStepIndex] = useState(-1);
  const [showStepper, setShowStepper] = useState(false);

  const onClickStep = useCallback(
    (stepDetails, isDisabledStep) => {
      if (activeStepIndex !== stepDetails.activeStepIndex) {
        const prevStepIndex = accreditionSideBar?.findIndex(e => e?.url === stepDetails?.url) - 1;
        if (stepDetails.subSteps.length > 0 && prevStepIndex >= 0 && !isDisabledStep) {
          history.push(
            `/accredited/${stepDetails?.url}/${stepDetails?.subSteps?.[0]?.url}${
              accreditionId ? `/?id=${accreditionId}` : ''
            }${stepDetails?.subSteps?.[0]?.userId ? `&sid=${stepDetails?.subSteps?.[0]?.userId}` : ''}`,
          );
        } else if (stepDetails?.complete || !isDisabledStep) {
          history.push(`/accredited/${stepDetails?.url}${accreditionId ? `/?id=${accreditionId}` : ''}`);
          if (showStepper) setShowStepper(!showStepper);
        }
      }
    },
    [activeStepIndex, accreditionId, showStepper, accreditionSideBar],
  );

  const onClickSubStep = useCallback(
    (stepDetails, subStepDetails, isDisabledSubStep) => {
      if (subStepDetails?.isComplete || !isDisabledSubStep) {
        history.push(
          `/accredited/${stepDetails?.url}/${subStepDetails?.url}${accreditionId && `/?id=${accreditionId}`}${
            subStepDetails?.userId ? `&sid=${subStepDetails?.userId}` : ''
          }`,
        );
      }
      if (showStepper) setShowStepper(!showStepper);
    },
    [accreditionId, showStepper],
  );

  useEffect(() => {
    if (step) {
      const isExistStep = accreditionSideBar?.find(e => e?.url === step);
      if (!['postDetails', 'reaccreditationChecklist', 'previousRecommendations'].includes(step) && subStep) {
        setActiveStepIndex(isExistStep?.activeStepIndex);
        if (isExistStep?.subSteps?.length > 0 && subStep) {
          setActiveSubStepIndex(isExistStep?.subSteps?.find(e => e?.url === subStep)?.activeSubStepIndex || 0);
        }
      }
      if (!['postDetails', 'reaccreditationChecklist', 'previousRecommendations'].includes(step) && !subStep) {
        if (isExistStep?.subSteps?.length > 0) {
          history.push(
            `/accredited/${isExistStep?.url}/${isExistStep?.subSteps?.[0]?.url}${
              accreditionId ? `/?id=${accreditionId}` : ''
            }${isExistStep?.subSteps?.[0]?.userId ? `&sid=${isExistStep?.subSteps?.[0]?.userId}` : ''}`,
          );
        }
      }
      if (step === 'postDetails') {
        setActiveStepIndex(isExistStep?.activeStepIndex || 1);
        history.push(`/accredited/postDetails/?id=${accreditionId ?? id ?? ''}`);
      }
      if (step === 'reaccreditationChecklist') {
        setActiveStepIndex(isExistStep?.activeStepIndex || 0);
        history.push(`/accredited/reaccreditationChecklist/?id=${accreditionId ?? id ?? ''}`);
      }
      if (step === 'previousRecommendations') {
        setActiveStepIndex(isExistStep?.activeStepIndex || 4);
        history.push(`/accredited/previousRecommendations/?id=${accreditionId ?? id ?? ''}`);
      }
    } else if (accreditionSideBar) {
      const stepToSet = accreditionSideBar?.[0];
      if (stepToSet?.subSteps?.length > 0) {
        history.push(
          `/accredited/${stepToSet?.url}/${stepToSet?.subSteps?.[0]?.url}${
            accreditionId ? `/?id=${accreditionId}` : ''
          }${stepToSet?.subSteps?.[0]?.userId ? `&sid=${stepToSet?.subSteps?.[0]?.userId}` : ''}`,
        );
      } else {
        history.push(`/accredited/${stepToSet?.url}${accreditionId ? `/?id=${accreditionId}` : ''}`);
      }
    }
  }, [step, subStep, accreditionSideBar, accreditionId]);

  useOnClickOutside(accreditedRef, () => {
    if (showStepper) setShowStepper(!showStepper);
  });

  useEffect(() => {
    if (accreditionId) {
      startGeneralLoaderOnRequest('accreditedLoader');
      setTimeout(() => {
        dispatch(getAccreditedSteps(accreditionId));
      }, 1000);
    } else if (!accreditionId && id) {
      dispatch(changeAccreditionIdForAccreditionRedirection(id));
    }
  }, [accreditionId]);

  return (
    <>
      {!accreditedLoader ? (
        <div className={`accredited-container ${accreditionSideBar?.length > 0 && 'accredited-container-grid'}`}>
          {accreditionSideBar?.length > 0 ? (
            <>
              <AccreditedStepper
                activeStepIndex={activeStepIndex}
                activeSubStepIndex={activeSubStepIndex}
                onClickStep={onClickStep}
                onClickSubStep={onClickSubStep}
                className={showStepper && 'open-accredited-stepper'}
                accreditedRef={accreditedRef}
              />
              <div className="accredited-content-container" style={{ height: `${accreditedContentContainerHeight}px` }}>
                <div className="accredited-breadcrumb-container">
                  <span className="material-icons-round stepper-button" onClick={() => setShowStepper(!showStepper)}>
                    widgets
                  </span>
                  <div className="breadcrumb accredited-breadcrumb">
                    <div className="breadcrumb-link">
                      {accreditionSideBar?.[activeStepIndex]?.displayName ??
                        accreditionSideBar?.[activeStepIndex]?.name}
                    </div>
                    {accreditionSideBar?.[activeStepIndex]?.subSteps?.length > 0 && (
                      <>
                        <span className=" material-icons-round breadcrumb-arrow">chevron_right</span>
                        <div className="breadcrumb-link">
                          {accreditionSideBar?.[activeStepIndex]?.subSteps?.[activeSubStepIndex]?.displayName ??
                            accreditionSideBar?.[activeStepIndex]?.subSteps?.[activeSubStepIndex]?.stepName}
                        </div>
                      </>
                    )}
                  </div>
                </div>
                <div className="accredited-content-wrapper">{getStepComponent(step, subStep)}</div>
                {isEditable && <AccreditedButtons />}
              </div>
            </>
          ) : (
            <div className="no-record-found">No record found</div>
          )}
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default Accredited;
