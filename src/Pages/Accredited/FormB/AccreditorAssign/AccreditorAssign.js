import React, { useCallback, useEffect, useState } from 'react';
import ReactSelect from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  getFormBAccreditors,
  getFormBSelectedAccreditor,
  updateAccreditedSubFormFields,
} from '../../redux/AccreditedReduxActions';
import { AccreditedEditableHelper } from '../../../../helpers/AccreditedEditableHelper';
import { useQueryParams } from '../../../../hooks/GetQueryParamHook';
import PromptOnRouteChange from '../../../../components/PromptOnRouteChange';

const AccreditorAssign = () => {
  const dispatch = useDispatch();
  const { step, subStep } = useParams();
  const { id } = useQueryParams();

  const [isEditable, setIsEditable] = useState(true);

  const { accreditionSideBar } = useSelector(({ accreditedReducer }) => accreditedReducer?.accreditedStepper ?? {});

  const facilityIdForSummary = useSelector(
    ({ accreditedReducer }) => accreditedReducer?.accreditedDetails?.facilityId ?? '',
  );

  const { accreditorAssign, accreditorAssignCopy } = useSelector(
    ({ accreditedReducer }) => accreditedReducer?.formB ?? {},
  );

  const { accreditorNameList, accreditorId, error } = accreditorAssign;

  const handleSelectChange = useCallback(e => {
    dispatch(updateAccreditedSubFormFields('formB', 'accreditorAssign', 'accreditorId', e));
  }, []);

  useEffect(() => {
    setIsEditable(AccreditedEditableHelper(accreditionSideBar, step, subStep));
  }, [step, subStep, accreditionSideBar]);

  useEffect(() => {
    if (facilityIdForSummary) dispatch(getFormBAccreditors(facilityIdForSummary));
  }, [facilityIdForSummary]);

  useEffect(() => {
    if (id) dispatch(getFormBSelectedAccreditor(id));
  }, [id]);

  return (
    <>
      <PromptOnRouteChange data={accreditorAssign?.accreditorId} dataCopy={accreditorAssignCopy?.accreditorId} />

      <section className="common-white-container practice-manager-basic-details-grid">
        <span className="form-detail-title">Accreditor</span>
        <ReactSelect
          placeholder="Select Accreditor"
          name="accreditorId"
          options={accreditorNameList ?? []}
          className="react-select-container"
          classNamePrefix="react-select"
          value={accreditorId ?? []}
          onChange={handleSelectChange}
          isDisabled={!isEditable}
        />
        {error?.toString()?.trim()?.length > 0 && <div className="form-error-message">{error}</div>}
      </section>
    </>
  );
};

export default AccreditorAssign;
