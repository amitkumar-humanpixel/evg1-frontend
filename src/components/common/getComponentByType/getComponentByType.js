import React, { useCallback } from 'react';
import ReactSelect from 'react-select';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import TimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';
import moment from 'moment';
import Input from '../../Input/Input';
import Switch from '../../Switch/Switch';

const GetComponentByType = props => {
  const { input, onInputChange } = props;
  let component;

  const handleInputTextChange = useCallback(
    e => {
      const { name, value } = e.target;
      onInputChange(name, value);
    },
    [onInputChange],
  );

  const handleSelectChange = useCallback(
    e => {
      onInputChange(e.name ?? e?.[0]?.name, e);
    },
    [onInputChange],
  );

  const handleDateChange = useCallback(
    (name, date) => {
      onInputChange(name, date);
    },
    [onInputChange],
  );

  const onDayHourInputChange = useCallback(
    (inputName, inputValue, label, value) => {
      const finalTimeValue = value === 'Invalid date' ? moment(moment().hour(0).minutes(0)).format('HH:mm') : value;
      const finalValue = {
        ...inputValue,
        [label]: label === 'hours' ? moment(finalTimeValue, 'HH:mm').format('HH:mm') : value,
      };
      onInputChange(inputName, finalValue);
    },
    [onInputChange],
  );

  switch (input?.type) {
    case 'select':
      component = (
        <ReactSelect
          placeholder={input.placeholder}
          name={input.name}
          options={input?.options}
          className="react-select-container"
          classNamePrefix="react-select"
          value={input?.value ?? []}
          onChange={handleSelectChange}
          isDisabled={!input?.isEditable}
          isMulti={input?.isMulti}
        />
      );
      break;

    case 'multilineInput':
      component = (
        <div className="multi-line-inputs-container">
          <textarea
            rows={input.rows}
            name={input.name}
            placeholder={input.placeholder}
            value={input.value}
            onChange={handleInputTextChange}
            disabled={!input?.isEditable}
          />
        </div>
      );
      break;

    case 'day/hours':
      component = (
        <div className="day-hour-input-row">
          <Input
            type="text"
            value={input.day.value}
            suffix="Days"
            placeholder={input.day.placeholder}
            suffixClass="day-input"
            onChange={e => onDayHourInputChange(input.name, input.value, 'days', e?.target?.value)}
            disabled={!input?.day?.isEditable}
          />
          <TimePicker
            placeholder="00:00"
            defaultValue={moment().hours(0).minutes(0)}
            format="HH:mm"
            use12Hours={false}
            showSecond={false}
            value={moment(input.time.value, 'HH:mm')}
            onChange={e => onDayHourInputChange(input.name, input.value, 'hours', moment(e).format('HH:mm'))}
            disabled={!input?.time?.isEditable}
          />
        </div>
      );
      break;

    case 'date':
      component = (
        <>
          <div className="date-picker-container filter-date-picker-container">
            <DatePicker
              className="filter-date-picker"
              selected={input.value ? new Date(input.value) : ''}
              name={input.name}
              placeholderText={input.placeholder}
              onChange={date => handleDateChange(input.name, date)}
              showMonthDropdown
              showYearDropdown
              scrollableYearDropdown
              dateFormat="dd/MM/yyyy"
              disabled={!input?.isEditable}
            />
            <span className="material-icons-round">event</span>
          </div>
        </>
      );
      break;

    case 'switch':
      component = <Switch id={input.id} value={input.value} />;
      break;

    case 'title':
      component = <div className="component-primary-title">{input.fieldTitle}</div>;
      break;

    case 'text':
      component = <div className="component-text-type-value">{input.value || '-'}</div>;
      break;

    case 'blank':
      component = <div />;
      break;

    default:
      component = (
        <Input
          type="text"
          name={input.name}
          placeholder={input.placeholder}
          value={input.value}
          onChange={handleInputTextChange}
          disabled={!input?.isEditable}
        />
      );
  }
  return (
    <>
      {input.type !== 'blank' && (
        <>
          {input.type !== 'title' && (
            <span className={`form-detail-title ${input.type === 'multilineInput' && 'multi-line-inputs-container'}`}>
              {input.title}
            </span>
          )}
          <div>
            {component}
            {input?.error?.toString()?.trim()?.length > 0 && <div className="form-error-message">{input?.error}</div>}
          </div>
        </>
      )}
    </>
  );
};
GetComponentByType.propTypes = {
  input: PropTypes.object.isRequired,
  onInputChange: PropTypes.func.isRequired,
};

export default GetComponentByType;
