import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  updateAccreditedSubFormDataArrayFields,
  updateAccreditedSubFormFields,
} from '../../redux/AccreditedReduxActions';
import Checklist from '../../Checklist';
import { AccreditedEditableHelper } from '../../../../helpers/AccreditedEditableHelper';
import TriStateSwitch from '../../../../components/TriStateSwitch/TriStateSwitch';

const FinalChecklist = () => {
  // const { id } = useQueryParams();
  const dispatch = useDispatch();
  const { step, subStep } = useParams();
  const [isEditable, setIsEditable] = useState(true);

  const { accreditionSideBar } = useSelector(({ accreditedReducer }) => accreditedReducer?.accreditedStepper ?? {});

  const { finalCheckLists, actioned, recommendation, errors } = useSelector(
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
    setIsEditable(AccreditedEditableHelper(accreditionSideBar, step, subStep));
  }, [step, subStep, accreditionSideBar]);

  // useEffect(() => {
  //   if (id) dispatch(getFinalCheckListData(id));
  // }, [id]);

  return (
    <>
      <section>
        <div className="accredited-title mb-10">Address Previous Recommendations</div>
        <div className="common-white-container final-checklist-grid">
          <div>
            <p>Explain how the practice addressed recommendations made at the most recent visit or review.</p>
            <p>
              This may have been at the initial accreditation of the practice, a reaccreditation, or a review visit.
              These will be incorporated into the application in future iterations, but for now, have been provided to
              the practice manager and/or principal supervisor directly by email.
            </p>
          </div>
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
      <section>
        <div className="accredited-title accredited-title-margin">Final Checklist</div>
        <div className="common-white-container">
          {finalCheckLists.map((detail, index) => (
            <div className="final-checklist">
              <TriStateSwitch
                state={detail?.status}
                onChange={state => handleCheckInputChange(index, 'status', state)}
                disabled={!isEditable}
              />
              <div>
                <Checklist detail={detail?.title} />
                {detail?.error && <div className="form-error-message mt-20">{detail?.error}</div>}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default FinalChecklist;
