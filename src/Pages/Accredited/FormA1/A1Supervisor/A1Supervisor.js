import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { useParams } from 'react-router-dom';
import _ from 'lodash';
import SupervisorDetails from '../../FormA/Supervisor/SupervisorDetails';
import HoursTable from '../../HoursTable/HoursTable';
import Checkbox from '../../../../components/Checkbox/Checkbox';
import { useQueryParams } from '../../../../hooks/GetQueryParamHook';
import {
  deleteFileFromA1Standards,
  getFormA1SupervisorDetails,
  updateA1SupervisorTimings,
  updateAccreditedSubFormDataArrayFields,
  updateAccreditedSubFormFields,
} from '../../redux/AccreditedReduxActions';
import { useWindowWidth } from '../../../../hooks/useWindowWidth';
import FileUploadButton from '../../../../components/FileUploadButton';
import { fileNameExtension, fileNamePrefix } from '../../../../helpers/fileNameSplit';
import { AccreditedEditableHelper } from '../../../../helpers/AccreditedEditableHelper';

const attachments = ['I have hospital clinical privileges'];
const A1Supervisor = () => {
  const dispatch = useDispatch();
  const { id, sid } = useQueryParams();
  const { step, subStep } = useParams();
  const [isEditable, setIsEditable] = useState(true);

  const isMobileWidth = useWindowWidth() < 1024;

  const { accreditionSideBar } = useSelector(({ accreditedReducer }) => accreditedReducer?.accreditedStepper ?? {});

  const supervisor = useSelector(({ accreditedReducer }) => accreditedReducer?.formA1?.[`${sid}`] ?? {});

  const onHourDetailsInputChange = useCallback(
    (day, name, value) => {
      if (name === 'isChecked') {
        if (!value) {
          dispatch(updateA1SupervisorTimings(`${sid}`, day, 'startTime', '00:00'));
          dispatch(updateA1SupervisorTimings(`${sid}`, day, 'finishTime', '00:00'));
        }
        dispatch(updateA1SupervisorTimings(`${sid}`, day, name, value));
      } else {
        const finalValue = value === 'Invalid date' ? moment(moment().hour(0).minutes(0)).format('HH:mm') : value;
        dispatch(updateA1SupervisorTimings(`${sid}`, day, name, moment(finalValue, 'HH:mm').format('HH:mm')));
      }
    },
    [sid],
  );

  const handleStandardInputChange = useCallback(
    (index, name, value) => {
      dispatch(updateAccreditedSubFormDataArrayFields('formA1', `${sid}`, index, 'standardsDetail', name, value));
    },
    [sid],
  );
  const handleInputChange = useCallback(
    (name, value) => {
      dispatch(updateAccreditedSubFormFields('formA1', `${sid}`, name, value));
    },
    [sid],
  );

  const handleFileDeletion = useCallback(
    (index, filePath) => {
      dispatch(deleteFileFromA1Standards(index, `Files/${filePath?.split('/').pop()}`, id, sid, 'formA1'));
    },
    [id, sid],
  );

  useEffect(() => {
    setIsEditable(AccreditedEditableHelper(accreditionSideBar, step, subStep) ?? false);
  }, [step, subStep, accreditionSideBar]);

  useEffect(() => {
    if (id && sid) dispatch(getFormA1SupervisorDetails(id, sid));
  }, [id, sid]);

  return (
    <>
      <div className="common-white-container">
        <SupervisorDetails data={supervisor} fromModule="formA1" isEditable={isEditable} />
      </div>
      <div className="accredited-title accredited-title-margin">Supervisor Hours – Opening & Closing Time</div>
      <div className="common-white-container">
        {!_.isEmpty(supervisor?.hours) && (
          <HoursTable hours={supervisor?.hours} onHourInputChange={onHourDetailsInputChange} isEditable={isEditable} />
        )}
      </div>
      <section>
        <div className="accredited-title accredited-title-margin">Standard Details</div>
        <div className="common-white-container">
          <table className="standard-detail-table">
            {supervisor?.standardsDetail?.map((detail, index) => (
              <tr>
                <td className="standard-detail-checkbox">
                  <div className="standard-detail">
                    <Checkbox
                      id={`standard-details-${index}`}
                      name="status"
                      checked={detail?.status}
                      onChange={event => handleStandardInputChange(index, event?.target?.name, event.target.checked)}
                      checkmarkClass="A1-checklist-checkmark"
                      disabled={!isEditable}
                    />
                    <div>
                      <span>{detail?.title}</span>
                      <div className="form-error-message standard-error-message">{detail?.error}</div>
                      {detail?.filePath && (
                        <div className="standard-attached-file">
                          <span className="file-name">
                            <span className="file-name-without-extension">
                              <b>Uploaded File: </b>
                              {fileNamePrefix(detail?.filePath?.split('/').pop())}
                            </span>
                            <span>.{fileNameExtension(detail?.filePath?.split('/').pop())}</span>
                          </span>
                          <span
                            className="material-icons-round"
                            onClick={() => handleFileDeletion(index, detail?.filePath)}
                          >
                            delete
                          </span>
                        </div>
                      )}
                    </div>
                    {isMobileWidth && attachments.includes(detail.title) && (
                      <FileUploadButton
                        formName="formA1"
                        subFormName={`${sid}`}
                        data={detail}
                        index={index}
                        subFormField="standardsDetail"
                        isEditable={isEditable}
                      />
                    )}
                  </div>
                </td>
                <td className="standard-detail-button">
                  {attachments.includes(detail.title) && (
                    <FileUploadButton
                      formName="formA1"
                      subFormName={`${sid}`}
                      data={detail}
                      index={index}
                      subFormField="standardsDetail"
                      isEditable={isEditable}
                    />
                  )}
                </td>
              </tr>
            ))}
          </table>
        </div>
      </section>
      <div className="mt-10">
        <Checkbox
          title={
            <div className="confirmation-title">
              I <span>{supervisor?.username}</span> agree the information provided has been entered by me and is true
              and accurate. Additionally, I support and adhere to EV’s Training Post guidelines.
            </div>
          }
          id="supervisorName-confirmation"
          className="confirm-checkbox"
          checked={supervisor?.isAgree}
          name="isAgree"
          onChange={e => handleInputChange(e.target.name, e.target.checked)}
        />
        {supervisor?.error?.isAgree && (
          <div className="form-error-message ml-20 mt-10">{supervisor?.error?.isAgree}</div>
        )}
      </div>
    </>
  );
};
export default A1Supervisor;
