import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import React, { useCallback, useEffect, useState } from 'react';
import { useQueryParams } from '../../../hooks/GetQueryParamHook';
import { AccreditedEditableHelper } from '../../../helpers/AccreditedEditableHelper';
import TriStateSwitch from '../../../components/TriStateSwitch/TriStateSwitch';
import Checklist from '../Checklist';
import { getReAccreditedCheckList, updateAccreditedSubFormArrayFields } from '../redux/AccreditedReduxActions';

const ReaccreditationChecklist = () => {
  const { id } = useQueryParams();
  const dispatch = useDispatch();
  const { step, subStep } = useParams();
  const [isEditable, setIsEditable] = useState(true);

  const { accreditionSideBar } = useSelector(({ accreditedReducer }) => accreditedReducer?.accreditedStepper ?? {});

  const { reaccreditationChecklist } = useSelector(
    ({ accreditedReducer }) => accreditedReducer?.reaccreditationChecklist ?? {},
  );

  const handleCheckInputChange = useCallback(
    (index, name, value) =>
      dispatch(
        updateAccreditedSubFormArrayFields('reaccreditationChecklist', 'reaccreditationChecklist', index, name, value),
      ),
    [],
  );

  useEffect(() => {
    setIsEditable(AccreditedEditableHelper(accreditionSideBar, step, subStep));
  }, [step, subStep, accreditionSideBar]);

  useEffect(() => {
    if (id) dispatch(getReAccreditedCheckList(id));
  }, [id]);

  return (
    <>
      <section>
        <div className="common-white-container">
          {reaccreditationChecklist?.map((detail, index) => (
            <div className="final-checklist">
              <TriStateSwitch
                state={detail?.status}
                onChange={state => handleCheckInputChange(index, 'status', state)}
                disabled={!isEditable}
              />
              <div>
                <Checklist detail={detail?.title} />
                {detail?.error && <div className="form-error-message">{detail?.error}</div>}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default ReaccreditationChecklist;
