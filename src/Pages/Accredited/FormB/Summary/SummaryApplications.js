import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import { useHistory, useParams } from 'react-router-dom';
import { updateAccreditedSubFormDataArrayFields } from '../../redux/AccreditedReduxActions';
import { AccreditedEditableHelper } from '../../../../helpers/AccreditedEditableHelper';
import TriStateSwitch from '../../../../components/TriStateSwitch/TriStateSwitch';
import { useQueryParams } from '../../../../hooks/GetQueryParamHook';

const nameOfApplicants = [
  {
    title:
      'Name of applicant Statement of suitability for accreditation includes confirmation of compliance with required\n' +
      '          RACGP and EV standards by the applicant except as otherwise outlined below',
    textAlign: 'left',
    class: 'summary-applicant-name',
  },
  { title: 'Edu/ Clinical', textAlign: 'center', class: 'summary-applicant-clinical' },
  {
    title: 'Applied for',
    textAlign: 'center',
    class: 'summary-applicant-applied-for',
    subTitle: ['RACGP', 'ACRRM'],
  },
  {
    title: 'Considered suitable for Accreditation with EV ',
    textAlign: 'left',
    class: 'summary-applicant-considered-suitable',
  },
];
const SummaryApplications = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { step, subStep } = useParams();
  const { id } = useQueryParams();
  const [isEditable, setIsEditable] = useState(true);

  const { accreditionSideBar } = useSelector(({ accreditedReducer }) => accreditedReducer?.accreditedStepper ?? {});

  const { summary } = useSelector(({ accreditedReducer }) => accreditedReducer?.formB ?? {});
  const { applications } = useMemo(() => summary ?? [], [summary]);

  const handleApplicationInputChange = useCallback((index, name, value) => {
    dispatch(updateAccreditedSubFormDataArrayFields('formB', 'summary', index, 'applications', name, value));
  }, []);

  useEffect(() => {
    setIsEditable(AccreditedEditableHelper(accreditionSideBar, step, subStep));
  }, [step, subStep, accreditionSideBar]);

  const handleSupervisorClick = useCallback(
    applicationDetail => {
      const supervisorName = _.camelCase(applicationDetail?.name);
      const supervisorId = applicationDetail?.supervisorId;
      history.push(`/accredited/formA1/${supervisorName}/?id=${id}&sid=${supervisorId}`);
    },
    [id],
  );

  return (
    <>
      <section>
        <div className="accredited-title accredited-title-margin">Name of Applicant</div>
        <div className="form-b-table-container">
          <table className="form-b-table name-of-applicants">
            <thead>
              {nameOfApplicants.map(field => (
                <th colSpan={field?.subTitle?.length > 0 && 2} className={field.class}>
                  <div className="d-flex flex-column just-bet">
                    <div
                      className={field?.subTitle?.length > 0 && 'form-b-light-title'}
                      style={{ textAlign: field.textAlign }}
                    >
                      {field.title}
                    </div>

                    {field?.subTitle?.length > 0 && (
                      <div className="form-b-subtitle-grid">
                        {field.subTitle.map(title => (
                          <div>{title}</div>
                        ))}
                      </div>
                    )}
                  </div>
                </th>
              ))}
            </thead>
            {applications?.map((application, index) => (
              <tr>
                <td>
                  <span
                    onClick={() => handleSupervisorClick(application)}
                    style={{ cursor: 'pointer', textDecoration: 'underline' }}
                  >
                    {application?.name ?? '-'}
                  </span>
                </td>
                <td>{_.capitalize(application?.categoryOfSupervisor) ?? '-'}</td>
                <td>
                  <div className="d-flex just-center">
                    <TriStateSwitch
                      onChange={state => handleApplicationInputChange(index, 'RACGP', state)}
                      state={application?.RACGP}
                      disabled={!isEditable}
                    />
                  </div>
                </td>
                <td>
                  <div className="d-flex just-center">
                    <TriStateSwitch
                      onChange={state => handleApplicationInputChange(index, 'ACRRM', state)}
                      state={application?.ACRRM}
                      disabled={!isEditable}
                    />
                  </div>
                </td>
                <td>
                  <div className="d-flex just-center">
                    <TriStateSwitch
                      onChange={state => handleApplicationInputChange(index, 'consideration', state)}
                      state={application?.consideration}
                      disabled={!isEditable}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </table>
        </div>
      </section>
      {applications.map((application, index) => (
        <section className="common-white-container form-b-single-record-grid mt-20">
          <div className="form-detail-title">{application?.name}</div>
          <textarea
            rows={4}
            placeholder="Enter Details"
            name="remarks"
            value={application?.remarks}
            onChange={e => handleApplicationInputChange(index, e.target.name, e.target.value)}
            disabled={!isEditable}
          />
        </section>
      ))}
    </>
  );
};

export default SummaryApplications;
