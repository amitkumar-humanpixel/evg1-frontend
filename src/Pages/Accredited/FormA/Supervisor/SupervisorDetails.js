import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import GetComponentByType from '../../../../components/common/getComponentByType/getComponentByType';
import { updateAccreditedSubFormArrayFields, updateAccreditedSubFormFields } from '../../redux/AccreditedReduxActions';

const SupervisorDetails = props => {
  const { supervisorList, data, index, fromModule, isEditable } = props;
  const dispatch = useDispatch();

  const { userId, username, email, contactNumber, categoryOfSupervisor, errors } = useMemo(() => data ?? {}, [data]);

  const supervisorOptions = useMemo(() => {
    return supervisorList?.map(manager => ({
      label: `${manager?.firstName} ${manager?.lastName}`,
      value: manager?.userId,
      name: 'userId',
      email: manager?.email,
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
        type: 'text',
        title: 'Email',
        name: 'email',
        value: email,
        isEditable,
      },
      {
        type: 'input',
        title: 'Contact Number',
        name: 'contactNumber',
        placeholder: 'Enter Contact Number',
        value: contactNumber,
        error: errors?.contactNumber,
        isEditable,
      },
    ],
    [userId, email, contactNumber, categoryOfSupervisor, supervisorOptions, errors, isEditable],
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
        title: 'Contact Number',
        name: 'contactNumber',
        placeholder: 'Enter Contact Number',
        value: contactNumber,
        isEditable,
      },
    ];
  }, [username, supervisorDetails, fromModule, isEditable]);

  const emailChange = useCallback(
    user => {
      dispatch(updateAccreditedSubFormArrayFields('formA', 'supervisors', index, 'email', user?.email));
    },
    [fromModule, supervisorList],
  );

  const onInputChange = useCallback(
    (name, value) => {
      if (fromModule === 'formA') {
        dispatch(updateAccreditedSubFormArrayFields('formA', 'supervisors', index, name, value));
        if (name === 'userId') {
          emailChange(value);
        }
      }
      if (fromModule === 'formA1') {
        dispatch(updateAccreditedSubFormFields('formA1', userId, name, value));
      }
    },
    [index, fromModule, userId, emailChange],
  );

  return (
    <div className="supervisor-details-grid">
      {finalSupervisorDetails.map(detail => (
        <GetComponentByType input={detail} onInputChange={onInputChange} />
      ))}
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
