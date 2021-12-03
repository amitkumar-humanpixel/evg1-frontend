import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactSelect from 'react-select';
import DatePicker from 'react-datepicker';
import { useParams } from 'react-router-dom';
import Switch from '../../../../components/Switch/Switch';
import { useQueryParams } from '../../../../hooks/GetQueryParamHook';
import {
  getFacilityDetailsForSummary,
  getSummaryData,
  updateAccreditedSubFormDataArrayFields,
  updateAccreditedSubFormFields,
} from '../../redux/AccreditedReduxActions';
import Input from '../../../../components/Input/Input';
import SummaryApplications from './SummaryApplications';
import { AccreditedEditableHelper } from '../../../../helpers/AccreditedEditableHelper';
import TriStateSwitch from '../../../../components/TriStateSwitch/TriStateSwitch';
import PromptOnRouteChange from '../../../../components/PromptOnRouteChange';

const Summary = () => {
  const dispatch = useDispatch();
  const { id } = useQueryParams();
  const { step, subStep } = useParams();
  const [isEditable, setIsEditable] = useState(true);

  const nameOfPractice = [
    {
      title:
        'Statement of suitability for accreditation includes confirmation of compliance with required RACGP\n' +
        'and EV standards by the applicant except as otherwise outlined below ',
      width: 70,
    },
    {
      title: 'Considered suitable for Accreditation with EV ',
      width: 30,
    },
  ];

  const { accreditionSideBar, accreditionName } = useSelector(
    ({ accreditedReducer }) => accreditedReducer?.accreditedStepper ?? {},
  );

  const { facilityId } = useSelector(({ accreditedReducer }) => accreditedReducer?.accreditedDetails ?? '');

  const { summary, facilityPracticeManagerOptions, summaryCopy } = useSelector(
    ({ accreditedReducer }) => accreditedReducer?.formB ?? {},
  );

  const {
    accreditorName,
    practiceDetail,
    assessment,
    dateOfReportComplete,
    dateOfVisit,
    classification,
    facilityName,
    address,
    accreditationWithEV,
  } = useMemo(() => summary, [summary]);

  const summaryFieldsLeftPart = useMemo(
    () => [
      {
        type: 'text',
        title: 'Accreditor Name',
        name: 'accreditorName',
        placeholder: 'Select Name',
        value: accreditorName,
        isEditable,
      },
      {
        type: 'date',
        name: 'dateOfVisit',
        title: 'Date of Assessment/Visit',
        placeholder: 'Date of Assessment/Visit',
        value: dateOfVisit,
        isEditable,
      },
      {
        type: 'date',
        name: 'dateOfReportComplete',
        title: 'Date Report Completed',
        placeholder: 'Date Report Completed',
        value: dateOfReportComplete,
        isEditable,
      },
      {
        type: 'text',
        title: 'Practice Name',
        name: 'facilityName',
        placeholder: 'Select practice',
        value: facilityName,
        isEditable,
      },
      {
        type: 'text',
        title: 'Address',
        name: 'address',
        placeholder: 'Enter address',
        value: address,
        isEditable,
      },
      {
        type: 'select',
        title: 'Classification',
        name: 'classification',
        placeholder: 'Select classification',
        options: [
          { label: 'Inner', value: 'INNER', name: 'classification' },
          {
            label: 'Outer',
            value: 'OUTER',
            name: 'classification',
          },
          {
            label: 'Rural',
            value: 'RURAL',
            name: 'classification',
          },
        ],
        value: classification,
        isEditable,
      },
    ],
    [
      classification,
      address,
      facilityName,
      dateOfReportComplete,
      dateOfVisit,
      accreditorName,
      facilityPracticeManagerOptions,
      isEditable,
    ],
  );

  const summaryFieldsRightPart = useMemo(() => {
    let rightPartInputs = assessment?.map((input, index) => ({
      type: 'triState',
      index,
      id: input?.title,
      title: input?.title,
      value: input?.status,
      isEditable,
    }));
    rightPartInputs = [
      {
        type: 'title',
        fieldTitle: 'Circle type of assessment/ visit undertaken:',
      },
      ...rightPartInputs,
    ];
    return rightPartInputs;
  }, [assessment, isEditable]);

  const onInputChange = useCallback((name, value) => {
    dispatch(updateAccreditedSubFormFields('formB', 'summary', name, value));
  }, []);

  const handleInputTextChange = useCallback(
    e => {
      const { name, value } = e.target;
      onInputChange(name, value);
    },
    [onInputChange],
  );

  const handleSelectChange = useCallback(
    e => {
      onInputChange(e.name, e);
    },
    [onInputChange],
  );

  const handleDateChange = useCallback(
    (name, date) => {
      onInputChange(name, date);
    },
    [onInputChange],
  );

  const handleRightPartCheckInputChange = useCallback(
    (index, value) =>
      dispatch(updateAccreditedSubFormDataArrayFields('formB', 'summary', index, 'assessment', 'status', value)),
    [],
  );

  const summaryDetailsComponent = input => {
    let component = null;
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
          />
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

      case 'triState':
        component = (
          <TriStateSwitch
            onChange={state => handleRightPartCheckInputChange(input?.index, state)}
            state={input?.value}
            disabled={!input?.isEditable}
          />
        );
        break;

      case 'text':
        component = (
          <div className="component-text-type-value">
            {input?.value?.toString().trim()?.length > 0 ? input?.value : '-'}
          </div>
        );
        break;

      case 'title':
        component = <div className="component-primary-title">{input.fieldTitle}</div>;
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

      default:
        component = (
          <Input
            type="text"
            name={input.name}
            placeholder={input.placeholder}
            value={input.value}
            disabled={!input?.isEditable}
          />
        );
    }
    return (
      <>
        {input.type !== 'blank' && (
          <div className="summary-detail-row">
            {input.type !== 'title' && (
              <span className={`form-detail-title ${input.type === 'multilineInput' && 'multi-line-inputs-container'}`}>
                {input.title}
              </span>
            )}
            <div className="summary-detail">{component}</div>
          </div>
        )}
      </>
    );
  };

  useEffect(() => {
    setIsEditable(AccreditedEditableHelper(accreditionSideBar, step, subStep));
  }, [step, subStep, accreditionSideBar]);

  useEffect(() => {
    if (id) dispatch(getSummaryData(id));
  }, [id]);

  useEffect(() => {
    if (facilityId) dispatch(getFacilityDetailsForSummary(facilityId));
  }, [facilityId]);

  return (
    <>
      <PromptOnRouteChange data={summary} dataCopy={summaryCopy} />

      <section>
        <div className="accredited-title mb-10">Summary of key findings and accreditor recommendations</div>
        <div className="common-white-container summary-details">
          <div className="summary-detail-left-part">{summaryFieldsLeftPart.map(summaryDetailsComponent)}</div>
          <div className="summary-detail-right-part">{summaryFieldsRightPart.map(summaryDetailsComponent)}</div>
        </div>
      </section>

      <SummaryApplications />

      <section>
        <div className="accredited-title accredited-title-margin">
          Summary of key findings and accreditor recommendations
        </div>
        <table className="form-b-table">
          <thead>
            {nameOfPractice.map(field => (
              <th width={field.width}>{field.title}</th>
            ))}
          </thead>
          <tr>
            <td>{accreditionName}</td>
            <td>
              <Switch
                id="AccreditationWithEV"
                name="accreditationWithEV"
                checked={accreditationWithEV}
                onChange={e => onInputChange(e.target.name, e.target.checked)}
                disabled={!isEditable}
              />
            </td>
          </tr>
        </table>
      </section>

      <section className="common-white-container form-b-single-record-grid mt-20">
        <div className="form-detail-title">{accreditionName}</div>
        <textarea
          rows={4}
          placeholder="Enter detail"
          name="practiceDetail"
          value={practiceDetail}
          onChange={handleInputTextChange}
          disabled={!isEditable}
        />
      </section>
    </>
  );
};
export default Summary;
