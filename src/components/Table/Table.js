import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import Tooltip from 'rc-tooltip';
import 'rc-tooltip/assets/bootstrap.css';
import _ from 'lodash';
import { processTableDataByType } from './TableDataProcessHelper';
import { useWindowWidth } from '../../hooks/useWindowWidth';

const Table = props => {
  const {
    tableClass,
    align,
    valign,
    headers,
    mobileHeaders,
    headerClass,
    data,
    rowClass,
    recordSelected,
    refreshData,
  } = props;
  const tableClassName = `table-class ${tableClass}`;

  const tableData = useMemo(() => {
    return data.map((e, index) => {
      const finalObj = {
        id: e._id ?? e.id ?? index,
        accreditionId: e?.accreditionId ?? undefined,
      };
      headers.forEach(f => {
        finalObj[`${f.name}`] = processTableDataByType({ header: f, row: e });
      });

      return finalObj;
    });
  }, [data, headers]);

  const mobileWindowWidth = useWindowWidth() < 1024;
  const finalHeaders = useMemo(
    () => (mobileWindowWidth ? mobileHeaders : headers),
    [mobileWindowWidth, headers, mobileHeaders],
  );
  const finalHeaderNames = useMemo(() => finalHeaders.map(header => header.name), [finalHeaders]);

  return (
    <>
      <table className={tableClassName}>
        <thead>
          {finalHeaders.length > 0 &&
            finalHeaders.map(heading => (
              <th
                key={heading.label}
                align={align}
                valign={valign}
                className={`${headerClass} ${heading.type === 'boolean' ? 'table-checkbox-header' : ''}  `}
              >
                {heading.label}
              </th>
            ))}
        </thead>
        <tbody>
          {tableData.map((e, index) => (
            <Row
              key={index.toString()}
              data={e}
              align={align}
              valign={valign}
              dataIndex={index}
              finalHeaderNames={finalHeaderNames}
              rowClass={rowClass}
              recordSelected={recordSelected}
              refreshData={refreshData}
            />
          ))}
        </tbody>
      </table>
    </>
  );
};

Table.propTypes = {
  tableClass: PropTypes.string,
  align: PropTypes.oneOf(['left', 'center', 'right']),
  valign: PropTypes.oneOf(['top', 'center', 'bottom']),
  headers: PropTypes.array,
  mobileHeaders: PropTypes.array,
  headerClass: PropTypes.string,
  data: PropTypes.array,
  rowClass: PropTypes.string,
  recordSelected: PropTypes.func,
  refreshData: PropTypes.func,
};

Table.defaultProps = {
  tableClass: '',
  align: 'left',
  valign: 'center',
  headers: [],
  mobileHeaders: [],
  headerClass: '',
  data: [],
  rowClass: '',
  recordSelected: () => {},
  refreshData: () => {},
};

export default Table;

function Row(props) {
  const { align, data, finalHeaderNames, rowClass, recordSelected, dataIndex } = props;

  const mobileWindowWidth = useWindowWidth() < 1024;

  const finalValue = useCallback((key, value) => (finalHeaderNames.includes(key) ? value : null), [data]);

  return (
    <>
      <tr
        onClick={() => recordSelected(data)}
        className={`
          main-table-row
          ${rowClass}
         
        `}
      >
        {Object.entries(data).map(([key, value], index) => {
          switch (key) {
            case 'id':
              return null;
            case 'accreditionId':
              return null;
            case 'formType':
              // eslint-disable-next-line no-nested-ternary
              return (
                <td
                  key={index.toString()}
                  align={align}
                  className={dataIndex % 2 === 0 ? 'bg-white' : 'bg-background-color'}
                >
                  {mobileWindowWidth && finalValue(key, value)
                    ? _.startCase(finalValue(key, value))
                    : _.startCase(value) ?? '-'}
                </td>
              );
            default:
              // eslint-disable-next-line no-nested-ternary
              return !mobileWindowWidth ? (
                <td
                  key={index.toString()}
                  align={align}
                  className={dataIndex % 2 === 0 ? 'bg-white' : 'bg-background-color'}
                >
                  {value?.length > 50 ? (
                    <Tooltip
                      overlayClassName="tooltip-top-class"
                      mouseEnterDelay={0.5}
                      overlay={<span>{value ?? 'No value'}</span>}
                      placement="topLeft"
                    >
                      <span>{value ?? '-'}</span>
                    </Tooltip>
                  ) : (
                    value ?? '-'
                  )}
                </td>
              ) : finalValue(key, value) ? (
                <td
                  key={index.toString()}
                  align={align}
                  className={dataIndex % 2 === 0 ? 'bg-white' : 'bg-background-color'}
                >
                  {value?.length > 50 ? (
                    <Tooltip
                      overlayClassName="tooltip-top-class"
                      mouseEnterDelay={0.5}
                      overlay={<span>{value ?? 'No value'}</span>}
                      placement="topLeft"
                    >
                      <span>{finalValue(key, value) ?? '-'}</span>
                    </Tooltip>
                  ) : (
                    finalValue(key, value) ?? '-'
                  )}
                </td>
              ) : null;
          }
        })}
      </tr>
    </>
  );
}

Row.propTypes = {
  align: PropTypes.oneOf(['left', 'center', 'right']),
  data: PropTypes.object,
  finalHeaderNames: PropTypes.array,
  rowClass: PropTypes.string,
  dataIndex: PropTypes.number,
  recordSelected: PropTypes.func,
};

Row.defaultProps = {
  align: 'left',
  data: {},
  finalHeaderNames: [],
  rowClass: '',
  dataIndex: '',
  recordSelected: () => {},
};
