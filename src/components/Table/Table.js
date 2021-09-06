import React, { useCallback, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import Tooltip from 'rc-tooltip';
import 'rc-tooltip/assets/bootstrap.css';
import { processTableDataByType } from './TableDataProcessHelper';
import Checkbox from '../Checkbox/Checkbox';
import DropdownMenu from '../DropdownMenu/DropdownMenu';
import { useWindowWidth } from '../../hooks/useWindowWidth';

export const TABLE_ROW_ACTIONS = {
  EDIT_ROW: 'EDIT_ROW',
  DELETE_ROW: 'DELETE_ROW',
};

const Table = props => {
  const {
    tableClass,
    align,
    valign,
    headers,
    mobileHeaders,
    extraColumns,
    headerClass,
    data,
    rowClass,
    recordSelected,
    recordActionClick,
    refreshData,
    haveActions,
    showCheckbox,
    onChangeRowSelection,
  } = props;
  const tableClassName = `table-class ${tableClass}`;
  const [selectedRowData, setSelectedRowData] = React.useState([]);

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

  const onRowSelectedDataChange = useCallback(
    current => {
      setSelectedRowData(prev => {
        const finalData = [...prev];
        const find = finalData.findIndex(e => e.id === current.id);

        if (find > -1) {
          finalData.splice(find, 1);
        } else {
          finalData.push(current);
        }

        return finalData;
      });
    },
    [setSelectedRowData, selectedRowData],
  );

  const onSelectAllRow = useCallback(() => {
    if (tableData.length !== 0) {
      if (selectedRowData.length === tableData.length) {
        setSelectedRowData([]);
      } else {
        setSelectedRowData(tableData);
      }
    }
  }, [setSelectedRowData, selectedRowData, tableData]);

  useEffect(() => {
    onChangeRowSelection(selectedRowData);
  }, [selectedRowData, onChangeRowSelection]);
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
          {showCheckbox && (
            <th width={10} align={align} valign={valign}>
              <Checkbox
                className="crm-checkbox-list"
                checked={tableData.length !== 0 && selectedRowData.length === tableData.length}
                onChange={onSelectAllRow}
              />
            </th>
          )}
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
          {(haveActions || extraColumns.length > 0) && <th style={{ position: 'sticky', right: 0 }} />}
          {/* {tableButtonActions.length > 0 && <th align={align}>Credit Limit Actions</th>} */}
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
              extraColumns={extraColumns}
              rowClass={rowClass}
              recordSelected={recordSelected}
              recordActionClick={recordActionClick}
              haveActions={haveActions}
              showCheckbox={showCheckbox}
              isSelected={selectedRowData.some(f => f.id === e.id)}
              onRowSelectedDataChange={onRowSelectedDataChange}
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
  extraColumns: PropTypes.arrayOf(PropTypes.element),
  headerClass: PropTypes.string,
  data: PropTypes.array,
  rowClass: PropTypes.string,
  recordSelected: PropTypes.func,
  recordActionClick: PropTypes.func,
  refreshData: PropTypes.func,
  haveActions: PropTypes.bool,
  showCheckbox: PropTypes.bool,
  onChangeRowSelection: PropTypes.func,
};

Table.defaultProps = {
  tableClass: '',
  align: 'left',
  valign: 'center',
  headers: [],
  mobileHeaders: [],
  headerClass: '',
  data: [],
  extraColumns: [],
  rowClass: '',
  haveActions: false,
  showCheckbox: false,
  recordSelected: () => {},
  recordActionClick: () => {},
  refreshData: () => {},
  onChangeRowSelection: () => {},
  // isEditableDrawer: false,
};

export default Table;

function Row(props) {
  const {
    align,
    valign,
    data,
    finalHeaderNames,
    rowClass,
    recordSelected,
    dataIndex,
    haveActions,
    extraColumns,
    recordActionClick,
    showCheckbox,
    isSelected,
    onRowSelectedDataChange,
  } = props;

  const [showActionMenu, setShowActionMenu] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
  const mobileWindowWidth = useWindowWidth() < 1024;

  const onClickActionToggleButton = useCallback(
    e => {
      e.persist();
      e.stopPropagation();
      const menuTop = e.clientY + 10;
      const menuLeft = e.clientX - 90;
      setShowActionMenu(prev => !prev);
      setMenuPosition({ top: menuTop, left: menuLeft });
    },
    [setShowActionMenu, setMenuPosition],
  );
  const onClickAction = useCallback(
    (e, type) => {
      e.stopPropagation();
      recordActionClick(type, data.id, data);
      setShowActionMenu(false);
    },
    [recordActionClick, data, showActionMenu],
  );

  const onRowSelected = useCallback(() => {
    onRowSelectedDataChange(data);
  }, [onRowSelectedDataChange, data]);

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
        {showCheckbox && (
          <td width={10} align={align} valign={valign} className={rowClass}>
            <Checkbox className="crm-checkbox-list" checked={isSelected} onChange={onRowSelected} />
          </td>
        )}
        {Object.entries(data).map(([key, value], index) => {
          switch (key) {
            case 'id':
              return null;
            case 'accreditionId':
              return null;
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
        {haveActions && (
          <td
            align="right"
            valign={valign}
            className={`fixed-action-menu ${showActionMenu ? 'fixed-action-menu-clicked' : ''} ${
              dataIndex % 2 === 0 ? 'bg-white' : 'bg-background-color'
            }`}
          >
            <span className="material-icons-round cursor-pointer table-action" onClick={onClickActionToggleButton}>
              more_vert
            </span>
          </td>
        )}
        {extraColumns.map((element, index) => (
          <td
            key={index.toString()}
            width={10}
            align={align}
            valign={valign}
            style={{ position: 'sticky', right: 0 }}
            className={rowClass}
          >
            {element(data)}
          </td>
        ))}
      </tr>

      {showActionMenu && (
        <DropdownMenu style={menuPosition} toggleMenu={setShowActionMenu}>
          <div className="menu-name" onClick={e => onClickAction(e, TABLE_ROW_ACTIONS.EDIT_ROW)}>
            <span className="material-icons-round">edit</span> Edit
          </div>
          <div className="menu-name" onClick={e => onClickAction(e, TABLE_ROW_ACTIONS.DELETE_ROW)}>
            <span className="material-icons-round">delete_outline</span> Delete
          </div>
        </DropdownMenu>
      )}
    </>
  );
}

Row.propTypes = {
  align: PropTypes.oneOf(['left', 'center', 'right']),
  valign: PropTypes.oneOf(['top', 'center', 'bottom']),
  data: PropTypes.object,
  extraColumns: PropTypes.arrayOf(PropTypes.func),
  finalHeaderNames: PropTypes.array,
  rowClass: PropTypes.string,
  dataIndex: PropTypes.number,
  recordSelected: PropTypes.func,
  haveActions: PropTypes.bool,
  isSelected: PropTypes.bool,
  recordActionClick: PropTypes.func,
  onRowSelectedDataChange: PropTypes.func,
  showCheckbox: PropTypes.bool,
};

Row.defaultProps = {
  align: 'left',
  valign: 'left',
  data: {},
  extraColumns: [],
  finalHeaderNames: [],
  rowClass: '',
  dataIndex: '',
  recordSelected: () => {},
  haveActions: false,
  showCheckbox: false,
  isSelected: false,
  recordActionClick: () => {},
  onRowSelectedDataChange: () => {},
};
