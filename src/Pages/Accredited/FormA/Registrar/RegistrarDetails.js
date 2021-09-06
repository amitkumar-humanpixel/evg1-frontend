import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import GetComponentByType from '../../../../components/common/getComponentByType/getComponentByType';
import { updateAccreditedSubFormArrayFields, updateRegistrarTimings } from '../../redux/AccreditedReduxActions';
import HoursTable from '../../HoursTable/HoursTable';

const RegistrarDetails = props => {
  const { registrarList, data, index, isEditable } = props;
  const dispatch = useDispatch();

  const { onCall, hoursDetails, note, note1, note2, placementId, errors } = useMemo(() => data, [data]);

  const registrarDetailsFields = useMemo(
    () => [
      {
        type: 'select',
        title: 'Name',
        name: 'placementId',
        placeholder: 'Select Name',
        options: registrarList,
        value: placementId,
        isEditable,
        error: errors?.placementId,
      },
      { type: 'blank' },
      {
        type: 'multilineInput',
        title: 'Note',
        name: 'note',
        placeholder: 'Enter Note',
        value: note,
        isEditable,
      },
    ],
    [placementId, note, registrarList, isEditable, errors],
  );

  const onInputChange = useCallback(
    (name, value) => {
      dispatch(updateAccreditedSubFormArrayFields('formA', 'registrars', index, name, value));
    },
    [index],
  );

  const onHourDetailsInputChange = useCallback(
    (day, name, value) => {
      if (name === 'isChecked') {
        if (!value) {
          dispatch(updateRegistrarTimings(index, 'hoursDetails', day, 'startTime', '00:00'));
          dispatch(updateRegistrarTimings(index, 'hoursDetails', day, 'finishTime', '00:00'));
        }
        dispatch(updateRegistrarTimings(index, 'hoursDetails', day, name, value));
      } else {
        const finalValue = value === 'Invalid date' ? moment(moment().hour(0).minutes(0)).format('HH:mm') : value;
        dispatch(updateRegistrarTimings(index, 'hoursDetails', day, name, moment(finalValue, 'HH:mm').format('HH:mm')));
      }
    },
    [index],
  );

  const onCallInputChange = useCallback(
    (day, name, value) => {
      if (name === 'isChecked') {
        if (!value) {
          dispatch(updateRegistrarTimings(index, 'onCall', day, 'startTime', '00:00'));
          dispatch(updateRegistrarTimings(index, 'onCall', day, 'finishTime', '00:00'));
        }
        dispatch(updateRegistrarTimings(index, 'onCall', day, name, value));
      } else {
        const finalValue = value === 'Invalid date' ? moment(moment().hour(0).minutes(0)).format('HH:mm') : value;
        dispatch(updateRegistrarTimings(index, 'onCall', day, name, moment(finalValue, 'HH:mm').format('HH:mm')));
      }
    },
    [index],
  );

  return (
    <>
      <div className="registrar-details-grid">
        {registrarDetailsFields.map(detail => (
          <GetComponentByType input={detail} onInputChange={onInputChange} />
        ))}
      </div>
      <div className="section-inner-title mt-15">Registrar Hours – Opening & Closing Time</div>
      <HoursTable
        className="mt-10"
        hours={hoursDetails}
        onHourInputChange={onHourDetailsInputChange}
        isEditable={isEditable}
      />
      <div className="registrar-details-grid">
        <span className="form-detail-title multi-line-inputs-container">Note - 1</span>
        <div className="multi-line-inputs-container">
          <textarea
            rows={2}
            name="note1"
            placeholder="Enter registrar hour note."
            value={note1}
            onChange={e => onInputChange(e.target.name, e.target.value)}
            disabled={!isEditable}
          />
        </div>
      </div>
      <div className="section-inner-title mt-15">On Call Hours</div>
      <HoursTable className="mt-10" hours={onCall} onHourInputChange={onCallInputChange} isEditable={isEditable} />
      <div className="registrar-details-grid">
        <span className="form-detail-title multi-line-inputs-container">Note - 2</span>
        <div className="multi-line-inputs-container">
          <textarea
            rows={2}
            name="note2"
            placeholder="Enter on call hours note."
            value={note2}
            onChange={e => onInputChange(e.target.name, e.target.value)}
            disabled={!isEditable}
          />
        </div>
      </div>
    </>
  );
};

RegistrarDetails.propTypes = {
  registrarList: PropTypes.array.isRequired,
  data: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  isEditable: PropTypes.bool,
};

RegistrarDetails.defaultProps = {
  isEditable: true,
};

export default RegistrarDetails;
