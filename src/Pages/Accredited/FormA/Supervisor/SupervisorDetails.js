import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import _ from 'lodash';
import moment from 'moment';
import GetComponentByType from '../../../../components/common/getComponentByType/getComponentByType';
import {
  updateAccreditedSubFormArrayFields,
  updateAccreditedSubFormFields,
  updateSupervisorTimings,
} from '../../redux/AccreditedReduxActions';
import HoursTable from '../../HoursTable/HoursTable';

const SupervisorDetails = props => {
  const { supervisorList, data, index, fromModule, isEditable } = props;
  const dispatch = useDispatch();

  const { userId, username, email, college, contactNumber, categoryOfSupervisor, hours, errors } = useMemo(
    () => data ?? {},
    [data],
  );

  const supervisorOptions = useMemo(() => {
    return supervisorList?.map(manager => ({
      label: `${manager?.firstName} ${manager?.lastName}`,
      value: manager?.userId,
      name: 'userId',
      email: manager?.email,
      contactNumber: manager?.contactNumber,
    }));
  }, [supervisorList]);

  const supervisorDetails = useMemo(
    () => [
      {
        type: 'select',
        title: 'Name',
        name: 'userId',
        placeholder: 'Select Name',
        options: supervisorOptions,
        value: userId,
        error: errors?.userId,
        isEditable,
      },
      {
        type: 'select',
        title: 'Category',
        name: 'categoryOfSupervisor',
        placeholder: 'Select Category',
        options: [
          { label: 'Clinical', value: 'CLINICAL', name: 'categoryOfSupervisor' },
          {
            label: 'Education',
            value: 'Education',
            name: 'categoryOfSupervisor',
          },
        ],
        value: categoryOfSupervisor,
        error: errors?.categoryOfSupervisor,
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
        isMulti: true,
        value: college,
        error: errors?.college,
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
    ],
    [userId, email, contactNumber, college, categoryOfSupervisor, supervisorOptions, errors, isEditable],
  );

  const finalSupervisorDetails = useMemo(() => {
    if (fromModule === 'formA') {
      return [...supervisorDetails];
    }
    return [
      {
        type: 'text',
        title: 'Name',
        name: 'userId',
        placeholder: 'Select Name',
        value: username,
        isEditable,
      },
      {
        type: 'text',
        title: 'Category',
        name: 'categoryOfSupervisor',
        placeholder: 'Select Category',
        value: categoryOfSupervisor,
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
        type: 'text',
        title: 'Phone Number',
        name: 'contactNumber',
        placeholder: 'e.g 0399998888',
        value: contactNumber,
        isEditable,
      },
    ];
  }, [username, supervisorDetails, fromModule, isEditable]);

  const emailContactChange = useCallback(
    user => {
      dispatch(updateAccreditedSubFormArrayFields('formA', 'supervisors', index, 'email', user?.email));
      dispatch(updateAccreditedSubFormArrayFields('formA', 'supervisors', index, 'contactNumber', user?.contactNumber));
    },
    [fromModule, supervisorList],
  );

  const onInputChange = useCallback(
    (name, value) => {
      if (fromModule === 'formA') {
        dispatch(updateAccreditedSubFormArrayFields('formA', 'supervisors', index, name, value));
        if (name === 'userId') {
          emailContactChange(value);
        }
      }
      if (fromModule === 'formA1') {
        dispatch(updateAccreditedSubFormFields('formA1', userId, name, value));
      }
    },
    [index, fromModule, userId, emailContactChange],
  );

  const onHourDetailsInputChange = useCallback(
    (day, name, value) => {
      if (name === 'isChecked') {
        if (value !== 'true') {
          if (['Sunday', 'Saturday'].includes(day)) {
            dispatch(updateSupervisorTimings(index, 'hours', day, 'startTime', '00:00'));
            dispatch(updateSupervisorTimings(index, 'hours', day, 'finishTime', '00:00'));
          } else {
            dispatch(updateSupervisorTimings(index, 'hours', day, 'startTime', '08:00'));
            dispatch(updateSupervisorTimings(index, 'hours', day, 'finishTime', '17:00'));
          }
        }
        dispatch(updateSupervisorTimings(index, 'hours', day, name, value));
      } else {
        const finalValue =
          value === 'Invalid date'
            ? moment(
                moment()
                  .hour((!['Sunday', 'Saturday'].includes(day) && (name === 'startTime' ? 8 : 17)) || 0)
                  .minutes(0),
              ).format('HH:mm')
            : value;
        dispatch(updateSupervisorTimings(index, 'hours', day, name, moment(finalValue, 'HH:mm').format('HH:mm')));
      }
    },
    [index],
  );

  return (
    <div>
      <div className="supervisor-details-grid">
        {finalSupervisorDetails.map(detail => (
          <GetComponentByType input={detail} onInputChange={onInputChange} />
        ))}
      </div>
      {fromModule === 'formA' && (
        <>
          <div className="accredited-title accredited-title-margin">Supervisor Hours – Opening & Closing Time</div>
          <div className="common-white-container">
            {!_.isEmpty(hours) && (
              <HoursTable hours={hours} onHourInputChange={onHourDetailsInputChange} isEditable={isEditable} />
            )}
          </div>
        </>
      )}
    </div>
  );
};

SupervisorDetails.propTypes = {
  supervisorList: PropTypes.array,
  data: PropTypes.object.isRequired,
  fromModule: PropTypes.string.isRequired,
  index: PropTypes.number,
  isEditable: PropTypes.bool,
};

SupervisorDetails.defaultProps = {
  supervisorList: [],
  index: 0,
  isEditable: true,
};

export default SupervisorDetails;
