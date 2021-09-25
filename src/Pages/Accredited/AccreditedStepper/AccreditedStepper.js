import React, { useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { useWindowHeight } from '../../../hooks/useWindowHeight';

const AccreditedStepper = props => {
  const { accreditedStepper } = useSelector(({ accreditedReducer }) => accreditedReducer ?? {});

  const { accreditionSideBar } = useMemo(() => accreditedStepper ?? [], [accreditedStepper]);

  const { activeStepIndex, activeSubStepIndex, onClickStep, onClickSubStep, className, accreditedRef } = props;

  const isDisabledStep = useCallback(
    stepDetails => {
      const prevStepIndex = accreditionSideBar?.findIndex(e => e?.url === stepDetails?.url) - 1;
      return !(
        stepDetails?.complete ||
        (prevStepIndex >= 0 && accreditionSideBar?.[prevStepIndex]?.complete) ||
        (prevStepIndex < 0 && accreditionSideBar[0]?.isEditable)
      );
    },
    [accreditionSideBar],
  );

  // const isDisabledSubStep = useCallback(
  //   (stepDetails, subStepDetails) => {
  //     const prevStepIndex = accreditionSideBar?.findIndex(e => e?.url === stepDetails?.url) - 1;
  //     const prevSubStepIndex = stepDetails?.subSteps?.findIndex(e => e?.url === subStepDetails?.url) - 1;
  //     return !(
  //       (['Principal_Supervisor', 'Practice_Manager'].includes(role) &&
  //         stepDetails?.url === 'formA1' &&
  //         !['finalCheckList'].includes(subStepDetails?.url)) ||
  //       subStepDetails?.isComplete ||
  //       (prevSubStepIndex >= 0 && stepDetails?.subSteps?.[prevSubStepIndex]?.isComplete) ||
  //       (prevSubStepIndex < 0 && accreditionSideBar?.[prevStepIndex]?.complete) ||
  //       (prevSubStepIndex < 0 && stepDetails?.subSteps?.[0]?.isEditable)
  //     );
  //   },
  //   [accreditionSideBar, role],
  // );

  return (
    <div className={`accredited-stepper-container ${className}`} ref={accreditedRef}>
      <div className="accredited-stepper-wrapper" style={{ maxHeight: `${useWindowHeight() - 75}px` }}>
        {accreditionSideBar?.map((stepDetail, stepIndex) => (
          <div className={activeStepIndex === stepIndex && 'active-index'}>
            <div
              className={`accredited-step ${activeStepIndex === stepIndex && 'active-step'} ${
                stepDetail.complete && 'completed-step'
              } ${activeStepIndex === stepIndex && stepDetail.complete && 'completed-active-step'}
              ${isDisabledStep(stepDetail) && 'in-complete-step'}
              `}
              onClick={() => onClickStep(stepDetail, isDisabledStep(stepDetail))}
            >
              <span className="material-icons-round">{stepDetail.complete ? 'task_alt' : 'hourglass_empty'}</span>
              <span className="step-name">{stepDetail.name}</span>
              {stepDetail.subSteps.length > 0 && (
                <span className={`material-icons-round ${activeStepIndex === stepIndex && 'active-index-arrow'}`}>
                  chevron_right
                </span>
              )}
            </div>

            {stepDetail.subSteps.length > 0 && (
              <div className="sub-step-container">
                {stepDetail.subSteps.map((subStepDetail, subStepIndex) => (
                  <div
                    className={`sub-step accredited-step ${activeSubStepIndex === subStepIndex && 'active-step'} ${
                      subStepDetail.isComplete && 'completed-step'
                    } ${activeSubStepIndex === subStepIndex && subStepDetail.isComplete && 'completed-active-step'}
                    `}
                    onClick={() => onClickSubStep(stepDetail, subStepDetail)}
                  >
                    <span className="material-icons-round">
                      {subStepDetail.isComplete ? 'task_alt' : 'hourglass_empty'}
                    </span>
                    <span className="step-name">{subStepDetail.stepName}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

AccreditedStepper.propTypes = {
  activeStepIndex: PropTypes.number.isRequired,
  activeSubStepIndex: PropTypes.number,
  onClickStep: PropTypes.func,
  onClickSubStep: PropTypes.func,
  className: PropTypes.string,
  accreditedRef: PropTypes.object,
};

AccreditedStepper.defaultProps = {
  activeSubStepIndex: -1,
  onClickStep: () => {},
  onClickSubStep: () => {},
  className: '',
  accreditedRef: {},
};

export default AccreditedStepper;
