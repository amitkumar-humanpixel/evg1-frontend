import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useWindowHeight } from '../../hooks/useWindowHeight';
import { useWindowWidth } from '../../hooks/useWindowWidth';
import { getStepComponent } from '../../helpers/AccreditedCompoenentHelper';
import { useOnClickOutside } from '../../hooks/UserClickOutsideHook';
import AccreditedStepper from './AccreditedStepper/AccreditedStepper';
import AccreditedButtons from './AccreditedButtons';
import {
  changeAccreditionIdForAccreditionRedirection,
  getAccreditedId,
  getAccreditedSteps,
} from './redux/AccreditedReduxActions';
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
  const USER_ID = useSelector(({ loginReducer }) => loginReducer?.loggedUserDetails?.userId ?? null);

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
    stepDetails => {
      if (activeStepIndex !== stepDetails.activeStepIndex) {
        const prevStepIndex = accreditionSideBar?.findIndex(e => e?.url === stepDetails?.url) - 1;
        if (stepDetails.subSteps.length > 0 && prevStepIndex >= 0 && accreditionSideBar?.[prevStepIndex]?.complete) {
          history.push(
            `/accredited/${stepDetails?.url}/${stepDetails?.subSteps?.[0]?.url}${
              accreditionId ? `/?id=${accreditionId}` : ''
            }${stepDetails?.subSteps?.[0]?.userId ? `&sid=${stepDetails?.subSteps?.[0]?.userId}` : ''}`,
          );
        } else if (stepDetails?.complete) {
          history.push(`/accredited/${stepDetails?.url}${accreditionId ? `/?id=${accreditionId}` : ''}`);
          if (showStepper) setShowStepper(!showStepper);
        }
      }
    },
    [activeStepIndex, accreditionId, showStepper, accreditionSideBar],
  );

  const onClickSubStep = useCallback(
    (stepDetails, subStepDetails) => {
      const prevStepIndex = stepDetails?.subSteps?.findIndex(e => e?.url === subStepDetails?.url) - 1;
      if (subStepDetails?.isComplete || (prevStepIndex >= 0 && stepDetails?.subSteps?.[prevStepIndex]?.isComplete)) {
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
      if (step !== 'postDetails' && subStep) {
        const isExistStep = accreditionSideBar?.find(e => e?.url === step);
        setActiveStepIndex(isExistStep?.activeStepIndex);
        if (isExistStep?.subSteps?.length > 0 && subStep) {
          setActiveSubStepIndex(isExistStep?.subSteps?.find(e => e?.url === subStep)?.activeSubStepIndex || 0);
        }
      }
      if (step !== 'postDetails' && !subStep) {
        const isExistStep = accreditionSideBar?.find(e => e?.url === step);
        if (isExistStep?.subSteps?.length > 0) {
          history.push(
            `/accredited/${isExistStep?.url}/${isExistStep?.subSteps?.[0]?.url}${
              accreditionId ? `/?id=${accreditionId}` : ''
            }${isExistStep?.subSteps?.[0]?.userId ? `&sid=${isExistStep?.subSteps?.[0]?.userId}` : ''}`,
          );
        }
      }
      if (step === 'postDetails') {
        history.push(`/accredited/postDetails/?id=${accreditionId ?? id ?? ''}`);
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
      }, 500);
    } else if (!accreditionId && id) {
      dispatch(changeAccreditionIdForAccreditionRedirection(id));
      startGeneralLoaderOnRequest('accreditedLoader');
      setTimeout(() => {
        dispatch(getAccreditedSteps(id));
      }, 500);
    } else if (!accreditionId && !id) {
      dispatch(getAccreditedId(USER_ID));
    }
  }, []);

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
                    <div className="breadcrumb-link">{accreditionSideBar?.[activeStepIndex]?.name}</div>
                    {accreditionSideBar?.[activeStepIndex]?.subSteps?.length > 0 && (
                      <>
                        <span className=" material-icons-round breadcrumb-arrow">chevron_right</span>
                        <div className="breadcrumb-link">
                          {accreditionSideBar?.[activeStepIndex]?.subSteps?.[activeSubStepIndex]?.stepName}
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
