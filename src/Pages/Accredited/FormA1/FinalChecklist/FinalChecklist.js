import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  getFinalCheckListData,
  updateAccreditedSubFormDataArrayFields,
  updateAccreditedSubFormFields,
} from '../../redux/AccreditedReduxActions';
import { useQueryParams } from '../../../../hooks/GetQueryParamHook';
import Checkbox from '../../../../components/Checkbox/Checkbox';
import Checklist from '../../Checklist';
import { AccreditedEditableHelper } from '../../../../helpers/AccreditedEditableHelper';

const FinalChecklist = () => {
  const { id } = useQueryParams();
  const dispatch = useDispatch();
  const { step, subStep } = useParams();

  const { accreditionSideBar } = useSelector(({ accreditedReducer }) => accreditedReducer?.accreditedStepper ?? {});

  const [isEditable, setIsEditable] = useState(true);

  useEffect(() => {
    setIsEditable(AccreditedEditableHelper(accreditionSideBar, step, subStep));
  }, [step, subStep, accreditionSideBar]);

  const { finalCheckLists, actioned, recommendation } = useSelector(
    ({ accreditedReducer }) => accreditedReducer?.formA1?.finalCheckList ?? {},
  );

  const onInputChange = useCallback(
    (name, value) => dispatch(updateAccreditedSubFormFields('formA1', 'finalCheckList', name, value)),
    [],
  );

  const handleCheckInputChange = useCallback(
    (index, name, value) =>
      dispatch(
        updateAccreditedSubFormDataArrayFields('formA1', 'finalCheckList', index, 'finalCheckLists', name, value),
      ),
    [],
  );

  useEffect(() => {
    if (id) dispatch(getFinalCheckListData(id));
  }, [id]);

  return (
    <>
      <section>
        <div className="accredited-title mb-10">Address Previous Recommendations</div>
        <div className="common-white-container final-checklist-grid">
          <div className="form-detail-title">List Recommendations</div>
          <textarea
            rows={4}
            name="recommendation"
            placeholder="Enter Recommendations"
            value={recommendation ?? '-'}
            onChange={e => onInputChange(e.target.name, e.target.value)}
            disabled={!isEditable}
          />
          <div className="form-detail-title">Explain how these have been actioned</div>
          <textarea
            rows={4}
            name="actioned"
            placeholder="Enter actioned"
            value={actioned ?? '-'}
            onChange={e => onInputChange(e.target.name, e.target.value)}
            disabled={!isEditable}
          />
        </div>
      </section>
      <section>
        <div className="accredited-title accredited-title-margin">Final Checklist</div>
        <div className="common-white-container">
          {finalCheckLists.map((detail, index) => (
            <Checkbox
              id={`standard-details-${index}`}
              name="status"
              checked={detail?.status}
              onChange={event => handleCheckInputChange(index, event?.target?.name, event.target.checked)}
              className="final-checklist"
              title={<Checklist detail={detail?.title} />}
              disabled={!isEditable}
            />
          ))}
        </div>
      </section>
    </>
  );
};

export default FinalChecklist;
