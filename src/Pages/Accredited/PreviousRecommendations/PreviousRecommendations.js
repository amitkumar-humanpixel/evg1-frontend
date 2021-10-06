import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useQueryParams } from '../../../hooks/GetQueryParamHook';
import { getPreviousRecommendationsData, updateAccreditedFields } from '../redux/AccreditedReduxActions';
import { AccreditedEditableHelper } from '../../../helpers/AccreditedEditableHelper';

const PreviousRecommendations = () => {
  const { id } = useQueryParams();
  const dispatch = useDispatch();
  const { step, subStep } = useParams();
  const [isEditable, setIsEditable] = useState(true);

  const { accreditionSideBar } = useSelector(({ accreditedReducer }) => accreditedReducer?.accreditedStepper ?? {});

  const { actioned, errors } = useSelector(({ accreditedReducer }) => accreditedReducer?.previousRecommendations ?? {});
  const onInputChange = useCallback(
    (name, value) => dispatch(updateAccreditedFields('previousRecommendations', name, value)),
    [],
  );

  useEffect(() => {
    setIsEditable(AccreditedEditableHelper(accreditionSideBar, step, subStep));
  }, [step, subStep, accreditionSideBar]);

  useEffect(() => {
    if (id) dispatch(getPreviousRecommendationsData(id));
  }, [id]);

  return (
    <section>
      <div className="common-white-container final-checklist-grid">
        <div>
          <p>
            Explain how the practice addressed recommendations made at the most recent visit or review. This may have
            been at the initial accreditation of the practice, a reaccreditation, or a review visit. These will be
            incorporated into the application in future iterations, but for now, have been provided to the practice
            manager and/or principal supervisor directly by email.
          </p>
        </div>
        <div />
        <div>
          <textarea
            rows={4}
            name="actioned"
            placeholder="Enter actioned"
            value={actioned ?? '-'}
            className="w-100"
            onChange={e => onInputChange(e.target.name, e.target.value)}
            disabled={!isEditable}
          />
          {errors?.actioned && <div className="form-error-message">{errors?.actioned}</div>}
        </div>
      </div>
    </section>
  );
};

export default PreviousRecommendations;
