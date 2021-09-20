import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { useParams } from 'react-router-dom';
import GetComponentByType from '../../../../components/common/getComponentByType/getComponentByType';
import HoursTable from '../../HoursTable/HoursTable';
import {
  getPracticeManagerDetails,
  getPracticeManagersList,
  updateAccreditedSubFormFields,
  updatePracticeManagerTimings,
} from '../../redux/AccreditedReduxActions';
import { useQueryParams } from '../../../../hooks/GetQueryParamHook';
import { AccreditedEditableHelper } from '../../../../helpers/AccreditedEditableHelper';

const PracticeManager = () => {
  const { id } = useQueryParams();
  const { step, subStep } = useParams();
  const dispatch = useDispatch();

  const [isEditable, setIsEditable] = useState(true);

  const { accreditionSideBar } = useSelector(({ accreditedReducer }) => accreditedReducer?.accreditedStepper ?? {});
  const { facilityId } = useSelector(({ accreditedReducer }) => accreditedReducer?.accreditedDetails ?? {});

  const { practiceManagerList, practiceManager } = useSelector(
    ({ accreditedReducer }) => accreditedReducer?.formA ?? {},
  );

  const { userId, email, contactNumber, usualWorkingHours, hours, errors } = useMemo(
    () => practiceManager,
    [practiceManager],
  );

  const practiceManagerOptions = useMemo(() => {
    return practiceManagerList.map(manager => ({
      label: `${manager?.firstName} ${manager?.lastName}`,
      value: manager?.userId,
      name: 'userId',
      email: manager?.email,
    }));
  }, [practiceManagerList]);

  const practiceManagerBasicDetailsFields = useMemo(
    () => [
      {
        type: 'select',
        title: 'Name',
        name: 'userId',
        placeholder: 'Select Name',
        options: practiceManagerOptions,
        value: userId,
        error: errors?.userId,
        isEditable,
      },
      {
        type: 'text',
        title: 'Email',
        name: 'email',
        value: email,
        isEditable,
      },
      {
        type: 'input',
        title: 'Phone Number',
        name: 'contactNumber',
        placeholder: 'e.g 0399998888',
        value: contactNumber,
        error: errors?.contactNumber,
        isEditable,
      },
      {
        type: 'day/hours',
        title: 'Usual Working Days/Hours',
        name: 'usualWorkingHours',
        value: usualWorkingHours,
        error: errors?.usualWorkingHours,
        day: {
          placeholder: '00',
          value: usualWorkingHours?.days,
          suffix: 'Days',
          isEditable,
        },
        time: {
          placeholder: '00:00',
          value: usualWorkingHours?.hours || '00:00',
          suffix: 'Hours',
          isEditable,
        },
      },
    ],
    [usualWorkingHours, contactNumber, email, practiceManagerOptions, userId, errors, isEditable],
  );
  const onHourInputChange = useCallback((day, name, value) => {
    if (name === 'isChecked') {
      if (!value) {
        dispatch(updatePracticeManagerTimings(day, 'startTime', '00:00'));
        dispatch(updatePracticeManagerTimings(day, 'finishTime', '00:00'));
      }
      dispatch(updatePracticeManagerTimings(day, name, value));
    } else {
      const finalValue = value === 'Invalid date' ? moment(moment().hour(0).minutes(0)).format('HH:mm') : value;
      dispatch(updatePracticeManagerTimings(day, name, moment(finalValue, 'HH:mm').format('HH:mm')));
    }
  }, []);

  const onInputChange = useCallback(
    (name, value) => {
      if (name === 'userId') {
        dispatch(updateAccreditedSubFormFields('formA', 'practiceManager', 'email', value?.email));
      }
      dispatch(updateAccreditedSubFormFields('formA', 'practiceManager', name, value));
    },
    [practiceManagerList],
  );

  useEffect(() => {
    if (facilityId) dispatch(getPracticeManagersList(facilityId));
  }, [facilityId]);

  useEffect(() => {
    if (id) dispatch(getPracticeManagerDetails(id));
  }, [id]);

  useEffect(() => {
    setIsEditable(AccreditedEditableHelper(accreditionSideBar, step, subStep));
  }, [step, subStep, accreditionSideBar]);

  return (
    <>
      <section className="common-white-container practice-manager-basic-details-grid">
        {practiceManagerBasicDetailsFields.map(input => (
          <GetComponentByType input={input} onInputChange={onInputChange} />
        ))}
      </section>
      <section className="practice-manager-practice-hours">
        <div className="accredited-title accredited-title-margin">Practice Hours – Opening & Closing Time</div>
        <div className="common-white-container">
          <HoursTable hours={hours} onHourInputChange={onHourInputChange} isEditable={isEditable} />
        </div>
      </section>
    </>
  );
};

export default PracticeManager;
