import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import GetComponentByType from '../../../components/common/getComponentByType/getComponentByType';
import {
  getPostDetails,
  getPracticeManagersForPostDetails,
  updateAccreditedFields,
} from '../redux/AccreditedReduxActions';
import { useQueryParams } from '../../../hooks/GetQueryParamHook';
import { AccreditedEditableHelper } from '../../../helpers/AccreditedEditableHelper';

const PostDetails = () => {
  const { id } = useQueryParams();
  const dispatch = useDispatch();
  const { step, subStep } = useParams();
  const [isEditable, setIsEditable] = useState(true);

  const { accreditionSideBar } = useSelector(({ accreditedReducer }) => accreditedReducer?.accreditedStepper ?? {});

  const facilityIdForFacility = useSelector(
    ({ accreditedReducer }) => accreditedReducer?.accreditedDetails?.facilityId ?? '',
  );

  const {
    facilityId,
    facilityName,
    college,
    practiceWebsite,
    totalNumberGPs,
    phone,
    accreditationEndDate,
    accreditationBody,
    address,
    errors,
  } = useSelector(({ accreditedReducer }) => accreditedReducer?.postDetails ?? {});

  const { postDetailsPracticeManagerOptions } = useSelector(({ accreditedReducer }) => accreditedReducer ?? []);
  const postDetailsFields = useMemo(
    () => [
      {
        type: 'text',
        title: 'Practice Name',
        name: 'facilityName',
        placeholder: 'Select practice',
        value: facilityName,
        error: errors?.facilityName,
        isEditable,
      },
      {
        type: 'select',
        title: `College`,
        name: 'college',
        placeholder: 'Select college',
        options: [
          { label: 'RACGP', value: 'RACGP', name: 'college' },
          { label: 'ACRRM', value: 'ACRRM', name: 'college' },
        ],
        value: college,
        isMulti: true,
        error: errors?.college,
        isEditable,
      },
      {
        type: 'text',
        title: 'Address',
        name: 'address',
        placeholder: 'Enter address',
        value: address,
        error: errors?.address,
        isEditable,
      },
      {
        type: 'select',
        title: 'Accreditation Body',
        name: 'accreditationBody',
        placeholder: 'Select accreditation body',
        options: [
          { label: 'AGPAL', value: 'AGPAL', name: 'accreditationBody' },
          { label: 'QPA', value: 'QPA', name: 'accreditationBody' },
        ],
        value: accreditationBody,
        isMulti: true,
        error: errors?.accreditationBody,
        isEditable,
      },
      {
        type: 'date',
        title: 'Accreditation End Date',
        name: 'accreditationEndDate',
        placeholder: 'Select date',
        value: accreditationEndDate,
        error: errors?.accreditationEndDate,
        isEditable,
      },
      {
        type: 'input',
        title: 'Phone Number',
        name: 'phone',
        placeholder: 'e.g 0399998888',
        value: phone,
        error: errors?.phone,
        isEditable,
      },
      {
        type: 'input',
        title: 'Total Number of GPs',
        name: 'totalNumberGPs',
        placeholder: 'Enter total GPs',
        value: totalNumberGPs,
        error: errors?.totalNumberGPs,
        isEditable,
      },
      {
        title: 'Practice Website',
        name: 'practiceWebsite',
        placeholder: 'Enter website url',
        value: practiceWebsite,
        error: errors?.practiceWebsite,
        isEditable,
      },
    ],
    [
      practiceWebsite,
      totalNumberGPs,
      accreditationEndDate,
      accreditationBody,
      phone,
      facilityId,
      address,
      college,
      errors,
      postDetailsPracticeManagerOptions,
      isEditable,
    ],
  );

  useEffect(() => {
    setIsEditable(AccreditedEditableHelper(accreditionSideBar, step, subStep));
  }, [step, subStep, accreditionSideBar]);

  useEffect(() => {
    if (id) dispatch(getPostDetails(id));
  }, [id]);

  useEffect(() => {
    if (facilityIdForFacility) dispatch(getPracticeManagersForPostDetails(facilityIdForFacility));
  }, [facilityIdForFacility]);

  const onInputChange = useCallback((name, value) => dispatch(updateAccreditedFields('postDetails', name, value)), []);

  return (
    <div className="common-white-container policy-detail-content-container">
      {postDetailsFields.map(input => (
        <GetComponentByType input={input} onInputChange={onInputChange} />
      ))}
    </div>
  );
};

export default PostDetails;
