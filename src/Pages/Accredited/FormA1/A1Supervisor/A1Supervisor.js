import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import SupervisorDetails from '../../FormA/Supervisor/SupervisorDetails';
import Checkbox from '../../../../components/Checkbox/Checkbox';
import { useQueryParams } from '../../../../hooks/GetQueryParamHook';
import {
  deleteFileFromA1Standards,
  downloadFileFromA1Supervisor,
  getFormA1SupervisorDetails,
  updateAccreditedSubFormDataArrayFields,
  updateAccreditedSubFormFields,
} from '../../redux/AccreditedReduxActions';
import FileUploadButton from '../../../../components/FileUploadButton';
import { fileNameExtension, fileNamePrefix } from '../../../../helpers/fileNameSplit';
import { AccreditedEditableHelper } from '../../../../helpers/AccreditedEditableHelper';
import TriStateSwitch from '../../../../components/TriStateSwitch/TriStateSwitch';
import { downloadAll } from '../../../../helpers/DownloadHelper';
import { errorNotification } from '../../../../components/common/NotifyToaster';
import PromptOnRouteChange from '../../../../components/PromptOnRouteChange';

const A1Supervisor = () => {
  const dispatch = useDispatch();
  const { id, sid } = useQueryParams();
  const { step, subStep } = useParams();

  const [isEditable, setIsEditable] = useState(true);

  const { accreditionSideBar } = useSelector(({ accreditedReducer }) => accreditedReducer?.accreditedStepper ?? {});

  const supervisor = useSelector(({ accreditedReducer }) => accreditedReducer?.formA1?.[`${sid}`] ?? {});
  const supervisorCopy = useSelector(({ accreditedReducer }) => accreditedReducer?.formA1?.[`${sid}copy`] ?? {});

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
    (index, file, detail) => {
      if (isEditable) {
        const files = detail?.filePath?.filter(e => e?.fileUrl !== file?.fileUrl);
        const data = { elementId: detail?._id, fileId: file?._id, supervisorId: parseInt(sid, 10) };
        dispatch(deleteFileFromA1Standards(index, data, files, sid));
      }
    },
    [sid, isEditable],
  );

  useEffect(() => {
    setIsEditable(AccreditedEditableHelper(accreditionSideBar, step, subStep) ?? false);
  }, [step, subStep, accreditionSideBar]);

  useEffect(() => {
    if (id && sid) dispatch(getFormA1SupervisorDetails(id, sid));
  }, [id, sid]);

  return (
    <>
      <PromptOnRouteChange data={supervisor} dataCopy={supervisorCopy} />

      <div className="common-white-container" style={{ 'margin-bottom': '20px' }}>
        Please note that all questions must be answered for the application to be considered complete. You can save the
        answers and return to complete this section later, by clicking Save at bottom right and exiting the page. To
        submit, click Next at bottom right and the form will be saved for submission. If you answer Yes to having
        hospital clinical privileges, you will need to be able to upload a copy of evidence before continuing.
      </div>
      <div className="common-white-container">
        <SupervisorDetails data={supervisor} fromModule="formA1" isEditable={isEditable} />
      </div>
      <section>
        <div className="accredited-title mb-10">Standard Details (To be completed by {supervisor.username})</div>
        <div className="common-white-container standard-detail-table">
          {supervisor?.standardsDetail?.map((detail, index) => (
            <div className="standard-detail-row">
              <TriStateSwitch
                onChange={state => handleStandardInputChange(index, 'status', state)}
                state={detail?.status}
                className="mr-15"
                disabled={!isEditable}
              />
              <div className="standard-detail">
                <div className="standard-detail-container">
                  <div className="standard-detail-point">
                    {`${index + 1}. ${detail.title}`}
                    {detail?.list && (
                      <ul>
                        {detail.list.map(point => (
                          <li>{point}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                  {detail?.error && <div className="form-error-message standard-error-message">{detail?.error}</div>}
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
                            title={`Delete ${file?.fileName}`}
                            onClick={() => handleFileDeletion(index, file, detail)}
                          >
                            delete
                          </span>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
              {detail?.isFileUploadAllowed && (
                <div className="standard-detail-button">
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
                </div>
              )}
            </div>
          ))}
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
