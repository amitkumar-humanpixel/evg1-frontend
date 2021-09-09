import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Checkbox from '../../../../components/Checkbox/Checkbox';
import Input from '../../../../components/Input/Input';
import { getFormBOtherDetails, updateAccreditedSubFormFields } from '../../redux/AccreditedReduxActions';
import { useQueryParams } from '../../../../hooks/GetQueryParamHook';
import { AccreditedEditableHelper } from '../../../../helpers/AccreditedEditableHelper';

const Declaration = () => {
  const { id } = useQueryParams();
  const dispatch = useDispatch();
  const { step, subStep } = useParams();
  const [isEditable, setIsEditable] = useState(true);

  const { accreditionSideBar } = useSelector(({ accreditedReducer }) => accreditedReducer?.accreditedStepper ?? {});

  const { reviewedBy, declarationStatus, recomendationPanel, summery, previousIssues, error } = useSelector(
    ({ accreditedReducer }) => accreditedReducer?.formB?.otherDetails ?? {},
  );

  const onInputChange = useCallback((name, value) => {
    dispatch(updateAccreditedSubFormFields('formB', 'otherDetails', name, value));
  }, []);

  const handleInputTextChange = useCallback(
    e => {
      const { name, value } = e.target;
      onInputChange(name, value);
    },
    [onInputChange],
  );

  const handleInputCheckChange = useCallback(
    e => {
      const { name, checked } = e.target;
      onInputChange(name, checked);
    },
    [onInputChange],
  );

  useEffect(() => {
    if (id) dispatch(getFormBOtherDetails(id));
  }, [id]);

  useEffect(() => {
    setIsEditable(AccreditedEditableHelper(accreditionSideBar, step, subStep));
  }, [step, subStep, accreditionSideBar]);

  return (
    <>
      <section className="common-white-container">
        <div className="accredited-title mb-10">Previous Issue</div>
        <div className="form-b-single-record-grid">
          <div className="form-detail-title">Previous Issues</div>
          <textarea
            rows={4}
            name="previousIssues"
            placeholder="Enter previous issues"
            value={previousIssues}
            onChange={handleInputTextChange}
            disabled={!isEditable}
          />
          <div className="form-detail-title">Summary Comments</div>
          <textarea
            rows={4}
            name="summery"
            placeholder="Enter summery"
            value={summery}
            onChange={handleInputTextChange}
            disabled={!isEditable}
          />
          <div className="form-detail-title">Recommendations to Panel</div>
          <textarea
            rows={4}
            name="recomendationPanel"
            placeholder="Enter recommendations"
            value={recomendationPanel}
            onChange={handleInputTextChange}
            disabled={!isEditable}
          />
        </div>
      </section>

      <section>
        <div className="accredited-title accredited-title-margin">Accreditor Declaration</div>
        <div className="common-white-container">
          <Checkbox
            title={
              <div className="ml-5">
                I confirm that I have reviewed the documentation relating to both the post and the applicants and have
                based my assessment and recommendations accordingly.
              </div>
            }
            id="declaration-confirmation"
            name="declarationStatus"
            checked={declarationStatus}
            onChange={handleInputCheckChange}
            disabled={!isEditable}
          />
          {error?.declarationStatus && <div className="form-error-message mt-10">{error?.declarationStatus}</div>}
          <div className="mt-15">
            <div className="form-detail-title">Reviewed by:</div>
            <Input
              borderClass="mt-5"
              type="text"
              placeholder="Enter Name"
              name="reviewedBy"
              value={reviewedBy}
              onChange={handleInputTextChange}
              disabled={!isEditable}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default Declaration;
