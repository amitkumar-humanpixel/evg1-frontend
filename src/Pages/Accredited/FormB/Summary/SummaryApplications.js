import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import { useParams } from 'react-router-dom';
import Checkbox from '../../../../components/Checkbox/Checkbox';
import Switch from '../../../../components/Switch/Switch';
import { updateAccreditedSubFormDataArrayFields } from '../../redux/AccreditedReduxActions';
import { AccreditedEditableHelper } from '../../../../helpers/AccreditedEditableHelper';

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
  const { step, subStep } = useParams();
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

  return (
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
              <td>{application?.name ?? '-'}</td>
              <td>{_.capitalize(application?.categoryOfSupervisor) ?? '-'}</td>
              <td>
                <Checkbox
                  id={`RACGP${index}`}
                  name="RACGP"
                  className="d-flex just-center"
                  checked={application?.RACGP}
                  onChange={e => handleApplicationInputChange(index, e.target.name, e.target.checked)}
                  disabled={!isEditable}
                />
              </td>
              <td>
                <Checkbox
                  id={`ACRRM${index}`}
                  name="ACRRM"
                  className="d-flex just-center"
                  checked={application?.ACRRM}
                  onChange={e => handleApplicationInputChange(index, e.target.name, e.target.checked)}
                  disabled={!isEditable}
                />
              </td>
              <td>
                <Switch
                  id={`consideration${index}`}
                  switchContainerClass="d-flex just-center"
                  name="consideration"
                  checked={application.consideration}
                  onChange={e => handleApplicationInputChange(index, e.target.name, e.target.checked)}
                  disabled={!isEditable}
                />
              </td>
            </tr>
          ))}
        </table>
      </div>
    </section>
  );
};

export default SummaryApplications;
