import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import TimePicker from 'rc-time-picker';
import moment from 'moment/moment';
import { useWindowWidth } from '../../../hooks/useWindowWidth';
import Checkbox from '../../../components/Checkbox/Checkbox';

const HoursTable = props => {
  const { className, hours, onHourInputChange, isEditable } = props;
  const format = 'HH:mm';
  const [totalTime, setTotalTime] = useState('00:00');

  useEffect(() => {
    const totalHours = hours?.map(e => moment(e?.hours, 'HH:mm')?.format('HH:mm'));
    const totalDurations = totalHours
      .slice(1)
      .reduce((prev, cur) => moment.duration(cur).add(prev), moment.duration(totalHours[0]));

    setTotalTime(`${
      Math.floor(totalDurations.asHours()) <= 9
        ? `0${Math.floor(totalDurations.asHours())}`
        : Math.floor(totalDurations.asHours())
    }:
      ${
        Math.floor(totalDurations.asMinutes()) - Math.floor(totalDurations.asHours()) * 60 <= 9
          ? `0${Math.floor(totalDurations.asMinutes()) - Math.floor(totalDurations.asHours()) * 60}`
          : Math.floor(totalDurations.asMinutes()) - Math.floor(totalDurations.asHours()) * 60
      }`);
  }, [hours]);

  return (
    <table className={`hours-table ${className}`}>
      <thead>
        <th>Days</th>
        <th>Opening</th>
        <th>Closing</th>
        <th>Total</th>
      </thead>
      {hours.map(e => (
        <>
          <tr>
            <td width={40}>
              <div className="hour-table-day-container">
                <Checkbox
                  id={`practice-hours-${e?.days}`}
                  title={
                    <div className="hour-table-day">{useWindowWidth() > 1024 ? e?.days : e?.days.slice(0, 3)}</div>
                  }
                  checked={e?.isChecked}
                  onChange={event => onHourInputChange(e?.days, 'isChecked', event.target.checked)}
                  disabled={!isEditable}
                />
              </div>
            </td>

            <td width={20}>
              <TimePicker
                placeholder="00:00"
                defaultValue={moment().hours(0).minutes(0)}
                format={format}
                use12Hours={false}
                showSecond={false}
                focusOnOpen
                value={moment(e?.startTime, 'HH:mm')}
                onChange={time => onHourInputChange(e?.days, 'startTime', moment(time).format('HH:mm'))}
                disabled={!isEditable}
              />
            </td>
            <td width={20}>
              <TimePicker
                placeholder="00:00"
                defaultValue={moment().hours(0).minutes(0)}
                format={format}
                use12Hours={false}
                showSecond={false}
                focusOnOpen
                value={moment(e?.finishTime, 'HH:mm')}
                onChange={time => onHourInputChange(e?.days, 'finishTime', moment(time).format('HH:mm'))}
                disabled={!isEditable}
              />
            </td>
            <td width={20}>
              <div className="total-hours">
                {e?.startTime < e?.finishTime
                  ? moment(
                      `${moment
                        .duration(moment(e?.finishTime, format).diff(moment(e?.startTime, format)))
                        .hours()}:${moment
                        .duration(moment(e?.finishTime, format).diff(moment(e?.startTime, format)))
                        .minutes()}`,
                      'HH:mm',
                    ).format('HH:mm')
                  : '00:00'}
              </div>
            </td>
          </tr>
          {e?.error?.toString()?.trim()?.length > 0 && (
            <tr>
              <td colSpan={4} className="hour-error-cell">
                <div className="form-error-message">{e?.error}</div>
              </td>
            </tr>
          )}
        </>
      ))}
      <tr>
        <td colSpan={3}>Total</td>
        <td width={20}>
          <div className="total-hours">{totalTime}</div>
        </td>
      </tr>
    </table>
  );
};

HoursTable.propTypes = {
  className: PropTypes.string,
  hours: PropTypes.array,
  onHourInputChange: PropTypes.func,
  isEditable: PropTypes.bool,
};

HoursTable.defaultProps = {
  className: '',
  hours: [],
  onHourInputChange: () => {},
  isEditable: true,
};

export default HoursTable;
