import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import SupervisorDetails from '../../FormA/Supervisor/SupervisorDetails';
import Checkbox from '../../../../components/Checkbox/Checkbox';
import { useQueryParams } from '../../../../hooks/GetQueryParamHook';
import {
  downloadFileFromA1Supervisor,
  getFormA1SupervisorDetails,
  updateAccreditedSubFormDataArrayFields,
  updateAccreditedSubFormFields,
} from '../../redux/AccreditedReduxActions';
import { useWindowWidth } from '../../../../hooks/useWindowWidth';
import FileUploadButton from '../../../../components/FileUploadButton';
import { fileNameExtension, fileNamePrefix } from '../../../../helpers/fileNameSplit';
import { AccreditedEditableHelper } from '../../../../helpers/AccreditedEditableHelper';
import TriStateSwitch from '../../../../components/TriStateSwitch/TriStateSwitch';
import { downloadAll } from '../../../../helpers/DownloadHelper';
import { errorNotification } from '../../../../components/common/NotifyToaster';

const attachments = ['I have hospital clinical privileges - please attach evidence'];
const A1Supervisor = () => {
  const dispatch = useDispatch();
  const { id, sid } = useQueryParams();
  const { step, subStep } = useParams();
  const [isEditable, setIsEditable] = useState(true);

  const isMobileWidth = useWindowWidth() < 1024;

  const { accreditionSideBar } = useSelector(({ accreditedReducer }) => accreditedReducer?.accreditedStepper ?? {});

  const supervisor = useSelector(({ accreditedReducer }) => accreditedReducer?.formA1?.[`${sid}`] ?? {});

  // const onHourDetailsInputChange = useCallback(
  //   (day, name, value) => {
  //     if (name === 'isChecked') {
  //       if (value !== 'true') {
  //         if (['Sunday', 'Saturday'].includes(day)) {
  //           dispatch(updateA1SupervisorTimings(`${sid}`, day, 'startTime', '00:00'));
  //           dispatch(updateA1SupervisorTimings(`${sid}`, day, 'finishTime', '00:00'));
  //         } else {
  //           dispatch(updateA1SupervisorTimings(`${sid}`, day, 'startTime', '08:00'));
  //           dispatch(updateA1SupervisorTimings(`${sid}`, day, 'finishTime', '17:00'));
  //         }
  //       }
  //       dispatch(updateA1SupervisorTimings(`${sid}`, day, name, value));
  //     } else {
  //       const finalValue =
  //         value === 'Invalid date'
  //           ? moment(
  //               moment()
  //                 .hour(
  //                   (!['Sunday', 'Saturday'].includes(day) && (name === 'startTime' ? 8 : 17)) || 0
  //                 )
  //                 .minutes(0)
  //             ).format('HH:mm')
  //           : value;
  //       dispatch(
  //         updateA1SupervisorTimings(
  //           `${sid}`,
  //           day,
  //           name,
  //           moment(finalValue, 'HH:mm').format('HH:mm')
  //         )
  //       );
  //     }
  //   },
  //   [sid]
  // );

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

  const handleFileDownload = useCallback(async fileName => {
    if (fileName) {
      const response = await downloadFileFromA1Supervisor(fileName);
      if (response) {
        downloadAll(response);
      } else {
        errorNotification('Download failed, please try again.');
      }
    } else {
      errorNotification('No file found');
    }
  }, []);

  const handleFileDeletion = useCallback(
    (index, fileArray, filePath) => {
      if (isEditable) {
        const files = fileArray?.filter(e => e?.fileUrl !== filePath);
        dispatch(downloadFileFromA1Supervisor(index, `Files/${filePath?.split('/').pop()}`, files, id, sid, 'formA1'));
      }
    },
    [id, sid, isEditable],
  );

  useEffect(() => {
    setIsEditable(AccreditedEditableHelper(accreditionSideBar, step, subStep) ?? false);
  }, [step, subStep, accreditionSideBar]);

  useEffect(() => {
    if (id && sid) dispatch(getFormA1SupervisorDetails(id, sid));
  }, [id, sid]);

  return (
    <>
      <div className="common-white-container" style={{ 'margin-bottom': '20px' }}>
        Please note that all questions must be answered for the application to be considered complete. You can save the
        answers and return to complete this section later, by clicking Save at bottom right and exiting the page. To
        submit, click Next at bottom right and the form will be saved for submission. If you answer Yes to having
        hospital clinical privileges, you will need to be able to upload a copy of evidence before continuing.
      </div>
      <div className="common-white-container">
        <SupervisorDetails data={supervisor} fromModule="formA1" isEditable={isEditable} />
      </div>
      {/* <div className="accredited-title accredited-title-margin">Supervisor Hours – Opening & Closing Time</div> */}
      {/* <div className="common-white-container"> */}
      {/*  {!_.isEmpty(supervisor?.hours) && ( */}
      {/*    <HoursTable hours={supervisor?.hours} onHourInputChange={onHourDetailsInputChange} isEditable={isEditable} /> */}
      {/*  )} */}
      {/* </div> */}
      <section>
        <div className="accredited-title accredited-title-margin">
          Standard Details (To be completed by {supervisor.username})
        </div>
        <div className="common-white-container">
          <table className="standard-detail-table">
            {supervisor?.standardsDetail?.map((detail, index) => (
              <tr>
                <td className="standard-detail-checkbox">
                  <div className="standard-detail">
                    <TriStateSwitch
                      className="A1-checklist-checkmark"
                      state={detail?.status}
                      onChange={status => handleStandardInputChange(index, 'status', status)}
                      disabled={!isEditable}
                    />
                    <div className="w-100">
                      <span>{detail?.title}</span>
                      <div className="form-error-message standard-error-message">{detail?.error}</div>
                      {detail?.filePath?.length > 0 &&
                        detail?.filePath?.map(file => (
                          <div className="standard-attached-file">
                            <span className="file-name">
                              <span className="file-name-without-extension">
                                <b>Uploaded File: </b>
                                {fileNamePrefix(file?.fileName?.split('/').pop())}
                              </span>
                              <span>.{fileNameExtension(file?.fileName?.split('/').pop())}</span>
                            </span>
                            <div className="d-flex">
                              <span
                                className="material-icons-round download-file"
                                title={`Download ${file?.fileName}`}
                                onClick={() => handleFileDownload(file?.fileName)}
                              >
                                cloud_download
                              </span>
                              <span
                                className="material-icons-round delete-file"
                                onClick={() => handleFileDeletion(index, detail?.filePath, file?.fileUrl)}
                              >
                                delete
                              </span>
                            </div>
                          </div>
                        ))}
                    </div>
                    {isMobileWidth && attachments.includes(detail.title) && (
                      <FileUploadButton
                        formName="formA1"
                        subFormName={`${sid}`}
                        data={detail}
                        index={index}
                        subFormField="standardsDetail"
                        isEditable={isEditable}
                        isMulti
                        existFiles={detail?.filePath ?? []}
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
                      isMulti
                      existFiles={detail?.filePath ?? []}
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
              I, <span>{supervisor?.username}</span> agree the information provided has been entered by me and is true
              and accurate. Additionally, I support and adhere to EV’s Training Post guidelines.
            </div>
          }
          id="supervisorName-confirmation"
          className="confirm-checkbox"
          checked={supervisor?.isAgree}
          name="isAgree"
          onChange={e => handleInputChange(e.target.name, e.target.checked)}
          disabled={!isEditable}
        />
        {supervisor?.error?.isAgree && (
          <div className="form-error-message ml-20 mt-10">{supervisor?.error?.isAgree}</div>
        )}
      </div>
    </>
  );
};
export default A1Supervisor;
