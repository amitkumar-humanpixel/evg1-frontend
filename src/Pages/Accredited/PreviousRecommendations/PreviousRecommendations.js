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

  const { actioned, recommendation, errors } = useSelector(
    ({ accreditedReducer }) => accreditedReducer?.previousRecommendations ?? {},
  );
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
        <div className="form-detail-title">List Recommendations</div>
        <div>
          <textarea
            rows={4}
            name="recommendation"
            placeholder="Enter Recommendations"
            value={recommendation ?? '-'}
            className="w-100"
            onChange={e => onInputChange(e.target.name, e.target.value)}
            disabled={!isEditable}
          />
          {errors?.recommendation && <div className="form-error-message">{errors?.recommendation}</div>}
        </div>
        <div className="form-detail-title">Explain how these have been actioned</div>
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
